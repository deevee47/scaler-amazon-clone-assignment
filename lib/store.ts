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

export interface WishlistItem {
  productId: number;
  title: string;
  price: string;
  thumbnail: string;
  discountPercentage: number;
  availabilityStatus: string;
  rating: number;
  ratingCount: number;
}

interface RawCartItem {
  id: number;
  sessionId: string;
  quantity: number;
  product: {
    id: number;
    title: string;
    price: string;
    thumbnail: string;
    stock: number;
    discountPercentage: string;
  };
}

interface RawWishlistItem {
  id: number;
  createdAt: string;
  product: {
    id: number;
    title: string;
    price: string;
    thumbnail: string;
    stock: number;
    discountPercentage: string;
    rating: string;
    reviews: unknown[];
  };
}

interface StoreType {
  cartItems: CartItem[];
  cartLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  wishlistItems: WishlistItem[];
  fetchWishlist: () => Promise<void>;
  saveForLater: (productId: number) => Promise<void>;
  moveToCart: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
}

function sessionHeaders() {
  return {
    "Content-Type": "application/json",
    "x-session-id": getSessionId(),
  };
}

export const store = create<StoreType>()((set, get) => ({
  cartItems: [],
  cartLoading: false,
  wishlistItems: [],

  fetchCart: async () => {
    set({ cartLoading: true });
    try {
      const res = await fetch(`${BASE_URL}/api/cart`, {
        headers: sessionHeaders(),
      });
      const json = await res.json();
      const rawItems: RawCartItem[] = json.data ?? [];
      const mapped: CartItem[] = rawItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        title: item.product.title,
        price: item.product.price,
        thumbnail: item.product.thumbnail,
        discountPercentage: parseFloat(item.product.discountPercentage),
        availabilityStatus: item.product.stock > 0 ? "In Stock" : "Out of Stock",
        brand: null,
      }));
      set({ cartItems: mapped });
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
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
    await fetch(`${BASE_URL}/api/cart/${productId}`, {
      method: "PATCH",
      headers: sessionHeaders(),
      body: JSON.stringify({ quantity }),
    });
  },

  removeFromCart: async (productId: number) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.productId !== productId),
    }));
    await fetch(`${BASE_URL}/api/cart/${productId}`, {
      method: "DELETE",
      headers: sessionHeaders(),
    });
  },

  clearCart: async () => {
    await fetch(`${BASE_URL}/api/cart/clear`, {
      method: "DELETE",
      headers: sessionHeaders(),
    });
    set({ cartItems: [] });
  },

  fetchWishlist: async () => {
    const res = await fetch(`${BASE_URL}/api/wishlist`, {
      headers: sessionHeaders(),
    });
    const json = await res.json();
    const rawItems: RawWishlistItem[] = json.data ?? [];
    const mapped: WishlistItem[] = rawItems.map((item) => ({
      productId: item.product.id,
      title: item.product.title,
      price: item.product.price,
      thumbnail: item.product.thumbnail,
      discountPercentage: parseFloat(item.product.discountPercentage),
      availabilityStatus: item.product.stock > 0 ? "In Stock" : "Out of Stock",
      rating: parseFloat(item.product.rating),
      ratingCount: Array.isArray(item.product.reviews) ? item.product.reviews.length : 0,
    }));
    set({ wishlistItems: mapped });
  },

  saveForLater: async (productId: number) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.productId !== productId),
    }));
    await fetch(`${BASE_URL}/api/cart/${productId}`, {
      method: "DELETE",
      headers: sessionHeaders(),
    });
    await fetch(`${BASE_URL}/api/wishlist`, {
      method: "POST",
      headers: sessionHeaders(),
      body: JSON.stringify({ productId }),
    });
    await get().fetchWishlist();
  },

  moveToCart: async (productId: number) => {
    set((state) => ({
      wishlistItems: state.wishlistItems.filter((item) => item.productId !== productId),
    }));
    await fetch(`${BASE_URL}/api/wishlist`, {
      method: "POST",
      headers: sessionHeaders(),
      body: JSON.stringify({ productId }),
    });
    await get().addToCart(productId);
  },

  removeFromWishlist: async (productId: number) => {
    set((state) => ({
      wishlistItems: state.wishlistItems.filter((item) => item.productId !== productId),
    }));
    await fetch(`${BASE_URL}/api/wishlist`, {
      method: "POST",
      headers: sessionHeaders(),
      body: JSON.stringify({ productId }),
    });
  },
}));
