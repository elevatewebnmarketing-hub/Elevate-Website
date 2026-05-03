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
      'For solo operators and small local businesses that need a clean, credible website fast.',
    features: [
      '1 to 3 conversion-focused pages',
      'Mobile-first design and build',
      'Contact form, call button, and clear CTA sections',
      'Basic on-page SEO and analytics setup',
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
      'Our most popular package for service businesses that need stronger trust, clearer messaging, and more leads.',
    features: [
      'Up to 6 core pages',
      'Custom design matched to your brand',
      'Service pages structured for SEO and conversions',
      'Testimonials, FAQ, and lead capture sections',
      'Basic analytics and conversion tracking',
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
      'For brands that need a polished storefront, clear product structure, and a smoother path to checkout.',
    features: [
      'Everything in Business Website',
      'Product catalog, categories, and product pages',
      'Cart and checkout setup',
      'Product-focused SEO foundations',
      'Core trust and upsell sections',
      'Two revision rounds before launch',
      'Typical delivery: 3 to 5 weeks',
    ],
    highlighted: false,
    category: 'build',
  },
  {
    key: 'growth_suite',
    name: 'Growth Suite',
    description:
      'A stronger launch package for businesses that want website build, analytics, and local visibility support together.',
    features: [
      'Business Website or E-commerce Website scope',
      'Strategy session and sitemap planning',
      'GA4 and conversion tracking setup',
      'Google Business Profile support',
      'First month of local visibility support included',
      'Priority launch support',
    ],
    highlighted: false,
    category: 'build',
  },
  {
    key: 'google_growth',
    name: 'Local Visibility Retainer',
    description:
      'Monthly support for businesses that want help keeping their website, Google Business Profile, and reporting aligned.',
    features: [
      'Google Business Profile updates and cleanup',
      'Monthly website edits and light support',
      'Lead tracking and monthly reporting',
      'Local SEO recommendations and action list',
      'Monthly strategy check-in',
    ],
    highlighted: false,
    category: 'retainer',
  },
  {
    key: 'meta_growth',
    name: 'Paid Growth Retainer',
    description:
      'Monthly campaign management for businesses ready to pair their website with paid traffic and cleaner tracking.',
    features: [
      'Google Ads or Meta Ads management',
      'Conversion tracking review and event checks',
      'Landing page alignment recommendations',
      'Monthly reporting and optimization',
      'Creative or offer feedback where needed',
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
  const { packages, isLoading } = useLocationPricing();

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
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white mb-4">
              Pricing
            </h2>
            <p className="text-text/80 dark:text-gray-300 text-lg max-w-2xl mx-auto sm:mx-0">
              Clear public pricing in USD for businesses that want a professional website
              without typical agency overhead. Final quotes only change when scope, content,
              or integrations change.
            </p>
            <p className="text-sm text-text/60 dark:text-gray-400 mt-3">
              All public prices are shown in USD. Other currencies can be invoiced on request.
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
            websites we build most often for service businesses and growing brands.
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
