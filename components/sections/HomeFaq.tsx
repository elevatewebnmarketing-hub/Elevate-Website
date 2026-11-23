import Link from 'next/link';
import type { ReactNode } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { STATIC_PRICING_FALLBACK } from '@/lib/pricing-config';

const inline = 'text-accent font-medium underline underline-offset-2 hover:no-underline';
const naira = (n: number) => `₦${n.toLocaleString('en-NG')}`;
const STARTER = naira(STATIC_PRICING_FALLBACK.NG.starter.amount);
const BUSINESS = naira(STATIC_PRICING_FALLBACK.NG.business.amount);

/** Questions Abuja and Asaba businesses ask. `text` is the plain answer used in the FAQPage structured data. */
const faqs: { q: string; a: ReactNode; text: string }[] = [
  {
    q: 'Do you have an office in Abuja?',
    a: (
      <>
        Not yet. Our founder lives and works in Abuja and meets Abuja clients at their own business. Our office is in
        Asaba. Most Abuja projects run over WhatsApp and calls, with a visit whenever it helps.
      </>
    ),
    text: 'Not yet. Our founder lives and works in Abuja and meets Abuja clients at their own business. Our office is in Asaba. Most Abuja projects run over WhatsApp and calls, with a visit whenever it helps.',
  },
  {
    q: 'Can you visit my business in Abuja, and is it free?',
    a: (
      <>
        Yes. The first visit is a free discovery meeting anywhere in Abuja, from Maitama to Lugbe and Kubwa. We
        usually come within 24 hours of booking, depending on the schedule and when suits you.
      </>
    ),
    text: 'Yes. The first visit is a free discovery meeting anywhere in Abuja, from Maitama to Lugbe and Kubwa. We usually come within 24 hours of booking, depending on the schedule and when suits you.',
  },
  {
    q: 'Can I visit your office in Asaba?',
    a: (
      <>
        Yes. Contact us before travelling so we can arrange your visit. Our Asaba office is at Jossie Excel School, after Okpanam City Gate by the Express, Asaba.
        Ask for Elevate Web &amp; Marketing and the team will reach us.
      </>
    ),
    text: 'Yes. Contact us before travelling so we can arrange your visit. Our Asaba office is at Jossie Excel School, after Okpanam City Gate by the Express, Asaba. Ask for Elevate Web & Marketing and the team will reach us.',
  },
  {
    q: 'How much does a website cost in Abuja?',
    a: (
      <>
        The same as anywhere in Nigeria with us: the Starter Website is {STARTER} and the Business Website is{' '}
        {BUSINESS}. See the <Link href="/pricing" className={inline}>pricing page</Link> or our guide to{' '}
        <Link href="/blog/website-cost-in-nigeria-2026" className={inline}>website costs in Nigeria</Link>.
      </>
    ),
    text: `The same as anywhere in Nigeria with us: the Starter Website is ${STARTER} and the Business Website is ${BUSINESS}. The pricing page lists everything included.`,
  },
  {
    q: 'Do you do SEO for Abuja businesses, or only websites?',
    a: (
      <>
        Both. We do <Link href="/services/local-seo" className={inline}>local SEO</Link> for Abuja businesses: the
        Google Business Profile, listings, reviews you ask for honestly, and pages for each service. We won’t promise a
        ranking or a date; we show you the Search Console numbers every month.
      </>
    ),
    text: 'Both. We do local SEO for Abuja businesses: the Google Business Profile, listings, reviews you ask for honestly, and pages for each service. We won’t promise a ranking or a date; we show you the Search Console numbers every month.',
  },
  {
    q: 'Do you work with businesses outside Abuja and Asaba?',
    a: (
      <>
        Yes, remotely. We have built sites for clients in <Link href="/locations/lagos" className={inline}>Lagos</Link>,
        Benin City and the <Link href="/uk" className={inline}>UK</Link>.
      </>
    ),
    text: 'Yes, remotely. We have built sites for clients in Lagos, Benin City and the UK.',
  },
];

export default function HomeFaq() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.text } })),
  };
  return (
    <SectionWrapper id="faq" className="py-16 lg:py-20 bg-white dark:bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary dark:text-white mb-8">
          Questions from Abuja and Asaba businesses
        </h2>
        <div className="divide-y divide-gray-200 dark:divide-white/10 border-y border-gray-200 dark:border-white/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer list-none flex justify-between gap-4 font-heading font-semibold text-lg text-primary dark:text-white">
                {f.q}
                <span aria-hidden className="text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-text/80 dark:text-gray-300 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-text/80 dark:text-gray-300">
          More answers on our <Link href="/faq" className={inline}>FAQ page</Link>.
        </p>
      </div>
    </SectionWrapper>
  );
}
