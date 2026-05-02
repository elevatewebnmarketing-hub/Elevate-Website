import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { headers } from 'next/headers';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
const BUSINESS_EMAIL = 'contact@elevatewebandmarketing.com';
const CALENDLY_URL = 'https://calendly.com/elevatewebnmarketing/30min';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Rate limiter: max 5 submissions per IP per 10 minutes
const contactAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_SUBMISSIONS = 5;
const WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = contactAttempts.get(ip);
  if (!record || now > record.resetAt) {
    contactAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (record.count >= MAX_SUBMISSIONS) return false;
  record.count++;
  return true;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = {
  name?: string;
  email?: string;
  website?: string;
  service?: string;
  timeline?: string;
  budget?: string;
  message?: string;
  source?: string;
  projectType?: string;
  industry?: string;
};

function businessEmailHtml(data: Required<Pick<ContactBody, 'name' | 'email' | 'message'>> & ContactBody): string {
  const isQuote = data.source === 'quote';
  const e = escapeHtml;
  return `
    <h2>${isQuote ? 'Quote request' : 'New inquiry'} from ${e(data.name)}</h2>
    <p><strong>Email:</strong> ${e(data.email)}</p>
    ${data.website ? `<p><strong>Website:</strong> ${e(data.website)}</p>` : ''}
    ${data.projectType ? `<p><strong>Project type:</strong> ${e(data.projectType)}</p>` : ''}
    ${data.industry ? `<p><strong>Industry/Business:</strong> ${e(data.industry)}</p>` : ''}
    ${data.service ? `<p><strong>Service:</strong> ${e(data.service)}</p>` : ''}
    ${data.timeline ? `<p><strong>Timeline:</strong> ${e(data.timeline)}</p>` : ''}
    ${data.budget ? `<p><strong>Budget:</strong> ${e(data.budget)}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${e(data.message).replace(/\n/g, '<br>')}</p>
  `;
}

function userConfirmationEmailHtml(name: string): string {
  return `
    <div style="max-width:600px;margin:0 auto;font-family:sans-serif;color:#111111;background:#F7F9FC;padding:32px;">
      <div style="color:#0B1F3A;font-size:24px;font-weight:bold;margin-bottom:24px;">Elevate Web &amp; Marketing</div>
      <p style="font-size:16px;line-height:1.6;">Hi ${escapeHtml(name)},</p>
      <p style="font-size:16px;line-height:1.6;">Thank you for reaching out. We've received your inquiry and will get back to you within 48 hours.</p>
      <ul style="font-size:16px;line-height:1.8;">
        <li>We're here Monday – Friday, 9:00 AM – 6:00 PM WAT.</li>
        <li>Want to chat sooner? <a href="${CALENDLY_URL}" style="color:#4F9CF9;">Book a call</a>.</li>
      </ul>
      <p style="font-size:16px;line-height:1.6;">Best,<br><strong style="color:#0B1F3A;">The Elevate Team</strong></p>
      <p style="font-size:12px;color:#666;margin-top:32px;">Elevate Web &amp; Marketing – Nigeria-based. Websites that convert.</p>
    </div>
  `;
}

export async function POST(request: Request) {
  if (!resend) {
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
  }

  // Rate limit
  const headerStore = await headers();
  const ip = headerStore.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many submissions. Please wait before trying again.' }, { status: 429 });
  }

  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : '';
  const email = typeof body.email === 'string' ? body.email.trim().slice(0, 254) : '';
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 5000) : '';

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  const website = typeof body.website === 'string' ? body.website.trim().slice(0, 200) : undefined;
  const service = typeof body.service === 'string' ? body.service.slice(0, 100) : undefined;
  const timeline = typeof body.timeline === 'string' ? body.timeline.slice(0, 100) : undefined;
  const budget = typeof body.budget === 'string' ? body.budget.slice(0, 100) : undefined;
  const source = typeof body.source === 'string' ? body.source.slice(0, 50) : undefined;
  const projectType = typeof body.projectType === 'string' ? body.projectType.slice(0, 100) : undefined;
  const industry = typeof body.industry === 'string' ? body.industry.slice(0, 100) : undefined;

  try {
    const [toBusiness, toUser] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: BUSINESS_EMAIL,
        subject: source === 'quote' ? `Quote request from ${name}` : `New inquiry from ${name}`,
        html: businessEmailHtml({ name, email, website, service, timeline, budget, message, source, projectType, industry }),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'We received your inquiry – Elevate Web & Marketing',
        html: userConfirmationEmailHtml(name),
      }),
    ]);

    if (toBusiness.error || toUser.error) {
      console.error('Resend contact error:', toBusiness.error ?? toUser.error);
      return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 });
  }
}
