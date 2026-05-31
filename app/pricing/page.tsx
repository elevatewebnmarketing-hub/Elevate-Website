import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PricingSection from '@/components/sections/Pricing';
import PricingJsonLd from '@/components/seo/PricingJsonLd';
import TikTokViewContent from '@/components/analytics/TikTokViewContent';

export default function PricingPage() {
  return (
    <>
      <TikTokViewContent contentName="Pricing" />
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-background dark:bg-slate-900">
        <PricingJsonLd />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingSection isStandalone />
        </div>
      </main>
      <Footer />
    </>
  );
}
