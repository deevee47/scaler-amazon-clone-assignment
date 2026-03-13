import { create } from "zustand";
import { getSessionId } from "@/lib/session";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export interface CartItem {
  productId: number;
  quantity: number;
  title: string;
  price: string;
  thumbnail: string;
  brand?: string | null;
  availabilityStatus?: string | null;
  discountPercentage?: number;
}

interface StoreType {
  cartItems: CartItem[];
  cartLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

function sessionHeaders() {
  return {
    "Content-Type": "application/json",
    "x-session-id": getSessionId(),
  };
}

export const store = create<StoreType>()((set) => ({
  cartItems: [],
  cartLoading: false,

  fetchCart: async () => {
    set({ cartLoading: true });
    try {
      const res = await fetch(`${BASE_URL}/api/cart`, {
        headers: sessionHeaders(),
      });
      const json = await res.json();
      set({ cartItems: json.data ?? [] });
    } finally {
      set({ cartLoading: false });
    }
  },

  addToCart: async (productId: number) => {
    await fetch(`${BASE_URL}/api/cart`, {
      method: "POST",
      headers: sessionHeaders(),
      body: JSON.stringify({ productId, quantity: 1 }),
    });
    await store.getState().fetchCart();
  },

  updateQuantity: async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      await store.getState().removeFromCart(productId);
      return;
    }
    await fetch(`${BASE_URL}/api/cart/${productId}`, {
      method: "PATCH",
      headers: sessionHeaders(),
      body: JSON.stringify({ quantity }),
    });
    await store.getState().fetchCart();
  },

  removeFromCart: async (productId: number) => {
    await fetch(`${BASE_URL}/api/cart/${productId}`, {
      method: "DELETE",
      headers: sessionHeaders(),
    });
    await store.getState().fetchCart();
  },

  clearCart: async () => {
    await fetch(`${BASE_URL}/api/cart`, {
      method: "DELETE",
      headers: sessionHeaders(),
    });
    set({ cartItems: [] });
  },
}));
