import { siteConfig } from '@/lib/site-config';

const SITE_URL = 'https://elevatewebandmarketing.com';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Meta Ads Management (Facebook & Instagram)',
  serviceType: 'Meta Ads Management',
  provider: {
    '@type': 'Organization',
    name: siteConfig.companyName,
    url: SITE_URL,
    sameAs: siteConfig.socialLinks.map((l) => l.href),
  },
  areaServed: 'Worldwide',
  description:
    'Meta Ads management across Facebook and Instagram with Meta Pixel tracking, conversion-focused landing pages, disciplined creative testing, and reporting.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you manage both Facebook Ads and Instagram Ads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Meta Ads lets you run across Facebook and Instagram placements using the same campaign system. We structure your tests so you can learn quickly and optimize properly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What tracking do you use for conversions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We use the Meta Pixel and align the events you care about with your website’s conversion flow. That way, optimization is based on real actions—not vanity metrics.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you handle creative fatigue?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Creative performance changes over time. We keep a testing cadence—refreshing hooks and formats—so you maintain efficiency even as audiences respond differently.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you only work on ads, or also the website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We do both. A Meta ad can earn the click, but your website must finish the job—speed, clarity, and CTAs. We align landing pages with your campaign promise to increase conversion rate.',
      },
    },
  ],
};

export default function MetaAdsJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

