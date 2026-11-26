import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: { absolute: 'About Elevate Web & Marketing | Web Design & SEO, Abuja' },
  description:
    'Who we are: a web design and SEO studio, founder in Abuja, office in Asaba. 50+ websites since 2023 for businesses in Nigeria and the UK, at fixed prices.',
  keywords: [
    'about elevate web marketing',
    'abuja web studio',
    'service business website studio',
    'web design founder story',
  ],
  openGraph: {
    images: ['/opengraph-image'],
    title: 'About Elevate Web & Marketing',
    description:
      'An Abuja-based studio building SEO-ready websites for service businesses across Nigeria.',
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
