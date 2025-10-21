"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatGhs } from "@/lib/orders";
import { toast } from "@/lib/toast";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((s) => s.addItem);

  const onAdd = () => {
    add({ id: product.id, name: product.name, description: product.description, price: product.price, image: product.image }, 1);
    toast.success(`${product.name} added to cart 🍰`);
  };

  return (
    <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="w-full h-48 relative">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-pink-700">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold text-pink-600">{formatGhs(product.price)}</span>
          <button onClick={onAdd} className="bg-pink-600 text-white px-3 py-1 rounded-md text-sm">Add to Cart</button>
        </div>
      </div>
    </motion.div>
  );
}
