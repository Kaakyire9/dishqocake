import Link from "next/link";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl text-center bg-white p-10 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-pink-700">🎉 Order received!</h1>
        <p className="mt-4 text-gray-600">We’ll confirm your Momo payment soon and arrange delivery.</p>
        <Link href="/" className="mt-6 inline-block bg-pink-600 text-white px-6 py-3 rounded">Continue shopping</Link>
      </div>
    </div>
  );
}
