'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { PROJECT_TERMS_URL } from '@/lib/project-terms';

export interface AcceptanceView {
  acceptedName: string;
  acceptedAt: string;
  current: boolean;
}

const when = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

/** "I accept" on the client invoice: records name, time and exactly what was accepted. */
export default function AcceptBox({ token, acceptance, defaultName }: { token?: string; acceptance: AcceptanceView | null; defaultName: string }) {
  const router = useRouter();
  const [name, setName] = useState(defaultName);
  const [agree, setAgree] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState<AcceptanceView | null>(null);
  const shown = done ?? (acceptance?.current ? acceptance : null);

  if (shown) {
    return (
      <div role="status" className="mt-8 print:mt-3 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 print:py-1.5 text-emerald-900" style={{ breakInside: 'avoid' }}>
        <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" aria-hidden />
        <p className="text-[13px]">
          <strong>Accepted by {shown.acceptedName}</strong> on {when(shown.acceptedAt)}: the work listed above and the{' '}
          <a href={PROJECT_TERMS_URL} target="_blank" rel="noopener noreferrer" className="underline">project terms</a>.
        </p>
      </div>
    );
  }
  if (!token) return null; // print view: nothing to click

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!agree) return setError('Please tick the box to accept.');
    if (name.trim().length < 2) return setError('Please type your full name.');
    setSending(true);
    try {
      const res = await fetch(`/api/i/${token}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), agree: true }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setDone({ acceptedName: data.acceptedName, acceptedAt: data.acceptedAt, current: true });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className="print:hidden mt-8 rounded-lg border border-gray-300 p-4 sm:p-5" aria-labelledby="accept-heading">
      <h2 id="accept-heading" className="font-heading text-[16px] font-bold text-[#0B1F3A] mb-1">Accept this invoice</h2>
      {acceptance && !acceptance.current && (
        <p className="text-[12px] text-amber-800 bg-amber-50 border border-amber-200 rounded px-2 py-1.5 mb-3">
          This invoice changed after {acceptance.acceptedName} accepted it on {when(acceptance.acceptedAt)}. Please review it and accept again.
        </p>
      )}
      <p className="text-[13px] text-gray-600 mb-3">No contract to sign: confirm the work listed above and our short project terms (payment, timeline, changes, ownership).</p>
      <label className="flex items-start gap-2.5 text-[13px] mb-3">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#0B1F3A]" />
        <span>
          I accept the work listed on this invoice and the{' '}
          <a href={PROJECT_TERMS_URL} target="_blank" rel="noopener noreferrer" className="underline text-[#2563eb]">project terms</a>.
        </span>
      </label>
      <div className="flex flex-wrap items-end gap-2">
        <div className="flex-1 min-w-[12rem]">
          <label htmlFor="accept-name" className="block text-[12px] text-gray-600 mb-1">Your full name</label>
          <input
            id="accept-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]"
          />
        </div>
        <button type="submit" disabled={sending} className="px-5 py-2 rounded-lg bg-[#0B1F3A] text-white font-semibold hover:bg-[#13305a] disabled:opacity-70">
          {sending ? 'Saving…' : 'I accept'}
        </button>
      </div>
      {error && <p role="alert" className="mt-2 text-[12px] text-red-700">{error}</p>}
      <p className="mt-2 text-[11px] text-gray-500">We record your name, the date and time, and the invoice you accepted.</p>
    </form>
  );
}
