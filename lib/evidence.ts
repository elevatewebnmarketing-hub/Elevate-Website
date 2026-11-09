/**
 * Real Search Console numbers from client sites, anonymised (no domain, no query list).
 * Source files: MrDGN-Group repo, seo/data/gsc-2026-11-04/ (exported 4 November 2026, web search, last 12 months).
 * Only complete months are shown. Update this file from a new export; never edit the numbers by hand.
 */

export interface EvidenceMonth {
  month: string; // YYYY-MM
  impressions: number;
  clicks: number;
  /** Impression-weighted average position for the month. */
  position: number;
  /** Times the site appeared in Google's AI Overviews that month. */
  aiOverview: number;
}

export interface EvidenceSet {
  id: string;
  /** Anonymised description, shown instead of the domain. */
  label: string;
  /** What changed and when, in plain words. */
  workNote: string;
  source: string;
  months: EvidenceMonth[];
}

export const evidence: Record<string, EvidenceSet> = {
  'real-estate-abuja-asaba': {
    id: 'real-estate-abuja-asaba',
    label: 'A real estate agency selling homes in Abuja and land in Asaba',
    workNote:
      'We rebuilt the site so search engines can read every page, gave each area and listing its own page, and added buyer guides.',
    source: 'Google Search Console export, 4 November 2026. Web search only. Domain hidden.',
    months: [
      { month: '2026-05', impressions: 46, clicks: 0, position: 9.9, aiOverview: 3 },
      { month: '2026-06', impressions: 74, clicks: 0, position: 14.6, aiOverview: 7 },
      { month: '2026-07', impressions: 455, clicks: 12, position: 18.1, aiOverview: 55 },
      { month: '2026-08', impressions: 603, clicks: 8, position: 15.5, aiOverview: 114 },
      { month: '2026-09', impressions: 726, clicks: 7, position: 13.9, aiOverview: 97 },
      { month: '2026-10', impressions: 843, clicks: 13, position: 10.8, aiOverview: 87 },
    ],
  },
  'building-materials-asaba': {
    id: 'building-materials-asaba',
    label: 'A building materials supplier in Asaba',
    workNote:
      'Product pages for cement, blocks and sand in Asaba, a Google Business Profile that matches the site, and a site AI tools can read.',
    source: 'Google Search Console export, 4 November 2026. Web search only. Domain hidden.',
    months: [
      { month: '2026-05', impressions: 532, clicks: 17, position: 6.2, aiOverview: 18 },
      { month: '2026-06', impressions: 640, clicks: 11, position: 6.4, aiOverview: 46 },
      { month: '2026-07', impressions: 499, clicks: 9, position: 6.5, aiOverview: 68 },
      { month: '2026-08', impressions: 629, clicks: 13, position: 6.5, aiOverview: 75 },
      { month: '2026-09', impressions: 419, clicks: 9, position: 6.0, aiOverview: 46 },
      { month: '2026-10', impressions: 288, clicks: 6, position: 6.9, aiOverview: 26 },
    ],
  },
};
