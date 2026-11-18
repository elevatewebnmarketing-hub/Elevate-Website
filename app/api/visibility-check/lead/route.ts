import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { createLead } from '@/backend/workflow';
import { getCheck, hostOf, updateCheck, utmFrom } from '@/backend/visibility-leads';
import { clientIp, crossSite, emailHtml, esc, notifyOwner, rateOk, sendEmail } from '@/backend/notify';
import type { Check, CheckStatus } from '@/lib/visibility-check';

/**
 * "Send me the fix list" after the free AI visibility check.
 * Order matters (business/tech-stack.md rule 3): email the owner first, then save, so a paused database never loses a lead.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CALL_URL = 'https://www.elevatewebandmarketing.com/contact';
const STATUSES: CheckStatus[] = ['pass', 'warn', 'fail'];

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Only used if the database copy of the check is unavailable. */
function checksFromBody(v: unknown): Check[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, 20).map((c) => ({
    id: str(c?.id, 40),
    label: str(c?.label, 120),
    status: STATUSES.includes(c?.status) ? c.status : 'warn',
    detail: str(c?.detail, 400),
  }));
}

function fixListHtml(checks: Check[]) {
  const todo = checks.filter((c) => c.status !== 'pass');
  if (!todo.length) return '<p>Every test passed on the page you checked.</p>';
  return `<ol>${todo
    .sort((a, b) => (a.status === 'fail' ? -1 : 0) - (b.status === 'fail' ? -1 : 0))
    .map((c) => `<li style="margin-bottom:10px"><b>${esc(c.label)}</b>${c.status === 'fail' ? ' (problem)' : ' (needs attention)'}<br>${esc(c.detail)}</li>`)
    .join('')}</ol>`;
}

export async function POST(request: Request) {
  const h = await headers();
  if (crossSite(h)) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 });
  if (!rateOk(`vc-lead:${clientIp(h)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again in a few minutes, or WhatsApp us.' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 400 });
  }
  if (str(body.company, 100)) return NextResponse.json({ success: true }); // honeypot: bots fill hidden fields

  const name = str(body.name, 100);
  const email = str(body.email, 200).toLowerCase();
  const phone = str(body.phone, 40);
  const business = str(body.business, 150);
  const checkId = UUID_RE.test(str(body.checkId, 40)) ? str(body.checkId, 40) : '';
  if (!name) return NextResponse.json({ error: 'Please add your name.' }, { status: 400 });
  if (!email && !phone) return NextResponse.json({ error: 'Add a WhatsApp number or an email so we can send the fix list.' }, { status: 400 });
  if (email && !EMAIL_RE.test(email)) return NextResponse.json({ error: 'That email address doesn’t look right.' }, { status: 400 });
  if (phone && phone.replace(/[^\d]/g, '').length < 7) return NextResponse.json({ error: 'That phone number looks too short.' }, { status: 400 });

  // Prefer the stored copy of the check; fall back to what the browser sent.
  let stored = null;
  if (checkId) {
    try {
      stored = await getCheck(checkId);
    } catch (error) {
      console.error('Get visibility check error:', error);
    }
  }
  const url = stored?.url ?? str(body.url, 2048);
  const score = stored?.score ?? Math.max(0, Math.min(100, Number(body.score) || 0));
  const checks = stored?.checks ?? checksFromBody(body.checks);
  const referer = h.get('referer') ?? '';
  const utm = utmFrom(stored?.page || referer);
  const problems = checks.filter((c) => c.status !== 'pass').map((c) => c.label);
  const wa = phone ? `https://wa.me/${phone.replace(/[^\d]/g, '')}` : '';

  // 1. Owner first.
  const ownerEmailed = await notifyOwner(
    `Hot lead: ${name} wants the fix list for ${hostOf(url) || 'their site'} (${score}/100)`,
    emailHtml(`<p><b>${esc(name)}</b>${business ? ` (${esc(business)})` : ''} ran the free check and asked for the fix list. Reply within the hour if you can.</p>
<p>Website: <a href="${esc(url)}">${esc(url)}</a><br>Score: <b>${score}/100</b><br>
WhatsApp / phone: ${phone ? `<a href="${esc(wa)}">${esc(phone)}</a>` : 'not given'}<br>
Email: ${email ? esc(email) : 'not given'}<br>
Campaign: ${esc([utm.source, utm.campaign].filter(Boolean).join(' / ') || 'none')}</p>
${problems.length ? `<p>What failed:</p><ul>${problems.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
<p>Next step (business/operations/lead-follow-up.md): send the fix list on WhatsApp, offer the free full check and a 15-minute call.</p>`)
  );

  // 2. Save the lead and link it to the check.
  let saved = false;
  try {
    const leadId = await createLead({
      form: 'visibility-check',
      name,
      email,
      phone,
      business,
      website: url,
      service: 'Free AI visibility check',
      projectType: '',
      industry: business,
      timeline: '',
      budget: '',
      message: `Ran the free AI visibility check: ${score}/100.${problems.length ? `\nTo fix: ${problems.join('; ')}.` : ''}`,
      page: (stored?.page || referer).slice(0, 500),
      utmSource: utm.source,
      utmMedium: utm.medium,
      utmCampaign: utm.campaign,
    });
    saved = true;
    if (checkId) await updateCheck(checkId, { leadId }).catch((e) => console.error('Link check error:', e));
  } catch (error) {
    console.error('Visibility lead save error (owner still emailed):', error);
  }

  if (!ownerEmailed && !saved) {
    return NextResponse.json({ error: 'We couldn’t send that. Please WhatsApp us instead.' }, { status: 500 });
  }

  // 3. The visitor gets the fix list by email if they gave one; WhatsApp-only leads get it from Ufuoma.
  let emailedVisitor = false;
  if (email) {
    emailedVisitor = await sendEmail(
      email,
      `Your website fix list: ${hostOf(url)} scored ${score}/100`,
      emailHtml(`<p>Hi ${esc(name.split(' ')[0])},</p>
<p>Here is what we found on <a href="${esc(url)}">${esc(url)}</a>, in the order we would fix it:</p>
${fixListHtml(checks)}
<p>This test looks at one page, the way Google and AI tools like ChatGPT read it. The free full check also covers your Google Business Profile, what ChatGPT says about your business, and every page that matters. You get a fixed quote to fix it, with no obligation.</p>
<p><a href="${CALL_URL}" style="display:inline-block;background:#4F9CF9;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:bold">Book a free 15-minute call</a></p>
<p>Or just reply to this email with any questions.</p>
<p>Ufuoma Onakpoyan<br>Elevate Web &amp; Marketing</p>`),
      'hello@elevatewebandmarketing.com'
    );
  }

  return NextResponse.json({ success: true, emailed: emailedVisitor, whatsappOnly: !email });
}
