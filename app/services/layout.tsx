import type { Metadata } from 'next';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Website design, development, SEO, digital marketing, and maintenance. Elevate Web & Marketing builds high-performance sites and growth systems for businesses in Nigeria and worldwide.',
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
  return children;
}
