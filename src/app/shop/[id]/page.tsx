import { products } from "@/lib/products";
import ClientProduct from "./ClientProduct";

export default async function ProductPage(props: PageProps<'/shop/[id]'>) {
  const params = await props.params;
  const id = params.id;
  const product = products.find((p) => p.id === id);

  if (!product) return <div className="p-8">Product not found</div>;

  const related = products.filter((p) => p.id !== id).slice(0, 3);

  return <ClientProduct product={product} related={related} />;
}
