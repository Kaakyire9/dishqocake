import { getSupabaseServerClient as getSupabaseServer } from '@/lib/supabaseServer';
import { listOrders } from '@/lib/orders';
import type { Order } from '@/types';
import AdminOrdersClient from '@/components/AdminOrdersClient';
import { typedFrom } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

export default async function AdminOrdersPage() {
  const supabase = getSupabaseServer();
  let orders: Order[] = [];
  if (!supabase) {
    orders = listOrders();
  } else {
  const table = typedFrom<Order>('orders');
  const { data } = await table.select();
  orders = (data as Order[]) || [];
  }

  async function updateOrderAction(payload: { id: string } & Partial<Order>) {
    'use server';
    const session = await import('@/lib/session').then((m) => m.getAdminSession());
    if (!session) throw new Error('unauthorized');
  const supabase = getSupabaseServer();
  if (!supabase) throw new Error('Supabase not configured');
  const { id, ...patch } = payload;
  const table = typedFrom<Order>('orders');
  const { data, error } = await table.updateById(id, patch as Partial<Order>);
    if (error) throw error;
    revalidatePath('/admin/orders');
    return (data as Order[])?.[0];
  }

  async function deleteOrderAction(id: string): Promise<void> {
    'use server';
    const session = await import('@/lib/session').then((m) => m.getAdminSession());
    if (!session) throw new Error('unauthorized');
  const supabase = getSupabaseServer();
  if (!supabase) throw new Error('Supabase not configured');
  const table = typedFrom<Order>('orders');
  const { error } = await table.deleteById(id);
    if (error) throw error;
    revalidatePath('/admin/orders');
    return;
  }

  return <AdminOrdersClient orders={orders} updateOrder={updateOrderAction} deleteOrder={deleteOrderAction} />;
}
