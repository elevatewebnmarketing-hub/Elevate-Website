import { NextResponse } from 'next/server';
import { runBilling } from '@/backend/billing';
import { apiFail } from '@/backend/http';

/**
 * Daily billing run, called by Vercel Cron (see vercel.json). Vercel sends
 * "Authorization: Bearer <CRON_SECRET>" when CRON_SECRET is set in the project's environment variables.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: 'CRON_SECRET is not set' }, { status: 503 });
  if (request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    return NextResponse.json(await runBilling());
  } catch (error) {
    return apiFail(error, 'Billing run');
  }
}
