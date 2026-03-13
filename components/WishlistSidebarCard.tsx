"use client";

import Image from "next/image";
import { WishlistItem } from "@/lib/store";

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="text-2xl leading-none">
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f${i}`} className="text-[#FF9900]">★</span>
      ))}
      {half && <span className="text-[#FF9900]">½</span>}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e${i}`} className="text-[#FF9900]">☆</span>
      ))}
    </span>
  );
}

interface Props {
  wishlistItems: WishlistItem[];
  addToCart: (productId: number) => Promise<void>;
}

export default function WishlistSidebarCard({ wishlistItems, addToCart }: Props) {
  if (wishlistItems.length === 0) return null;

  return (
    <div className="rounded border border-[#D5D9D9] p-4 bg-white">
      <h2 className="text-lg font-bold text-gray-900 mb-3">Your Wishlist</h2>
      <div className="divide-y divide-gray-200">
        {wishlistItems.map((item) => {
          const price = parseFloat(item.price);
          const intPart = Math.floor(price).toLocaleString("en-IN");
          const decPart = (price % 1).toFixed(2).slice(2);

          return (
            <div key={item.productId} className="py-4 flex gap-3">
              {/* Thumbnail */}
              <div className="relative w-[100px] h-[130px] flex-shrink-0 bg-white">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="100px"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <p className="text-sm font-medium text-[#2261A1] line-clamp-2 leading-snug">
                  {item.title}
                </p>

                <Stars rating={item.rating} />

                <p className="text-sm font-semibold text-[#2261A1]">
                  {item.ratingCount.toLocaleString("en-IN")} ratings
                </p>

                <p className="text-xl font-bold text-gray-900 leading-tight">
                  <span className="text-sm align-top mt-1 inline-block">₹</span>
                  {intPart}
                  <sup className="text-xs font-normal">{decPart}</sup>
                </p>

                <button
                  onClick={() => addToCart(item.productId)}
                  className="w-full mt-1 text-sm bg-white hover:bg-gray-50 text-gray-900 font-medium py-1 rounded-full border border-gray-400"
                >
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
