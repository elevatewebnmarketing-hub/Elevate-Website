import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getInvoiceByToken, recordAcceptance } from '@/backend/invoices';
import { apiFail } from '@/backend/http';
import { TERMS_VERSION } from '@/lib/project-terms';

// Public: the client clicks "I accept" on their invoice page. Light per-IP limit.
const hits = new Map<string, number[]>();
function allowed(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3600_000);
  if (recent.length >= 10) return false;
  hits.set(ip, [...recent, now]);
  return true;
}

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const h = await headers();
  const ip = h.get('x-real-ip')?.trim() || h.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (!allowed(ip)) return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
  const origin = h.get('origin');
  const host = h.get('x-forwarded-host') ?? h.get('host');
  if (origin && new URL(origin).host !== host) return NextResponse.json({ error: 'Cross-site request blocked' }, { status: 403 });

  try {
    const body = await request.json().catch(() => ({}));
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : '';
    if (body.agree !== true) return NextResponse.json({ error: 'Please tick the box to accept.' }, { status: 400 });
    if (name.length < 2) return NextResponse.json({ error: 'Please type your full name.' }, { status: 400 });

    const inv = await getInvoiceByToken((await params).token);
    if (!inv || inv.status === 'draft') return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    if (inv.status === 'void') return NextResponse.json({ error: 'This invoice has been cancelled.' }, { status: 400 });

    const acceptance = await recordAcceptance(inv, { name, ip, userAgent: h.get('user-agent') ?? '', termsVersion: TERMS_VERSION });
    return NextResponse.json(acceptance);
  } catch (error) {
    return apiFail(error, 'Accept invoice');
  }
}
