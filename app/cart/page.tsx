"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { store, CartItem } from "@/lib/store";

function FulfilledBadge() {
  return (
    <img className="w-16 object-cover" src="./banner/amazon-fulfilled.png" alt="Amazon Fulfilled"  />
  );
}

function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = store();
  const price = parseFloat(item.price);
  const mrp =
    item.discountPercentage && item.discountPercentage > 0
      ? Math.round(price / (1 - item.discountPercentage / 100))
      : null;

  function handleDecrement() {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.quantity - 1);
    } else {
      removeFromCart(item.productId);
    }
  }

  return (
    <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-200 last:border-0">
      {/* Checkbox */}
      <input
        type="checkbox"
        defaultChecked
        className="mt-1 w-4 h-4 accent-[#007EB9] flex-shrink-0"
      />

      {/* Product image */}
      <div className="relative w-[130px] h-[100px] flex-shrink-0 bg-white">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-contain"
          sizes="130px"
        />
      </div>

      {/* Product info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.productId}`}
          className="text-sm text-gray-900 leading-snug line-clamp-2 mb-1 hover:text-[#C45500] hover:underline block"
        >
          {item.title}
        </Link>

        <p className="text-sm text-[#007600] mb-0.5">
          {item.availabilityStatus ?? "In stock"}
        </p>

        <p className="text-sm text-black mb-1">
          FREE delivery <span className="font-bold">Tue, 17 Mar</span> available at checkout
        </p>

        <div className="mb-1">
          <FulfilledBadge />
        </div>

        <label className="flex items-center gap-1.5 text-xs text-black mb-1 cursor-pointer">
          <input type="checkbox" className="w-3.5 h-3.5" />
          This will be a gift{" "}
          <span className="text-xs text-[#2261A1] hover:text-[#C45500] hover:underline cursor-pointer">
            Learn more
          </span>
        </label>

        {item.brand && (
          <p className="text-sm text-black mb-2">
            <strong>Brand:</strong> {item.brand}
          </p>
        )}

        {/* Quantity pill + action links */}
        <div className="flex items-center flex-wrap gap-x-1.5 gap-y-1 mt-2">
          <div className="inline-flex items-center border-2 border-[#FFD814] rounded-full px-3 py-0.5 gap-3 bg-white">
            <button
              onClick={handleDecrement}
              className="text-black hover:text-gray-900 text-base leading-none"
              aria-label="Decrease quantity or remove"
            >
              🗑
            </button>
            <span className="text-sm font-medium min-w-[1ch] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              className="text-black hover:text-gray-900 font-bold text-base leading-none"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <span className="text-gray-300 select-none">|</span>
          <button
            onClick={() => removeFromCart(item.productId)}
            className="text-xs text-[#2261A1] hover:text-[#C45500] hover:underline"
          >
            Delete
          </button>
          <span className="text-gray-300 select-none">|</span>
          <button className="text-xs text-[#2261A1] hover:text-[#C45500] hover:underline">
            Save for later
          </button>
          <span className="text-gray-300 select-none">|</span>
          <span className="text-xs text-[#2261A1] hover:text-[#C45500] hover:underline cursor-pointer">
            See more like this
          </span>
          <span className="text-gray-300 select-none">|</span>
          <span className="text-xs text-[#2261A1] hover:text-[#C45500] hover:underline cursor-pointer">
            Share
          </span>
        </div>
      </div>

      {/* Price column */}
      <div className="w-[180px] flex-shrink-0 text-right">
        {item.discountPercentage && item.discountPercentage > 0 ? (
          <>
            <p className="text-[#CC0C39] text-sm font-medium mb-0.5">
              Limited time deal
            </p>
            <div className="flex items-center justify-end gap-1.5 mb-0.5">
              <span className="bg-[#CC0C39] text-white text-xs font-bold px-1.5 py-0.5 rounded-sm">
                -{Math.round(item.discountPercentage)}%
              </span>
              <span className="text-lg font-semibold text-gray-900">
                ₹{price.toLocaleString("en-IN")}
                <sup className="text-xs font-normal">00</sup>
              </span>
            </div>
            {mrp && (
              <p className="text-sm text-gray-500">
                M.R.P.:{" "}
                <span className="line-through">
                  ₹{mrp.toLocaleString("en-IN")}
                </span>
              </p>
            )}
            <p className="text-xs text-gray-500 mt-0.5">Up to 5% back</p>
            <p className="text-xs text-[#2261A1] cursor-pointer hover:underline">
              Terms
            </p>
          </>
        ) : (
          <span className="text-lg font-semibold text-gray-900">
            ₹{price.toLocaleString("en-IN")}
          </span>
        )}
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cartItems, cartLoading, fetchCart } = store();

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-[#EAEDED] min-h-screen py-4">
      <div className="max-w-[1200px] mx-auto px-4 flex gap-4 items-start">
        {/* Left column */}
        <div className="flex-1 min-w-0">
          {/* Cart white card */}
          <div className="bg-white rounded">
            <div className="px-5 pt-5 pb-0">
              <h1 className="text-2xl font-normal text-gray-900 mb-1">
                Shopping Cart
              </h1>
              <button className="text-sm text-[#2261A1] hover:text-[#C45500] hover:underline mb-3">
                Deselect all items
              </button>
            </div>

            <div className="flex justify-end text-sm text-gray-500 px-5 pb-2 border-b border-gray-200">
              Price
            </div>

            {cartLoading && (
              <p className="text-gray-500 text-sm px-5 py-6">Loading cart…</p>
            )}

            {!cartLoading && cartItems.length === 0 && (
              <div className="px-5 py-10 text-center">
                <p className="text-xl text-black mb-1">
                  Your Amazon Cart is empty.
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  Your shopping cart lives here. Start shopping!
                </p>
                <Link
                  href="/products"
                  className="text-[#2261A1] hover:text-[#C45500] hover:underline text-sm"
                >
                  Continue shopping
                </Link>
              </div>
            )}

            {cartItems.map((item) => (
              <CartItemRow key={item.productId} item={item} />
            ))}

            {cartItems.length > 0 && (
              <div className="px-5 py-3 text-right border-t border-gray-200">
                <span className="text-base text-gray-900">
                  Subtotal ({totalItems}{" "}
                  {totalItems === 1 ? "item" : "items"}):{" "}
                  <strong className="font-bold">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </strong>
                </span>
              </div>
            )}
          </div>

          {/* Your Items section */}
          <div className="bg-white rounded mt-4 p-5">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Your Items
            </h2>
            <div className="flex border-b border-gray-200 mb-4">
              <button className="pb-2 border-b-2 border-[#232F3E] font-medium text-sm mr-6">
                Saved for later
              </button>
              <button className="pb-2 text-sm text-[#2261A1] hover:text-[#C45500]">
                Buy it again
              </button>
            </div>
            <p className="text-sm text-gray-500">No saved items.</p>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-[280px] flex-shrink-0 flex flex-col gap-4">
          {/* Proceed to Buy card */}
          <div className="border border-[#D5D9D9] rounded p-4 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-3 bg-[#0C7B3C] rounded-full" />
              <span className="text-sm text-black font-semibold whitespace-nowrap">
                ₹499
              </span>
            </div>
            <p className="text-xs text-[#0C7B3C]  font-bold">
              <span className="font-medium">✓</span> Your order
              is eligible for FREE Delivery.
            </p>
            <p className="text-xs text-black  mb-3">
              Choose <span className="underline text-[#2261A1]">FREE Delivery
              </span>  option at checkout.
            </p>

            <p className="text-base font-bold text-gray-900 mb-2">
              Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):{" "}
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </p>

            <label className="flex items-center gap-2 text-sm text-black mb-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              This order contains a gift
            </label>

            <Link
              href="/checkout"
              className="block w-full bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-medium text-sm py-2 rounded-full border border-[#FCD200] text-center"
            >
              Proceed to Buy
            </Link>
          </div>

          {/* Prime promo card */}
          <div className="bg-[#0775FF] rounded p-4 text-white">
            <p className="text-lg font-semibold">
              Enjoy faster deliveries, offers and so much more!
            </p>
            <p className="text-lg font-semibold mb-3">
              Join Prime now for FREE deliveries, cancel anytime!
            </p>
            <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-medium text-sm px-4 py-2 rounded-full border border-[#FCD200]">
              Join Prime Shopping Edition at ₹399/year
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
