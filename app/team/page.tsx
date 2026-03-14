'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, Linkedin, User } from 'lucide-react';

export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="pt-32 sm:pt-36 md:pt-40 pb-20 min-h-screen bg-background dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-6">
              <User className="text-accent" size={28} />
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-4">
              Meet Our Expert
            </h1>
            <p className="text-text/80 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Elevate Web & Marketing is built around a founder who combines technical skill with strategic thinking.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-card-lg border border-gray-200 dark:border-white/10 shadow-soft-xl overflow-hidden"
          >
            <div className="grid md:grid-cols-[300px_1fr] gap-0">
              <div className="relative aspect-[4/5] md:aspect-square min-h-[320px]">
                <Image
                  src="/images/founder-ufuoma-onakpoyan.png"
                  alt="Ufuoma Onakpoyan - Founder of Elevate Web & Marketing"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="text-accent font-heading font-bold text-sm uppercase tracking-wide mb-2">
                  Founder & Lead Strategist
                </p>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mb-4">
                  Ufuoma Onakpoyan
                </h2>
                <p className="text-text/80 dark:text-gray-300 font-body leading-relaxed mb-4">
                  Ufuoma founded Elevate Web & Marketing to help businesses grow online. A self-taught web developer and digital strategist with a Civil Engineering background from UNIBEN, he is passionate about using technology to solve real business problems.
                </p>
                <p className="text-text/80 dark:text-gray-300 font-body leading-relaxed mb-4">
                  He has built modern websites and digital platforms for clients including MR DGN Group, MansaLuxeRealty Limited, TMM Scholars, and Trade with MRK. His work focuses on solutions that are both functional and visually engaging—supporting goals like attracting customers, increasing visibility, and converting traffic into results.
                </p>
                <p className="text-text/80 dark:text-gray-300 font-body leading-relaxed mb-6">
                  His technical stack includes TypeScript, JavaScript, React, Next.js, Python, and modern UI/UX tools. He contributes to open-source projects such as MrDGN-Group and Nova-Trade on GitHub.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/Ufuoma-Onakpoyan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-primary dark:text-white font-medium hover:bg-accent hover:text-white dark:hover:bg-accent transition-colors"
                    aria-label="View Ufuoma Onakpoyan on GitHub"
                  >
                    <Github size={20} />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ufuoma-onakpoyan-908626193/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-primary dark:text-white font-medium hover:bg-accent hover:text-white dark:hover:bg-accent transition-colors"
                    aria-label="View Ufuoma Onakpoyan on LinkedIn"
                  >
                    <Linkedin size={20} />
                    LinkedIn
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-text/60 dark:text-gray-400 text-sm mt-8"
          >
            Want to work with us? <a href="/contact" className="text-accent hover:underline">Contact us</a> or <a href="/get-quote" className="text-accent hover:underline">request a quote</a>.
          </motion.p>
        </div>
      </main>
      <Footer />
    </>
  );
}
