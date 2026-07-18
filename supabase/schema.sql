-- =============================================================
-- jaagSELECT CRM Schema
-- 在 Supabase Dashboard > SQL Editor 中執行此檔案
-- =============================================================

-- =============================================================
-- 使用者權限系統 (user_roles + has_role) — 修復 Admin Panel 無存取控制的問題
-- =============================================================
do $$ begin
  create type public.app_role as enum ('admin');
exception when duplicate_object then null; end $$;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

drop policy if exists "Users can read own roles" on public.user_roles;
create policy "Users can read own roles"
  on public.user_roles for select
  to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- 手動指派 admin 角色（把 <YOUR-USER-UUID> 換成你在 Supabase Authentication 建立的 user id）：
-- insert into public.user_roles (user_id, role) values ('<YOUR-USER-UUID>', 'admin');


-- =============================================================

-- 訂單狀態枚舉
do $$ begin
  create type public.order_status as enum ('等待入貨', '已到港', '已發貨');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.shipping_method as enum ('到宅配送', '順豐智能櫃');
exception when duplicate_object then null; end $$;

-- =============================================================
-- Orders 表
-- =============================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  phone text not null,
  email text not null,                 -- 必填，用於未來 Resend 自動發信
  ig_handle text,                       -- 選填
  shipping_method public.shipping_method not null default '順豐智能櫃',
  shipping_address text not null,       -- 到宅地址 或 智能櫃編號
  products text not null,
  amount numeric(10,2) not null default 0,
  sf_tracking text,
  status public.order_status not null default '等待入貨',
  -- 寄信狀態欄位（'pending' | 'sent' | 'failed'）
  confirmation_email_status text not null default 'pending',
  confirmation_email_sent_at timestamptz,
  confirmation_email_error text,
  shipped_email_status text not null default 'pending',
  shipped_email_sent_at timestamptz,
  shipped_email_error text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 若表已存在，補上新欄位
alter table public.orders add column if not exists confirmation_email_status text not null default 'pending';
alter table public.orders add column if not exists confirmation_email_sent_at timestamptz;
alter table public.orders add column if not exists confirmation_email_error text;
alter table public.orders add column if not exists shipped_email_status text not null default 'pending';
alter table public.orders add column if not exists shipped_email_sent_at timestamptz;
alter table public.orders add column if not exists shipped_email_error text;

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);

-- Data API 授權（Supabase 不會自動授予 public schema）
grant select, insert, update, delete on public.orders to authenticated;
grant all on public.orders to service_role;
-- 允許前台顧客（匿名）建立訂單，但不可 SELECT / UPDATE / DELETE
grant insert on public.orders to anon;

-- RLS：登入使用者可全權存取；匿名者僅可 INSERT
alter table public.orders enable row level security;

drop policy if exists "Authenticated users can read orders" on public.orders;
create policy "Authenticated users can read orders"
  on public.orders for select
  to authenticated using (true);

drop policy if exists "Authenticated users can insert orders" on public.orders;
create policy "Authenticated users can insert orders"
  on public.orders for insert
  to authenticated with check (true);

drop policy if exists "Anonymous customers can create orders" on public.orders;
create policy "Anonymous customers can create orders"
  on public.orders for insert
  to anon with check (true);

drop policy if exists "Authenticated users can update orders" on public.orders;
create policy "Authenticated users can update orders"
  on public.orders for update
  to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete orders" on public.orders;
create policy "Authenticated users can delete orders"
  on public.orders for delete
  to authenticated using (true);

-- updated_at 自動更新
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();
