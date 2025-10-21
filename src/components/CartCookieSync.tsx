"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export default function CartCookieSync() {
  const items = useCartStore((s) => s.items);

  useEffect(() => {
    try {
      const payload = JSON.stringify({ items });
      document.cookie = `dishqo-cart=${encodeURIComponent(payload)}; path=/; samesite=lax`;
    } catch (e) {
      // ignore
    }
  }, [items]);

  return null;
}
