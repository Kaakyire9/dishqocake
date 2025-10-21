-- Recommended RLS policies for DishQoCake
-- Run this in the Supabase SQL editor after running schema.sql

-- Enable RLS on tables
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- PRODUCTS: allow public SELECT (reading the catalog)
create policy "public_select_products" on public.products
  for select using (true);

-- PRODUCTS: allow inserts/updates/deletes only via service role (server)
-- For server routes using the service role key, Supabase bypasses RLS.
-- If you want to allow authenticated admin users, create a role-based policy instead.
create policy "no_public_write_products" on public.products
  for insert with check (false);
create policy "no_public_update_products" on public.products
  for update using (false);
create policy "no_public_delete_products" on public.products
  for delete using (false);

-- ORDERS: allow public INSERT (customers place orders)
create policy "public_insert_orders" on public.orders
  for insert with check (true);

-- ORDERS: allow public SELECT (optional) — if you want customers to view orders, scope it by phone or id
create policy "public_select_orders" on public.orders
  for select using (true);

-- ORDERS: prevent anonymous updates/deletes — only server/service role or authenticated admin
create policy "no_public_update_orders" on public.orders
  for update using (false);
create policy "no_public_delete_orders" on public.orders
  for delete using (false);

-- Optional: If you use Supabase Auth and a custom 'admin' claim on JWTs, you can allow admin writes
-- Example policy (requires setting custom claim 'role' = 'admin' in user's JWT):
-- create policy "admin_write_products" on public.products
--   for all using (auth.jwt() ->> 'role' = 'admin');

-- Note: Service role key bypasses RLS and should be used only on the server side.
