import { Resend } from 'resend';

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
export const OWNER_EMAIL = 'contact@elevatewebandmarketing.com';

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Send an email if Resend is configured. Never throws; returns whether it was accepted. */
export async function sendEmail(to: string, subject: string, html: string, replyTo?: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !to) return false;
  try {
    const { error } = await new Resend(key).emails.send({ from: FROM_EMAIL, to, subject, html, replyTo });
    if (error) console.error('Email error:', error);
    return !error;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
}

export const notifyOwner = (subject: string, html: string) => sendEmail(OWNER_EMAIL, subject, html);

/** Simple branded email wrapper. */
export function emailHtml(body: string) {
  return `<div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;color:#111;background:#F7F9FC;padding:28px;line-height:1.55;font-size:15px">
  <div style="color:#0B1F3A;font-size:20px;font-weight:bold;margin-bottom:18px">Elevate Web &amp; Marketing</div>
  ${body}
  <p style="font-size:12px;color:#666;margin-top:28px">Elevate Web &amp; Marketing · hello@elevatewebandmarketing.com</p>
</div>`;
}

export function clientIp(h: Headers) {
  return h.get('x-real-ip')?.trim() || h.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
}

/** Same-origin check for public token endpoints. */
export function crossSite(h: Headers) {
  const origin = h.get('origin');
  if (!origin) return false;
  const host = h.get('x-forwarded-host') ?? h.get('host');
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

const buckets = new Map<string, number[]>();
/** In-memory per-key limit (per server instance). */
export function rateOk(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) return false;
  buckets.set(key, [...recent, now]);
  return true;
}
