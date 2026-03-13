"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "zustand";
import { store } from "@/lib/store";

export default function CartSidebar() {
  const cartItems = useStore(store, (s) => s.cartItems);
  const fetchCart = useStore(store, (s) => s.fetchCart);
  const updateQuantity = useStore(store, (s) => s.updateQuantity);
  const removeFromCart = useStore(store, (s) => s.removeFromCart);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (cartItems.length === 0) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="w-[130px] flex-shrink-0 bg-white">
      {/* Subtotal */}
      <div className="mb-2">
        <p className="text-sm text-gray-800">
          Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items):{" "}
          <span className="font-bold">₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </p>
        <p className="text-xs text-[#007600] mt-1 leading-tight">
          Your order is eligible for FREE Delivery. Select this option at checkout.{" "}
          <span className="text-[#2261A1] hover:underline cursor-pointer">Details</span>
        </p>
      </div>

      <Link href="/cart">
        <button className="w-full border border-gray-400 rounded-full text-sm py-1.5 bg-white hover:bg-gray-50 text-gray-800 font-medium mb-3">
          Go to Cart
        </button>
      </Link>

      <hr className="border-gray-200 mb-3" />

      {/* Cart items */}
      <div className="flex flex-col gap-4">
        {cartItems.slice(0, 4).map((item, idx) => (
          <div key={item.productId} className="flex text-center items-center flex-col gap-1.5">
            {/* Big image */}
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-contain p-0"
                sizes="160px"
              />
            </div>

            
            {/* Selling fast chip */}
            <span
              className={`w-fit text-center inline-block text-white text-xs font-bold px-2 py-0.5 ${
                idx % 2 === 0 ? "bg-red-600" : "bg-[#c45500]"
              }`}
            >
              {idx % 2 === 0 ? "Selling fast" : "Limited time"}
            </span>

            {/* Price */}
            <p className="text-sm font-bold text-gray-900">
              ₹{parseFloat(item.price).toLocaleString("en-IN")}
            </p>


            {/* Quantity controls */}
            <div className="flex justify-center">
              <div className="inline-flex items-center border-3 border-[#FFD814] rounded-full px-3 py-0.5 gap-3 bg-white">
                <button
                  onClick={() => item.quantity > 1 ? updateQuantity(item.productId, item.quantity - 1) : removeFromCart(item.productId)}
                  className="text-black font-bold text-base leading-none"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-sm text-black font-bold min-w-[1ch] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="text-black font-bold text-base leading-none"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
