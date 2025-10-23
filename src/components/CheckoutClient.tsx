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
  <div className="bg-semantic-surface-card rounded-lg p-4 shadow mb-6">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        {displayItems.map((it: CartItem) => (
          <div key={it.id} className="flex items-center gap-4 py-3 border-b last:border-b-0">
            <div className="w-20 h-16 relative rounded overflow-hidden">
              {it.image ? (
                <Image src={it.image} alt={it.name} fill className="object-cover" />
              ) : (
                <svg width="80" height="64" viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
                  <rect x="0" y="0" width="80" height="64" rx="8" fill="#fff7f9" />
                  <path d="M20 38c5-9 15-9 20 0 5-9 15-9 20 0v10H20V38z" fill="#ffd7e6" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold text-semantic-text-primary">{it.name}</h4>
                  {it.options?.layers && <div className="text-sm text-semantic-text-muted">Layers: {it.options.layers}</div>}
                </div>
                <div className="text-semantic-accent-gold font-bold">{formatGhs((it.price ?? 0) * (it.quantity ?? 0))}</div>
              </div>
                  <div className="text-sm text-semantic-text-muted">Qty: {it.quantity}</div>
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
