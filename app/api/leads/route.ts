import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { listLeads } from '@/backend/workflow';
import { apiFail } from '@/backend/http';

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    return NextResponse.json(await listLeads());
  } catch (error) {
    return apiFail(error, 'List leads');
  }
}
