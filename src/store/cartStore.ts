import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, CartItem, SelectedOptions } from "@/types";

export type CartState = {
  items: CartItem[];
  addItem: (p: Product & { options?: SelectedOptions }, qty?: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  totalPrice: () => number;
  lastAddedAt?: number | null;
};

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set, get) => ({
      items: [],
  lastAddedAt: null,
      addItem: (p: Product & { options?: SelectedOptions }, qty = 1) => {
        const items = get().items.slice();
        // Consider items distinct by id + options JSON
        const key = `${p.id}::${JSON.stringify(p.options ?? {})}`;
        const idx = items.findIndex((i) => `${i.id}::${JSON.stringify(i.options ?? {})}` === key);
        if (idx >= 0) {
          items[idx].quantity += qty;
        } else {
          items.push({ ...p, quantity: qty } as CartItem);
        }
        set({ items, lastAddedAt: Date.now() });
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
