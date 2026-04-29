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
  NG: { code: 'NGN', symbol: '₦',   country: 'Nigeria' },
  GB: { code: 'GBP', symbol: '£',   country: 'United Kingdom' },
  US: { code: 'USD', symbol: '$',   country: 'United States' },
  CA: { code: 'CAD', symbol: 'CA$', country: 'Canada' },
  AU: { code: 'AUD', symbol: 'AU$', country: 'Australia' },
};

// IP country code → location code (unrecognised countries default to NG)
export const COUNTRY_TO_LOCATION: Record<string, LocationCode> = {
  NG: 'NG',
  GB: 'GB',
  UK: 'GB',
  US: 'US',
  CA: 'CA',
  AU: 'AU',
};

export const DEFAULT_LOCATION: LocationCode = 'NG';

export const STATIC_PRICING_FALLBACK: Record<
  LocationCode,
  Record<PackageKey, { amount: number; isMonthly: boolean }>
> = {
  NG: {
    starter:       { amount: 250000,   isMonthly: false },
    business:      { amount: 450000,   isMonthly: false },
    ecommerce:     { amount: 600000,   isMonthly: false },
    growth_suite:  { amount: 1000000,  isMonthly: false },
    google_growth: { amount: 200,      isMonthly: true  },
    meta_growth:   { amount: 200,      isMonthly: true  },
  },
  GB: {
    starter:       { amount: 349,   isMonthly: false },
    business:      { amount: 599,   isMonthly: false },
    ecommerce:     { amount: 849,   isMonthly: false },
    growth_suite:  { amount: 1299,  isMonthly: false },
    google_growth: { amount: 199,   isMonthly: true  },
    meta_growth:   { amount: 199,   isMonthly: true  },
  },
  US: {
    starter:       { amount: 449,   isMonthly: false },
    business:      { amount: 799,   isMonthly: false },
    ecommerce:     { amount: 1099,  isMonthly: false },
    growth_suite:  { amount: 1699,  isMonthly: false },
    google_growth: { amount: 249,   isMonthly: true  },
    meta_growth:   { amount: 249,   isMonthly: true  },
  },
  CA: {
    starter:       { amount: 599,   isMonthly: false },
    business:      { amount: 1099,  isMonthly: false },
    ecommerce:     { amount: 1499,  isMonthly: false },
    growth_suite:  { amount: 2299,  isMonthly: false },
    google_growth: { amount: 299,   isMonthly: true  },
    meta_growth:   { amount: 299,   isMonthly: true  },
  },
  AU: {
    starter:       { amount: 699,   isMonthly: false },
    business:      { amount: 1249,  isMonthly: false },
    ecommerce:     { amount: 1749,  isMonthly: false },
    growth_suite:  { amount: 2699,  isMonthly: false },
    google_growth: { amount: 349,   isMonthly: true  },
    meta_growth:   { amount: 349,   isMonthly: true  },
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
  const n =
    pkg.locationCode === 'NG'
      ? pkg.amount.toLocaleString('en-NG')
      : pkg.amount.toLocaleString('en-US');
  return `${pkg.currencySymbol}${n}${pkg.isMonthly ? '/mo' : ''}`;
}
