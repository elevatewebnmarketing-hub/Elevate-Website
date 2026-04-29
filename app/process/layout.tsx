import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Our Process',
  description:
    'How we work: discovery, design, build, and launch. A clear process for web design and marketing projects with fixed timelines.',
  keywords: [
    'web design process Nigeria',
    'how we build websites',
    'website development process Nigeria',
    'digital marketing process Nigeria',
  ],
  openGraph: {
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
