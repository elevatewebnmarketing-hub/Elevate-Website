type MetaEventParams = Record<string, string | number | boolean>;

type FbqFn = (
  action: 'trackCustom',
  eventName: string,
  params?: MetaEventParams,
  options?: { eventID?: string }
) => void;

function getFbq() {
  if (typeof window === 'undefined') return null;

  const fbq = (window as Window & { fbq?: FbqFn }).fbq;
  return typeof fbq === 'function' ? fbq : null;
}

function createEventId(eventName: string) {
  const safeName = eventName.replace(/[^a-zA-Z0-9_-]/g, '-');
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${safeName}-${crypto.randomUUID()}`;
  }

  return `${safeName}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function sanitizeParams(params?: Record<string, unknown>) {
  if (!params) return undefined;

  const entries = Object.entries(params).filter(([, value]) => {
    return ['string', 'number', 'boolean'].includes(typeof value);
  }) as Array<[string, string | number | boolean]>;

  return entries.length ? Object.fromEntries(entries) : undefined;
}

function getCookieValue(name: string) {
  if (typeof document === 'undefined') return undefined;

  const cookie = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${name}=`));

  if (!cookie) return undefined;
  return decodeURIComponent(cookie.split('=').slice(1).join('='));
}

function sendServerMetaEvent(
  eventName: string,
  eventId: string,
  params?: MetaEventParams
) {
  if (typeof window === 'undefined') return;

  const payload = {
    eventName,
    eventId,
    params,
    eventSourceUrl: window.location.href,
    fbp: getCookieValue('_fbp'),
    fbc: getCookieValue('_fbc'),
  };

  fetch('/api/meta/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Ignore fire-and-forget analytics errors on the client.
  });
}

export function trackMetaEvent(eventName: string, rawParams?: Record<string, unknown>) {
  const params = sanitizeParams(rawParams);
  const eventId = createEventId(eventName);
  const fbq = getFbq();

  if (fbq) {
    fbq('trackCustom', eventName, params, { eventID: eventId });
  }

  sendServerMetaEvent(eventName, eventId, params);
  return eventId;
}
