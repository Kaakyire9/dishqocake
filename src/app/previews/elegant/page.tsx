"use client";

import Link from "next/link";
import Image from "next/image";

export default function ElegantPreview() {
  return (
    <main className="min-h-screen bg-[#FFF6EE] flex items-center justify-center p-8">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
  <div className="p-8 rounded-2xl bg-semantic-surface-card shadow-lg">
          <h1 className="text-4xl font-extrabold text-semantic-text-primary">Freshly Baked Happiness</h1>
          {/* decorative soft-lavender bar */}
          <div className="mt-3 w-14 h-1 rounded bg-elegant-lavender" />
          <p className="mt-4 text-lg text-elegant-muted">Delicious cakes and pastries made fresh daily. Order online or visit our bakery to taste the magic.</p>

          <div className="mt-8 flex gap-3">
            <Link href="/shop" className="inline-block bg-semantic-btn-cta hover:bg-semantic-btn-cta-hover text-white px-6 py-3 rounded-md shadow transition">Order now</Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-semantic-accent-gold text-semantic-text-primary px-4 py-3 rounded-md">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-semantic-accent-gold" aria-hidden>
                <circle cx="12" cy="12" r="10" fill="#D99B2A" />
                <path d="M8 12l2.5 2.5L16 9" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Contact Us</span>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Image src="/cake-hero.svg" alt="Cake hero" width={840} height={560} className="object-cover w-full h-full" />
        </div>
      </div>
    </main>
  );
}
