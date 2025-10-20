"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { formatGhs } from "@/lib/orders";
import Link from "next/link";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const remove = useCartStore((s) => s.removeItem);
  const total = useCartStore((s) => s.totalPrice());

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 text-gray-600">Your cart is empty — time to treat yourself 🍰</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AnimatePresence>
              {items.map((it) => (
                <motion.div key={it.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow mb-3">
                  <div className="w-28 h-20 relative rounded-md overflow-hidden">
                    <Image src={it.image} alt={it.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-pink-700">{it.name}</h3>
                    <p className="text-sm text-gray-600">{formatGhs(it.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => decrease(it.id)} className="px-2 py-1 bg-gray-100 rounded">-</button>
                      <span className="px-3">{it.quantity}</span>
                      <button onClick={() => increase(it.id)} className="px-2 py-1 bg-gray-100 rounded">+</button>
                      <button onClick={() => remove(it.id)} className="ml-4 text-sm text-red-500">Remove</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <aside className="bg-white rounded-lg p-6 shadow">
            <h4 className="font-semibold text-lg">Summary</h4>
            <div className="mt-4 flex justify-between">
              <span className="text-gray-600">Total</span>
              <span className="font-bold text-pink-700">{formatGhs(total)}</span>
            </div>
            <Link href="/checkout" className="mt-6 block text-center w-full bg-pink-600 text-white py-3 rounded">Checkout</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
