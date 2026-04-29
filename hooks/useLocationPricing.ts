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
  FALLBACK_LOCATION,
  LOCATION_UPDATED_EVENT,
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
    // On mount use whatever is confirmed in localStorage, else fall back to US
    const cached = readCachedLocation();
    loadForLocation(cached?.code ?? FALLBACK_LOCATION);
  }, []);

  // Live-update when the LocationModal confirms a location
  useEffect(() => {
    function onLocationUpdated(e: Event) {
      const loc = (e as CustomEvent<LocationCode>).detail;
      loadForLocation(loc);
    }
    window.addEventListener(LOCATION_UPDATED_EVENT, onLocationUpdated);
    return () => window.removeEventListener(LOCATION_UPDATED_EVENT, onLocationUpdated);
  }, []);

  return {
    locationCode,
    countryName: LOCATION_CURRENCY_MAP[locationCode].country,
    packages,
    isLoading,
  };
}
