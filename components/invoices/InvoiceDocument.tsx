'use client';

import { useState } from 'react';
import { Copy, Check, CreditCard, Landmark, Wallet } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { siteConfig } from '@/lib/site-config';
import { formatMoney, invoiceTotals, type Invoice } from '@/lib/invoices';
import type { PaymentMethod } from '@/lib/payments';
import { PROJECT_TERMS_URL } from '@/lib/project-terms';
import AcceptBox, { type AcceptanceView } from '@/components/invoices/AcceptBox';

const STATUS_LABEL: Record<Invoice['status'], string> = {
  draft: 'Draft',
  sent: 'Due',
  part_paid: 'Part paid',
  paid: 'Paid',
  void: 'Void',
};

const longDate = (d: string) =>
  d ? new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {}
      }}
      className="print:hidden inline-flex items-center gap-1 text-[12px] text-[#2563eb] hover:underline"
      aria-label={`Copy ${label}`}
    >
      {done ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />} {done ? 'Copied' : 'Copy'}
    </button>
  );
}

function PayerRules({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div className="mt-3 rounded-md border-l-4 border-[#0B1F3A] bg-[#F7F9FC] px-3 py-2" style={{ breakInside: 'avoid' }}>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0B1F3A] mb-0.5">Before you pay</p>
      <p className="text-[12px] whitespace-pre-line text-gray-700">{text}</p>
    </div>
  );
}

