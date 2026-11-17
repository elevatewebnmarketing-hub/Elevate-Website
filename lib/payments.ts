/** Saved ways to pay (shown on invoices) and the payment log. */

export type PaymentKind = 'bank' | 'link' | 'crypto';

export const PAYMENT_KINDS: { value: PaymentKind; label: string; hint: string }[] = [
  { value: 'bank', label: 'Bank transfer', hint: 'Account details the client transfers to' },
  { value: 'link', label: 'Payment link (card)', hint: 'Raenest, Payoneer or Paystack link the client clicks to pay' },
  { value: 'crypto', label: 'Crypto wallet', hint: 'Stablecoin address on one named network' },
];

export const PAYMENT_PROVIDERS = ['Bank', 'Raenest', 'Payoneer', 'Paystack', 'Grey', 'Crypto', 'Other'] as const;

export interface PaymentMethod {
  id: string;
  label: string;
  kind: PaymentKind;
  provider: string;
  currencies: string[]; // empty = any currency
  details: string;
  /** Provider rules the payer must follow, shown on the invoice (e.g. business accounts only). */
  payerNotes: string;
  link: string;
  network: string;
  address: string;
  active: boolean;
  sort: number;
}

export interface InvoicePayment {
  id: string;
  invoiceId: string;
  amount: number;
  method: string;
  reference: string;
  paidOn: string;
  note: string;
}

export function emptyPaymentMethod(): PaymentMethod {
  return { id: '', label: '', kind: 'bank', provider: 'Bank', currencies: [], details: '', payerNotes: '', link: '', network: '', address: '', active: true, sort: 0 };
}

export function methodFitsCurrency(m: PaymentMethod, currency: string) {
  return m.currencies.length === 0 || m.currencies.includes(currency);
}

const httpsUrl = (v: unknown) => {
  const s = String(v ?? '').trim();
  try {
    const u = new URL(s);
    return u.protocol === 'https:' ? u.toString() : '';
  } catch {
    return '';
  }
};

export function sanitizePaymentMethod(body: Record<string, unknown>): { error: string } | { value: Omit<PaymentMethod, 'id'> } {
  const str = (v: unknown, max = 1000) => String(v ?? '').trim().slice(0, max);
  const kind = PAYMENT_KINDS.some((k) => k.value === body.kind) ? (body.kind as PaymentKind) : 'bank';
  const label = str(body.label, 120);
  if (!label) return { error: 'Give the method a name, e.g. “Raenest USD account”' };
  const link = httpsUrl(body.link);
  if (kind === 'link' && body.link && !link) return { error: 'The payment link must start with https://' };
  if (kind === 'crypto' && (!str(body.address) || !str(body.network))) return { error: 'Crypto needs both the network and the wallet address' };
  if (kind === 'bank' && !str(body.details)) return { error: 'Add the account details' };
  const currencies = Array.isArray(body.currencies) ? body.currencies.map((c) => str(c, 3).toUpperCase()).filter((c) => /^[A-Z]{3}$/.test(c)) : [];
  return {
    value: {
      label,
      kind,
      provider: str(body.provider, 40) || 'Other',
      currencies,
      details: str(body.details, 2000),
      payerNotes: str(body.payerNotes, 3000),
      link: kind === 'link' ? link : '',
      network: kind === 'crypto' ? str(body.network, 80) : '',
      address: kind === 'crypto' ? str(body.address, 200) : '',
      active: body.active !== false,
      sort: Number.isFinite(Number(body.sort)) ? Number(body.sort) : 0,
    },
  };
}

export { httpsUrl };
