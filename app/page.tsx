import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TechStackMarquee from '@/components/sections/TechStackMarquee';
import LogoStrip from '@/components/sections/LogoStrip';
import Trust from '@/components/sections/Trust';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import FounderStrip from '@/components/sections/FounderStrip';
import Blog from '@/components/sections/Blog';
import Pricing from '@/components/sections/Pricing';
import FinalCTA from '@/components/sections/FinalCTA';
import { getBlogPosts } from '@/lib/data';

export default async function Home() {
  const posts = await getBlogPosts();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TechStackMarquee />
        <Trust />
        <Services />
        <Portfolio />
        <LogoStrip />
        <Process />
        <Testimonials />
        <FounderStrip />
        <Blog initialPosts={posts.slice(0, 3)} />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
