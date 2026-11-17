'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Plus, Trash2, Printer, MessageCircle, Save, Copy } from 'lucide-react';
import { Breadcrumbs } from '@/admin/Breadcrumbs';
import { CardSkeleton } from '@/admin/Skeleton';
import {
  INVOICE_CURRENCIES,
  INVOICE_STATUSES,
  emptyInvoice,
  formatMoney,
  invoiceTotals,
  type Invoice,
  type InvoiceItem,
} from '@/lib/invoices';
import type { PricingPackage, PackageKey } from '@/lib/pricing-config';

const PACKAGE_NAMES: Record<PackageKey, string> = {
  starter: 'Starter Website',
  business: 'Business Website',
  ecommerce: 'E-commerce Website',
  growth_suite: 'E-commerce Growth Suite',
  google_growth: 'Website Care Plan (monthly)',
  meta_growth: 'Local SEO Plan (monthly)',
  local_seo_setup: 'Local SEO setup',
  google_ads: 'Google Ads management (monthly; ad spend paid to Google)',
  meta_ads: 'Facebook & Instagram Ads management (monthly; ad spend paid to Meta)',
};

const CURRENCY_TO_LOCATION: Record<string, string> = { NGN: 'NG', USD: 'US', GBP: 'GB', CAD: 'CA', AUD: 'AU' };

const input =
  'w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none bg-white';
const label = 'block text-sm font-medium text-primary mb-1.5';

