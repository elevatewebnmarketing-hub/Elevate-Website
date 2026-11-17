import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ORGANIZATION_ID } from '@/components/seo/JsonLd';
import { COUNTRIES, LAST_28, MONTHLY, NOT_YET, PREV_28, SOURCE, TOP_PAGES, TOTALS } from '@/lib/case-study-elevate';

const SITE_URL = 'https://www.elevatewebandmarketing.com';
const SLUG = '/case-studies/elevate-web-and-marketing';
const TITLE = 'Our Own Website: 8 Months of Search Data, Shown in Public';
const DESCRIPTION =
  'Case study: how Elevate Web & Marketing’s own website is doing on Google, with real Search Console numbers: what is working, what is not yet, and what we are doing next.';

export const metadata: Metadata = {
  title: { absolute: 'Our Own Website Case Study | Elevate Web & Marketing' },
  description: DESCRIPTION,
  alternates: { canonical: SLUG },
  openGraph: { type: 'article', title: TITLE, description: DESCRIPTION, url: SLUG, images: ['/opengraph-image'] },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const built = [
  'Every page is rendered on the server, so Google, Bing and AI assistants read the full text without running JavaScript',
  'A page for each service and for each place we serve (Abuja, Asaba, Lagos, the rest of Nigeria, the UK and the US)',
  'A Google Business Profile for the Asaba office, linked from the website, with the map on the contact page and in the footer',
  'Structured data (Organization and LocalBusiness), an XML sitemap and IndexNow, so new pages are discovered quickly',
  'An llms.txt file and no blocks on AI search crawlers, so ChatGPT, Perplexity and Claude can read the site',
  'Guides and blog posts that answer the questions our clients ask, plus a free AI visibility check',
];

const h2 = 'font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mt-12 mb-4';
const p = 'text-text/80 dark:text-gray-300 text-lg leading-relaxed mb-4';
const n = (x: number) => x.toLocaleString('en-GB');

function ImpressionsChart() {
  const max = Math.max(...MONTHLY.map((m) => m.impressions));
  const W = 640;
  const H = 220;
  const bw = W / MONTHLY.length;
  return (
    <figure className="my-8">
      <svg viewBox={`0 0 ${W} ${H + 40}`} className="w-full h-auto" role="img" aria-labelledby="chart-title chart-desc">
        <title id="chart-title">Google impressions per month, 2026</title>
        <desc id="chart-desc">
          {MONTHLY.map((m) => `${m.month}: ${m.impressions}${m.partial ? ' (part month)' : ''}`).join(', ')}
        </desc>
        {MONTHLY.map((m, i) => {
          const h = Math.max(2, (m.impressions / max) * (H - 24));
          const x = i * bw + bw * 0.18;
          return (
            <g key={m.month}>
              <rect
                x={x}
                y={H - h}
                width={bw * 0.64}
                height={h}
                rx={4}
                className={m.partial ? 'fill-accent/40' : 'fill-accent'}
              />
              <text x={x + bw * 0.32} y={H - h - 6} textAnchor="middle" className="fill-current text-[13px] text-text/70 dark:text-gray-300">
                {m.impressions}
              </text>
              <text x={x + bw * 0.32} y={H + 22} textAnchor="middle" className="fill-current text-[13px] text-text/70 dark:text-gray-300">
                {m.month}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="text-sm text-text/60 dark:text-gray-400 mt-2">
        Google impressions per month. Lighter bars are part months (the site first appeared on 21 March; November runs to the
        15th). Source: {SOURCE}.
      </figcaption>
    </figure>
  );
}

export default function ElevateOwnCaseStudy() {
  const growth = Math.round(LAST_28.impressions / PREV_28.impressions);
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: TITLE,
      description: DESCRIPTION,
      url: `${SITE_URL}${SLUG}`,
      datePublished: '2026-11-17',
      image: `${SITE_URL}/opengraph-image`,
      author: { '@type': 'Person', name: 'Ufuoma Onakpoyan', url: `${SITE_URL}/about` },
      publisher: { '@id': ORGANIZATION_ID },
      about: { '@id': ORGANIZATION_ID },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE_URL}/case-studies` },
        { '@type': 'ListItem', position: 3, name: 'Our own website', item: `${SITE_URL}${SLUG}` },
      ],
    },
  ];

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
            <span aria-current="page">Our own website</span>
          </nav>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-6">
            Our own website: 8 months of search data, shown in public
          </h1>
          <p className={p}>
            We build websites that get found on Google and in AI search. Our own site is the first one we have to prove it on, so
            here are its real numbers from Google Search Console, the good and the not yet.
          </p>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-10">
            {[
              [`${n(LAST_28.impressions)}`, 'impressions in the last 28 days'],
              [`about ${growth}×`, `the 28 days before (${n(PREV_28.impressions)})`],
              [`${n(TOTALS.impressions)}`, 'impressions since March'],
              [`${TOTALS.clicks}`, `clicks since March, ${COUNTRIES.nigeriaClicks} from Nigeria`],
            ].map(([v, k]) => (
              <div key={k} className="rounded-card bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4">
                <dd className="font-heading font-bold text-2xl text-primary dark:text-white">{v}</dd>
                <dt className="text-sm text-text/70 dark:text-gray-400 mt-1">{k}</dt>
              </div>
            ))}
          </dl>

          <h2 className={h2}>Where we started</h2>
          <p className={p}>
            Google first showed the site in search on 21 March 2026. A new domain starts with no history, no links and no
            reviews, which is where most of our clients start too.
          </p>

          <h2 className={h2}>What we did</h2>
          <ul className="space-y-3 mb-4">
            {built.map((item) => (
              <li key={item} className="flex items-start gap-3 text-text/80 dark:text-gray-300 text-lg">
                <Check className="text-accent flex-shrink-0 mt-1.5" size={18} aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <h2 className={h2}>What the numbers show</h2>
          <ImpressionsChart />
          <p className={p}>
            Impressions (how often the site appeared in Google results) went from {n(PREV_28.impressions)} to{' '}
            {n(LAST_28.impressions)} between the last two 28-day periods, about {growth} times more. Clicks went from{' '}
            {PREV_28.clicks} to {LAST_28.clicks}. These are small numbers, and we show them because they are real.
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Top pages since March 2026</caption>
              <thead className="text-text/60 dark:text-gray-400 border-b border-gray-200 dark:border-slate-700">
                <tr>
                  <th className="py-2 pr-3 font-medium">Page</th>
                  <th className="py-2 px-3 font-medium text-right">Clicks</th>
                  <th className="py-2 px-3 font-medium text-right">Impressions</th>
                  <th className="py-2 pl-3 font-medium text-right">Avg. position</th>
                </tr>
              </thead>
              <tbody className="text-text/80 dark:text-gray-300">
                {TOP_PAGES.map((r) => (
                  <tr key={r.page} className="border-b border-gray-100 dark:border-slate-800">
                    <td className="py-2 pr-3">{r.page}</td>
                    <td className="py-2 px-3 text-right">{r.clicks}</td>
                    <td className="py-2 px-3 text-right">{n(r.impressions)}</td>
                    <td className="py-2 pl-3 text-right">{r.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>
            When Google shows the homepage, it averages position 5, and about one in thirteen people who see it click. A
            practical guide for Nigerian businesses on WhatsApp marketing is the page Google shows most.
          </p>

          <h2 className={h2}>What isn’t working yet</h2>
          <p className={p}>
            The searches we most want to win are still far from page one. For example:
          </p>
          <ul className="list-disc pl-6 mb-4 text-text/80 dark:text-gray-300 text-lg space-y-1">
            {NOT_YET.map((q) => (
              <li key={q.query}>
                “{q.query}”: shown {q.impressions} times, average position {q.position}
              </li>
            ))}
          </ul>
          <p className={p}>
            Position 80 is around page eight, where almost nobody looks. Competitive searches like these usually need more
            reviews, more mentions on other sites and more time. Nobody can guarantee rankings, and we don’t.
          </p>

          <h2 className={h2}>What we’re doing next</h2>
          <ul className="space-y-3 mb-4">
            {[
              'Asking every client for an honest Google review, with nothing offered in exchange',
              'Getting Elevate listed on Nigerian business directories and earning mentions on real local sites',
              'Improving the pages that Google already shows but people don’t click, starting with titles and descriptions',
              'Publishing new case studies like this one, with permission and real numbers',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-text/80 dark:text-gray-300 text-lg">
                <ArrowRight className="text-accent flex-shrink-0 mt-1.5" size={18} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className={p}>We will update this page with each new Search Console export.</p>

          <section className="mt-12 p-8 bg-primary rounded-card-lg">
            <h2 className="font-heading font-bold text-2xl text-white mb-3">See where your own business stands</h2>
            <p className="text-white/80 mb-6">
              The free AI visibility check shows whether Google and AI assistants can read your website, in about a minute.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/ai-visibility-check"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition-colors"
              >
                Run the free check <ArrowRight size={20} aria-hidden />
              </Link>
              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-white font-heading font-semibold hover:text-accent transition-colors"
              >
                Get a quote
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
