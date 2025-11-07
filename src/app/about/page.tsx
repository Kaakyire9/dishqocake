"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen text-semantic-text-primary">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#fffaf5] via-[#fff0f6] to-[#ffe6ee] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
          <svg
            className="absolute left-1/2 top-12 w-[680px] -translate-x-1/2 blur-3xl text-[#FFD580]/20"
            viewBox="0 0 600 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="300" cy="300" r="300" fill="currentColor" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-24 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold text-semantic-text-primary"
          >
            The Heart Behind <span className="text-semantic-accent-gold">DishQo</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg text-semantic-text-muted max-w-2xl mx-auto"
          >
            A passion for artistry, flavor, and unforgettable memories — baked into every creation.
          </motion.p>
          <div className="mt-6 w-24 h-[3px] bg-gradient-to-r from-[#F89C27] to-[#FFD580] rounded-full mx-auto" />
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold text-semantic-text-primary">Our Story</h2>
          <p className="text-semantic-text-muted leading-relaxed">
            DishQo was born from a sweet dream — to bring artistry and taste together. Founded by{" "}
            <span className="text-semantic-accent-gold font-semibold">Nicole Haynes</span>, our
            journey began in the heart of Ghana, where each cake told a story of joy and
            celebration.
          </p>
          <p className="text-semantic-text-muted leading-relaxed">
            From humble beginnings to becoming one of the most admired cake brands, we’ve stayed true
            to our vision — creating desserts that don’t just look divine, but feel like pure
            happiness in every bite.
          </p>
          <Link
            href="/#gallery"
            aria-label="Explore our creations — jump to gallery"
            className="inline-block mt-4 bg-[#F89C27] text-black px-6 py-2.5 rounded-lg font-semibold shadow hover:bg-[#D46F2E] transition-transform hover:scale-[1.02]"
          >
            Explore Our Creations
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        >
          <div className="relative w-full" style={{ paddingTop: '150%' }}>
              <Image
                src="/gallery/dishqo-about-hero.png"
                alt="DishQo custom cake"
                fill
                className="object-cover w-full h-full"
                priority
              />
              <div className="glass-no-blur" />
            </div>
        </motion.div>
      </section>

      {/* BRAND PROMISE */}
      <section className="bg-semantic-surface-ghost py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4 text-dishqo-heading"
          >
            The DishQo Promise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-semantic-text-muted max-w-2xl mx-auto"
          >
            Every cake we craft is a labor of love — combining precision, creativity, and the finest
            ingredients to ensure that your celebration becomes a memory to treasure.
          </motion.p>

          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Artistry", desc: "Handcrafted designs that capture your story." },
              { title: "Quality", desc: "Made with the best ingredients and attention to detail." },
              { title: "Joy", desc: "Each bite delivers the sweetness of celebration." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * i }}
                className="p-6 rounded-2xl bg-white/50 backdrop-blur-lg shadow-[inset_0_0_18px_rgba(255,255,255,0.12)]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-[#F89C27]">
                    {i === 0 ? (
                      /* Star / Artistry */
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
                        <path fill="currentColor" d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.178L12 18.896 4.664 23.176l1.402-8.178L.132 9.21l8.2-1.192L12 .587z" />
                      </svg>
                    ) : i === 1 ? (
                      /* Shield check / Quality */
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
                        <path fill="currentColor" d="M12 2l7 3v6c0 5-3.5 9.74-7 11-3.5-1.26-7-6-7-11V5l7-3z" />
                        <path fill="#fff" d="M10 13l2 2 5-5-1.4-1.4L12 12.2 11.4 11.6z" />
                      </svg>
                    ) : (
                      /* Smile / Joy */
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
                        <path fill="currentColor" d="M12 2a10 10 0 110 20 10 10 0 010-20zm-4 9a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2zm-8.5 3.5a4.5 4.5 0 007 0 .75.75 0 00-1.2-.9 3 3 0 01-4.6 0 .75.75 0 00-1.2.9z" />
                      </svg>
                    )}
                  </span>
                  <h3 className="font-semibold text-lg text-semantic-accent-gold mb-0">{item.title}</h3>
                </div>
                <p className="text-sm text-semantic-text-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-gradient-to-r from-[#fff4f7] via-[#fffaf5] to-[#fff4ee]">
          <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
            className="text-3xl font-bold mb-4 text-dishqo-heading"
        >
          Celebrate With DishQo
        </motion.h2>
        <p className="text-semantic-text-muted max-w-2xl mx-auto mb-8">
          Let’s create your dream cake together — a sweet centerpiece that captures every emotion,
          every smile, and every moment.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/shop"
            className="inline-block mt-0 bg-[#F89C27] text-black px-8 py-3 rounded-lg font-semibold shadow hover:bg-[#D46F2E] hover:scale-[1.02] transition-transform"
          >
            Order Now
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-lg border border-[#F89C27] text-[#F89C27] hover:bg-[#F89C27] hover:text-white transition font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
