import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import SearchConsoleEvidence from '@/components/sections/SearchConsoleEvidence';
import AuthorBio from '@/components/sections/AuthorBio';
import { ORGANIZATION_ID } from '@/components/seo/JsonLd';
import { evidence } from '@/lib/evidence';
import { siteConfig } from '@/lib/site-config';

const BASE = 'https://www.elevatewebandmarketing.com';
const PATH = '/case-studies/mansa-luxe-realty';
const TITLE = 'Mansa Luxe Realty: A Real Estate SEO Case Study';
const DESCRIPTION = 'How we structured Mansa Luxe Realty’s property website for search, with monthly Google impressions and clicks from May to October 2026 and the limits of the results.';

export const metadata: Metadata = {
  title: { absolute: 'Mansa Luxe Realty SEO Case Study | Elevate Web & Marketing' },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'article', title: TITLE, description: DESCRIPTION, url: PATH, images: ['/opengraph-image'] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/twitter-image'] },
};

const heading = 'font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mt-12 mb-4';
const paragraph = 'text-text/80 dark:text-gray-300 text-lg leading-relaxed mb-4';

export default function MansaLuxeCaseStudy() {
  const months = evidence['real-estate-abuja-asaba'].months;
  const clicks = months.reduce((sum, month) => sum + month.clicks, 0);
  const whatsapp = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hi Elevate, I read the Mansa Luxe Realty case study. Can we discuss the search visibility of my business website?')}`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article', headline: TITLE, description: DESCRIPTION,
        url: `${BASE}${PATH}`, mainEntityOfPage: `${BASE}${PATH}`,
        datePublished: '2026-11-27', dateModified: '2026-11-27', image: `${BASE}/opengraph-image`,
        author: { '@type': 'Person', name: 'Ufuoma Onakpoyan', url: `${BASE}/about` },
        publisher: { '@id': ORGANIZATION_ID },
        about: { '@type': 'Organization', name: 'Mansa Luxe Realty', url: 'https://mansaluxerealty.mrdgngroup.com' },
      }) }} />
      <BreadcrumbJsonLd crumbs={[
        { name: 'Home', url: BASE }, { name: 'Case Studies', url: `${BASE}/case-studies` },
        { name: 'Mansa Luxe Realty', url: `${BASE}${PATH}` },
      ]} />
      <Header />
      <main className="pt-32 sm:pt-36 md:pt-40 pb-20 bg-background dark:bg-slate-900">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-text/60 dark:text-gray-400 mb-6">
            <Link href="/">Home</Link><span className="mx-2">/</span>
            <Link href="/case-studies">Case Studies</Link><span className="mx-2">/</span>
            <span aria-current="page">Mansa Luxe Realty</span>
          </nav>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-5">{TITLE}</h1>
          <p className="text-sm text-text/60 dark:text-gray-400 mb-8">By Ufuoma Onakpoyan · Published <time dateTime="2026-11-27">27 November 2026</time></p>
          <p className={paragraph}>Mansa Luxe Realty sells homes in Abuja and land in Asaba. We built its website around the properties and areas buyers need to research, with a direct route from a listing to an enquiry.</p>
          <p className={paragraph}>Monthly Google web search impressions rose from 46 in May 2026 to 843 in October 2026. The same six-month record contains {clicks} search clicks. These are early visibility results, with plenty of room to grow.</p>

          <h2 className={heading}>The business and the brief</h2>
          <p className={paragraph}>A property buyer needs more than a photograph. They need the location, price, specifications and a way to ask questions or arrange a viewing. The site needed to make that information available on individual property pages and help buyers explore relevant areas.</p>
          <p className={paragraph}>Ufuoma operates both Mansa Luxe Realty and Elevate Web &amp; Marketing. This is an owner-operated business example, and the figures are our own reporting of its Search Console exports.</p>

          <h2 className={heading}>What we changed</h2>
          <ul className="list-disc pl-6 space-y-3 text-text/80 dark:text-gray-300 text-lg mb-6">
            <li>Rebuilt the public site so search engines receive readable property text, headings and links in the HTML.</li>
            <li>Gave properties and relevant areas their own pages, with buyer guides supporting the listings.</li>
            <li>Made property details and enquiry paths easy to find, so interested buyers can discuss a home or arrange a viewing.</li>
          </ul>
          <p className={paragraph}>The same foundations are part of our <Link href="/services/website-design" className="text-accent hover:underline">business website design</Link> and <Link href="/services/local-seo" className="text-accent hover:underline">local SEO services</Link>. Scope depends on your existing website and the services you offer.</p>

          <h2 className={heading}>The monthly Search Console record</h2>
          <SearchConsoleEvidence id="real-estate-abuja-asaba" />
          <p className={`${paragraph} mt-5`}>An impression means the website appeared in a search result. A click means someone clicked a result. Neither metric records a qualified property enquiry, inspection or completed sale.</p>
          <p className={paragraph}>The chart also records 363 Google AI Overview appearances across the six months. That is a separate visibility measure; we do not add it to web impressions or treat it as ChatGPT traffic.</p>

          <h2 className={heading}>What these results tell us</h2>
          <p className={paragraph}>Google was showing the site more often by October. The monthly click totals also show why visibility alone is not the end goal: October recorded 13 clicks from 843 impressions. The next step is to inspect the queries and landing pages, improve the pages attracting relevant buyers, and record which enquiries become viewings.</p>
          <p className={paragraph}>This is a before-and-after observation, not a controlled experiment. Listing inventory, search demand, competition and Google’s systems can all change. The data does not isolate the effect of a single change or establish a ranking or lead guarantee for another business.</p>

          <h2 className={heading}>See the website and discuss your own</h2>
          <p className={paragraph}>Visit <a href="https://mansaluxerealty.mrdgngroup.com" className="text-accent hover:underline">Mansa Luxe Realty</a> or see the <Link href="/portfolio/3" className="text-accent hover:underline">website project</Link>. For your business, we start with the services customers search for, what your pages currently show, and how visitors can contact you.</p>
          <div className="flex flex-wrap gap-4 my-8">
            <a href={whatsapp} className="inline-flex items-center min-h-[44px] px-5 py-3 bg-accent text-white rounded-xl font-semibold">Discuss your website on WhatsApp</a>
            <Link href="/get-quote" className="inline-flex items-center text-accent font-semibold hover:underline">Request a quote</Link>
          </div>
          <AuthorBio />
        </article>
      </main>
      <Footer />
    </>
  );
}
