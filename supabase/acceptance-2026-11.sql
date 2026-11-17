-- Client acceptance of invoices (17 Nov 2026): the "I accept" button on the client invoice page.
-- Run once in the Supabase SQL Editor. RLS on with no policies: only the website's server can read or write.
create table if not exists invoice_acceptances (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  accepted_name text not null,
  accepted_at timestamptz not null default now(),
  ip text,
  user_agent text,
  terms_version text not null,
  snapshot jsonb not null,      -- what the client saw: number, client, currency, items, totals
  snapshot_hash text not null   -- if the invoice changes later, the acceptance no longer matches
);
alter table invoice_acceptances enable row level security;
create index if not exists invoice_acceptances_invoice_idx on invoice_acceptances (invoice_id, accepted_at desc);
