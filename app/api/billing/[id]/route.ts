import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { deleteSchedule, updateSchedule } from '@/backend/billing';
import { apiFail } from '@/backend/http';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const b = await request.json();
    await updateSchedule((await params).id, {
      active: typeof b.active === 'boolean' ? b.active : undefined,
      nextRun: /^\d{4}-\d{2}-\d{2}$/.test(String(b.nextRun ?? '')) ? b.nextRun : undefined,
      dueDays: Number.isFinite(Number(b.dueDays)) && b.dueDays !== undefined ? Math.max(0, Math.min(60, Math.round(Number(b.dueDays)))) : undefined,
      sendEmail: typeof b.sendEmail === 'boolean' ? b.sendEmail : undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiFail(error, 'Update schedule');
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    await deleteSchedule((await params).id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiFail(error, 'Delete schedule');
  }
}
