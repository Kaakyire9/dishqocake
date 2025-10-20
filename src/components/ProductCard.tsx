"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="w-full h-48 relative">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-pink-700">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold text-pink-600">{product.price}</span>
          <button className="bg-pink-600 text-white px-3 py-1 rounded-md text-sm">Add to Cart</button>
        </div>
      </div>
    </motion.div>
  );
}
