export type EnquiryChannel = 'whatsapp' | 'phone' | 'booking' | 'form';

/** Events for the existing GTM container. Never include form answers, contact details or URL queries. */
export function trackSearchEnquiry(event: 'enquiry_click' | 'enquiry_form_start' | 'enquiry_form_success', channel: EnquiryChannel) {
  if (typeof window === 'undefined') return;
  const pagePath = window.location.pathname;
  if (/^\/(admin|i|p|onboarding|invoice-generator)(\/|$)/.test(pagePath)) return;
  const analyticsWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.dataLayer.push({ event, enquiry_channel: channel, page_path: pagePath });
}
