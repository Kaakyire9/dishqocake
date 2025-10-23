"use client";

import Link from "next/link";
import Image from "next/image";
import Tooltip from "./Tooltip";
import { useCartStore } from "@/store/cartStore";
import CartCookieSync from "./CartCookieSync";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function Navbar() {
  const count = useCartStore((s) => s.items.reduce((a: number, b) => a + b.quantity, 0));
  const lastAddedAt = useCartStore((s) => s.lastAddedAt ?? null);
  const [showBadge, setShowBadge] = React.useState(false);

  React.useEffect(() => {
    if (!lastAddedAt) return;
    setShowBadge(true);
    const t = setTimeout(() => setShowBadge(false), 1000);
    return () => clearTimeout(t);
  }, [lastAddedAt]);

  return (
  <nav className="flex items-center justify-between px-6 py-3 bg-semantic-surface-card shadow-md">
      <CartCookieSync />
      <Tooltip content="DishQo — A Flavored Way to Live">
        <Link href="/" className="flex items-center gap-3" aria-label="Home">
  <Image src="/dishqo-logo.png" alt="DishQo" width={64} height={64} className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-md shadow-sm object-cover transform-gpu transition-transform duration-300 ease-out hover:scale-110 hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-semantic-accent-gold cursor-pointer" priority />
          <span className="sr-only">DishQo — A Flavored Way to Live</span>
        </Link>
      </Tooltip>
      <div className="flex items-center space-x-6">
  <Link href="/shop" className="hover:text-semantic-text-primary">Shop</Link>
  <Link href="/contact" className="hover:text-semantic-text-primary">Contact</Link>
  <Link href="/admin" className="hover:text-semantic-text-primary">Admin</Link>
        <Link href="/cart" className="relative inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-semantic-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6.4A1 1 0 007.8 21h8.4a1 1 0 00.98-.8L18 13M7 13H5.4" />
          </svg>
            {count > 0 && (
            <motion.span animate={showBadge ? { scale: [1, 1.35, 1] } : { scale: 1 }} transition={{ duration: 0.45 }} className="absolute -top-2 -right-3 bg-semantic-text-primary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{count}</motion.span>
          )}
          <AnimatePresence>
            {showBadge && (
              <motion.span initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: -12 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="absolute -top-7 -right-6 bg-semantic-text-primary text-white rounded-full text-xs px-2 py-1 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth={2} fill="none" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </nav>
  );
}
