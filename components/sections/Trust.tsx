'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const startTime = Date.now();
    const startValue = 0;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (value - startValue) * easeOut);
      setDisplayValue(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 50, suffix: '+', label: 'Websites Built' },
  { value: 20, suffix: '+', label: 'Businesses Helped' },
  { value: 24, suffix: 'hr', label: 'Fast Delivery' },
];

export default function Trust() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary text-white rounded-card-lg py-16 px-6 sm:px-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none" aria-hidden />
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="font-heading font-bold text-5xl sm:text-6xl text-white mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/90 font-medium text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
