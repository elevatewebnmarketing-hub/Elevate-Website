'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import {
  Palette,
  Code,
  RefreshCw,
  Search,
  FileText,
  Wrench,
  BarChart3,
  MapPin,
  ArrowRight,
} from 'lucide-react';

const serviceSlugMap: Record<string, string> = {
  'Website Design': 'website-design',
  'Website Development': 'website-development',
  'Website Redesign': 'website-redesign',
  'SEO Optimization': 'seo',
  'Website Maintenance': 'website-maintenance',
  'Google Ads & Campaign Management': 'google-ads',
  'Meta Ads (Facebook & Instagram)': '/meta-ads',
};

const services = [
  {
    icon: Palette,
    title: 'Website Design',
    description:
      'Custom designs that reflect your brand and convert visitors into customers. We create visually stunning, user-friendly interfaces that capture attention and drive action.',
    details: [
      'Brand-aligned visual design',
      'User experience (UX) research and optimization',
      'Responsive layouts for all devices',
      'Conversion-focused layouts',
    ],
  },
  {
    icon: Code,
    title: 'Website Development',
    description:
      'Fast, responsive websites built with modern technology and best practices. Clean code, secure foundations, and performance you can measure.',
    details: [
      'Next.js, React, and modern frameworks',
      'SEO-friendly structure',
      'Performance optimization',
      'Accessibility standards (WCAG)',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Website Redesign',
    description:
      'Breathe new life into your existing site with a fresh look and improved UX. We audit your current site and rebuild for better results.',
    details: [
      'Current site audit and strategy',
      'Modern design refresh',
      'Improved user flows',
      'Content migration',
    ],
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description:
      'Get found by your ideal customers with data-driven SEO strategies. We improve your search visibility and organic traffic.',
    details: [
      'Technical SEO audits',
      'Keyword research and strategy',
      'On-page optimization',
      'Link building and content strategy',
    ],
  },
  {
    icon: FileText,
    title: 'Landing Pages',
    description:
      'High-converting landing pages designed to turn traffic into leads. Focused, persuasive design that drives sign-ups and sales.',
    details: [
      'Conversion-optimized layouts',
      'A/B testing setup',
      'Lead capture integration',
      'Campaign tracking',
    ],
  },
  {
    icon: Wrench,
    title: 'Website Maintenance',
    description:
      'Keep your site secure, fast, and up-to-date with ongoing maintenance. Peace of mind so you can focus on your business.',
    details: [
      'Security updates and monitoring',
      'Backup and recovery',
      'Content updates',
      'Performance monitoring',
    ],
  },
  {
    icon: BarChart3,
    title: 'Google Ads & Campaign Management',
    description:
      'Manage search and display campaigns to generate leads and sales. We set up, optimize, and report on performance.',
    details: [
      'Campaign setup and optimization',
      'Keyword research and targeting',
      'Conversion tracking',
      'Monthly performance reports and strategy calls',
    ],
  },
  {
    icon: BarChart3,
    title: 'Meta Ads (Facebook & Instagram)',
    description:
      'Facebook Ads and Instagram Ads managed with Meta Pixel tracking, disciplined creative testing, and conversion-focused landing pages.',
    details: [
      'Meta Pixel + conversion event tracking validation',
      'Facebook & Instagram campaign setup and optimization',
      'Creative testing plan (hooks, formats, angles) to reduce fatigue',
      'Landing page alignment to turn clicks into leads and sales',
    ],
  },
  {
    icon: MapPin,
    title: 'Google Business Profile & Analytics',
    description:
      'Optimize your Business Profile and configure analytics for conversion tracking and informed decision-making.',
    details: [
      'Business Profile optimization and updates',
      'Reviews and local SEO',
      'GA4 setup and conversion tracking',
      'Monthly reporting and insights',
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-background dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-4">
              Our Services
            </h1>
            <p className="text-text/80 dark:text-gray-300 text-lg max-w-2xl mb-6">
              Everything you need to grow your business online—from design and development to SEO and ongoing support.
            </p>
            <p className="text-sm text-text/70 dark:text-gray-400 flex flex-wrap gap-x-2 gap-y-1 items-baseline">
              <span className="font-semibold text-primary dark:text-white">Industry solutions:</span>
              <span className="flex flex-wrap gap-x-2 gap-y-1">
                <Link href="/services/construction" className="text-accent hover:underline">Construction</Link>
                <span className="text-text/50">·</span>
                <Link href="/services/real-estate" className="text-accent hover:underline">Real Estate</Link>
                <span className="text-text/50">·</span>
                <Link href="/services/education" className="text-accent hover:underline">Education</Link>
                <span className="text-text/50">·</span>
                <Link href="/services/ecommerce" className="text-accent hover:underline">E‑commerce</Link>
              </span>
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
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
                <ul className="space-y-2 mb-6">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-2 text-sm text-text/80 dark:text-gray-300"
                    >
                      <ArrowRight
                        className="text-accent flex-shrink-0"
                        size={14}
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  href={
                    serviceSlugMap[service.title]
                      ? serviceSlugMap[service.title].startsWith('/')
                        ? serviceSlugMap[service.title]
                        : `/services/${serviceSlugMap[service.title]}`
                      : '/contact'
                  }
                >
                  {serviceSlugMap[service.title] ? 'Learn More' : 'Get Started'}
                </Button>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 p-8 bg-primary dark:bg-primary rounded-card-lg"
          >
            <h2 className="font-heading font-bold text-2xl text-white mb-4 text-center">
              Google Growth Package
            </h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto text-center">
              For businesses ready to grow with Google: we combine Ads, Business Profile, and Analytics into one flat monthly package. Ideal for local businesses, service providers, and education brands. Setup month includes full configuration; ongoing months focus on optimization and reporting.
            </p>
            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                href="/pricing"
                className="bg-accent hover:bg-accent/90"
              >
                View Pricing
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 p-8 bg-white dark:bg-slate-800 rounded-card-lg border border-gray-100 dark:border-white/10 text-center"
          >
            <h2 className="font-heading font-bold text-2xl text-primary dark:text-white mb-4">
              Not sure where to start?
            </h2>
            <p className="text-text/80 dark:text-gray-300 mb-6 max-w-xl mx-auto">
              Book a free strategy call and we&apos;ll help you identify the right services for your business goals.
            </p>
            <Button
              variant="outline"
              size="lg"
              href="mailto:hello@elevatewebandmarketing.com"
            >
              Book a Free Strategy Call
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
