import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { deleteInvoicePayment } from '@/backend/invoices';
import { apiFail } from '@/backend/http';

type Ctx = { params: Promise<{ id: string; paymentId: string }> };

export async function DELETE(_req: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const { id, paymentId } = await params;
    const inv = await deleteInvoicePayment(id, paymentId);
    return inv ? NextResponse.json(inv) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    return apiFail(error, 'Delete payment');
  }
}
