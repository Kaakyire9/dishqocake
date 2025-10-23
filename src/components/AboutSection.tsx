"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image src="/images/cake-placeholder.svg" alt="Bakery" width={960} height={640} className="object-cover w-full h-72 lg:h-full" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="p-8 rounded-2xl backdrop-blur-xl bg-semantic-surface-ghost border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.18)]">
            <h2 className="text-3xl font-extrabold text-semantic-text-primary">DishQo — A Flavored Way to Live</h2>
            <p className="mt-4 text-semantic-text-muted">We craft made-to-order cakes and pastries with attention to flavor, texture and presentation. Every cake is a small celebration.</p>
            <p className="mt-4 text-semantic-text-muted">Order online or request a custom quote for special events. Pickup and delivery available within Accra.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
