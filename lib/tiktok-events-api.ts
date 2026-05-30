import { createHash } from 'crypto';

const PIXEL_ID =
  process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || 'D8DLU1JC77UAEKHUI7L0';
const ACCESS_TOKEN = process.env.TIKTOK_EVENTS_API_ACCESS_TOKEN ?? '';
const TEST_EVENT_CODE = process.env.TIKTOK_TEST_EVENT_CODE;
const EVENTS_API_URL =
  'https://business-api.tiktok.com/open_api/v1.3/event/track/';

type TikTokServerEvent = {
  event: string;
  eventId: string;
  email: string;
  ip?: string;
  userAgent?: string;
  ttclid?: string;
  ttp?: string;
  pageUrl: string;
  referrer?: string;
};

function hash(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

function clean(value?: string, maxLength = 500) {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, maxLength) : undefined;
}

function cleanUrl(value?: string) {
  const trimmed = clean(value);
  if (!trimmed) return undefined;

  try {
    const url = new URL(trimmed);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export async function sendTikTokServerEvent(event: TikTokServerEvent) {
  if (!ACCESS_TOKEN) return;

  const pageUrl = cleanUrl(event.pageUrl);
  if (!pageUrl) return;

  const payload = {
    event_source: 'web',
    event_source_id: PIXEL_ID,
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
    data: [
      {
        event: clean(event.event, 100),
        event_time: Math.floor(Date.now() / 1000),
        event_id: clean(event.eventId, 200),
        user: {
          email: hash(event.email.trim().toLowerCase()),
          ip: clean(event.ip, 100),
          user_agent: clean(event.userAgent, 500),
          ttclid: clean(event.ttclid, 500),
          ttp: clean(event.ttp, 500),
        },
        page: {
          url: pageUrl,
          referrer: cleanUrl(event.referrer),
        },
      },
    ],
  };

  const response = await fetch(EVENTS_API_URL, {
    method: 'POST',
    headers: {
      'Access-Token': ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const result = await response.json().catch(() => null);

  if (
    !response.ok ||
    (result?.code !== undefined && Number(result.code) !== 0)
  ) {
    throw new Error(
      `TikTok Events API request failed: ${JSON.stringify(result)}`
    );
  }
}
