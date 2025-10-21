"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import CartCookieSync from "./CartCookieSync";

export default function Navbar() {
  const count = useCartStore((s) => s.items.reduce((a: number, b) => a + b.quantity, 0));

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <CartCookieSync />
      <Link href="/" className="text-2xl font-bold text-pink-600">Dishqo</Link>
      <div className="flex items-center space-x-6">
        <Link href="/shop" className="hover:text-pink-600">Shop</Link>
        <Link href="/contact" className="hover:text-pink-600">Contact</Link>
        <Link href="/admin" className="hover:text-pink-600">Admin</Link>
        <Link href="/cart" className="relative inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6.4A1 1 0 007.8 21h8.4a1 1 0 00.98-.8L18 13M7 13H5.4" />
          </svg>
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-pink-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{count}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}
