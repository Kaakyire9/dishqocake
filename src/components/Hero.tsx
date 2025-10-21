"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-pink-50 via-pink-100 to-amber-50">
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24 flex flex-col-reverse lg:flex-row items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-700">Freshly Baked Happiness 🍰</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl">Delicious cakes and pastries made fresh daily. Order online or visit our bakery to taste the magic.</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/shop" className="inline-block bg-pink-600 text-white px-6 py-3 rounded-md shadow hover:scale-[1.02] transition">Shop Now</a>
            <a href="/contact" className="inline-block border border-pink-200 text-pink-600 px-6 py-3 rounded-md shadow-sm hover:bg-pink-50 transition">Contact Us</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex justify-center lg:justify-end"
        >
          <div className="w-[320px] sm:w-[380px] lg:w-[420px] rounded-2xl overflow-hidden shadow-lg">
            <Image src="/cake-hero.svg" alt="Cake hero" width={840} height={560} className="object-cover w-full h-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
