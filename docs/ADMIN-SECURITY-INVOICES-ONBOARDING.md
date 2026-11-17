# Admin security, invoices and client onboarding (added 17 November 2026)

## What was added

| Feature | Where | Notes |
| --- | --- | --- |
| Invoice generator | `/admin/invoices` | Create, edit, mark sent/part paid/paid/void. Package buttons use the live prices from `lib/pricing-config.ts`. "Make this a 50% deposit invoice" halves every line. **PDF / print** opens a clean A4 invoice: press "Save as PDF". **Copy message** / **WhatsApp** prepare a message with the amount due and payment details. Numbers run ELV-YYYY-001, 002… per year. |
| Client onboarding form | `/onboarding` (public but unlisted, `noindex`, not in the sitemap) | Send the link after the deposit. 7 short steps based on `Claude-Motion-Graphics/business/operations/forms.md` §B (questions live in `lib/intake-questions.ts`; keep the two in step). Draft is kept on the client's device until sent. Answers are saved to Supabase **and** emailed to contact@ (so nothing is lost if the database is down). |
| Onboarding inbox | `/admin/intakes` | Read answers, mark reviewed/archived, **Create invoice** (pre-fills the client), **Copy all answers** (for a brief or an AI prompt). |
| Login hardening | `app/api/auth/login`, `proxy.ts`, `lib/admin-session.ts`, `lib/totp.ts`, `backend/login-guard.ts` | See below. |

Why our own form and not Google Forms/Tally: answers sit next to the invoice in one admin, no third-party account, works on slow phones, and the client never sees another brand. Google Forms is still fine as a backup (`SEO_Website_AI_Skills/client-intake/form-links.md`). If a no-code builder is ever needed, Tally (free) or self-hosted HeyForm/OpnForm are the alternatives.

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
