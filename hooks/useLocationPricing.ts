'use client';

import { useState, useEffect } from 'react';
import {
  DEFAULT_LOCATION,
  LOCATION_CURRENCY_MAP,
  buildFallbackPackages,
  type LocationCode,
  type PricingPackage,
} from '@/lib/pricing-config';

export interface ResolvedPricing {
  locationCode: LocationCode;
  countryName: string;
  packages: PricingPackage[];
  isLoading: boolean;
}

/**
 * Picks the price list from the browser's time zone: no permission prompt, no IP lookup.
 * Nigeria sees naira, the UK pounds, Canada and Australia their own dollars, everyone else US dollars.
 * shortcut: a VPN or travel changes nothing (time zone follows the device); upgrade to a CDN
 * country header (cf-ipcountry) if that matters.
 */
const CANADA_ZONES = new Set([
  'America/Toronto', 'America/Vancouver', 'America/Edmonton', 'America/Winnipeg', 'America/Halifax',
  'America/St_Johns', 'America/Regina', 'America/Moncton', 'America/Whitehorse', 'America/Yellowknife',
  'America/Iqaluit', 'America/Glace_Bay', 'America/Goose_Bay', 'America/Dawson_Creek', 'America/Swift_Current',
]);

export function detectLocation(): LocationCode {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
    if (tz === 'Africa/Lagos') return 'NG';
    if (tz === 'Europe/London' || tz === 'Europe/Belfast') return 'GB';
    if (tz.startsWith('Australia/')) return 'AU';
    if (CANADA_ZONES.has(tz)) return 'CA';
    return 'US';
  } catch {
    return DEFAULT_LOCATION;
  }
}

export function useLocationPricing(): ResolvedPricing {
  // Server HTML carries the naira prices, so crawlers and Nigerian visitors see real prices without JavaScript.
  const [locationCode, setLocationCode] = useState<LocationCode>(DEFAULT_LOCATION);
  const [packages, setPackages] = useState<PricingPackage[]>(() => buildFallbackPackages(DEFAULT_LOCATION));

  useEffect(() => {
    const loc = detectLocation();
    setLocationCode(loc);
    // Prices live in lib/pricing-config.ts, so no network request is needed.
    setPackages(buildFallbackPackages(loc));
  }, []);

  return {
    locationCode,
    countryName: LOCATION_CURRENCY_MAP[locationCode].country,
    packages,
    isLoading: false,
  };
}
