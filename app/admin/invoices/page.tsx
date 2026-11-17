'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, Receipt, Repeat, Play } from 'lucide-react';
import { Breadcrumbs } from '@/admin/Breadcrumbs';
import { CardSkeleton } from '@/admin/Skeleton';
import { INVOICE_STATUSES, formatMoney, invoiceTotals, type Invoice } from '@/lib/invoices';

const STATUS_STYLE: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  sent: 'bg-blue-50 text-blue-700',
  part_paid: 'bg-amber-50 text-amber-800',
  paid: 'bg-emerald-50 text-emerald-700',
  void: 'bg-red-50 text-red-700 line-through',
};

export default function AdminInvoicesPage() {
  const [items, setItems] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [schedules, setSchedules] = useState<{ id: string; templateInvoiceId: string; label: string; active: boolean; nextRun: string }[]>([]);
  const [running, setRunning] = useState(false);
  const [runResult, setRunResult] = useState<{ created: string[]; reminders: string[]; skipped: string[] } | null>(null);

  useEffect(() => {
    fetch('/api/billing', { credentials: 'include', cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : []))
      .then(setSchedules)
      .catch(() => {});
  }, []);

  async function runNow() {
    setRunning(true);
    try {
      const res = await fetch('/api/billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'run' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Billing run failed');
      setRunResult(data);
      const [inv, sch] = await Promise.all([
        fetch('/api/invoices', { credentials: 'include', cache: 'no-store' }).then((r) => r.json()),
        fetch('/api/billing', { credentials: 'include', cache: 'no-store' }).then((r) => r.json()),
      ]);
      setItems(inv);
      setSchedules(sch);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Billing run failed');
    } finally {
      setRunning(false);
    }
  }

  useEffect(() => {
    fetch('/api/invoices', { credentials: 'include', cache: 'no-store' })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || 'Could not load invoices');
        setItems(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Money still owed, per currency (never add naira and dollars together).
  const outstanding = useMemo(() => {
    const byCur: Record<string, number> = {};
    for (const inv of items) {
      if (inv.status === 'sent' || inv.status === 'part_paid') {
        byCur[inv.currency] = (byCur[inv.currency] ?? 0) + invoiceTotals(inv).balance;
      }
    }
    return Object.entries(byCur);
  }, [items]);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Invoices' }]} />
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-3xl text-primary mb-1">Invoices</h1>
          <p className="text-text/80">
            {outstanding.length
              ? `Outstanding: ${outstanding.map(([c, v]) => formatMoney(v, c)).join(' · ')}`
              : 'Create an invoice, print it to PDF, and send it on WhatsApp or email.'}
          </p>
        </div>
        <Link
          href="/admin/invoices/new"
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition"
        >
          <Plus size={18} aria-hidden /> New invoice
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">{error}</div>
      )}

      <section className="mb-6 p-5 bg-white rounded-card shadow-soft border border-gray-100" aria-labelledby="monthly-h">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="monthly-h" className="flex items-center gap-2 font-heading font-semibold text-primary">
            <Repeat size={18} aria-hidden /> Monthly billing and reminders
          </h2>
          <button type="button" onClick={runNow} disabled={running} className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-60">
            <Play size={15} aria-hidden /> {running ? 'Running…' : 'Run now'}
          </button>
        </div>
        <p className="text-sm text-text/70 mt-1">
          Runs every morning by itself: creates monthly invoices that are due and emails payment reminders (once each: 2 days before,
          the day after, and a week after the due date). Turn on monthly billing from an invoice’s page.
        </p>
        {schedules.length > 0 && (
          <ul className="mt-3 divide-y divide-gray-100 text-sm">
            {schedules.map((sc) => (
              <li key={sc.id} className="py-2 flex flex-wrap justify-between gap-2">
                <Link href={`/admin/invoices/${sc.templateInvoiceId}`} className="text-accent hover:underline">{sc.label}</Link>
                <span className={sc.active ? 'text-text/70' : 'text-text/50'}>{sc.active ? `Next: ${sc.nextRun}` : 'Paused'}</span>
              </li>
            ))}
          </ul>
        )}
        {runResult && (
          <div role="status" className="mt-3 rounded-lg bg-gray-50 px-3 py-2 text-sm">
            {runResult.created.length + runResult.reminders.length === 0 ? (
              <p>Nothing due today.</p>
            ) : (
              <>
                {runResult.created.map((x) => <p key={x}>New invoice: {x}</p>)}
                {runResult.reminders.map((x) => <p key={x}>Reminder sent: {x}</p>)}
              </>
            )}
            {runResult.skipped.map((x) => <p key={x} className="text-amber-800">Skipped: {x}</p>)}
          </div>
        )}
      </section>

      {loading ? (
        <CardSkeleton />
      ) : items.length === 0 && !error ? (
        <div className="p-10 text-center bg-white rounded-card shadow-soft border border-gray-100">
          <Receipt className="mx-auto mb-3 text-text/40" size={32} aria-hidden />
          <p className="text-text/80">No invoices yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-card shadow-soft border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-text/60 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 font-medium">Number</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Issued</th>
                <th className="px-4 py-3 font-medium">Due</th>
                <th className="px-4 py-3 font-medium text-right">Total</th>
                <th className="px-4 py-3 font-medium text-right">Balance</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((inv) => {
                const t = invoiceTotals(inv);
                const overdue =
                  (inv.status === 'sent' || inv.status === 'part_paid') &&
                  inv.dueDate &&
                  inv.dueDate < new Date().toISOString().slice(0, 10);
                return (
                  <tr key={inv.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                    <td className="px-4 py-3 font-mono whitespace-nowrap">
                      <Link href={`/admin/invoices/${inv.id}`} className="text-accent hover:underline">
                        {inv.number}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-primary">{inv.clientBusiness || inv.clientName}</span>
                      {inv.clientBusiness && <span className="block text-text/60">{inv.clientName}</span>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{inv.issueDate}</td>
                    <td className={`px-4 py-3 whitespace-nowrap ${overdue ? 'text-red-700 font-medium' : ''}`}>
                      {inv.dueDate || '—'}
                      {overdue ? ' (overdue)' : ''}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">{formatMoney(t.total, inv.currency)}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">{formatMoney(t.balance, inv.currency)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLE[inv.status]}`}>
                        {INVOICE_STATUSES.find((s) => s.value === inv.status)?.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
