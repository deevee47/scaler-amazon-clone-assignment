import Image from "next/image";
import Link from "next/link";
import { Product } from "@/type";

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products?limit=20", {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data.products;
}

const ProductsList = async () => {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="bg-white! border border-gray-200 rounded-md p-3 flex flex-col gap-2 hover:shadow-md transition-shadow duration-200 group"
        >
          <div className="relative w-full aspect-square overflow-hidden rounded-sm bg-gray-50">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
              {product.title}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-amazonOrange text-xs">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </span>
              <span className="text-xs text-gray-500">({product.rating})</span>
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-base font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-amazonOrange font-medium">
                  -{Math.round(product.discountPercentage)}%
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsList;