export default function AdminInvoiceEditPage() {
  const router = useRouter();
  const params = useParams();
  const search = useSearchParams();
  const id = params.id as string;
  const isNew = id === 'new';

  const [inv, setInv] = useState<Invoice>(emptyInvoice());
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [packages, setPackages] = useState<PricingPackage[]>([]);

  // Load an existing invoice, or prefill a new one (last payment instructions; client from an onboarding form).
  useEffect(() => {
    if (!isNew) {
      fetch(`/api/invoices/${id}`, { credentials: 'include', cache: 'no-store' })
        .then(async (r) => {
          const data = await r.json();
          if (!r.ok) throw new Error(data.error || 'Could not load invoice');
          setInv(data);
        })
        .catch((e) => setMessage({ kind: 'err', text: e.message }))
        .finally(() => setLoading(false));
      return;
    }
    fetch('/api/invoices', { credentials: 'include', cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : []))
      .then((list: Invoice[]) => {
        const last = list.find((i) => i.paymentInstructions);
        if (last) setInv((p) => ({ ...p, paymentInstructions: p.paymentInstructions || last.paymentInstructions }));
      })
      .catch(() => {});
    const intakeId = search.get('intake');
    if (intakeId) {
      fetch(`/api/intake/${intakeId}`, { credentials: 'include', cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((it) => {
          if (!it) return;
          setInv((p) => ({
            ...p,
            intakeId: it.id,
            clientName: it.contactName,
            clientBusiness: it.businessName,
            clientEmail: it.email,
            clientPhone: it.phone,
            clientAddress: it.data?.address ?? '',
          }));
        })
        .catch(() => {});
    }
  }, [id, isNew, search]);

  useEffect(() => {
    const loc = CURRENCY_TO_LOCATION[inv.currency];
    if (!loc) {
      setPackages([]);
      return;
    }
    fetch(`/api/pricing?location=${loc}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((p: PricingPackage[]) => setPackages(p.filter((x) => !x.isCustom)))
      .catch(() => setPackages([]));
  }, [inv.currency]);

  const totals = useMemo(() => invoiceTotals(inv), [inv]);
  const set = <K extends keyof Invoice>(key: K, value: Invoice[K]) => setInv((p) => ({ ...p, [key]: value }));
  const setItem = (i: number, patch: Partial<InvoiceItem>) =>
    setInv((p) => ({ ...p, items: p.items.map((it, j) => (j === i ? { ...it, ...patch } : it)) }));

  function addPackage(pkg: PricingPackage) {
    const item = { description: PACKAGE_NAMES[pkg.packageKey], quantity: 1, unitPrice: pkg.amount };
    setInv((p) => ({
      ...p,
      items: p.items.length === 1 && !p.items[0].description && !p.items[0].unitPrice ? [item] : [...p.items, item],
    }));
  }

  function makeDeposit() {
    if (!confirm('Turn every line into a 50% deposit?')) return;
    setInv((p) => ({
      ...p,
      items: p.items.map((it) => ({
        ...it,
        description: it.description.startsWith('50% deposit') ? it.description : `50% deposit: ${it.description}`,
        unitPrice: Math.round((it.unitPrice / 2) * 100) / 100,
      })),
    }));
  }

  async function save(): Promise<Invoice | null> {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(isNew ? '/api/invoices' : `/api/invoices/${id}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(inv),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save');
      setInv(data);
      setMessage({ kind: 'ok', text: `Saved ${data.number}` });
      if (isNew) router.replace(`/admin/invoices/${data.id}`);
      return data;
    } catch (e) {
      setMessage({ kind: 'err', text: e instanceof Error ? e.message : 'Could not save' });
      return null;
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm(`Delete ${inv.number}? This cannot be undone. (To cancel an invoice you already sent, set it to Void instead.)`)) return;
    const res = await fetch(`/api/invoices/${id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) router.push('/admin/invoices');
    else setMessage({ kind: 'err', text: 'Could not delete' });
  }

  function whatsappText() {
    const lines = [
      `Hello ${inv.clientName.split(' ')[0] || ''},`.trim(),
      '',
      `Here is invoice ${inv.number} from Elevate Web & Marketing.`,
      ...inv.items.map((i) => `• ${i.description}: ${formatMoney(i.quantity * i.unitPrice, inv.currency)}`),
      `Total: ${formatMoney(totals.total, inv.currency)}`,
      totals.paid ? `Paid so far: ${formatMoney(totals.paid, inv.currency)}` : '',
      `Amount due: ${formatMoney(totals.balance, inv.currency)}${inv.dueDate ? ` by ${inv.dueDate}` : ''}`,
      inv.paymentInstructions ? `\nPayment details:\n${inv.paymentInstructions}` : '',
      '',
      'The PDF is attached. Thank you!',
    ];
    return lines.filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n');
  }

  async function copyWhatsapp() {
    await navigator.clipboard.writeText(whatsappText());
    setMessage({ kind: 'ok', text: 'Message copied. Paste it in WhatsApp and attach the PDF.' });
  }

  const waLink = inv.clientPhone
    ? `https://wa.me/${inv.clientPhone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(whatsappText())}`
    : '';

  if (loading) return <CardSkeleton />;

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Invoices', href: '/admin/invoices' },
          { label: isNew ? 'New invoice' : inv.number },
        ]}
      />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="font-heading font-bold text-3xl text-primary">{isNew ? 'New invoice' : inv.number}</h1>
        <div className="flex flex-wrap gap-2">
          {!isNew && (
            <>
              <Link
                href={`/admin/invoices/${id}/print`}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                <Printer size={16} aria-hidden /> PDF / print
              </Link>
              <button
                type="button"
                onClick={copyWhatsapp}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                <Copy size={16} aria-hidden /> Copy message
              </button>
              {waLink && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                >
                  <MessageCircle size={16} aria-hidden /> WhatsApp
                </a>
              )}
            </>
          )}
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition disabled:opacity-70"
          >
            <Save size={16} aria-hidden /> {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {message && (
        <div
          role="status"
          className={`mb-6 p-3 rounded-xl text-sm ${message.kind === 'ok' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}
        >
          {message.text}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="p-6 bg-white rounded-card shadow-soft border border-gray-100">
            <h2 className="font-heading font-semibold text-primary mb-4">Bill to</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={label} htmlFor="clientName">Client name *</label>
                <input id="clientName" className={input} value={inv.clientName} onChange={(e) => set('clientName', e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="clientBusiness">Business</label>
                <input id="clientBusiness" className={input} value={inv.clientBusiness} onChange={(e) => set('clientBusiness', e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="clientEmail">Email</label>
                <input id="clientEmail" type="email" className={input} value={inv.clientEmail} onChange={(e) => set('clientEmail', e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="clientPhone">WhatsApp / phone</label>
                <input id="clientPhone" type="tel" className={input} value={inv.clientPhone} onChange={(e) => set('clientPhone', e.target.value)} placeholder="+234…" />
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="clientAddress">Address</label>
                <textarea id="clientAddress" rows={2} className={input} value={inv.clientAddress} onChange={(e) => set('clientAddress', e.target.value)} />
              </div>
            </div>
          </section>

          <section className="p-6 bg-white rounded-card shadow-soft border border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="font-heading font-semibold text-primary">Items</h2>
              <button type="button" onClick={makeDeposit} className="text-sm text-accent hover:underline">
                Make this a 50% deposit invoice
              </button>
            </div>

            {packages.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-text/60 mb-2">Add a package at the current {inv.currency} price:</p>
                <div className="flex flex-wrap gap-2">
                  {packages.map((p) => (
                    <button
                      key={p.packageKey}
                      type="button"
                      onClick={() => addPackage(p)}
                      className="px-3 py-1.5 text-xs rounded-full border border-gray-200 hover:border-accent hover:text-accent transition"
                    >
                      {PACKAGE_NAMES[p.packageKey].split(' (')[0]} · {formatMoney(p.amount, inv.currency)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              {inv.items.map((it, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-start">
                  <div className="col-span-12 sm:col-span-7">
                    <label className="sr-only" htmlFor={`desc-${i}`}>Description</label>
                    <input id={`desc-${i}`} className={input} placeholder="Description" value={it.description} onChange={(e) => setItem(i, { description: e.target.value })} />
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <label className="sr-only" htmlFor={`qty-${i}`}>Quantity</label>
                    <input id={`qty-${i}`} type="number" min={0} step="any" className={input} value={it.quantity} onChange={(e) => setItem(i, { quantity: Number(e.target.value) })} />
                  </div>
                  <div className="col-span-7 sm:col-span-3">
                    <label className="sr-only" htmlFor={`price-${i}`}>Unit price</label>
                    <input id={`price-${i}`} type="number" min={0} step="any" className={input} value={it.unitPrice} onChange={(e) => setItem(i, { unitPrice: Number(e.target.value) })} />
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setInv((p) => ({ ...p, items: p.items.filter((_, j) => j !== i) }))}
                      className="p-2.5 text-text/50 hover:text-red-600"
                      aria-label={`Remove line ${i + 1}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setInv((p) => ({ ...p, items: [...p.items, { description: '', quantity: 1, unitPrice: 0 }] }))}
              className="mt-3 flex items-center gap-1.5 text-sm text-accent hover:underline"
            >
              <Plus size={16} aria-hidden /> Add line
            </button>
          </section>

          <section className="p-6 bg-white rounded-card shadow-soft border border-gray-100 space-y-4">
            <div>
              <label className={label} htmlFor="payment">Payment details (bank name, account name and number, or payment link)</label>
              <textarea id="payment" rows={4} className={input} value={inv.paymentInstructions} onChange={(e) => set('paymentInstructions', e.target.value)} />
              <p className="text-xs text-text/60 mt-1">New invoices start with the details from your last invoice.</p>
            </div>
            <div>
              <label className={label} htmlFor="notes">Notes (shown on the invoice)</label>
              <textarea id="notes" rows={3} className={input} value={inv.notes} onChange={(e) => set('notes', e.target.value)} placeholder="e.g. Balance due before the site goes live. Domain registered in your name." />
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-20 self-start">
          <section className="p-6 bg-white rounded-card shadow-soft border border-gray-100 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label} htmlFor="status">Status</label>
                <select id="status" className={input} value={inv.status} onChange={(e) => set('status', e.target.value as Invoice['status'])}>
                  {INVOICE_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label} htmlFor="currency">Currency</label>
                <select id="currency" className={input} value={inv.currency} onChange={(e) => set('currency', e.target.value as Invoice['currency'])}>
                  {INVOICE_CURRENCIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label} htmlFor="issueDate">Issued</label>
                <input id="issueDate" type="date" className={input} value={inv.issueDate} onChange={(e) => set('issueDate', e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="dueDate">Due</label>
                <input id="dueDate" type="date" className={input} value={inv.dueDate} onChange={(e) => set('dueDate', e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="discount">Discount</label>
                <input id="discount" type="number" min={0} step="any" className={input} value={inv.discount} onChange={(e) => set('discount', Number(e.target.value))} />
              </div>
              <div>
                <label className={label} htmlFor="tax">Tax / VAT %</label>
                <input id="tax" type="number" min={0} step="any" className={input} value={inv.taxRate} onChange={(e) => set('taxRate', Number(e.target.value))} />
              </div>
              <div className="col-span-2">
                <label className={label} htmlFor="paid">Amount paid so far</label>
                <input id="paid" type="number" min={0} step="any" className={input} value={inv.amountPaid} onChange={(e) => set('amountPaid', Number(e.target.value))} />
              </div>
            </div>

            <dl className="pt-4 border-t border-gray-100 text-sm space-y-1.5">
              <div className="flex justify-between"><dt className="text-text/70">Subtotal</dt><dd>{formatMoney(totals.subtotal, inv.currency)}</dd></div>
              {totals.discount > 0 && <div className="flex justify-between"><dt className="text-text/70">Discount</dt><dd>−{formatMoney(totals.discount, inv.currency)}</dd></div>}
              {totals.tax > 0 && <div className="flex justify-between"><dt className="text-text/70">Tax ({inv.taxRate}%)</dt><dd>{formatMoney(totals.tax, inv.currency)}</dd></div>}
              <div className="flex justify-between font-semibold text-primary"><dt>Total</dt><dd>{formatMoney(totals.total, inv.currency)}</dd></div>
              {totals.paid > 0 && <div className="flex justify-between"><dt className="text-text/70">Paid</dt><dd>−{formatMoney(totals.paid, inv.currency)}</dd></div>}
              <div className="flex justify-between font-heading font-bold text-lg text-primary pt-1"><dt>Balance due</dt><dd>{formatMoney(totals.balance, inv.currency)}</dd></div>
            </dl>
          </section>

          {!isNew && (
            <button type="button" onClick={remove} className="w-full text-sm text-red-700 hover:underline">
              Delete invoice
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}
