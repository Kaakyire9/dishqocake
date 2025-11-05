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
    <div className="rounded-2xl p-6 bg-white/3 backdrop-blur-sm border border-white/10 shadow-sm">
      <h3 className="font-semibold mb-4 text-lg">Customer Details</h3>
      <div className="grid gap-3">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full p-3 rounded-lg bg-white/90 text-black placeholder:text-black/60 focus:ring-2 focus:ring-[#F89C27] outline-none" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="w-full p-3 rounded-lg bg-white/90 text-black placeholder:text-black/60 focus:ring-2 focus:ring-[#F89C27] outline-none" />
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Delivery address" className="w-full p-3 rounded-lg bg-white/90 text-black placeholder:text-black/60 focus:ring-2 focus:ring-[#F89C27] outline-none" />
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional note" className="w-full p-3 rounded-lg bg-white/90 text-black placeholder:text-black/60 focus:ring-2 focus:ring-[#F89C27] outline-none" />
      </div>

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

      <div className="mt-6">
        <h4 className="font-semibold mb-2">Momo Payment</h4>
  <p className="text-sm text-semantic-text-muted mb-3">Please send the total to the Mobile Money number below.</p>
  <div className="rounded-lg p-3 bg-white/5 border border-white/8 flex items-center justify-between">
          <div>
            <div className="font-semibold">MTN MoMo</div>
            <div className="text-sm">+233 55 343 7570</div>
          </div>
          <CopyButton text="+233 55 343 7570" />
        </div>

        <label className="mt-4 flex items-center gap-3">
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="w-4 h-4 text-[#F89C27] focus:ring-2 focus:ring-[#F89C27]" />
          <span className="text-sm">I have sent the money</span>
        </label>

  <button disabled={!checked || submitting} onClick={onPlace} className="mt-4 w-full order-shine bg-[#F89C27] text-black py-3 rounded-full font-semibold shadow-md hover:bg-[#D46F2E] disabled:opacity-60">{submitting ? 'Placing...' : 'Place Order'}</button>
      </div>
    </div>
  );
}
