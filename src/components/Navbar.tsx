"use client";

import Link from "next/link";
import Image from "next/image";
import Tooltip from "./Tooltip";
import CartCookieSync from "./CartCookieSync";
import React, { useState, useRef, useEffect } from "react";
import { useMenu } from "@/context/MenuProvider";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  // Cart syncing handled by CartCookieSync; badge animation removed for simplified navbar
  const { menuOpen, setMenuOpen, toggle } = useMenu();
  const [srMessage, setSrMessage] = useState('');
  const items = useCartStore((s) => s.items);
  const lastAddedAt = useCartStore((s) => s.lastAddedAt);
  const count = items.reduce((sum, it) => sum + (it.quantity ?? 0), 0);
  // showTransient controls the flying/check animation; while it's true we hide the permanent count badge
  const [showTransient, setShowTransient] = useState(false);
  const [cartSrMessage, setCartSrMessage] = useState("");
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  // mobile dropdown links (include Order Now for easy access)
  const mobileLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

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
  }, [setMenuOpen]);

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

  // transient badge animation when an item is added
  useEffect(() => {
    if (!lastAddedAt) return;
    // trigger transient animation
    setShowTransient(true);
    // announce to screen readers
    setCartSrMessage(`Added to cart. ${count} item${count === 1 ? "" : "s"} in cart.`);
    const t = setTimeout(() => {
      setShowTransient(false);
      // clear SR message after a short delay
      setTimeout(() => setCartSrMessage(""), 700);
    }, 900);
    return () => clearTimeout(t);
  }, [lastAddedAt, count]);

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
           before:bg-linear-to-r before:from-transparent before:via-[#FFD580]/80 before:to-transparent
           before:-translate-x-full group-hover:before:translate-x-full
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
              onClick={toggle}
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

            {/* Cart link */}
            <Link href="/cart" className="relative inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-semantic-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6.4A1 1 0 007.8 21h8.4a1 1 0 00.98-.8L18 13M7 13H5.4" />
              </svg>
              {count > 0 && !showTransient && (
                <motion.span animate={{ scale: 1 }} transition={{ duration: 0.45 }} className="absolute -top-2 -right-3 bg-semantic-text-primary text-red-500 rounded-full text-xs w-5 h-5 flex items-center justify-center">{count}</motion.span>
              )}
              <AnimatePresence>
                {showTransient && (
                  <motion.span initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: -12 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="absolute -top-7 -right-6 bg-semantic-text-primary text-white rounded-full text-xs px-2 py-1 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth={2} fill="none" />
                    </svg>
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
              {/* Order CTA: icon-only on xs, full button on sm+ */}
              <Link
                href="/shop"
                aria-label="Order now"
                className="sm:hidden inline-flex items-center justify-center w-11 h-11 rounded-full
                           bg-linear-to-br from-[#FFD580] to-[#F89C27] shadow-md hover:shadow-lg
                           text-black dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F89C27]
                           transition-transform active:scale-95"
              >
                {/* shopping bag icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 10-8 0v4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 11h18l-1.5 9h-15L3 11z" />
                </svg>
              </Link>

              {/* Full label on sm+ */}
              <Link
                href="/shop"
                className="hidden sm:inline-flex relative items-center justify-center overflow-hidden rounded-md
                           px-4 py-2 text-sm font-semibold text-black dark:text-white
                           bg-linear-to-br from-[#FFD580] to-[#F89C27]
                           dark:from-[#F89C27] dark:to-[#E87817]
                           shadow-md hover:shadow-lg hover:shadow-[#F89C27]/30
                           focus-visible:ring-2 focus-visible:ring-[#F89C27]
                           transition-all duration-300 group whitespace-nowrap"
              >
                <span className="relative z-10">Order Now</span>

                {/* Gold shimmer overlay */}
                  <span className="absolute inset-0 before:absolute before:inset-0 
                                 before:bg-linear-to-r before:from-transparent before:via-white/70 before:to-transparent
                                 before:-translate-x-full group-hover:before:translate-x-full
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
                    {mobileLinks.map((item) => (
                      <a
                        key={item.href + item.label}
                        href={item.href}
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                          e.preventDefault();
                          setMenuOpen(false);
                          setTimeout(() => router.push(item.href), 200);
                        }}
                        className="block px-3 py-2 rounded text-sm text-[#1a1a1a] dark:text-white/90 
                                   hover:bg-white/10 dark:hover:bg-white/5 transition-colors
                                   focus-visible:ring-2 focus-visible:ring-[#F89C27]"
                      >
                        {item.label}
                      </a>
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
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {cartSrMessage}
      </span>
    </nav>
  );
}
