import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OnboardingForm from '@/components/forms/OnboardingForm';

// Private link sent to clients after the deposit: not in the sitemap, not indexed.
export const metadata: Metadata = {
  title: 'Client onboarding',
  description: 'Tell us about your business so we can build your website.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/onboarding' },
};

export default function OnboardingPage() {
  return (
    <>
      <Header />
      <main className="pt-28 sm:pt-32 pb-16 lg:pb-20 min-h-screen bg-background dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-3">Tell us about your business</h1>
          <p className="text-text/80 dark:text-gray-300 text-lg mb-8">
            Your answers become the pages of your website. It takes 15–25 minutes, and the questions adapt to your type of business; your progress is saved on this device
            as you go, so you can stop and come back.
          </p>
          <OnboardingForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
