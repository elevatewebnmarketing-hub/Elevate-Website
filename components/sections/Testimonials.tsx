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

// Real 5-star Google reviews, quoted word for word. Add new ones only from the Google profile.
const defaultTestimonials: Testimonial[] = [
  {
    id: 'g-mrdgn',
    name: 'MrDGN',
    business: 'MR DGN Group · Google review',
    review: 'Multiple Website projects well done',
  },
  {
    id: 'g-bsg',
    name: 'Experience Bsg',
    business: 'Experience BSG · Google review',
    review: 'I love the website they created for my business. Very professional',
  },
  {
    id: 'g-alek',
    name: 'Alek Malek',
    business: 'Runway Refined by Alec · Google review',
    review: 'Amazing work, very professional! I’m pleased with my website',
  },
];

export default function Testimonials() {
  // Managed in code (defaultTestimonials above), not the admin panel.
  const testimonials = defaultTestimonials;
  const [activeIndex, setActiveIndex] = useState(0);

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
