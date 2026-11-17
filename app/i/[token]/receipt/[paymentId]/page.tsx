import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getInvoiceByToken, listInvoicePayments } from '@/backend/invoices';
import { formatMoney, invoiceTotals } from '@/lib/invoices';
import { siteConfig } from '@/lib/site-config';
import Logo from '@/components/ui/Logo';
import PrintButton from '@/components/invoices/PrintButton';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Payment receipt',
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
};

const longDate = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function ReceiptPage({ params }: { params: Promise<{ token: string; paymentId: string }> }) {
  const { token, paymentId } = await params;
  const inv = await getInvoiceByToken(token).catch(() => null);
  if (!inv || inv.status === 'draft') notFound();
  const payments = await listInvoicePayments(inv.id).catch(() => [] as Awaited<ReturnType<typeof listInvoicePayments>>);
  const payment = payments.find((p) => p.id === paymentId);
  if (!payment) notFound();
  const t = invoiceTotals(inv);
  // Balance straight after this payment (payments are listed oldest first).
  const paidUpTo = payments.slice(0, payments.indexOf(payment) + 1).reduce((s, p) => s + p.amount, 0);
  const balanceAfter = Math.max(0, Math.round((t.total - paidUpTo) * 100) / 100);
  const receiptNo = `${inv.number}-R${payments.indexOf(payment) + 1}`;

  return (
    <div className="admin-panel min-h-screen bg-gray-100 print:bg-white py-6 sm:py-10 print:py-0 px-3 sm:px-4 print:px-0">
      <style>{`@page { size: A4; margin: 14mm; } @media print { html, body { background: #fff; } }`}</style>
      <div className="max-w-[640px] mx-auto mb-4 flex justify-end print:hidden">
        <PrintButton />
      </div>
      <article className="max-w-[640px] mx-auto bg-white shadow-soft print:shadow-none px-6 sm:px-10 py-8 sm:py-10 print:p-0 text-[14px] leading-relaxed text-[#1f2937]">
        <header className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b-2 border-[#0B1F3A]">
          <div>
            <div className="-my-3 -ml-2 h-16 w-32 overflow-hidden flex items-center">
              <Logo variant="black" width={130} height={130} />
            </div>
            <p className="mt-2 text-[12px] text-gray-600">
              {siteConfig.companyName} · hello@elevatewebandmarketing.com · {siteConfig.phone}
            </p>
          </div>
          <div className="text-right">
            <h1 className="font-heading text-2xl font-bold text-[#0B1F3A]">Payment receipt</h1>
            <p className="font-mono text-[13px]">{receiptNo}</p>
          </div>
        </header>
        <p className="mt-5">
          Received from <strong>{inv.clientBusiness || inv.clientName}</strong>
          {inv.clientBusiness && <> ({inv.clientName})</>}, with thanks.
        </p>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5">
          <dt className="text-gray-500">Amount received</dt>
          <dd className="font-heading font-bold text-[18px] text-[#0B1F3A]">{formatMoney(payment.amount, inv.currency)}</dd>
          <dt className="text-gray-500">Date</dt>
          <dd>{longDate(payment.paidOn)}</dd>
          {payment.method && (
            <>
              <dt className="text-gray-500">Paid by</dt>
              <dd>{payment.method}</dd>
            </>
          )}
          {payment.reference && (
            <>
              <dt className="text-gray-500">Reference</dt>
              <dd className="break-all">{payment.reference}</dd>
            </>
          )}
          <dt className="text-gray-500">For invoice</dt>
          <dd>
            {inv.number} (total {formatMoney(t.total, inv.currency)})
          </dd>
          <dt className="text-gray-500">Balance after this payment</dt>
          <dd className="font-semibold">{balanceAfter > 0 ? formatMoney(balanceAfter, inv.currency) : 'Paid in full'}</dd>
        </dl>
        <p className="mt-6 text-[13px]">
          <a href={`/i/${token}`} className="text-[#2563eb] underline print:no-underline print:text-gray-700">View the invoice</a>
        </p>
        <footer className="mt-8 pt-4 border-t border-gray-200 text-[12px] text-gray-500">Thank you for your business.</footer>
      </article>
    </div>
  );
}
