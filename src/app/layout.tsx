import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import Background from "@/components/Background";
import MenuProvider from "@/context/MenuProvider";
import WhatsAppFloating from "@/components/WhatsAppFloating";

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
        alt: "DishQo Cake — Hero",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dishqocake.com";

  const bakeryLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: "DishQo Cake",
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/dishqo-logo.png`,
    image: `${SITE_ORIGIN}/dishqo-hero.jpg`,
    description:
      "Handcrafted whipped cream cakes, luxury designs, and festive desserts made fresh in Ghana.",
    sameAs: [
      "https://www.instagram.com/dish_qo",
      "https://www.tiktok.com/@dish_qo",
      "https://www.facebook.com/dish_qo",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kumasi",
      addressCountry: "GH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+233553437570",
      contactType: "Customer Service",
    },
  } as const;

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bakeryLd) }}
        />
      </head>
      <body className="font-sans bg-semantic-bg-surface text-semantic-text-primary min-h-screen flex flex-col">
        <Background />
        <MenuProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <WhatsAppFloating />
          <Footer />
          <ToastProvider />
        </MenuProvider>
      </body>
    </html>
  );
}
