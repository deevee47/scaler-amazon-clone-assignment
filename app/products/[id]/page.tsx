import { Product } from "@/type";
import ProductImageGallery from "@/components/ProductImageGallery";
import AddToCartButton from "@/components/AddToCartButton";
import CartSidebar from "@/components/CartSidebar";
import DeliveryLocationWidget from "@/components/DeliveryLocationWidget";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm font-medium text-gray-800">
        {rating.toFixed(1)}
      </span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const half = !filled && rating >= star - 0.5;
          return (
            <svg
              key={star}
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {filled ? (
                <polygon
                  points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                  fill="#FFA41C"
                />
              ) : half ? (
                <>
                  <defs>
                    <linearGradient id={`half-${star}`}>
                      <stop offset="50%" stopColor="#FFA41C" />
                      <stop offset="50%" stopColor="#D1D5DB" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                    fill={`url(#half-${star})`}
                  />
                </>
              ) : (
                <polygon
                  points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                  fill="#D1D5DB"
                />
              )}
            </svg>
          );
        })}
      </div>
      <span className="text-sm text-[#2261A1] hover:text-[#c45500] cursor-pointer">
        ({count.toLocaleString()})
      </span>
    </div>
  );
}


export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await apiFetch<Product>(`/api/products/${id}`, {
    next: { revalidate: 3600 },
  });
  const categoryData = await apiFetch<{ products: Product[] }>(
    `/api/products/category/${encodeURIComponent(product.category)}`,
    { next: { revalidate: 3600 } }
  ).catch(() => ({ products: [] as Product[] }));
  const relatedProducts = categoryData.products.filter((p) => p.id !== product.id);

  const price = parseFloat(String(product.price));
  const discountPercentage = parseFloat(String(product.discountPercentage));
  const rating = parseFloat(String(product.rating));
  const mrp = Math.round(price / (1 - discountPercentage / 100));
  const discountPct = Math.round(discountPercentage);
  const ratingCount = Math.round(rating * 100) || 349;
  const emiAmount = Math.round(price / 24);

  const DEAL_LABELS = ["Selling Fast", "Best Value", "Limited Time Deal", "Top Pick", "Hot Deal"];
  const dealLabel = DEAL_LABELS[product.id % DEAL_LABELS.length];

  const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    .toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  const categoryLabel = product.category
    .replace(/-/g, " ")
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
  const titleTruncated = product.title.length > 40
    ? product.title.slice(0, 40) + "…"
    : product.title;

  const colorLabel = product.tags?.[0] || "Default";
  const variantImages = product.images.slice(0, 5);
  const descriptionBullets = [
    ...product.description.split(". ").filter(Boolean),
    ...product.description.split(". ").filter(Boolean),
  ].slice(0, 10);

  const serviceIcons = [
    {
      label: "3 Year Warranty",
      icon: <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png" alt="Warranty" className="w-9 h-9 object-contain" />,
    },
    {
      label: "10 days Returnable",
      icon: <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB562506492_.png" alt="Returns" className="w-9 h-9 object-contain" />,
    },
    {
      label: "Pay on Delivery",
      icon: <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB562506657_.png" alt="Pay on Delivery" className="w-9 h-9 object-contain" />,
    },
    {
      label: "Amazon Delivered",
      icon: <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB562550117_.png" alt="Amazon Delivered" className="w-9 h-9 object-contain" />,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 px-6 py-1.5 border-b border-gray-200">
        <span className="hover:text-[#c45500] cursor-pointer">
          {categoryLabel}
        </span>
        {" › "}
        <span className="text-gray-700">{titleTruncated}</span>
      </div>

      {/* Main layout */}
      <div className="flex gap-5 px-6 py-4 items-start">
        {/* Gallery — sticky */}
        <div className="sticky top-[60px] self-start flex-shrink-0">
          <ProductImageGallery images={product.images} title={product.title} />

          {/* Ask Rufus */}
          <div className="mt-4 w-[640px]">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-5 h-5 rounded-full bg-[#FF9900] flex items-center justify-center">
                <span className="text-white text-[10px] font-black">•</span>
              </span>
              <span className="text-sm font-semibold text-gray-800">Ask Rufus</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {["Is it lightweight?", "Does it have a lock?", "Can it be used for international travel?"].map((q) => (
                <button
                  key={q}
                  className="border border-gray-400 rounded-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
                >
                  {q}
                </button>
              ))}
            </div>
            <button className="border border-gray-400 rounded-full px-4 py-1.5 text-xs text-gray-700 hover:bg-gray-50">
              Ask something else
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h1 className="text-xl font-semibold leading-snug text-gray-900 mb-1">
            {product.title}
          </h1>

          {/* Brand store link */}
          {product.brand && (
            <p className="text-sm text-[#2261A1] hover:text-[#c45500] hover:underline cursor-pointer mb-2">
              Visit the {product.brand} Store
            </p>
          )}

          {/* Rating row */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <StarRating rating={rating} count={ratingCount} />
            <span className="text-gray-300 text-sm">|</span>
            <span className="text-sm text-[#2261A1] hover:text-[#c45500] cursor-pointer hover:underline">
              Search this page
            </span>
          </div>

          {/* 100+ bought */}
          <p className="text-sm font-bold text-gray-600 mb-1">
            100+ bought in past month
          </p>

          <hr className="my-3 border-gray-200" />

          {/* Deal badge */}
          <div className="mb-2">
            <span className="inline-flex bg-[#CC0C39] text-white text-sm font-semibold px-3 py-1 rounded">
              {dealLabel}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-xl font-bold text-red-500">
              -{discountPct}%
            </span>
            <span className="text-3xl font-[550] text-gray-900">
              <span className="text-lg">₹</span>
              {price.toLocaleString("en-IN")}
            </span>
          </div>

          {/* MRP */}
          <div className="text-sm text-gray-600 mb-1">
            M.R.P:{" "}
            <span className="line-through">
              ₹{mrp.toLocaleString("en-IN")}
            </span>
            {"  "}
            <span className="text-[#2261A1] hover:underline cursor-pointer">
              Price history
            </span>
          </div>

          {/* EMI */}
          <p className="text-sm text-gray-700 mb-1">
            EMI starts at{" "}
            <span className="font-semibold">₹{emiAmount.toLocaleString("en-IN")}</span>.{" "}
            <span className="text-[#2261A1] hover:underline cursor-pointer">
              No Cost EMI available
            </span>{" "}
            <span className="text-[#2261A1] hover:underline cursor-pointer">
              EMI options ›
            </span>
          </p>

          {/* Amazon Business */}
          <p className="text-sm text-gray-700 mb-2">
            With{" "}
            <span className="font-semibold">Amazon Business</span>, you would have saved ₹{Math.round(price * 0.12).toLocaleString("en-IN")} in the last year.
          </p>

          {/* Fulfilled badge */}
          <div className="mb-1">
            <img
              src="/banner/amazon-fulfilled.png"
              alt="Amazon Fulfilled"
              className="h-5 w-auto"
            />
          </div>

          {/* Tax */}
          <p className="text-xs text-gray-500 mb-2">Inclusive of all taxes</p>

          {/* Offers */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <img src="/checkout/offers.png" alt="Offers" className="w-5 h-5 object-contain" />
              <span className="text-base font-semibold text-gray-800">
                Offers
              </span>
            </div>
            <div className="flex gap-3">
              {/* Cashback card */}
              <div className="border border-gray-200 rounded-lg p-3 flex-1 min-w-0 flex flex-col gap-1.5 shadow-md">
                <p className="text-sm font-bold text-gray-900">Cashback</p>
                <p className="text-xs text-gray-900 line-clamp-3">
                  Upto ₹50.00 cashback as Amazon Pay balance on paying with Amazon Pay UPI
                </p>
                <p className="text-xs text-[#2261A1] hover:underline cursor-pointer">
                  2 offers &gt;
                </p>
              </div>

              {/* No Cost EMI card */}
              <div className="border border-gray-200 rounded-lg p-3 flex-1 min-w-0 flex flex-col gap-1.5 shadow-md">
                <p className="text-sm font-bold text-gray-900">No Cost EMI</p>
                <p className="text-xs text-gray-900 line-clamp-3">
                  Avail No Cost EMI on select cards for orders above ₹3,000
                </p>
                <p className="text-xs text-[#2261A1] hover:underline cursor-pointer">
                  3 offers &gt;
                </p>
              </div>

              {/* Bank Offer card */}
              <div className="border border-gray-200 rounded-lg p-3 flex-1 min-w-0 flex flex-col gap-1.5 shadow-md">
                <p className="text-sm font-bold text-gray-900">Bank Offer</p>
                <p className="text-xs text-gray-900 line-clamp-3">
                  Upto ₹1,000 discount on ICICI Bank Credit Cards
                </p>
                <p className="text-xs text-[#2261A1] hover:underline cursor-pointer">
                  4 offers &gt;
                </p>
              </div>
            </div>
          </div>

          {/* Color section */}
          <div className="mb-4">
            <p className="text-sm text-gray-800 mb-2">
              <span className="font-semibold">Colour:</span> {colorLabel}
            </p>
            <div className="flex gap-2 flex-wrap">
              {variantImages.map((src, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <button
                    className={`relative w-[55px] h-[55px] border-2 rounded overflow-hidden ${
                      i === 0 ? "border-[#007EB9]" : "border-gray-300 hover:border-[#c45500]"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${product.title} variant ${i + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                  <span className="text-xs text-gray-700">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Service icons */}
          <div className="flex items-start border-t border-gray-200 pt-4 mb-4">
            {serviceIcons.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center w-[76px] gap-1.5 flex-shrink-0"
              >
                {item.icon}
                <span className="text-[11px] text-gray-600 leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
            <button className="self-center ml-1 w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full text-gray-500 hover:bg-gray-50 flex-shrink-0">
              <svg
                className="w-3 h-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Description bullets */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-800 mb-1">About this item</p>
            <ul className="list-disc list-inside space-y-1">
              {descriptionBullets.map((bullet, i) => (
                <li key={i} className="text-sm text-gray-700">
                  {bullet.trim()}{bullet.trim().endsWith(".") ? "" : "."}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Buy box — sticky */}
        <div className="sticky top-[60px] self-start w-[255px] flex-shrink-0 flex flex-col gap-2.5">

          {/* Prime card — separate light-blue card */}
          <div className="border border-[#C8E6F5] rounded-xl bg-[#EBF5FB] px-4 py-4">
            <img
              src="https://m.media-amazon.com/images/G/31/marketing/prime/2022PrimeBrand/Logos/Prime_Logo_RGB_Prime_Blue_MASTER._CB542734830_.png"
              alt="Prime"
              className="h-7 w-auto mb-2.5"
            />
            <p className="text-sm text-gray-800 mb-2">
              Enjoy{" "}
              <span className="font-bold">
                Unlimited FREE Same day/1-day delivery
              </span>
              , Prime offers everyday and more
            </p>
            <p className="text-sm text-[#2261A1] hover:underline cursor-pointer font-semibold">
              Join Prime Shopping Edition &gt;&gt;
            </p>
          </div>

          {/* Main buy box */}
          <div className="border border-[#D5D9D9] rounded-xl overflow-hidden">
          {/* Price and details */}
          <div className="px-4 py-3 flex flex-col gap-2.5">
            {/* Price */}
            <div className="text-3xl font-[550] text-gray-900 leading-tight">
              <span className="text-base align-top mt-1 inline-block">₹</span>
              {price.toLocaleString("en-IN")}
            </div>

            {/* Fulfilled badge */}
            <img
              src="/banner/amazon-fulfilled.png"
              alt="Amazon Fulfilled"
              className="h-5 w-fit"
            />

            {/* Free delivery */}
            <p className="text-sm text-gray-700">
              FREE delivery{" "}
              <span className="font-bold">{deliveryDate}.</span>{" "}
              <span className="text-[#2261A1] hover:underline cursor-pointer">
                Details
              </span>
            </p>

            {/* Location */}
            <DeliveryLocationWidget />

            {/* Stock */}
            <p
              className={`text-md font-semibold ${product.stock > 0 ? "text-[#007600]" : "text-red-600"}`}
            >
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </p>

            {/* Ships from / Sold by table */}
            <div className="grid text-xs grid-cols-2 gap-x-2 gap-y-1 text-sm">
              <span className="text-gray-500">Ships from</span>
              <span className="text-gray-800">{product.brand || "Amazon"}</span>
              <span className="text-gray-500">Sold by</span>
              <span className="text-[#2261A1] hover:underline cursor-pointer">
                {product.brand || "Amazon"}
              </span>
              <span className="text-gray-500">Gift options</span>
              <span className="text-[#2261A1] hover:underline cursor-pointer">
                Available at checkout
              </span>
              <span className="text-gray-500">Payment</span>
              <span className="text-[#2261A1] hover:underline cursor-pointer">
                Secure transaction
              </span>
            </div>

            {/* See more */}
            <button className="flex items-center gap-0.5 text-sm text-[#2261A1] hover:underline w-fit">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              See more
            </button>

            <hr className="border-gray-200" />

            {/* Protection Plan */}
            <label className="flex items-start gap-2 text-xs text-gray-700 cursor-pointer">
              <input type="checkbox" className="mt-0.5 flex-shrink-0" />
              <span>
                <span className="font-semibold">Add Protection Plan</span>
                <br />
                1 Year Extended Warranty Plan by Onsitego for ₹353.00
              </span>
            </label>

            <hr className="border-gray-200" />

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 font-medium">
                Quantity:
              </span>
              <select className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm text-gray-900 bg-gray-50 hover:bg-gray-100">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Cart buttons */}
            {product.stock > 0 && <AddToCartButton product={product} />}

            {/* Wish List button */}
            <button className="w-full border border-gray-400 rounded-full text-sm py-2 text-gray-800 hover:bg-gray-50 font-medium">
              Add to Wish List
            </button>
          </div>
          </div>
        </div>

        {/* Cart sidebar — 4th column, only visible when cart has items */}
        <CartSidebar />
      </div>
    </div>
  );
}
