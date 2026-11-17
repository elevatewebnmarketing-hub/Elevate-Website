import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { createInvoice, listInvoices, StoreNotReadyError } from '@/backend/invoices';
import { sanitizeInvoice } from '@/lib/invoices';

function fail(error: unknown, what: string) {
  console.error(`${what} error:`, error);
  const status = error instanceof StoreNotReadyError ? 503 : 500;
  return NextResponse.json({ error: error instanceof Error ? error.message : `${what} failed` }, { status });
}

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    return NextResponse.json(await listInvoices());
  } catch (error) {
    return fail(error, 'List invoices');
  }
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const parsed = sanitizeInvoice(await request.json());
    if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });
    return NextResponse.json(await createInvoice(parsed.value));
  } catch (error) {
    return fail(error, 'Create invoice');
  }
}
