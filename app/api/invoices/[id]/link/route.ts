import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { ensureInvoiceToken } from '@/backend/invoices';
import { apiFail } from '@/backend/http';

type Ctx = { params: Promise<{ id: string }> };

/** Returns the client's private invoice link (creating the secret for older invoices). */
export async function POST(_req: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const token = await ensureInvoiceToken((await params).id);
    if (!token) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ url: `https://www.elevatewebandmarketing.com/i/${token}` });
  } catch (error) {
    return apiFail(error, 'Invoice link');
  }
}
