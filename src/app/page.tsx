import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ShopPreview from "../components/ShopPreview";
import Testimonials from "../components/Testimonials";
import GallerySection from "../components/GallerySection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <AboutSection />
      <ShopPreview />
      <Testimonials />
  <GallerySection />
    </main>
  );
}
