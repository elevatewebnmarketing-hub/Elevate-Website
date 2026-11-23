'use client';

import { useState, type ReactNode } from 'react';
import { formatMoney, invoiceTotals, INVOICE_CURRENCIES, type InvoiceCurrency } from '@/lib/invoices';

const control = 'min-h-11 w-full rounded-lg border border-slate-400 bg-white px-3 py-2 text-base text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700';
const panel = 'min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6';
const initialLine = { id: 1, description: '', quantity: '1', unitPrice: '' };
const maxItems = 50;

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="grid min-w-0 gap-1.5 text-sm font-semibold">{label}{children}</label>;
}

function value(input: string, max: number) {
  const n = Number(input);
  return Number.isFinite(n) ? Math.max(0, Math.min(max, n)) : 0;
}

export default function InvoiceEditor() {
  const [details, setDetails] = useState({ business: '', customer: '', businessContact: '', customerContact: '', number: 'INV-001', issued: '', due: '', notes: '' });
  const [items, setItems] = useState([initialLine]);
  const [nextId, setNextId] = useState(2);
  const [currency, setCurrency] = useState<InvoiceCurrency>('NGN');
  const [tax, setTax] = useState('');
  const [discount, setDiscount] = useState('');
  const lines = items.map(item => ({
    description: item.description,
    quantity: value(item.quantity, 10_000),
    unitPrice: value(item.unitPrice, 100_000_000),
  }));
  const amounts = lines.map(line => Math.round((line.quantity * line.unitPrice + Number.EPSILON) * 100) / 100);
  const totals = invoiceTotals({ items: amounts.map(unitPrice => ({ quantity: 1, unitPrice, description: '' })), taxRate: value(tax, 100), discount: value(discount, 100_000_000), amountPaid: 0 });
  const money = (amount: number) => formatMoney(amount, currency);
  const updateItem = (id: number, field: 'description' | 'quantity' | 'unitPrice', input: string) =>
    setItems(current => current.map(item => item.id === id ? { ...item, [field]: input } : item));

  return (
    <div className="grid min-w-0 gap-5 lg:grid-cols-2 print:block">
      <form className={`${panel} grid content-start gap-5 print:hidden`} onSubmit={event => {
        event.preventDefault();
        window.print();
      }}>
        <h2 className="font-heading text-xl font-bold">Invoice details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {([['business', 'Your business name'], ['customer', 'Client name'], ['number', 'Invoice number'], ['issued', 'Issue date'], ['due', 'Due date']] as const).map(([key, label]) =>
            <Field key={key} label={label}>
              <input className={control} type={key === 'issued' || key === 'due' ? 'date' : 'text'}
                maxLength={120} value={details[key]} required={key !== 'due'}
                min={key === 'due' ? details.issued || undefined : undefined}
                onChange={event => setDetails({ ...details, [key]: event.target.value })} />
            </Field>
          )}
          {([['businessContact', 'Your address or contact details (optional)'], ['customerContact', 'Client address or contact details (optional)']] as const).map(([key, label]) =>
            <Field key={key} label={label}>
              <textarea className={control} rows={2} maxLength={300} value={details[key]}
                onChange={event => setDetails({ ...details, [key]: event.target.value })} />
            </Field>
          )}
          <Field label="Currency">
            <select aria-label="Currency" className={control} value={currency} onChange={event => setCurrency(event.target.value as InvoiceCurrency)}>
              {INVOICE_CURRENCIES.map(code => <option key={code}>{code}</option>)}
            </select>
          </Field>
        </div>
        <fieldset className="min-w-0 space-y-3">
          <legend className="mb-2 font-heading text-lg font-bold">Line items</legend>
          {items.map((item, index) => (
            <div key={item.id} role="group" aria-label={`Item ${index + 1}`} className="grid gap-3 rounded-xl bg-slate-50 p-3 sm:grid-cols-2">
              <div className="sm:col-span-2"><Field label="Description">
                <input className={control} value={item.description} maxLength={200} required onChange={event => updateItem(item.id, 'description', event.target.value)} />
              </Field></div>
              <Field label="Quantity"><input className={control} type="number" min="0.01" max="10000" step="0.01" required value={item.quantity} onChange={event => updateItem(item.id, 'quantity', event.target.value)} /></Field>
              <Field label="Unit price"><input className={control} type="number" min="0" max="100000000" step="0.01" required value={item.unitPrice} onChange={event => updateItem(item.id, 'unitPrice', event.target.value)} /></Field>
              {items.length > 1 && <button className="min-h-11 justify-self-start text-sm font-semibold underline underline-offset-4" type="button" onClick={() => setItems(current => current.filter(row => row.id !== item.id))}>Remove item {index + 1}</button>}
            </div>
          ))}
          <button disabled={items.length >= maxItems} className="min-h-11 rounded-lg border border-blue-700 px-4 text-sm font-semibold text-blue-800 disabled:opacity-50" type="button" onClick={() => {
            setItems(current => [...current, { ...initialLine, id: nextId }]);
            setNextId(nextId + 1);
          }}>Add line item</button>
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Discount amount"><input className={control} type="number" min="0" max="100000000" step="0.01" value={discount} onChange={event => setDiscount(event.target.value)} /></Field>
          <Field label="Tax rate (%)"><input className={control} type="number" min="0" max="100" step="0.01" value={tax} onChange={event => setTax(event.target.value)} /></Field>
        </div>
        <Field label="Notes or payment instructions (optional)">
          <textarea className={control} rows={3} maxLength={1200} value={details.notes} onChange={event => setDetails({ ...details, notes: event.target.value })} />
        </Field>
        <button className="min-h-12 rounded-lg bg-[#102344] px-4 font-bold text-white" type="submit">Print / Save as PDF</button>
      </form>
      <section aria-label="Invoice preview" className={`${panel} lg:self-start print:rounded-none print:border-0 print:p-0`}>
        <p className="mb-4 text-sm font-semibold text-slate-600 print:hidden">Invoice preview</p>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-[#102344] pb-3">
          <h2 className="font-heading text-3xl font-bold">Invoice</h2>
          <p className="max-w-full break-all text-sm font-bold">{details.number || 'Invoice number'}</p>
        </div>
        <dl className="my-4 grid grid-cols-2 gap-3 text-sm [overflow-wrap:anywhere]">
          <div><dt className="font-bold">From</dt><dd>{details.business || 'Your business'}{details.businessContact && <span className="block whitespace-pre-wrap text-slate-700">{details.businessContact}</span>}</dd></div>
          <div><dt className="font-bold">Bill to</dt><dd>{details.customer || 'Your client'}{details.customerContact && <span className="block whitespace-pre-wrap text-slate-700">{details.customerContact}</span>}</dd></div>
          <div><dt className="font-bold">Issued</dt><dd>{details.issued || '—'}</dd></div>
          <div><dt className="font-bold">Due</dt><dd>{details.due || '—'}</dd></div>
        </dl>
        <table className="w-full text-left text-sm [overflow-wrap:anywhere]">
          <thead className="border-b border-slate-400"><tr><th className="py-2">Description</th><th className="px-2 text-right">Qty</th><th className="hidden px-2 text-right sm:table-cell print:table-cell">Unit price</th><th className="text-right">Amount</th></tr></thead>
          <tbody>{lines.map((line, index) => <tr key={items[index].id} className="border-b border-slate-200 break-inside-avoid"><td className="py-2">{line.description || 'Line item'}</td><td className="px-2 text-right">{line.quantity}</td><td className="hidden px-2 text-right sm:table-cell print:table-cell">{money(line.unitPrice)}</td><td className="text-right">{money(amounts[index])}</td></tr>)}</tbody>
        </table>
        <dl className="ml-auto mt-5 grid max-w-sm gap-2 text-sm break-inside-avoid">
          <div className="flex justify-between gap-3"><dt>Subtotal</dt><dd>{money(totals.subtotal)}</dd></div>
          <div className="flex justify-between gap-3"><dt>Discount</dt><dd>{money(totals.discount)}</dd></div>
          <div className="flex justify-between gap-3"><dt>Tax</dt><dd>{money(totals.tax)}</dd></div>
          <div className="flex justify-between gap-3 border-t border-slate-400 pt-2 text-lg font-bold"><dt>Total</dt><dd>{money(totals.total)}</dd></div>
        </dl>
        {details.notes && <p className="mt-5 whitespace-pre-wrap text-sm [overflow-wrap:anywhere]">{details.notes}</p>}
      </section>
    </div>
  );
}
