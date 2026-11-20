import type { Metadata } from 'next';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Website Design, SEO & Ads Services',
  description:
    'Website design, redesign, local SEO, Google and Facebook ads, and monthly care plans for service businesses that want to be found on Google and get more enquiries. Fixed prices.',
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
