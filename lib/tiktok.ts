type TikTokContent = {
  content_id: string;
  content_type?: string;
  content_name?: string;
  quantity?: number;
  price?: number;
};

type TikTokEventParams = Record<
  string,
  string | number | boolean | TikTokContent[] | undefined
>;

/**
 * Builds the standard TikTok content parameters required for shopping events.
 * Supplies `content_id` both at the top level and inside the `contents` array
 * so Video Shopping Ads (VSA) and the diagnostics that scan for `content_id`
 * are satisfied.
 */
export function tiktokContentParams(
  contentId: string,
  contentName: string
): TikTokEventParams {
  return {
    content_type: 'product',
    content_id: contentId,
    content_name: contentName,
    contents: [
      {
        content_id: contentId,
        content_type: 'product',
        content_name: contentName,
      },
    ],
  };
}

/** Turns a human label into a stable, URL-safe content id. */
export function tiktokSlug(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'content'
  );
}

type TikTokQueue = {
  track: (
    eventName: string,
    params?: TikTokEventParams,
    options?: { event_id?: string }
  ) => void;
};

function getTikTokQueue() {
  if (typeof window === 'undefined') return null;

  const ttq = (window as Window & { ttq?: TikTokQueue }).ttq;
  return typeof ttq?.track === 'function' ? ttq : null;
}

function getCookieValue(name: string) {
  if (typeof document === 'undefined') return undefined;

  const cookie = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${name}=`));

  if (!cookie) return undefined;
  return decodeURIComponent(cookie.split('=').slice(1).join('='));
}

export function createTikTokEventId(eventName: string) {
  const safeName = eventName.replace(/[^a-zA-Z0-9_-]/g, '-');

  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${safeName}-${crypto.randomUUID()}`;
  }

  return `${safeName}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getTikTokAttribution() {
  if (typeof window === 'undefined') return {};

  const url = new URL(window.location.href);

  return {
    tiktokEventSourceUrl: url.href,
    tiktokReferrer: document.referrer || undefined,
    tiktokTtp: getCookieValue('_ttp'),
    tiktokTtclid: url.searchParams.get('ttclid') || getCookieValue('ttclid'),
  };
}

export function trackTikTokEvent(
  eventName: string,
  params?: TikTokEventParams,
  eventId = createTikTokEventId(eventName)
) {
  getTikTokQueue()?.track(eventName, params, { event_id: eventId });
  return eventId;
}
