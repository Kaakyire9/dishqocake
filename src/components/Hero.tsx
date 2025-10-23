"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  return (
  <section id="hero" className="w-full relative bg-linear-to-r from-elegant-cream via-semantic-accent-gold/20 to-soft-accent overflow-hidden">
      {/* Parallax floating cakes (decorative) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg className="absolute left-6 top-6 w-28 opacity-40 animate-slow-float" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="56" fill="#fff1f5" />
        </svg>
        <svg className="absolute right-8 top-24 w-40 opacity-30 animate-slow-float delay-2000" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="160" height="160" rx="20" fill="#fff7fb" />
        </svg>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24 flex flex-col-reverse lg:flex-row items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-semantic-text-primary">Freshly Baked Happiness 🍰</h1>
          {/* decorative soft-lavender bar (Warmer Elegant) */}
          <div className="mt-3 w-14 h-1 rounded bg-elegant-lavender" />
          <p className="mt-4 text-lg text-semantic-text-muted max-w-xl">Delicious cakes and pastries made fresh daily. Order online or visit our bakery to taste the magic.</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" onClick={() => trackEvent('hero_order_click', { source: 'homepage' })} className="inline-block bg-[#F89C27] text-black px-6 py-3 rounded-md shadow hover:scale-[1.02] hover:bg-[#D46F2E] transition">Order now</Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-semantic-accent-gold text-semantic-text-primary px-6 py-3 rounded-md shadow-sm hover:bg-semantic-bg-surface transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-semantic-accent-gold" aria-hidden>
                <circle cx="12" cy="12" r="10" fill="#D99B2A" />
                <path d="M8 12l2.5 2.5L16 9" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Contact Us</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex justify-center lg:justify-end"
        >
          <div className="w-[360px] sm:w-[440px] lg:w-[520px] h-[220px] sm:h-[300px] lg:h-[360px] rounded-2xl overflow-hidden shadow-lg relative">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffffcc,transparent)] mix-blend-overlay pointer-events-none" />
            <Image src="/dishqo-hero.jpg" alt="DishQo hero" width={880} height={360} className="object-cover w-full h-full object-[center_45%]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
