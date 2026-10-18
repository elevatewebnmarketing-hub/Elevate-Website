'use client';

import { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Loader2, MessageCircle } from 'lucide-react';
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
  const [report, setReport] = useState<VisibilityReport | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setReport(null);
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
                <p className="text-white font-heading font-semibold mb-2">Want the full picture?</p>
                <p className="text-white/80 text-sm mb-4">
                  This checks one page. Our free full check also looks at your Google Business Profile, what ChatGPT says
                  about you, and every page that matters, then gives you a fixed quote to fix it.
                </p>
                <a
                  href={whatsapp}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90"
                >
                  <MessageCircle size={18} /> Get the free full check
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
