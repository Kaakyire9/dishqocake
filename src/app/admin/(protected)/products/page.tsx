import { getSupabaseServerClient as getSupabaseServer } from '@/lib/supabaseServer';
import { listProducts } from '@/lib/products';
import type { Product } from '@/types';
import { typedFrom } from '@/lib/supabaseClient';
import AdminProductsClient from '@/components/AdminProductsClient';
import { revalidatePath } from 'next/cache';

export default async function AdminProductsPage() {
  const supabase = getSupabaseServer();
  let items: Product[] = [];
  if (!supabase) {
    items = listProducts();
  } else {
  // suppress explicit-any for the dynamic supabase client here
  const table = typedFrom<Product>('products');
  const { data } = await table.select();
  items = (data as Product[]) || [];
  }

  async function addProductAction(payload: Product) {
    'use server';
    const session = await import('@/lib/session').then((m) => m.getAdminSession());
    if (!session) throw new Error('unauthorized');
  const supabase = getSupabaseServer();
  if (!supabase) throw new Error('Supabase not configured');
  const table = typedFrom<Product>('products');
  const { data, error } = await table.insert([payload]);
    if (error) throw error;
    revalidatePath('/admin/products');
    return (data as Product[])?.[0];
  }

  async function updateProductAction(payload: { id: string } & Partial<Product>) {
    'use server';
    const session = await import('@/lib/session').then((m) => m.getAdminSession());
    if (!session) throw new Error('unauthorized');
  const supabase = getSupabaseServer();
  if (!supabase) throw new Error('Supabase not configured');
  const { id, ...patch } = payload;
  const table = typedFrom<Product>('products');
  const { data, error } = await table.updateById(id, patch as Partial<Product>);
    if (error) throw error;
    revalidatePath('/admin/products');
    return (data as Product[])?.[0];
  }

  async function deleteProductAction(id: string): Promise<void> {
    'use server';
    const session = await import('@/lib/session').then((m) => m.getAdminSession());
    if (!session) throw new Error('unauthorized');
  const supabase = getSupabaseServer();
  if (!supabase) throw new Error('Supabase not configured');
  const table = typedFrom<Product>('products');
  const { error } = await table.deleteById(id);
    if (error) throw error;
    revalidatePath('/admin/products');
    return;
  }

  return <AdminProductsClient items={items} addProduct={addProductAction} updateProduct={updateProductAction} deleteProduct={deleteProductAction} />;
}
