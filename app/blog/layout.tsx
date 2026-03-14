import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on web design, digital marketing, and growing your business online. Tips and best practices from Elevate Web & Marketing.',
  openGraph: {
    title: 'Blog | Elevate Web & Marketing',
    description: 'Web design, SEO, and marketing insights for businesses.',
    url: '/blog',
  },
  alternates: { canonical: '/blog' },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>{children}</Suspense>;
}
