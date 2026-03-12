import { Product } from "@/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreType {
  cartProduct: Product[];
  addToCart: (product: Product) => Promise<void>;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  resetCart: () => void;
}

const customStorage = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: unknown): void => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const store = create<StoreType>()(
  persist(
    (set) => ({
      cartProduct: [],
      addToCart: (product: Product) => {
        return new Promise<void>((resolve) => {
          set((state: StoreType) => {
            const existingProduct = state.cartProduct.find(
              (p) => p.id === product.id
            );
            if (existingProduct) {
              return {
                cartProduct: state.cartProduct.map((p) =>
                  p.id === product.id
                    ? { ...p, quantity: (p.quantity || 0) + 1 }
                    : p
                ),
              };
            } else {
              return {
                cartProduct: [...state.cartProduct, { ...product, quantity: 1 }],
              };
            }
          });
          resolve();
        });
      },
      decreaseQuantity: (productId: number) => {
        set((state: StoreType) => {
          const existingProduct = state.cartProduct.find(
            (p) => p.id === productId
          );
          if (existingProduct) {
            return {
              cartProduct: state.cartProduct.map((p) =>
                p.id === productId
                  ? { ...p, quantity: Math.max((p?.quantity ?? 1) - 1, 1) }
                  : p
              ),
            };
          }
          return state;
        });
      },
      removeFromCart: (productId: number) => {
        set((state: StoreType) => ({
          cartProduct: state.cartProduct.filter((item) => item.id !== productId),
        }));
      },
      resetCart: () => {
        set({ cartProduct: [] });
      },
    }),
    {
      name: "store-storage",
      storage: customStorage,
    }
  )
);
