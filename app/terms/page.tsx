import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/lib/site-config';
import { PROJECT_TERMS, TERMS_UPDATED_LABEL } from '@/lib/project-terms';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of service for ${siteConfig.companyName}. Rules and guidelines for using our website and services.`,
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service | Elevate Web & Marketing',
    description: `Terms of service for ${siteConfig.companyName}.`,
    url: 'https://www.elevatewebandmarketing.com/terms',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Elevate Web & Marketing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Elevate Web & Marketing',
    description: `Terms of service for ${siteConfig.companyName}.`,
    images: ['/twitter-image'],
  },
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
            Last updated: {TERMS_UPDATED_LABEL}
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
                We provide website design, development, digital marketing, and related services. The scope, price and timeline for
                each project are set out on your invoice or quote, and the project terms below apply to all of them.
              </p>
            </section>

            <section id="project-terms" className="scroll-mt-28 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-6 sm:p-8 not-prose">
              <h2 className="font-heading font-semibold text-2xl text-primary dark:text-white mb-2">Project terms</h2>
              <p className="text-text/70 dark:text-gray-400 text-sm mb-6">
                The short version of how we work together. No long contract to sign: paying your invoice, or clicking “I accept” on
                it, means you agree to these terms. Version of {TERMS_UPDATED_LABEL}.
              </p>
              <ol className="space-y-5">
                {PROJECT_TERMS.map((t, i) => (
                  <li key={t.title} className="grid grid-cols-[2rem_1fr] gap-x-2">
                    <span className="font-heading font-bold text-accent">{i + 1}.</span>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-primary dark:text-white mb-1">{t.title}</h3>
                      {t.body.map((b) => (
                        <p key={b} className="text-text/80 dark:text-gray-300 mb-2 last:mb-0">
                          {b}
                        </p>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
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
                Our own website content, branding, and materials are owned by us or our licensors. Once your invoice is paid in full,
                you own the website we built for you, its domain and its content, as set out in the project terms above.
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
