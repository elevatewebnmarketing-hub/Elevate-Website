import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on web design, digital marketing, and growing your business online. Tips and best practices from Elevate Web & Marketing.',
  keywords: [
    'web design blog Nigeria',
    'digital marketing tips Nigeria',
    'SEO tips Nigeria',
    'website growth blog',
  ],
  openGraph: {
    title: 'Blog | Elevate Web & Marketing',
    description: 'Web design, SEO, and marketing insights for businesses.',
    url: `${SITE_URL}/blog`,
  },
  alternates: { canonical: '/blog' },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', url: SITE_URL },
          { name: 'Blog', url: `${SITE_URL}/blog` },
        ]}
      />
      {children}
    </>
  );
}
