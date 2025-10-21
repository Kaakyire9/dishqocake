import type { Product } from "@/types";
import { typedFrom } from '@/lib/supabaseClient';

export const products: Product[] = [
  { id: "1", name: "Classic Vanilla Cake", description: "Soft vanilla sponge with buttercream.", price: 25, image: "/products/vanilla.svg" },
  { id: "2", name: "Chocolate Truffle", description: "Rich chocolate layers with ganache.", price: 30, image: "/products/chocolate.svg" },
  { id: "3", name: "Strawberry Delight", description: "Fresh strawberries and cream.", price: 28, image: "/products/strawberry.svg" },
  { id: "4", name: "Lemon Tart", description: "Zesty lemon curd on a crisp crust.", price: 18, image: "/products/lemon.svg" },
  { id: "5", name: "Red Velvet Romance", description: "Velvety red cake with cream cheese icing.", price: 32, image: "/products/redvelvet.svg" },
  { id: "6", name: "Almond Praline", description: "Crunchy praline and almond sponge.", price: 29, image: "/products/almond.svg" },
];

const PRODUCTS_KEY = 'dishqo-products';

export function listProducts(): Product[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(PRODUCTS_KEY) : null;
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return products;
}

export function saveProducts(list: Product[]) {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));
    return true;
  } catch (_e) {
    console.error(_e);
    return false;
  }
}

export function addProduct(p: Product) {
  const cur = listProducts();
  cur.push(p);
  return saveProducts(cur);
}

export function updateProduct(id: string, patch: Partial<Product>) {
  const cur = listProducts();
  const idx = cur.findIndex((x) => x.id === id);
  if (idx === -1) return false;
  cur[idx] = { ...cur[idx], ...patch };
  return saveProducts(cur);
}

export function deleteProduct(id: string) {
  const cur = listProducts();
  const updated = cur.filter((x) => x.id !== id);
  return saveProducts(updated);
}

// ---------- Optional Supabase-backed functions (async) ----------
// These will attempt to dynamically import @supabase/supabase-js and use
// NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. If Supabase
// is not configured or the import fails, they fall back to localStorage.

async function getSupabaseClient(): Promise<unknown | null> {
  try {
    const url = process?.env?.NEXT_PUBLIC_SUPABASE_URL;
    const key = process?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
  // dynamic import so package is optional
  const { createClient } = await import('@supabase/supabase-js');
    return createClient(url, key);
  } catch {
    // package not installed or other error
    return null;
  }
}

export async function listProductsRemote(): Promise<Product[]> {
  const supabase = await getSupabaseClient();
  if (!supabase) return listProducts();
  // supabase is unknown; cast locally where we call .from()
  const table = typedFrom<Product>('products');
  const { data, error } = await table.select();
  if (error || !data) return listProducts();
  return data as Product[];
}

export async function addProductRemote(p: Product) {
  const supabase = await getSupabaseClient();
  if (!supabase) return addProduct(p);
  const table = typedFrom<Product>('products');
  const { error } = await table.insert([p]);
  if (error) {
    console.error(error);
    return false;
  }
  return true;
}

export async function updateProductRemote(id: string, patch: Partial<Product>) {
  const supabase = await getSupabaseClient();
  if (!supabase) return updateProduct(id, patch);
  const table = typedFrom<Product>('products');
  const { error } = await table.updateById(id, patch as Partial<Product>);
  if (error) {
    console.error(error);
    return false;
  }
  return true;
}

export async function deleteProductRemote(id: string) {
  const supabase = await getSupabaseClient();
  if (!supabase) return deleteProduct(id);
  const table = typedFrom<Product>('products');
  const { error } = await table.deleteById(id);
  if (error) {
    console.error(error);
    return false;
  }
  return true;
}
