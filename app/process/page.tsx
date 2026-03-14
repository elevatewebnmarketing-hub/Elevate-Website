'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProcessSection from '@/components/sections/Process';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function ProcessPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-background dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-4">
              Our Process
            </h1>
            <p className="text-text/80 dark:text-gray-300 text-lg max-w-2xl">
              A proven approach to delivering results. We work in clear phases so you always know what&apos;s next.
            </p>
          </motion.div>
        </div>
        <ProcessSection showHeading={false} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-8 border-t border-gray-200 dark:border-white/10 mt-16"
        >
          <p className="text-text/80 dark:text-gray-300 mb-6">
            Ready to start your project? We typically begin with a discovery call to understand your goals.
          </p>
          <Button variant="primary" size="lg" href="/contact">
            Book a Strategy Call
          </Button>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
