'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Target, Zap, Heart, Github, Linkedin, FileCheck, Download } from 'lucide-react';

const VALUES = [
  {
    icon: Target,
    title: 'Results-first',
    text: 'We design for conversions and growth, not just aesthetics. Every decision ties back to your business goals.',
  },
  {
    icon: Zap,
    title: 'Speed & clarity',
    text: 'Clear timelines, fixed pricing, and no endless revisions. We move fast so you can launch and iterate.',
  },
  {
    icon: Heart,
    title: 'Partnership',
    text: 'We treat your brand like our own. Honest feedback, proactive ideas, and long-term support when you need it.',
  },
];

const TIMELINE = [
  {
    year: '2023',
    title: 'Founded in Nigeria',
    description:
      'Elevate Web & Marketing launches in Nigeria, helping small businesses get online with simple, high‑performing websites.',
  },
  {
    year: '2024',
    title: 'Packages & process',
    description:
      'Introduced fixed website packages and a repeatable delivery process while building long‑term relationships with local brands.',
  },
  {
    year: '2025',
    title: 'Client work & global reach',
    description:
      'Delivered sites for MR DGN Group, MR DGN Construction, MansaLuxeRealty Limited, Experience BSG, TMM Scholars, and Trade with MRK—working with clients across multiple timezones.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-32 sm:pt-36 md:pt-40 pb-20 min-h-screen bg-background dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero / lead spacing */}
          <div className="h-4 sm:h-6 md:h-8" aria-hidden />
          {/* About Elevate Web & Marketing */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mb-24"
          >
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary dark:text-white leading-tight mb-10">
              About Elevate Web & Marketing
            </h1>
            <div className="space-y-6 text-lg text-text/80 dark:text-gray-300">
              <p>
                At Elevate Web & Marketing, we help businesses grow online by building strong digital foundations and running effective marketing campaigns. Our goal is simple: help you attract more customers, increase visibility, and turn online traffic into real results.
              </p>
              <p>
                Today, having a website alone is not enough. Businesses need digital platforms that look professional, load quickly, rank well on search engines, and guide visitors toward taking action. That is where we come in.
              </p>
              <p>
                We work with businesses to design and develop modern websites, build useful digital tools, and create marketing strategies that support long‑term growth. Every project is approached with a focus on clarity, performance, and real business impact.
              </p>
              <div className="pt-2">
                <p className="font-heading text-base sm:text-lg text-primary dark:text-white mb-3">
                  What we help you with
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 text-base text-text/80 dark:text-gray-300">
                  <li>Website design and development</li>
                  <li>Web applications and internal tools</li>
                  <li>Google Ads and digital advertising campaigns</li>
                  <li>Social media and content support</li>
                  <li>Conversion tracking and analytics</li>
                  <li>Ongoing optimisation and maintenance</li>
                </ul>
              </div>
              <p>
                We are a Nigeria‑based studio working with businesses in any country and timezone. If you are ready to use the internet well, our role is to help make that possible.
              </p>
            </div>
          </motion.section>

          {/* Founder */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid md:grid-cols-2 gap-12 items-center mb-24"
          >
            <div className="relative rounded-card-lg overflow-hidden shadow-soft-lg aspect-[4/5] max-h-[500px]">
              <Image
                src="/images/founder-ufuoma-onakpoyan.png"
                alt="Ufuoma Onakpoyan - Founder of Elevate Web & Marketing"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <div className="space-y-4">
              <p className="text-accent font-heading font-bold text-sm uppercase tracking-wide">
                Founder & Lead Strategist
              </p>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary dark:text-white">
                About the Founder
              </h2>
              <p className="text-text/80 dark:text-gray-300 font-body">
                Elevate Web & Marketing was founded by Ufuoma Onakpoyan, a self-taught web developer and digital strategist with a Civil Engineering background from UNIBEN. He is passionate about using technology to help businesses grow.
              </p>
              <p className="text-text/80 dark:text-gray-300 font-body">
                Ufuoma has built modern websites and digital platforms for clients including MR DGN Group, MansaLuxeRealty Limited, TMM Scholars, and Trade with MRK. His work focuses on solutions that are both functional and visually engaging—supporting real business goals like attracting customers and increasing visibility.
              </p>
              <p className="text-text/80 dark:text-gray-300 font-body">
                His technical stack includes TypeScript, JavaScript, React, Next.js, Python, and modern UI/UX tools. He contributes to projects such as MrDGN-Group and Nova-Trade on GitHub.
              </p>
              <p className="text-text/80 dark:text-gray-300 font-body">
                Ufuoma believes good digital products are built by understanding the needs of businesses and their customers. Through Elevate Web & Marketing, his aim is to help businesses build a strong digital presence and take advantage of the opportunities that the internet offers.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="https://github.com/Ufuoma-Onakpoyan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-primary dark:text-white font-medium hover:bg-accent hover:text-white dark:hover:bg-accent transition-colors"
                  aria-label="View Ufuoma Onakpoyan on GitHub"
                >
                  <Github size={20} />
                  View GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/ufuoma-onakpoyan-908626193/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-primary dark:text-white font-medium hover:bg-accent hover:text-white dark:hover:bg-accent transition-colors"
                  aria-label="View Ufuoma Onakpoyan on LinkedIn"
                >
                  <Linkedin size={20} />
                  View LinkedIn
                </a>
              </div>
            </div>
          </motion.section>

          {/* Core values */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-24"
          >
            <h2 className="font-heading font-bold text-3xl text-primary dark:text-white text-center mb-12">
              What we stand for
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {VALUES.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="p-6 bg-white dark:bg-slate-800 rounded-card-lg border border-gray-100 dark:border-white/10 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="text-accent" size={24} />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-primary dark:text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-text/80 dark:text-gray-300 font-body text-sm leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Full-width background section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mb-24 relative overflow-hidden rounded-card-lg"
          >
            <div className="absolute inset-0">
              <Image
                src="https://images.pexels.com/photos/1181370/pexels-photo-1181370.jpeg?auto=compress&cs=tinysrgb&w=1200&fit=crop"
                alt="Black professional team collaborating in workspace"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-accent/80 mix-blend-multiply" />
            </div>
            <div className="relative px-6 sm:px-10 py-12 sm:py-16 text-white">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">
                Built in Nigeria. Serving the world.
              </h2>
              <p className="max-w-2xl text-sm sm:text-base text-white/90">
                We understand what it means to build as a Nigerian brand—from local businesses and NGOs to global
                founders working across timezones. Every project is designed to feel premium, load fast, and support
                real growth.
              </p>
            </div>
          </motion.section>

          {/* CAC Registration */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mb-24"
          >
            <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-card-lg border border-gray-100 dark:border-white/10 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <FileCheck className="text-accent" size={24} />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-xl sm:text-2xl text-primary dark:text-white mb-1">
                      Registered in Nigeria
                    </h2>
                    <p className="text-text/80 dark:text-gray-300 font-body text-sm">
                      Elevate Web &amp; Marketing is duly registered with the Corporate Affairs Commission (CAC). View our certificate for verification.
                    </p>
                  </div>
                </div>
                <a
                  href="/documents/Elevate-Web-Marketing-Certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-accent text-white font-medium hover:bg-accent/90 transition-colors shrink-0"
                >
                  <Download size={18} />
                  View Certificate
                </a>
              </div>
            </div>
          </motion.section>

          {/* Timeline */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="max-w-2xl"
          >
            <h2 className="font-heading font-bold text-3xl text-primary dark:text-white mb-10">
              Our journey
            </h2>
            <div className="border-l-2 border-gray-200 dark:border-white/20 pl-8 space-y-8">
              {TIMELINE.map(({ year, title, description }) => (
                <div key={year} className="relative">
                  <div
                    className="absolute -left-[9px] w-4 h-4 rounded-full bg-accent border-4 border-white dark:border-slate-800 shadow-sm"
                    aria-hidden
                  />
                  <p className="text-accent font-heading font-bold text-sm">
                    {year}
                  </p>
                  <h3 className="font-heading font-semibold text-xl text-primary dark:text-white mt-1">
                    {title}
                  </h3>
                  <p className="text-text/80 dark:text-gray-300 font-body text-sm mt-1">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </>
  );
}
