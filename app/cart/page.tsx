"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { store, CartItem, WishlistItem } from "@/lib/store";
import WishlistSidebarCard from "@/components/WishlistSidebarCard";

function FulfilledBadge() {
  return (
    <img className="w-16 object-cover" src="./banner/amazon-fulfilled.png" alt="Amazon Fulfilled" />
  );
}

const DEAL_LABELS = ["Selling Fast", "Best Value", "Limited Time Deal", "Top Pick", "Hot Deal"];

function dealLabel(productId: number) {
  return DEAL_LABELS[productId % DEAL_LABELS.length];
}

function CartItemRow({
  item,
  isSelected,
  onToggle,
  onSaveForLater,
}: {
  item: CartItem;
  isSelected: boolean;
  onToggle: () => void;
  onSaveForLater: () => void;
}) {
  const { updateQuantity, removeFromCart } = store();
  const unitPrice = parseFloat(item.price);
  const price = unitPrice * item.quantity;
  const mrp =
    item.discountPercentage && item.discountPercentage > 0
      ? Math.round(unitPrice / (1 - item.discountPercentage / 100)) * item.quantity
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
        checked={isSelected}
        onChange={onToggle}
        className="mt-1 w-4 h-4 accent-[#007EB9] flex-shrink-0 cursor-pointer"
      />

      {/* Product image */}
      <div className={`relative w-[250px] h-[170px] flex-shrink-0 bg-white transition-opacity ${!isSelected ? "opacity-40" : ""}`}>
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-cover"
          sizes="130px"
        />
      </div>

      {/* Product info */}
      <div className={`flex-1 min-w-0 transition-opacity ${!isSelected ? "opacity-40" : ""}`}>
        <Link
          href={`/products/${item.productId}`}
          className="text-xl text-gray-900 leading-snug line-clamp-2 mb-1 hover:text-[#C45500] hover:underline block"
        >
          {item.title}
        </Link>

        <p className="text-xs text-[#007600] mb-0.5">
          {item.availabilityStatus ?? "In stock"}
        </p>

        <p className="text-sm text-black mb-1">
          FREE delivery{" "}
          <span className="font-bold">
            {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </span>{" "}
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
              −
            </button>
            <span className="text-sm text-black font-medium min-w-[1ch] text-center">
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
          <button
            onClick={onSaveForLater}
            className="text-xs text-[#2261A1] hover:text-[#C45500] hover:underline"
          >
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
      <div className={`w-[220px] flex-shrink-0 text-right transition-opacity ${!isSelected ? "opacity-40" : ""}`}>
        {item.discountPercentage && item.discountPercentage > 0 ? (
          <>
            <p className="text-[#CC0C39] text-sm font-medium mb-0.5">
              {dealLabel(item.productId)}
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

function SavedItemCard({ item }: { item: WishlistItem }) {
  const { moveToCart, removeFromWishlist } = store();
  const isLowStock = item.availabilityStatus?.toLowerCase().includes("low");

  return (
    <div className="flex flex-col border border-gray-200 rounded bg-white overflow-hidden">
      <div className="relative w-full h-[200px] bg-white">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-contain"
          sizes="250px"
        />
      </div>
      <div className="flex flex-col flex-1 p-3 gap-1.5">
        <p className="text-lg font-medium text-gray-900 line-clamp-2 leading-4">{item.title}</p>
        <p className="text-lg font-bold text-gray-900">
          ₹{parseFloat(item.price).toLocaleString("en-IN")}
        </p>
        <p className="text-xs font-medium" style={{ color: isLowStock ? "#CC0C39" : "#007600" }}>
          {item.availabilityStatus ?? "In stock"}
        </p>
        <FulfilledBadge />
        <button
          onClick={() => moveToCart(item.productId)}
          className="w-full mt-1 py-1.5 text-xs font-medium text-gray-900 bg-white border border-gray-400 rounded-full hover:bg-gray-50"
        >
          Move to cart
        </button>
        <div className="flex items-center gap-1.5 text-xs flex-wrap">
          <button
            onClick={() => removeFromWishlist(item.productId)}
            className="text-[#2261A1] hover:text-[#C45500] hover:underline"
          >
            Delete
          </button>
          <span className="text-gray-300 select-none">|</span>
          <span className="text-[#2261A1] hover:text-[#C45500] hover:underline cursor-pointer">
            Add to list
          </span>
          <span className="text-gray-300 select-none">|</span>
          <span className="text-[#2261A1] hover:text-[#C45500] hover:underline cursor-pointer">
            See more like this
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cartItems, cartLoading, fetchCart, wishlistItems, fetchWishlist, saveForLater, addToCart } = store();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, []);

  // Keep selectedIds in sync when items are added/removed
  useEffect(() => {
    setSelectedIds(new Set(cartItems.map((item) => item.productId)));
  }, [cartItems.map((i) => i.productId).join(",")]);

  const allSelected = cartItems.length > 0 && cartItems.every((item) => selectedIds.has(item.productId));

  function toggleItem(productId: number) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }

  function toggleAll() {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(cartItems.map((item) => item.productId)));
    }
  }

  const selectedItems = cartItems.filter((item) => selectedIds.has(item.productId));
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-[#EAEDED] min-h-screen py-4">
      <div className="w-full px-6 flex gap-4 items-start">
        {/* Left column */}
        <div className="flex-1 min-w-0">
          {/* Cart white card */}
          <div className="bg-white rounded">
            <div className="px-5 pt-5 pb-0">
              <h1 className="text-2xl font-normal text-gray-900 mb-1">
                Shopping Cart
              </h1>
              {cartItems.length > 0 && (
                <button
                  onClick={toggleAll}
                  className="text-sm text-[#2261A1] hover:text-[#C45500] hover:underline mb-3"
                >
                  {allSelected ? "Deselect all items" : "Select all items"}
                </button>
              )}
            </div>

            <div className="flex justify-end text-sm text-gray-600 px-5 border-b border-gray-200">
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
              <CartItemRow
                key={item.productId}
                item={item}
                isSelected={selectedIds.has(item.productId)}
                onToggle={() => toggleItem(item.productId)}
                onSaveForLater={() => saveForLater(item.productId)}
              />
            ))}

            {cartItems.length > 0 && (
              <div className="px-5 py-3 text-right border-t border-gray-200">
                <span className="text-lg font-semimedium text-gray-900">
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
              <button className="text-black pb-2 border-b-2 border-[#232F3E] font-medium text-sm mr-6">
                Saved for later
              </button>
              <button className="pb-2 text-sm text-[#2261A1] hover:text-[#C45500]">
                Buy it again
              </button>
            </div>
            {wishlistItems.length === 0 ? (
              <p className="text-sm text-gray-500">No saved items.</p>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {wishlistItems.map((item) => (
                  <SavedItemCard key={item.productId} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-[320px] flex-shrink-0 flex flex-col gap-4">
          {/* Proceed to Buy card */}
          <div className="border border-[#D5D9D9] rounded p-4 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-3 bg-[#0C7B3C] rounded-full" />
              <span className="text-sm text-black whitespace-nowrap">
                ₹499
              </span>
            </div>
            <p className="text-xs text-[#0C7B3C] font-bold">
              <span className="font-medium">✓</span> Your order is eligible for
              FREE Delivery.
            </p>
            <p className="text-xs text-black mb-3">
              Choose{" "}
              <span className="underline text-[#2261A1]">FREE Delivery</span>{" "}
              option at checkout.
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

          {wishlistItems.length > 0 && (
            <WishlistSidebarCard wishlistItems={wishlistItems} addToCart={addToCart} />
          )}
        </div>
      </div>
    </div>
  );
}
