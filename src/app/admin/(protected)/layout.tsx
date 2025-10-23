import { getAdminSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  return (
    <div>
      <div className="flex gap-6">
  <aside className="w-64 bg-semantic-surface-card rounded-2xl shadow p-4 sticky top-4 h-[80vh]">
          <div className="text-2xl font-semibold text-semantic-accent-gold mb-6">DishQo Admin</div>
          <nav className="flex flex-col gap-2">
            <Link href="/admin" className="px-3 py-2 rounded hover:bg-semantic-accent-gold/8">Dashboard</Link>
            <Link href="/admin/products" className="px-3 py-2 rounded hover:bg-semantic-accent-gold/8">Products</Link>
            <Link href="/admin/orders" className="px-3 py-2 rounded hover:bg-semantic-accent-gold/8">Orders</Link>
            <Link href="/admin/login" className="px-3 py-2 rounded hover:bg-semantic-accent-gold/8">Login</Link>
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
