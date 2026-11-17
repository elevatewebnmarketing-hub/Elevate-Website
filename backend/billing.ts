/**
 * Monthly invoices, payment reminders and receipts (supabase/client-workflow-2026-11.sql).
 * Run daily by Vercel Cron (/api/cron/billing) and on demand from the admin ("Run billing now").
 */
import { check, createInvoice, db, ensureInvoiceToken, getInvoice, listInvoices, listInvoicePayments } from '@/backend/invoices';
import { emailHtml, esc, notifyOwner, sendEmail } from '@/backend/notify';
import { formatMoney, invoiceTotals, type Invoice } from '@/lib/invoices';

const SITE = 'https://www.elevatewebandmarketing.com';
const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (d: string, n: number) => iso(new Date(new Date(`${d}T12:00:00Z`).getTime() + n * 86400000));
const daysBetween = (a: string, b: string) => Math.round((new Date(`${b}T12:00:00Z`).getTime() - new Date(`${a}T12:00:00Z`).getTime()) / 86400000);
const longDate = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

/** Same day next month, clamped to the month's last day (31 Jan -> 28/29 Feb). */
export function nextMonth(d: string) {
  const [y, m, day] = d.split('-').map(Number);
  const target = new Date(Date.UTC(y, m, 1)); // first of next month
  const last = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  target.setUTCDate(Math.min(day, last));
  return iso(target);
}

/* ---------------- Schedules ---------------- */

export interface InvoiceSchedule {
  id: string;
  templateInvoiceId: string;
  label: string;
  active: boolean;
  nextRun: string;
  dueDays: number;
  sendEmail: boolean;
  lastInvoiceId: string | null;
  lastRunAt: string | null;
}

type ScheduleRow = {
  id: string; template_invoice_id: string; label: string; active: boolean; next_run: string; due_days: number;
  send_email: boolean; last_invoice_id: string | null; last_run_at: string | null;
};
const fromRow = (r: ScheduleRow): InvoiceSchedule => ({
  id: r.id,
  templateInvoiceId: r.template_invoice_id,
  label: r.label,
  active: r.active,
  nextRun: r.next_run,
  dueDays: r.due_days,
  sendEmail: r.send_email,
  lastInvoiceId: r.last_invoice_id,
  lastRunAt: r.last_run_at,
});

export async function listSchedules(): Promise<InvoiceSchedule[]> {
  const { data, error } = await db().from('invoice_schedules').select('*').order('next_run');
  check(error, 'List schedules');
  return (data as ScheduleRow[]).map(fromRow);
}

export async function createSchedule(s: Omit<InvoiceSchedule, 'id' | 'lastInvoiceId' | 'lastRunAt' | 'active'>) {
  const { data, error } = await db()
    .from('invoice_schedules')
    .insert({ template_invoice_id: s.templateInvoiceId, label: s.label, next_run: s.nextRun, due_days: s.dueDays, send_email: s.sendEmail })
    .select('*')
    .single();
  check(error, 'Create schedule');
  return fromRow(data as ScheduleRow);
}

export async function updateSchedule(id: string, patch: Partial<Pick<InvoiceSchedule, 'active' | 'nextRun' | 'dueDays' | 'sendEmail' | 'label'>>) {
  const row: Record<string, unknown> = {};
  if (patch.active !== undefined) row.active = patch.active;
  if (patch.nextRun) row.next_run = patch.nextRun;
  if (patch.dueDays !== undefined) row.due_days = patch.dueDays;
  if (patch.sendEmail !== undefined) row.send_email = patch.sendEmail;
  if (patch.label) row.label = patch.label;
  const { error } = await db().from('invoice_schedules').update(row).eq('id', id);
  check(error, 'Update schedule');
}

export async function deleteSchedule(id: string) {
  const { error } = await db().from('invoice_schedules').delete().eq('id', id);
  check(error, 'Delete schedule');
}

/* ---------------- Emails sent (once each) ---------------- */

