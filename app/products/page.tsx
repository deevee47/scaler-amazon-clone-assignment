import Image from "next/image";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: string;
  discountPercentage: string;
  rating: string;
  brand?: string | null;
  category: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <svg key={star} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none">
            <polygon
              points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
              fill={filled ? "#FFA41C" : half ? "#FFA41C" : "#D1D5DB"}
            />
          </svg>
        );
      })}
      <span className="text-xs text-gray-600 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}) {
  const { category, search, page = "1" } = await searchParams;
  const limit = 20;
  const offset = (parseInt(page) - 1) * limit;

  const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
  if (category) params.set("category", category);
  if (search) params.set("search", search);

  const [categories, result] = await Promise.all([
    apiFetch<string[]>("/api/products/categories"),
    apiFetch<{ products: Product[]; total: number }>(`/api/products?${params}`),
  ]);

  const { products, total } = result;
  const totalPages = Math.ceil(total / limit);
  const currentPage = parseInt(page);

  function pageLink(p: number) {
    const sp = new URLSearchParams();
    if (category) sp.set("category", category);
    if (search) sp.set("search", search);
    sp.set("page", String(p));
    return `/products?${sp}`;
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 px-4 py-6 border-r border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-3">Department</h2>
        <ul className="flex flex-col gap-1">
          <li>
            <Link
              href="/products"
              className={`text-sm px-2 py-1 block rounded ${!category ? "font-bold text-[#232F3E]" : "text-[#007185] hover:text-[#c45500]"}`}
            >
              All Categories
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <Link
                href={`/products?category=${encodeURIComponent(cat)}`}
                className={`text-sm px-2 py-1 block rounded capitalize ${category === cat ? "font-bold text-[#232F3E]" : "text-[#007185] hover:text-[#c45500]"}`}
              >
                {cat.replace(/-/g, " ")}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-6 py-6">
        <p className="text-sm text-gray-500 mb-4">
          {total} results{category ? ` for "${category.replace(/-/g, " ")}"` : ""}
          {search ? ` matching "${search}"` : ""}
        </p>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => {
            const price = parseFloat(product.price);
            const discount = parseFloat(product.discountPercentage);
            const rating = parseFloat(product.rating);

            return (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="border border-gray-200 rounded p-3 flex flex-col gap-2 hover:shadow-md transition-shadow h-full">
                  <div className="relative aspect-square bg-gray-50">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 20vw"
                    />
                    {discount > 0 && (
                      <span className="absolute top-1 left-1 bg-[#CC0C39] text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                        -{Math.round(discount)}%
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-900 leading-snug line-clamp-2 flex-1">
                    {product.title}
                  </p>
                  <StarRating rating={rating} />
                  <p className="text-base font-semibold text-gray-900">
                    ₹{price.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center gap-3 mt-8 justify-center">
            {currentPage > 1 && (
              <Link
                href={pageLink(currentPage - 1)}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-[#007185] hover:bg-gray-50"
              >
                ← Previous
              </Link>
            )}
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
              <Link
                href={pageLink(currentPage + 1)}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-[#007185] hover:bg-gray-50"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
