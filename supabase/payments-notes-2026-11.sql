-- Payer rules per payment method (e.g. Payoneer: "payments from a personal bank account will be declined").
-- Shown to the client under that method on the invoice. Run once in the Supabase SQL Editor.
alter table payment_methods add column if not exists payer_notes text;
