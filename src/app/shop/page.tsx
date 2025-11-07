import ProductGrid from "../../components/ProductGrid";

export const metadata = {
  title: "Shop Cakes — DishQo Custom Whipped Cream Collection",
  description:
    "Explore DishQo’s premium cake menu. Choose from gold & black luxury, pink & cream festive, and elegant whipped cream rounds. Available in 5”–9” sizes.",
  openGraph: {
    title: "Shop Cakes — DishQo Custom Whipped Cream Collection",
    description:
      "Explore DishQo’s premium cake menu. Choose from gold & black luxury, pink & cream festive, and elegant whipped cream rounds. Available in 5”–9” sizes.",
    url: "https://www.dishqocake.com/shop",
    siteName: "DishQo Cake",
    images: [
      {
        url: "https://www.dishqocake.com/products/dishqo-10ws.png",
        width: 1200,
        height: 630,
        alt: "DishQo Shop — Featured Cakes",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
};

export default function ShopPage() {
  return (
    <main className="flex-1">
      <div className="max-w-6xl mx-auto px-6 py-12">
  <h2 className="text-3xl font-bold text-dishqo-heading mb-6">Our Menu</h2>
        <ProductGrid />
      </div>
    </main>
  );
}
