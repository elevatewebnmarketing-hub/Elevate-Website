'use client';

import { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Loader2, MessageCircle, Send } from 'lucide-react';
import type { VisibilityReport, CheckStatus } from '@/lib/visibility-check';
import { siteConfig } from '@/lib/site-config';

const ICON: Record<CheckStatus, JSX.Element> = {
  pass: <CheckCircle2 className="text-green-600 flex-shrink-0" size={22} aria-label="Pass" />,
  warn: <AlertTriangle className="text-amber-500 flex-shrink-0" size={22} aria-label="Needs attention" />,
  fail: <XCircle className="text-red-600 flex-shrink-0" size={22} aria-label="Problem" />,
};

function verdict(score: number): string {
  if (score >= 85) return 'Search engines and AI tools can read this page well.';
  if (score >= 60) return 'Readable, but there are gaps that cost you visibility.';
  return 'Search engines and AI tools struggle to read this page.';
}

export default function VisibilityChecker() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<(VisibilityReport & { checkId?: string | null }) | null>(null);
  const [lead, setLead] = useState({ name: '', phone: '', email: '', business: '', company: '' });
  const [sending, setSending] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [sent, setSent] = useState<null | { emailed: boolean; whatsappOnly: boolean }>(null);

  async function onLead(e: React.FormEvent) {
    e.preventDefault();
    if (!report) return;
    if (!lead.name.trim()) return setLeadError('Please add your name.');
    if (!lead.phone.trim() && !lead.email.trim()) return setLeadError('Add a WhatsApp number or an email so we can send the fix list.');
    setSending(true);
    setLeadError(null);
    try {
      const res = await fetch('/api/visibility-check/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, checkId: report.checkId, url: report.url, score: report.score, checks: report.checks }),
      });
      const data = await res.json();
      if (!res.ok) setLeadError(data.error ?? 'Something went wrong. Please WhatsApp us instead.');
      else setSent({ emailed: !!data.emailed, whatsappOnly: !!data.whatsappOnly });
    } catch {
      setLeadError('Something went wrong. Please WhatsApp us instead.');
    } finally {
      setSending(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setReport(null);
    setSent(null);
    setLeadError(null);
    try {
      const res = await fetch('/api/visibility-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? 'Something went wrong. Please try again.');
      else setReport(data);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const whatsapp = report
    ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
        `Hi Elevate, I ran the AI visibility check on ${report.url} and scored ${report.score}/100. Can you do the free full check?`
      )}`
    : null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-card-lg border border-gray-200 dark:border-white/10 p-6 sm:p-8 shadow-soft">
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="site-url" className="sr-only">Website address</label>
        <input
          id="site-url"
          type="text"
          inputMode="url"
          autoComplete="url"
          required
          placeholder="yourbusiness.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-4 rounded-xl border border-gray-300 dark:border-white/20 bg-background dark:bg-slate-900 text-primary dark:text-white text-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 disabled:opacity-60 transition-colors"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : null}
          {loading ? 'Checking…' : 'Check my website'}
        </button>
      </form>
      <p className="mt-3 text-sm text-text/60 dark:text-gray-400">Free, no sign-up. We check one public page as crawlers see it.</p>

      <div aria-live="polite">
        {error && <p className="mt-6 text-red-600 font-medium">{error}</p>}
        {report && (
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-heading font-bold text-5xl text-primary dark:text-white">{report.score}</span>
              <div>
                <p className="font-heading font-semibold text-primary dark:text-white">out of 100</p>
                <p className="text-text/80 dark:text-gray-300">{verdict(report.score)}</p>
              </div>
            </div>
            <ul className="space-y-4">
              {report.checks.map((c) => (
                <li key={c.id} className="flex gap-3">
                  {ICON[c.status]}
                  <div>
                    <p className="font-heading font-semibold text-primary dark:text-white">{c.label}</p>
                    <p className="text-text/80 dark:text-gray-300 text-sm leading-relaxed">{c.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            {whatsapp && (
              <div className="mt-8 p-6 rounded-card-lg bg-primary">
                <p className="text-white font-heading font-semibold text-lg mb-2">Get your fix list</p>
                <p className="text-white/80 text-sm mb-5">
                  We&apos;ll send what to fix on this page, in the order we&apos;d fix it, and offer our free full check: your
                  Google Business Profile, what ChatGPT says about you, and every page that matters, with a fixed quote. No
                  obligation.
                </p>
                {sent ? (
                  <div role="status" className="p-4 rounded-xl bg-white/10 text-white">
                    <p className="font-heading font-semibold">Thanks, {lead.name.split(' ')[0]}. It&apos;s on its way.</p>
                    <p className="text-white/80 text-sm mt-1">
                      {sent.whatsappOnly
                        ? 'Ufuoma will send your fix list on WhatsApp shortly, usually within a few hours on working days.'
                        : sent.emailed
                          ? 'Check your inbox (and spam folder) for the fix list. Ufuoma will also follow up personally.'
                          : 'Ufuoma will send your fix list personally, usually within a few hours on working days.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={onLead} className="grid sm:grid-cols-2 gap-3" noValidate>
                    <div>
                      <label htmlFor="vc-name" className="block text-sm text-white/90 mb-1">Your name</label>
                      <input id="vc-name" required autoComplete="name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white text-primary" />
                    </div>
                    <div>
                      <label htmlFor="vc-business" className="block text-sm text-white/90 mb-1">Business name</label>
                      <input id="vc-business" autoComplete="organization" value={lead.business} onChange={(e) => setLead({ ...lead, business: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white text-primary" />
                    </div>
                    <div>
                      <label htmlFor="vc-phone" className="block text-sm text-white/90 mb-1">WhatsApp number</label>
                      <input id="vc-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+234…" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white text-primary" />
                    </div>
                    <div>
                      <label htmlFor="vc-email" className="block text-sm text-white/90 mb-1">Email (to get the list by email)</label>
                      <input id="vc-email" type="email" autoComplete="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white text-primary" />
                    </div>
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="vc-company">Leave this empty</label>
                      <input id="vc-company" tabIndex={-1} autoComplete="off" value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} />
                    </div>
                    <p className="sm:col-span-2 text-xs text-white/70">
                      WhatsApp or email, at least one. We only use it to send your results and follow up about them. See our{' '}
                      <a href="/privacy" className="underline">privacy policy</a>.
                    </p>
                    {leadError && <p className="sm:col-span-2 text-sm font-medium text-red-200" role="alert">{leadError}</p>}
                    <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
                      <button
                        type="submit"
                        disabled={sending}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 disabled:opacity-60"
                      >
                        {sending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} aria-hidden />}
                        {sending ? 'Sending…' : 'Send me the fix list'}
                      </button>
                      <a href={whatsapp} className="inline-flex items-center gap-2 px-5 py-3 text-white font-heading font-semibold rounded-xl border border-white/30 hover:bg-white/10">
                        <MessageCircle size={18} aria-hidden /> Or WhatsApp us now
                      </a>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
