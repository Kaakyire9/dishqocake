import type { Order } from "@/types";
import { typedFrom } from '@/lib/supabaseClient';

const ORDERS_KEY = "dishqo-orders";

export function saveOrder(order: Order) {
  try {
    const raw = localStorage.getItem(ORDERS_KEY) || "[]";
    const arr = JSON.parse(raw);
    arr.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(arr));
    return true;
  } catch (_e) {
    console.error(_e);
    return false;
  }
}

export function formatGhs(amount: number) {
  return new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS" }).format(amount);
}


export function listOrders(): Order[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(ORDERS_KEY) || '[]' : '[]';
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function updateOrderStatus(id: string, status: 'Pending' | 'Paid' | 'Delivered') {
  try {
    const arr = listOrders();
    const idx = arr.findIndex((o) => o.id === id);
    if (idx === -1) return false;
    arr[idx].status = status;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(arr));
    return true;
  } catch {
    return false;
  }
}

export function deleteOrder(id: string) {
  try {
    const arr = listOrders();
    const updated = arr.filter((o) => o.id !== id);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    return true;
  } catch {
    return false;
  }
}

// Optional Supabase-backed operations
async function getSupabaseClientOrders(): Promise<unknown | null> {
  try {
    const url = process?.env?.NEXT_PUBLIC_SUPABASE_URL;
    const key = process?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    const { createClient } = await import('@supabase/supabase-js');
    return createClient(url, key);
  } catch {
    return null;
  }
}

export async function listOrdersRemote(): Promise<Order[]> {
  const supabase = await getSupabaseClientOrders();
  if (!supabase) return listOrders();
  const table = typedFrom<Order>('orders');
  const { data, error } = await table.select();
  if (error || !data) return listOrders();
  return data as Order[];
}

export async function saveOrderRemote(order: Order) {
  const supabase = await getSupabaseClientOrders();
  if (!supabase) return saveOrder(order);
  const table = typedFrom<Order>('orders');
  const { error } = await table.insert([order]);
  if (error) {
    console.error(error);
    return false;
  }
  return true;
}

export async function updateOrderStatusRemote(id: string, status: 'Pending' | 'Paid' | 'Delivered') {
  const supabase = await getSupabaseClientOrders();
  if (!supabase) return updateOrderStatus(id, status);
  const table = typedFrom<Order>('orders');
  const { error } = await table.updateById(id, { status } as Partial<Order>);
  if (error) {
    console.error(error);
    return false;
  }
  return true;
}

export async function deleteOrderRemote(id: string) {
  const supabase = await getSupabaseClientOrders();
  if (!supabase) return deleteOrder(id);
  const table = typedFrom<Order>('orders');
  const { error } = await table.deleteById(id);
  if (error) {
    console.error(error);
    return false;
  }
  return true;
}
