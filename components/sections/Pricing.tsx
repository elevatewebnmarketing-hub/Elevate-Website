'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';
import { Check, ArrowRight } from 'lucide-react';
import { openCalendly } from '@/lib/calendly';

type PackageItem = {
  name: string;
  price: string;
  usdAmount?: number;
  isMonthly?: boolean;
  description: string;
  features: string[];
  highlighted: boolean;
};

const packages: PackageItem[] = [
  {
    name: 'Starter Website',
    price: 'From $149',
    usdAmount: 149,
    description:
      'Best for simple one-page sites, launch pages, or link-in-bio experiences that clearly explain who you are and what you offer.',
    features: [
      'Single-page layout',
      'Mobile‑responsive design',
      'Basic SEO setup (titles, meta, clean URLs)',
      'Contact or inquiry form',
      '1 round of revisions',
    ],
    highlighted: false,
  },
  {
    name: 'Business Website',
    price: 'From $349',
    usdAmount: 349,
    description:
      'Everything in Starter, plus room to grow—ideal for small businesses, portfolios, and content sites that need multiple pages.',
    features: [
      'Everything in Starter Website',
      'Up to 8 pages (Home, About, Services, Contact, etc.)',
      'Custom design matched to your brand',
      'SEO‑friendly site structure and internal linking',
      'Blog or portfolio section',
      '2 rounds of revisions',
      '2 weeks post‑launch support',
    ],
    highlighted: true,
  },
  {
    name: 'E‑commerce Website',
    price: 'From $699',
    usdAmount: 699,
    description:
      'Everything in Business, plus a full product catalog, cart, and checkout—built for brands that want to sell online.',
    features: [
      'Everything in Business Website',
      'Product catalog with categories and product detail pages',
      'Cart and checkout setup (Stripe/Paystack/Shopify‑style flow)',
      'Basic SEO for products and categories',
      'Key conversion‑focused sections (featured products, offers, trust)',
      '2 rounds of revisions',
      '2 weeks post‑launch support',
    ],
    highlighted: false,
  },
  {
    name: 'Complete Growth Suite',
    price: 'From $1,200',
    description:
      'Website build + launch + your first months of Google Growth in one package—built for businesses ready to invest in a full digital foundation.',
    features: [
      'Everything in Business or E‑commerce Website (depending on needs)',
      'Strategy session to plan structure, content, and offers',
      'Initial Google Analytics (GA4) and conversion tracking setup',
      'Google Business Profile optimization and launch',
      'First month of Google Growth Package management included',
      'Priority support during launch window',
    ],
    highlighted: false,
  },
  {
    name: 'Custom & Enterprise',
    price: 'Custom',
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
    name: 'Google Growth Package',
    price: 'From $200/mo',
    usdAmount: 200,
    isMonthly: true,
    description:
      'Monthly Google Ads, Business Profile, and analytics management for growth‑focused businesses.',
    features: [
      'Google Ads campaign setup & monthly optimization (1–3 core campaigns)',
      'Google Business Profile optimization and updates (hours, services, posts)',
      'Conversion tracking & Google Analytics (GA4) setup for key actions',
      'Monthly performance report + 30‑minute strategy call',
      'Keyword research for core services and locations',
    ],
    highlighted: false,
  },
];

type WebsiteTypeGroup = {
  name: string;
  examples: string;
  from: string;
  usdAmount: number;
  bestFor: string;
};

const websiteTypeGroups: WebsiteTypeGroup[] = [
  { name: 'Campaign & Micro-sites', examples: 'Landing pages, link-in-bio, simple personal or event pages', from: '$149', usdAmount: 149, bestFor: 'Starter Website' },
  { name: 'Business & Corporate', examples: 'Business/corporate, non-profit/charity, personal brand sites', from: '$349', usdAmount: 349, bestFor: 'Business Website' },
  { name: 'Portfolio & Creative', examples: 'Designers, photographers, agencies, creative studios', from: '$349', usdAmount: 349, bestFor: 'Business Website' },
  { name: 'Content & Education', examples: 'Blogs, news & media, educational or resource sites', from: '$349', usdAmount: 349, bestFor: 'Business Website' },
  { name: 'E‑commerce & Sales', examples: 'Online stores, e‑commerce landing pages, product funnels', from: '$699', usdAmount: 699, bestFor: 'E‑commerce Website' },
  { name: 'Community & Membership', examples: 'Membership sites, directories, forums/communities', from: '$899', usdAmount: 899, bestFor: 'Custom & Enterprise' },
];

interface PricingProps {
  isStandalone?: boolean;
}

function formatNgn(usd: number, rate: number, isMonthly?: boolean): string {
  const ngn = Math.round(usd * rate);
  const formatted = ngn.toLocaleString('en-NG', { maximumFractionDigits: 0 });
  return isMonthly ? `~₦${formatted}/mo` : `~₦${formatted}`;
}

export default function Pricing({ isStandalone = false }: PricingProps) {
  const [rate, setRate] = useState<number | null>(null);
  useEffect(() => {
    fetch('/api/exchange-rate')
      .then((r) => r.json())
      .then((d) => setRate(typeof d.rate === 'number' ? d.rate : null))
      .catch(() => setRate(null));
  }, []);

  const wrapperClass = isStandalone ? 'py-24 bg-background dark:bg-slate-900' : 'py-24 bg-white dark:bg-slate-900';
  const Wrapper = isStandalone ? 'div' : SectionWrapper;
  const wrapperProps = isStandalone ? { className: wrapperClass } : { id: 'pricing', className: wrapperClass };

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
            {isStandalone && rate && (
              <p className="text-text/60 dark:text-gray-400 text-sm mt-2 mx-auto sm:mx-0">
                NGN amounts based on prevailing exchange rate; USD is the reference currency.
              </p>
            )}
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

        <div className="overflow-hidden">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
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
                  {pkg.price}
                </p>
                {pkg.usdAmount != null && rate && (
                  <p
                    className={`text-sm mt-0.5 ${
                      pkg.highlighted ? 'text-white/80' : 'text-text/70 dark:text-gray-400'
                    }`}
                  >
                    {formatNgn(pkg.usdAmount, rate, pkg.isMonthly)}
                  </p>
                )}
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
                      className={`flex-shrink-0 ${
                        pkg.highlighted ? 'text-accent' : 'text-accent'
                      }`}
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
            {websiteTypeGroups.map((group) => (
              <div
                key={group.name}
                className="rounded-card-lg border border-gray-200 dark:border-white/10 bg-background dark:bg-slate-800 p-5 shadow-soft text-left"
              >
                <p className="text-xs font-semibold tracking-wide uppercase text-accent mb-1">
                  From {group.from}
                  {rate && (
                    <span className="font-normal text-text/70 dark:text-gray-400 ml-1">
                      ({formatNgn(group.usdAmount, rate)})
                    </span>
                  )}
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
