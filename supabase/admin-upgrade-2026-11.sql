-- Admin upgrade (2026-11-17): login lockout log, client onboarding answers, invoices.
-- Run once in Supabase: Dashboard > SQL Editor > New query > paste > Run.
-- Row Level Security is on with no policies, so only the server (service role key) can read or write.

create extension if not exists pgcrypto;

create table if not exists client_intakes (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'new',            -- new | reviewed | archived
  business_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  data jsonb not null default '{}'::jsonb,       -- every answer, keyed by question id
  created_at timestamptz not null default now()
);
alter table client_intakes enable row level security;
create index if not exists client_intakes_created_idx on client_intakes (created_at desc);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  number text not null unique,                   -- e.g. ELV-2026-001
  status text not null default 'draft',          -- draft | sent | part_paid | paid | void
  client_name text not null,
  client_business text,
  client_email text,
  client_phone text,
  client_address text,
  currency text not null default 'NGN',
  items jsonb not null default '[]'::jsonb,      -- [{ "description": "...", "quantity": 1, "unitPrice": 450000 }]
  discount numeric not null default 0,           -- fixed amount off
  tax_rate numeric not null default 0,           -- percent, e.g. 7.5
  amount_paid numeric not null default 0,
  issue_date date not null default current_date,
  due_date date,
  notes text,
  payment_instructions text,
  intake_id uuid references client_intakes(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table invoices enable row level security;
create index if not exists invoices_created_idx on invoices (created_at desc);

-- Every admin login attempt. Used to lock out password guessing across all server instances.
create table if not exists admin_login_attempts (
  id bigserial primary key,
  ip text not null,
  success boolean not null,
  user_agent text,
  created_at timestamptz not null default now()
);
alter table admin_login_attempts enable row level security;
create index if not exists admin_login_attempts_recent_idx on admin_login_attempts (created_at desc);
create index if not exists admin_login_attempts_ip_idx on admin_login_attempts (ip, created_at desc);
