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
  // Industries
  construction: {
    slug: 'construction',
    type: 'industry',
    title: 'Web Design for Construction',
    subtitle: 'Sites that build trust and win projects',
    description:
      'Construction companies and building materials suppliers need websites that showcase projects, list services, and make it easy for clients to request quotes. We build sites that reflect your expertise and convert visitors into customers.',
    challenges: [
      'Clients can\'t easily see your portfolio or request quotes',
      'Your site doesn\'t reflect the scale and quality of your work',
      'Product catalogs or service pages are hard to navigate',
    ],
    solutions: [
      'Project galleries and case studies that highlight your work',
      'Service pages for commercial, residential, infrastructure, and more',
      'Product catalogs with WhatsApp or form-based ordering',
      'Trust elements: stats, testimonials, and clear contact paths',
    ],
    portfolioId: '2',
    portfolioName: 'MR DGN Construction',
    portfolioUrl: 'https://construction.mrdgngroup.com',
  },
  'real-estate': {
    slug: 'real-estate',
    type: 'industry',
    title: 'Web Design for Real Estate',
    subtitle: 'Showcase properties and book consultations',
    description:
      'Real estate agencies and developers need a strong online presence—property listings, consultation booking, and premium design that matches the high-end market. We build sites that attract serious buyers and support lead generation.',
    challenges: [
      'Property listings are hard to browse or outdated',
      'High-net-worth clients expect a premium experience',
      'No clear path to schedule viewings or consultations',
    ],
    solutions: [
      'Featured properties and property browse with filters',
      'Consultation and viewing booking flows',
      'Trust metrics (transactions, properties sold, testimonials)',
      'Premium design aligned with luxury positioning',
    ],
    portfolioId: '3',
    portfolioName: 'MansaLuxeRealty Limited',
    portfolioUrl: 'https://mansaluxerealty.mrdgngroup.com',
  },
  education: {
    slug: 'education',
    type: 'industry',
    title: 'Web Design for Education',
    subtitle: 'Sites that inform and convert applicants',
    description:
      'Schools, programs, and education brands need websites that clearly explain offerings, eligibility, and how to apply. We build accessible, information-rich sites that become the go-to place for students and partners.',
    challenges: [
      'Applicants can\'t find eligibility criteria or application steps',
      'Your vision and mission aren\'t clearly communicated',
      'Contact and inquiry paths are unclear',
    ],
    solutions: [
      'Clear structure: vision, mission, eligibility, and application flow',
      'Accessible design and content for all audiences',
      'WhatsApp and email contact for questions',
      'Content that supports conversion from visitors to applicants',
    ],
    portfolioId: '5',
    portfolioName: 'TMM Scholars',
    portfolioUrl: 'https://TMMscholars.com',
  },
  ecommerce: {
    slug: 'ecommerce',
    type: 'industry',
    title: 'Web Design for E‑commerce & Retail',
    subtitle: 'Online stores that convert',
    description:
      'Retail brands need e-commerce sites that showcase products, support discovery, and make buying easy. We build stores with clear navigation, product categories, and checkout flows that turn browsers into buyers.',
    challenges: [
      'Products are hard to discover or the experience feels cheap',
      'Checkout and payment flows are confusing',
      'Brand story and product story don\'t come through',
    ],
    solutions: [
      'Product catalogs with categories and collections',
      'Elegant design that reflects your brand',
      'Cart and checkout (Stripe, Paystack, or Shopify-style)',
      'Newsletter signup and subscription for new arrivals',
    ],
    portfolioId: '4',
    portfolioName: 'Experience BSG',
    portfolioUrl: 'https://experienceBSG.com',
  },
};

export const serviceSlugs = Object.keys(servicePages);

export function getServiceBySlug(slug: string): ServicePageConfig | null {
  return servicePages[slug] ?? null;
}
