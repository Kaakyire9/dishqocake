import ProductGrid from "../../components/ProductGrid";

export default function ShopPage() {
  return (
    <main className="flex-1">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-pink-700 mb-6">Our Menu</h2>
        <ProductGrid />
      </div>
    </main>
  );
}
