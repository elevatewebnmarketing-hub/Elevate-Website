import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'How We Build Your Website: Our Process',
  description:
    'How we build your website in four steps: discovery, design, development and launch, with the price fixed before we start and training when you go live.',
  keywords: [
    'web design process Nigeria',
    'how we build websites',
    'website development process Nigeria',
    'digital marketing process Nigeria',
  ],
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Our Process | Elevate Web & Marketing',
    description: 'Discovery to launch. See how we deliver websites and marketing projects.',
    url: `${SITE_URL}/process`,
  },
  alternates: { canonical: '/process' },
};

export default function ProcessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', url: SITE_URL },
          { name: 'Our Process', url: `${SITE_URL}/process` },
        ]}
      />
      {children}
    </>
  );
}
