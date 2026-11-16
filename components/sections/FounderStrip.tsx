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
      className="py-16 lg:py-20 bg-white dark:bg-slate-900"
    >
      <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[minmax(0,20rem)_1fr] lg:grid-cols-[minmax(0,24rem)_1fr] gap-8 lg:gap-14 items-center">
          <div className="relative aspect-[4/5] w-full max-w-sm mx-auto md:mx-0 rounded-card-lg overflow-hidden bg-primary/5 shadow-soft-lg">
            <Image
              src="/images/founder-ufuoma-onakpoyan.png"
              alt="Ufuoma Onakpoyan, founder of Elevate Web & Marketing"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 384px, 384px"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary dark:text-white mb-2">
              Work with the founder, not an account manager
            </h2>
            <p className="font-heading font-semibold text-accent mb-5">Ufuoma Onakpoyan, founder</p>
            <p className="text-text/80 dark:text-gray-300 text-lg leading-relaxed mb-4 max-w-[62ch] md:mx-0 mx-auto">
              Self-taught web developer and digital strategist. I build the websites, set up the Google profiles and
              run the ads myself, for businesses from MR DGN Group in Asaba to TMM Scholars and Runway Refined in the UK.
            </p>
            <p className="text-text/80 dark:text-gray-300 text-lg leading-relaxed mb-6 max-w-[62ch] md:mx-0 mx-auto">
              You get one person who knows your project from the first WhatsApp message to launch and after.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
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
