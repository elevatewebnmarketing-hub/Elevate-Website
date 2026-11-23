import './presentation-motion.css';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TechStackMarquee from '@/components/sections/TechStackMarquee';
import LogoStrip from '@/components/sections/LogoStrip';
import Trust from '@/components/sections/Trust';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Process from '@/components/sections/Process';
import GoogleReviews, { GoogleReviewsProvider } from '@/components/sections/GoogleReviews';
import FounderStrip from '@/components/sections/FounderStrip';
import Blog from '@/components/sections/Blog';
import Pricing from '@/components/sections/Pricing';
import FinalCTA from '@/components/sections/FinalCTA';
import OfferSummary from '@/components/sections/OfferSummary';
import { AbujaSection, AsabaSection, ElsewhereSection } from '@/components/sections/LocalPresence';
import HomeFaq from '@/components/sections/HomeFaq';
import { getBlogPosts } from '@/lib/data';

const TITLE = 'Website Design & SEO in Abuja and Asaba | Elevate Web & Marketing';
const DESCRIPTION =
  'Website design and SEO for Abuja businesses, with an office in Asaba. Free discovery visits anywhere in Abuja, fixed prices, and sites Google and ChatGPT can read.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/' },
  twitter: { title: TITLE, description: DESCRIPTION },
  alternates: { canonical: '/' },
};

export default async function Home() {
  const posts = await getBlogPosts();
  return (
    <>
      <Header />
      <GoogleReviewsProvider>
        <main className="presentation-home">
          <Hero />
          <TechStackMarquee />
          <Trust />
          <Services />
          <AbujaSection />
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <Portfolio />
          </Suspense>
          <LogoStrip />
          <AsabaSection />
          <ElsewhereSection />
          <Process />
          <GoogleReviews />
          <Pricing />
          <OfferSummary />
          <FounderStrip />
          <HomeFaq />
          <Blog initialPosts={posts.slice(0, 3)} />
          <FinalCTA />
        </main>
      </GoogleReviewsProvider>
      <Footer />
    </>
  );
}
