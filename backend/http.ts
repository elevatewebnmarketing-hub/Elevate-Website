import { NextResponse } from 'next/server';
import { StoreNotReadyError } from '@/backend/invoices';

/** JSON error for admin API routes: 503 with setup instructions when the database needs updating. */
export function apiFail(error: unknown, what: string) {
  console.error(`${what} error:`, error);
  const status = error instanceof StoreNotReadyError ? 503 : 500;
  return NextResponse.json({ error: error instanceof Error ? error.message : `${what} failed` }, { status });
}
