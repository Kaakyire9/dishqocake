"use client";

import Link from "next/link";
import Image from "next/image";
import Tooltip from "./Tooltip";
import CartCookieSync from "./CartCookieSync";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  // Cart syncing handled by CartCookieSync; badge animation removed for simplified navbar
  const [menuOpen, setMenuOpen] = useState(false);
  const [srMessage, setSrMessage] = useState('');
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu on outside click or on Escape
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Announce menu open/close for screen readers
  useEffect(() => {
    if (menuOpen) {
      setSrMessage('Menu opened');
    } else {
      setSrMessage('');
    }
    const t = setTimeout(() => setSrMessage(''), 800);
    return () => clearTimeout(t);
  }, [menuOpen]);

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-40 backdrop-blur-md border-b border-white/10 
                 bg-gradient-to-r from-white/80 via-white/50 to-white/80 
                 dark:from-[#0a0a0a]/80 dark:via-[#111]/50 dark:to-[#0a0a0a]/80 
                 supports-[backdrop-filter]:bg-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <CartCookieSync />

          {/* Logo */}
          <div className="flex items-center flex-1">
            <Tooltip content="DishQo — A Flavored Way to Live">
              <Link
  href="/"
  className="relative flex items-center gap-3 group"
  aria-label="Home"
>
  <div className="relative">
    <Image
      src="/dishqo-logo.png"
      alt="DishQo"
      width={64}
      height={64}
      className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover shadow-sm
                 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                 group-hover:scale-110 group-active:scale-95 focus-visible:ring-2
                 focus-visible:ring-[#F89C27]"
      priority
    />
    {/* ✨ Gold sheen overlay */}
    <span className="absolute inset-0 rounded-md overflow-hidden before:absolute before:inset-0
                     before:bg-gradient-to-r before:from-transparent before:via-[#FFD580]/80 before:to-transparent
                     before:translate-x-[-100%] group-hover:before:translate-x-[100%]
                     before:transition-transform before:duration-[2.4s] before:ease-[cubic-bezier(0.45,0,0.55,1)]" />
  </div>

  <span className="ml-2 text-lg font-bold tracking-tight text-[#1a1a1a] dark:text-white">
    DishQo
  </span>
</Link>

            </Tooltip>
          </div>

          {/* Links + CTA */}
          <div className="flex items-center gap-4 justify-end flex-1 relative">
            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              {["Shop", "About", "Contact"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className="relative text-sm font-medium text-[#333] dark:text-white/80 
                             hover:text-[#F89C27] dark:hover:text-[#FFD580]
                             after:content-[''] after:absolute after:left-0 after:bottom-[-2px] 
                             after:w-0 after:h-[1.5px] after:bg-[#F89C27] 
                             hover:after:w-full after:transition-all after:duration-300 
                             focus-visible:outline-none focus-visible:ring-2 
                             focus-visible:ring-[#F89C27]"
                >
                  {link}
                </Link>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((s) => !s)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md 
                         text-[#1a1a1a] dark:text-white hover:bg-white/10 
                         dark:hover:bg-white/5 focus-visible:ring-2 
                         focus-visible:ring-[#F89C27]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Order button */}
            <Link
  href="/shop"
  className="relative inline-flex items-center justify-center overflow-hidden rounded-md
             px-4 py-2 font-semibold text-black dark:text-white
             bg-gradient-to-br from-[#FFD580] to-[#F89C27]
             dark:from-[#F89C27] dark:to-[#E87817]
             shadow-md hover:shadow-lg hover:shadow-[#F89C27]/30
             focus-visible:ring-2 focus-visible:ring-[#F89C27]
             transition-all duration-300 group"
>
  <span className="relative z-10">Order Now</span>

  {/* Gold shimmer overlay */}
  <span className="absolute inset-0 before:absolute before:inset-0 
                   before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent
                   before:translate-x-[-100%] group-hover:before:translate-x-[100%]
                   before:transition-transform before:duration-[1.8s] before:ease-[cubic-bezier(0.45,0,0.55,1)]" />
</Link>


            {/* Mobile dropdown */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                  className="md:hidden absolute right-4 top-full mt-2 w-44 
                             bg-white/80 dark:bg-black/60 backdrop-blur-md 
                             border border-white/10 rounded-md shadow-xl p-2 z-50"
                >
                  {["Shop", "About", "Contact"].map((link) => (
                      <Link
                        key={link}
                        href={`/${link.toLowerCase()}`}
                        onClick={() => setMenuOpen(false)}
                        className="block px-3 py-2 rounded text-sm text-[#1a1a1a] dark:text-white/90 
                                   hover:bg-white/10 dark:hover:bg-white/5 transition-colors
                                   focus-visible:ring-2 focus-visible:ring-[#F89C27]"
                      >
                        {link}
                      </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Screen reader live region */}
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {srMessage}
      </span>
    </nav>
  );
}
