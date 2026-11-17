import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InvoiceDocument from '@/components/invoices/InvoiceDocument';
import PrintButton from '@/components/invoices/PrintButton';
import { getInvoiceByToken, listPaymentMethods } from '@/backend/invoices';

// Private client invoice: secret link, never indexed, and the link is not leaked to
// payment sites through the Referer header.
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Invoice',
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
};

export default async function ClientInvoicePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  let inv;
  try {
    inv = await getInvoiceByToken(token);
  } catch {
    inv = null;
  }
  if (!inv || inv.status === 'draft') notFound();

  let methods: Awaited<ReturnType<typeof listPaymentMethods>> = [];
  try {
    methods = (await listPaymentMethods()).filter((m) => m.active && inv.paymentMethodIds.includes(m.id));
  } catch {
    methods = [];
  }

  return (
    <div className="admin-panel min-h-screen bg-gray-100 print:bg-white py-6 sm:py-10 print:py-0 px-3 sm:px-4 print:px-0">
      <style>{`@page { size: A4; margin: 14mm; } @media print { html, body { background: #fff; } }`}</style>
      <div className="max-w-[794px] mx-auto mb-4 flex justify-end print:hidden">
        <PrintButton />
      </div>
      <InvoiceDocument inv={inv} methods={methods} />
    </div>
  );
}
