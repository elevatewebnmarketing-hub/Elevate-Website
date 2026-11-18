import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { listChecks } from '@/backend/visibility-leads';
import { apiFail } from '@/backend/http';

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    return NextResponse.json(await listChecks(30));
  } catch (error) {
    return apiFail(error, 'List visibility checks');
  }
}
