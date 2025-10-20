import type { CartItem } from "@/store/cartStore";

export type Order = {
  id: string;
  name: string;
  phone: string;
  address: string;
  note?: string;
  items: CartItem[];
  total: number;
  createdAt: string;
};

const ORDERS_KEY = "dishqo-orders";

export function saveOrder(order: Order) {
  try {
    const raw = localStorage.getItem(ORDERS_KEY) || "[]";
    const arr = JSON.parse(raw);
    arr.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(arr));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function formatGhs(amount: number) {
  return new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS" }).format(amount);
}
