"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { formatGhs } from "@/lib/orders";
import { toast } from "@/lib/toast";
import {
  roundPrices as sharedRoundPrices,
  squarePrices as sharedSquarePrices,
  sheetPrices as sharedSheetPrices,
  cupcakes as sharedCupcakes,
} from "@/lib/prices";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

/* ----------------------------- ICON COMPONENTS ----------------------------- */
const SliceIcon = ({ className = "", size = 20 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7l10 5 10-5L12 2z" fill="currentColor" />
    <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth={1} fill="none" />
  </svg>
);

const SheetIcon = ({ className = "", size = 20 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="12" rx="2" fill="currentColor" />
  </svg>
);

const CupcakeIcon = ({ className = "", size = 20 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 10c0-2.2 1.8-4 4-4s4 1.8 4 4H6z" fill="currentColor" />
    <path d="M4 12h16l-1 6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2l-1-6z" fill="currentColor" opacity="0.95" />
  </svg>
);

/* ----------------------------- CARD CONTAINER ------------------------------ */
function Card({
  children,
  title,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 150 }}
      className="bg-gradient-to-br from-[#fff8f5]/90 via-[#fffdfb]/60 to-[#fff9f5]/80 
                 backdrop-blur-xl border border-[#f3ebe4]/60 rounded-2xl shadow-xl 
                 p-6 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-pink-100 to-yellow-100 p-3 rounded-xl text-[#b34b6b] shadow-sm">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-[#5c3c1f] tracking-wide">{title}</h3>
      </div>
      <div className="space-y-4 text-[15px] text-[#6d5e52] leading-relaxed">{children}</div>
    </motion.div>
  );
}

/* ----------------------------- MAIN COMPONENT ------------------------------ */
export default function CustomCakeShowcase() {
  const add = useCartStore((s) => s.addItem);

  const roundSizes = [5, 6, 7, 8, 9, 10].map((inches) => ({
    inches,
    description: "Whipped cream round",
    duration: inches <= 5 ? "24-48 hours" : "2-4 days",
    options:
      (sharedRoundPrices as Record<string, { layers: number; price: number }[]>)[String(inches)] ??
      [],
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
    const [selectedIdx, setSelectedIdx] = useState(0);
    const opt = options[selectedIdx];
    const prod: Product = {
      id: `round-${inches}-${opt.layers}`,
      name: `${inches}" Whipped Cream Round (${opt.layers} layer${
        opt.layers > 1 ? "s" : ""
      })`,
      description,
      price: opt.price,
      image: "",
    };

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.25 }}
        className="bg-white/70 border border-[#f4e9e3] rounded-2xl shadow-lg backdrop-blur-md overflow-hidden hover:shadow-2xl"
      >
        <div className="relative w-full h-44 flex items-center justify-center bg-gradient-to-br from-[#ffe9ef] via-[#fff5e8] to-[#fffdf8]">
          <span className="text-4xl font-extrabold text-[#b34b6b] drop-shadow-sm">
            {inches}&quot;
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg text-[#5c3c1f]">{prod.name}</h3>
          <p className="text-sm text-[#7a6a5a] mt-1">{prod.description}</p>

          <div className="mt-3 text-sm">
            Order duration:{" "}
            <span className="font-medium text-[#b34b6b]">{duration}</span>
          </div>

          <div className="mt-3">
            <label className="text-sm font-medium text-[#7a6a5a] block mb-2">
              Layers
            </label>
            <div className="flex gap-2 flex-wrap">
              {options.map((o, i) => (
                <button
                  key={o.layers}
                  onClick={() => setSelectedIdx(i)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-all duration-200 border ${
                    i === selectedIdx
                      ? "bg-[#b34b6b] text-white border-[#b34b6b]"
                      : "bg-white text-[#7a6a5a] border-[#e5d6cc] hover:bg-[#fff2f6]"
                  }`}
                >
                  {o.layers}-layer ({formatGhs(o.price)})
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="font-bold text-[#b34b6b] text-lg">
              {formatGhs(prod.price)}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                add({ ...prod, options: { layers: opt.layers } }, 1);
                toast.success(`${prod.name} added to cart`);
              }}
              className="px-4 py-2 rounded-md bg-[#b34b6b] hover:bg-[#a14362] text-white text-sm shadow-md transition-all"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  const squareSizes = [6, 8, 10, 12].map((inches) => ({
    inches,
    description: "Whipped cream square",
    options:
      (sharedSquarePrices as Record<string, { layers: number; price: number }[]>)[String(inches)] ??
      [],
  }));

  const sheetCakes = sharedSheetPrices;
  const cupcakes = sharedCupcakes;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-[#5c3c1f] mb-12 tracking-tight">
        Custom Cake Pricelist
      </h2>

      {/* Round Cakes */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {roundSizes.map((s) => (
          <SizeCard
            key={`round-${s.inches}`}
            inches={s.inches}
            description={s.description}
            duration={s.duration}
            options={s.options}
          />
        ))}
      </div>

      {/* Square Cakes */}
      <div className="mt-16">
        <Card title="Whipped Cream Square Cakes" icon={<SliceIcon className="text-[#b34b6b]" size={22} />}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {squareSizes.map((s) => (
              <SizeCard
                key={`square-${s.inches}`}
                inches={s.inches}
                description={s.description}
                duration="2-3 days"
                options={s.options}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Sheet Cakes */}
      <div className="mt-16">
        <Card title="Whipped Cream Sheet Cakes" icon={<SheetIcon className="text-[#b34b6b]" size={22} />}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sheetCakes.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ scale: 1.03 }}
                className="bg-white/70 border border-[#f4e9e3] rounded-2xl shadow-lg p-5"
              >
                <div className="w-full h-28 bg-[#fff2f6] rounded-xl mb-3 flex items-center justify-center">
                  <span className="text-[#b34b6b] font-semibold">Sheet Cake</span>
                </div>
                <h4 className="font-semibold text-[#5c3c1f]">{s.label}</h4>
                <p className="text-sm text-[#7a6a5a] mt-1">{s.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-[#b34b6b]">{formatGhs(s.price)}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      add(
                        {
                          id: `sheet-${s.label}`,
                          name: s.label,
                          description: s.description,
                          price: s.price,
                          image: "/images/cake-placeholder.jpg",
                        },
                        1
                      );
                      toast.success(`${s.label} added to cart`);
                    }}
                    className="px-3 py-1.5 rounded-md bg-[#b34b6b] hover:bg-[#a14362] text-white text-sm"
                  >
                    Add
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Cupcakes */}
      <div className="mt-16">
        <Card title="Cupcakes" icon={<CupcakeIcon className="text-[#b34b6b]" size={22} />}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cupcakes.map((c) => (
              <motion.div
                key={`cup-${c.qty}`}
                whileHover={{ scale: 1.03 }}
                className="bg-white/70 border border-[#f4e9e3] rounded-2xl shadow-lg p-5"
              >
                <div className="w-full h-28 bg-[#fff2f6] rounded-xl mb-3 flex items-center justify-center">
                  <span className="text-[#b34b6b] font-semibold">Cupcakes</span>
                </div>
                <h4 className="font-semibold text-[#5c3c1f]">{c.qty} pieces</h4>
                <p className="text-sm text-[#7a6a5a] mt-1">Freshly baked cupcakes</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-[#b34b6b]">{formatGhs(c.price)}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      add(
                        {
                          id: `cup-${c.qty}`,
                          name: `${c.qty} Cupcakes`,
                          description: "Cupcake box",
                          price: c.price,
                          image: "/images/cake-placeholder.jpg",
                        },
                        1
                      );
                      toast.success(`${c.qty} cupcakes added to cart`);
                    }}
                    className="px-3 py-1.5 rounded-md bg-[#b34b6b] hover:bg-[#a14362] text-white text-sm"
                  >
                    Add
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 text-[#6d5e52]">
        <p className="text-sm">
          Delivery fee depends on recipient&apos;s location.
        </p>
        <div className="flex gap-4">
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-[#b34b6b] hover:bg-[#a14362] text-white rounded-md shadow-md text-sm"
          >
            Contact to Order
          </Link>
          <a
            href="https://wa.me/?text=Hello%20DishQo%20I%20want%20to%20order%20a%20custom%20cake"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 border border-[#b34b6b] text-[#b34b6b] rounded-md text-sm hover:bg-[#fff2f6]"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
