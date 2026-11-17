import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { getInvoice, latestAcceptance } from '@/backend/invoices';
import { apiFail } from '@/backend/http';
import { TERMS_VERSION } from '@/lib/project-terms';

/** Admin: has the client accepted this invoice, and does it still match? */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const inv = await getInvoice((await params).id);
    if (!inv) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ acceptance: await latestAcceptance(inv, TERMS_VERSION) });
  } catch (error) {
    return apiFail(error, 'Get acceptance');
  }
}
