type TikTokEventParams = Record<string, string | number | boolean>;

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
