import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of service for ${siteConfig.companyName}. Rules and guidelines for using our website and services.`,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-background dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-primary dark:text-white mb-8">
            Terms of Service
          </h1>
          <p className="text-text/70 dark:text-gray-400 text-sm mb-12">
            Last updated: {new Date().toLocaleDateString('en-US')}
          </p>

          <div className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:dark:text-white prose-p:text-text/80 prose-p:dark:text-gray-300 prose-li:text-text/80 prose-li:dark:text-gray-300 space-y-8">
            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mt-8 mb-4">
                Acceptance of Terms
              </h2>
              <p>
                By accessing or using the website and services of {siteConfig.companyName}, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mt-8 mb-4">
                Services
              </h2>
              <p>
                We provide website design, development, digital marketing, and related services. The specific scope, deliverables, timelines, and pricing for each project will be defined in a separate agreement or proposal.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mt-8 mb-4">
                Use of Our Website
              </h2>
              <p>
                You agree to use our website only for lawful purposes. You may not use it to transmit harmful code, spam, or unlawful content, or to interfere with the proper functioning of the site or our systems.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mt-8 mb-4">
                Intellectual Property
              </h2>
              <p>
                Our website content, branding, and materials are owned by us or our licensors. Work produced for you under a project agreement will be governed by that agreement. Unless otherwise agreed, you receive a license to use the delivered work for your business purposes.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mt-8 mb-4">
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, we are not liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services. Our total liability for any claim related to our services is limited to the amount you paid us for the relevant project.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mt-8 mb-4">
                Changes
              </h2>
              <p>
                We may update these Terms of Service from time to time. We will post the updated terms on this page and update the &quot;Last updated&quot; date. Your continued use of our website after changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mt-8 mb-4">
                Contact
              </h2>
              <p>
                For questions about these Terms of Service, please contact us at {siteConfig.contactEmail}.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
