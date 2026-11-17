'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import InvoiceDocument from '@/components/invoices/InvoiceDocument';
import type { Invoice } from '@/lib/invoices';
import type { PaymentMethod } from '@/lib/payments';
import type { AcceptanceView } from '@/components/invoices/AcceptBox';

export default function InvoicePrintPage() {
  const { id } = useParams() as { id: string };
  const [inv, setInv] = useState<Invoice | null>(null);
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [error, setError] = useState('');
  const [acceptance, setAcceptance] = useState<AcceptanceView | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/invoices/${id}`, { credentials: 'include', cache: 'no-store' }).then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || 'Could not load invoice');
        return data as Invoice;
      }),
      fetch('/api/payment-methods', { credentials: 'include', cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
      fetch(`/api/invoices/${id}/acceptance`, { credentials: 'include', cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : { acceptance: null }))
        .catch(() => ({ acceptance: null })),
    ])
      .then(([data, all, acc]) => {
        setAcceptance(acc.acceptance);
        setInv(data);
        setMethods((all as PaymentMethod[]).filter((m) => m.active && data.paymentMethodIds.includes(m.id)));
        document.title = `${data.number} ${data.clientBusiness || data.clientName}`; // becomes the PDF file name
      })
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <p className="p-8 text-red-700">{error}</p>;
  if (!inv) return <p className="p-8 text-text/70">Loading…</p>;

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white py-8 print:py-0">
      <style>{`@page { size: A4; margin: 12mm; } @media print { html, body { background: #fff; } }`}</style>
      <div className="max-w-[794px] mx-auto mb-4 flex justify-end gap-2 print:hidden px-4">
        <button
          type="button"
          onClick={() => window.print()}
          className="px-5 py-2 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90"
        >
          Save as PDF / print
        </button>
      </div>
      <InvoiceDocument inv={inv} methods={methods} acceptance={acceptance} />
    </div>
  );
}
