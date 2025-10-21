import { createClient, type SupabaseClientLite } from '@supabase/supabase-js';

let supabaseServer: SupabaseClientLite | null = null;

export function getSupabaseServerClient(): SupabaseClientLite | null {
  if (supabaseServer) return supabaseServer;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  supabaseServer = createClient(url, key);
  return supabaseServer;
}
