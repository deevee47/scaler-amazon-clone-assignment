"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { store } from "@/lib/store";
import { DELIVERY_FEE, AMAZON_PAY_BALANCE, type PaymentOption } from "./_components/constants";
import AddAddressModal from "./_components/AddAddressModal";
import DeliverySection from "./_components/DeliverySection";
import PaymentMethodSection from "./_components/PaymentMethodSection";
import OrderSummary from "./_components/OrderSummary";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, fetchCart, clearCart, addresses, fetchAddresses, saveAddress } = store();
  const [selectedPayment, setSelectedPayment] = useState<PaymentOption>("amazon-pay-balance");
  const [promoCode, setPromoCode] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [toast, setToast] = useState("");

  const address = addresses.find((a) => a.isDefault) ?? addresses[0] ?? null;

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const total = subtotal + DELIVERY_FEE;
  const isBalanceSelected = selectedPayment === "amazon-pay-balance";
  const balanceUsed = isBalanceSelected ? Math.min(subtotal, AMAZON_PAY_BALANCE) : 0;
  const freeDeliveryDeduction = isBalanceSelected ? DELIVERY_FEE : 0;
  const orderTotal = total - balanceUsed - freeDeliveryDeduction;

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  async function handlePlaceOrder() {
    if (!address) {
      showToast("Please add a delivery address before placing your order.");
      return;
    }

    const paymentMethodMap: Record<string, "cod" | "card" | "upi"> = {
      "amazon-pay-balance": "cod",
      "amazon-pay-later": "cod",
      "icici-amazon": "card",
      "icici": "card",
      "upi": "upi",
    };

    const body = {
      email: address.email ?? "guest@amazon.in",
      shippingAddress: {
        name: address.fullName,
        phone: address.mobile ?? "",
        line1: `${address.flat ?? ""} ${address.area ?? ""}`.trim(),
        line2: address.landmark ?? undefined,
        city: address.city ?? "",
        state: address.state ?? "",
        zip: address.pincode ?? "",
        country: address.country ?? "India",
      },
      paymentMethod: paymentMethodMap[selectedPayment] ?? "cod",
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Order failed");
      const data = await res.json();
      await clearCart();
      router.push(`/order-confirmation/${data.data.id}`);
    } catch {
      showToast("Failed to place order. Please try again.");
    }
  }

  return (
    <>
      {showAddressModal && (
        <AddAddressModal
          onClose={() => setShowAddressModal(false)}
          onSave={(addr) => saveAddress(addr)}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F1111] text-white text-sm px-5 py-3 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      <div className="bg-[#EAEDED] min-h-screen">
        <div className="max-w-[1200px] mx-auto px-4 py-6 flex gap-6 items-start">

          {/* Left column */}
          <div className="flex-1 min-w-0 flex flex-col gap-0">
            <DeliverySection
              address={address}
              onChangeAddress={() => setShowAddressModal(true)}
            />
            <div className="h-3 bg-[#EAEDED]" />
            <PaymentMethodSection
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              subtotal={subtotal}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
            />
          </div>

          {/* Right sidebar */}
          <OrderSummary
            subtotal={subtotal}
            total={total}
            orderTotal={orderTotal}
            isBalanceSelected={isBalanceSelected}
            balanceUsed={balanceUsed}
            onPlaceOrder={handlePlaceOrder}
          />

        </div>
      </div>
    </>
  );
}
