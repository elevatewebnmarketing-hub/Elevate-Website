'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, CreditCard, Landmark, Wallet } from 'lucide-react';
import { Breadcrumbs } from '@/admin/Breadcrumbs';
import { CardSkeleton } from '@/admin/Skeleton';
import { INVOICE_CURRENCIES } from '@/lib/invoices';
import { PAYMENT_KINDS, PAYMENT_PROVIDERS, emptyPaymentMethod, type PaymentMethod } from '@/lib/payments';

const OTHER = '__other__';
const NETWORKS = [
  'USDT on TRON (TRC20)',
  'USDT on BNB Smart Chain (BEP20)',
  'USDT on Ethereum (ERC20)',
  'USDC on Base',
  'USDC on Solana',
  'USDC on Ethereum (ERC20)',
];

const input =
  'w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none bg-white';
const label = 'block text-sm font-medium text-primary mb-1.5';
const ICON = { bank: Landmark, link: CreditCard, crypto: Wallet };

export default function AdminPaymentMethodsPage() {
  const [items, setItems] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState<PaymentMethod | null>(null);
  const [saving, setSaving] = useState(false);
  const [otherNetwork, setOtherNetwork] = useState(false);

  function load() {
    fetch('/api/payment-methods', { credentials: 'include', cache: 'no-store' })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || 'Could not load');
        setItems(data);
        setError('');
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }
  useEffect(load, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    try {
      const res = await fetch(form.id ? `/api/payment-methods/${form.id}` : '/api/payment-methods', {
        method: form.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save');
      setForm(null);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save');
    } finally {
      setSaving(false);
    }
  }

  async function remove(m: PaymentMethod) {
    if (!confirm(`Delete “${m.label}”? Invoices that showed it will stop showing it. (To hide it from new invoices only, untick Active instead.)`)) return;
    const res = await fetch(`/api/payment-methods/${m.id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) load();
  }

  const set = <K extends keyof PaymentMethod>(k: K, v: PaymentMethod[K]) => setForm((f) => (f ? { ...f, [k]: v } : f));

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Payments' }]} />
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading font-bold text-3xl text-primary mb-1">Payment methods</h1>
          <p className="text-text/80 max-w-2xl">
            Save each way clients can pay once. Each invoice then shows the ones that match its currency. Use business
            accounts only, and keep at least two options for foreign clients so one frozen account never stops payment.
          </p>
        </div>
        {!form && (
          <button
            type="button"
            onClick={() => {
              setOtherNetwork(false);
              setForm(emptyPaymentMethod());
            }}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition"
          >
            <Plus size={18} aria-hidden /> Add method
          </button>
        )}
      </div>

      {error && <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">{error}</div>}

      {form && (
        <form onSubmit={save} className="mb-8 p-6 bg-white rounded-card shadow-soft border border-gray-100 space-y-4">
          <h2 className="font-heading font-semibold text-primary">{form.id ? 'Edit method' : 'New payment method'}</h2>
          <fieldset>
            <legend className={label}>Type</legend>
            <div className="flex flex-wrap gap-2">
              {PAYMENT_KINDS.map((k) => (
                <label key={k.value} className={`cursor-pointer px-4 py-2.5 rounded-xl border text-sm ${form.kind === k.value ? 'border-accent bg-accent/10 font-medium text-primary' : 'border-gray-200'}`}>
                  <input type="radio" name="kind" className="sr-only" checked={form.kind === k.value} onChange={() => set('kind', k.value)} />
                  {k.label}
                </label>
              ))}
            </div>
            <p className="text-xs text-text/60 mt-1.5">{PAYMENT_KINDS.find((k) => k.value === form.kind)?.hint}</p>
          </fieldset>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={label} htmlFor="pm-label">Name shown to clients</label>
              <input
                id="pm-label"
                className={input}
                value={form.label}
                onChange={(e) => set('label', e.target.value)}
                placeholder={form.kind === 'link' ? 'Pay by card (Raenest)' : form.kind === 'crypto' ? 'USDT (TRC20)' : 'Raenest USD account'}
                required
              />
            </div>
            <div>
              <label className={label} htmlFor="pm-provider">Provider</label>
              <select id="pm-provider" className={input} value={form.provider} onChange={(e) => set('provider', e.target.value)}>
                {PAYMENT_PROVIDERS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <fieldset>
            <legend className={label}>Currencies (none ticked = show on every invoice)</legend>
            <div className="flex flex-wrap gap-3">
              {INVOICE_CURRENCIES.map((c) => (
                <label key={c} className="flex items-center gap-1.5 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#4F9CF9]"
                    checked={form.currencies.includes(c)}
                    onChange={() => set('currencies', form.currencies.includes(c) ? form.currencies.filter((x) => x !== c) : [...form.currencies, c])}
                  />
                  {c}
                </label>
              ))}
            </div>
          </fieldset>

          {form.kind === 'link' && (
            <div>
              <label className={label} htmlFor="pm-link">Default payment link (optional)</label>
              <input id="pm-link" type="url" className={input} value={form.link} onChange={(e) => set('link', e.target.value)} placeholder="https://…" />
              <p className="text-xs text-text/60 mt-1">
                Raenest and Payoneer links are usually made per invoice with the amount set. Leave this empty and paste each
                invoice&apos;s link on the invoice. A reusable link (where the client types the amount) can go here.
              </p>
            </div>
          )}

          {form.kind === 'crypto' && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={label} htmlFor="pm-network">Coin and network</label>
                <select
                  id="pm-network"
                  className={input}
                  value={NETWORKS.includes(form.network) ? form.network : form.network || otherNetwork ? OTHER : ''}
                  onChange={(e) => {
                    const v = e.target.value;
                    setOtherNetwork(v === OTHER);
                    set('network', v === OTHER ? '' : v);
                  }}
                  required
                >
                  <option value="" disabled>
                    Choose…
                  </option>
                  {NETWORKS.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                  <option value={OTHER}>Other (type it)</option>
                </select>
                {(otherNetwork || (form.network && !NETWORKS.includes(form.network))) && (
                  <input
                    aria-label="Other coin and network"
                    className={`${input} mt-2`}
                    value={form.network}
                    onChange={(e) => set('network', e.target.value)}
                    placeholder="e.g. USDC on Polygon"
                    required
                  />
                )}
              </div>
              <div>
                <label className={label} htmlFor="pm-address">Wallet address (your own wallet)</label>
                <input id="pm-address" className={`${input} font-mono text-sm`} value={form.address} onChange={(e) => set('address', e.target.value)} required />
              </div>
              <p className="sm:col-span-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2.5">
                Stablecoins only. Double-check the address by sending yourself a small test first. A payment sent on the wrong
                network cannot be recovered. Nigeria&apos;s crypto rules are changing: off-ramp to naira only through a licensed exchange.
              </p>
            </div>
          )}

          <div>
            <label className={label} htmlFor="pm-details">
              {form.kind === 'bank' ? 'Account details' : 'Extra note for the client (optional)'}
            </label>
            <textarea
              id="pm-details"
              rows={form.kind === 'bank' ? 5 : 2}
              className={input}
              value={form.details}
              onChange={(e) => set('details', e.target.value)}
              placeholder={
                form.kind === 'bank'
                  ? 'Bank name\nAccount name\nAccount number\nRouting / sort code / IBAN, SWIFT\nBank address (for wires)'
                  : form.kind === 'link'
                    ? 'e.g. Card fees are added at checkout.'
                    : ''
              }
              required={form.kind === 'bank'}
            />
          </div>

          <div>
            <label className={label} htmlFor="pm-rules">Rules for the person paying (shown on the invoice)</label>
            <textarea
              id="pm-rules"
              rows={5}
              className={input}
              value={form.payerNotes}
              onChange={(e) => set('payerNotes', e.target.value)}
              placeholder={'e.g. Pay from a business bank account only. Payments from personal accounts will be declined.\nThe beneficiary name must be exactly: …\nTransfers take 1–3 business days.'}
            />
            <p className="text-xs text-text/60 mt-1">
              Paste the provider&apos;s rules here (Payoneer, Raenest…). Keep what the client must do; leave out your own fees.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="h-4 w-4 accent-[#4F9CF9]" checked={form.active} onChange={(e) => set('active', e.target.checked)} />
              Active (offered on new invoices)
            </label>
            <label className="flex items-center gap-2 text-sm">
              Order
              <input type="number" className={`${input} w-20`} value={form.sort} onChange={(e) => set('sort', Number(e.target.value))} />
            </label>
          </div>

          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="px-6 py-2 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition disabled:opacity-70">
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button type="button" onClick={() => setForm(null)} className="px-6 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <CardSkeleton />
      ) : items.length === 0 && !error ? (
        <div className="p-8 bg-white rounded-card shadow-soft border border-gray-100 text-text/80">
          <p className="font-medium text-primary mb-2">Suggested setup (from the payments research)</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>NGN: your business bank account (bank transfer), plus a Paystack link for card.</li>
            <li>USD/GBP/EUR: Raenest business account details (bank transfer) and a Raenest card link.</li>
            <li>Backup for foreign clients: Payoneer link. Grey last.</li>
            <li>Clients who prefer crypto: one stablecoin on one network, to your own wallet.</li>
          </ul>
        </div>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {items.map((m) => {
            const Icon = ICON[m.kind];
            return (
              <li key={m.id} className={`p-5 bg-white rounded-card shadow-soft border border-gray-100 ${m.active ? '' : 'opacity-60'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Icon size={20} className="text-accent mt-0.5" aria-hidden />
                    <div>
                      <p className="font-heading font-semibold text-primary">{m.label}</p>
                      <p className="text-xs text-text/60">
                        {m.provider} · {m.currencies.length ? m.currencies.join(', ') : 'all currencies'}
                        {m.kind === 'crypto' && ` · ${m.network}`}
                        {!m.active && ' · inactive'}
                        {m.payerNotes && ' · has payer rules'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button type="button" onClick={() => {
                        setOtherNetwork(false);
                        setForm(m);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }} className="p-2 text-text/60 hover:text-accent" aria-label={`Edit ${m.label}`}>
                      <Pencil size={16} />
                    </button>
                    <button type="button" onClick={() => remove(m)} className="p-2 text-text/60 hover:text-red-600" aria-label={`Delete ${m.label}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                {(m.details || m.address || m.link) && (
                  <p className="mt-3 text-sm text-text/80 whitespace-pre-line break-words">{m.kind === 'crypto' ? m.address : m.kind === 'link' ? m.link || m.details : m.details}</p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
