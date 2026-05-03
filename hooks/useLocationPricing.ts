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
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const data = await fetchPricingData(DEFAULT_LOCATION);
      setPackages(data);
      setIsLoading(false);
    }

    init();
  }, []);

  return {
    locationCode: DEFAULT_LOCATION,
    countryName: LOCATION_CURRENCY_MAP[DEFAULT_LOCATION].country,
    packages,
    isLoading,
  };
}
