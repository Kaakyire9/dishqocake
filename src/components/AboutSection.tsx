"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="relative max-w-6xl mx-auto px-6 py-20 overflow-hidden">
      {/* Subtle decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <svg
          className="absolute top-0 left-0 w-[480px] blur-3xl text-[#FFD580]/20"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="200" fill="currentColor" />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image section with smooth motion */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative group">
            <Image
              src="/images/about-cake.png"
              alt="DishQo bakery"
              width={960}
              height={640}
              className="object-cover w-full h-72 lg:h-[480px] transform transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="glass-no-blur" />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.18)]"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dishqo-heading">
            DishQo — A Flavored Way to Live
          </h2>
          <div className="mt-2 w-20 h-[3px] bg-gradient-to-r from-[#F89C27] to-[#FFD580] rounded-full" />

          <p className="mt-6 text-lg leading-relaxed text-semantic-text-muted">
            At <span className="font-semibold text-[#F89C27]">DishQo</span>, we
            believe every bite should bring joy. Our cakes are handcrafted with
            love, precision, and the finest ingredients — blending tradition and
            creativity into a flavorful masterpiece.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-semantic-text-muted">
            Whether you’re celebrating a milestone or craving a sweet moment,
            each creation is designed to make life more delicious. Order online
            or request your custom cake for any special event. We deliver
            happiness across Kumasi.
          </p>

          <Link
            href="/shop"
            className="inline-block mt-8 bg-[#F89C27] text-black px-8 py-3 rounded-lg font-semibold shadow hover:bg-[#D46F2E] hover:scale-[1.02] transition-transform"
          >
            Explore Our Cakes
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
