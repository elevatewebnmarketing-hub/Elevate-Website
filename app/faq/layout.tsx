import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'FAQ: Getting Found on Google & ChatGPT, Websites, SEO and Prices',
  description:
    'How to get more clients, why your business isn’t on Google or ChatGPT, how long SEO takes, what a website costs and how payment works. Straight answers.',
  keywords: [
    'web design FAQ Nigeria',
    'how much does a website cost Nigeria',
    'website development questions',
    'digital marketing FAQ Nigeria',
  ],
  openGraph: {
    images: ['/opengraph-image'],
    title: 'FAQ | Elevate Web & Marketing',
    description: 'How to get more clients, show up on Google and ChatGPT, and what websites and SEO cost.',
    url: `${SITE_URL}/faq`,
  },
  alternates: { canonical: '/faq' },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', url: SITE_URL },
          { name: 'FAQ', url: `${SITE_URL}/faq` },
        ]}
      />
      {children}
    </>
  );
}
