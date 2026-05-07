export function trackMetaEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  const fbq = (window as Window & {
    fbq?: (...args: unknown[]) => void;
  }).fbq;

  if (typeof fbq !== 'function') return;

  if (params) {
    fbq('trackCustom', eventName, params);
    return;
  }

  fbq('trackCustom', eventName);
}
