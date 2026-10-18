'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';
import { openCalendly } from '@/lib/calendly';
import { useLocationPricing } from '@/hooks/useLocationPricing';
import {
  formatPrice,
  type PackageKey,
  type PricingPackage,
} from '@/lib/pricing-config';

type PackageMeta = {
  key: PackageKey | 'custom';
  name: string;
  description: string;
  features: string[];
  highlighted: boolean;
  category: 'build' | 'retainer';
};

const PACKAGE_META: PackageMeta[] = [
  {
    key: 'starter',
    name: 'Starter Website',
    description:
      'For small businesses that need a clean, credible website with the essentials handled properly from day one.',
    features: [
      '4 conversion-focused pages',
      'Mobile-first design with contact form, click-to-call, and WhatsApp CTA',
      'Search-engine-optimized page structure and core on-page SEO setup',
      'Google Business Profile setup or cleanup',
      '1 year of domain registration included',
      'Indexation setup and mobile performance optimization',
      'One revision round before launch',
      'Typical delivery: 7 to 10 business days',
    ],
    highlighted: false,
    category: 'build',
  },
  {
    key: 'business',
    name: 'Business Website',
    description:
      'Our most popular package for service businesses that want a stronger online presence, faster trust, and a direct path to leads.',
    features: [
      'Up to 6 core website pages plus one dedicated lead-generation landing page',
      'Custom design matched to your brand and offer',
      '1 year of domain registration included',
      'Google Business Profile registration and setup',
      'A direct-response sales funnel built around your service offer',
      'Google Business Profile services matched one-to-one with your service pages',
      'GA4 setup, lead form tracking, testimonials, FAQ, and clear call-to-action sections',
      'Two revision rounds before launch',
      'Typical delivery: 2 to 4 weeks',
    ],
    highlighted: true,
    category: 'build',
  },
  {
    key: 'ecommerce',
    name: 'E-commerce Website',
    description:
      'For product-based businesses that need a polished storefront, better checkout flow, and a setup ready to support growth.',
    features: [
      'Custom storefront with product catalog, categories, and product pages',
      'Cart, checkout, payment gateway, and order notification setup',
      'Product-focused SEO foundations and mobile optimization',
      'Trust-building sections, upsell opportunities, and clear sales CTAs',
      'Basic analytics, lead capture, and store launch support',
      'Two revision rounds before launch',
      'Typical delivery: 3 to 5 weeks',
    ],
    highlighted: false,
    category: 'build',
  },
  {
    key: 'growth_suite',
    name: 'E-commerce Growth Suite',
    description:
      'A full launch package for ambitious businesses that want the store, the funnel, and the tracking done properly from day one.',
    features: [
      'Everything in the E-commerce Website package',
      'GA4 setup with ecommerce and lead event tracking',
      'Google Tag Manager and Search Console setup',
      'Funnel page alignment, reporting dashboard, and optimization recommendations',
      'Priority launch support',
    ],
    highlighted: false,
    category: 'build',
  },
  {
    key: 'google_growth',
    name: 'Website Care Plan',
    description: 'Monthly upkeep so your website stays online, secure and accurate after launch.',
    features: [
      'Hosting, domain renewal reminders and uptime monitoring',
      'Updates, security fixes and backups',
      'Small text, price and photo changes on WhatsApp',
      'Monthly form, WhatsApp button and tracking checks',
    ],
    highlighted: false,
    category: 'retainer',
  },
  {
    key: 'meta_growth',
    name: 'SEO Care Plan',
    description: 'Everything in the Website Care Plan, plus the ongoing work that keeps you visible on Google and AI search.',
    features: [
      'Google Business Profile posts, photos and review replies',
      'One new page or blog post a month',
      'Monthly report: map positions, searches, calls and website clicks',
      'Listing and citation checks',
    ],
    highlighted: false,
    category: 'retainer',
  },
  {
    key: 'custom',
    name: 'Custom & Enterprise',
    description:
      'For advanced builds, internal tools, directories, portals, or projects with more complex integrations.',
    features: [
      'Discovery and scope workshop',
      'Custom workflows and integrations',
      'Advanced performance and SEO planning',
      'Staging and structured rollout support',
    ],
    highlighted: false,
    category: 'build',
  },
];

