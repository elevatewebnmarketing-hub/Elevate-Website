import { readBoundedJson } from '@/lib/bounded-json';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { headers } from 'next/headers';
import { randomUUID } from 'crypto';
import { sendTikTokServerEvent } from '@/lib/tiktok-events-api';
import { createLead } from '@/backend/workflow';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
const BUSINESS_EMAIL = 'contact@elevatewebandmarketing.com';
const CALENDLY_URL = 'https://calendly.com/elevatewebnmarketing/30min';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Rate limiter: max 5 submissions per IP per 10 minutes
const contactAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_SUBMISSIONS = 5;
const WINDOW_MS = 10 * 60 * 1000;
let pruneAfter = 0;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  if (now >= pruneAfter) {
    for (const [key, entry] of contactAttempts) {
      if (entry.resetAt <= now) contactAttempts.delete(key);
    }
    pruneAfter = now + WINDOW_MS;
  }
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
  phone?: string;
  service?: string;
  timeline?: string;
  budget?: string;
  message?: string;
  source?: string;
  projectType?: string;
  industry?: string;
  tiktokEventId?: string;
  tiktokEventSourceUrl?: string;
  tiktokReferrer?: string;
  tiktokTtp?: string;
  tiktokTtclid?: string;
};

function businessEmailHtml(data: Required<Pick<ContactBody, 'name' | 'email' | 'message'>> & ContactBody): string {
  const isQuote = data.source === 'quote';
  const e = escapeHtml;
  return `
    <h2>${isQuote ? 'Quote request' : 'New inquiry'} from ${e(data.name)}</h2>
    <p><strong>Email:</strong> ${e(data.email)}</p>
    ${data.phone ? `<p><strong>WhatsApp/phone:</strong> ${e(data.phone)}</p>` : ''}
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
  // Rate limit
  const headerStore = await headers();
  const ip = headerStore.get('x-real-ip')?.trim() || headerStore.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many submissions. Please wait before trying again.' }, { status: 429 });
  }

  const parsed = await readBoundedJson(request, 32 * 1024);
  if ('response' in parsed) return parsed.response;
  const body = parsed.body;

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
  const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 30) : undefined;
  const service = typeof body.service === 'string' ? body.service.slice(0, 100) : undefined;
  const timeline = typeof body.timeline === 'string' ? body.timeline.slice(0, 100) : undefined;
  const budget = typeof body.budget === 'string' ? body.budget.slice(0, 100) : undefined;
  const source = typeof body.source === 'string' ? body.source.slice(0, 50) : undefined;
  const projectType = typeof body.projectType === 'string' ? body.projectType.slice(0, 100) : undefined;
  const industry = typeof body.industry === 'string' ? body.industry.slice(0, 100) : undefined;
  const tiktokEventId =
    typeof body.tiktokEventId === 'string'
      ? body.tiktokEventId.trim().slice(0, 200)
      : `Lead-${randomUUID()}`;
  const tiktokEventSourceUrl =
    typeof body.tiktokEventSourceUrl === 'string'
      ? body.tiktokEventSourceUrl.slice(0, 500)
      : `https://www.elevatewebandmarketing.com/${source === 'quote' ? 'get-quote' : 'contact'}`;
  const tiktokReferrer =
    typeof body.tiktokReferrer === 'string' ? body.tiktokReferrer.slice(0, 500) : undefined;
  const tiktokTtp =
    typeof body.tiktokTtp === 'string' ? body.tiktokTtp.slice(0, 500) : undefined;
  const tiktokTtclid =
    typeof body.tiktokTtclid === 'string' ? body.tiktokTtclid.slice(0, 500) : undefined;

  // 1. Save the enquiry in the admin lead inbox, so it is never lost in an email folder.
  let savedLead = false;
  try {
    const referer = headerStore.get('referer') ?? '';
    let utm = { source: '', medium: '', campaign: '' };
    try {
      const u = new URL(referer);
      utm = {
        source: u.searchParams.get('utm_source')?.slice(0, 80) ?? '',
        medium: u.searchParams.get('utm_medium')?.slice(0, 80) ?? '',
        campaign: u.searchParams.get('utm_campaign')?.slice(0, 120) ?? '',
      };
    } catch {}
    await createLead({
      form: source === 'quote' ? 'quote' : 'contact',
      name,
      email,
      phone: phone ?? '',
      business: industry ?? '',
      website: website ?? '',
      service: service ?? '',
      projectType: projectType ?? '',
      industry: industry ?? '',
      timeline: timeline ?? '',
      budget: budget ?? '',
      message,
      page: referer.slice(0, 500),
      utmSource: utm.source,
      utmMedium: utm.medium,
      utmCampaign: utm.campaign,
    });
    savedLead = true;
  } catch (error) {
    console.error('Lead save error (enquiry still emailed):', error);
  }

  // 2. Email the owner and confirm to the visitor.
  let emailed = false;
  if (resend) {
    try {
      const [toBusiness, toUser] = await Promise.all([
        resend.emails.send({
          from: FROM_EMAIL,
          to: BUSINESS_EMAIL,
          subject: source === 'quote' ? `Quote request from ${name}` : `New inquiry from ${name}`,
          html: businessEmailHtml({ name, email, phone, website, service, timeline, budget, message, source, projectType, industry }),
        }),
        resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: 'We received your inquiry – Elevate Web & Marketing',
          html: userConfirmationEmailHtml(name),
        }),
      ]);
      emailed = !toBusiness.error;
      if (toBusiness.error || toUser.error) console.error('Resend contact error:', toBusiness.error ?? toUser.error);
    } catch (error) {
      console.error('Resend contact error:', error);
    }
  }

  if (!savedLead && !emailed) {
    return NextResponse.json({ error: 'Failed to send your message. Please try again, or WhatsApp us.' }, { status: 500 });
  }

  try {
    try {
      await sendTikTokServerEvent({
        event: 'Lead',
        eventId: tiktokEventId,
        email,
        ip,
        userAgent: headerStore.get('user-agent') ?? undefined,
        ttclid: tiktokTtclid,
        ttp: tiktokTtp,
        pageUrl: tiktokEventSourceUrl,
        referrer: tiktokReferrer,
      });
    } catch (error) {
      console.error('TikTok Events API error:', error);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 });
  }
}
