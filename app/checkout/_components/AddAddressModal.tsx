"use client";

import { useState } from "react";
import type { AddressPayload } from "@/lib/store";
import { INDIAN_STATES } from "./constants";

const inputCls =
  "w-full border border-[#888C8C] rounded-xl px-3 py-2 text-sm text-[#0F1111] focus:outline-none focus:border-[#007EB9] focus:ring-1 focus:ring-[#007EB9]";
const labelCls = "block text-sm font-bold text-[#0F1111] mb-1";

export default function AddAddressModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (addr: AddressPayload) => void;
}) {
  const [form, setForm] = useState({
    country: "India",
    fullName: "",
    email: "",
    mobile: "",
    pincode: "",
    flat: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    isDefault: false,
  });
  const [showDeliveryInstructions, setShowDeliveryInstructions] = useState(false);

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleAutofill() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(() => {
      set("pincode", "201310");
      set("city", "Greater Noida");
      set("state", "Uttar Pradesh");
    });
  }

  function handleSubmit() {
    onSave({
      fullName: form.fullName,
      email: form.email,
      mobile: form.mobile,
      pincode: form.pincode,
      flat: form.flat,
      area: form.area,
      landmark: form.landmark,
      city: form.city,
      state: form.state,
      country: form.country,
      isDefault: form.isDefault,
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">

        <div className="flex items-center justify-between bg-[#F0F2F2] px-5 py-4 border-b border-[#D5D9D9] rounded-t-2xl">
          <h2 className="text-base font-bold text-[#0F1111]">Add an address</h2>
          <button
            onClick={onClose}
            className="text-[#555] hover:text-[#0F1111] text-xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          <h3 className="text-[22px] font-bold text-[#0F1111]">
            Enter a new delivery address
          </h3>

          <div className="bg-[#EBF5FB] border border-[#C8E6F5] rounded-2xl flex items-center justify-between px-4 py-3">
            <span className="text-sm font-semibold text-[#0F1111]">
              Save time. Autofill your current location.
            </span>
            <button
              onClick={handleAutofill}
              className="border border-[#888C8C] rounded-full px-4 py-1.5 text-sm text-[#0F1111] bg-white hover:bg-gray-50 flex-shrink-0 ml-3"
            >
              Autofill
            </button>
          </div>

          <div>
            <label className={labelCls}>Country/Region</label>
            <select
              value={form.country}
              onChange={(e) => set("country", e.target.value)}
              className={inputCls}
            >
              <option>India</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Full name (First and Last name)</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Email address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="For order confirmation"
              className={inputCls}
            />
            <p className="text-xs text-[#565959] mt-1">Order confirmation will be sent to this email</p>
          </div>

          <div>
            <label className={labelCls}>Mobile number</label>
            <input
              type="tel"
              value={form.mobile}
              onChange={(e) => set("mobile", e.target.value)}
              className={inputCls}
            />
            <p className="text-xs text-[#565959] mt-1">May be used to assist delivery</p>
          </div>

          <div>
            <label className={labelCls}>Pincode</label>
            <input
              type="text"
              value={form.pincode}
              onChange={(e) => set("pincode", e.target.value)}
              placeholder="6 digits [0-9] PIN code"
              maxLength={6}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Flat, House no., Building, Company, Apartment</label>
            <input
              type="text"
              value={form.flat}
              onChange={(e) => set("flat", e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Area, Street, Sector, Village</label>
            <input
              type="text"
              value={form.area}
              onChange={(e) => set("area", e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Landmark</label>
            <input
              type="text"
              value={form.landmark}
              onChange={(e) => set("landmark", e.target.value)}
              placeholder="E.g. near apollo hospital"
              className={inputCls}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className={labelCls}>Town/City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="flex-1">
              <label className={labelCls}>State</label>
              <select
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
                className={inputCls}
              >
                <option value="">Choose a state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => set("isDefault", e.target.checked)}
              className="w-4 h-4 accent-[#007EB9]"
            />
            <span className="text-sm text-[#0F1111]">Make this my default address</span>
          </label>

          <div>
            <p className="text-sm font-bold text-[#0F1111] mb-1">
              Delivery instructions (optional)
            </p>
            <button
              onClick={() => setShowDeliveryInstructions((v) => !v)}
              className="flex items-center gap-1 text-sm text-[#2261A1] hover:text-[#C45500] hover:underline"
            >
              Add preferences, notes, access codes and more
              <span className="text-xs">{showDeliveryInstructions ? "▲" : "▼"}</span>
            </button>
            {showDeliveryInstructions && (
              <textarea
                placeholder="Add delivery instructions..."
                className="mt-2 w-full border border-[#888C8C] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#007EB9] resize-none h-20"
              />
            )}
          </div>

          <div className="pt-2 pb-1">
            <button
              onClick={handleSubmit}
              className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] font-medium text-sm px-6 py-2.5 rounded-full"
            >
              Use this address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
