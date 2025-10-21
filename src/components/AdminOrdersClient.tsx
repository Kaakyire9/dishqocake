"use client";

import React from 'react';
import { formatGhs } from '@/lib/orders';
import { toast } from '@/lib/toast';

function StatusBadge({ status }: { status: string }) {
  const cls = status === 'Paid' ? 'bg-green-100 text-green-700' : status === 'Delivered' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700';
  return <span className={`px-2 py-1 rounded-full text-xs ${cls}`}>{status}</span>;
}

export default function AdminOrdersClient({ orders: initialOrders, updateOrder, deleteOrder }: any) {
  const orders = initialOrders || [];

  const mark = async (id: string, status: 'Paid' | 'Delivered') => {
    try {
      await updateOrder({ id, status });
      toast.success(`Order ${status}`);
      window.location.reload();
    } catch (e) {
      toast.error('Failed to update order');
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm('Delete order?')) return;
    try {
      await deleteOrder(id);
      toast.success('Order deleted');
      window.location.reload();
    } catch (e) {
      toast.error('Failed to delete order');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <div className="bg-white rounded-2xl shadow overflow-auto">
        <table className="w-full">
          <thead className="text-left">
            <tr className="border-b">
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o: any) => (
              <tr key={o.id} className="border-b">
                <td className="p-3">{o.id}</td>
                <td className="p-3">{o.name}  {o.phone}</td>
                <td className="p-3">{formatGhs(o.total)}</td>
                <td className="p-3"><StatusBadge status={o.status || 'Pending'} /></td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => mark(o.id, 'Paid')} className="px-2 py-1 bg-yellow-100 rounded">Mark as Paid</button>
                  <button onClick={() => mark(o.id, 'Delivered')} className="px-2 py-1 bg-blue-100 rounded">Mark as Delivered</button>
                  <button onClick={() => onDelete(o.id)} className="px-2 py-1 bg-red-100 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
