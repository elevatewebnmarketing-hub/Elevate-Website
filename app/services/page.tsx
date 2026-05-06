'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import ServicesJsonLd from '@/components/seo/ServicesJsonLd';
import {
  ArrowRight,
  BarChart3,
  FileText,
  Globe,
  MapPin,
  RefreshCw,
  Wrench,
} from 'lucide-react';

const coreServices = [
  {
    icon: Globe,
    title: 'Starter & Business Websites',
    description:
      'Custom marketing websites for service businesses that need clearer positioning and stronger trust online.',
    details: [
      'Conversion-focused homepage and service page structure',
      'Mobile-first build and speed basics',
      'Clear CTA paths for calls, forms, and enquiries',
      'SEO-ready page structure and analytics setup',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Website Redesigns',
    description:
      'For businesses with an outdated or underperforming website that needs a stronger message and cleaner flow.',
    details: [
      'Site audit and restructuring recommendations',
      'Modern visual refresh and clearer hierarchy',
      'Improved trust, CTA, and lead flow',
      'Content migration where needed',
    ],
  },
  {
    icon: FileText,
    title: 'Landing Pages',
    description:
      'Standalone pages for ads, launches, offers, or specific campaigns that need a tighter conversion journey.',
    details: [
      'Offer-focused layout and messaging',
      'Lead capture and tracking setup',
      'Campaign-specific CTA sections',
      'Fast handoff for paid traffic or outreach',
    ],
  },
];

const supportServices = [
  {
    icon: Wrench,
    title: 'Website Care Plans',
    description:
      'Monthly support for updates, edits, and small improvements after your site goes live.',
    details: [
      'Content edits and light support',
      'Tracking and form checks',
      'Priority fixes when needed',
      'A healthier website over time',
    ],
  },
  {
    icon: MapPin,
    title: 'Local Visibility Support',
    description:
      'Support for Google Business Profile, local search presence, and the reporting that shows what is working.',
    details: [
      'Google Business Profile cleanup and updates',
      'Location and service consistency checks',
      'Monthly local visibility recommendations',
      'Lead tracking support',
    ],
  },
  {
    icon: BarChart3,
    title: 'Paid Growth Support',
    description:
      'For businesses ready to pair their website with Google Ads or Meta Ads and tighter conversion tracking.',
    details: [
      'Campaign setup or management',
      'Tracking review and conversion alignment',
      'Landing page recommendations',
      'Monthly reporting and optimization',
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-background dark:bg-slate-900">
        <ServicesJsonLd />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-4">
              Services
            </h1>
            <p className="text-text/80 dark:text-gray-300 text-lg max-w-3xl mb-6">
              Elevate is built around one core goal: helping service businesses turn their
              website into a stronger trust and lead-generation asset. We keep the public
              offer simple, then layer in support where it genuinely helps.
            </p>
            <p className="text-sm text-text/70 dark:text-gray-400">
              Common fits: local services, consultants, agencies, real estate teams, education
              brands, and growing businesses that need a more credible online presence.
            </p>
          </motion.div>

          <section className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="font-heading font-bold text-3xl text-primary dark:text-white mb-2">
                  Core Website Services
                </h2>
                <p className="text-text/80 dark:text-gray-300 max-w-2xl">
                  The main offer we want prospects to understand quickly.
                </p>
              </div>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 text-accent font-heading font-semibold hover:underline"
              >
                View pricing
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreServices.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-white dark:bg-slate-800 rounded-card-lg p-8 shadow-soft hover:shadow-soft-xl border border-gray-100 dark:border-white/10 transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="text-accent" size={28} />
                  </div>
                  <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mb-3">
                    {service.title}
                  </h2>
                  <p className="text-text/80 dark:text-gray-300 text-base leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-sm text-text/80 dark:text-gray-300"
                      >
                        <ArrowRight className="text-accent flex-shrink-0 mt-0.5" size={14} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl text-primary dark:text-white mb-2">
              Ongoing Growth Support
            </h2>
            <p className="text-text/80 dark:text-gray-300 max-w-2xl mb-8">
              Add these when your website is already doing its job and you want more momentum.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {supportServices.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white dark:bg-slate-800 rounded-card-lg p-8 shadow-soft border border-gray-100 dark:border-white/10"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                    <service.icon className="text-accent" size={28} />
                  </div>
                  <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mb-3">
                    {service.title}
                  </h2>
                  <p className="text-text/80 dark:text-gray-300 text-base leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-sm text-text/80 dark:text-gray-300"
                      >
                        <ArrowRight className="text-accent flex-shrink-0 mt-0.5" size={14} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-8 bg-primary rounded-card-lg text-center"
          >
            <h2 className="font-heading font-bold text-2xl text-white mb-4">
              Not sure which package fits?
            </h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Start with a quick strategy call. We will point you toward the simplest option
              that matches your business goals instead of forcing unnecessary scope.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" href="/pricing" className="bg-accent hover:bg-accent/90">
                View Pricing
              </Button>
              <Button variant="outline" size="lg" href="/contact" className="border-white/30 text-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
