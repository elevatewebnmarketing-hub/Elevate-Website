'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { ArrowRight } from 'lucide-react';
import { Search, Palette, Code, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We learn about your business, goals, and target audience to create a strategy that works.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Design',
    description: 'Wireframes and mockups bring your vision to life before a single line of code is written.',
    icon: Palette,
  },
  {
    number: '03',
    title: 'Development',
    description: 'Our developers build your site with clean code, fast performance, and best practices.',
    icon: Code,
  },
  {
    number: '04',
    title: 'Launch',
    description: 'We deploy, test, and hand over your new website with training and ongoing support.',
    icon: Rocket,
  },
];

interface ProcessProps {
  showHeading?: boolean;
}

export default function Process({ showHeading = true }: ProcessProps) {
  return (
    <SectionWrapper id="process" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
          >
            <div className="text-center sm:text-left">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white mb-4">
                Our Process
              </h2>
              <p className="text-text/80 dark:text-gray-300 text-lg max-w-2xl mx-auto sm:mx-0">
                A proven approach to delivering results
              </p>
            </div>
            <Link
              href="/process"
              className="inline-flex items-center gap-2 text-accent font-heading font-semibold hover:underline justify-center sm:justify-end"
            >
              Learn more
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        )}

        <div className={`relative ${!showHeading ? 'mt-4' : ''}`}>
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-accent/30" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <step.icon className="text-accent" size={32} />
                </div>
                <span className="text-accent font-heading font-bold text-lg mb-2">
                  Step {step.number.slice(-1)}
                </span>
                <h3 className="font-heading font-semibold text-xl text-primary dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-text/80 dark:text-gray-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
