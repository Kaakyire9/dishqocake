import React from "react";
import { formatGhs } from "@/lib/orders";
import { products } from "@/lib/products";

export default function AdminIndex() {
  // compute simple totals from localStorage orders if present
  let orders: any[] = [];
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('dishqo-orders') || '[]' : '[]';
    orders = JSON.parse(raw || '[]');
  } catch (e) {
    orders = [];
  }

  const totalSales = orders.reduce((s: number, o: any) => s + (o.total || 0), 0);
  const pendingCount = orders.filter((o: any) => (o.status || 'Pending') === 'Pending').length;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-2xl font-semibold text-pink-600">{products.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Total Sales</div>
          <div className="text-2xl font-semibold">{formatGhs(totalSales)}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Pending Orders</div>
          <div className="text-2xl font-semibold">{pendingCount}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow">Quick actions and stats go here.</div>
        <div className="bg-white p-4 rounded-2xl shadow">Recent activity and orders preview.</div>
      </div>
    </div>
  );
}
