import type { Metadata } from 'next';

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
    images: ['/opengraph-image'],
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
  // Breadcrumb schema lives on each page: the hub and each service page need different trails.
  return <>{children}</>;
}
