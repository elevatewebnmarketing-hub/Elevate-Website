import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Website design, development, SEO, digital marketing, and maintenance. Elevate Web & Marketing builds high-performance sites and growth systems for businesses in Nigeria and worldwide.',
  keywords: [
    'web design services Nigeria',
    'website development services Lagos',
    'SEO services Nigeria',
    'digital marketing services Nigeria',
    'Google Ads Nigeria',
    'Meta Ads Nigeria',
    'website maintenance Nigeria',
  ],
  openGraph: {
    title: 'Web Design & Marketing Services | Elevate Web & Marketing',
    description: 'Custom websites, SEO, Google Ads, and digital marketing. Nigeria-based agency serving businesses globally.',
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
