export const metadata = {
  title: "About DishQo — Ghana’s Whipped Cream Cake Brand",
  description:
    "DishQo creates luxurious whipped cream cakes inspired by joy, color, and taste. Discover our story, from classic Ghanaian celebrations to modern pastel designs.",
  openGraph: {
    title: "About DishQo — Ghana’s Whipped Cream Cake Brand",
    description:
      "DishQo creates luxurious whipped cream cakes inspired by joy, color, and taste. Discover our story, from classic Ghanaian celebrations to modern pastel designs.",
    url: "https://www.dishqocake.com/about",
    siteName: "DishQo Cake",
    images: [
      {
        url: "https://www.dishqocake.com/gallery/dishqo-about-hero.png",
        width: 1200,
        height: 630,
        alt: "About DishQo — Our Story",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
