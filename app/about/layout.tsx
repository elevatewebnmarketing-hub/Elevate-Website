import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Elevate Web & Marketing, an Asaba-based web studio helping service businesses build stronger trust and better lead-generation systems online.',
  keywords: [
    'about elevate web marketing',
    'asaba web studio',
    'service business website studio',
    'web design founder story',
  ],
  openGraph: {
    title: 'About Elevate Web & Marketing',
    description:
      'An Asaba-based studio building high-performance websites and growth systems for service businesses and growing brands.',
    url: `${SITE_URL}/about`,
  },
  alternates: { canonical: '/about' },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', url: SITE_URL },
          { name: 'About Us', url: `${SITE_URL}/about` },
        ]}
      />
      {children}
    </>
  );
}
