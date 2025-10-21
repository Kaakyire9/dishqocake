"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { saveOrder } from "@/lib/orders";
import CopyButton from "./CopyButton";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/lib/toast";
import type { CartItem, Order } from "@/types";

type Props = { snapshot: { items?: CartItem[] } | null };

export default function CheckoutForm({ snapshot }: Props) {
  const router = useRouter();
  const clear = useCartStore((s) => s.clearCart);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [checked, setChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // compute total from snapshot as fallback
  const items: CartItem[] = snapshot?.items ?? [];
  const total = items.reduce((s: number, i: CartItem) => s + (i.price ?? 0) * (i.quantity ?? 0), 0);

  const onPlace = async () => {
    if (!checked) return;
    setError(null);
    if (!name || !phone || !address) {
      setError('Please fill name, phone and address');
      toast.error('Please fill name, phone and address');
      return;
    }
    setSubmitting(true);
    const order: Order = {
      id: uuidv4(),
      name,
      phone,
      address,
      note,
      items,
      total,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };

    const ok = saveOrder(order);
    if (ok) {
      clear();
      toast.success('Order placed — thank you!');
      router.push('/order-success');
    } else {
      setError('Failed to save order');
      toast.error('Failed to save order');
    }
    setSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h3 className="font-semibold mb-4">Customer Details</h3>
      <div className="grid gap-3">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="p-3 border rounded" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="p-3 border rounded" />
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Delivery address" className="p-3 border rounded" />
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional note" className="p-3 border rounded" />
      </div>

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

      <div className="mt-6">
        <h4 className="font-semibold mb-2">Momo Payment</h4>
        <p className="text-sm text-gray-600 mb-3">Please send the total to the Mobile Money number below.</p>
        <div className="bg-gray-50 p-3 rounded flex items-center justify-between">
          <div>
            <div className="font-semibold">MTN</div>
            <div className="text-sm">024 123 4567</div>
          </div>
          <CopyButton text="024 123 4567" />
        </div>

        <label className="mt-4 flex items-center gap-2">
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <span className="text-sm">I have sent the money</span>
        </label>

        <button disabled={!checked || submitting} onClick={onPlace} className="mt-4 w-full bg-pink-600 text-white py-2 rounded disabled:opacity-50">{submitting ? 'Placing...' : 'Place Order'}</button>
      </div>
    </div>
  );
}
