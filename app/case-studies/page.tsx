import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PortfolioSection from '@/components/sections/Portfolio';

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-background dark:bg-slate-900">
        <PortfolioSection showAll />
      </main>
      <Footer />
    </>
  );
}
