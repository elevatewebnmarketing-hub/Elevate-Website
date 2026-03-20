'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const CLIENT_LOGOS = [
  { src: '/images/clients/mrdn-group-logo.png', alt: 'MR DGN Group' },
  { src: '/images/clients/mrdn-construction-logo.png', alt: 'MR DGN Construction' },
  { src: '/images/clients/mansa-luxe-realty-logo.png', alt: 'MansaLuxeRealty Limited' },
  { src: '/images/clients/experience-bsg-logo.png', alt: 'Experience BSG' },
  { src: '/images/clients/tmm-scholars-logo.png', alt: 'TMM Scholars' },
  { src: '/images/clients/trade-with-mrk-logo.png', alt: 'Trade with MRK' },
];

export default function LogoStrip() {
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="py-10 border-y border-gray-100 dark:border-white/10 bg-white/50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs sm:text-sm font-medium text-text/50 dark:text-gray-400 uppercase tracking-[0.2em] mb-6"
        >
          Trusted by growing brands
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden"
        >
          <div className="flex items-center gap-12 marquee-track">
            {logos.map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className="relative h-10 sm:h-12 w-32 sm:w-40 flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 640px) 128px, 160px"
                  className="h-full w-full object-contain object-center"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
