"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { formatGhs } from "@/lib/orders";
import { toast } from "@/lib/toast";
import { roundPrices as sharedRoundPrices, squarePrices as sharedSquarePrices, sheetPrices as sharedSheetPrices, cupcakes as sharedCupcakes } from "@/lib/prices";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

function CakeIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3c1.1 0 2 .9 2 2h4v2H6V5h4c0-1.1.9-2 2-2z" fill="currentColor" />
      <path d="M4 9h16v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

function SliceIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7l10 5 10-5L12 2z" fill="currentColor" />
      <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth={1} fill="none" />
    </svg>
  );
}

function SheetIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="12" rx="2" fill="currentColor" />
    </svg>
  );
}

function CupcakeIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 10c0-2.2 1.8-4 4-4s4 1.8 4 4H6z" fill="currentColor" />
      <path d="M4 12h16l-1 6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2l-1-6z" fill="currentColor" opacity="0.95" />
    </svg>
  );
}

function Card({ children, title, icon }: { children: React.ReactNode; title: string; icon: React.ReactNode }) {
  return (
  <motion.div whileHover={{ y: -4 }} className="bg-linear-to-br from-elegant-cream/80 via-semantic-accent-gold/20 to-soft-accent rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
  <div className="bg-semantic-surface-ghost p-2 rounded-lg">{icon}</div>
  <h3 className="text-lg font-semibold text-semantic-text-primary">{title}</h3>
      </div>
  <div className="space-y-3 text-sm text-semantic-text-muted">{children}</div>
    </motion.div>
  );
}

