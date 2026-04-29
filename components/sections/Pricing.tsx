'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';
import { Check, ArrowRight, MapPin } from 'lucide-react';
import { openCalendly } from '@/lib/calendly';
import { useLocationPricing } from '@/hooks/useLocationPricing';
import {
  ALL_LOCATION_CODES,
  LOCATION_CURRENCY_MAP,
  formatPrice,
  type LocationCode,
  type PackageKey,
  type PricingPackage,
} from '@/lib/pricing-config';

type PackageMeta = {
  key: PackageKey | 'custom';
  name: string;
  description: string;
  features: string[];
  highlighted: boolean;
};

const PACKAGE_META: PackageMeta[] = [
  {
    key: 'starter',
    name: 'Starter Website',
    description:
      'Best for simple one-page sites, launch pages, or link-in-bio experiences that clearly explain who you are and what you offer. Includes on-page SEO basics, a contact form, and a fast turnaround.',
    features: [
      'Single-page layout (Home + key sections)',
      'Mobile-first responsive design',
      'On-page SEO basics (title/meta description, headings, and clean URL structure)',
      'Contact form integration (email notifications + user confirmation)',
      'Admin panel access to update content after launch (where included in your package)',
      '1 round of revisions before final launch',
      'Standard delivery: 1–2 weeks (based on content readiness)',
      'Rush option: 48 hours (+rush fee for Starter)',
    ],
    highlighted: false,
  },
  {
    key: 'business',
    name: 'Business Website',
    description:
      'Everything in Starter, plus room to grow—ideal for small businesses, portfolios, and content sites that need multiple pages with a clear structure.',
    features: [
      'Everything in Starter Website',
      'Up to 8 pages (Home, About, Services, Contact, etc.)',
      'Custom design matched to your brand',
      'SEO-friendly site structure (internal linking between pages)',
      'Blog or portfolio section',
      'Admin panel login to manage Blog, Portfolio, and Testimonials content',
      'Add/edit content from the dashboard (create posts, edit items, delete where needed)',
      'Image updates via admin panel (upload or paste image URLs)',
      '2 rounds of revisions before final launch',
      '2 weeks post-launch support',
      'Standard delivery: 3–6 weeks (depending on scope and revisions)',
      'Rush option: 1 week (+rush fee for Business)',
    ],
    highlighted: true,
  },
  {
    key: 'ecommerce',
    name: 'E‑commerce Website',
    description:
      'Everything in Business, plus a full product catalog, cart, and checkout—built for brands that want to sell online with conversion-focused pages.',
    features: [
      'Everything in Business Website',
      'Product catalog with categories and product detail pages',
      'Cart and checkout setup (payment flow integration, e.g., Stripe/Paystack-style)',
      'Basic SEO for products and categories',
      'Key conversion-focused sections (featured products, offers, trust)',
      'Admin panel access for managing your content sections (blog/portfolio/testimonials where enabled)',
      '2 rounds of revisions before final launch',
      '2 weeks post-launch support',
      'Standard delivery: 3–6 weeks (depending on scope and content readiness)',
      'Rush option: 1 week (+rush fee for E-commerce)',
    ],
    highlighted: false,
  },
  {
    key: 'growth_suite',
    name: 'Complete Growth Suite',
    description:
      'Website build + launch + your first month of Google Growth in one package—built for businesses ready to invest in a full digital foundation.',
    features: [
      'Everything in Business or E-commerce Website (depending on needs)',
      'Strategy session to plan site structure, content priorities, and conversion goals',
      'Initial Google Analytics (GA4) and conversion tracking setup',
      'Google Business Profile optimization and launch support',
      'First month of Google Growth Package management included',
      'Priority support during the launch window',
      'Admin panel access to keep content fresh after go-live',
      'Rush option: 1 week (+rush fee for Growth Suite)',
    ],
    highlighted: false,
  },
  {
    key: 'custom',
    name: 'Custom & Enterprise',
    description:
      'For larger or more complex platforms: memberships, multi‑brand sites, internal tools, or advanced integrations.',
    features: [
      'Discovery and scoping workshop',
      'Custom flows (membership, directory, dashboards, or portals)',
      'Performance and SEO tuning for complex architectures',
      'Integration with third‑party platforms and APIs',
      'Staging environment and structured rollout plan',
    ],
    highlighted: false,
  },
  {
    key: 'google_growth',
    name: 'Google Growth Package',
    description:
      'Monthly Google Ads + Social Media management and reporting. Half covers Ads/Social Media operations, half covers strategy, reporting and optimization.',
    features: [
      'Social Media + Google Ads management (setup, optimization, and ongoing execution)',
      'Strategy, reporting, and monthly optimization QA',
      'Google Business Profile optimization and updates (hours, services, posts)',
      'Conversion tracking and Google Analytics (GA4) setup for key actions',
      'Monthly performance report + 30-minute strategy call',
      'Keyword research for core services and locations',
    ],
    highlighted: false,
  },
  {
    key: 'meta_growth',
    name: 'Meta Growth Package',
    description:
      'Monthly Facebook Ads + Instagram Ads management with Meta Pixel tracking, creative testing, and conversion-focused landing page optimization.',
    features: [
      'Facebook + Instagram Ads management (setup, optimization, and ongoing execution)',
      'Strategy, reporting, and monthly optimization QA',
      'Meta Pixel + conversion event tracking validation',
      'Creative testing plan (hooks, formats, and angles) to reduce fatigue',
      'Landing page alignment to turn clicks into leads and sales',
      'Monthly performance report + 30-minute strategy call',
    ],
    highlighted: false,
  },
];

