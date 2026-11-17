import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { listPaymentMethods, savePaymentMethod } from '@/backend/invoices';
import { apiFail } from '@/backend/http';
import { sanitizePaymentMethod } from '@/lib/payments';

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    return NextResponse.json(await listPaymentMethods());
  } catch (error) {
    return apiFail(error, 'List payment methods');
  }
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const parsed = sanitizePaymentMethod(await request.json());
    if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });
    return NextResponse.json(await savePaymentMethod(null, parsed.value));
  } catch (error) {
    return apiFail(error, 'Save payment method');
  }
}
