import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
const BUSINESS_EMAIL = 'contact@elevatewebandmarketing.com';
const CALENDLY_URL = 'https://calendly.com/elevatewebnmarketing/30min';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

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
  return `
    <h2>${isQuote ? 'Quote request' : 'New inquiry'} from ${data.name}</h2>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.website ? `<p><strong>Website:</strong> ${data.website}</p>` : ''}
    ${data.projectType ? `<p><strong>Project type:</strong> ${data.projectType}</p>` : ''}
    ${data.industry ? `<p><strong>Industry/Business:</strong> ${data.industry}</p>` : ''}
    ${data.service ? `<p><strong>Service:</strong> ${data.service}</p>` : ''}
    ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
    ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, '<br>')}</p>
  `;
}

function userConfirmationEmailHtml(name: string): string {
  return `
    <div style="max-width:600px;margin:0 auto;font-family:sans-serif;color:#111111;background:#F7F9FC;padding:32px;">
      <div style="color:#0B1F3A;font-size:24px;font-weight:bold;margin-bottom:24px;">Elevate Web &amp; Marketing</div>
      <p style="font-size:16px;line-height:1.6;">Hi ${name},</p>
      <p style="font-size:16px;line-height:1.6;">Thank you for reaching out. We've received your inquiry and will get back to you within 24 hours.</p>
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
    return NextResponse.json(
      { error: 'Email service is not configured.' },
      { status: 500 }
    );
  }

  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 }
    );
  }

  const website = typeof body.website === 'string' ? body.website.trim() : undefined;
  const service = typeof body.service === 'string' ? body.service : undefined;
  const timeline = typeof body.timeline === 'string' ? body.timeline : undefined;
  const budget = typeof body.budget === 'string' ? body.budget : undefined;

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
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
