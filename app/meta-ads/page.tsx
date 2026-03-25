import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/lib/site-config';
import { ArrowRight } from 'lucide-react';
import MetaAdsJsonLd from '@/components/seo/MetaAdsJsonLd';

const SITE_URL = 'https://elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Meta Ads (Facebook & Instagram) | Elevate Web & Marketing',
  description:
    'Facebook Ads and Instagram Ads managed with Meta Pixel tracking, disciplined creative testing, and conversion-focused landing pages—so your paid social becomes measurable growth.',
  alternates: { canonical: '/meta-ads' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/meta-ads`,
    siteName: siteConfig.companyName,
    title: 'Meta Ads (Facebook & Instagram) | Elevate Web & Marketing',
    description:
      'Facebook Ads and Instagram Ads managed with Meta Pixel tracking, disciplined creative testing, and conversion-focused landing pages.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Elevate Web & Marketing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meta Ads (Facebook & Instagram) | Elevate Web & Marketing',
    description:
      'Facebook Ads and Instagram Ads managed with Meta Pixel tracking, disciplined creative testing, and conversion-focused landing pages.',
    images: ['/twitter-image'],
  },
};

export default function MetaAdsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-background dark:bg-slate-900">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 hero-radial" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" aria-hidden />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6">
                Facebook Ads + Instagram Ads
              </div>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary dark:text-white leading-tight">
                Meta Ads that turn attention into customers
              </h1>
              <p className="text-text/80 dark:text-gray-300 text-lg sm:text-xl mt-6 leading-relaxed">
                Elevate Web &amp; Marketing helps brands run Meta Ads across Facebook and Instagram
                with tracking that’s accurate, creative that’s tested, and landing pages that convert.
                From Nigeria to worldwide, we build growth systems—not guesswork.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/get-quote"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-heading font-semibold rounded-xl shadow-soft hover:bg-accent/90 transition-colors min-h-[44px]"
                >
                  Request a Meta Ads Quote
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/case-studies?service=meta-ads"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 dark:border-white/20 text-primary dark:text-white font-heading font-semibold rounded-xl hover:border-accent hover:text-accent transition-colors min-h-[44px]"
                >
                  See Results
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SEO structured data */}
        <MetaAdsJsonLd />

        {/* What you get */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-1">
                <h2 className="font-heading font-bold text-3xl text-primary dark:text-white">
                  What you get
                </h2>
                <p className="text-text/80 dark:text-gray-300 mt-4 leading-relaxed">
                  A complete Meta Ads system that connects the ad to the action.
                </p>
              </div>
              <div className="lg:col-span-2">
                <ul className="space-y-4">
                  <li className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-white/10 rounded-card-lg p-5">
                    <p className="font-heading font-semibold text-primary dark:text-white">
                      Meta Pixel + event setup (Facebook &amp; Instagram)
                    </p>
                    <p className="text-text/80 dark:text-gray-300 text-sm mt-2">
                      Ensure conversions are tracked correctly so optimization isn’t guessing.
                    </p>
                  </li>
                  <li className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-white/10 rounded-card-lg p-5">
                    <p className="font-heading font-semibold text-primary dark:text-white">
                      Creative testing that compounds
                    </p>
                    <p className="text-text/80 dark:text-gray-300 text-sm mt-2">
                      Hooks, formats, and angles tested on a cadence to reduce creative fatigue.
                    </p>
                  </li>
                  <li className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-white/10 rounded-card-lg p-5">
                    <p className="font-heading font-semibold text-primary dark:text-white">
                      Conversion-focused landing pages
                    </p>
                    <p className="text-text/80 dark:text-gray-300 text-sm mt-2">
                      Align the landing page with the ad promise so clicks turn into leads/sales.
                    </p>
                  </li>
                  <li className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-white/10 rounded-card-lg p-5">
                    <p className="font-heading font-semibold text-primary dark:text-white">
                      Reporting you can act on
                    </p>
                    <p className="text-text/80 dark:text-gray-300 text-sm mt-2">
                      Clear performance insights, next-step recommendations, and measurement checks.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-12 sm:py-16 bg-white/60 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="font-heading font-bold text-3xl text-primary dark:text-white">
                  How it works
                </h2>
                <p className="text-text/80 dark:text-gray-300 mt-4 leading-relaxed">
                  Meta Ads is a system. We run it like one.
                </p>
              </div>
              <div className="space-y-4">
                <ol className="space-y-4">
                  <li className="bg-background dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-card-lg p-5">
                    <p className="font-heading font-semibold text-primary dark:text-white">1. Discovery &amp; goals</p>
                    <p className="text-text/80 dark:text-gray-300 text-sm mt-2">
                      Define your conversion, budget, audience, and creative direction.
                    </p>
                  </li>
                  <li className="bg-background dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-card-lg p-5">
                    <p className="font-heading font-semibold text-primary dark:text-white">2. Tracking &amp; setup</p>
                    <p className="text-text/80 dark:text-gray-300 text-sm mt-2">
                      Validate Pixel events and ensure your website captures leads/sales cleanly.
                    </p>
                  </li>
                  <li className="bg-background dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-card-lg p-5">
                    <p className="font-heading font-semibold text-primary dark:text-white">3. Creative testing</p>
                    <p className="text-text/80 dark:text-gray-300 text-sm mt-2">
                      Launch structured tests across Facebook and Instagram placements.
                    </p>
                  </li>
                  <li className="bg-background dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-card-lg p-5">
                    <p className="font-heading font-semibold text-primary dark:text-white">4. Optimization &amp; scale</p>
                    <p className="text-text/80 dark:text-gray-300 text-sm mt-2">
                      Double down on winners, refresh creative, and keep measurement trustworthy.
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Proof */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <h2 className="font-heading font-bold text-3xl text-primary dark:text-white">
                  Proof, not promises
                </h2>
                <p className="text-text/80 dark:text-gray-300 mt-4 leading-relaxed">
                  See the types of outcomes our team builds when tracking and creative work together.
                </p>
              </div>
              <Link
                href="/case-studies?service=meta-ads"
                className="inline-flex items-center gap-2 text-accent font-heading font-semibold hover:underline"
              >
                View Meta Ads Case Studies
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-white/10 rounded-card-lg p-6">
                <p className="text-accent font-heading font-semibold">Higher-qualified leads</p>
                <p className="text-text/80 dark:text-gray-300 text-sm mt-2">
                  Conversion-focused landing pages tied to Pixel events.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-white/10 rounded-card-lg p-6">
                <p className="text-accent font-heading font-semibold">Lower cost per acquisition</p>
                <p className="text-text/80 dark:text-gray-300 text-sm mt-2">
                  Creative testing + measurement checks to reduce waste.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-white/10 rounded-card-lg p-6">
                <p className="text-accent font-heading font-semibold">Clear optimization roadmap</p>
                <p className="text-text/80 dark:text-gray-300 text-sm mt-2">
                  Reporting that tells you what to do next.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 bg-white/60 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="font-heading font-bold text-3xl text-primary dark:text-white">FAQ</h2>
              <p className="text-text/80 dark:text-gray-300 mt-4 leading-relaxed">
                Quick answers about Facebook Ads, Instagram Ads, and running Meta campaigns with confidence.
              </p>
            </div>

            <div className="space-y-4">
              <details className="bg-background dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-card-lg p-5">
                <summary className="cursor-pointer font-heading font-semibold text-primary dark:text-white">
                  Do you manage both Facebook Ads and Instagram Ads?
                </summary>
                <p className="text-text/80 dark:text-gray-300 text-sm mt-3">
                  Yes. Meta Ads lets you run across Facebook and Instagram placements using the same campaign system.
                  We structure your tests so you can learn quickly and optimize properly.
                </p>
              </details>

              <details className="bg-background dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-card-lg p-5">
                <summary className="cursor-pointer font-heading font-semibold text-primary dark:text-white">
                  What tracking do you use for conversions?
                </summary>
                <p className="text-text/80 dark:text-gray-300 text-sm mt-3">
                  We use the Meta Pixel and align the events you care about with your website’s conversion flow.
                  That way, optimization is based on real actions—not vanity metrics.
                </p>
              </details>

              <details className="bg-background dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-card-lg p-5">
                <summary className="cursor-pointer font-heading font-semibold text-primary dark:text-white">
                  How do you handle creative fatigue?
                </summary>
                <p className="text-text/80 dark:text-gray-300 text-sm mt-3">
                  Creative performance changes over time. We keep a testing cadence—refreshing hooks and formats—
                  so you maintain efficiency even as audiences respond differently.
                </p>
              </details>

              <details className="bg-background dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-card-lg p-5">
                <summary className="cursor-pointer font-heading font-semibold text-primary dark:text-white">
                  Do you only work on ads, or also the website?
                </summary>
                <p className="text-text/80 dark:text-gray-300 text-sm mt-3">
                  We do both. A Meta ad can earn the click, but your website must finish the job—speed, clarity, and CTAs.
                  We align landing pages with your campaign promise to increase conversion rate.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

