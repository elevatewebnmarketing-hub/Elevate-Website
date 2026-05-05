import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book a strategy call or request a quote for a website, redesign, landing page, or ongoing support. Elevate works with clients across Nigeria from Asaba, Delta State.',
  keywords: [
    'book website strategy call',
    'request website quote',
    'contact web design studio',
    'international web design agency contact',
  ],
  openGraph: {
    title: 'Contact Elevate Web & Marketing',
    description:
      'Reach out for website builds, redesigns, landing pages, and recurring support.',
    url: `${SITE_URL}/contact`,
  },
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', url: SITE_URL },
          { name: 'Contact', url: `${SITE_URL}/contact` },
        ]}
      />
      {children}
    </>
  );
}
