'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, FileText, MapPin, RefreshCw, Wrench } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';

const services = [
  {
    icon: FileText,
    title: 'Lead-Generating Websites',
    description:
      'Professional websites for service businesses that need clearer messaging, stronger trust, and more inbound leads.',
  },
  {
    icon: RefreshCw,
    title: 'Website Redesigns',
    description:
      'Rebuild outdated websites around better structure, better messaging, and a clearer path to conversion.',
  },
  {
    icon: Wrench,
    title: 'Website Care Plans',
    description:
      'Monthly support for updates, fixes, tracking checks, and the small improvements that keep a site working hard.',
  },
  {
    icon: MapPin,
    title: 'Local Visibility Support',
    description:
      'Google Business Profile support, local search cleanup, and reporting that helps service businesses get found.',
  },
  {
    icon: BarChart3,
    title: 'Paid Growth Support',
    description:
      'Campaign setup and management for businesses that are ready to pair a better website with paid traffic.',
  },
  {
    icon: FileText,
    title: 'Landing Pages',
    description:
      'Focused campaign pages built to turn traffic into quote requests, consultations, and high-intent enquiries.',
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
              What We Do
            </h2>
            <p className="text-text/80 dark:text-gray-300 text-lg max-w-2xl">
              We focus on high-performance websites, redesigns, local visibility, and the
              recurring support that keeps your online presence improving after launch.
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
              className="group bg-white dark:bg-slate-800 rounded-card-lg p-8 shadow-soft hover:shadow-soft-xl border border-gray-100 dark:border-white/10 transition-shadow"
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
