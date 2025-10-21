import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ProductGrid />
    </main>
  );
}
