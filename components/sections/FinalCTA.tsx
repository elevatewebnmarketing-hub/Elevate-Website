'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { openCalendly } from '@/lib/calendly';

interface FinalCTAProps {
  isCompact?: boolean;
}

export default function FinalCTA({ isCompact = false }: FinalCTAProps) {
  return (
    <section
      id="contact"
      className={`bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden ${isCompact ? 'py-16' : 'py-24'}`}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(79, 156, 249, 0.4) 0%, transparent 50%)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Link href="/" className="inline-block max-w-[180px] mx-auto">
            <Logo variant="white" width={180} height={56} className="w-full h-auto" />
          </Link>
        </motion.div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-6xl text-white mb-6">
          Ready for a stronger website?
        </h2>
        <p className="text-white/80 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
          Let&apos;s discuss how we can help you attract more qualified leads,
          build trust faster, and turn your website into a stronger sales tool.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            type="button"
            onClick={openCalendly}
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-heading font-semibold text-lg rounded-xl shadow-soft-lg hover:bg-accent/90 hover:scale-105 active:scale-100 transition-all duration-300"
          >
            Book a Free Strategy Call
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
