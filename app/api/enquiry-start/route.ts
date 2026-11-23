import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { readBoundedJson } from '@/lib/bounded-json';
import { ENQUIRY_STARTS } from '@/lib/enquiry-start';

const getWindow = () => Math.floor(Date.now() / (5 * 60_000));
let activeWindow = 0;
const sends = new Map<string, Promise<boolean>>();

function sameOrigin(request: Request) {
  const h = request.headers;
  const origin = h.get('origin');
  const host = h.get('x-forwarded-host') ?? h.get('host');
  if (!origin || !host || (h.has('sec-fetch-site') && h.get('sec-fetch-site') !== 'same-origin')) return false;
  try {
    const url = new URL(origin);
    const protocol = h.get('x-forwarded-proto');
    return url.host === host && (url.protocol === 'https:' || url.protocol === 'http:') &&
      (!protocol || url.protocol === `${protocol}:`);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 });
  }

  const parsed = await readBoundedJson(request, 256);
  if ('response' in parsed) return parsed.response;
  const { kind } = parsed.body;
  if (Object.keys(parsed.body).length !== 1 || typeof kind !== 'string' || !Object.hasOwn(ENQUIRY_STARTS, kind)) {
    return NextResponse.json({ error: 'Invalid enquiry event.' }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return new NextResponse(null, { status: 503 });
  const window = getWindow();
  if (window !== activeWindow) {
    sends.clear();
    activeWindow = window;
  }
  let send = sends.get(kind);
  if (!send) {
    const label = ENQUIRY_STARTS[kind as keyof typeof ENQUIRY_STARTS];
    send = new Resend(key).emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev',
      to: 'hello@elevatewebandmarketing.com',
      subject: `Website enquiry activity: ${label}`,
      text: `A visitor triggered: ${label}. This is an anonymous activity alert. The visitor may not have sent a message, booked a time or submitted the form. Repeat events of this type within the same five-minute window share one email.`,
    }, { idempotencyKey: `elevate-enquiry-start-v1-${kind}-${window}` }).then(({ error }) => !error).catch(() => false);
    sends.set(kind, send);
  }
  const sent = await send;
  if (!sent && sends.get(kind) === send) sends.delete(kind);
  return new NextResponse(null, { status: sent ? 204 : 503 });
}
