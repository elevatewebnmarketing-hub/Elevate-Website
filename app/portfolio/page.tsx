import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PortfolioSection from '@/components/sections/Portfolio';

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-background dark:bg-slate-900">
        <PortfolioSection showAll service={service ?? null} />
      </main>
      <Footer />
    </>
  );
}
