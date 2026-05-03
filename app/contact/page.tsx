'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FinalCTASection from '@/components/sections/FinalCTA';
import { openCalendly } from '@/lib/calendly';
import { siteConfig } from '@/lib/site-config';

export default function ContactPage() {
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
      service: (fd.get('service') as string) || undefined,
      timeline: (fd.get('timeline') as string) || undefined,
      budget: (fd.get('budget') as string) || undefined,
      message: (fd.get('message') as string) ?? '',
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
      <main className="pt-24 pb-16 min-h-screen bg-background dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              <div>
                <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-4">
                  Let&apos;s build a website that earns trust faster.
                </h1>
                <p className="text-text/80 dark:text-gray-300 text-lg max-w-xl">
                  Tell us what you are building and we will point you toward the simplest
                  package that fits. We usually reply within 48 hours.
                </p>
                <button
                  type="button"
                  onClick={openCalendly}
                  className="inline-flex items-center justify-center min-h-[44px] px-8 py-4 bg-accent text-white font-heading font-semibold text-lg rounded-xl shadow-soft hover:bg-accent/90 hover:shadow-soft-lg transition-all duration-200 mt-6"
                >
                  Book a Free Strategy Call
                </button>
              </div>

              <div className="space-y-6">
                <a href={`mailto:${siteConfig.contactEmail}`} className="flex items-start gap-4 group min-w-0">
                  <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail className="text-accent" size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-semibold text-primary dark:text-gray-300 text-sm uppercase tracking-wide text-text/70 dark:text-gray-400">
                      Email
                    </p>
                    <p className="text-accent font-medium mt-0.5 hover:underline break-all">
                      {siteConfig.contactEmail}
                    </p>
                  </div>
                </a>

                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="flex items-start gap-4 group min-w-0">
                  <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone className="text-accent" size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-semibold text-primary dark:text-gray-300 text-sm uppercase tracking-wide text-text/70 dark:text-gray-400">
                      Phone
                    </p>
                    <p className="text-accent font-medium mt-0.5 hover:underline break-words">
                      {siteConfig.phone}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Clock className="text-accent" size={22} />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-primary dark:text-gray-300 text-sm uppercase tracking-wide text-text/70 dark:text-gray-400">
                      Hours
                    </p>
                    <p className="text-primary dark:text-white font-medium mt-0.5">Monday to Friday</p>
                    <p className="text-text/70 dark:text-gray-400 text-sm mt-0.5">9:00 AM to 6:00 PM WAT</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-accent" size={22} />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-primary dark:text-gray-300 text-sm uppercase tracking-wide text-text/70 dark:text-gray-400">
                      Base
                    </p>
                    <p className="text-primary dark:text-white font-medium mt-0.5">Lagos, Nigeria</p>
                    <p className="text-text/70 dark:text-gray-400 text-sm mt-0.5">
                      Working with clients internationally
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-card-lg overflow-hidden shadow-soft border border-gray-100 dark:border-white/10 bg-white dark:bg-slate-800">
                <div className="aspect-[16/10] relative bg-primary/5">
                  <Image
                    src="/images/founder-ufuoma-onakpoyan.png"
                    alt="Ufuoma Onakpoyan"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 400px"
                  />
                </div>
                <div className="p-4">
                  <p className="font-heading font-bold text-sm text-primary dark:text-white mb-1">
                    Lagos-based team, international delivery
                  </p>
                  <p className="text-sm text-text/80 dark:text-gray-300 font-body">
                    We keep the process clear, the scope focused, and the communication reliable.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-white dark:bg-slate-800 rounded-card-lg border border-gray-200 dark:border-white/10 shadow-soft-xl p-6 sm:p-8">
                <h2 className="font-heading font-bold text-2xl text-primary dark:text-white mb-6">
                  Project Inquiry
                </h2>
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
                        className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white placeholder:text-text/50 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
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
                        className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white placeholder:text-text/50 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="website" className="block font-body font-medium text-primary dark:text-gray-200 text-sm mb-1.5">
                      Current Website <span className="text-text/50 dark:text-gray-500">(optional)</span>
                    </label>
                    <input
                      id="website"
                      type="url"
                      name="website"
                      className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white placeholder:text-text/50 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
                      placeholder="https://"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block font-body font-medium text-primary dark:text-gray-200 text-sm mb-1.5">
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
                    >
                      <option value="">Select an option</option>
                      <option value="starter-website">Starter Website</option>
                      <option value="business-website">Business Website</option>
                      <option value="ecommerce-website">E-commerce Website</option>
                      <option value="website-redesign">Website Redesign</option>
                      <option value="local-visibility">Local Visibility Support</option>
                      <option value="website-care">Website Care Plan</option>
                      <option value="custom-project">Custom Project</option>
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="timeline" className="block font-body font-medium text-primary dark:text-gray-200 text-sm mb-1.5">
                        Expected Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
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
                        Project Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
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
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/20 bg-background/50 dark:bg-slate-700/50 text-primary dark:text-white placeholder:text-text/50 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors resize-y min-h-[100px]"
                      placeholder="Tell us about your business, what you need the website to do, and any deadline you have in mind."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto min-h-[44px] px-8 py-4 bg-accent text-white font-heading font-semibold rounded-xl shadow-soft hover:bg-accent/90 hover:shadow-soft-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send Inquiry'}
                  </button>
                  {success && (
                    <p className="text-accent font-medium text-sm">
                      Thanks! We&apos;ll get back to you within 48 hours.
                    </p>
                  )}
                  {error && (
                    <p className="text-red-600 dark:text-red-400 font-medium text-sm">
                      {error}
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>

          <FinalCTASection isCompact />
        </div>
      </main>
      <Footer />
    </>
  );
}
