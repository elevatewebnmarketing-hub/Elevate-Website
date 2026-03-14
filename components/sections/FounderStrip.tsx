'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, ArrowRight } from 'lucide-react';

export default function FounderStrip() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-24 bg-white dark:bg-slate-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-8 p-8 rounded-card-lg bg-gradient-to-br from-primary/5 to-accent/10 dark:from-primary/20 dark:to-accent/20 border border-gray-100 dark:border-white/10 shadow-soft">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 ring-4 ring-white dark:ring-slate-800 shadow-lg">
            <Image
              src="/images/founder-ufuoma-onakpoyan.png"
              alt="Ufuoma Onakpoyan - Founder of Elevate Web & Marketing"
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-accent font-heading font-bold text-sm uppercase tracking-wide mb-1">
              Meet the Founder
            </p>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-primary dark:text-white mb-2">
              Ufuoma Onakpoyan
            </h2>
            <p className="text-text/80 dark:text-gray-300 text-sm sm:text-base mb-4">
              Self-taught web developer and digital strategist. Building modern websites and marketing systems for businesses worldwide—from MR DGN Group to TMM Scholars.
            </p>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <a
                href="https://github.com/Ufuoma-Onakpoyan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 text-primary dark:text-white text-sm font-medium hover:bg-accent hover:border-accent hover:text-white transition-colors"
                aria-label="View Ufuoma Onakpoyan on GitHub"
              >
                <Github size={18} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ufuoma-onakpoyan-908626193/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 text-primary dark:text-white text-sm font-medium hover:bg-accent hover:border-accent hover:text-white transition-colors"
                aria-label="View Ufuoma Onakpoyan on LinkedIn"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-accent font-medium text-sm hover:underline"
              >
                Full story
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
