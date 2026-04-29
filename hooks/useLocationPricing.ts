'use client';

import { useState, useEffect } from 'react';
import {
  type LocationCode,
  type PricingPackage,
  LOCATION_CURRENCY_MAP,
  DEFAULT_LOCATION,
  buildFallbackPackages,
} from '@/lib/pricing-config';
import {
  readCachedLocation,
  writeLocation,
  detectLocationFromIP,
  LOCATION_UPDATED_EVENT,
} from '@/lib/detect-location';

export interface ResolvedPricing {
  locationCode: LocationCode;
  countryName: string;
  packages: PricingPackage[];
  isLoading: boolean;
  error: string | null;
}

async function resolveLocation(): Promise<LocationCode> {
  // 1. User-confirmed or cached location
  const cached = readCachedLocation();
  if (cached) return cached;

  // 2. IP detection
  const detected = await detectLocationFromIP();
  writeLocation(detected, false);
  return detected;
}

async function fetchPricingData(loc: LocationCode): Promise<PricingPackage[]> {
  try {
    const res = await fetch(`/api/pricing?location=${loc}`);
    if (!res.ok) throw new Error('pricing fetch failed');
    return await res.json();
  } catch {
    return buildFallbackPackages(loc);
  }
}

export function useLocationPricing(): ResolvedPricing {
  const [locationCode, setLocationCode] = useState<LocationCode>(DEFAULT_LOCATION);
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  async function loadForLocation(loc: LocationCode) {
    setIsLoading(true);
    setLocationCode(loc);
    const data = await fetchPricingData(loc);
    setPackages(data);
    setIsLoading(false);
  }

  useEffect(() => {
    resolveLocation().then(loadForLocation);
  }, []);

  // Listen for banner confirming a location
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
    error,
  };
}
