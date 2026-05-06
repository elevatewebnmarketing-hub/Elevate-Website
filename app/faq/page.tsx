'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FaqJsonLd from '@/components/seo/FaqJsonLd';
import { useLocationPricing } from '@/hooks/useLocationPricing';
import { formatPrice } from '@/lib/pricing-config';
import type { PackageKey } from '@/lib/pricing-config';

const STATIC_FAQS = [
  {
    q: 'How much does it cost to build a website?',
    a: '',
  },
  {
    q: 'Why are your prices lower than many agencies?',
    a: 'We keep our public packages focused, lean, and conversion-oriented. You are not paying for large-agency overhead or bloated process. That lets us stay just below many traditional agency price points while still delivering custom, professional work.',
  },
  {
    q: 'How long does it take to build a website?',
    a: 'Starter websites usually take 7 to 10 business days. Multi-page business websites typically take 2 to 4 weeks. E-commerce or more complex builds often take 3 to 5 weeks depending on scope, content readiness, and revisions.',
  },
  {
    q: 'What is included in your website packages?',
    a: 'Every build includes mobile-first design, conversion-focused structure, core technical SEO foundations, and a clear lead capture path. Our Starter Website package at ₦250,000 includes a 4-page website, Google Business Profile setup, 1 year of domain registration, mobile optimization, and core search-engine optimization.',
  },
  {
    q: 'What exactly is included in the ₦250,000 Starter Website package?',
    a: 'The ₦250,000 Starter Website package includes a 4-page business website, 1 year of domain registration, Google Business Profile setup or cleanup, mobile optimization, core on-page SEO, indexation setup, and conversion-focused contact options such as WhatsApp, click-to-call, and contact form sections.',
  },
  {
    q: 'Do you only work with clients in Nigeria?',
    a: 'No. We are based in Asaba, Delta State, and work with businesses across Nigeria and beyond. The website now shows public pricing in naira for clarity.',
  },
  {
    q: 'Do I need to provide content and images?',
    a: 'Yes, although we guide you on what is needed. If your content is not ready yet, we can help shape the page structure, suggest what to write, and recommend stock imagery where appropriate.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Yes. Website redesigns are one of our core offers. We review what is not working, improve the structure and messaging, and rebuild around clearer trust and conversion goals.',
  },
  {
    q: 'Do you offer monthly support after launch?',
    a: 'Yes. We offer monthly retainers for website care, Google Business Profile support, reporting, and paid growth management. Those plans are designed to create ongoing momentum after launch.',
  },
  {
    q: 'Do I need a blog to rank on Google?',
    a: 'Not always. For many local and service businesses, strong service pages, clear site structure, reviews, Google Business Profile work, and fast page speed matter more than publishing constant blog posts. We only recommend a blog when it genuinely supports the business.',
  },
  {
    q: 'Are your websites mobile-friendly?',
    a: 'Yes. Every website is designed to work well on phones, tablets, and desktops.',
  },
  {
    q: 'How do I get started?',
    a: "Book a strategy call or send a quote request. We will review your goals, recommend the best-fit package, and outline the next steps.",
  },
];

const PRICING_KEYS: PackageKey[] = ['starter', 'business', 'ecommerce', 'growth_suite'];
const PRICING_LABELS: Record<PackageKey, string> = {
  starter: 'Starter Website',
  business: 'Business Website',
  ecommerce: 'E-commerce Website',
  growth_suite: 'Growth Suite',
  google_growth: 'Local Visibility Retainer',
  meta_growth: 'Paid Growth Retainer',
};

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const faqs = useMemo(
    () => STATIC_FAQS.map((faq, index) => (index === 0 ? { ...faq, a: pricingAnswer } : faq)),
    [pricingAnswer]
  );

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
              Frequently Asked Questions
            </h1>
            <p className="text-text/80 dark:text-gray-300 text-lg">
              Straight answers about pricing, process, and how we approach website projects.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="rounded-card-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-heading font-semibold text-primary dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-accent transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    size={20}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0 text-text/80 dark:text-gray-300 border-t border-gray-100 dark:border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
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
