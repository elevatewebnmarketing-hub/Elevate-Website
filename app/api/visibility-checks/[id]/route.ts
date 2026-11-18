import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { CHECK_STATUSES, updateCheck, type CheckFollowUp } from '@/backend/visibility-leads';
import { apiFail } from '@/backend/http';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const b = await request.json();
    if (!CHECK_STATUSES.includes(b.status)) return NextResponse.json({ error: 'Unknown status' }, { status: 400 });
    await updateCheck((await params).id, { status: b.status as CheckFollowUp });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiFail(error, 'Update visibility check');
  }
}
