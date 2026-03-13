"use client";

import { DELIVERY_FEE } from "./constants";

export default function OrderSummary({
  subtotal,
  total,
  orderTotal,
  isBalanceSelected,
  balanceUsed,
  onPlaceOrder,
}: {
  subtotal: number;
  total: number;
  orderTotal: number;
  isBalanceSelected: boolean;
  balanceUsed: number;
  onPlaceOrder: () => void;
}) {
  return (
    <div className="w-[300px] flex-shrink-0 bg-white border border-[#D5D9D9] rounded p-4">

      <button
        onClick={onPlaceOrder}
        className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] font-medium text-sm py-2.5 rounded-full"
      >
        Use this payment method
      </button>

      <p className="text-center text-sm text-[#0F1111] mt-2">
        Order total:{" "}
        <strong>₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</strong>
      </p>

      <div className="mt-4 border-t border-[#E7E7E7] pt-4 flex flex-col gap-1.5 text-sm">

        <div className="flex justify-between">
          <span className="text-[#0F1111]">Items:</span>
          <span className="text-[#0F1111]">
            ₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#0F1111]">Delivery:</span>
          <span className="text-[#0F1111]">₹{DELIVERY_FEE}.00</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#0F1111]">Total:</span>
          <span className="text-[#0F1111]">
            ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        </div>

        {isBalanceSelected && (
          <>
            <div className="flex justify-between">
              <span className="text-[#007600]">Amazon Pay balance:</span>
              <span className="text-[#B12704]">
                -₹{balanceUsed.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#007600]">FREE Delivery</span>
              <span className="text-[#B12704]">-₹{DELIVERY_FEE}.00</span>
            </div>
          </>
        )}

        <div className="flex justify-between font-bold text-lg border-t border-[#E7E7E7] pt-3 mt-1">
          <span className="text-[#0F1111]">Order Total:</span>
          <span className="text-[#0F1111]">
            ₹{orderTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
