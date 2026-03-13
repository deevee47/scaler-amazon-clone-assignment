"use client";

import type { AddressRecord } from "@/lib/store";

export default function DeliverySection({
  address,
  onChangeAddress,
}: {
  address: AddressRecord | null;
  onChangeAddress: () => void;
}) {
  return (
    <div className="bg-white px-6 py-5">
      <div className="flex items-start justify-between">
        <div>
          {address ? (
            <>
              <p className="font-bold text-[18px] text-[#0F1111] mb-1">
                Delivering to {address.fullName}
              </p>
              <p className="text-sm text-[#0F1111] mb-2">
                {[address.flat, address.area, address.landmark, address.city, address.state, address.pincode, address.country]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </>
          ) : (
            <p className="text-sm text-[#565959] mb-2">
              No delivery address saved. Add one below.
            </p>
          )}
          <button className="text-sm text-[#2261A1] hover:text-[#C45500] hover:underline">
            Add delivery instructions
          </button>
        </div>
        <button
          onClick={onChangeAddress}
          className="text-sm text-[#2261A1] hover:text-[#C45500] hover:underline flex-shrink-0 ml-8"
        >
          {address ? "Change" : "Add address"}
        </button>
      </div>
    </div>
  );
}
