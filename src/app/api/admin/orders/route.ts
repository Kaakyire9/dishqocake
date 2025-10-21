import { NextResponse } from 'next/server';
import { getSupabaseServerClient as getSupabaseServer } from '@/lib/supabaseServer';
import { listOrders } from '@/lib/orders';
import { getAdminSession } from '@/lib/session';

// const ADMIN_HEADER = 'x-admin-key';

export async function GET() {
  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json(listOrders());
  const table = (await import('@/lib/supabaseClient')).typedFrom<unknown>('orders');
  const { data, error } = await table.select();
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
  const table = (await import('@/lib/supabaseClient')).typedFrom<unknown>('orders');
  const { data, error } = await table.insert([body]);
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
  const table = (await import('@/lib/supabaseClient')).typedFrom<unknown>('orders');
  const safePatch = patch as Partial<Record<string, unknown>>;
  const { data, error } = await table.updateById(id as string, safePatch);
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
  const table = (await import('@/lib/supabaseClient')).typedFrom<unknown>('orders');
  const { error } = await table.deleteById(id as string);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
