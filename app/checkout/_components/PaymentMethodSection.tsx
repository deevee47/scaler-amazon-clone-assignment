"use client";

import Image from "next/image";
import { AMAZON_PAY_BALANCE, type PaymentOption } from "./constants";

function VisaIcon() {
  return (
    <Image
      src="/checkout/visa.png"
      alt="Visa"
      width={40}
      height={24}
      className="inline-block ml-2 align-middle"
    />
  );
}

function UpiLogo() {
  return (
    <Image
      src="/checkout/amazonpay.png"
      alt="Amazon Pay"
      width={24}
      height={8}
      className="inline-block ml-2 align-middle"
    />
  );
}

function AmazonPayCashbackIcon() {
  return (
    <span className="inline-flex items-center justify-center bg-[#232F3E] text-white text-[9px] font-bold rounded px-1.5 py-0.5 ml-2 leading-none">
      %<span className="ml-0.5 text-[#FFD814]">✓</span>
    </span>
  );
}

export default function PaymentMethodSection({
  selectedPayment,
  setSelectedPayment,
  subtotal,
  promoCode,
  setPromoCode,
}: {
  selectedPayment: PaymentOption;
  setSelectedPayment: (p: PaymentOption) => void;
  subtotal: number;
  promoCode: string;
  setPromoCode: (v: string) => void;
}) {
  const isBalanceSelected = selectedPayment === "amazon-pay-balance";

  return (
    <div className="bg-white px-6 py-5">
      <h2 className="text-[18px] font-bold text-[#0F1111] mb-4">Payment method</h2>

      <div className="border border-[#D5D9D9] rounded">

        {/* Your available balance */}
        <div className="px-5 pt-5 pb-3">
          <p className="text-sm font-bold text-[#0F1111] mb-3">Your available balance</p>

          <label
            className={`flex items-center gap-3 px-4 py-3 rounded cursor-pointer border transition-colors ${
              isBalanceSelected
                ? "bg-[#FFF3E0] border-[#E8A020]"
                : "border-transparent hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={isBalanceSelected}
              onChange={() => setSelectedPayment("amazon-pay-balance")}
              className="accent-[#007EB9] flex-shrink-0 w-4 h-4"
            />
            <span className="text-sm text-[#0F1111]">
              Use{" "}
              <strong>
                ₹{Math.min(subtotal, AMAZON_PAY_BALANCE).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </strong>{" "}
              of your{" "}
              <strong>
                ₹{AMAZON_PAY_BALANCE.toLocaleString("en-IN", { minimumFractionDigits: 2 })} Amazon Pay Balance
              </strong>
            </span>
          </label>

          {/* Promo code */}
          <div className="flex items-center gap-2 mt-4 mb-1">
            <span className="text-[#2261A1] text-lg font-medium select-none">+</span>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter Code"
              className="border border-[#888C8C] rounded px-3 py-1.5 text-sm text-[#0F1111] w-52 focus:outline-none focus:border-[#007EB9] placeholder:text-[#767676]"
            />
            <button className="border border-[#888C8C] rounded-full px-4 py-1.5 text-sm text-[#0F1111] bg-white hover:bg-gray-50">
              Apply
            </button>
          </div>
        </div>

        {/* Credit & Debit Cards */}
        <div className="px-5 pt-3 pb-3 border-t border-[#E7E7E7]">
          <p className="text-sm font-bold text-[#0F1111] mb-2">CREDIT &amp; DEBIT CARDS</p>
          <div className="border-t border-[#E7E7E7]">
            <div className="flex justify-end pr-2 pt-1 pb-0.5">
              <span className="text-xs text-[#565959]">Nickname</span>
            </div>

            <label className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-gray-50 px-1 rounded">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === "card-icici-amazon"}
                onChange={() => setSelectedPayment("card-icici-amazon")}
                className="accent-[#007EB9] w-4 h-4 flex-shrink-0"
              />
              <span className="flex-1 text-sm text-[#0F1111]">
                <strong>Amazon Pay ICICI Bank Credit Card</strong>
                {" "}ending in 4069
                <AmazonPayCashbackIcon />
              </span>
              <span className="text-sm text-[#0F1111] w-36 text-right flex-shrink-0">
                JOHN DOE
              </span>
            </label>

            <label className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-gray-50 px-1 rounded">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === "card-icici"}
                onChange={() => setSelectedPayment("card-icici")}
                className="accent-[#007EB9] w-4 h-4 flex-shrink-0"
              />
              <span className="flex-1 text-sm text-[#0F1111]">
                <strong>ICICI Bank Credit Card</strong>
                {" "}ending in 2026
                <VisaIcon />
              </span>
              <span className="text-sm text-[#0F1111] w-36 text-right flex-shrink-0">
                JOHN DOE
              </span>
            </label>
          </div>
        </div>

        {/* Buy now, Pay later */}
        <div className="px-5 pt-3 pb-3 border-t border-[#E7E7E7]">
          <p className="text-sm font-bold text-[#0F1111] mb-2">Buy now, Pay later</p>
          <div className="border-t border-[#E7E7E7] pt-3">
            <label className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 px-1 py-1 rounded">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === "amazon-pay-later"}
                onChange={() => setSelectedPayment("amazon-pay-later")}
                className="accent-[#007EB9] w-4 h-4 flex-shrink-0 mt-0.5"
              />
              <div>
                <p className="text-sm font-bold text-[#0F1111]">Amazon Pay Later</p>
                <p className="text-xs text-[#565959] mt-0.5">Available Credit: ₹35,000</p>
              </div>
            </label>
          </div>
        </div>

        {/* UPI */}
        <div className="px-5 pt-3 pb-3 border-t border-[#E7E7E7]">
          <p className="text-sm font-bold text-[#0F1111] mb-2">UPI</p>
          <div className="border-t border-[#E7E7E7] pt-3">
            <label className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 px-1 py-1 rounded">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === "upi"}
                onChange={() => setSelectedPayment("upi")}
                className="accent-[#007EB9] w-4 h-4 flex-shrink-0 mt-0.5"
              />
              <div>
                <div className="flex items-center">
                  <span className="text-sm font-bold text-[#0F1111]">Amazon Pay</span>
                  <UpiLogo />
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs text-[#565959]">ICICI Bank ..**88</span>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Another payment method */}
        <div className="px-5 pt-3 pb-4 border-t border-[#E7E7E7]">
          <p className="text-sm font-bold text-[#0F1111] mb-2">Another payment method</p>
          <div className="border-t border-[#E7E7E7] pt-3 flex flex-col gap-1.5">
            <button className="text-sm text-[#2261A1] hover:text-[#C45500] hover:underline text-left">
              Add a credit or debit card
            </button>
            <button className="text-sm text-[#2261A1] hover:text-[#C45500] hover:underline text-left">
              Net Banking
            </button>
            <button className="text-sm text-[#2261A1] hover:text-[#C45500] hover:underline text-left">
              Cash on Delivery / Pay on Delivery
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
