export const metadata = {
  title: "Contact DishQo — Order Custom Cakes or Inquire",
  description:
    "Get in touch with DishQo. Order via WhatsApp, mobile money, or visit our social channels. We’re here to make your next celebration special.",
  openGraph: {
    title: "Contact DishQo — Order Custom Cakes or Inquire",
    description:
      "Get in touch with DishQo. Order via WhatsApp, mobile money, or visit our social channels. We’re here to make your next celebration special.",
    url: "https://www.dishqocake.com/contact",
    siteName: "DishQo Cake",
    images: [
      {
        url: "https://www.dishqocake.com/gallery/gallery5.jpg",
        width: 1200,
        height: 630,
        alt: "Contact DishQo",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
