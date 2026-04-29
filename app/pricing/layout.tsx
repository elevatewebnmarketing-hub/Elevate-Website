import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent pricing for web design and marketing services. Fixed packages and custom quotes for businesses in Nigeria and worldwide.',
  keywords: [
    'web design pricing Nigeria',
    'website cost Nigeria',
    'affordable web design Nigeria',
    'website packages Nigeria',
    'digital marketing pricing Nigeria',
  ],
  openGraph: {
    title: 'Pricing | Elevate Web & Marketing',
    description: 'Web design and marketing package pricing. Clear, fixed options.',
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
