import { getAdminSession } from '@/lib/session';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { listProducts } from '@/lib/products';
import AdminProductsClient from '@/components/AdminProductsClient';
import { revalidatePath } from 'next/cache';

export default async function AdminProductsPage() {
  const session = await getAdminSession();
  const supabase = getSupabaseServer();
  let items = [] as any[];
  if (!supabase) {
    items = listProducts();
  } else {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    items = data || [];
  }

  async function addProductAction(payload: any) {
    'use server';
    const session = await getAdminSession();
    if (!session) throw new Error('unauthorized');
    const supabase = getSupabaseServer();
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.from('products').insert([payload]).select();
    if (error) throw error;
    revalidatePath('/admin/products');
    return data?.[0];
  }

  async function updateProductAction(payload: any) {
    'use server';
    const session = await getAdminSession();
    if (!session) throw new Error('unauthorized');
    const supabase = getSupabaseServer();
    if (!supabase) throw new Error('Supabase not configured');
    const { id, ...patch } = payload;
    const { data, error } = await supabase.from('products').update(patch).eq('id', id).select();
    if (error) throw error;
    revalidatePath('/admin/products');
    return data?.[0];
  }

  async function deleteProductAction(id: string) {
    'use server';
    const session = await getAdminSession();
    if (!session) throw new Error('unauthorized');
    const supabase = getSupabaseServer();
    if (!supabase) throw new Error('Supabase not configured');
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/products');
    return { ok: true };
  }

  return <AdminProductsClient items={items} addProduct={addProductAction} updateProduct={updateProductAction} deleteProduct={deleteProductAction} />;
}
