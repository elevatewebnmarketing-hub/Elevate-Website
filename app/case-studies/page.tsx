import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PortfolioSection from '@/components/sections/Portfolio';

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-background dark:bg-slate-900">
        <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center">Loading...</div>}>
          <PortfolioSection showAll />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
