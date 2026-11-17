-- Payments upgrade (2026-11-17): saved payment methods, client invoice links, payment log.
-- Run once in Supabase: SQL Editor > New query > paste > Run. Needs admin-upgrade-2026-11.sql first.
-- RLS on with no policies: only the website's server can read or write.

create table if not exists payment_methods (
  id uuid primary key default gen_random_uuid(),
  label text not null,                         -- shown to clients, e.g. "Raenest USD account"
  kind text not null default 'bank',           -- bank | link | crypto
  provider text,                               -- Raenest, Payoneer, Paystack, Grey, Bank, Crypto
  currencies jsonb not null default '[]'::jsonb, -- ["USD","GBP"]; empty = any currency
  details text,                                -- account details or instructions
  link text,                                   -- default payment link (kind = link)
  network text,                                -- crypto: e.g. "USDT on TRON (TRC20)"
  address text,                                -- crypto wallet address
  active boolean not null default true,
  sort integer not null default 0,
  created_at timestamptz not null default now()
);
alter table payment_methods enable row level security;

alter table invoices add column if not exists payment_method_ids jsonb not null default '[]'::jsonb;
alter table invoices add column if not exists method_links jsonb not null default '{}'::jsonb;
alter table invoices add column if not exists public_token text unique;

create table if not exists invoice_payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  amount numeric not null,
  method text,
  reference text,
  paid_on date not null default current_date,
  note text,
  created_at timestamptz not null default now()
);
alter table invoice_payments enable row level security;
create index if not exists invoice_payments_invoice_idx on invoice_payments (invoice_id);
