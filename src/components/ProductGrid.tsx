"use client";

import ProductCard from "./ProductCard";

const products = [
  { id: "1", name: "Classic Vanilla Cake", description: "Soft vanilla sponge with buttercream.", price: "$25", image: "/products/vanilla.jpg" },
  { id: "2", name: "Chocolate Truffle", description: "Rich chocolate layers with ganache.", price: "$30", image: "/products/chocolate.jpg" },
  { id: "3", name: "Strawberry Delight", description: "Fresh strawberries and cream.", price: "$28", image: "/products/strawberry.jpg" },
  { id: "4", name: "Lemon Tart", description: "Zesty lemon curd on a crisp crust.", price: "$18", image: "/products/lemon.jpg" },
  { id: "5", name: "Red Velvet Romance", description: "Velvety red cake with cream cheese icing.", price: "$32", image: "/products/redvelvet.jpg" },
  { id: "6", name: "Almond Praline", description: "Crunchy praline and almond sponge.", price: "$29", image: "/products/almond.jpg" },
];

export default function ProductGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-pink-700 mb-6">Our Bestsellers</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
