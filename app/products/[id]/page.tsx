import { Product } from "@/type";
import ProductImageGallery from "@/components/ProductImageGallery";
import AddToCartButton from "@/components/AddToCartButton";

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
      <span className="text-sm text-[#007185] hover:text-[#c45500] cursor-pointer">
        ({count.toLocaleString()})
      </span>
    </div>
  );
}

function FulfilledBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 bg-[#232F3E] text-white text-xs font-semibold px-1.5 py-0.5 rounded-sm">
      <span className="text-[#FF9900] font-black italic text-sm leading-none">
        a
      </span>{" "}
      Fulfilled
    </span>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 3600 },
  });
  const product: Product = await res.json();

  const mrp = Math.round(
    product.price / (1 - product.discountPercentage / 100)
  );
  const discountPct = Math.round(product.discountPercentage);
  const ratingCount = Math.round(product.rating * 100) || 349;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 px-6 py-1.5 border-b border-gray-200">
        <span className="hover:text-[#c45500] cursor-pointer">
          Computers &amp; Accessories
        </span>
        {" › "}
        <span className="hover:text-[#c45500] cursor-pointer">
          Accessories &amp; Peripherals
        </span>
        {" › "}
        <span className="hover:text-[#c45500] cursor-pointer">
          Keyboards, Mice &amp; Input Devices
        </span>
        {" › "}
        <span className="hover:text-[#c45500] cursor-pointer">
          Keyboard &amp; Mouse Sets
        </span>
      </div>

      {/* Main layout */}
      <div className="flex gap-5 px-6 py-4 items-start">
        {/* Gallery */}
        <ProductImageGallery images={product.images} title={product.title} />

        {/* Product info */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h1 className="text-xl font-normal leading-snug text-gray-900 mb-1">
            {product.title}
          </h1>

          {/* Brand store link */}
          {product.brand && (
            <p className="text-sm text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer mb-2">
              Visit the {product.brand} Store
            </p>
          )}

          {/* Rating row */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <StarRating rating={product.rating} count={ratingCount} />
            <span className="text-gray-300 text-sm">|</span>
            <span className="text-sm text-[#007185] hover:text-[#c45500] cursor-pointer hover:underline">
              Search this page
            </span>
          </div>

          {/* Bought count */}
          <p className="text-sm text-gray-600 mb-3">
            <span className="font-bold">500+</span> bought in past month
          </p>

          <hr className="my-3 border-gray-200" />

          {/* Limited time deal badge */}
          <div className="mb-2">
            <span className="inline-flex bg-[#CC0C39] text-white text-sm font-semibold px-3 py-1 rounded">
              Limited time deal
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-xl font-bold text-green-700">
              -{discountPct}%
            </span>
            <span className="text-3xl font-medium text-gray-900">
              <span className="text-lg">₹</span>
              {product.price.toLocaleString("en-IN")}
            </span>
          </div>

          {/* MRP */}
          <div className="text-sm text-gray-600 mb-2">
            M.R.P:{" "}
            <span className="line-through">
              ₹{mrp.toLocaleString("en-IN")}
            </span>
            {"  "}
            <span className="text-[#007185] hover:underline cursor-pointer">
              Price history
            </span>
          </div>

          {/* Fulfilled badge */}
          <div className="mb-1">
            <FulfilledBadge />
          </div>

          {/* Tax */}
          <p className="text-xs text-gray-500 mb-2">Inclusive of all taxes</p>

          {/* Amazon Business */}
          <p className="text-sm text-gray-700 mb-4">
            With <span className="font-bold">Amazon Business</span>, you would
            have <span className="font-bold">saved ₹2,522.25</span> in the last
            year.{" "}
            <span className="text-[#007185] hover:underline cursor-pointer">
              Create a free account
            </span>{" "}
            and <span className="font-bold">save up to 15%</span> today.
          </p>

          {/* Offers */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <svg
                className="w-5 h-5 text-[#c45500]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth={2.5} />
              </svg>
              <span className="text-base font-semibold text-gray-800">
                Offers
              </span>
            </div>
            <div className="flex gap-3">
              {/* Cashback card */}
              <div className="border border-gray-300 rounded p-3 flex-1 flex flex-col justify-between min-h-[110px]">
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-1">
                    Cashback
                  </p>
                  <p className="text-xs text-gray-600">
                    Upto ₹50.00 cashback as Amazon Pay balance on paying with
                    Amazon Pay UPI
                  </p>
                </div>
                <p className="text-xs text-[#007185] hover:underline cursor-pointer mt-2">
                  2 offers &gt;
                </p>
              </div>

              {/* Partner offers card */}
              <div className="border border-gray-300 rounded p-3 flex-1 flex flex-col justify-between min-h-[110px]">
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-1">
                    Partner Offers
                  </p>
                  <p className="text-xs text-gray-600">
                    Get GST invoice and save up to 18% on business purchases
                  </p>
                </div>
                <p className="text-xs text-[#007185] hover:underline cursor-pointer mt-2">
                  1 offer &gt;
                </p>
              </div>
            </div>
          </div>

          {/* Service icons */}
          <div className="flex items-start border-t border-gray-200 pt-4">
            {[
              {
                icon: (
                  <svg
                    className="w-9 h-9 text-gray-600"
                    viewBox="0 0 40 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <rect x="8" y="14" width="24" height="18" rx="2" />
                    <path d="M14 14V10a6 6 0 0 1 12 0v4" />
                    <circle cx="20" cy="23" r="3" />
                  </svg>
                ),
                text: product.returnPolicy,
              },
              {
                icon: (
                  <svg
                    className="w-9 h-9 text-gray-600"
                    viewBox="0 0 40 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <rect x="2" y="11" width="22" height="16" rx="2" />
                    <path d="M24 17h6l4 4v6H24V17z" />
                    <circle cx="9" cy="30" r="3" />
                    <circle cx="29" cy="30" r="3" />
                  </svg>
                ),
                text: product.shippingInformation,
              },
              {
                icon: (
                  <svg
                    className="w-9 h-9 text-gray-600"
                    viewBox="0 0 40 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M20 4L6 10v10c0 8 6 15 14 16 8-1 14-8 14-16V10L20 4z" />
                    <polyline points="14,20 18,24 26,16" strokeWidth={2} />
                  </svg>
                ),
                text: product.warrantyInformation,
              },
              {
                icon: (
                  <svg
                    className="w-9 h-9 text-gray-600"
                    viewBox="0 0 40 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <rect x="5" y="8" width="30" height="24" rx="3" />
                    <path d="M5 16h30" />
                    <path d="M12 25h8" strokeWidth={2} />
                    <path d="M12 29h5" strokeWidth={2} />
                  </svg>
                ),
                text: "Pay on Delivery",
              },
              {
                icon: (
                  <svg
                    className="w-9 h-9 text-gray-600"
                    viewBox="0 0 40 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <polygon points="20,4 24,14 35,15 26,23 29,34 20,28 11,34 14,23 5,15 16,14" />
                  </svg>
                ),
                text: "Top Brands",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center w-[76px] gap-1.5 flex-shrink-0"
              >
                {item.icon}
                <span className="text-[11px] text-gray-600 leading-tight">
                  {item.text}
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
        </div>

        {/* Buy box */}
        <div className="w-[255px] flex-shrink-0 border border-[#D5D9D9] rounded overflow-hidden">
          {/* Prime card */}
          <div className="px-4 py-3 border-b border-[#D5D9D9]">
            <div className="flex flex-col items-start mb-2">
              <span className="font-black italic text-[#007EB9] text-2xl leading-none tracking-tight">
                prime
              </span>
              <svg
                width="64"
                height="7"
                viewBox="0 0 64 7"
                className="mt-0.5"
              >
                <path
                  d="M2 6 Q32 0 62 6"
                  stroke="#FF9900"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-xs text-gray-700 mb-1.5">
              Enjoy{" "}
              <span className="font-bold">
                Unlimited FREE Same day/1-day delivery
              </span>
              , Prime offers everyday and more
            </p>
            <p className="text-xs text-[#007185] hover:underline cursor-pointer font-semibold">
              Join Prime Shopping Edition &gt;&gt;
            </p>
          </div>

          {/* Price and details */}
          <div className="px-4 py-3 flex flex-col gap-2.5">
            {/* Price */}
            <div className="text-3xl font-medium text-gray-900 leading-tight">
              <span className="text-base align-top mt-1 inline-block">₹</span>
              {product.price.toLocaleString("en-IN")}
              <span className="text-sm align-super">00</span>
            </div>

            {/* Fulfilled badge */}
            <FulfilledBadge />

            {/* Free delivery */}
            <p className="text-sm text-gray-700">
              FREE delivery{" "}
              <span className="font-bold">Tuesday, 17 March.</span>{" "}
              <span className="text-[#007185] hover:underline cursor-pointer">
                Details
              </span>
            </p>

            {/* Location */}
            <div className="flex items-start gap-1 text-sm cursor-pointer">
              <svg
                className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="text-[#007185] hover:underline">
                Deliver to Divyansh - Satna 485001
              </span>
            </div>

            {/* Stock */}
            <p
              className={`text-lg font-medium ${
                product.stock > 0 ? "text-[#007600]" : "text-red-600"
              }`}
            >
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </p>

            {/* Ships from / Sold by table */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
              <span className="text-gray-500">Ships from</span>
              <span className="text-gray-800">Amazon</span>
              <span className="text-gray-500">Sold by</span>
              <span className="text-[#007185] hover:underline cursor-pointer">
                {product.brand || "Amazon"}
              </span>
              <span className="text-gray-500">Gift options</span>
              <span className="text-[#007185] hover:underline cursor-pointer">
                Available at checkout
              </span>
              <span className="text-gray-500">Payment</span>
              <span className="text-[#007185] hover:underline cursor-pointer">
                Secure transaction
              </span>
            </div>

            {/* See more */}
            <button className="flex items-center gap-0.5 text-sm text-[#007185] hover:underline w-fit">
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

            {/* Protection plan */}
            <div>
              <p className="text-sm font-bold text-gray-800 mb-1.5">
                Add a Protection Plan:
              </p>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="warranty"
                  className="mt-0.5 flex-shrink-0"
                />
                <label
                  htmlFor="warranty"
                  className="cursor-pointer text-sm leading-snug"
                >
                  <span className="text-[#007185] hover:underline">
                    Extended Warranty
                  </span>{" "}
                  for{" "}
                  <span className="text-[#B12704] font-medium">₹98.00</span>
                </label>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 font-medium">
                Quantity:
              </span>
              <select className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm bg-gray-50 hover:bg-gray-100">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Cart buttons */}
            {product.stock > 0 && <AddToCartButton product={product} />}
          </div>
        </div>
      </div>
    </div>
  );
}
