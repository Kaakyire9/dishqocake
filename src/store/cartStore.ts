import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/products";

export type CartItem = Product & { quantity: number };

export type CartState = {
  items: CartItem[];
  addItem: (p: Product, qty?: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set, get) => ({
      items: [],
      addItem: (p: Product, qty = 1) => {
        const items = get().items.slice();
        const idx = items.findIndex((i) => i.id === p.id);
        if (idx >= 0) {
          items[idx].quantity += qty;
        } else {
          items.push({ ...p, quantity: qty });
        }
        set({ items });
      },
      removeItem: (id: string) => set({ items: get().items.filter((i) => i.id !== id) }),
      clearCart: () => set({ items: [] }),
      increase: (id: string) => {
        const items = get().items.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
        set({ items });
      },
      decrease: (id: string) => {
        let items = get().items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i));
        items = items.filter((i) => i.quantity > 0);
        set({ items });
      },
      totalPrice: () => get().items.reduce((s: number, i: CartItem) => s + i.price * i.quantity, 0),
    }),
    { name: "dishqo-cart" }
  )
);
