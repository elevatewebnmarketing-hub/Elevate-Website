import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

type MetaEventRequestBody = {
  eventName?: string;
  eventId?: string;
  params?: Record<string, unknown>;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
};

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1014477000909776';
const ACCESS_TOKEN =
  process.env.META_CONVERSIONS_API_ACCESS_TOKEN ??
  process.env.META_ACCESS_TOKEN ??
  '';
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;
const GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || 'v23.0';

function getFirstForwardedIp(forwardedFor: string | null) {
  return forwardedFor?.split(',')[0]?.trim() || undefined;
}

function sanitizeParams(params?: Record<string, unknown>) {
  if (!params) return undefined;

  const filtered = Object.fromEntries(
    Object.entries(params).filter(([, value]) => ['string', 'number', 'boolean'].includes(typeof value))
  );

  return Object.keys(filtered).length ? filtered : undefined;
}

export async function POST(request: Request) {
  if (!ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'Meta Conversions API access token is not configured.' },
      { status: 500 }
    );
  }

  let body: MetaEventRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const eventName =
    typeof body.eventName === 'string' ? body.eventName.trim().slice(0, 100) : '';
  const eventId =
    typeof body.eventId === 'string' ? body.eventId.trim().slice(0, 200) : '';

  if (!eventName || !eventId) {
    return NextResponse.json(
      { error: 'eventName and eventId are required.' },
      { status: 400 }
    );
  }

  const headerStore = await headers();
  const clientIpAddress =
    getFirstForwardedIp(headerStore.get('x-forwarded-for')) ??
    headerStore.get('x-real-ip') ??
    undefined;
  const clientUserAgent = headerStore.get('user-agent') ?? undefined;
  const eventSourceUrl =
    typeof body.eventSourceUrl === 'string' ? body.eventSourceUrl.slice(0, 500) : undefined;

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        event_source_url: eventSourceUrl,
        user_data: {
          client_ip_address: clientIpAddress,
          client_user_agent: clientUserAgent,
          fbp: typeof body.fbp === 'string' ? body.fbp : undefined,
          fbc: typeof body.fbc === 'string' ? body.fbc : undefined,
        },
        custom_data: sanitizeParams(body.params),
      },
    ],
    access_token: ACCESS_TOKEN,
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${encodeURIComponent(PIXEL_ID)}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        cache: 'no-store',
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Meta Conversions API error:', result);
      return NextResponse.json(
        { error: 'Failed to send Meta server event.', details: result },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Meta Conversions API request failed:', error);
    return NextResponse.json(
      { error: 'Failed to send Meta server event.' },
      { status: 500 }
    );
  }
}
