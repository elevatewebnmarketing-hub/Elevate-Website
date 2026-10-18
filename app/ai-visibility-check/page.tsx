import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VisibilityChecker from '@/components/tools/VisibilityChecker';
import { ORGANIZATION_ID } from '@/components/seo/JsonLd';
import { AI_BOTS } from '@/lib/visibility-check';

const SITE_URL = 'https://www.elevatewebandmarketing.com';
const TITLE = 'Free AI Visibility Check';
const DESCRIPTION =
  'Free tool: see whether Google, ChatGPT and other AI crawlers can read your website. Checks readable text, headings, schema, robots.txt and sitemap.';

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Elevate Web & Marketing` },
  description: DESCRIPTION,
  alternates: { canonical: '/ai-visibility-check' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/ai-visibility-check', images: ['/opengraph-image'] },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const checks = [
  ['Readable text without JavaScript', 'Many crawlers, including ChatGPT’s and Perplexity’s, don’t run JavaScript. If your words only appear after code runs in a browser, they see an almost empty page.'],
  ['Title, description and main heading', 'The basics that tell search engines what the page is about.'],
  ['Business structured data', 'Organization or LocalBusiness schema that states your name, location and contact details in a format machines read.'],
  ['AI crawlers allowed', `Whether your robots.txt blocks ${AI_BOTS.join(', ')}.`],
  ['Sitemap, HTTPS and one-tap contact', 'Whether search engines can find your pages, the site is secure, and visitors can call or WhatsApp you in one tap.'],
];

const faqs = [
  { q: 'Is the AI visibility check really free?', a: 'Yes. There’s no sign-up and nothing to install. Enter a public website address and you get the result straight away.' },
  { q: 'What does a low score mean?', a: 'Usually that search engines and AI tools receive very little readable text from your page, or that key details are missing. It doesn’t mean your site looks bad to people, only that machines struggle to read it.' },
  { q: 'Does this guarantee I’ll show up in ChatGPT?', a: 'No tool can promise that. AI assistants also weigh reviews, listings and how well known you are. But if they can’t read your site at all, they can’t recommend it from your own words.' },
  { q: 'Which page should I check?', a: 'Start with your homepage, then your most important service or product page. The tool checks one page at a time.' },
];

export default function AiVisibilityCheckPage() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TITLE,
      url: `${SITE_URL}/ai-visibility-check`,
      description: DESCRIPTION,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      provider: { '@id': ORGANIZATION_ID },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <Header />
      <main className="pt-32 sm:pt-36 md:pt-40 pb-20 bg-background dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-4">
            Free AI visibility check
          </h1>
          <p className="text-text/80 dark:text-gray-300 text-lg leading-relaxed mb-8">
            Can Google, ChatGPT and other AI tools actually read your website? Enter your address to see what their crawlers
            receive, in plain English, in a few seconds.
          </p>

          <VisibilityChecker />

          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mt-14 mb-4">What the check looks at</h2>
          <ul className="space-y-4">
            {checks.map(([title, body]) => (
              <li key={title}>
                <p className="font-heading font-semibold text-primary dark:text-white">{title}</p>
                <p className="text-text/80 dark:text-gray-300 leading-relaxed">{body}</p>
              </li>
            ))}
          </ul>

          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mt-14 mb-4">Why it matters</h2>
          <p className="text-text/80 dark:text-gray-300 text-lg leading-relaxed mb-4">
            More customers now ask AI assistants for recommendations before they search. When we first checked one client’s
            website, MR DGN Group, crawlers received 0 readable words. After we rebuilt it, they received over 400, and a
            sister company we optimise, MR DGN Construction, has received an enquiry from a buyer who found it through ChatGPT.
          </p>
          <p className="text-text/80 dark:text-gray-300 text-lg leading-relaxed mb-4">
            Websites built with some AI builders and single-page app templates often look fine to people but send crawlers an
            empty page. This check shows you in seconds. For the full story, read{' '}
            <Link href="/how-to-get-more-customers" className="text-accent hover:underline">how to get more customers online</Link>.
          </p>

          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mt-14 mb-4">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="bg-white dark:bg-slate-800 rounded-card-lg border border-gray-200 dark:border-white/10 p-6">
                <summary className="font-heading font-semibold text-primary dark:text-white cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-text/80 dark:text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
