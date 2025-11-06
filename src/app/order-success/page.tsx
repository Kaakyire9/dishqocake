import Link from "next/link";

export const metadata = {
  title: "DishQo Cake — A Flavored Way to Live",
  description:
    "Order handcrafted whipped cream cakes, elegant gold & black designs, and pink & cream desserts from DishQo Ghana. Custom cakes for birthdays, weddings, and events.",
  openGraph: {
    title: "DishQo Cake — A Flavored Way to Live",
    description:
      "Premium handcrafted cakes made in Ghana. Custom orders available — luxury, festive, and elegant designs for every celebration.",
    url: "https://www.dishqocake.com",
    siteName: "DishQo Cake",
    images: [
      {
        url: "https://www.dishqocake.com/dishqo-hero.jpg",
        width: 1200,
        height: 630,
        alt: "DishQo Cake — Order Received",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
};

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
  <div className="max-w-xl text-center bg-semantic-surface-card p-10 rounded-lg shadow">
  <h1 className="text-2xl font-bold text-semantic-text-primary">🎉 Order received!</h1>
    <p className="mt-4 text-semantic-text-muted">We’ll confirm your Momo payment soon and arrange delivery.</p>
  <Link href="/" className="mt-6 inline-block bg-semantic-btn-cta hover:bg-semantic-btn-cta-hover text-white px-6 py-3 rounded">Continue shopping</Link>
      </div>
    </div>
  );
}
