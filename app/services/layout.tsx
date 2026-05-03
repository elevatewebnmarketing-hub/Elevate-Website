import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Website design, redesign, landing pages, local visibility support, and ongoing website care for service businesses that want more qualified leads.',
  keywords: [
    'service business website design',
    'local business website packages',
    'website redesign services',
    'landing page design',
    'website care plan',
    'google business profile support',
  ],
  openGraph: {
    title: 'Website & Growth Services | Elevate Web & Marketing',
    description:
      'Lead-generating websites, redesigns, landing pages, and recurring support for service businesses.',
    url: `${SITE_URL}/services`,
  },
  alternates: { canonical: '/services' },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', url: SITE_URL },
          { name: 'Services', url: `${SITE_URL}/services` },
        ]}
      />
      {children}
    </>
  );
}
