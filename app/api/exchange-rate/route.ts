import { NextResponse } from 'next/server';

const CACHE_HOURS = 6;
const FALLBACK_RATE = Number(process.env.EXCHANGE_RATE_FALLBACK) || 1600;

export async function GET() {
  try {
    const res = await fetch(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@1/latest/currencies/usd/ngn.json',
      { next: { revalidate: CACHE_HOURS * 3600 } }
    );
    if (!res.ok) throw new Error('API request failed');
    const data = (await res.json()) as { date?: string; ngn?: number };
    const rate = typeof data.ngn === 'number' && data.ngn > 0 ? data.ngn : FALLBACK_RATE;
    return NextResponse.json({
      rate: Math.round(rate),
      lastUpdated: data.date || new Date().toISOString().slice(0, 10),
    });
  } catch {
    return NextResponse.json({
      rate: FALLBACK_RATE,
      lastUpdated: new Date().toISOString().slice(0, 10),
    });
  }
}

