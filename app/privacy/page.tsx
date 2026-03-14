import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${siteConfig.companyName}. How we collect, use, and protect your information.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-background dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-primary dark:text-white mb-8">
            Privacy Policy
          </h1>
          <p className="text-text/70 dark:text-gray-400 text-sm mb-12">
            Last updated: {new Date().toLocaleDateString('en-US')}
          </p>

          <div className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:dark:text-white prose-p:text-text/80 prose-p:dark:text-gray-300 prose-li:text-text/80 prose-li:dark:text-gray-300 space-y-8">
            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mt-8 mb-4">
                Introduction
              </h2>
              <p>
                {siteConfig.companyName} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mt-8 mb-4">
                Information We Collect
              </h2>
              <p>
                We may collect information you provide directly, such as when you fill out a contact form, subscribe to our newsletter, or book a call. This may include your name, email address, phone number, company name, and any message or project details you share.
              </p>
              <p>
                We also collect information automatically when you visit our website, including your IP address, browser type, device information, and pages you visit. We may use cookies and similar technologies for analytics and to improve your experience.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mt-8 mb-4">
                How We Use Your Information
              </h2>
              <p>
                We use the information we collect to respond to your inquiries, provide services, send relevant updates, improve our website, and communicate with you about projects and marketing (with your consent where required).
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mt-8 mb-4">
                Sharing Your Information
              </h2>
              <p>
                We do not sell your personal information. We may share your information with trusted service providers who assist us in operating our website and business (e.g., email delivery, analytics) under confidentiality agreements. We may disclose information if required by law.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mt-8 mb-4">
                Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mt-8 mb-4">
                Your Rights
              </h2>
              <p>
                Depending on your location, you may have the right to access, correct, or delete your personal information, or to opt out of marketing communications. Contact us at {siteConfig.contactEmail} to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mt-8 mb-4">
                Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at {siteConfig.contactEmail}.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
