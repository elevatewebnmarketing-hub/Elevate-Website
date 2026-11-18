-- Lead capture for the free AI visibility check (2026-11-18).
-- Run once in the Supabase SQL Editor, after client-workflow-2026-11.sql.
--
-- 1. Every check someone runs is logged (the website they checked, the score, and which tests failed),
--    so a business that checked its own site is never invisible to us.
-- 2. "Send me the fix list" turns a check into a real lead (form = 'visibility-check').
-- 3. Leads can now arrive with WhatsApp only (many Nigerian leads never give an email).

create table if not exists visibility_checks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  url text not null,                      -- the page that was checked
  host text not null,                     -- e.g. example.com (for grouping repeat checks)
  score int not null,
  words int,
  checks jsonb not null default '[]',     -- [{ id, label, status, detail }]
  page text,                              -- our page the check was run from (with UTM tags)
  utm_source text,
  utm_medium text,
  utm_campaign text,
  status text not null default 'new',     -- new | followed_up | not_a_fit
  lead_id uuid references leads(id) on delete set null
);
alter table visibility_checks enable row level security;
create index if not exists visibility_checks_created_idx on visibility_checks (created_at desc);

alter table leads alter column email drop not null;
