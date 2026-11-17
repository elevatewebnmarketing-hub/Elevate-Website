/** Shared invoice types and maths (used by the admin pages and the API). */
import { httpsUrl } from '@/lib/payments';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type InvoiceStatus = 'draft' | 'sent' | 'part_paid' | 'paid' | 'void';

export const INVOICE_STATUSES: { value: InvoiceStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'part_paid', label: 'Part paid' },
  { value: 'paid', label: 'Paid' },
  { value: 'void', label: 'Void' },
];

export const INVOICE_CURRENCIES = ['NGN', 'USD', 'GBP', 'CAD', 'AUD', 'EUR'] as const;
export type InvoiceCurrency = (typeof INVOICE_CURRENCIES)[number];

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  number: string;
  status: InvoiceStatus;
  clientName: string;
  clientBusiness: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  currency: InvoiceCurrency;
  items: InvoiceItem[];
  discount: number;
  taxRate: number;
  amountPaid: number;
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD or ''
  notes: string;
  paymentInstructions: string;
  intakeId: string | null;
  /** Saved payment methods shown on this invoice (ids from payment_methods). */
  paymentMethodIds: string[];
  /** Per-invoice payment links that override a method's default link: { methodId: url }. */
  methodLinks: Record<string, string>;
  /** Secret for the client's online invoice page (/i/<token>). Set by the server. */
  publicToken?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InvoiceTotals {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paid: number;
  balance: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;
const num = (v: unknown) => {
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? ''));
  return Number.isFinite(n) ? n : 0;
};

export function invoiceTotals(inv: Pick<Invoice, 'items' | 'discount' | 'taxRate' | 'amountPaid'>): InvoiceTotals {
  const subtotal = round2(inv.items.reduce((s, i) => s + num(i.quantity) * num(i.unitPrice), 0));
  const discount = Math.min(Math.max(num(inv.discount), 0), subtotal);
  const tax = round2(((subtotal - discount) * Math.max(num(inv.taxRate), 0)) / 100);
  const total = round2(subtotal - discount + tax);
  const paid = Math.max(num(inv.amountPaid), 0);
  return { subtotal, discount, tax, total, paid, balance: round2(total - paid) };
}

export function formatMoney(amount: number, currency: string): string {
  try {
    const locale = ({ NGN: 'en-NG', USD: 'en-US', GBP: 'en-GB', CAD: 'en-CA', AUD: 'en-AU', EUR: 'en-IE' } as Record<string, string>)[currency] ?? 'en-GB';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

export function emptyInvoice(): Invoice {
  const today = new Date();
  const due = new Date(today.getTime() + 7 * 86400000);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  return {
    id: '',
    number: '',
    status: 'draft',
    clientName: '',
    clientBusiness: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    currency: 'NGN',
    items: [{ description: '', quantity: 1, unitPrice: 0 }],
    discount: 0,
    taxRate: 0,
    amountPaid: 0,
    issueDate: iso(today),
    dueDate: iso(due),
    notes: '',
    paymentInstructions: '',
    intakeId: null,
    paymentMethodIds: [],
    methodLinks: {},
  };
}

/** Clean and validate input from the admin form. Returns an error message or the cleaned invoice. */
export function sanitizeInvoice(
  body: Record<string, unknown>
): { error: string } | { value: Omit<Invoice, 'id' | 'number' | 'publicToken'> } {
  const str = (v: unknown, max = 2000) => String(v ?? '').trim().slice(0, max);
  const status = INVOICE_STATUSES.some((s) => s.value === body.status) ? (body.status as InvoiceStatus) : 'draft';
  const currency = (INVOICE_CURRENCIES as readonly string[]).includes(String(body.currency))
    ? (body.currency as InvoiceCurrency)
    : 'NGN';
  const rawItems = Array.isArray(body.items) ? body.items : [];
  const items: InvoiceItem[] = rawItems
    .slice(0, 50)
    .map((i) => {
      const o = (i ?? {}) as Record<string, unknown>;
      return { description: str(o.description, 500), quantity: num(o.quantity), unitPrice: num(o.unitPrice) };
    })
    .filter((i) => i.description || i.unitPrice);
  const clientName = str(body.clientName, 200);
  if (!clientName) return { error: 'Client name is required' };
  if (!items.length) return { error: 'Add at least one line item' };
  const date = (v: unknown) => (/^\d{4}-\d{2}-\d{2}$/.test(String(v ?? '')) ? String(v) : '');
  const issueDate = date(body.issueDate) || new Date().toISOString().slice(0, 10);
  return {
    value: {
      status,
      clientName,
      clientBusiness: str(body.clientBusiness, 200),
      clientEmail: str(body.clientEmail, 200),
      clientPhone: str(body.clientPhone, 60),
      clientAddress: str(body.clientAddress, 500),
      currency,
      items,
      discount: num(body.discount),
      taxRate: num(body.taxRate),
      amountPaid: num(body.amountPaid),
      issueDate,
      dueDate: date(body.dueDate),
      notes: str(body.notes),
      paymentInstructions: str(body.paymentInstructions),
      intakeId: typeof body.intakeId === 'string' && /^[0-9a-f-]{36}$/i.test(body.intakeId) ? body.intakeId : null,
      paymentMethodIds: Array.isArray(body.paymentMethodIds)
        ? body.paymentMethodIds.filter((x): x is string => typeof x === 'string' && UUID.test(x)).slice(0, 20)
        : [],
      methodLinks: Object.fromEntries(
        Object.entries((body.methodLinks ?? {}) as Record<string, unknown>)
          .filter(([k]) => UUID.test(k))
          .map(([k, v]) => [k, httpsUrl(v)])
          .filter(([, v]) => v)
      ),
    },
  };
}
