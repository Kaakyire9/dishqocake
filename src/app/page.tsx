import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ShopPreview from "../components/ShopPreview";
import Testimonials from "../components/Testimonials";
import GoogleReviews from "../components/GoogleReviews";
import GallerySection from "../components/GallerySection";

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
        alt: "DishQo Cake Gold & Pink Showcase",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <AboutSection />
      <ShopPreview />
      <Testimonials />
  <GoogleReviews />
  <GallerySection />
    </main>
  );
}