type WebsiteTypeGroup = {
  name: string;
  examples: string;
  packageKey: PackageKey;
  bestFor: string;
};

const WEBSITE_TYPE_GROUPS: WebsiteTypeGroup[] = [
  { name: 'Campaign & Micro-sites',  examples: 'Landing pages, link-in-bio, simple personal or event pages', packageKey: 'starter',      bestFor: 'Starter Website' },
  { name: 'Business & Corporate',    examples: 'Business/corporate, non-profit/charity, personal brand sites', packageKey: 'business',     bestFor: 'Business Website' },
  { name: 'Portfolio & Creative',    examples: 'Designers, photographers, agencies, creative studios',          packageKey: 'business',     bestFor: 'Business Website' },
  { name: 'Content & Education',     examples: 'Blogs, news & media, educational or resource sites',            packageKey: 'business',     bestFor: 'Business Website' },
  { name: 'E‑commerce & Sales',      examples: 'Online stores, e‑commerce landing pages, product funnels',      packageKey: 'ecommerce',    bestFor: 'E‑commerce Website' },
  { name: 'Community & Membership',  examples: 'Membership sites, directories, forums/communities',             packageKey: 'growth_suite', bestFor: 'Custom & Enterprise' },
];

interface PricingProps {
  isStandalone?: boolean;
}

function PriceSkeleton() {
  return (
    <span className="inline-block h-6 w-20 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
  );
}

