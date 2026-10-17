import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Website prices from ₦250,000: SEO-ready sites with domain, Google Business Profile setup and mobile optimisation, plus care plans from ₦30,000 a month.',
  keywords: [
    'web design pricing Abuja',
    'website cost Nigeria',
    'website packages Nigeria',
    'digital marketing pricing Nigeria',
  ],
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Pricing | Elevate Web & Marketing',
    description: 'Clear, fixed package pricing including a ₦250,000 Starter Website with domain, Google Business Profile, SEO foundations, and mobile optimization.',
    url: `${SITE_URL}/pricing`,
  },
  alternates: { canonical: '/pricing' },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', url: SITE_URL },
          { name: 'Pricing', url: `${SITE_URL}/pricing` },
        ]}
      />
      {children}
    </>
  );
}
