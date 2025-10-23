"use client";

import Image from "next/image";
// useRouter and use are intentionally not used server-side in this page file
// import { useRouter } from 'next/navigation';
// import { use } from 'react';
import { products } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";
import { motion } from "framer-motion";
import { formatGhs } from "@/lib/orders";

type Props = { params: { id: string } };

export default function ProductPage({ params }: Props) {
  const id = params.id;
  const product = products.find((p) => p.id === id);
  const add = useCartStore((s) => s.addItem);

  if (!product) return <div className="p-8">Product not found</div>;

  const related = products.filter((p) => p.id !== id).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
  <nav className="text-sm text-semantic-text-muted mb-4">Home / Shop / <span className="text-semantic-text-primary">{product.name}</span></nav>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8 grid-cols-1 lg:grid-cols-2">
        <div className="rounded-xl overflow-hidden shadow">
          <Image src={product.image} alt={product.name} width={800} height={600} className="object-cover w-full h-full" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-semantic-text-primary">{product.name}</h1>
          <p className="text-xl text-semantic-accent-gold font-semibold mt-2">{formatGhs(product.price)}</p>
          <p className="mt-4 text-semantic-text-muted">{product.description}</p>

          <div className="mt-6">
            <button onClick={() => add(product, 1)} className="bg-semantic-btn-cta hover:bg-semantic-btn-cta-hover text-white px-5 py-3 rounded-md">Add to Cart</button>
          </div>
        </div>
      </motion.div>

      <section className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Related</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {related.map((r) => (
            <motion.div key={r.id} whileHover={{ scale: 1.02 }} className="bg-semantic-surface-card rounded-lg p-3 shadow">
              <Image src={r.image} alt={r.name} width={300} height={200} className="object-cover w-full h-40 rounded-md" />
              <h4 className="mt-2 font-semibold text-semantic-text-primary">{r.name}</h4>
              <p className="text-sm text-semantic-text-muted">{formatGhs(r.price)}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
