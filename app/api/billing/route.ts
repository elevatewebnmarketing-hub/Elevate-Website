import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { createSchedule, listSchedules, nextMonth, runBilling } from '@/backend/billing';
import { getInvoice } from '@/backend/invoices';
import { apiFail } from '@/backend/http';

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    return NextResponse.json(await listSchedules());
  } catch (error) {
    return apiFail(error, 'List schedules');
  }
}

/** { action: 'run' } runs billing now; otherwise creates a monthly schedule from an invoice. */
export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const b = await request.json();
    if (b.action === 'run') return NextResponse.json(await runBilling());
    const tpl = typeof b.templateInvoiceId === 'string' ? await getInvoice(b.templateInvoiceId) : null;
    if (!tpl) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    const nextRun = /^\d{4}-\d{2}-\d{2}$/.test(String(b.nextRun)) ? String(b.nextRun) : nextMonth(tpl.issueDate);
    const dueDays = Math.max(0, Math.min(60, Math.round(Number(b.dueDays ?? 7)) || 7));
    const label = String(b.label ?? '').trim().slice(0, 120) || `${tpl.clientBusiness || tpl.clientName}: monthly`;
    return NextResponse.json(await createSchedule({ templateInvoiceId: tpl.id, label, nextRun, dueDays, sendEmail: b.sendEmail !== false }));
  } catch (error) {
    return apiFail(error, 'Billing');
  }
}
