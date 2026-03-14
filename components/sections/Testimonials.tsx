'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  business: string;
  review: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'MR DGN Group team',
    business: 'MR DGN Group',
    review:
      'Elevate Web & Marketing designed and built our group website from the ground up, bringing all our subsidiaries into one clear, modern home. Partners can now understand what we do at a glance and contact the right business unit easily.',
  },
  {
    id: '2',
    name: 'MR DGN Construction team',
    business: 'MR DGN Construction',
    review:
      'We needed a website that properly explained our construction services and building materials. Elevate structured the content, created service pages, and added project highlights so clients can request quotes with confidence.',
  },
  {
    id: '3',
    name: 'MansaLuxeRealty Limited',
    business: 'MansaLuxeRealty Limited',
    review:
      'Elevate designed and developed our real estate website to match our luxury brand. Property listings, enquiry forms, and key pages are now organised in a way that makes it easy for serious buyers to reach out.',
  },
  {
    id: '4',
    name: 'BSG Beelicious Signatures Global',
    business: 'Experience BSG',
    review:
      'For Experience BSG, Elevate created a product‑focused website that tells our story and showcases our collections. Customers can browse fragrances, learn about each line, and move smoothly towards making a purchase.',
  },
  {
    id: '5',
    name: 'The Mighty Men Scholars Program',
    business: 'TMM Scholars',
    review:
      'Elevate built our program website to clearly explain our mission, who can apply, and how the selection works. Now, both potential scholars and partners are directed to one central place for accurate information.',
  },
  {
    id: '6',
    name: 'Mr K Trading Arena',
    business: 'Trade with MRK',
    review:
      'For Trade with MRK, Elevate created a professional online home for our trading education brand. The site now presents our offers, free resources, and mentorship options in a way that builds trust with new traders.',
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && data.length > 0 && setTestimonials(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <SectionWrapper id="testimonials" className="py-24 bg-background dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-text/80 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Real results from real businesses
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="overflow-hidden">
            {testimonials.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-800 rounded-card-lg p-8 lg:p-12 shadow-soft border border-gray-100 dark:border-white/10"
              >
                <Quote className="text-accent/30 mb-6" size={40} />
                <blockquote className="text-xl lg:text-2xl text-primary dark:text-white font-medium leading-relaxed mb-8">
                  &ldquo;{testimonials[activeIndex].review}&rdquo;
                </blockquote>
                <div>
                  <p className="font-heading font-semibold text-primary dark:text-white">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-accent text-sm">
                    {testimonials[activeIndex].business}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() =>
                setActiveIndex(
                  (activeIndex - 1 + testimonials.length) % testimonials.length
                )
              }
              className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-soft border border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="text-primary dark:text-white" size={24} />
            </button>

            {testimonials.length > 0 && (
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-accent' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            )}

            <button
              onClick={() =>
                setActiveIndex((activeIndex + 1) % testimonials.length)
              }
              className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-soft border border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="text-primary dark:text-white" size={24} />
            </button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
