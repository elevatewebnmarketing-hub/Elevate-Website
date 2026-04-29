import { NextResponse } from 'next/server';
import { getPricingPackages, savePricingPackage } from '@/backend/data';
import { requireAdmin } from '@/backend/auth';
import {
  LOCATION_CURRENCY_MAP,
  type LocationCode,
  type PackageKey,
} from '@/lib/pricing-config';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ location: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const { location } = await params;
    const packages = await getPricingPackages(location.toUpperCase());
    return NextResponse.json(packages);
  } catch (error) {
    console.error('Pricing location GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch pricing' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ location: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const { location } = await params;
    const loc = location.toUpperCase() as LocationCode;

    if (!LOCATION_CURRENCY_MAP[loc]) {
      return NextResponse.json({ error: 'Invalid location code' }, { status: 400 });
    }

    const body: Array<{
      packageKey: string;
      amount: number;
      isMonthly: boolean;
      isCustom?: boolean;
    }> = await request.json();

    const { code: currencyCode, symbol: currencySymbol } = LOCATION_CURRENCY_MAP[loc];
    const now = new Date().toISOString();

    for (const item of body) {
      await savePricingPackage({
        id: `${loc.toLowerCase()}_${item.packageKey}`,
        packageKey: item.packageKey as PackageKey,
        locationCode: loc,
        amount: Number(item.amount),
        currencyCode,
        currencySymbol,
        isMonthly: Boolean(item.isMonthly),
        isCustom: item.isCustom ?? false,
        updatedAt: now,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Failed to update pricing';
    console.error('Pricing PUT error:', error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
