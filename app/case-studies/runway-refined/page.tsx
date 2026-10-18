import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ORGANIZATION_ID } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/site-config';

const SITE_URL = 'https://www.elevatewebandmarketing.com';
const PAGE_URL = `${SITE_URL}/case-studies/runway-refined`;
const TITLE = 'Runway Refined by Alek: A Website for a UK Model Coach';
const DESCRIPTION =
  'Case study: a website for Runway Refined by Alek, a UK-based model coach, with coaching packages in pounds, checkout on the page, resources and a client portal.';

export const metadata: Metadata = {
  title: { absolute: 'Runway Refined Case Study | Elevate Web & Marketing' },
  description: DESCRIPTION,
  alternates: { canonical: '/case-studies/runway-refined' },
  openGraph: { type: 'article', title: TITLE, description: DESCRIPTION, url: '/case-studies/runway-refined', images: ['/opengraph-image'] },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const built = [
  'Coaching packages priced in pounds, each with options, a running total and secure checkout on the same page',
  'An About page telling Alek’s story and coaching approach: runway craft, mindset, and brand and content',
  'Portfolio, journal, testimonials and FAQ pages',
  'A free resources area with an email sign-up that feeds Alek’s leads inbox',
  'An admin portal where Alek can upload resources (PDFs and videos) and check payments, without a developer',
  'A fast, server-rendered build with optimised images, so the site loads quickly on phones worldwide',
];

const h2 = 'font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mt-12 mb-4';
const p = 'text-text/80 dark:text-gray-300 text-lg leading-relaxed mb-4';

export default function RunwayRefinedCaseStudy() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: TITLE,
      description: DESCRIPTION,
      url: PAGE_URL,
      datePublished: '2026-10-18',
      image: `${SITE_URL}/opengraph-image`,
      author: { '@type': 'Person', name: 'Ufuoma Onakpoyan', url: `${SITE_URL}/about` },
      publisher: { '@id': ORGANIZATION_ID },
      about: { '@type': 'Organization', name: 'Runway Refined by Alek', url: 'https://www.runwayrefinedbyalek.com' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE_URL}/case-studies` },
        { '@type': 'ListItem', position: 3, name: 'Runway Refined by Alek', item: PAGE_URL },
      ],
    },
  ];
  const whatsapp = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    'Hi Elevate, I saw the Runway Refined case study and I’d like a website for my coaching business.'
  )}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <Header />
      <main className="pt-32 sm:pt-36 md:pt-40 pb-20 bg-background dark:bg-slate-900">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-text/60 dark:text-gray-400 mb-6">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/case-studies" className="hover:text-accent">Case Studies</Link>
            <span className="mx-2">/</span>
            <span aria-current="page">Runway Refined by Alek</span>
          </nav>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-6">
            Runway Refined by Alek: a website for a UK model coach
          </h1>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 text-sm">
            {[
              ['Client', 'Alek Deng Malek'],
              ['Location', 'UK, coaching worldwide'],
              ['Industry', 'Model coaching'],
              ['Scope', 'Website design and build'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-text/60 dark:text-gray-400">{k}</dt>
                <dd className="font-heading font-semibold text-primary dark:text-white">{v}</dd>
              </div>
            ))}
          </dl>

          <h2 className={h2}>The client</h2>
          <p className={p}>
            Alek Deng Malek is a UK-based model coach who works with aspiring and working models around the world. After
            facing rejection early in a modelling career, Alek learned what agencies look for and now coaches models on
            runway craft, confidence and personal brand, so they can turn attention into paid bookings.
          </p>

          <h2 className={h2}>The brief</h2>
          <p className={p}>
            Many of Alek’s clients discover the coaching through social media, so the website had to turn that attention
            into bookings: explain each coaching package clearly, show the portfolio, and take payment. Clients are spread
            across countries, so the site had to work on any phone, show prices in pounds, and let someone book and pay
            without a back-and-forth on messages.
          </p>

          <h2 className={h2}>What we built</h2>
          <ul className="space-y-3 mb-4">
            {built.map((item) => (
              <li key={item} className="flex items-start gap-3 text-text/80 dark:text-gray-300 text-lg">
                <Check className="text-accent flex-shrink-0 mt-1.5" size={18} />
                {item}
              </li>
            ))}
          </ul>
          <p className={p}>
            This project was a website design and build. It didn’t include our SEO service, so we don’t claim search
            rankings for it.
          </p>

          <h2 className={h2}>The result</h2>
          <p className={p}>
            The site is live at{' '}
            <a href="https://www.runwayrefinedbyalek.com" className="text-accent hover:underline" rel="noopener">
              runwayrefinedbyalek.com
            </a>
            , and Alek can update resources and see payments from the admin portal. Alek’s Google review of our work:
          </p>
          <blockquote className="border-l-4 border-accent pl-5 my-6 text-xl font-heading text-primary dark:text-white">
            “Amazing work, very professional! I’m pleased with my website.”
            <footer className="mt-2 text-sm font-sans text-text/60 dark:text-gray-400">Alek Malek, Google review</footer>
          </blockquote>

          <h2 className={h2}>What this means for coaches and personal brands</h2>
          <p className={p}>
            If your clients find you on Instagram or TikTok, your website is where attention becomes income: clear
            packages, prices, proof and a way to pay. Add SEO, and the site can also bring people who search for what you
            offer, or ask ChatGPT for a recommendation.
          </p>

          <section className="mt-12 p-8 bg-primary rounded-card-lg">
            <h2 className="font-heading font-bold text-2xl text-white mb-3">Want a site like this?</h2>
            <p className="text-white/80 mb-6">
              Tell us about your coaching or personal brand. We’ll send a free check of your current presence and a fixed
              quote in pounds or dollars.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsapp}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition-colors"
              >
                <MessageCircle size={20} /> WhatsApp us
              </a>
              <Link
                href="/uk"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-white font-heading font-semibold hover:text-accent transition-colors"
              >
                Websites for UK businesses <ArrowRight size={20} />
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
