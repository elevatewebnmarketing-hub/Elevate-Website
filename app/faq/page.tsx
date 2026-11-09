'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FaqJsonLd from '@/components/seo/FaqJsonLd';
import { useLocationPricing } from '@/hooks/useLocationPricing';
import { formatPrice } from '@/lib/pricing-config';
import type { PackageKey } from '@/lib/pricing-config';
import { faqGroups, PRICING_QUESTION } from '@/lib/faq-content';

const PRICING_KEYS: PackageKey[] = ['starter', 'business', 'ecommerce', 'growth_suite'];
const PRICING_LABELS: Record<PackageKey, string> = {
  starter: 'Starter Website',
  business: 'Business Website',
  ecommerce: 'E-commerce Website',
  growth_suite: 'Growth Suite',
  google_growth: 'Website Care Plan',
  meta_growth: 'SEO Care Plan',
};

export default function FaqPage() {
  const [openQ, setOpenQ] = useState<string | null>(null);
  const { packages, isLoading } = useLocationPricing();

  const priceMap = new Map(packages.map((pkg) => [pkg.packageKey, pkg]));

  const pricingAnswer = useMemo(() => {
    if (isLoading || packages.length === 0) {
      return 'Our public website pricing is shown in naira and starts with a clear Starter package, followed by Business, E-commerce, and Growth Suite options. Retainers and custom work are quoted based on scope.';
    }

    const parts = PRICING_KEYS.map((key) => {
      const pkg = priceMap.get(key);
      return pkg ? `${PRICING_LABELS[key]} from ${formatPrice(pkg)}` : null;
    }).filter(Boolean);

    return `${parts.join(', ')}. Retainers and custom work are quoted separately when needed.`;
  }, [isLoading, packages, priceMap]);

  const groups = useMemo(
    () =>
      faqGroups.map((g) => ({
        ...g,
        items: g.items.map((f) => (f.q === PRICING_QUESTION ? { ...f, a: pricingAnswer } : f)),
      })),
    [pricingAnswer]
  );
  const faqs = groups.flatMap((g) => g.items);

  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <Header />
      <main className="pt-32 sm:pt-36 md:pt-40 pb-20 min-h-screen bg-background dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-6">
              <HelpCircle className="text-accent" size={28} />
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-4">
              Frequently asked questions
            </h1>
            <p className="text-text/80 dark:text-gray-300 text-lg">
              Straight answers to what business owners ask us about getting found on Google and ChatGPT, websites, SEO and prices.
            </p>
          </motion.div>

          <nav aria-label="FAQ topics" className="mb-10 flex flex-wrap justify-center gap-2">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/15 text-sm text-primary dark:text-white hover:border-accent hover:text-accent transition-colors"
              >
                {g.heading}
              </a>
            ))}
          </nav>

          <div className="space-y-12">
            {groups.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-28">
                <h2 className="font-heading font-bold text-2xl text-primary dark:text-white mb-4">{g.heading}</h2>
                <div className="space-y-3">
                  {g.items.map((faq) => {
                    const open = openQ === faq.q;
                    return (
                      <div
                        key={faq.q}
                        className="rounded-card-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 overflow-hidden"
                      >
                        <h3>
                          <button
                            onClick={() => setOpenQ(open ? null : faq.q)}
                            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                            aria-expanded={open}
                          >
                            <span className="font-heading font-semibold text-primary dark:text-white">{faq.q}</span>
                            <ChevronDown
                              className={`flex-shrink-0 text-accent transition-transform ${open ? 'rotate-180' : ''}`}
                              size={20}
                            />
                          </button>
                        </h3>
                        {/* Always in the HTML (hidden when closed) so search engines and AI tools can read every answer. */}
                        <div
                          hidden={!open}
                          className="px-6 pb-5 pt-0 text-text/80 dark:text-gray-300 border-t border-gray-100 dark:border-white/5"
                        >
                          <p className="pt-4">{faq.a}</p>
                          {faq.link && (
                            <a href={faq.link.href} className="inline-block mt-3 text-accent font-medium hover:underline">
                              {faq.link.label}
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 p-8 bg-primary dark:bg-primary rounded-card-lg text-center"
          >
            <p className="text-white/90 mb-4">Still have questions?</p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-6 py-3 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
