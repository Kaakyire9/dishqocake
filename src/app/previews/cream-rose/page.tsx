"use client";

import Image from "next/image";
import Link from "next/link";

export default function CreamRosePreview() {
  return (
    <main className="min-h-screen bg-[#FFFBF5] flex items-center justify-center p-8">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
  <div className="p-8 rounded-2xl bg-semantic-surface-card shadow-md">
          <h1 className="text-4xl font-extrabold text-[#5C4B37]">Freshly Baked Happiness</h1>
          <p className="mt-4 text-lg text-[#5C4B37]">Delicious cakes and pastries made fresh daily. Order online or visit our bakery to taste the magic.</p>

          <div className="mt-8 flex gap-3">
            <Link href="/shop" className="inline-block bg-[#D4A88B] text-white px-6 py-3 rounded-md shadow">Order now</Link>
            <Link href="/contact" className="inline-block border border-[#C9A96E] text-[#5C4B37] px-6 py-3 rounded-md">Contact Us</Link>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Image src="/cake-hero.svg" alt="Cake hero" width={840} height={560} className="object-cover w-full h-full" />
        </div>
      </div>
    </main>
  );
}
