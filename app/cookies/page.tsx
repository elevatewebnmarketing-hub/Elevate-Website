import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How Elevate Web & Marketing uses cookies and local storage to personalise your experience.',
  robots: { index: false, follow: false },
};

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-32 sm:pt-36 md:pt-40 pb-20 min-h-screen bg-background dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-text/60 dark:text-gray-400 text-sm mb-10">
            Last updated: April 2026
          </p>

          <div className="prose prose-sm sm:prose max-w-none dark:prose-invert text-text/80 dark:text-gray-300 space-y-8">

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mb-3">
                What are cookies?
              </h2>
              <p>
                Cookies are small text files stored on your device when you visit a website. We also use
                browser <strong>localStorage</strong> — a similar mechanism that stores data locally in
                your browser without expiry. Both are used to remember your preferences between visits.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mb-3">
                What we store and why
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-primary dark:text-white">Key</th>
                      <th className="text-left px-4 py-3 font-semibold text-primary dark:text-white">Type</th>
                      <th className="text-left px-4 py-3 font-semibold text-primary dark:text-white">Purpose</th>
                      <th className="text-left px-4 py-3 font-semibold text-primary dark:text-white">Expiry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">elevate_location</td>
                      <td className="px-4 py-3">localStorage</td>
                      <td className="px-4 py-3">Stores your selected pricing region (e.g. Nigeria, UK, US) so prices display correctly in your currency.</td>
                      <td className="px-4 py-3">24 hours (or permanent if you confirm your location)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">elevate_consent_given</td>
                      <td className="px-4 py-3">localStorage</td>
                      <td className="px-4 py-3">Records that you have accepted this cookie policy so we don't show the banner again.</td>
                      <td className="px-4 py-3">Permanent (until cleared)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">admin_session</td>
                      <td className="px-4 py-3">HTTP Cookie</td>
                      <td className="px-4 py-3">Keeps admin users logged in to the dashboard. Only set for authenticated admin accounts.</td>
                      <td className="px-4 py-3">Session</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">_ga, _gid, _gtm*</td>
                      <td className="px-4 py-3">Cookie</td>
                      <td className="px-4 py-3">Google Analytics / Google Tag Manager — used to understand how visitors use the site. No personally identifiable information is stored.</td>
                      <td className="px-4 py-3">Up to 2 years</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">_fbp</td>
                      <td className="px-4 py-3">Cookie</td>
                      <td className="px-4 py-3">Meta Pixel — used to measure the effectiveness of our Facebook and Instagram advertising.</td>
                      <td className="px-4 py-3">90 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mb-3">
                Location detection
              </h2>
              <p>
                When you first visit, we attempt to detect your approximate country using your IP address
                via a third-party service (<a href="https://ip-api.com" target="_blank" rel="noopener noreferrer" className="text-accent underline">ip-api.com</a>).
                This is used solely to pre-select the correct pricing currency for your region. No IP
                address is stored by us.
              </p>
              <p className="mt-2">
                You can always correct your location using the selector shown in the consent banner,
                or by revisiting the site after clearing your localStorage (see below).
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mb-3">
                Third-party services
              </h2>
              <p>We use the following third-party tools that may set their own cookies:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Google Analytics / GTM</strong> — website analytics</li>
                <li><strong>Meta (Facebook) Pixel</strong> — advertising measurement</li>
                <li><strong>Calendly</strong> — booking widget (sets cookies when you interact with it)</li>
                <li><strong>ip-api.com</strong> — IP-based country detection (no cookies set by us)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mb-3">
                How to clear your data
              </h2>
              <p>
                To reset your location preference or withdraw consent, clear your browser&apos;s localStorage
                for this site:
              </p>
              <ol className="list-decimal pl-5 space-y-1 mt-2">
                <li>Open your browser&apos;s Developer Tools (F12 or right-click → Inspect)</li>
                <li>Go to <strong>Application</strong> → <strong>Local Storage</strong></li>
                <li>Find and delete the <code className="font-mono text-xs bg-gray-100 dark:bg-slate-700 px-1 rounded">elevate_location</code> and <code className="font-mono text-xs bg-gray-100 dark:bg-slate-700 px-1 rounded">elevate_consent_given</code> keys</li>
                <li>Reload the page — the consent banner will reappear</li>
              </ol>
              <p className="mt-3">
                To opt out of Google Analytics, use the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  Google Analytics opt-out browser add-on
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mb-3">
                Contact
              </h2>
              <p>
                Questions about this policy? Email us at{' '}
                <a href="mailto:hello@elevatewebandmarketing.com" className="text-accent underline">
                  hello@elevatewebandmarketing.com
                </a>.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
