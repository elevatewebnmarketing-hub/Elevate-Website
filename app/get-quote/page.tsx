'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TikTokViewContent from '@/components/analytics/TikTokViewContent';
import ProjectInquiryForm from '@/components/forms/ProjectInquiryForm';

const next = [
  { title: 'We read your answers', body: 'Ufuoma, the founder, reads every request.' },
  { title: 'You get a quote within 48 hours', body: 'A fixed price for the package that fits, with what is included and the timeline.' },
  { title: 'We agree the scope', body: 'A short WhatsApp or video call to confirm the pages, profiles or ads you need.' },
];

export default function GetQuotePage() {
  return (
    <>
      <TikTokViewContent contentName="Get a Quote" />
      <Header />
      <main className="pt-28 sm:pt-32 pb-16 lg:pb-20 min-h-screen bg-background dark:bg-slate-900">
        <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-14 items-start">
          <div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-4">Request a quote</h1>
            <p className="text-text/80 dark:text-gray-300 text-lg mb-8 max-w-xl">
              Five quick questions, then a fixed price within 48 hours. Prices for every package are also on our{' '}
              <Link href="/pricing" className="text-accent font-semibold hover:underline">pricing page</Link>.
            </p>
            <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mb-5">What happens next</h2>
            <ol className="space-y-5">
              {next.map((n, i) => (
                <li key={n.title} className="flex gap-4">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-accent text-white font-heading font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-heading font-semibold text-primary dark:text-white">{n.title}</span>
                    <span className="block text-text/80 dark:text-gray-300">{n.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <ul className="mt-10 space-y-2 text-sm text-text/70 dark:text-gray-400">
              {['No lock-in contracts', 'You own the website, domain and accounts', 'Ad budgets are paid to Google or Meta directly'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check size={16} className="text-accent" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:sticky lg:top-28">
            <ProjectInquiryForm variant="quote" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
