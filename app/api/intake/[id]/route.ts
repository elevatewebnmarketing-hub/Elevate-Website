import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { deleteIntake, getIntake, setIntakeStatus, StoreNotReadyError, type IntakeStatus } from '@/backend/invoices';

type Ctx = { params: Promise<{ id: string }> };
const STATUSES: IntakeStatus[] = ['new', 'reviewed', 'archived'];

function fail(error: unknown) {
  console.error('Intake error:', error);
  const status = error instanceof StoreNotReadyError ? 503 : 500;
  return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed' }, { status });
}

export async function GET(_req: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const intake = await getIntake((await params).id);
    return intake ? NextResponse.json(intake) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    return fail(error);
  }
}

export async function PATCH(request: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const { status } = await request.json();
    if (!STATUSES.includes(status)) return NextResponse.json({ error: 'Bad status' }, { status: 400 });
    await setIntakeStatus((await params).id, status);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return fail(error);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    await deleteIntake((await params).id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return fail(error);
  }
}
