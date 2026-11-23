'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Client logos, made uniform (20 Nov 2026): each file in /images/clients/mono is the logo trimmed to its edges and
 * redrawn in one dark colour (two originals were white and TMM's was a navy square). Each is then sized so it covers
 * the same area on screen (equal visual weight), instead of being squeezed into the same box, which made wide logos
 * look tiny and square ones huge. w/h are the files' pixel sizes; `scale` nudges logos whose ink is much
 * lighter (thin outline type) or heavier (solid shapes) than the rest.
 */
const CLIENT_LOGOS: { src: string; alt: string; w: number; h: number; scale?: number }[] = [
  { src: '/images/clients/mono/mrdn-group.png', alt: 'MR DGN Group', w: 782, h: 268 },
  { src: '/images/clients/mono/mrdn-construction.png', alt: 'MR DGN Construction', w: 395, h: 299 },
  { src: '/images/clients/mono/mansa-luxe-realty.png', alt: 'Mansa Luxe Realty', w: 951, h: 262 },
  { src: '/images/clients/mono/experience-bsg.png', alt: 'BSG Beelicious Signatures Global', w: 468, h: 222, scale: 1.12 },
  { src: '/images/clients/mono/tmm-scholars.png', alt: 'TMM Scholars', w: 350, h: 400, scale: 0.85 },
  { src: '/images/clients/mono/trade-with-mrk.png', alt: 'Trade with MRK', w: 652, h: 311 },
];

const AREA = 4400; // px² each logo covers
const MAX_H = 64;
const MAX_W = 170;

function displaySize(w: number, h: number, scale = 1) {
  const aspect = w / h;
  let height = Math.sqrt((AREA * scale * scale) / aspect);
  let width = height * aspect;
  if (height > MAX_H) { height = MAX_H; width = height * aspect; }
  if (width > MAX_W) { width = MAX_W; height = width / aspect; }
  return { width: Math.round(width), height: Math.round(height) };
}

export default function LogoStrip() {
  return (
    <section className="py-10 border-y border-gray-100 dark:border-white/10 bg-white/50 dark:bg-slate-800/50">
      <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="marquee-track flex w-max [--marquee-duration:42s] sm:[--marquee-duration:52s] lg:[--marquee-duration:64s] motion-reduce:w-full">
            {[false, true].map(duplicate => (
              <div key={String(duplicate)} aria-hidden={duplicate || undefined} className={`flex shrink-0 items-center ${duplicate ? 'motion-reduce:hidden' : 'motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center'}`}>
                {CLIENT_LOGOS.map(logo => {
                  const size = displaySize(logo.w, logo.h, logo.scale);
                  return (
                    <div key={logo.src} className="flex h-16 w-40 shrink-0 items-center justify-center opacity-70 transition-opacity hover:opacity-100 sm:w-52 lg:w-[250px]">
                      <Image
                        src={logo.src}
                        alt={duplicate ? '' : logo.alt}
                        width={size.width}
                        height={size.height}
                        style={{ width: size.width, height: size.height }}
                        className="object-contain dark:invert"
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
