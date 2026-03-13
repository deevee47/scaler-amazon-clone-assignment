"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSessionId } from "@/lib/session";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

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

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    placed: "bg-blue-100 text-blue-700",
    confirmed: "bg-green-100 text-green-700",
    shipped: "bg-yellow-100 text-yellow-700",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-700",
  };
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[status] ?? "bg-gray-100 text-gray-600"}`}>
      {label}
    </span>
  );
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/orders`, {
      headers: {
        "x-session-id": getSessionId(),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load orders");
        return res.json();
      })
      .then((data) => {
        setOrders(data.data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EAEDED] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#FFD814] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#EAEDED] flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md max-w-lg w-full p-8 text-center">
          <p className="text-red-600 mb-4">{error}</p>
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

  return (
    <div className="min-h-screen bg-[#EAEDED] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
            </svg>
            <p className="text-gray-500 text-lg mb-2">No orders yet</p>
            <p className="text-gray-400 text-sm mb-6">Looks like you haven&apos;t placed any orders.</p>
            <Link
              href="/"
              className="bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-medium py-2 px-8 rounded-md transition-colors inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="bg-[#F0F2F2] px-6 py-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Order Placed</p>
                      <p className="text-gray-800">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total</p>
                      <p className="text-gray-800 font-medium">{formatPrice(order.amount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Payment</p>
                      <p className="text-gray-800">{paymentLabel(order.paymentMethod)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Order # {order.id}</p>
                      <StatusBadge status={order.status} />
                    </div>
                    <Link
                      href={`/order-confirmation/${order.id}`}
                      className="text-[#007EB9] hover:text-[#2261A1] hover:underline text-sm font-medium whitespace-nowrap"
                    >
                      View details
                    </Link>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4 divide-y divide-gray-100">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-16 h-16 object-contain border border-gray-100 rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Qty: {item.quantity} · {formatPrice(item.price)} each
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-800 whitespace-nowrap flex-shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="px-6 py-3 border-t border-gray-100 flex justify-end">
                  <Link
                    href={`/order-confirmation/${order.id}`}
                    className="text-sm bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-medium py-1.5 px-5 rounded-md transition-colors"
                  >
                    View Order Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