/** Claim an email slot; false if it was already sent. Release with unclaim() if sending fails. */
async function claim(invoiceId: string, kind: string) {
  const { data: existing, error: e1 } = await db().from('invoice_emails').select('id').eq('invoice_id', invoiceId).eq('kind', kind).limit(1);
  check(e1, 'Check email log');
  if ((existing as unknown[]).length) return false;
  // The unique (invoice_id, kind) rule also stops two runs at the same moment from both sending.
  const { error } = await db().from('invoice_emails').insert({ invoice_id: invoiceId, kind });
  if (error?.code === '23505' || /duplicate/i.test(error?.message ?? '')) return false;
  check(error, 'Record email');
  return true;
}
async function unclaim(invoiceId: string, kind: string) {
  await db().from('invoice_emails').delete().eq('invoice_id', invoiceId).eq('kind', kind);
}

function invoiceBlock(inv: Invoice, link: string) {
  const t = invoiceTotals(inv);
  return `<table style="border-collapse:collapse;margin:14px 0;font-size:15px">
  <tr><td style="padding:3px 14px 3px 0;color:#555">Invoice</td><td><strong>${esc(inv.number)}</strong></td></tr>
  <tr><td style="padding:3px 14px 3px 0;color:#555">Amount due</td><td><strong>${esc(formatMoney(t.balance, inv.currency))}</strong></td></tr>
  ${inv.dueDate ? `<tr><td style="padding:3px 14px 3px 0;color:#555">Due date</td><td>${esc(longDate(inv.dueDate))}</td></tr>` : ''}
</table>
<p><a href="${link}" style="display:inline-block;background:#0B1F3A;color:#fff;padding:11px 18px;border-radius:8px;text-decoration:none;font-weight:bold">View and pay the invoice</a></p>`;
}

async function sendInvoiceEmail(inv: Invoice, kind: 'new' | 'due_soon' | 'overdue_1' | 'overdue_7') {
  if (!inv.clientEmail) return false;
  if (!(await claim(inv.id, kind))) return false;
  const token = await ensureInvoiceToken(inv.id);
  const link = `${SITE}/i/${token}`;
  const first = esc(inv.clientName.split(' ')[0] || 'there');
  const subject = {
    new: `Invoice ${inv.number} from Elevate Web & Marketing`,
    due_soon: `Reminder: invoice ${inv.number} is due soon`,
    overdue_1: `Invoice ${inv.number} is now due`,
    overdue_7: `Second reminder: invoice ${inv.number}`,
  }[kind];
  const intro = {
    new: `Here is your invoice for this month.`,
    due_soon: `A friendly reminder that this invoice is due on ${esc(longDate(inv.dueDate))}.`,
    overdue_1: `This invoice was due on ${esc(longDate(inv.dueDate))}. If you have already paid, thank you, and please ignore this email.`,
    overdue_7: `This invoice is now a week past its due date. If you have already paid, please reply with the payment reference so we can match it. If something is wrong, reply and let us know.`,
  }[kind];
  const ok = await sendEmail(
    inv.clientEmail,
    subject,
    emailHtml(`<p>Hi ${first},</p><p>${intro}</p>${invoiceBlock(inv, link)}<p>Thank you,<br>Ufuoma, Elevate Web &amp; Marketing</p>`),
    'hello@elevatewebandmarketing.com'
  );
  if (!ok) await unclaim(inv.id, kind);
  return ok;
}

/* ---------------- Receipts ---------------- */

