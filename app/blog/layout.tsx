import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Guides and articles on getting your business found on Google and ChatGPT, and turning your website into a source of customers.',
  keywords: [
    'web design blog Nigeria',
    'digital marketing tips Nigeria',
    'SEO tips Nigeria',
    'website growth blog',
  ],
  openGraph: {
    images: ['/opengraph-image'],
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
