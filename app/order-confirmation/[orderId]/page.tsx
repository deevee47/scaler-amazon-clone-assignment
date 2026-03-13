"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface ShippingAddress {
  name: string;
  line1: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

interface Order {
  id: string;
  email: string;
  amount: number;
  paymentMethod: string;
  status: string;
  shippingAddress: ShippingAddress;
  createdAt: string;
  items: OrderItem[];
}

function formatPrice(price: number) {
  return Number(price).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function paymentLabel(method: string) {
  if (method === "cod") return "Cash on Delivery";
  if (method === "card") return "Credit/Debit Card";
  if (method === "upi") return "UPI";
  return method;
}

export default function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/orders/${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load order");
        return res.json();
      })
      .then((data) => {
        setOrder(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EAEDED] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#FFD814] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#EAEDED] flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md max-w-lg w-full p-8 text-center">
          <p className="text-red-600 mb-4">{error ?? "Order not found."}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-medium py-2 px-6 rounded-md transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const addr = order.shippingAddress;

  return (
    <div className="min-h-screen bg-[#EAEDED] py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Order Placed!</h1>
            <p className="text-gray-600 text-sm">Thank you. Your order has been placed.</p>
            <p className="text-xs text-gray-500 mt-1">
              Order <span className="font-mono font-semibold text-gray-700">#{order.id}</span>
              {" · "}
              {formatDate(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4 border-b pb-2">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 items-start">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-16 h-16 object-contain border border-gray-100 rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 leading-snug">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Qty: {item.quantity} · {formatPrice(item.price)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Address + Payment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-3 border-b pb-2">Delivery Address</h2>
            <p className="text-sm font-medium text-gray-800">{addr.name}</p>
            <p className="text-sm text-gray-600">{addr.line1}</p>
            <p className="text-sm text-gray-600">
              {addr.city}, {addr.state} {addr.zip}
            </p>
            <p className="text-sm text-gray-600 mt-1">{addr.phone}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-3 border-b pb-2">Payment</h2>
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <span>💳</span>
              {paymentLabel(order.paymentMethod)}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4 border-b pb-2">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Items total:</span>
              <span>{formatPrice(order.amount)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping:</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="flex justify-between font-bold text-base text-gray-900 border-t pt-2 mt-2">
              <span>Order Total:</span>
              <span>{formatPrice(order.amount)}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pb-4">
          <button
            onClick={() => router.push("/")}
            className="bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-medium py-2 px-8 rounded-md transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
