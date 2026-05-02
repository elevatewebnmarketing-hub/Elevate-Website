'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { openCalendly } from '@/lib/calendly';

const DottedGlowBackground = dynamic(
  () =>
    import('@/components/ui/dotted-glow-background').then((m) => ({
      default: m.DottedGlowBackground,
    })),
  { ssr: false }
);

const TRUST_AVATARS = [
  'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100&fit=crop',
  'https://images.pexels.com/photos/1181352/pexels-photo-1181352.jpeg?auto=compress&cs=tinysrgb&w=100&fit=crop',
  'https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg?auto=compress&cs=tinysrgb&w=100&fit=crop',
  'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&fit=crop',
];

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="hero-dots-mask absolute inset-0 pointer-events-none overflow-hidden">
        <DottedGlowBackground
          variant="auto"
          className="pointer-events-none"
          opacity={0.75}
          gap={14}
          radius={2}
        />
      </div>
      {/* Glow orbs */}
      <div
        className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full bg-accent/20 blur-[80px] opacity-15 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-[-100px] left-[-200px] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[80px] opacity-15 pointer-events-none"
        aria-hidden
      />
      {/* Gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
      <div className="absolute inset-0 opacity-30 hero-radial" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto">
          {/* Left - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.h1
              variants={itemVariants}
              className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary dark:text-white leading-tight max-w-4xl mx-auto"
            >
              Agency-Grade Websites Built to{' '}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Convert Traffic
              </span>{' '}
              on Autopilot.
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-text/80 dark:text-gray-300 max-w-xl mx-auto"
            >
              Stop losing leads to a slow, outdated website. We design, build, and
              optimize digital experiences that turn clicks into revenue. Clear
              pricing, zero headaches.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-base text-text/60 dark:text-gray-400"
            >
              Nigeria-based studio working with businesses in any country, in any timezone.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center"
            >
              <button
                type="button"
                onClick={openCalendly}
                className="inline-flex flex-col items-center justify-center min-h-[44px] px-8 py-4 bg-accent text-white font-heading font-semibold rounded-xl shadow-soft hover:bg-accent/90 hover:shadow-soft-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="block text-base sm:text-lg">Book a Strategy Call</span>
                <span className="block text-sm opacity-80 mt-0.5 font-body font-normal">
                  Free 30-min consultation
                </span>
              </button>
              <Link
                href="/pricing"
                className="inline-flex flex-col items-center justify-center min-h-[44px] px-8 py-4 bg-white/80 dark:bg-slate-800/80 text-primary dark:text-white font-heading font-semibold rounded-xl border-2 border-gray-200 dark:border-white/20 hover:bg-white dark:hover:bg-slate-800 hover:border-primary/30 dark:hover:border-white/30 backdrop-blur-sm transition-all duration-200"
              >
                <span className="block text-base sm:text-lg">View Pricing</span>
                <span className="block text-sm opacity-80 mt-0.5 font-body font-normal text-text/80 dark:text-gray-300">
                  Fixed rates, no surprises
                </span>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 justify-center"
            >
              <div className="flex -space-x-3">
                {TRUST_AVATARS.map((src, i) => (
                  <div
                    key={i}
                    className="relative w-9 h-9 rounded-full border-2 border-background overflow-hidden bg-gray-200"
                  >
                    <Image
                      src={src}
                      alt="Trusted client or team member"
                      width={36}
                      height={36}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                ))}
              </div>
              <div className="max-w-[280px] sm:max-w-none">
                <p className="text-accent font-medium text-sm">★★★★★</p>
                <p className="text-text/60 dark:text-gray-400 text-xs sm:text-sm">
                  Trusted by teams behind MR DGN Group, MansaLuxeRealty Limited, TMM Scholars, and more.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
