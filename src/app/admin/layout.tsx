import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Top-level admin layout — do not enforce session here so public pages like /admin/login can render.
  return (
    <div className="min-h-screen bg-cream-50 text-gray-800">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-6">
          <aside className="w-64 bg-white rounded-2xl shadow p-4 sticky top-4 h-[80vh]">
            <div className="text-2xl font-semibold text-pink-600 mb-6">DishQo Admin</div>
            <nav className="flex flex-col gap-2">
              <Link href="/admin" className="px-3 py-2 rounded hover:bg-pink-50">Dashboard</Link>
              <Link href="/admin/products" className="px-3 py-2 rounded hover:bg-pink-50">Products</Link>
              <Link href="/admin/orders" className="px-3 py-2 rounded hover:bg-pink-50">Orders</Link>
              <Link href="/admin/login" className="px-3 py-2 rounded hover:bg-pink-50">Login</Link>
            </nav>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow mb-6">
              <div className="text-lg font-medium">Admin</div>
              <div className="text-sm text-gray-500">Manage your bakery</div>
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
