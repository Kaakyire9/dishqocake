"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[radial-gradient(circle_at_30%_30%,#fff9f3_0%,#fff1e6_25%,#fef2e4_50%,#fdf5e9_100%)]"
    >
      {/* Moving shimmer light overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,214,150,0.2)_0%,rgba(255,241,200,0.4)_50%,rgba(255,245,230,0.1)_100%)] mix-blend-soft-light animate-subtle-glow pointer-events-none" />

      {/* Floating aroma effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="w-1 h-12 bg-gradient-to-t from-[#F89C27]/80 to-transparent rounded-full blur-md animate-rise" />
        <div className="w-1 h-10 bg-gradient-to-t from-[#D46F2E]/30 to-transparent rounded-full blur-md animate-rise delay-700 ml-2" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24 flex flex-col-reverse lg:flex-row items-center gap-8 relative z-10">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-[linear-gradient(90deg,#D46F2E,#B34B00,#D46F2E)] bg-clip-text text-transparent">
            Freshly Baked Happiness 🍰
          </h1>

          <div className="mt-3 w-14 h-1 rounded bg-[#D46F2E]/60" />

          <p className="mt-4 text-lg text-semantic-text-muted max-w-xl leading-relaxed">
            Delicious cakes and pastries made fresh daily. Order online or visit
            our bakery to taste the magic of DishQo — where sweetness meets elegance.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              onClick={() =>
                trackEvent("hero_order_click", { source: "homepage" })
              }
              className="order-shine inline-block bg-[#F89C27] text-black px-6 py-3 rounded-md font-semibold shadow hover:bg-[#D46F2E] transition"
            >
              Order now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[#F89C27]/70 text-semantic-text-primary px-6 py-3 rounded-md shadow-sm hover:bg-[#fffaf3] transition"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#D99B2A]"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" fill="#D99B2A" />
                <path
                  d="M8 12l2.5 2.5L16 9"
                  stroke="#fff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Contact Us</span>
            </Link>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex justify-center lg:justify-end relative"
        >
          <div className="w-[360px] sm:w-[440px] lg:w-[520px] h-[220px] sm:h-[300px] lg:h-[360px] rounded-2xl overflow-hidden shadow-lg relative">
            <div className={isMobile ? "mobile-glass" : "glass-no-blur"} />
              {/* Use next/image fill mode so the image covers the container without CSS width/height mismatch */}
              <Image
                src="/images/dishqo-hero.png"
                alt="DishQo hero"
                fill
                sizes="100vw"
                className="object-cover w-full h-full object-[center_45%]"
                priority
              />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
