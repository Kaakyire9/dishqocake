"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <Link href="/" className="text-2xl font-bold text-pink-600">Dishqo</Link>
      <div className="space-x-6">
        <Link href="/shop" className="hover:text-pink-600">Shop</Link>
        <Link href="/contact" className="hover:text-pink-600">Contact</Link>
        <Link href="/admin" className="hover:text-pink-600">Admin</Link>
      </div>
    </nav>
  );
}
