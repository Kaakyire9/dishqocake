import CheckoutClient from "@/components/CheckoutClient";
import { cookies } from "next/headers";
// CopyButton intentionally unused in this build; keep import commented for later use
// import CopyButton from "@/components/CopyButton";
import CheckoutForm from "@/components/CheckoutForm";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("dishqo-cart")?.value ?? null;
  let snapshot = null;
  try {
    if (raw) snapshot = JSON.parse(decodeURIComponent(raw));
  } catch {
    snapshot = null;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
  <h1 className="text-3xl sm:text-4xl font-extrabold bg-[linear-gradient(90deg,#F89C27,#D46F2E,#F89C27)] bg-clip-text text-transparent mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-6 shadow-sm">
            <CheckoutClient snapshot={snapshot} />
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-2xl p-6 backdrop-blur-xl bg-white/5 border border-white/10 shadow-sm">
            <CheckoutForm snapshot={snapshot} />
          </div>
        </aside>
      </div>
    </div>
  );
}
