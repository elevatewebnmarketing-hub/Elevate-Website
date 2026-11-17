import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { listFeedback, setFeedbackStatus } from '@/backend/workflow';
import { apiFail } from '@/backend/http';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string; fid: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const { id, fid } = await params;
    const b = await request.json();
    if (b.status !== 'received' && b.status !== 'done') return NextResponse.json({ error: 'Bad status' }, { status: 400 });
    await setFeedbackStatus(id, fid, b.status);
    return NextResponse.json(await listFeedback(id));
  } catch (error) {
    return apiFail(error, 'Update feedback');
  }
}