const WEBSITE_TYPE_GROUPS: Array<{
  name: string;
  examples: string;
  packageKey: PackageKey;
  bestFor: string;
}> = [
  {
    name: 'Lead-Gen Starter Sites',
    examples: 'Solo businesses, consultants, trades, and local services launching fast',
    packageKey: 'starter',
    bestFor: 'Starter Website',
  },
  {
    name: 'Service Business Websites',
    examples: 'Roofers, real estate teams, agencies, clinics, coaches, and local brands',
    packageKey: 'business',
    bestFor: 'Business Website',
  },
  {
    name: 'Stores & Catalog Sites',
    examples: 'Product brands, online shops, and businesses selling direct online',
    packageKey: 'ecommerce',
    bestFor: 'E-commerce Website',
  },
  {
    name: 'Launch + Visibility',
    examples: 'Businesses that need a new website plus early tracking and local growth support',
    packageKey: 'growth_suite',
    bestFor: 'Growth Suite',
  },
];

interface PricingProps {
  isStandalone?: boolean;
}

function PriceSkeleton() {
  return (
    <span className="inline-block h-6 w-24 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />
  );
}

export default function Pricing({ isStandalone = false }: PricingProps) {
  const { packages, isLoading, locationCode, countryName } = useLocationPricing();
  // The standalone /pricing page needs this as its one H1.
  const Heading = isStandalone ? 'h1' : 'h2';
  const currencyName = { NG: 'Nigerian naira', GB: 'British pounds' }[locationCode as 'NG' | 'GB'] ?? 'US dollars';

  const wrapperClass = isStandalone
    ? 'py-24 bg-background dark:bg-slate-900'
    : 'py-24 bg-white dark:bg-slate-900';
  const Wrapper = isStandalone ? 'div' : SectionWrapper;
  const wrapperProps = isStandalone
    ? { className: wrapperClass }
    : { id: 'pricing', className: wrapperClass };

  const priceMap = new Map<PackageKey, PricingPackage>(
    packages.map((pkg) => [pkg.packageKey, pkg])
  );

  function renderPrice(key: PackageKey | 'custom'): React.ReactNode {
    if (key === 'custom') return 'Custom';
    if (isLoading) return <PriceSkeleton />;
    const pkg = priceMap.get(key);
    return pkg ? formatPrice(pkg) : 'Custom';
  }

  function renderFromPrice(key: PackageKey): React.ReactNode {
    if (isLoading) return <PriceSkeleton />;
    const pkg = priceMap.get(key);
    return pkg ? `From ${formatPrice(pkg)}` : 'Custom';
  }

  const buildPackages = PACKAGE_META.filter((pkg) => pkg.category === 'build');
  const retainers = PACKAGE_META.filter((pkg) => pkg.category === 'retainer');

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
            <Heading className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white mb-4">
              Pricing
            </Heading>
            <p className="text-text/80 dark:text-gray-300 text-lg max-w-2xl mx-auto sm:mx-0">
              Clear public pricing for{' '}
              <Link href="/services/website-design" className="text-accent hover:underline">SEO-ready websites</Link>,{' '}
              <Link href="/services/landing-pages" className="text-accent hover:underline">landing pages</Link> and{' '}
              <Link href="/services/website-maintenance" className="text-accent hover:underline">care plans</Link>.
              Final quotes only change when scope, content, or integrations change.
            </p>
            <p className="text-sm text-text/60 dark:text-gray-400 mt-3">
              Prices shown in {currencyName}
              {locationCode === 'US' ? ' for clients outside Nigeria and the UK' : ` for clients in ${countryName}`}.
            </p>
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
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {buildPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
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
                      className={`flex items-start gap-2 text-sm ${
                        pkg.highlighted ? 'text-white/90' : 'text-text dark:text-gray-200'
                      }`}
                    >
                      <Check className="flex-shrink-0 text-accent mt-0.5" size={18} />
                      <span>{feature}</span>
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
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h3 className="font-heading font-semibold text-2xl text-primary dark:text-white mb-2">
                Ongoing Support
              </h3>
              <p className="text-text/70 dark:text-gray-400 text-sm max-w-2xl">
                One-off builds create momentum. Retainers create monthly stability, cleaner
                lead tracking, and a website that keeps improving after launch.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {retainers.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-card-lg border border-gray-200 dark:border-white/10 bg-background dark:bg-slate-800 p-6 shadow-soft"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h4 className="font-heading font-semibold text-xl text-primary dark:text-white">
                      {pkg.name}
                    </h4>
                    <p className="text-text/80 dark:text-gray-300 text-sm mt-1">
                      {pkg.description}
                    </p>
                  </div>
                  <p className="font-heading font-bold text-xl text-primary dark:text-white whitespace-nowrap">
                    {renderPrice(pkg.key)}
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-text dark:text-gray-200"
                    >
                      <Check className="flex-shrink-0 text-accent mt-0.5" size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="md" onClick={openCalendly} className="w-full min-h-[44px]">
                  Discuss Retainers
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
            Every project is different, but these starting points reflect the kinds of
            websites we build most often for service businesses, local brands, and growing
            companies across Nigeria.
          </p>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
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
                  Best fit:{' '}
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
