import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { requireAdmin } from '@/lib/api-auth';
import { createIntake, listIntakes, StoreNotReadyError } from '@/backend/invoices';
import { INTAKE_FIELDS, MULTI_SEPARATOR, splitMulti, visibleFields, visibleSections } from '@/lib/intake-questions';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
const BUSINESS_EMAIL = 'contact@elevatewebandmarketing.com';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Light in-memory rate limit (per server instance): 5 submissions per IP per hour.
const hits = new Map<string, number[]>();
function allowed(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3600_000);
  if (recent.length >= 5) return false;
  hits.set(ip, [...recent, now]);
  return true;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function answersHtml(data: Record<string, string>) {
  return visibleSections(data).map((s) => {
    const rows = s.fields
      .filter((f) => data[f.id])
      .map((f) => `<p style="margin:0 0 10px"><strong>${esc(f.label)}</strong><br>${esc(data[f.id]).replace(/\n/g, '<br>')}</p>`)
      .join('');
    return rows ? `<h3 style="margin:18px 0 8px;font-family:sans-serif">${esc(s.title)}</h3>${rows}` : '';
  }).join('');
}

/** Public: a client submits the onboarding form. */
export async function POST(request: Request) {
  const h = await headers();
  const ip = h.get('x-real-ip')?.trim() || h.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (!allowed(ip)) {
    return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real people never see or fill this field.
  if (typeof body.company_url === 'string' && body.company_url.trim()) {
    return NextResponse.json({ ok: true });
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: 'Please confirm the permissions at the end of the form.' }, { status: 400 });
  }

  // Clean every known answer first, then keep only questions that were shown for this business
  // (answers left over from a different industry choice are dropped).
  const raw: Record<string, string> = {};
  for (const f of INTAKE_FIELDS) {
    const v = body[f.id];
    let s = typeof v === 'string' ? v.trim().slice(0, f.type === 'textarea' ? 5000 : 500) : '';
    if (f.type === 'choice' && s && !f.options?.includes(s)) s = '';
    if (f.type === 'multi' && s) s = splitMulti(s).filter((o) => f.options?.includes(o)).join(MULTI_SEPARATOR);
    if (s) raw[f.id] = s;
  }
  const data: Record<string, string> = {};
  for (const section of visibleSections(raw)) {
    for (const f of visibleFields(section, raw)) {
      if (f.required && !raw[f.id]) {
        return NextResponse.json({ error: `Please answer: ${f.label}` }, { status: 400 });
      }
      if (raw[f.id]) data[f.id] = raw[f.id];
    }
  }
  if (!EMAIL_REGEX.test(data.email ?? '')) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  data.consent = 'Confirmed: has the right to use the content and photos provided, and agrees to the privacy policy';

  let savedId: string | null = null;
  try {
    savedId = await createIntake({
      businessName: data.businessName,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone ?? '',
      data,
    });
  } catch (error) {
    console.error('Intake save error:', error);
  }

  // Email the answers too, so nothing is lost if the database is down.
  let emailed = false;
  if (RESEND_API_KEY) {
    try {
      const resend = new Resend(RESEND_API_KEY);
      const adminLink = savedId ? `<p><a href="https://www.elevatewebandmarketing.com/admin/intakes">Open in admin</a></p>` : '<p><strong>Not saved to the database</strong>, so this email is the only copy.</p>';
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: BUSINESS_EMAIL,
        replyTo: data.email,
        subject: `Onboarding form: ${data.businessName} (${data.industry === 'Other' ? data.industryOther : data.industry})`,
        html: `<div style="font-family:sans-serif;font-size:14px;line-height:1.5">${adminLink}${answersHtml(data)}</div>`,
      });
      emailed = !error;
      if (error) console.error('Intake email error:', error);
    } catch (error) {
      console.error('Intake email error:', error);
    }
  }

  if (!savedId && !emailed) {
    return NextResponse.json(
      { error: 'Sorry, we could not save your answers. Please try again, or send them to us on WhatsApp.' },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}

/** Admin: list submissions. */
export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    return NextResponse.json(await listIntakes());
  } catch (error) {
    console.error('List intakes error:', error);
    const status = error instanceof StoreNotReadyError ? 503 : 500;
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed' }, { status });
  }
}
