/**
 * Invoices and client intakes, stored in Supabase only (tables in supabase/invoices-and-intakes.sql).
 * Unlike blog/portfolio there is no JSON-file fallback: client and money data must not end up in the repo.
 */
import { getSupabase } from '@/lib/supabase';
import type { Invoice, InvoiceItem } from '@/lib/invoices';

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
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function toRow(inv: Omit<Invoice, 'id' | 'number'>) {
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

export async function createInvoice(inv: Omit<Invoice, 'id' | 'number'>): Promise<Invoice> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const number = await nextNumber(inv.issueDate);
    const { data, error } = await db().from('invoices').insert({ ...toRow(inv), number }).select('*').single();
    if (error?.code === '23505') continue; // two invoices raced for the same number: try the next one
    check(error, 'Create invoice');
    return fromRow(data as InvoiceRow);
  }
  throw new Error('Could not assign an invoice number, try again');
}

export async function updateInvoice(id: string, inv: Omit<Invoice, 'id' | 'number'>): Promise<Invoice | null> {
  const { data, error } = await db().from('invoices').update(toRow(inv)).eq('id', id).select('*').maybeSingle();
  check(error, 'Update invoice');
  return data ? fromRow(data as InvoiceRow) : null;
}

export async function deleteInvoice(id: string): Promise<void> {
  const { error } = await db().from('invoices').delete().eq('id', id);
  check(error, 'Delete invoice');
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
