'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { ArrowRight } from 'lucide-react';
import {
  Palette,
  Code,
  RefreshCw,
  Search,
  FileText,
  Wrench,
  BarChart3,
  MapPin,
} from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Website Design',
    description:
      'Custom designs for business, portfolio, and personal brands that reflect who you are and convert visitors into customers.',
  },
  {
    icon: Code,
    title: 'Website Development',
    description:
      'Fast, responsive websites built with modern technology and best practices, from static sites to dynamic, content-driven experiences.',
  },
  {
    icon: RefreshCw,
    title: 'Website Redesign',
    description:
      'Breathe new life into your existing site with a fresh look, improved UX, and clearer user journeys that support your goals.',
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description: 'Get found by your ideal customers with data-driven SEO strategies.',
  },
  {
    icon: FileText,
    title: 'Landing Pages',
    description:
      'High-converting landing pages and micro-sites designed to turn traffic into leads and sales for specific campaigns.',
  },
  {
    icon: Wrench,
    title: 'Website Maintenance',
    description:
      'Keep your site secure, fast, and up-to-date with ongoing maintenance, updates, and small enhancements over time.',
  },
  {
    icon: BarChart3,
    title: 'Google Ads & Campaign Management',
    description:
      'Manage search and display campaigns to generate leads and sales. We set up, optimize, and report on performance so you can focus on running your business.',
  },
  {
    icon: MapPin,
    title: 'Google Business Profile & Analytics',
    description:
      'Optimize your Business Profile, set up reviews and posts, and configure Google Analytics (GA4) for conversion tracking and monthly reporting.',
  },
];

export default function Services() {
  return (
    <SectionWrapper id="services" className="py-24 bg-background dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
        >
          <div className="text-center sm:text-left">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-text/80 dark:text-gray-300 text-lg max-w-2xl">
              Everything you need to grow online—from launch pages and portfolios to full business and e‑commerce websites.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-accent font-heading font-semibold hover:underline justify-center sm:justify-end"
          >
            View all services
            <ArrowRight size={20} />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group bg-white dark:bg-slate-800 rounded-card-lg p-8 shadow-soft hover:shadow-soft-xl border border-gray-100 dark:border-white/10 transition-shadow cursor-default"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <service.icon className="text-accent" size={28} />
              </div>
              <h3 className="font-heading font-semibold text-xl text-primary dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-text/80 dark:text-gray-300 text-base leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
