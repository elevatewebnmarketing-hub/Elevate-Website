import { NextResponse } from 'next/server';
import { checkVisibility } from '@/lib/visibility-check';

export const runtime = 'nodejs';
export const maxDuration = 30;

const LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000;
// shortcut: in-memory limit per server instance; serverless instances don't share it. Upgrade to a
// shared store (Supabase table or KV) if the tool gets abused.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many checks from your connection. Please try again in an hour.' }, { status: 429 });
  }

  let url: unknown;
  try {
    ({ url } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Send a website address to check.' }, { status: 400 });
  }
  if (typeof url !== 'string' || url.trim().length < 4 || url.length > 2048) {
    return NextResponse.json({ error: 'Enter a website address, for example yourbusiness.com.' }, { status: 400 });
  }

  try {
    const report = await checkVisibility(url);
    return NextResponse.json(report, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const message =
      error instanceof Error && /isn’t a public|can’t be checked|Only |redirects too many|answered with an error/.test(error.message)
        ? error.message
        : 'We couldn’t reach that website. Check the address and try again.';
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
