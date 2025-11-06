import { products } from "@/lib/products";
import ClientProduct from "./ClientProduct";

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dishqocake.com";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = params.id;
  const product = products.find((p) => p.id === id) ?? null;

  if (!product) {
    return {
      title: "Product — DishQo Cake",
      description: "DishQo product.",
    };
  }

  const imagePath = product.ogWebp ?? product.ogImage ?? product.image ?? "/dishqo-hero.jpg";
  const imageUrl = imagePath.startsWith("http") ? imagePath : new URL(imagePath, SITE_ORIGIN).toString();

  return {
    title: `${product.name} — DishQo Cake`,
    description: product.description,
    openGraph: {
      title: `${product.name} — DishQo Cake`,
      description: product.description,
      url: `${SITE_ORIGIN}/shop/${id}`,
      siteName: "DishQo Cake",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: "en_GB",
      type: "article",
    },
  };
}

export default async function ProductPage(props: PageProps<'/shop/[id]'>) {
  const params = await props.params;
  const id = params.id;
  const product = products.find((p) => p.id === id);

  if (!product) return <div className="p-8">Product not found</div>;

  const related = products.filter((p) => p.id !== id).slice(0, 3);

  return <ClientProduct product={product} related={related} />;
}
