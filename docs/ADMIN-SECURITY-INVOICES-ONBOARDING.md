# Admin security, invoices and client onboarding (added 17 November 2026)

## What was added

| Feature | Where | Notes |
| --- | --- | --- |
| Invoice generator | `/admin/invoices` | Create, edit, mark sent/part paid/paid/void. Package buttons use the live prices from `lib/pricing-config.ts`. "Make this a 50% deposit invoice" halves every line. **PDF / print** opens a clean A4 invoice: press "Save as PDF". **Copy message** / **WhatsApp** prepare a message with the amount due and payment details. Numbers run ELV-YYYY-001, 002… per year. |
| Client onboarding form | `/onboarding` (public but unlisted, `noindex`, not in the sitemap) | Send the link after the deposit. 7 short steps based on `Claude-Motion-Graphics/business/operations/forms.md` §B (questions live in `lib/intake-questions.ts`; keep the two in step). Draft is kept on the client's device until sent. Answers are saved to Supabase **and** emailed to contact@ (so nothing is lost if the database is down). |
| Onboarding inbox | `/admin/intakes` | Read answers, mark reviewed/archived, **Create invoice** (pre-fills the client), **Copy all answers** (for a brief or an AI prompt). |
| Login hardening | `app/api/auth/login`, `proxy.ts`, `lib/admin-session.ts`, `lib/totp.ts`, `backend/login-guard.ts` | See below. |

Why our own form and not Google Forms/Tally: answers sit next to the invoice in one admin, no third-party account, works on slow phones, and the client never sees another brand. Google Forms is still fine as a backup (`SEO_Website_AI_Skills/client-intake/form-links.md`). If a no-code builder is ever needed, Tally (free) or self-hosted HeyForm/OpnForm are the alternatives.

## Payments (added 17 November 2026)

| Feature | Where |
| --- | --- |
| Saved payment methods: bank accounts, card payment links (Raenest, Payoneer, Paystack, Grey), crypto wallet (one stablecoin on one named network) | `/admin/payments` |
| Each invoice ticks which methods to show (filtered by currency) and can carry its own card link | Invoice editor, "Ways to pay on this invoice" |
| **Client link**: private page `/i/<secret>` with Pay-by-card buttons, transfer details with copy buttons, and Download PDF. Hidden while the invoice is a Draft; never indexed; no analytics or ad pixels load on it, and the link is not passed on to payment sites | Invoice editor, "Client link" (also added to the WhatsApp message) |
| Payment log: record each payment received (amount, method, date, reference/tx ID); amount paid and status update automatically | Invoice editor, "Payments received" |

Owner step: run `supabase/payments-2026-11.sql`, then `supabase/payments-notes-2026-11.sql` (one line: payer rules per method), once each in the Supabase SQL Editor (after `admin-upgrade-2026-11.sql`).