/** The invoice as the client sees it: used by the admin print view and the client link (/i/<token>). */
export default function InvoiceDocument({
  inv,
  methods,
  acceptance = null,
  acceptToken,
}: {
  inv: Invoice;
  methods: PaymentMethod[];
  acceptance?: AcceptanceView | null;
  /** Only on the client page: lets the client click "I accept". */
  acceptToken?: string;
}) {
  const t = invoiceTotals(inv);
  const settled = inv.status === 'paid' || inv.status === 'void' || t.balance <= 0;
  const links = methods.filter((m) => m.kind === 'link' && (inv.methodLinks[m.id] || m.link));
  const banks = methods.filter((m) => m.kind === 'bank');
  const crypto = methods.filter((m) => m.kind === 'crypto');
  const hasPayment = !settled && (links.length || banks.length || crypto.length || inv.paymentInstructions);

  return (
    <article className="max-w-[794px] mx-auto bg-white shadow-soft print:shadow-none px-6 sm:px-10 py-8 sm:py-10 print:p-0 text-[13px] leading-relaxed text-[#1f2937]">
      <header className="flex flex-wrap items-start justify-between gap-6 pb-6 border-b-2 border-[#0B1F3A]">
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

      <section className="grid sm:grid-cols-2 gap-6 sm:gap-8 py-6">
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Bill to</h2>
          <p className="font-semibold text-[#0B1F3A]">{inv.clientBusiness || inv.clientName}</p>
          {inv.clientBusiness && <p>{inv.clientName}</p>}
          {inv.clientAddress && <p className="whitespace-pre-line">{inv.clientAddress}</p>}
          {inv.clientEmail && <p>{inv.clientEmail}</p>}
          {inv.clientPhone && <p>{inv.clientPhone}</p>}
        </div>
        <dl className="sm:justify-self-end grid grid-cols-[auto_auto] gap-x-6 gap-y-1 sm:text-right">
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

      <div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#0B1F3A] text-white text-left">
              <th className="py-2 px-3 font-semibold">Description</th>
              <th className="hidden sm:table-cell print:table-cell py-2 px-3 font-semibold text-right w-14">Qty</th>
              <th className="hidden sm:table-cell print:table-cell py-2 px-3 font-semibold text-right w-28">Unit price</th>
              <th className="py-2 px-3 font-semibold text-right w-28">Amount</th>
            </tr>
          </thead>
          <tbody>
            {inv.items.map((it, i) => (
              <tr key={i} className="border-b border-gray-200 align-top" style={{ breakInside: 'avoid' }}>
                <td className="py-2.5 px-3">
                  {it.description}
                  <span className="block sm:hidden print:hidden text-[12px] text-gray-500">
                    {it.quantity} × {formatMoney(it.unitPrice, inv.currency)}
                  </span>
                </td>
                <td className="hidden sm:table-cell print:table-cell py-2.5 px-3 text-right">{it.quantity}</td>
                <td className="hidden sm:table-cell print:table-cell py-2.5 px-3 text-right whitespace-nowrap">{formatMoney(it.unitPrice, inv.currency)}</td>
                <td className="py-2.5 px-3 text-right whitespace-nowrap">{formatMoney(it.quantity * it.unitPrice, inv.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4" style={{ breakInside: 'avoid' }}>
        <dl className="w-full sm:w-72 space-y-1">
          <div className="flex justify-between"><dt className="text-gray-600">Subtotal</dt><dd>{formatMoney(t.subtotal, inv.currency)}</dd></div>
          {t.discount > 0 && <div className="flex justify-between"><dt className="text-gray-600">Discount</dt><dd>−{formatMoney(t.discount, inv.currency)}</dd></div>}
          {t.tax > 0 && <div className="flex justify-between"><dt className="text-gray-600">Tax ({inv.taxRate}%)</dt><dd>{formatMoney(t.tax, inv.currency)}</dd></div>}
          <div className="flex justify-between font-semibold border-t border-gray-300 pt-1"><dt>Total</dt><dd>{formatMoney(t.total, inv.currency)}</dd></div>
          {t.paid > 0 && <div className="flex justify-between"><dt className="text-gray-600">Paid</dt><dd>−{formatMoney(t.paid, inv.currency)}</dd></div>}
          <div className="flex justify-between font-heading font-bold text-[16px] text-[#0B1F3A] bg-[#F7F9FC] px-2 py-1.5 rounded">
            <dt>Balance due</dt>
            <dd>{formatMoney(Math.max(t.balance, 0), inv.currency)}</dd>
          </div>
        </dl>
      </div>

      <p className="mt-6 text-[12px] text-gray-600" style={{ breakInside: 'avoid' }}>
        Paying this invoice, or clicking “I accept” on the online invoice, means you accept the work listed above and our project
        terms:{' '}
        <a href={PROJECT_TERMS_URL} target="_blank" rel="noopener noreferrer" className="underline text-[#2563eb] print:text-gray-700 print:no-underline">
          elevatewebandmarketing.com/terms#project-terms
        </a>
      </p>

      {inv.status !== 'void' && (inv.status !== 'paid' || acceptance?.current) && (
        <AcceptBox token={settled ? undefined : acceptToken} acceptance={acceptance} defaultName={inv.clientName} />
      )}

      {hasPayment ? (
        <section className="mt-8 pt-6 border-t border-gray-200" aria-labelledby="pay-heading">
          <h2 id="pay-heading" className="font-heading text-[16px] font-bold text-[#0B1F3A] mb-1">How to pay</h2>
          <p className="text-[12px] text-gray-600 mb-4">
            Please use <strong className="font-mono">{inv.number}</strong> as the payment reference, and pay from your own or your company&apos;s account.
          </p>

          {links.length > 0 && (
            <div className="mb-5" style={{ breakInside: 'avoid' }}>
              <h3 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">
                <CreditCard size={14} aria-hidden /> Pay by card
              </h3>
              <div className="flex flex-wrap gap-2">
                {links.map((m) => {
                  const url = inv.methodLinks[m.id] || m.link;
                  return (
                    <a
                      key={m.id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="print:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B1F3A] text-white font-semibold hover:bg-[#13305a]"
                    >
                      {m.label}
                    </a>
                  );
                })}
              </div>
              <ul className="hidden print:block text-[12px] mt-1">
                {links.map((m) => (
                  <li key={m.id}>
                    {m.label}: {inv.methodLinks[m.id] || m.link}
                  </li>
                ))}
              </ul>
              {links.some((m) => m.details) && (
                <p className="mt-2 text-[12px] text-gray-500 whitespace-pre-line">{links.map((m) => m.details).filter(Boolean).join('\n')}</p>
              )}
              {links
                .filter((m) => m.payerNotes)
                .map((m) => (
                  <PayerRules key={m.id} text={links.length > 1 ? `${m.label}:\n${m.payerNotes}` : m.payerNotes} />
                ))}
            </div>
          )}

          {banks.length > 0 && (
            <div className={`grid gap-4 mb-5 ${banks.length > 1 ? 'sm:grid-cols-2' : ''}`}>
              {banks.map((m) => (
                <div key={m.id} className="rounded-lg border border-gray-200 p-4" style={{ breakInside: 'avoid' }}>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="flex items-center gap-1.5 font-semibold text-[#0B1F3A]">
                      <Landmark size={14} aria-hidden /> {m.label}
                    </h3>
                    <CopyButton text={m.details} label={`${m.label} details`} />
                  </div>
                  <p className="whitespace-pre-line">{m.details}</p>
                  <PayerRules text={m.payerNotes} />
                </div>
              ))}
            </div>
          )}

          {crypto.map((m) => (
            <div key={m.id} className="rounded-lg border border-amber-300 bg-amber-50 p-4 mb-5" style={{ breakInside: 'avoid' }}>
              <h3 className="flex items-center gap-1.5 font-semibold text-[#0B1F3A] mb-1">
                <Wallet size={14} aria-hidden /> {m.label}
              </h3>
              <p className="font-semibold">Send only {m.network}. Other coins or networks will be lost.</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <code className="font-mono text-[12px] break-all bg-white border border-amber-200 rounded px-2 py-1">{m.address}</code>
                <CopyButton text={m.address} label="wallet address" />
              </div>
              {m.details && <p className="mt-2 text-[12px] whitespace-pre-line">{m.details}</p>}
              <PayerRules text={m.payerNotes} />
            </div>
          ))}

          {inv.paymentInstructions && <p className="whitespace-pre-line text-[12px] text-gray-700">{inv.paymentInstructions}</p>}
        </section>
      ) : null}

      {inv.notes && (
        <section className="mt-6 pt-4 border-t border-gray-200" style={{ breakInside: 'avoid' }}>
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Notes</h2>
          <p className="whitespace-pre-line">{inv.notes}</p>
        </section>
      )}

      <footer className="mt-10 text-center text-[11px] text-gray-500">
        Thank you for your business. Questions? WhatsApp {siteConfig.phone} or email hello@elevatewebandmarketing.com
      </footer>
    </article>
  );
}
