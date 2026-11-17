-- Client workflow (17 Nov 2026): lead inbox, client project pages, review rounds, launch approval,
-- launch checklist, monthly invoices, reminders and receipts.
-- Run once in the Supabase SQL Editor (after the earlier 2026-11 files).
-- RLS on with no policies: only the website's server can read or write.

-- 1. Every enquiry from the contact and quote forms
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'new',      -- new | contacted | call_booked | quoted | won | lost
  form text,                               -- contact | quote
  name text not null,
  email text not null,
  phone text,
  business text,
  website text,
  service text,
  project_type text,
  industry text,
  timeline text,
  budget text,
  message text,
  page text,                               -- page the form was sent from
  utm_source text,
  utm_medium text,
  utm_campaign text,
  notes text,                              -- your private notes
  invoice_id uuid references invoices(id) on delete set null
);
alter table leads enable row level security;
create index if not exists leads_created_idx on leads (created_at desc);

-- 2, 3, 6. One page per client project
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  public_token text not null unique,
  title text not null,
  stage text not null default 'onboarding', -- onboarding | content | design | review | launch | live
  client_name text not null,
  client_business text,
  client_email text,
  client_phone text,
  staging_url text,
  live_url text,
  rounds_included integer not null default 2,
  launch_approved_at timestamptz,
  launch_approved_name text,
  launch_approved_ip text,
  launch_checklist jsonb not null default '{}'::jsonb, -- { itemId: true }
  handover jsonb not null default '{}'::jsonb,         -- handover pack details
  notes text,
  lead_id uuid references leads(id) on delete set null,
  intake_id uuid references client_intakes(id) on delete set null,
  invoice_id uuid references invoices(id) on delete set null
);
alter table projects enable row level security;

-- What we need from the client (they tick items and paste links on their page)
create table if not exists project_items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  label text not null,
  hint text,
  sort integer not null default 0,
  done boolean not null default false,
  done_at timestamptz,
  client_note text,
  created_at timestamptz not null default now()
);
alter table project_items enable row level security;
create index if not exists project_items_project_idx on project_items (project_id, sort);

-- One feedback submission per review round
create table if not exists project_feedback (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  round integer not null,
  items jsonb not null default '[]'::jsonb,   -- [{ "page": "Home", "change": "..." }]
  submitted_name text not null,
  submitted_at timestamptz not null default now(),
  status text not null default 'received'     -- received | done
);
alter table project_feedback enable row level security;
create index if not exists project_feedback_project_idx on project_feedback (project_id, round);

-- 4. Monthly invoices: copy a template invoice every month
create table if not exists invoice_schedules (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  template_invoice_id uuid not null references invoices(id) on delete cascade,
  label text not null,
  active boolean not null default true,
  next_run date not null,
  due_days integer not null default 7,
  send_email boolean not null default true,
  last_invoice_id uuid references invoices(id) on delete set null,
  last_run_at timestamptz
);
alter table invoice_schedules enable row level security;

-- 4. Reminder and receipt emails already sent (stops duplicates)
create table if not exists invoice_emails (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  kind text not null,                        -- new | due_soon | overdue_1 | overdue_7 | receipt:<payment id>
  sent_at timestamptz not null default now(),
  unique (invoice_id, kind)
);
alter table invoice_emails enable row level security;
