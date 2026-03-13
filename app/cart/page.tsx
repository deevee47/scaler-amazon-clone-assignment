"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { store } from "@/lib/store";

export default function CartPage() {
  const { cartItems, cartLoading, fetchCart, updateQuantity, removeFromCart } = store();

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#EAEDED] py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-4 items-start">
        {/* Cart items */}
        <div className="flex-1 bg-white rounded p-6">
          <h1 className="text-2xl font-normal text-gray-900 border-b border-gray-200 pb-4 mb-4">
            Shopping Cart
          </h1>

          {cartLoading && (
            <p className="text-gray-500 text-sm py-4">Loading cart...</p>
          )}

          {!cartLoading && cartItems.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-lg text-gray-700 mb-4">Your Amazon Cart is empty.</p>
              <Link href="/products" className="text-[#007185] hover:text-[#c45500] hover:underline text-sm">
                Continue shopping
              </Link>
            </div>
          )}

          {cartItems.map((item) => {
            const price = parseFloat(item.price);
            return (
              <div
                key={item.productId}
                className="flex gap-4 py-4 border-b border-gray-200 last:border-0"
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="96px"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <Link
                    href={`/products/${item.productId}`}
                    className="text-sm text-[#007185] hover:text-[#c45500] hover:underline font-medium leading-snug"
                  >
                    {item.title}
                  </Link>
                  {item.brand && (
                    <p className="text-xs text-gray-500">{item.brand}</p>
                  )}
                  {item.availabilityStatus && (
                    <p
                      className={`text-xs font-medium ${
                        item.availabilityStatus === "In Stock"
                          ? "text-[#007600]"
                          : "text-red-600"
                      }`}
                    >
                      {item.availabilityStatus}
                    </p>
                  )}
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    ₹{price.toLocaleString("en-IN")}
                  </p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-lg font-medium text-gray-700 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-lg font-medium text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-sm text-[#007185] hover:text-[#c45500] hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {cartItems.length > 0 && (
            <p className="text-right text-lg font-normal text-gray-900 pt-4">
              Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):
              <span className="font-bold ml-1">₹{subtotal.toLocaleString("en-IN")}</span>
            </p>
          )}
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-64 flex-shrink-0 bg-white rounded p-5 flex flex-col gap-3">
          {cartItems.length > 0 ? (
            <>
              <p className="text-base text-gray-700">
                Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):{" "}
                <span className="font-bold">₹{subtotal.toLocaleString("en-IN")}</span>
              </p>
              <Link
                href="/checkout"
                className="block w-full bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-semibold text-sm py-2 rounded-full border border-[#FCD200] text-center"
              >
                Proceed to Checkout
              </Link>
            </>
          ) : (
            <p className="text-sm text-gray-600">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}
