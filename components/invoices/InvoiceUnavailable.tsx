import { siteConfig } from '@/lib/site-config';

/** Shown on /i/<token> when the link is wrong, not sent yet, or the server can't load it. */
export default function InvoiceUnavailable({ reason, what = 'invoice' }: { reason: 'missing' | 'error'; what?: string }) {
  const wa = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hello Elevate, my ${what} link is not opening.`)}`;
  return (
    <div className="admin-panel min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-soft border border-gray-100 p-8 text-center">
        <p className="font-heading text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">Elevate Web &amp; Marketing</p>
        <h1 className="font-heading text-2xl font-bold text-[#0B1F3A] mb-3">
          {reason === 'error' ? `This ${what} can’t load right now` : `This ${what} link isn’t available`}
        </h1>
        <p className="text-gray-600 mb-6">
          {reason === 'error'
            ? 'Please try again in a few minutes. If it still doesn’t open, message us and we’ll send it another way.'
            : 'The link may be incomplete, replaced by a newer one, or not sent yet. Message us and we’ll send you the right link.'}
        </p>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-2.5 rounded-lg bg-[#0B1F3A] text-white font-semibold hover:bg-[#13305a]">
          Message us on WhatsApp
        </a>
        <p className="mt-4 text-sm text-gray-500">or email hello@elevatewebandmarketing.com</p>
      </div>
    </div>
  );
}
