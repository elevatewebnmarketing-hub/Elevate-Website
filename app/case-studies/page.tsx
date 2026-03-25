import { Suspense } from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CaseStudiesSection from '@/components/sections/CaseStudies';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Explore web design and development case studies from Elevate Web & Marketing—real projects and outcomes for Nigerian and global businesses.',
  alternates: { canonical: '/case-studies' },
};

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-background dark:bg-slate-900">
        <Suspense
          fallback={
            <div className="min-h-[400px] flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <CaseStudiesSection isStandalone />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
