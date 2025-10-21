-- Supabase schema for DishQoCake
-- Run this in the Supabase SQL editor (SQL) to create products and orders tables

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null,
  image text,
  category text,
  created_at timestamptz default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  address text not null,
  note text,
  items jsonb not null,
  total numeric not null,
  status text default 'Pending',
  created_at timestamptz default now()
);

-- Add indexes for common queries
create index if not exists idx_products_created_at on public.products (created_at desc);
create index if not exists idx_orders_created_at on public.orders (created_at desc);
