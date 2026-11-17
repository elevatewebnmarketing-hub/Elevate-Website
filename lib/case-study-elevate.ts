/**
 * Elevate's own website, measured. Source: Google Search Console "Performance on Search" export for
 * https://www.elevatewebandmarketing.com/ (web search, last 16 months), downloaded 17 November 2026.
 * Data runs from 18 March 2026 (first impression 21 March) to 15 November 2026.
 * Only change these numbers from a new export, and update SOURCE and the dates when you do.
 */
export const SOURCE = 'Google Search Console, web search, 18 March – 15 November 2026 (exported 17 November 2026)';

export const MONTHLY: { month: string; clicks: number; impressions: number; partial?: boolean }[] = [
  { month: 'Mar', clicks: 0, impressions: 120, partial: true },
  { month: 'Apr', clicks: 8, impressions: 299 },
  { month: 'May', clicks: 3, impressions: 137 },
  { month: 'Jun', clicks: 2, impressions: 426 },
  { month: 'Jul', clicks: 3, impressions: 408 },
  { month: 'Aug', clicks: 6, impressions: 288 },
  { month: 'Sep', clicks: 2, impressions: 292 },
  { month: 'Oct', clicks: 9, impressions: 517 },
  { month: 'Nov', clicks: 1, impressions: 417, partial: true },
];

export const TOTALS = { clicks: 34, impressions: 2904 };
/** Last 28 days in the export (19 Oct – 15 Nov 2026) vs the 28 days before (21 Sep – 18 Oct). */
export const LAST_28 = { clicks: 8, impressions: 843 };
export const PREV_28 = { clicks: 3, impressions: 164 };

export const TOP_PAGES = [
  { page: 'Homepage', clicks: 21, impressions: 265, position: 5.1 },
  { page: 'Blog: WhatsApp marketing for Nigerian small businesses', clicks: 5, impressions: 1295, position: 10.4 },
  { page: 'About', clicks: 4, impressions: 236, position: 7.9 },
  { page: 'Nigeria location page', clicks: 0, impressions: 494, position: 76.1 },
  { page: 'Blog: website maintenance checklist', clicks: 0, impressions: 285, position: 91.5 },
];

export const NOT_YET = [
  { query: 'seo company in nigeria', impressions: 143, position: 80.1 },
  { query: 'seo company nigeria', impressions: 103, position: 64.7 },
  { query: 'website maintenance checklist', impressions: 175, position: 94.7 },
];

export const COUNTRIES = { nigeriaClicks: 30, totalClicks: 34 };
