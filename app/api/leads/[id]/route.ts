import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { deleteLead, getLead, updateLead } from '@/backend/workflow';
import { apiFail } from '@/backend/http';
import { LEAD_STATUSES, type LeadStatus } from '@/lib/workflow';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const lead = await getLead((await params).id);
    return lead ? NextResponse.json(lead) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    return apiFail(error, 'Get lead');
  }
}

export async function PATCH(request: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const b = await request.json();
    const patch: { status?: LeadStatus; notes?: string; invoiceId?: string | null } = {};
    if (LEAD_STATUSES.some((s) => s.value === b.status)) patch.status = b.status;
    if (typeof b.notes === 'string') patch.notes = b.notes.slice(0, 5000);
    if (typeof b.invoiceId === 'string' && /^[0-9a-f-]{36}$/i.test(b.invoiceId)) patch.invoiceId = b.invoiceId;
    await updateLead((await params).id, patch);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiFail(error, 'Update lead');
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    await deleteLead((await params).id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiFail(error, 'Delete lead');
  }
}
