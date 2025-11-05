"use client";

import React from 'react';
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { formatGhs } from "@/lib/orders";
import Link from "next/link";
import { roundPrices } from "@/lib/prices";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const [animatingIds, setAnimatingIds] = React.useState<Record<string, boolean>>({});
  const addItem = useCartStore((s) => s.addItem);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const remove = useCartStore((s) => s.removeItem);
  const total = useCartStore((s) => s.totalPrice());

  // price table imported from shared module (see top-level import)

  function changeLayers(item: { id: string; description?: string; image?: string; quantity?: number }, newLayers: number) {
    try {
      // parse inches from id like 'round-6-2'
      const parts = item.id.split('-');
      const inches = parts[1] ?? null;
      if (!inches) return;
  const options = (roundPrices as Record<string, { layers: number; price: number }[]>)[String(inches)];
      if (!options) return;
    const opt = options.find((o: { layers: number; price: number }) => o.layers === newLayers);
      if (!opt) return;
      // create new product id and payload
      const newId = `round-${inches}-${newLayers}`;
      const newName = `${inches}\" Whipped Cream Round (${newLayers} layer${newLayers > 1 ? 's' : ''})`;
      const newProd = { id: newId, name: newName, description: item.description ?? '', price: opt.price, image: item.image ?? '', options: { layers: newLayers } };
      // add new product with same quantity, then remove old
      addItem(newProd, item.quantity ?? 1);
      remove(item.id);
      // trigger animation for newId
      setAnimatingIds((s) => ({ ...s, [newId]: true }));
      setTimeout(() => setAnimatingIds((s) => { const copy = { ...s }; delete copy[newId]; return copy; }), 350);
    } catch {
      // ignore
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
  <h1 className="text-3xl sm:text-4xl font-extrabold bg-[linear-gradient(90deg,#F89C27,#D46F2E,#F89C27)] bg-clip-text text-transparent mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 text-semantic-text-muted">Your cart is empty — time to treat yourself 🍰</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AnimatePresence>
              {items.map((it) => (
                <motion.div key={it.id} initial={{ opacity: 0, y: 8 }} animate={animatingIds[it.id] ? { scale: [1, 1.03, 1] } : { opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="flex items-center gap-4 p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-sm mb-4">
                  <div className="w-28 h-20 relative rounded-md overflow-hidden">
                    {it.image ? (
                      <Image src={it.image} alt={it.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full">
                        <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
                          <rect x="0" y="0" width="160" height="120" rx="12" fill="#fff7f9" />
                          <path d="M40 70c10-18 30-18 40 0 10-18 30-18 40 0v20H40V70z" fill="#ffd7e6" />
                          <ellipse cx="80" cy="72" rx="48" ry="12" fill="#fff1f4" />
                          <text x="80" y="100" textAnchor="middle" fontSize="12" fill="#b34b6b">Img</text>
                        </svg>
                      </div>
                    )}
                  </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-semantic-text-primary text-lg">{it.name}</h3>
                        <p className="text-sm text-semantic-accent-gold font-semibold">{formatGhs(it.price)}</p>
                        {/* Layers editor for round cakes */}
                        {it.id.startsWith('round-') && (
                          <div className="mt-2 flex items-center gap-2">
                            <label className="text-sm text-semantic-text-muted">Layers:</label>
                            <div className="flex gap-2">
                              {(() => {
                                const parts = it.id.split('-');
                                const inches = parts[1];
                                const opts = (roundPrices as Record<string, { layers: number; price: number }[]>)[inches] ?? [];
                                return opts.map((o: { layers: number; price: number }) => (
                                  <button key={o.layers} onClick={() => changeLayers(it, o.layers)} className={`px-3 py-1 rounded-full text-sm font-medium ${it.options?.layers === o.layers ? 'bg-[#F89C27] text-black' : 'bg-white/5 text-semantic-text-muted'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F89C27]`}>
                                    {o.layers}
                                  </button>
                                ));
                              })()}
                            </div>
                          </div>
                        )}
                        <div className="mt-3 flex items-center gap-3">
                          <button aria-label="Decrease quantity" onClick={() => decrease(it.id)} className="w-9 h-9 flex items-center justify-center rounded-md bg-white/5 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#F89C27]">-</button>
                          <span className="px-3 font-medium">{it.quantity}</span>
                          <button aria-label="Increase quantity" onClick={() => increase(it.id)} className="w-9 h-9 flex items-center justify-center rounded-md bg-white/5 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#F89C27]">+</button>
                          <button onClick={() => remove(it.id)} className="ml-4 text-sm text-[#F89C27] hover:underline">Remove</button>
                        </div>
                      </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <aside className="rounded-2xl p-6 backdrop-blur-xl bg-white/5 border border-white/10 shadow-sm">
            <h4 className="font-semibold text-lg">Summary</h4>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-semantic-text-muted">Total</span>
              <span className="font-bold text-semantic-accent-gold text-xl">{formatGhs(total)}</span>
            </div>
            <Link href="/checkout" className="mt-6 block text-center w-full order-shine bg-[#F89C27] text-black py-3 rounded-full font-semibold shadow-md hover:bg-[#D46F2E]">Checkout</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
