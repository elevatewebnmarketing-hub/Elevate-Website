'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Plus, Trash2, Printer, MessageCircle, Save, Copy, Link2 } from 'lucide-react';
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
import { methodFitsCurrency, type InvoicePayment, type PaymentMethod } from '@/lib/payments';

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
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [payments, setPayments] = useState<InvoicePayment[]>([]);
  const [clientLink, setClientLink] = useState('');
  const [acceptance, setAcceptance] = useState<{ acceptedName: string; acceptedAt: string; current: boolean } | null>(null);
  const [pay, setPay] = useState({ amount: '', method: '', reference: '', paidOn: new Date().toISOString().slice(0, 10) });

  useEffect(() => {
    fetch('/api/payment-methods', { credentials: 'include', cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : []))
      .then((list: PaymentMethod[]) => setMethods(list.filter((m) => m.active)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/invoices/${id}/acceptance`, { credentials: 'include', cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { acceptance: null }))
      .then((d) => setAcceptance(d.acceptance))
      .catch(() => {});
  }, [id, isNew, inv.updatedAt]);

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/invoices/${id}/payments`, { credentials: 'include', cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : []))
      .then(setPayments)
      .catch(() => {});
  }, [id, isNew]);

  // New invoices: tick every saved method that fits the currency.
  useEffect(() => {
    if (!isNew || !methods.length) return;
    setInv((p) => ({ ...p, paymentMethodIds: methods.filter((m) => methodFitsCurrency(m, p.currency)).map((m) => m.id) }));
  }, [isNew, methods, inv.currency]);

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

  async function save(patch?: Partial<Invoice>): Promise<Invoice | null> {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(isNew ? '/api/invoices' : `/api/invoices/${id}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...inv, ...patch }),
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

  function whatsappText(link: string = clientLink) {
    const lines = [
      `Hello ${inv.clientName.split(' ')[0] || ''},`.trim(),
      '',
      `Here is invoice ${inv.number} from Elevate Web & Marketing.`,
      ...inv.items.map((i) => `• ${i.description}: ${formatMoney(i.quantity * i.unitPrice, inv.currency)}`),
      `Total: ${formatMoney(totals.total, inv.currency)}`,
      totals.paid ? `Paid so far: ${formatMoney(totals.paid, inv.currency)}` : '',
      `Amount due: ${formatMoney(totals.balance, inv.currency)}${inv.dueDate ? ` by ${inv.dueDate}` : ''}`,
      link ? `\nView, pay and download the invoice here:\n${link}` : '',
      !link && inv.paymentInstructions ? `\nPayment details:\n${inv.paymentInstructions}` : '',
      '',
      link ? 'Thank you!' : 'The PDF is attached. Thank you!',
    ];
    return lines.filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n');
  }

  async function copyWhatsapp() {
    const url = await ensureClientLink();
    if (!url) return;
    await navigator.clipboard.writeText(whatsappText(url)).catch(() => {});
    setMessage({ kind: 'ok', text: 'Saved. Message with the invoice link copied: paste it in WhatsApp or email.' });
  }

  /**
   * Saves the current edits (so the ticked payment methods are what the client sees),
   * offers to mark a Draft as Sent (clients can't open drafts), then returns the link.
   */
  async function ensureClientLink(): Promise<string | null> {
    let patch: Partial<Invoice> | undefined;
    if (inv.status === 'draft') {
      if (!confirm('This invoice is still a Draft, and clients cannot open drafts.\n\nMark it as Sent and get the link?')) return null;
      patch = { status: 'sent' };
    }
    if (inv.status !== 'void' && !inv.paymentMethodIds.length && fittingMethods.length) {
      if (!confirm('No payment methods are ticked, so the client will see no way to pay. Continue anyway?')) return null;
    }
    const saved = await save(patch);
    if (!saved) return null;
    const res = await fetch(`/api/invoices/${id}/link`, { method: 'POST', credentials: 'include' });
    const data = await res.json();
    if (!res.ok) {
      setMessage({ kind: 'err', text: data.error || 'Could not create the link' });
      return null;
    }
    setClientLink(data.url);
    return data.url as string;
  }

  async function getClientLink() {
    const url = await ensureClientLink();
    if (!url) return;
    await navigator.clipboard.writeText(url).catch(() => {});
    setMessage({ kind: 'ok', text: 'Saved and copied the client link.' });
  }

  async function openWhatsapp() {
    // Open the tab now (inside the click) so pop-up blockers allow it, then point it at WhatsApp.
    const tab = window.open('about:blank', '_blank');
    const url = await ensureClientLink();
    if (!url) {
      tab?.close();
      return;
    }
    const wa = `https://wa.me/${inv.clientPhone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(whatsappText(url))}`;
    if (tab) {
      tab.opener = null;
      tab.location.href = wa;
    } else {
      window.location.href = wa;
    }
  }

  async function recordPayment(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/invoices/${id}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(pay),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage({ kind: 'err', text: data.error || 'Could not record the payment' });
      return;
    }
    setInv(data);
    setPay((p) => ({ ...p, amount: '', reference: '' }));
    const list = await fetch(`/api/invoices/${id}/payments`, { credentials: 'include', cache: 'no-store' }).then((r) => r.json());
    setPayments(list);
    setMessage({ kind: 'ok', text: 'Payment recorded. Status and balance updated.' });
  }

  async function removePayment(pid: string) {
    if (!confirm('Delete this payment record?')) return;
    const res = await fetch(`/api/invoices/${id}/payments/${pid}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) {
      setInv(await res.json());
      setPayments((l) => l.filter((x) => x.id !== pid));
    }
  }

  const fittingMethods = methods.filter((m) => methodFitsCurrency(m, inv.currency));
  const toggleMethod = (mid: string) =>
    setInv((p) => ({
      ...p,
      paymentMethodIds: p.paymentMethodIds.includes(mid) ? p.paymentMethodIds.filter((x) => x !== mid) : [...p.paymentMethodIds, mid],
    }));


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
                onClick={getClientLink}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                <Link2 size={16} aria-hidden /> Client link
              </button>
              <button
                type="button"
                onClick={copyWhatsapp}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                <Copy size={16} aria-hidden /> Copy message
              </button>
              {inv.clientPhone && (
                <button
                  type="button"
                  onClick={openWhatsapp}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                >
                  <MessageCircle size={16} aria-hidden /> WhatsApp
                </button>
              )}
            </>
          )}
          <button
            type="button"
            onClick={() => save()}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition disabled:opacity-70"
          >
            <Save size={16} aria-hidden /> {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {!isNew && (
        <p
          className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${
            acceptance?.current
              ? 'bg-emerald-50 text-emerald-800'
              : acceptance
                ? 'bg-amber-50 text-amber-900'
                : 'bg-gray-100 text-text/70'
          }`}
        >
          {acceptance?.current
            ? `Accepted by ${acceptance.acceptedName} on ${new Date(acceptance.acceptedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}`
            : acceptance
              ? `Changed after ${acceptance.acceptedName} accepted it (${new Date(acceptance.acceptedAt).toLocaleDateString('en-GB')}). The client will be asked to accept again.`
              : 'Not accepted by the client yet (paying the invoice also counts as accepting)'}
        </p>
      )}

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

          <section className="p-6 bg-white rounded-card shadow-soft border border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h2 className="font-heading font-semibold text-primary">Ways to pay on this invoice</h2>
              <Link href="/admin/payments" className="text-sm text-accent hover:underline">Manage payment methods</Link>
            </div>
            <p className="text-sm text-text/70 mb-3">
              Only the ticked methods appear on the client&apos;s invoice. Agreed a method with the client? Pick just that one.
            </p>
            {fittingMethods.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Quick select payment methods">
                {(
                  [
                    ['All', () => true],
                    ['Bank transfer only', (m: PaymentMethod) => m.kind === 'bank'],
                    ['Card only', (m: PaymentMethod) => m.kind === 'link'],
                    ['Crypto only', (m: PaymentMethod) => m.kind === 'crypto'],
                    ['None', () => false],
                  ] as [string, (m: PaymentMethod) => boolean][]
                )
                  .filter(([name, f]) => name === 'All' || name === 'None' || fittingMethods.some(f))
                  .map(([name, f]) => {
                    const ids = fittingMethods.filter(f).map((m) => m.id);
                    const active =
                      ids.length === inv.paymentMethodIds.filter((x) => fittingMethods.some((m) => m.id === x)).length &&
                      ids.every((x) => inv.paymentMethodIds.includes(x));
                    return (
                      <button
                        key={name}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setInv((p) => ({ ...p, paymentMethodIds: ids }))}
                        className={`px-3 py-1.5 text-xs rounded-full border transition ${
                          active ? 'border-accent bg-accent/10 text-primary font-medium' : 'border-gray-200 hover:border-accent hover:text-accent'
                        }`}
                      >
                        {name}
                      </button>
                    );
                  })}
              </div>
            )}
            {fittingMethods.length === 0 ? (
              <p className="text-sm text-text/70">
                No saved methods for {inv.currency} yet. Add your bank, Raenest, Payoneer, Paystack and crypto details once under{' '}
                <Link href="/admin/payments" className="text-accent hover:underline">Payments</Link>.
              </p>
            ) : (
              <ul className="space-y-3">
                {fittingMethods.map((m) => {
                  const on = inv.paymentMethodIds.includes(m.id);
                  return (
                    <li key={m.id} className="rounded-xl border border-gray-200 p-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" checked={on} onChange={() => toggleMethod(m.id)} className="mt-1 h-4 w-4 accent-[#4F9CF9]" />
                        <span>
                          <span className="font-medium text-primary">{m.label}</span>
                          <span className="block text-xs text-text/60">
                            {m.kind === 'link' ? 'Card payment link' : m.kind === 'crypto' ? `Crypto · ${m.network}` : 'Bank transfer'} · {m.provider}
                          </span>
                        </span>
                      </label>
                      {on && m.kind === 'link' && (
                        <div className="mt-2 pl-7">
                          <label className="block text-xs text-text/70 mb-1" htmlFor={`ml-${m.id}`}>
                            Payment link for this invoice{m.link ? ' (leave empty to use the saved link)' : ''}
                          </label>
                          <input
                            id={`ml-${m.id}`}
                            type="url"
                            className={input}
                            placeholder="https://…"
                            value={inv.methodLinks[m.id] ?? ''}
                            onChange={(e) => setInv((p) => ({ ...p, methodLinks: { ...p.methodLinks, [m.id]: e.target.value } }))}
                          />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {!isNew && (
            <section className="p-6 bg-white rounded-card shadow-soft border border-gray-100">
              <h2 className="font-heading font-semibold text-primary mb-3">Payments received</h2>
              {payments.length > 0 && (
                <ul className="mb-4 divide-y divide-gray-100 text-sm">
                  {payments.map((p) => (
                    <li key={p.id} className="py-2 flex flex-wrap items-center justify-between gap-2">
                      <span>
                        <strong>{formatMoney(p.amount, inv.currency)}</strong> on {p.paidOn}
                        {p.method && ` · ${p.method}`}
                        {p.reference && <span className="text-text/60"> · ref {p.reference}</span>}
                      </span>
                      <button type="button" onClick={() => removePayment(p.id)} className="p-1.5 text-text/50 hover:text-red-600" aria-label="Delete payment record">
                        <Trash2 size={15} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <form onSubmit={recordPayment} className="grid sm:grid-cols-4 gap-2 items-end">
                <div>
                  <label className="block text-xs text-text/70 mb-1" htmlFor="pay-amount">Amount</label>
                  <input id="pay-amount" type="number" min={0} step="any" required className={input} value={pay.amount} onChange={(e) => setPay({ ...pay, amount: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs text-text/70 mb-1" htmlFor="pay-method">Received via</label>
                  <select id="pay-method" className={input} value={pay.method} onChange={(e) => setPay({ ...pay, method: e.target.value })}>
                    <option value="">Choose…</option>
                    {methods.map((m) => (
                      <option key={m.id} value={m.label}>{m.label}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-text/70 mb-1" htmlFor="pay-date">Date</label>
                  <input id="pay-date" type="date" className={input} value={pay.paidOn} onChange={(e) => setPay({ ...pay, paidOn: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs text-text/70 mb-1" htmlFor="pay-ref">Reference / tx ID</label>
                  <input id="pay-ref" className={input} value={pay.reference} onChange={(e) => setPay({ ...pay, reference: e.target.value })} />
                </div>
                <button type="submit" className="sm:col-span-4 justify-self-start px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 text-sm font-semibold">
                  Record payment
                </button>
              </form>
              <p className="text-xs text-text/60 mt-2">Recording a payment updates the amount paid and the status (part paid / paid).</p>
            </section>
          )}

          <section className="p-6 bg-white rounded-card shadow-soft border border-gray-100 space-y-4">
            <div>
              <label className={label} htmlFor="payment">Extra payment note (optional)</label>
              <textarea id="payment" rows={4} className={input} value={inv.paymentInstructions} onChange={(e) => set('paymentInstructions', e.target.value)} />
              <p className="text-xs text-text/60 mt-1">Shown under the payment options. New invoices start with the note from your last invoice.</p>
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
                <p className="text-xs text-text/60 -mt-1 mb-1.5">Updated automatically when you record payments.</p>
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
