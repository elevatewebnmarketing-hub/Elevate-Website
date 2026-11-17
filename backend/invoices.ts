/**
 * Invoices and client intakes, stored in Supabase only (tables in supabase/invoices-and-intakes.sql).
 * Unlike blog/portfolio there is no JSON-file fallback: client and money data must not end up in the repo.
 */
import { getSupabase } from '@/lib/supabase';
import crypto from 'crypto';
import { invoiceTotals, type Invoice, type InvoiceItem } from '@/lib/invoices';
import type { InvoicePayment, PaymentMethod } from '@/lib/payments';

export class StoreNotReadyError extends Error {}

function db() {
  const supabase = getSupabase();
  if (!supabase) {
    throw new StoreNotReadyError(
      'Database not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    );
  }
  return supabase;
}

function check(error: { message: string; code?: string } | null, what: string) {
  if (!error) return;
  // 42703 / PGRST204: a column is missing -> the payments upgrade has not been run yet.
  if (/payer_notes/.test(error.message)) {
    throw new StoreNotReadyError('Database update needed: run supabase/payments-notes-2026-11.sql in the Supabase SQL Editor (one line).');
  }
  if (error.code === '42703' || error.code === 'PGRST204' || /column .* does not exist|Could not find the '.*' column/i.test(error.message)) {
    throw new StoreNotReadyError('Database update needed: run supabase/payments-2026-11.sql in the Supabase SQL Editor.');
  }
  if (/invoice_acceptances/.test(error.message) && /does not exist|schema cache/i.test(error.message)) {
    throw new StoreNotReadyError('Database update needed: run supabase/acceptance-2026-11.sql in the Supabase SQL Editor.');
  }
  if (/payment_methods|invoice_payments/.test(error.message) && /does not exist|schema cache/i.test(error.message)) {
    throw new StoreNotReadyError('Database update needed: run supabase/payments-2026-11.sql in the Supabase SQL Editor.');
  }
  // 42P01 / PGRST205: table missing -> the SQL file has not been run yet.
  if (error.code === '42P01' || error.code === 'PGRST205' || /does not exist|schema cache/i.test(error.message)) {
    throw new StoreNotReadyError(
      'The invoices/intakes tables are missing. Run supabase/invoices-and-intakes.sql in the Supabase SQL Editor.'
    );
  }
  throw new Error(`${what}: ${error.message}`);
}

/* ---------------- Invoices ---------------- */

type InvoiceRow = {
  id: string;
  number: string;
  status: Invoice['status'];
  client_name: string;
  client_business: string | null;
  client_email: string | null;
  client_phone: string | null;
  client_address: string | null;
  currency: Invoice['currency'];
  items: InvoiceItem[];
  discount: number;
  tax_rate: number;
  amount_paid: number;
  issue_date: string;
  due_date: string | null;
  notes: string | null;
  payment_instructions: string | null;
  intake_id: string | null;
  payment_method_ids: string[] | null;
  method_links: Record<string, string> | null;
  public_token: string | null;
  created_at: string;
  updated_at: string;
};

function fromRow(r: InvoiceRow): Invoice {
  return {
    id: r.id,
    number: r.number,
    status: r.status,
    clientName: r.client_name,
    clientBusiness: r.client_business ?? '',
    clientEmail: r.client_email ?? '',
    clientPhone: r.client_phone ?? '',
    clientAddress: r.client_address ?? '',
    currency: r.currency,
    items: Array.isArray(r.items) ? r.items : [],
    discount: Number(r.discount) || 0,
    taxRate: Number(r.tax_rate) || 0,
    amountPaid: Number(r.amount_paid) || 0,
    issueDate: r.issue_date,
    dueDate: r.due_date ?? '',
    notes: r.notes ?? '',
    paymentInstructions: r.payment_instructions ?? '',
    intakeId: r.intake_id,
    paymentMethodIds: Array.isArray(r.payment_method_ids) ? r.payment_method_ids : [],
    methodLinks: r.method_links ?? {},
    publicToken: r.public_token ?? undefined,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function toRow(inv: Omit<Invoice, 'id' | 'number' | 'publicToken'>) {
  return {
    status: inv.status,
    client_name: inv.clientName,
    client_business: inv.clientBusiness || null,
    client_email: inv.clientEmail || null,
    client_phone: inv.clientPhone || null,
    client_address: inv.clientAddress || null,
    currency: inv.currency,
    items: inv.items,
    discount: inv.discount,
    tax_rate: inv.taxRate,
    amount_paid: inv.amountPaid,
    issue_date: inv.issueDate,
    due_date: inv.dueDate || null,
    notes: inv.notes || null,
    payment_instructions: inv.paymentInstructions || null,
    intake_id: inv.intakeId,
    payment_method_ids: inv.paymentMethodIds,
    method_links: inv.methodLinks,
    updated_at: new Date().toISOString(),
  };
}

export async function listInvoices(): Promise<Invoice[]> {
  const { data, error } = await db().from('invoices').select('*').order('created_at', { ascending: false }).limit(500);
  check(error, 'List invoices');
  return (data as InvoiceRow[]).map(fromRow);
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  const { data, error } = await db().from('invoices').select('*').eq('id', id).maybeSingle();
  check(error, 'Get invoice');
  return data ? fromRow(data as InvoiceRow) : null;
}

/** Next number for the issue year: ELV-2026-001, ELV-2026-002, ... */
async function nextNumber(issueDate: string): Promise<string> {
  const year = issueDate.slice(0, 4);
  const prefix = `ELV-${year}-`;
  const { data, error } = await db().from('invoices').select('number').like('number', `${prefix}%`);
  check(error, 'Number invoice');
  const max = (data as { number: string }[]).reduce((m, r) => {
    const n = parseInt(r.number.slice(prefix.length), 10);
    return Number.isFinite(n) && n > m ? n : m;
  }, 0);
  return `${prefix}${String(max + 1).padStart(3, '0')}`;
}

const newToken = () => crypto.randomBytes(24).toString('base64url');

export async function createInvoice(inv: Omit<Invoice, 'id' | 'number' | 'publicToken'>): Promise<Invoice> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const number = await nextNumber(inv.issueDate);
    const { data, error } = await db()
      .from('invoices')
      .insert({ ...toRow(inv), number, public_token: newToken() })
      .select('*')
      .single();
    if (error?.code === '23505') continue; // two invoices raced for the same number: try the next one
    check(error, 'Create invoice');
    return fromRow(data as InvoiceRow);
  }
  throw new Error('Could not assign an invoice number, try again');
}

export async function updateInvoice(id: string, inv: Omit<Invoice, 'id' | 'number' | 'publicToken'>): Promise<Invoice | null> {
  const { data, error } = await db().from('invoices').update(toRow(inv)).eq('id', id).select('*').maybeSingle();
  check(error, 'Update invoice');
  return data ? fromRow(data as InvoiceRow) : null;
}

export async function deleteInvoice(id: string): Promise<void> {
  const { error } = await db().from('invoices').delete().eq('id', id);
  check(error, 'Delete invoice');
}

/** Older invoices were created before client links existed: give them a token on first use. */
export async function ensureInvoiceToken(id: string): Promise<string | null> {
  const inv = await getInvoice(id);
  if (!inv) return null;
  if (inv.publicToken) return inv.publicToken;
  const token = newToken();
  const { error } = await db().from('invoices').update({ public_token: token }).eq('id', id);
  check(error, 'Create invoice link');
  return token;
}

export async function getInvoiceByToken(token: string): Promise<Invoice | null> {
  if (!/^[A-Za-z0-9_-]{32}$/.test(token)) return null;
  const { data, error } = await db().from('invoices').select('*').eq('public_token', token).maybeSingle();
  check(error, 'Get invoice');
  return data ? fromRow(data as InvoiceRow) : null;
}

/* ---------------- Client acceptance ("I accept" on the client invoice) ---------------- */

export interface InvoiceAcceptance {
  id: string;
  invoiceId: string;
  acceptedName: string;
  acceptedAt: string;
  termsVersion: string;
  snapshotHash: string;
  /** True when the invoice and terms still match what the client accepted. */
  current: boolean;
}

/** What the client agrees to. If any of this changes after acceptance, the acceptance no longer matches. */
export function acceptanceSnapshot(inv: Invoice, termsVersion: string) {
  const t = invoiceTotals(inv);
  return {
    number: inv.number,
    clientName: inv.clientName,
    clientBusiness: inv.clientBusiness,
    currency: inv.currency,
    items: inv.items.map((i) => ({ description: i.description, quantity: i.quantity, unitPrice: i.unitPrice })),
    discount: t.discount,
    tax: t.tax,
    total: t.total,
    termsVersion,
  };
}

export function snapshotHash(snapshot: object) {
  return crypto.createHash('sha256').update(JSON.stringify(snapshot)).digest('hex');
}

type AcceptanceRow = { id: string; invoice_id: string; accepted_name: string; accepted_at: string; terms_version: string; snapshot_hash: string };

export async function latestAcceptance(inv: Invoice, termsVersion: string): Promise<InvoiceAcceptance | null> {
  const { data, error } = await db()
    .from('invoice_acceptances')
    .select('id, invoice_id, accepted_name, accepted_at, terms_version, snapshot_hash')
    .eq('invoice_id', inv.id)
    .order('accepted_at', { ascending: false })
    .limit(1);
  check(error, 'Get acceptance');
  const r = (data as AcceptanceRow[])[0];
  if (!r) return null;
  return {
    id: r.id,
    invoiceId: r.invoice_id,
    acceptedName: r.accepted_name,
    acceptedAt: r.accepted_at,
    termsVersion: r.terms_version,
    snapshotHash: r.snapshot_hash,
    current: r.snapshot_hash === snapshotHash(acceptanceSnapshot(inv, termsVersion)),
  };
}

export async function recordAcceptance(
  inv: Invoice,
  input: { name: string; ip: string; userAgent: string; termsVersion: string }
): Promise<InvoiceAcceptance> {
  const snapshot = acceptanceSnapshot(inv, input.termsVersion);
  const hash = snapshotHash(snapshot);
  const { data, error } = await db()
    .from('invoice_acceptances')
    .insert({
      invoice_id: inv.id,
      accepted_name: input.name,
      ip: input.ip,
      user_agent: input.userAgent.slice(0, 300),
      terms_version: input.termsVersion,
      snapshot,
      snapshot_hash: hash,
    })
    .select('id, invoice_id, accepted_name, accepted_at, terms_version, snapshot_hash')
    .single();
  check(error, 'Record acceptance');
  const r = data as AcceptanceRow;
  return { id: r.id, invoiceId: r.invoice_id, acceptedName: r.accepted_name, acceptedAt: r.accepted_at, termsVersion: r.terms_version, snapshotHash: r.snapshot_hash, current: true };
}

/* ---------------- Payment methods ---------------- */

type MethodRow = {
  id: string;
  label: string;
  kind: PaymentMethod['kind'];
  provider: string | null;
  currencies: string[] | null;
  details: string | null;
  payer_notes?: string | null;
  link: string | null;
  network: string | null;
  address: string | null;
  active: boolean;
  sort: number;
};

const methodFromRow = (r: MethodRow): PaymentMethod => ({
  id: r.id,
  label: r.label,
  kind: r.kind,
  provider: r.provider ?? '',
  currencies: Array.isArray(r.currencies) ? r.currencies : [],
  details: r.details ?? '',
  payerNotes: r.payer_notes ?? '',
  link: r.link ?? '',
  network: r.network ?? '',
  address: r.address ?? '',
  active: r.active,
  sort: r.sort,
});

const methodToRow = (m: Omit<PaymentMethod, 'id'>) => ({
  label: m.label,
  kind: m.kind,
  provider: m.provider || null,
  currencies: m.currencies,
  details: m.details || null,
  payer_notes: m.payerNotes || null,
  link: m.link || null,
  network: m.network || null,
  address: m.address || null,
  active: m.active,
  sort: m.sort,
});

export async function listPaymentMethods(): Promise<PaymentMethod[]> {
  const { data, error } = await db().from('payment_methods').select('*').order('sort').order('created_at');
  check(error, 'List payment methods');
  return (data as MethodRow[]).map(methodFromRow);
}

export async function savePaymentMethod(id: string | null, m: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod> {
  const q = id
    ? db().from('payment_methods').update(methodToRow(m)).eq('id', id).select('*').single()
    : db().from('payment_methods').insert(methodToRow(m)).select('*').single();
  const { data, error } = await q;
  check(error, 'Save payment method');
  return methodFromRow(data as MethodRow);
}

export async function deletePaymentMethod(id: string): Promise<void> {
  const { error } = await db().from('payment_methods').delete().eq('id', id);
  check(error, 'Delete payment method');
}

/* ---------------- Payments received ---------------- */

type PaymentRow = { id: string; invoice_id: string; amount: number; method: string | null; reference: string | null; paid_on: string; note: string | null };
const paymentFromRow = (r: PaymentRow): InvoicePayment => ({
  id: r.id,
  invoiceId: r.invoice_id,
  amount: Number(r.amount) || 0,
  method: r.method ?? '',
  reference: r.reference ?? '',
  paidOn: r.paid_on,
  note: r.note ?? '',
});

export async function listInvoicePayments(invoiceId: string): Promise<InvoicePayment[]> {
  const { data, error } = await db().from('invoice_payments').select('*').eq('invoice_id', invoiceId).order('paid_on');
  check(error, 'List payments');
  return (data as PaymentRow[]).map(paymentFromRow);
}

/** Recalculate amount paid and status from the payment log. */
async function syncPaid(invoiceId: string): Promise<Invoice | null> {
  const inv = await getInvoice(invoiceId);
  if (!inv) return null;
  const paid = (await listInvoicePayments(invoiceId)).reduce((s, p) => s + p.amount, 0);
  const total = invoiceTotals({ ...inv, amountPaid: 0 }).total;
  let status = inv.status;
  if (status !== 'void') {
    if (paid >= total && total > 0) status = 'paid';
    else if (paid > 0) status = 'part_paid';
    else if (status === 'paid' || status === 'part_paid') status = 'sent';
  }
  const { data, error } = await db()
    .from('invoices')
    .update({ amount_paid: Math.round(paid * 100) / 100, status, updated_at: new Date().toISOString() })
    .eq('id', invoiceId)
    .select('*')
    .single();
  check(error, 'Update invoice');
  return fromRow(data as InvoiceRow);
}

export async function addInvoicePayment(invoiceId: string, p: Omit<InvoicePayment, 'id' | 'invoiceId'>): Promise<Invoice | null> {
  const { error } = await db().from('invoice_payments').insert({
    invoice_id: invoiceId,
    amount: p.amount,
    method: p.method || null,
    reference: p.reference || null,
    paid_on: p.paidOn,
    note: p.note || null,
  });
  check(error, 'Record payment');
  return syncPaid(invoiceId);
}

export async function deleteInvoicePayment(invoiceId: string, paymentId: string): Promise<Invoice | null> {
  const { error } = await db().from('invoice_payments').delete().eq('id', paymentId).eq('invoice_id', invoiceId);
  check(error, 'Delete payment');
  return syncPaid(invoiceId);
}

/* ---------------- Client intakes ---------------- */

export type IntakeStatus = 'new' | 'reviewed' | 'archived';

export interface ClientIntake {
  id: string;
  status: IntakeStatus;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  data: Record<string, string>;
  createdAt: string;
}

type IntakeRow = {
  id: string;
  status: IntakeStatus;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  data: Record<string, string>;
  created_at: string;
};

const intakeFromRow = (r: IntakeRow): ClientIntake => ({
  id: r.id,
  status: r.status,
  businessName: r.business_name,
  contactName: r.contact_name,
  email: r.email,
  phone: r.phone ?? '',
  data: r.data ?? {},
  createdAt: r.created_at,
});

export async function createIntake(input: Omit<ClientIntake, 'id' | 'status' | 'createdAt'>): Promise<string> {
  const { data, error } = await db()
    .from('client_intakes')
    .insert({
      business_name: input.businessName,
      contact_name: input.contactName,
      email: input.email,
      phone: input.phone || null,
      data: input.data,
    })
    .select('id')
    .single();
  check(error, 'Save intake');
  return (data as { id: string }).id;
}

export async function listIntakes(): Promise<ClientIntake[]> {
  const { data, error } = await db().from('client_intakes').select('*').order('created_at', { ascending: false }).limit(500);
  check(error, 'List intakes');
  return (data as IntakeRow[]).map(intakeFromRow);
}

export async function getIntake(id: string): Promise<ClientIntake | null> {
  const { data, error } = await db().from('client_intakes').select('*').eq('id', id).maybeSingle();
  check(error, 'Get intake');
  return data ? intakeFromRow(data as IntakeRow) : null;
}

export async function setIntakeStatus(id: string, status: IntakeStatus): Promise<void> {
  const { error } = await db().from('client_intakes').update({ status }).eq('id', id);
  check(error, 'Update intake');
}

export async function deleteIntake(id: string): Promise<void> {
  const { error } = await db().from('client_intakes').delete().eq('id', id);
  check(error, 'Delete intake');
}
