import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { listProducts, saveProducts } from '@/lib/products';
import { getAdminSession } from '@/lib/session';

const ADMIN_HEADER = 'x-admin-key';

export async function GET() {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json(listProducts());
  }

  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const supabase = getSupabaseServer();
  const body = await req.json();
  if (!supabase) {
    // fallback: localStorage not available on server; use existing saved file list
    // We'll return 501 to indicate remote not available
    return NextResponse.json({ error: 'Supabase not configured on server' }, { status: 501 });
  }
  const { data, error } = await supabase.from('products').insert([body]);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const supabase = getSupabaseServer();
  const body = await req.json();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured on server' }, { status: 501 });
  const { id, ...patch } = body;
  const { data, error } = await supabase.from('products').update(patch).eq('id', id);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const supabase = getSupabaseServer();
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured on server' }, { status: 501 });
  const { data, error } = await supabase.from('products').delete().eq('id', id);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
