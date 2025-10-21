import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { listOrders } from '@/lib/orders';
import { getAdminSession } from '@/lib/session';

const ADMIN_HEADER = 'x-admin-key';

export async function GET() {
  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json(listOrders());
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  // allow public POST for orders (site customers), but server will use anon key if needed
  const supabase = getSupabaseServer();
  const body = await req.json();
  if (!supabase) {
    // fallback to local storage not possible from server — return 501
    return NextResponse.json({ error: 'Supabase not configured on server' }, { status: 501 });
  }
  const { data, error } = await supabase.from('orders').insert([body]);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured on server' }, { status: 501 });
  const body = await req.json();
  const { id, ...patch } = body;
  const { data, error } = await supabase.from('orders').update(patch).eq('id', id);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured on server' }, { status: 501 });
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const { data, error } = await supabase.from('orders').delete().eq('id', id);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
