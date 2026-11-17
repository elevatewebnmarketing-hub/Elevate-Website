/**
 * Pages where analytics and ad pixels must not load: private client invoices and project pages (/i/<secret>, /p/<secret>,
 * the secret would be sent to Google, Meta and TikTok in the page URL) and the admin panel.
 * Used as a JavaScript test inside the inline tracking scripts.
 */
export const NO_TRACKING_TEST = '/^\\/(i|p|admin)(\\/|$)/.test(location.pathname)';
