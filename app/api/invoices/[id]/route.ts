import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { deleteInvoice, getInvoice, updateInvoice, StoreNotReadyError } from '@/backend/invoices';
import { sanitizeInvoice } from '@/lib/invoices';

type Ctx = { params: Promise<{ id: string }> };

function fail(error: unknown, what: string) {
  console.error(`${what} error:`, error);
  const status = error instanceof StoreNotReadyError ? 503 : 500;
  return NextResponse.json({ error: error instanceof Error ? error.message : `${what} failed` }, { status });
}

export async function GET(_req: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const inv = await getInvoice((await params).id);
    return inv ? NextResponse.json(inv) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    return fail(error, 'Get invoice');
  }
}

export async function PUT(request: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const parsed = sanitizeInvoice(await request.json());
    if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const inv = await updateInvoice((await params).id, parsed.value);
    return inv ? NextResponse.json(inv) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    return fail(error, 'Update invoice');
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    await deleteInvoice((await params).id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return fail(error, 'Delete invoice');
  }
}
