import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CaseStudiesSection from '@/components/sections/CaseStudies';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Explore web design and development case studies from Elevate Web & Marketing—real projects and outcomes for Nigerian and global businesses.',
  alternates: { canonical: '/case-studies' },
  openGraph: {
    title: 'Case Studies | Elevate Web & Marketing',
    description: 'Explore case studies and outcomes from Elevate Web & Marketing projects.',
    url: 'https://www.elevatewebandmarketing.com/case-studies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies | Elevate Web & Marketing',
    description: 'Explore case studies and outcomes from Elevate Web & Marketing projects.',
    images: ['/twitter-image'],
  },
};

export default async function CaseStudiesPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-background dark:bg-slate-900">
        <CaseStudiesSection isStandalone service={service ?? null} />
      </main>
      <Footer />
    </>
  );
}
