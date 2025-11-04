"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

export default function ShopPreview() {
  return (
    <section
      id="shop-preview"
      className="relative max-w-6xl mx-auto px-6 py-20"
    >
      {/* Elegant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F0]/60 via-white/30 to-transparent pointer-events-none -z-10" />

      {/* Floating soft shapes (ambient backdrop) */}
      <svg
        className="absolute top-0 right-0 w-48 opacity-20 animate-slow-float"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="100" fill="#FEE8D3" />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center gap-8 p-8 rounded-3xl shadow-xl border border-white/10 bg-white/60 backdrop-blur-xl">
          {/* Cake image preview */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-md relative"
          >
            <Image
              src="/images/shop-preview-cake.png"
              alt="Signature DishQo cake"
              width={720}
              height={480}
              className="object-cover w-full h-[260px] sm:h-[340px] lg:h-[420px]"
              priority
            />
            <div className="glass-no-blur" />
          </motion.div>

          {/* Text content */}
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-semantic-text-primary">
              Discover Our Creations
            </h2>
            <p className="mt-4 text-lg text-semantic-text-muted leading-relaxed max-w-lg">
              From elegant wedding masterpieces to indulgent chocolate dreams,
              each DishQo cake is crafted with passion, precision, and a touch
              of luxury. Let your celebration taste as good as it looks.
            </p>

            <div className="mt-8">
              <Link
                href="/shop"
                onClick={() =>
                  trackEvent("shop_preview_view_menu_click", {
                    source: "homepage",
                  })
                }
                className="inline-block bg-[#F89C27] text-black font-semibold px-8 py-3 rounded-md shadow hover:scale-[1.03] hover:bg-[#D46F2E] transition"
              >
                View Full Menu
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
