import CheckoutClient from "@/components/CheckoutClient";
import { cookies } from "next/headers";
import CopyButton from "@/components/CopyButton";
import CheckoutForm from "@/components/CheckoutForm";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("dishqo-cart")?.value ?? null;
  let snapshot = null;
  try {
    if (raw) snapshot = JSON.parse(decodeURIComponent(raw));
  } catch (e) {
    snapshot = null;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CheckoutClient snapshot={snapshot} />
        </div>

        <aside className="lg:col-span-1">
          <CheckoutForm snapshot={snapshot} />
        </aside>
      </div>
    </div>
  );
}
