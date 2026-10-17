import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ORGANIZATION_ID } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/site-config';

const SITE_URL = 'https://www.elevatewebandmarketing.com';
const PAGE_URL = `${SITE_URL}/how-to-get-more-customers`;
const TITLE = 'How to Get More Customers Online';
const DESCRIPTION =
  'A plain-English guide for business owners: how an SEO-ready website, Google Business Profile and reviews bring customers who are already searching for you.';
const PUBLISHED = '2026-10-17';

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Elevate Web & Marketing` },
  description: DESCRIPTION,
  alternates: { canonical: '/how-to-get-more-customers' },
  openGraph: {
    type: 'article',
    title: TITLE,
    description: DESCRIPTION,
    url: '/how-to-get-more-customers',
    images: ['/opengraph-image'],
  },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const faqs = [
  {
    q: 'Is a website still worth it if I already sell on Instagram and WhatsApp?',
    a: 'Yes. Social media reaches people who follow you. A website reaches people who are searching Google or asking ChatGPT for what you sell right now, including people who have never heard of you. It is also the one place online that you own.',
  },
  {
    q: 'What does “SEO-optimised website” actually mean?',
    a: 'A website built so Google and AI tools can read it and match it to what people search for: a page for each service or product, answers to the questions customers ask, your location, and the technical setup that lets search engines find every page.',
  },
  {
    q: 'How long before a website brings customers?',
    a: 'It depends on your trade, your city and your competition. Fixing the technical basics can help within weeks, while steady rankings usually take a few months of consistent work. Anyone who promises the number 1 spot on Google is guessing.',
  },
  {
    q: 'Do I need to post on my website regularly?',
    a: 'It helps. Each useful post that answers a real customer question is another way for people to find you. Regular photos and updates on your Google Business Profile also keep it active. Quality matters more than volume.',
  },
];

const checklist = [
  'Search your main service and your city on Google. Do you appear on the map or on page one?',
  'Ask ChatGPT for “the best [your service] in [your city]”. Are you mentioned?',
  'Open your Google Business Profile. Are your services, hours, photos and phone number complete and correct?',
  'Check that your business name, phone number and address are written the same way on your website, Google and Facebook.',
  'Count your Google reviews from the last three months. If the answer is zero, start asking every customer this week.',
  'Look at your website on your phone. Can a customer call or WhatsApp you from the first screen?',
];

const h2 = 'font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mt-12 mb-4';
const p = 'text-text/80 dark:text-gray-300 text-lg leading-relaxed mb-4';

export default function HowToGetMoreCustomersPage() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: TITLE,
      description: DESCRIPTION,
      url: PAGE_URL,
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      image: `${SITE_URL}/opengraph-image`,
      author: {
        '@type': 'Person',
        name: 'Ufuoma Onakpoyan',
        jobTitle: 'Founder, Elevate Web & Marketing',
        url: `${SITE_URL}/about`,
        image: `${SITE_URL}/images/founder-ufuoma-onakpoyan.png`,
      },
      publisher: { '@id': ORGANIZATION_ID },
      mainEntityOfPage: PAGE_URL,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: TITLE, item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];
  const whatsapp = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    'Hi Elevate, I’d like a free SEO check. My business name is: '
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
            <span aria-current="page">How to get more customers</span>
          </nav>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-6">
            How to get more customers from your website
          </h1>
          <p className="text-sm text-text/60 dark:text-gray-400 mb-8">
            By Ufuoma Onakpoyan · Published 17 October 2026
          </p>

          <p className={p}>
            Most business owners who contact us want “a website”. That’s understandable: a website is your business
            card and your own piece of the internet. But a website that nobody can find does nothing for your business.
            A good website has one job: to bring you customers.
          </p>
          <p className={p}>
            This guide explains, in plain English, how that works and what you can check today. It’s about your website
            and Google, not about Instagram, Facebook or paid ads.
          </p>

          <h2 className={h2}>The short answer</h2>
          <p className={p}>
            People already search for what you sell. They type it into Google, look at Google Maps, or ask ChatGPT.
            These people are different from your social media followers: they already have the problem, and they’re
            looking for someone to solve it. Your job is to be easy to find when they search, and easy to trust when
            they find you.
          </p>

          <h2 className={h2}>What Google wants</h2>
          <p className={p}>
            Google wants to send each person to the page that best answers what they searched. Google says its local
            results are based on three things: <strong>relevance</strong> (how well you match the search),{' '}
            <strong>distance</strong> (how close you are to the person searching) and <strong>prominence</strong> (how
            well known and well reviewed you are).
          </p>
          <p className={p}>
            So your website should be the answer to your customers’ questions. Imagine you’re a roofer. Your customers
            search “how much does it cost to roof a house in Abuja?” or “how much to patch a leaking roof?”. If your
            website answers those questions clearly, with your prices, your process and your area, Google is far more
            likely to show it. The person reads your answer, sees you can help, and calls or WhatsApps you.
          </p>

          <h2 className={h2}>Step 1: a website search engines can actually read</h2>
          <p className={p}>
            Many websites look fine to a person but are almost empty to Google and AI tools, because the text only
            appears after code runs in the browser. When we first checked the MR DGN Group website, search engines
            received 0 readable words. After we rebuilt it, they received over 400.
          </p>
          <p className={p}>
            An SEO-ready website has a separate page for each service, and for each product if you sell products, with
            your city in the title. It answers the questions customers ask, includes the technical setup Google needs
            (structured data, a sitemap, fast loading on phones), and is submitted to Google Search Console and Bing.
          </p>

          <h2 className={h2}>Step 2: a complete Google Business Profile</h2>
          <p className={p}>
            Your Google Business Profile is what appears on Google Maps. Google’s own advice is simple: verify it, keep
            your details complete and accurate (category, hours, phone, address), add real photos, and reply to reviews.
            The services on your profile should match the service pages on your website, word for word.
          </p>

          <h2 className={h2}>Step 3: the same details everywhere</h2>
          <p className={p}>
            Your business name, phone number and address should be written the same way on your website, your Google
            profile, Facebook and business directories. When they differ, Google and AI tools are less sure the
            information is right.
          </p>

          <h2 className={h2}>Step 4: reviews from real customers</h2>
          <p className={p}>
            In BrightLocal’s 2026 survey of US consumers, 97% said they read online reviews, and 74% look for reviews
            from the last three months. Nigerian buyers check reviews too, especially before paying someone they’ve never
            met. Ask every customer for an honest review, and reply to each one. Never buy reviews or tell customers what
            to write: it breaks Google’s rules and can get your profile suspended.
          </p>

          <h2 className={h2}>Step 5: keep adding useful content</h2>
          <p className={p}>
            The biggest mistake I see Nigerian businesses make is not taking marketing seriously, at a time when you can
            market from your phone and reach anyone. Content is key, and that includes your website. Every post that
            answers a real customer question is another way for the right person to find you. Add regular photos and
            updates to your Google profile as well. A few good, specific posts beat many empty ones.
          </p>

          <h2 className={h2}>Step 6: show up in ChatGPT and AI answers</h2>
          <p className={p}>
            More people now ask AI tools instead of searching. When AI gives an answer, the businesses it mentions get
            the enquiry. MR DGN Construction, a building materials supplier in Asaba we work with, had a site that wasn’t
            readable by search engines, had no service or product pages, and wasn’t in Google Search Console. We fixed
            all of that and connected it to Bing. On 28 September 2026 the owner received an enquiry from a buyer who
            had found the company through ChatGPT, and asking ChatGPT “I want to buy concrete blocks for my project in
            Asaba” listed MR DGN first.
          </p>

          <h2 className={h2}>What to avoid</h2>
          <ul className="space-y-2 mb-4">
            {[
              'Anyone who guarantees the number 1 spot on Google.',
              'Fake or paid reviews.',
              'Stuffing keywords into your business name, such as “Best Roofer Abuja”.',
              'Buying links or dozens of copy-paste pages for different cities.',
              'A website that hides your phone number, prices or location.',
            ].map((item) => (
              <li key={item} className="text-text/80 dark:text-gray-300 text-lg">• {item}</li>
            ))}
          </ul>

          <h2 className={h2}>A 10-minute checklist for today</h2>
          <ul className="space-y-3 mb-4">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3 text-text/80 dark:text-gray-300 text-lg">
                <Check className="text-accent flex-shrink-0 mt-1.5" size={18} />
                {item}
              </li>
            ))}
          </ul>

          <section className="mt-12 p-8 bg-primary rounded-card-lg">
            <h2 className="font-heading font-bold text-2xl text-white mb-3">Get a free SEO check</h2>
            <p className="text-white/80 mb-6">
              Send us your business name. We’ll check whether you show up on Google and ChatGPT, what your website is
              telling search engines, and what to fix, and we’ll give you a free quote for an SEO-ready website.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsapp}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition-colors"
              >
                <MessageCircle size={20} /> WhatsApp {siteConfig.phone}
              </a>
              <Link
                href="/services/local-seo"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-white font-heading font-semibold hover:text-accent transition-colors"
              >
                See our local SEO service <ArrowRight size={20} />
              </Link>
            </div>
          </section>

          <h2 className={h2}>Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="bg-white dark:bg-slate-800 rounded-card-lg border border-gray-200 dark:border-white/10 p-6">
                <summary className="font-heading font-semibold text-primary dark:text-white cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-text/80 dark:text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>

          <aside className="mt-12 flex gap-5 items-start p-6 rounded-card-lg border border-gray-200 dark:border-white/10">
            <Image
              src="/images/founder-ufuoma-onakpoyan.png"
              alt="Ufuoma Onakpoyan, founder of Elevate Web & Marketing"
              width={80}
              height={82}
              className="rounded-full flex-shrink-0"
            />
            <div>
              <p className="font-heading font-semibold text-primary dark:text-white">About the author</p>
              <p className="text-text/80 dark:text-gray-300 leading-relaxed">
                Ufuoma Onakpoyan is the founder of Elevate Web & Marketing, based in Abuja. Ufuoma builds SEO-ready websites
                for businesses in Nigeria and the UK and also works in Abuja real estate, which means seeing both sides: the
                business owner who needs customers, and the buyer searching online.{' '}
                <Link href="/about" className="text-accent hover:underline">More about Elevate</Link>.
              </p>
            </div>
          </aside>

          <p className="text-sm text-text/60 dark:text-gray-400 mt-8">
            Sources:{' '}
            <a href="https://support.google.com/business/answer/7091" className="underline" rel="noopener">
              Google Business Profile Help
            </a>
            ;{' '}
            <a href="https://www.brightlocal.com/research/local-consumer-review-survey/" className="underline" rel="noopener">
              BrightLocal Local Consumer Review Survey 2026
            </a>
            .
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