export async function sendReceipt(invoiceId: string, paymentId: string) {
  const inv = await getInvoice(invoiceId);
  if (!inv?.clientEmail) return false;
  const payment = (await listInvoicePayments(invoiceId)).find((p) => p.id === paymentId);
  if (!payment) return false;
  const kind = `receipt:${paymentId}`;
  if (!(await claim(inv.id, kind))) return false;
  const token = await ensureInvoiceToken(inv.id);
  const t = invoiceTotals(inv);
  const ok = await sendEmail(
    inv.clientEmail,
    `Payment received: ${formatMoney(payment.amount, inv.currency)} for ${inv.number}`,
    emailHtml(
      `<p>Hi ${esc(inv.clientName.split(' ')[0] || 'there')},</p><p>Thank you. We have received your payment of <strong>${esc(
        formatMoney(payment.amount, inv.currency)
      )}</strong> on ${esc(longDate(payment.paidOn))} for invoice ${esc(inv.number)}.</p><p>${
        t.balance > 0 ? `Remaining balance: <strong>${esc(formatMoney(t.balance, inv.currency))}</strong>.` : 'This invoice is now paid in full.'
      }</p><p><a href="${SITE}/i/${token}/receipt/${payment.id}" style="display:inline-block;background:#0B1F3A;color:#fff;padding:11px 18px;border-radius:8px;text-decoration:none;font-weight:bold">View or download your receipt</a></p><p>Thank you,<br>Ufuoma, Elevate Web &amp; Marketing</p>`
    ),
    'hello@elevatewebandmarketing.com'
  );
  if (!ok) await unclaim(inv.id, kind);
  return ok;
}

/* ---------------- Daily run ---------------- */

export interface BillingRunResult {
  created: string[];
  reminders: string[];
  skipped: string[];
}

export async function runBilling(today = iso(new Date())): Promise<BillingRunResult> {
  const result: BillingRunResult = { created: [], reminders: [], skipped: [] };

  // 1. Monthly invoices due today (or missed on earlier days).
  for (const s of await listSchedules()) {
    if (!s.active || s.nextRun > today) continue;
    const tpl = await getInvoice(s.templateInvoiceId);
    if (!tpl) {
      result.skipped.push(`${s.label}: template invoice deleted`);
      continue;
    }
    const inv = await createInvoice({
      ...tpl,
      status: 'sent',
      amountPaid: 0,
      issueDate: today,
      dueDate: addDays(today, s.dueDays),
    });
    let nextRun = nextMonth(s.nextRun);
    while (nextRun <= today) nextRun = nextMonth(nextRun);
    const { error } = await db()
      .from('invoice_schedules')
      .update({ next_run: nextRun, last_invoice_id: inv.id, last_run_at: new Date().toISOString() })
      .eq('id', s.id);
    check(error, 'Update schedule');
    const emailed = s.sendEmail ? await sendInvoiceEmail(inv, 'new') : false;
    result.created.push(`${inv.number} for ${inv.clientBusiness || inv.clientName}${emailed ? ' (emailed)' : s.sendEmail ? ' (not emailed: no client email or email not set up)' : ''}`);
  }

  // 2. Reminders for unpaid invoices (each sent once).
  for (const inv of await listInvoices()) {
    if ((inv.status !== 'sent' && inv.status !== 'part_paid') || !inv.dueDate || !inv.clientEmail) continue;
    if (invoiceTotals(inv).balance <= 0) continue;
    const untilDue = daysBetween(today, inv.dueDate);
    const kind = untilDue >= 0 && untilDue <= 2 ? 'due_soon' : untilDue <= -7 ? 'overdue_7' : untilDue <= -1 ? 'overdue_1' : null;
    if (!kind) continue;
    if (await sendInvoiceEmail(inv, kind)) result.reminders.push(`${inv.number}: ${kind.replace('_', ' ')}`);
  }

  if (result.created.length || result.reminders.length) {
    await notifyOwner(
      `Billing run ${today}: ${result.created.length} new invoice(s), ${result.reminders.length} reminder(s)`,
      emailHtml(
        `${result.created.length ? `<p><strong>New invoices</strong></p><ul>${result.created.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}${
          result.reminders.length ? `<p><strong>Reminders sent</strong></p><ul>${result.reminders.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''
        }<p><a href="${SITE}/admin/invoices">Open invoices</a></p>`
      )
    );
  }
  return result;
}
