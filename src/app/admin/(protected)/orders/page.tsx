import { getAdminSession } from '@/lib/session';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { listOrders } from '@/lib/orders';
import AdminOrdersClient from '@/components/AdminOrdersClient';
import { revalidatePath } from 'next/cache';

export default async function AdminOrdersPage() {
  const session = await getAdminSession();
  const supabase = getSupabaseServer();
  let orders = [] as any[];
  if (!supabase) {
    orders = listOrders();
  } else {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    orders = data || [];
  }

  async function updateOrderAction(payload: any) {
    'use server';
    const session = await getAdminSession();
    if (!session) throw new Error('unauthorized');
    const supabase = getSupabaseServer();
    if (!supabase) throw new Error('Supabase not configured');
    const { id, ...patch } = payload;
    const { data, error } = await supabase.from('orders').update(patch).eq('id', id).select();
    if (error) throw error;
    revalidatePath('/admin/orders');
    return data?.[0];
  }

  async function deleteOrderAction(id: string) {
    'use server';
    const session = await getAdminSession();
    if (!session) throw new Error('unauthorized');
    const supabase = getSupabaseServer();
    if (!supabase) throw new Error('Supabase not configured');
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/orders');
    return { ok: true };
  }

  return <AdminOrdersClient orders={orders} updateOrder={updateOrderAction} deleteOrder={deleteOrderAction} />;
}
