export type LocationCode = 'NG' | 'GB' | 'US' | 'CA' | 'AU';

export type PackageKey =
  | 'starter'
  | 'business'
  | 'ecommerce'
  | 'growth_suite'
  | 'google_growth'
  | 'meta_growth';

export const ALL_PACKAGE_KEYS: PackageKey[] = [
  'starter',
  'business',
  'ecommerce',
  'growth_suite',
  'google_growth',
  'meta_growth',
];

export const ALL_LOCATION_CODES: LocationCode[] = ['NG', 'GB', 'US', 'CA', 'AU'];

export interface PricingPackage {
  id: string;
  packageKey: PackageKey;
  locationCode: LocationCode;
  amount: number;
  currencyCode: string;
  currencySymbol: string;
  isMonthly: boolean;
  isCustom: boolean;
  updatedAt: string;
}

export const LOCATION_CURRENCY_MAP: Record<
  LocationCode,
  { code: string; symbol: string; country: string }
> = {
  NG: { code: 'NGN', symbol: 'NGN ', country: 'Nigeria' },
  GB: { code: 'GBP', symbol: 'GBP ', country: 'United Kingdom' },
  US: { code: 'USD', symbol: '$', country: 'United States' },
  CA: { code: 'CAD', symbol: 'CAD ', country: 'Canada' },
  AU: { code: 'AUD', symbol: 'AUD ', country: 'Australia' },
};

export const COUNTRY_TO_LOCATION: Record<string, LocationCode> = {
  NG: 'NG',
  GB: 'GB',
  UK: 'GB',
  US: 'US',
  CA: 'CA',
  AU: 'AU',
};

export const DEFAULT_LOCATION: LocationCode = 'US';

export const STATIC_PRICING_FALLBACK: Record<
  LocationCode,
  Record<PackageKey, { amount: number; isMonthly: boolean }>
> = {
  NG: {
    starter: { amount: 850000, isMonthly: false },
    business: { amount: 1650000, isMonthly: false },
    ecommerce: { amount: 2750000, isMonthly: false },
    growth_suite: { amount: 3650000, isMonthly: false },
    google_growth: { amount: 180000, isMonthly: true },
    meta_growth: { amount: 280000, isMonthly: true },
  },
  GB: {
    starter: { amount: 950, isMonthly: false },
    business: { amount: 1850, isMonthly: false },
    ecommerce: { amount: 2995, isMonthly: false },
    growth_suite: { amount: 3995, isMonthly: false },
    google_growth: { amount: 199, isMonthly: true },
    meta_growth: { amount: 319, isMonthly: true },
  },
  US: {
    starter: { amount: 1250, isMonthly: false },
    business: { amount: 2400, isMonthly: false },
    ecommerce: { amount: 3900, isMonthly: false },
    growth_suite: { amount: 5200, isMonthly: false },
    google_growth: { amount: 249, isMonthly: true },
    meta_growth: { amount: 399, isMonthly: true },
  },
  CA: {
    starter: { amount: 1695, isMonthly: false },
    business: { amount: 3295, isMonthly: false },
    ecommerce: { amount: 5295, isMonthly: false },
    growth_suite: { amount: 6995, isMonthly: false },
    google_growth: { amount: 349, isMonthly: true },
    meta_growth: { amount: 549, isMonthly: true },
  },
  AU: {
    starter: { amount: 1895, isMonthly: false },
    business: { amount: 3595, isMonthly: false },
    ecommerce: { amount: 5795, isMonthly: false },
    growth_suite: { amount: 7595, isMonthly: false },
    google_growth: { amount: 399, isMonthly: true },
    meta_growth: { amount: 599, isMonthly: true },
  },
};

export function buildFallbackPackages(locationCode: LocationCode): PricingPackage[] {
  const { code: currencyCode, symbol: currencySymbol } = LOCATION_CURRENCY_MAP[locationCode];
  return ALL_PACKAGE_KEYS.map((packageKey) => {
    const { amount, isMonthly } = STATIC_PRICING_FALLBACK[locationCode][packageKey];
    return {
      id: `${locationCode.toLowerCase()}_${packageKey}`,
      packageKey,
      locationCode,
      amount,
      currencyCode,
      currencySymbol,
      isMonthly,
      isCustom: false,
      updatedAt: '',
    };
  });
}

export function formatPrice(pkg: PricingPackage): string {
  if (pkg.isCustom) return 'Custom';
  const locale = pkg.locationCode === 'NG' ? 'en-NG' : 'en-US';
  const n = pkg.amount.toLocaleString(locale);
  return `${pkg.currencySymbol}${n}${pkg.isMonthly ? '/mo' : ''}`;
}
