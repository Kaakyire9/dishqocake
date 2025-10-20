"use client";

import ProductCard from "./ProductCard";
import { products } from "@/lib/products";

export default function ProductGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-pink-700 mb-6">Our Bestsellers</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={{ ...p, price: p.price }} />
        ))}
      </div>
    </section>
  );
}
