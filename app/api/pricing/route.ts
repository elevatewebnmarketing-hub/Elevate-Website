import { NextResponse } from 'next/server';
import { getPricingPackages } from '@/backend/data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location') ?? undefined;
    const packages = await getPricingPackages(location);
    return NextResponse.json(packages, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Pricing GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch pricing' }, { status: 500 });
  }
}