- **Rules for the person paying** (per method): paste the provider's conditions (e.g. Payoneer: business accounts only, beneficiary name must match). Shown on the invoice as "Before you pay" under that method.
- **Quick-picks on each invoice:** All / Bank transfer only / Card only / Crypto only / None. Only ticked methods appear to the client.
- **Client link, Copy message and WhatsApp** save the invoice first; on a Draft they offer to mark it Sent (clients can't open drafts). A wrong or unsent link shows a friendly page with a WhatsApp button; a database error shows "can't load right now" and is logged in Vercel. Research and the reasons behind this setup: `Claude-Motion-Graphics/business/operations/getting-paid.md`.

## Client acceptance and project terms (added 17 November 2026)

- Every invoice (online and PDF) says: paying it, or clicking "I accept", means accepting the work listed and the project terms at `/terms#project-terms`.
- The client page has an **"I accept"** box (tick + full name). It records the name, date and time, IP, device and a snapshot of what was accepted (invoice number, client, items, totals, terms version) in `invoice_acceptances`.
- If the invoice's client, items or totals change afterwards, the admin shows "Changed after … accepted it", and the client is asked to accept again. Notes and payment methods can change without needing a new acceptance.
- Project terms live in `lib/project-terms.ts`. When the wording changes, bump `TERMS_VERSION` and `TERMS_UPDATED_LABEL`.
- Owner step: run `supabase/acceptance-2026-11.sql` once in the Supabase SQL Editor.

## Client workflow (added 17 November 2026)

| Feature | Where | How it works |
| --- | --- | --- |
| **Lead inbox** | `/admin/leads` | Every contact and quote form is saved (and still emailed). Pipeline: New → Contacted → Call booked → Quoted → Won/Lost, with source page and UTM tags, private notes, WhatsApp/call/email buttons. **Create invoice** pre-fills the invoice and moves the lead to Quoted; **Start project** moves it to Won. If email fails the lead is still saved, and vice versa. |
| **Client project page** | `/admin/projects`, client link `/p/<secret>` | Stages: Onboarding → Content → Design and build → Your review → Launch → Live. "What we need from you" list (7 defaults, editable): the client ticks items and pastes links; you get an email for each. Start from a lead, an onboarding form or an invoice. |
| **Review rounds** | Client page at "Your review" | The client sends all changes in one list per round; rounds beyond the included number (default 2, from the project terms) are flagged "extra: quote first", for you and for them. |
| **Approve for launch** | Client page at "Your review"/"Launch" | Tick + full name; records name, time and IP. Changes are closed after approval. |
| **Launch checklist** | Project page | The 32 items from `launch-checklist.md`, ticked per project. |
| **Handover pack** | `/p/<secret>/handover` | `handover-template.md` filled in from the project; prints to PDF. Shown to the client at the Live stage with an honest review request. |
| **Review request** | Project page | Copy or WhatsApp an honest Google review request (no incentives: Google policy). |
| **Monthly invoices** | Invoice page → "Repeat monthly" | Copies the invoice every month, marks it Sent and emails the client their link. |
| **Reminders** | Automatic | Once each: 2 days before the due date, the day after, a week after. Only invoices with a client email and a balance. You get a summary email. |
| **Receipts** | Invoice page → Record payment | Emails a receipt with a link to `/i/<secret>/receipt/<payment>`. |
| **Daily run** | Vercel Cron, 07:00 UTC (`vercel.json`) → `/api/cron/billing`; also **Run now** on `/admin/invoices` | Needs `CRON_SECRET` in Vercel. |

Owner steps:
1. Run `supabase/client-workflow-2026-11.sql` in the Supabase SQL Editor.
2. Vercel → Settings → Environment Variables: add `CRON_SECRET` (any long random text, e.g. from `openssl rand -hex 32`), Production, then redeploy. Without it the daily run refuses to start; "Run now" in the admin still works.
3. Emails to clients come from `RESEND_FROM_EMAIL`, which must be on a domain verified in Resend (the contact form already uses it).

Client pages (`/p/`, `/i/`) are private links: not indexed, blocked in robots.txt, no analytics or ad pixels, no referrer sent to other sites.

## Login security

- **Brute-force lockout that holds across all Vercel servers:** every attempt is logged in `admin_login_attempts`. 5 wrong tries from one IP in 15 minutes locks that IP; 30 wrong tries from all IPs together locks admin login for everyone for 15 minutes (stops guessing from many addresses; if it ever locks you out, wait 15 minutes). Each wrong try also waits ~1 second.
- **Two-step login (authenticator app code)** when `ADMIN_TOTP_SECRET` is set. Until then the admin shows a yellow warning.
- **Sessions expire after 8 hours** and are checked (signature + expiry) on every admin page, not just "is there a cookie". Changing `SESSION_SECRET` signs every device out.
- **Email alert on every successful login** (IP and device) to `ADMIN_ALERT_EMAIL` (default contact@).
- Admin API writes from other websites are rejected (Origin check on top of the SameSite=Strict cookie). Admin pages send `X-Frame-Options: DENY`, `no-store` and `noindex`.
- The new tables have Row Level Security on with no policies: only the server (service role key) can read them. Client data never goes into the repo.

## Owner steps (once)

1. **Supabase → SQL Editor → New query:** paste `supabase/admin-upgrade-2026-11.sql` and run it. Until you do, Invoices/Onboarding show "tables are missing" and login falls back to a stricter per-server limit.
2. **On your laptop:** `node scripts/admin-security-setup.mjs`. It prints a new strong `ADMIN_PASSWORD`, `SESSION_SECRET` and `ADMIN_TOTP_SECRET`.
3. **Authenticator app** (Google Authenticator, Microsoft Authenticator, 1Password…): Add account → Enter a setup key → paste `ADMIN_TOTP_SECRET`, time-based.
4. **Vercel → Project → Settings → Environment Variables (Production):** set the three values (and optionally `ADMIN_ALERT_EMAIL`), then **Redeploy**.
5. Log in at `/admin/login` with the new password and the 6-digit code. Save the password in a password manager.

If you lose the phone with the authenticator: set a new `ADMIN_TOTP_SECRET` in Vercel (or remove it temporarily), redeploy, and add it to the new phone.
