"use client";

import { useRouter } from "next/navigation";
import { store } from "@/lib/store";
import { Product } from "@/type";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const router = useRouter();

  const handleAddToCart = () => {
    store.getState().addToCart(product.id);
  };

  const handleBuyNow = () => {
    store.getState().addToCart(product.id).then(() => router.push("/cart"));
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleAddToCart}
        className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-semibold text-sm py-2 rounded-full border border-[#FCD200]"
      >
        Add to Cart
      </button>
      <button
        onClick={handleBuyNow}
        className="w-full bg-[#FF9900] hover:bg-[#e88a00] text-gray-900 font-semibold text-sm py-2 rounded-full border border-[#e07c00]"
      >
        Buy Now
      </button>
    </div>
  );
}
