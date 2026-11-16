import { localSeo } from '@/lib/service-pages/local-seo';
import { websiteDesign } from '@/lib/service-pages/website-design';
import { websiteRedesign } from '@/lib/service-pages/website-redesign';
import { landingPages } from '@/lib/service-pages/landing-pages';
import { websiteMaintenance } from '@/lib/service-pages/website-maintenance';
import { ecommerce } from '@/lib/service-pages/ecommerce';
import { googleAds } from '@/lib/service-pages/google-ads';
import { facebookInstagramAds } from '@/lib/service-pages/facebook-instagram-ads';
import { digitalMarketing } from '@/lib/service-pages/digital-marketing';

export type PageType = 'service' | 'industry';

export type DetailSection = 'problems' | 'included' | 'process' | 'pricing' | 'proof' | 'local' | 'whyUs' | 'faqs';

/** Full service page, built to the rank-ready-website service page spec. */
export interface ServiceDetail {
  /** Without the brand: the root layout's title template appends it. */
  metaTitle: string;
  /** Optional full title used exactly as written (no brand suffix), e.g. one sized by ChatSEO. */
  titleAbsolute?: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  problems: string[];
  included: { title: string; detail: string }[];
  process: { title: string; detail: string }[];
  pricing: {
    summary: string;
    points: string[];
    /** Optional two-column table (What | Price) shown instead of / after the points. */
    table?: { head: string[]; rows: string[][] };
    /** Optional image shown at the end of the pricing section (self-hosted, in /public). */
    figure?: { src: string; alt: string; width: number; height: number };
  };
  proof: { name: string; detail: string; url?: string }[];
  localContext: string[];
  /** Heading over localContext; defaults to the Abuja heading. */
  localHeading?: string;
  /** Short trust facts under the hero; defaults to the Nigeria set. */
  trust?: string[];
  whyUs: string[];
  faqs: { q: string; a: string }[];
  /** 3–5 bullet answers shown at the top ("The short answer"), for readers and AI summaries. */
  keyTakeaways?: string[];
  /** Anonymised Search Console charts (ids from lib/evidence.ts) shown under Recent work. */
  evidenceIds?: string[];
  /** Links to related location pages, shown near the end. */
  nearby?: { label: string; href: string }[];
  /** Optional comparison table shown after "What's included". */
  compare?: { heading: string; head: string[]; rows: string[][] };
  /** Date the copy was last reviewed (YYYY-MM-DD), shown in the byline. */
  updated?: string;
  /** Slugs of related service pages. */
  related: string[];
  /** Show the Google Maps embed of the Asaba office in the local section. */
  showMap?: boolean;
  /** Optional closing call-to-action heading and line (default: "Talk to us about {title}"). */
  cta?: { heading: string; text?: string };
  /** Optional heading overrides per section (defaults: the template's generic headings). */
  headings?: Partial<Record<DetailSection, string>>;
  /** Optional paragraphs shown under a section heading. Inline markdown links allowed. */
  intros?: Partial<Record<DetailSection, string[]>>;
  /** Optional paragraphs shown at the end of a section. Inline markdown links allowed. */
  outros?: Partial<Record<DetailSection, string[]>>;
}

export interface ServicePageConfig {
  slug: string;
  type: PageType;
  title: string;
  subtitle: string;
  description: string;
  challenges?: string[];
  solutions?: string[];
  portfolioId?: string;
  portfolioName?: string;
  portfolioUrl?: string;
  detail?: ServiceDetail;
}

export const servicePages: Record<string, ServicePageConfig> = {
  // Services (full pages, one file each)
  'local-seo': localSeo,
  'website-design': websiteDesign,
  'website-redesign': websiteRedesign,
  'landing-pages': landingPages,
  'website-maintenance': websiteMaintenance,
  ecommerce,
  'google-ads': googleAds,
  'facebook-instagram-ads': facebookInstagramAds,
  'digital-marketing': digitalMarketing,
};

export const serviceSlugs = Object.keys(servicePages);

export function getServiceBySlug(slug: string): ServicePageConfig | null {
  return servicePages[slug] ?? null;
}
