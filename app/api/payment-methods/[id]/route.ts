import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { deletePaymentMethod, savePaymentMethod } from '@/backend/invoices';
import { apiFail } from '@/backend/http';
import { sanitizePaymentMethod } from '@/lib/payments';

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const parsed = sanitizePaymentMethod(await request.json());
    if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });
    return NextResponse.json(await savePaymentMethod((await params).id, parsed.value));
  } catch (error) {
    return apiFail(error, 'Save payment method');
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    await deletePaymentMethod((await params).id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiFail(error, 'Delete payment method');
  }
}
