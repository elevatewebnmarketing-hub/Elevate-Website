import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { listFeedback } from '@/backend/workflow';
import { apiFail } from '@/backend/http';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    return NextResponse.json(await listFeedback((await params).id));
  } catch (error) {
    return apiFail(error, 'List feedback');
  }
}
