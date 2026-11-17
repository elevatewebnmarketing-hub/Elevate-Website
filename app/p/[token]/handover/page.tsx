import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectByToken } from '@/backend/workflow';
import { siteConfig } from '@/lib/site-config';
import Logo from '@/components/ui/Logo';
import PrintButton from '@/components/invoices/PrintButton';

// Handover pack (from Claude-Motion-Graphics/business/operations/handover-template.md; keep the wording in step).
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Handover pack',
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
};

const h2 = 'font-heading text-[17px] font-bold text-[#0B1F3A] mt-6 mb-2';

export default async function HandoverPage({ params }: { params: Promise<{ token: string }> }) {
  const p = await getProjectByToken((await params).token).catch(() => null);
  if (!p) notFound();
  const h = p.handover;
  const site = p.liveUrl || '[your website]';
  const date = h.launchDate ? new Date(`${h.launchDate}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const owner = p.clientEmail || 'your email';

  return (
    <div className="admin-panel min-h-screen bg-gray-100 print:bg-white py-6 sm:py-10 print:py-0 px-3 sm:px-4 print:px-0">
      <style>{`@page { size: A4; margin: 14mm; } @media print { html, body { background: #fff; } }`}</style>
      <div className="max-w-[794px] mx-auto mb-4 flex justify-end print:hidden">
        <PrintButton />
      </div>
      <article className="max-w-[794px] mx-auto bg-white shadow-soft print:shadow-none px-6 sm:px-10 py-8 sm:py-10 print:p-0 text-[14px] leading-relaxed text-[#1f2937]">
        <header className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b-2 border-[#0B1F3A]">
          <div className="-my-3 -ml-2 h-16 w-32 overflow-hidden flex items-center">
            <Logo variant="black" width={130} height={130} />
          </div>
          <div className="text-right">
            <h1 className="font-heading text-2xl font-bold text-[#0B1F3A]">Your new website: handover pack</h1>
            <p className="text-gray-600 text-[13px]">
              Prepared for <strong>{p.clientBusiness || p.clientName}</strong>
              {date && <> · Launched {date}</>}
            </p>
          </div>
        </header>

        <p className="mt-5">
          Congratulations, your website is live at <strong>{site}</strong>. This page is everything you need to run it. Keep it somewhere safe.
        </p>

        <h2 className={h2}>1. What we built</h2>
        <ul className="list-disc pl-5 space-y-1">
          {h.pages && <li><strong>Pages:</strong> {h.pages}</li>}
          <li><strong>Built to be found:</strong> each service has its own page written the way your customers search; your Google Business Profile is updated; the site is readable by Google and AI search tools.</li>
          <li><strong>Built to win the enquiry:</strong> your previous jobs and reviews are on the page; call, WhatsApp and form buttons on every page.</li>
          <li><strong>Every enquiry comes to you:</strong> form enquiries go to <strong>{h.leadsEmail || owner}</strong>{h.adminUrl ? ' and appear in your admin panel' : ''}.</li>
        </ul>

        {h.adminUrl && (
          <>
            <h2 className={h2}>2. How to edit your website</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Go to <strong>{h.adminUrl}</strong> and log in with <strong>{owner}</strong>.</li>
              <li><strong>Change text or photos:</strong> open the page or section, edit, then press Publish. The change appears within a minute.</li>
              <li><strong>See your leads:</strong> newest at the top. Reply quickly; speed wins jobs.</li>
            </ol>
            <p className="mt-2">Stuck or worried about breaking something? Message us and we’ll do it for you{h.carePlan ? ' (included in your care plan)' : ''}.</p>
          </>
        )}

        <h2 className={h2}>{h.adminUrl ? '3' : '2'}. How to check how your site is doing</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Google Search Console</strong> (search.google.com/search-console), where you are the owner: <em>impressions</em> (how often you appeared in Google), <em>clicks</em>, and the searches that found you. New sites usually take a few weeks to build up impressions. Check monthly, not daily.</li>
          <li><strong>Free AI visibility check:</strong> elevatewebandmarketing.com/ai-visibility-check. Run it any time to see whether AI search tools can read your site.</li>
          <li><strong>Google Business Profile:</strong> keep your hours and photos current, and reply to every review.</li>
        </ul>

        <h2 className={h2}>{h.adminUrl ? '4' : '3'}. Your logins (you are the owner)</h2>
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="bg-[#0B1F3A] text-white text-left">
              <th className="py-1.5 px-2 font-semibold">Service</th>
              <th className="py-1.5 px-2 font-semibold">Owner</th>
              <th className="py-1.5 px-2 font-semibold">Elevate access</th>
            </tr>
          </thead>
          <tbody>
            {[
              [`Domain${h.registrar ? ` (${h.registrar})` : ''}`, owner, 'Manager'],
              ...(h.adminUrl ? [['Website admin', owner, 'Admin']] : []),
              ['Google Search Console', owner, 'User'],
              ['Google Analytics (GA4)', owner, 'Editor'],
              ['Google Business Profile', owner, 'Manager'],
            ].map(([a, b, c]) => (
              <tr key={a} className="border-b border-gray-200">
                <td className="py-1.5 px-2">{a}</td>
                <td className="py-1.5 px-2">{b}</td>
                <td className="py-1.5 px-2">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-[13px]">Use strong passwords and turn on 2-step verification. We will never ask for your passwords: add us as a user instead.</p>

        <h2 className={h2}>{h.adminUrl ? '5' : '4'}. What happens next</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Day 7:</strong> we check that Google is indexing your pages and your enquiries are arriving.</li>
          <li><strong>Day 30:</strong> a short report: pages indexed, searches you appeared for, enquiries received.</li>
          {h.carePlan && <li><strong>Care plan:</strong> {h.carePlan}.</li>}
        </ul>

        <h2 className={h2}>{h.adminUrl ? '6' : '5'}. A small favour</h2>
        <p>
          If you’re happy with your website, an <strong>honest</strong> Google review helps us a lot: {siteConfig.googleProfileUrl}. And if you know
          another business owner who needs this, we’d be grateful for an introduction.
        </p>

        <footer className="mt-8 pt-4 border-t border-gray-200 text-[13px] text-gray-600">
          Questions? WhatsApp {siteConfig.phone} · hello@elevatewebandmarketing.com
        </footer>
      </article>
    </div>
  );
}
