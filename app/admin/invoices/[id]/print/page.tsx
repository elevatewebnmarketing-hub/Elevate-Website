'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import { siteConfig } from '@/lib/site-config';
import { formatMoney, invoiceTotals, type Invoice } from '@/lib/invoices';

const STATUS_LABEL: Record<Invoice['status'], string> = {
  draft: 'Draft',
  sent: 'Due',
  part_paid: 'Part paid',
  paid: 'Paid',
  void: 'Void',
};

const longDate = (d: string) =>
  d ? new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

export default function InvoicePrintPage() {
  const { id } = useParams() as { id: string };
  const [inv, setInv] = useState<Invoice | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/invoices/${id}`, { credentials: 'include', cache: 'no-store' })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || 'Could not load invoice');
        setInv(data);
        document.title = `${data.number} ${data.clientBusiness || data.clientName}`; // becomes the PDF file name
      })
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <p className="p-8 text-red-700">{error}</p>;
  if (!inv) return <p className="p-8 text-text/70">Loading…</p>;

  const t = invoiceTotals(inv);

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white py-8 print:py-0">
      <style>{`@page { size: A4; margin: 14mm; } @media print { html, body { background: #fff; } }`}</style>

      <div className="max-w-[794px] mx-auto mb-4 flex justify-end gap-2 print:hidden px-4">
        <button
          type="button"
          onClick={() => window.print()}
          className="px-5 py-2 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90"
        >
          Save as PDF / print
        </button>
      </div>

      <article className="max-w-[794px] mx-auto bg-white shadow-soft print:shadow-none px-10 py-10 print:p-0 text-[13px] leading-relaxed text-[#1f2937]">
        <header className="flex items-start justify-between gap-6 pb-6 border-b-2 border-[#0B1F3A]">
          <div>
            <div className="-my-3 -ml-2 h-20 w-36 overflow-hidden flex items-center">
              <Logo variant="black" width={150} height={150} />
            </div>
            <p className="mt-3 text-[12px] text-gray-600">
              {siteConfig.companyName}
              <br />
              hello@elevatewebandmarketing.com · {siteConfig.phone}
              <br />
              www.elevatewebandmarketing.com
            </p>
          </div>
          <div className="text-right">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#0B1F3A]">Invoice</h1>
            <p className="font-mono text-[13px] mt-1">{inv.number}</p>
            <p
              className={`inline-block mt-2 px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
                inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : inv.status === 'void' ? 'bg-red-100 text-red-800' : 'bg-[#EAF2FE] text-[#0B1F3A]'
              }`}
            >
              {STATUS_LABEL[inv.status]}
            </p>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-8 py-6">
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Bill to</h2>
            <p className="font-semibold text-[#0B1F3A]">{inv.clientBusiness || inv.clientName}</p>
            {inv.clientBusiness && <p>{inv.clientName}</p>}
            {inv.clientAddress && <p className="whitespace-pre-line">{inv.clientAddress}</p>}
            {inv.clientEmail && <p>{inv.clientEmail}</p>}
            {inv.clientPhone && <p>{inv.clientPhone}</p>}
          </div>
          <dl className="justify-self-end grid grid-cols-[auto_auto] gap-x-6 gap-y-1 text-right">
            <dt className="text-gray-500">Issue date</dt>
            <dd>{longDate(inv.issueDate)}</dd>
            {inv.dueDate && (
              <>
                <dt className="text-gray-500">Due date</dt>
                <dd className="font-semibold">{longDate(inv.dueDate)}</dd>
              </>
            )}
            <dt className="text-gray-500">Currency</dt>
            <dd>{inv.currency}</dd>
          </dl>
        </section>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#0B1F3A] text-white text-left">
              <th className="py-2 px-3 font-semibold">Description</th>
              <th className="py-2 px-3 font-semibold text-right w-16">Qty</th>
              <th className="py-2 px-3 font-semibold text-right w-32">Unit price</th>
              <th className="py-2 px-3 font-semibold text-right w-32">Amount</th>
            </tr>
          </thead>
          <tbody>
            {inv.items.map((it, i) => (
              <tr key={i} className="border-b border-gray-200 align-top" style={{ breakInside: 'avoid' }}>
                <td className="py-2.5 px-3">{it.description}</td>
                <td className="py-2.5 px-3 text-right">{it.quantity}</td>
                <td className="py-2.5 px-3 text-right whitespace-nowrap">{formatMoney(it.unitPrice, inv.currency)}</td>
                <td className="py-2.5 px-3 text-right whitespace-nowrap">{formatMoney(it.quantity * it.unitPrice, inv.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4" style={{ breakInside: 'avoid' }}>
          <dl className="w-72 space-y-1">
            <div className="flex justify-between"><dt className="text-gray-600">Subtotal</dt><dd>{formatMoney(t.subtotal, inv.currency)}</dd></div>
            {t.discount > 0 && <div className="flex justify-between"><dt className="text-gray-600">Discount</dt><dd>−{formatMoney(t.discount, inv.currency)}</dd></div>}
            {t.tax > 0 && <div className="flex justify-between"><dt className="text-gray-600">Tax ({inv.taxRate}%)</dt><dd>{formatMoney(t.tax, inv.currency)}</dd></div>}
            <div className="flex justify-between font-semibold border-t border-gray-300 pt-1"><dt>Total</dt><dd>{formatMoney(t.total, inv.currency)}</dd></div>
            {t.paid > 0 && <div className="flex justify-between"><dt className="text-gray-600">Paid</dt><dd>−{formatMoney(t.paid, inv.currency)}</dd></div>}
            <div className="flex justify-between font-heading font-bold text-[16px] text-[#0B1F3A] bg-[#F7F9FC] px-2 py-1.5 rounded">
              <dt>Balance due</dt>
              <dd>{formatMoney(t.balance, inv.currency)}</dd>
            </div>
          </dl>
        </div>

        {(inv.paymentInstructions || inv.notes) && (
          <section className="grid grid-cols-2 gap-8 mt-8 pt-6 border-t border-gray-200" style={{ breakInside: 'avoid' }}>
            {inv.paymentInstructions && (
              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">How to pay</h2>
                <p className="whitespace-pre-line">{inv.paymentInstructions}</p>
                <p className="mt-2 text-[12px] text-gray-500">Please use {inv.number} as the payment reference.</p>
              </div>
            )}
            {inv.notes && (
              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Notes</h2>
                <p className="whitespace-pre-line">{inv.notes}</p>
              </div>
            )}
          </section>
        )}

        <footer className="mt-10 text-center text-[11px] text-gray-500">Thank you for your business.</footer>
      </article>
    </div>
  );
}