export default function Pricing({ isStandalone = false }: PricingProps) {
  const { locationCode, countryName, packages, isLoading, setLocation } = useLocationPricing();

  const wrapperClass = isStandalone ? 'py-24 bg-background dark:bg-slate-900' : 'py-24 bg-white dark:bg-slate-900';
  const Wrapper = isStandalone ? 'div' : SectionWrapper;
  const wrapperProps = isStandalone ? { className: wrapperClass } : { id: 'pricing', className: wrapperClass };

  const priceMap = new Map<PackageKey, PricingPackage>(
    packages.map((p) => [p.packageKey, p])
  );

  function renderPrice(key: PackageKey | 'custom'): React.ReactNode {
    if (key === 'custom') return 'Custom';
    if (isLoading) return <PriceSkeleton />;
    const pkg = priceMap.get(key as PackageKey);
    return pkg ? formatPrice(pkg) : '—';
  }

  function renderFromPrice(key: PackageKey): React.ReactNode {
    if (isLoading) return <PriceSkeleton />;
    const pkg = priceMap.get(key);
    return pkg ? `From ${formatPrice(pkg)}` : '—';
  }

  return (
    <Wrapper {...wrapperProps}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
        >
          <div className="text-center sm:text-left">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white mb-4">
              Pricing
            </h2>
            <p className="text-text/80 dark:text-gray-300 text-lg max-w-2xl mx-auto sm:mx-0">
              Clear, flat pricing for websites—from a single page to full e‑commerce. We also offer ongoing Google Ads, Business Profile, and Analytics support.
            </p>
            {/* Location indicator */}
            <div className="flex items-center gap-2 mt-3 flex-wrap justify-center sm:justify-start">
              <div className="flex items-center gap-1.5 text-sm text-text/60 dark:text-gray-400">
                <MapPin size={14} className="text-accent flex-shrink-0" />
                <span>
                  Showing prices for{' '}
                  <strong className="text-primary dark:text-white">{countryName}</strong>
                </span>
              </div>
              {/* Location switcher — small dropdown */}
              <select
                value={locationCode}
                onChange={(e) => setLocation(e.target.value as LocationCode)}
                className="text-xs border border-gray-200 dark:border-white/10 rounded-md px-2 py-1 bg-background dark:bg-slate-800 text-text/70 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
                aria-label="Change pricing region"
              >
                {ALL_LOCATION_CODES.map((loc) => (
                  <option key={loc} value={loc}>
                    {LOCATION_CURRENCY_MAP[loc].country} ({LOCATION_CURRENCY_MAP[loc].code})
                  </option>
                ))}
              </select>
            </div>
          </div>
          {!isStandalone && (
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-accent font-heading font-semibold hover:underline justify-center sm:justify-end"
            >
              View full pricing
              <ArrowRight size={20} />
            </Link>
          )}
        </motion.div>

        <div className="overflow-visible">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {PACKAGE_META.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative rounded-card-lg p-8 border ${
                  pkg.highlighted
                    ? 'bg-primary text-white border-primary shadow-soft-xl xl:scale-105 z-10'
                    : 'bg-background dark:bg-slate-800 border-gray-200 dark:border-white/10 shadow-soft'
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <h3
                  className={`font-heading font-bold text-2xl mb-2 ${
                    pkg.highlighted ? 'text-white' : 'text-primary dark:text-white'
                  }`}
                >
                  {pkg.name}
                </h3>
                <div className="mb-4">
                  <p
                    className={`text-2xl font-bold ${
                      pkg.highlighted ? 'text-accent' : 'text-primary dark:text-white'
                    }`}
                  >
                    {renderPrice(pkg.key)}
                  </p>
                </div>
                <p
                  className={`text-sm mb-6 ${
                    pkg.highlighted ? 'text-white/80' : 'text-text/80 dark:text-gray-300'
                  }`}
                >
                  {pkg.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-2 text-sm ${
                        pkg.highlighted ? 'text-white/90' : 'text-text dark:text-gray-200'
                      }`}
                    >
                      <Check
                        className="flex-shrink-0 text-accent"
                        size={18}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={pkg.highlighted ? 'primary' : 'outline'}
                  size="md"
                  onClick={openCalendly}
                  className="w-full min-h-[44px]"
                >
                  Book a Call
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <h3 className="font-heading font-semibold text-2xl text-primary dark:text-white mb-4 text-center">
            Website Types & Starting Prices
          </h3>
          <p className="text-text/70 dark:text-gray-400 text-sm max-w-2xl mx-auto text-center mb-8">
            Every project is different, but these ranges show typical starting points for
            the kinds of websites we build most often.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WEBSITE_TYPE_GROUPS.map((group) => (
              <div
                key={group.name}
                className="rounded-card-lg border border-gray-200 dark:border-white/10 bg-background dark:bg-slate-800 p-5 shadow-soft text-left"
              >
                <p className="text-xs font-semibold tracking-wide uppercase text-accent mb-1">
                  {renderFromPrice(group.packageKey)}
                </p>
                <h4 className="font-heading font-semibold text-primary dark:text-white mb-1">
                  {group.name}
                </h4>
                <p className="text-text/80 dark:text-gray-300 text-sm mb-3">{group.examples}</p>
                <p className="text-text/60 dark:text-gray-400 text-xs">
                  Best fit:&nbsp;
                  <span className="font-medium text-primary dark:text-accent">{group.bestFor}</span>
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Wrapper>
  );
}