export default function CustomCakeShowcase() {
  const add = useCartStore((s) => s.addItem);

  // Round cake sizes data
  // Round cake sizes (driven from shared prices)
  const roundSizes = [5, 6, 7, 8, 9, 10].map((inches) => ({
    inches,
    description: "Whipped cream round",
    duration: inches <= 5 ? "24-48 hours" : "2-4 days",
    options: (sharedRoundPrices as any)[String(inches)] ?? [],
  }));

  function SizeCard({
    inches,
    description,
    duration,
    options,
  }: {
    inches: number;
    description: string;
    duration: string;
    options: { layers: number; price: number; label?: string }[];
  }) {
    const add = useCartStore((s) => s.addItem);
    const [selectedIdx, setSelectedIdx] = useState(0);

    const opt = options[selectedIdx];
    const prod: Product = {
      id: `round-${inches}-${opt.layers}`,
      name: `${inches}\" Whipped Cream Round (${opt.layers} layer${opt.layers > 1 ? "s" : ""})`,
      description,
      price: opt.price,
      image: "",
    };

    return (
    <div className="bg-semantic-surface-card rounded-2xl shadow-md overflow-hidden">
  <div className="w-full h-40 bg-semantic-surface-muted relative flex items-center justify-center">
          <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
            <rect x="0" y="0" width="160" height="120" rx="12" fill="#fff7f9" />
            <path d="M40 70c10-18 30-18 40 0 10-18 30-18 40 0v20H40V70z" fill="#ffd7e6" />
            <ellipse cx="80" cy="72" rx="48" ry="12" fill="#fff1f4" />
            <text x="80" y="100" textAnchor="middle" fontSize="12" fill="#b34b6b">{inches}\"</text>
          </svg>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-semantic-text-primary">{prod.name}</h3>
          <p className="text-sm text-semantic-text-muted mt-1">{prod.description}</p>

          <div className="mt-3 text-sm text-semantic-text-muted">Order duration: <span className="font-medium text-semantic-text-primary">{duration}</span></div>

          <div className="mt-3">
            <label className="text-sm font-medium text-semantic-text-muted block mb-2">Layers</label>
            <div className="flex gap-2 flex-wrap">
              {options.map((o, i) => (
                  <button
                    key={o.layers}
                    onClick={() => setSelectedIdx(i)}
                    className={`px-3 py-1 rounded-md text-sm border ${i === selectedIdx ? 'bg-semantic-btn-cta text-white border-semantic-btn-cta' : 'bg-semantic-surface-card text-semantic-text-muted'}`}>
                    {o.layers}-layer ({formatGhs(o.price)})
                  </button>
                ))}
            </div>
          </div>

            <div className="mt-4 flex items-center justify-between">
            <span className="font-bold text-semantic-accent-gold">{formatGhs(prod.price)}</span>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => { add({ ...prod, options: { layers: opt.layers } }, 1); toast.success(`${prod.name} added to cart`); }} className="bg-semantic-btn-cta hover:bg-semantic-btn-cta-hover text-white px-3 py-1 rounded-md text-sm">Add to Cart</motion.button>
          </div>
        </div>
      </div>
    );
  }

  const makeProduct = (p: { id: string; name: string; description: string; price: number; image?: string }): Product => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    image: p.image || "/images/cake-placeholder.jpg",
  });

  const squareSizes = [6, 8, 10, 12].map((inches) => ({ inches, description: 'Whipped cream square', options: (sharedSquarePrices as any)[String(inches)] ?? [] }));

  const sheetCakes = sharedSheetPrices;

  const cupcakes = sharedCupcakes;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
  <h2 className="text-3xl font-extrabold text-semantic-text-primary mb-6">Custom Cake Pricelist</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {roundSizes.map((s) => (
          <SizeCard key={`round-${s.inches}`} inches={s.inches} description={s.description} duration={s.duration} options={s.options} />
        ))}
      </div>

      {/* Square Cakes */}
      <div className="mt-10">
  <Card title="Whipped Cream Square Cakes" icon={<SliceIcon className="text-semantic-accent-gold" size={22} />}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {squareSizes.map((s) => (
              <SizeCard key={`square-${s.inches}`} inches={s.inches} description={s.description} duration="2-3 days" options={s.options} />
            ))}
          </div>
        </Card>
      </div>

      {/* Sheet Cakes */}
      <div className="mt-10">
  <Card title="Whipped Cream Sheet Cakes" icon={<SheetIcon className="text-semantic-accent-gold" size={22} />}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sheetCakes.map((s) => (
              <div key={s.label} className="bg-semantic-surface-card rounded-2xl shadow-md p-4">
                <div className="w-full h-28 bg-semantic-surface-muted relative flex items-center justify-center mb-3">
                  <svg width="200" height="90" viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="200" height="90" rx="10" fill="#fff7f9" />
                    <rect x="16" y="30" width="168" height="34" rx="6" fill="#ffd7e6" />
                    <text x="100" y="60" textAnchor="middle" fontSize="12" fill="#b34b6b">Sheet</text>
                  </svg>
                </div>
                <h4 className="font-semibold text-semantic-text-primary">{s.label}</h4>
                <p className="text-sm text-semantic-text-muted mt-1">{s.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-semantic-accent-gold">{formatGhs(s.price)}</span>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={() => { add({ ...makeProduct({ id: `sheet-${s.label}`, name: s.label, description: s.description, price: s.price }), options: {} }, 1); toast.success(`${s.label} added to cart`); }} className="bg-semantic-btn-cta hover:bg-semantic-btn-cta-hover text-white px-3 py-1 rounded-md text-sm">Add to Cart</motion.button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Cupcakes */}
      <div className="mt-10">
  <Card title="Cupcakes" icon={<CupcakeIcon className="text-semantic-accent-gold" size={22} />}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cupcakes.map((c) => (
              <div key={`cup-${c.qty}`} className="bg-semantic-surface-card rounded-2xl shadow-md p-4">
                <div className="w-full h-28 bg-semantic-surface-muted relative flex items-center justify-center mb-3">
                  <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="120" height="90" rx="10" fill="#fff7f9" />
                    <path d="M30 50c7-12 21-12 30 0 9-12 23-12 30 0v18H30V50z" fill="#ffd7e6" />
                    <text x="60" y="78" textAnchor="middle" fontSize="12" fill="#b34b6b">Cupcakes</text>
                  </svg>
                </div>
                <h4 className="font-semibold text-semantic-text-primary">{c.qty} pieces</h4>
                <p className="text-sm text-semantic-text-muted mt-1">Freshly baked cupcakes</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-semantic-accent-gold">{formatGhs(c.price)}</span>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={() => { add({ ...makeProduct({ id: `cup-${c.qty}`, name: `${c.qty} Cupcakes`, description: 'Cupcake box', price: c.price }), options: { qty: c.qty } }, 1); toast.success(`${c.qty} cupcakes added to cart`); }} className="bg-semantic-btn-cta hover:bg-semantic-btn-cta-hover text-white px-3 py-1 rounded-md text-sm">Add to Cart</motion.button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
  <p className="text-sm text-semantic-text-muted">Delivery fee depends on recipient&apos;s location.</p>

        <div className="flex gap-3">
          <Link href="/contact" className="inline-flex items-center px-4 py-2 bg-semantic-btn-cta hover:bg-semantic-btn-cta-hover text-white rounded-md shadow-sm">Contact to Order</Link>
          <a href="https://wa.me/?text=Hello%20DishQo%20I%20want%20to%20order%20a%20custom%20cake" target="_blank" rel="noreferrer" className="inline-flex items-center px-4 py-2 border border-semantic-text-primary text-semantic-text-primary rounded-md">WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
