import Link from 'next/link';
import SectionWrapper from '@/components/ui/SectionWrapper';

const offerLinks = [
  {
    title: 'Starter Website Package',
    href: '/pricing',
    summary:
      'The ₦250,000 Starter Website package includes a 4-page website, 1 year of domain registration, Google Business Profile setup, core SEO foundations, and mobile optimization.',
  },
  {
    title: 'Business Website Package',
    href: '/pricing',
    summary:
      'The ₦450,000 Business Website package is designed for service businesses that need a stronger multi-page website, clearer trust signals, and better lead-generation support.',
  },
  {
    title: 'Services Overview',
    href: '/services',
    summary:
      'Our services page explains our website design, redesign, landing page, local visibility, and paid growth support offers in plain language.',
  },
  {
    title: 'Frequently Asked Questions',
    href: '/faq',
    summary:
      'Our FAQ page answers common questions about pricing, timelines, Google Business Profile setup, SEO foundations, and what is included in each package.',
  },
];

export default function OfferSummary() {
  return (
    <SectionWrapper className="py-16 bg-background dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary dark:text-white mb-4">
            Clear Offer Summary
          </h2>
          <p className="text-text/80 dark:text-gray-300 text-lg mb-8">
            If you are reviewing this website through search, AI tools, or a shared link, these
            are the core pages that explain exactly what Elevate Web &amp; Marketing offers.
          </p>
        </div>

        <div className="grid gap-5">
          {offerLinks.map((offer) => (
            <article
              key={offer.title}
              className="rounded-card-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 p-6 shadow-soft"
            >
              <h3 className="font-heading font-semibold text-xl text-primary dark:text-white mb-2">
                <Link href={offer.href} className="hover:underline underline-offset-4">
                  {offer.title}
                </Link>
              </h3>
              <p className="text-text/80 dark:text-gray-300 text-sm leading-relaxed">
                {offer.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
