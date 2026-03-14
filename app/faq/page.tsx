'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'How much does it cost to build a website in Nigeria?',
    a: 'Our website packages start from $149 (Starter) for single-page sites, $349 (Business) for multi-page sites, and $699 (E‑commerce) for online stores. Prices are in USD; we show approximate Naira equivalents based on the prevailing exchange rate. Custom and enterprise projects are quoted separately.',
  },
  {
    q: 'How long does it take to build a website?',
    a: 'A simple one-page site can be ready in 1–2 weeks. Business and e‑commerce sites typically take 3–6 weeks depending on scope, content readiness, and revisions. We agree on a clear timeline before starting.',
  },
  {
    q: 'What is included in your website packages?',
    a: 'All packages include responsive design, basic SEO setup (meta tags, clean URLs), and a contact or enquiry form. Business and higher tiers add more pages, custom branding, blog or portfolio sections, and post‑launch support. E‑commerce packages include product catalog and checkout.',
  },
  {
    q: 'Do you accept payment in Naira?',
    a: 'Yes. We can invoice in Naira at the prevailing rate at the time of payment. Payment terms are discussed during the project kickoff.',
  },
  {
    q: 'Do I need to provide content and images?',
    a: 'Yes. You provide text, images, and brand assets. We guide you on what we need and can suggest stock imagery or copy support if required.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Yes. We offer website redesign—auditing your current site, proposing a fresh structure and design, and migrating content. This is ideal when your site is outdated or underperforming.',
  },
  {
    q: 'Do you offer SEO and digital marketing?',
    a: 'Yes. We provide SEO optimization, Google Ads management, Google Business Profile optimization, and analytics setup. Our Google Growth Package combines Ads, Business Profile, and reporting for a flat monthly fee.',
  },
  {
    q: 'Do you provide website maintenance?',
    a: 'Yes. We offer maintenance plans to keep your site secure, updated, and performing well. This includes security updates, backups, content updates, and performance monitoring.',
  },
  {
    q: 'Are your websites mobile-friendly?',
    a: 'Yes. All our websites are mobile-responsive and work well on phones, tablets, and desktops.',
  },
  {
    q: 'Which industries do you work with?',
    a: 'We work with businesses across industries—construction, real estate, education, e‑commerce, consulting, and more. Our portfolio includes MR DGN Construction, MansaLuxeRealty, TMM Scholars, Experience BSG, and others.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a free strategy call or send us a message via the contact form. We’ll discuss your goals, recommend the right package, and outline next steps.',
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
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
              Common questions about our web design and marketing services.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
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
