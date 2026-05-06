import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent pricing for web design and marketing services. Our ₦250,000 Starter Website package includes a 4-page website, 1 year of domain registration, Google Business Profile setup, SEO foundations, and mobile optimization.',
  keywords: [
    'web design pricing Asaba',
    'website cost Nigeria',
    'affordable web design Asaba',
    'website packages Nigeria',
    'digital marketing pricing Nigeria',
  ],
  openGraph: {
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
