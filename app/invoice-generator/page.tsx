import type { Metadata } from 'next';
import InvoiceEditor from './InvoiceEditor';

export const metadata: Metadata = {
  title: 'Free Invoice Generator',
  description: 'Create and print a business invoice for free. Preview your totals and save as PDF without signing up or uploading files.',
  alternates: { canonical: '/invoice-generator' },
};

export default function InvoiceGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#F4F7FB] text-[#102344] print:min-h-0 print:bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12 print:max-w-none print:p-0">
        <header className="mb-8 max-w-2xl print:hidden">
          <a href="/" className="text-sm font-semibold underline underline-offset-4">Elevate Web &amp; Marketing</a>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">Free invoice generator</h1>
          <p className="mt-3 text-base leading-relaxed text-slate-700">Enter your details, check the preview, and save a PDF. Your invoice stays in this tab. Download it before closing or refreshing the page.</p>
        </header>
        <InvoiceEditor />
        <aside className="mt-8 border-t border-slate-300 pt-5 text-sm print:hidden">
          Need help automating your business? <a className="font-semibold underline underline-offset-4" href="/contact">Contact Elevate</a>. The invoice details stay here.
        </aside>
      </div>
    </main>
  );
}
