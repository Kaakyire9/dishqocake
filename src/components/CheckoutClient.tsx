"use client";

import { useEffect, useMemo, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatGhs } from "@/lib/orders";
import Image from "next/image";
import type { CartItem } from "@/types";

type Props = { snapshot: { items?: CartItem[] } | null };

export default function CheckoutClient({ snapshot }: Props) {
  // Access only the store methods we need so effect deps are stable
  const storeItems = useCartStore((s) => s.items) as CartItem[];
  const storeTotal = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);
  const addItem = useCartStore((s) => s.addItem);

  const [hydrated, setHydrated] = useState(false);

  // compute snapshot total
  const snapshotItems: CartItem[] = useMemo(() => snapshot?.items ?? [], [snapshot?.items]);
  const snapshotTotal = snapshotItems.reduce((s: number, i: CartItem) => s + (i.price ?? 0) * (i.quantity ?? 0), 0);

  useEffect(() => {
    // On mount, if there's a snapshot, hydrate the store to match it.
    if (snapshotItems.length > 0) {
      clearCart();
      snapshotItems.forEach((it: CartItem) => addItem(it, it.quantity));
    }
    // mark hydrated so we render from the store going forward
    setHydrated(true);
  }, [snapshotItems, clearCart, addItem]);

  const displayItems: CartItem[] = hydrated ? storeItems : snapshotItems;
  const displayTotal = hydrated ? storeTotal : snapshotTotal;

  return (
    <div>
      <div className="bg-white rounded-lg p-4 shadow mb-6">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        {displayItems.map((it: CartItem) => (
          <div key={it.id} className="flex items-center gap-4 py-3 border-b last:border-b-0">
            <div className="w-20 h-16 relative rounded overflow-hidden">
              <Image src={it.image} alt={it.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-semibold text-pink-700">{it.name}</h4>
                <div className="text-pink-600 font-bold">{formatGhs((it.price ?? 0) * (it.quantity ?? 0))}</div>
              </div>
              <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
            </div>
          </div>
        ))}
        <div className="mt-4 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{formatGhs(displayTotal)}</span>
        </div>
      </div>
    </div>
  );
}
