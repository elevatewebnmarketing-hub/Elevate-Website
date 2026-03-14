'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ServicePageConfig } from '@/lib/services-content';
import { ArrowRight, Check } from 'lucide-react';

interface Props {
  config: ServicePageConfig;
}

export default function ServiceSlugPage({ config }: Props) {
  return (
    <>
      <Header />
      <main className="pt-32 sm:pt-36 md:pt-40 pb-20 min-h-screen bg-background dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link
              href="/services"
              className="text-accent font-medium text-sm hover:underline inline-flex items-center gap-1 mb-6"
            >
              ← Back to Services
            </Link>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-4">
              {config.title}
            </h1>
            <p className="text-accent font-heading font-semibold text-lg mb-4">
              {config.subtitle}
            </p>
            <p className="text-text/80 dark:text-gray-300 text-lg leading-relaxed">
              {config.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid sm:grid-cols-2 gap-8 mb-12"
          >
            <div className="bg-white dark:bg-slate-800 rounded-card-lg border border-gray-200 dark:border-white/10 p-6">
              <h2 className="font-heading font-semibold text-lg text-primary dark:text-white mb-4">
                Common challenges
              </h2>
              <ul className="space-y-2">
                {config.challenges.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-text/80 dark:text-gray-300">
                    <span className="text-accent mt-0.5">•</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-card-lg border border-gray-200 dark:border-white/10 p-6">
              <h2 className="font-heading font-semibold text-lg text-primary dark:text-white mb-4">
                How we help
              </h2>
              <ul className="space-y-2">
                {config.solutions.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-text/80 dark:text-gray-300">
                    <Check className="text-accent flex-shrink-0 mt-0.5" size={16} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {config.type === 'industry' && config.portfolioName && config.portfolioUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12 p-6 bg-primary dark:bg-primary rounded-card-lg"
            >
              <h2 className="font-heading font-bold text-xl text-white mb-2">
                Example: {config.portfolioName}
              </h2>
              <p className="text-white/80 text-sm mb-4">
                We built a {config.title.toLowerCase()} for {config.portfolioName}. See it in action.
              </p>
              <a
                href={config.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
              >
                View project <ArrowRight size={16} />
              </a>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent text-white font-heading font-semibold rounded-xl shadow-soft hover:bg-accent/90 transition-colors"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-200 dark:border-white/20 text-primary dark:text-white font-heading font-semibold rounded-xl hover:border-accent hover:text-accent transition-colors"
            >
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
