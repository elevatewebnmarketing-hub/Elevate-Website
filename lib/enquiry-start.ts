export const ENQUIRY_STARTS = {
  whatsapp: 'WhatsApp opened',
  booking: 'Meeting booking opened',
  form: 'Enquiry form started',
} as const;

export function trackEnquiryStart(kind: keyof typeof ENQUIRY_STARTS) {
  if (typeof window === 'undefined' || /^\/(admin|i|p|onboarding|invoice-generator)(\/|$)/.test(window.location.pathname)) return;
  const key = `elevate-enquiry:${kind}`;
  try {
    if (Date.now() - Number(sessionStorage.getItem(key)) < 5 * 60_000) return;
    sessionStorage.setItem(key, String(Date.now()));
  } catch {
    // The server coalesces repeat notifications if session storage is unavailable.
  }
  void fetch('/api/enquiry-start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind }),
    keepalive: true,
  }).then(response => {
    if (!response.ok) sessionStorage.removeItem(key);
  }).catch(() => {
    try { sessionStorage.removeItem(key); } catch {}
  });
}
