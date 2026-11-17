import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { addInvoicePayment, listInvoicePayments } from '@/backend/invoices';
import { apiFail } from '@/backend/http';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    return NextResponse.json(await listInvoicePayments((await params).id));
  } catch (error) {
    return apiFail(error, 'List payments');
  }
}

/** Record money received; amount paid and status are recalculated from the log. */
export async function POST(request: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const b = await request.json();
    const amount = Number(b.amount);
    if (!Number.isFinite(amount) || amount <= 0) return NextResponse.json({ error: 'Enter the amount received' }, { status: 400 });
    const paidOn = /^\d{4}-\d{2}-\d{2}$/.test(String(b.paidOn)) ? String(b.paidOn) : new Date().toISOString().slice(0, 10);
    const str = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);
    const inv = await addInvoicePayment((await params).id, {
      amount: Math.round(amount * 100) / 100,
      method: str(b.method, 80),
      reference: str(b.reference, 120),
      paidOn,
      note: str(b.note, 500),
    });
    return inv ? NextResponse.json(inv) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    return apiFail(error, 'Record payment');
  }
}
