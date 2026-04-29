'use client';

import { useState, useEffect } from 'react';
import {
  type LocationCode,
  type PricingPackage,
  LOCATION_CURRENCY_MAP,
  buildFallbackPackages,
} from '@/lib/pricing-config';
import {
  readCachedLocation,
  writeLocation,
  detectLocationFromBrowser,
  FALLBACK_LOCATION,
} from '@/lib/detect-location';

export interface ResolvedPricing {
  locationCode: LocationCode;
  countryName: string;
  packages: PricingPackage[];
  isLoading: boolean;
}

async function fetchPricingData(loc: LocationCode): Promise<PricingPackage[]> {
  try {
    const res = await fetch(`/api/pricing?location=${loc}`);
    if (!res.ok) throw new Error('failed');
    return await res.json();
  } catch {
    return buildFallbackPackages(loc);
  }
}

export function useLocationPricing(): ResolvedPricing {
  const [locationCode, setLocationCode] = useState<LocationCode>(FALLBACK_LOCATION);
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadForLocation(loc: LocationCode) {
    setIsLoading(true);
    setLocationCode(loc);
    const data = await fetchPricingData(loc);
    setPackages(data);
    setIsLoading(false);
  }

  useEffect(() => {
    async function init() {
      // If we already have a cached answer, use it immediately — no prompt
      const cached = readCachedLocation();
      if (cached) {
        await loadForLocation(cached.code);
        return;
      }

      // First visit: show US prices right away so the page isn't blank
      await loadForLocation(FALLBACK_LOCATION);

      // Ask browser for location (triggers native OS/browser permission prompt)
      const detected = await detectLocationFromBrowser();
      const loc = detected ?? FALLBACK_LOCATION;

      // Cache the result so we don't prompt again for 24 h
      writeLocation(loc, false);

      // Only re-render if the detected location differs from the default
      if (loc !== FALLBACK_LOCATION) {
        await loadForLocation(loc);
      }
    }

    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    locationCode,
    countryName: LOCATION_CURRENCY_MAP[locationCode].country,
    packages,
    isLoading,
  };
}
