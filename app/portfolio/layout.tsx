import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'View our web design and development projects. Elevate Web & Marketing has built sites for MR DGN Group, MansaLuxeRealty, Experience BSG, TMM Scholars, and more.',
  keywords: [
    'web design portfolio Nigeria',
    'website projects Nigeria',
    'Nigerian web design examples',
    'website case studies Nigeria',
  ],
  openGraph: {
    title: 'Our Work | Elevate Web & Marketing Portfolio',
    description: 'Web design and development projects for Nigerian and global businesses.',
    url: `${SITE_URL}/portfolio`,
  },
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', url: SITE_URL },
          { name: 'Portfolio', url: `${SITE_URL}/portfolio` },
        ]}
      />
      {children}
    </>
  );
}
