'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function GetQuotePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const form = formRef.current;
    if (!form) return;

    const fd = new FormData(form);
    const payload = {
      name: (fd.get('name') as string) ?? '',
      email: (fd.get('email') as string) ?? '',
      website: (fd.get('website') as string) || undefined,
      projectType: (fd.get('projectType') as string) || undefined,
      industry: (fd.get('industry') as string) || undefined,
      service: (fd.get('service') as string) || undefined,
      timeline: (fd.get('timeline') as string) || undefined,
      budget: (fd.get('budget') as string) || undefined,
      message: (fd.get('message') as string) ?? '',
      source: 'quote',
    };

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : 'Something went wrong. Please try again.');
        return;
      }
      setSuccess(true);
      form.reset();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="pt-32 sm:pt-36 md:pt-40 pb-20 min-h-screen bg-background dark:bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-6">
              <FileText className="text-accent" size={28} />
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-4">
              Request a Quote
            </h1>
            <p className="text-text/80 dark:text-gray-300 text-lg">
              Share the basics and we will send a directionally useful quote within 48 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-card-lg border border-gray-200 dark:border-white/10 shadow-soft-xl p-6 sm:p-8"
          >
            <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block font-body font-medium text-primary dark:text-gray-200 text-sm mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white placeholder:text-text/50 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-body font-medium text-primary dark:text-gray-200 text-sm mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white placeholder:text-text/50 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block font-body font-medium text-primary dark:text-gray-200 text-sm mb-1.5">
                  Current Website <span className="text-text/50">(optional)</span>
                </label>
                <input
                  id="website"
                  type="url"
                  name="website"
                  className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white placeholder:text-text/50 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  placeholder="https://"
                />
              </div>

              <div>
                <label htmlFor="projectType" className="block font-body font-medium text-primary dark:text-gray-200 text-sm mb-1.5">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                >
                  <option value="">Select</option>
                  <option value="new-website">New Website</option>
                  <option value="website-redesign">Website Redesign</option>
                  <option value="landing-page">Landing Page</option>
                  <option value="ecommerce">E-commerce Website</option>
                  <option value="ongoing-support">Ongoing Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="industry" className="block font-body font-medium text-primary dark:text-gray-200 text-sm mb-1.5">
                  Industry / Business Type
                </label>
                <input
                  id="industry"
                  type="text"
                  name="industry"
                  className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white placeholder:text-text/50 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  placeholder="e.g. Roofing, consulting, real estate, education"
                />
              </div>

              <div>
                <label htmlFor="service" className="block font-body font-medium text-primary dark:text-gray-200 text-sm mb-1.5">
                  Services Needed
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                >
                  <option value="">Select</option>
                  <option value="starter-website">Starter Website</option>
                  <option value="business-website">Business Website</option>
                  <option value="ecommerce-website">E-commerce Website</option>
                  <option value="website-redesign">Website Redesign</option>
                  <option value="local-visibility">Local Visibility Support</option>
                  <option value="paid-growth">Paid Growth Support</option>
                  <option value="website-care">Website Care Plan</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="timeline" className="block font-body font-medium text-primary dark:text-gray-200 text-sm mb-1.5">
                    Preferred Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  >
                    <option value="">Select</option>
                    <option value="asap">ASAP</option>
                    <option value="2-4-weeks">2 to 4 weeks</option>
                    <option value="1-2-months">1 to 2 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block font-body font-medium text-primary dark:text-gray-200 text-sm mb-1.5">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  >
                    <option value="">Select</option>
                    <option value="under-1500">Under $1,500</option>
                    <option value="1500-2500">$1,500 to $2,500</option>
                    <option value="2500-5000">$2,500 to $5,000</option>
                    <option value="5000-plus">$5,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block font-body font-medium text-primary dark:text-gray-200 text-sm mb-1.5">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white placeholder:text-text/50 focus:ring-2 focus:ring-accent focus:border-accent outline-none resize-y min-h-[100px]"
                  placeholder="Describe the business, the website you need, and anything that must be included."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[44px] px-8 py-4 bg-accent text-white font-heading font-semibold rounded-xl shadow-soft hover:bg-accent/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Request Quote'}
              </button>
              {success && (
                <p className="text-accent font-medium text-sm">
                  Thanks! We&apos;ll send your quote within 48 hours.
                </p>
              )}
              {error && (
                <p className="text-red-600 dark:text-red-400 font-medium text-sm">{error}</p>
              )}
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
