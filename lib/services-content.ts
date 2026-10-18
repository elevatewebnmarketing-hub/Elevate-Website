import { localSeo } from '@/lib/service-pages/local-seo';
import { websiteDesign } from '@/lib/service-pages/website-design';
import { websiteRedesign } from '@/lib/service-pages/website-redesign';
import { landingPages } from '@/lib/service-pages/landing-pages';
import { websiteMaintenance } from '@/lib/service-pages/website-maintenance';

export type PageType = 'service' | 'industry';

/** Full service page, built to the rank-ready-website service page spec. */
export interface ServiceDetail {
  /** Without the brand: the root layout's title template appends it. */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  problems: string[];
  included: { title: string; detail: string }[];
  process: { title: string; detail: string }[];
  pricing: { summary: string; points: string[] };
  proof: { name: string; detail: string; url?: string }[];
  localContext: string[];
  /** Heading over localContext; defaults to the Abuja heading. */
  localHeading?: string;
  /** Short trust facts under the hero; defaults to the Nigeria set. */
  trust?: string[];
  whyUs: string[];
  faqs: { q: string; a: string }[];
  /** Slugs of related service pages. */
  related: string[];
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
};

export const serviceSlugs = Object.keys(servicePages);

export function getServiceBySlug(slug: string): ServicePageConfig | null {
  return servicePages[slug] ?? null;
}
