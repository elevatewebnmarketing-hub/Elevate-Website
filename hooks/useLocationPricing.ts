'use client';

import { useState, useEffect } from 'react';
import {
  type LocationCode,
  type PricingPackage,
  LOCATION_CURRENCY_MAP,
  COUNTRY_TO_LOCATION,
  DEFAULT_LOCATION,
  buildFallbackPackages,
} from '@/lib/pricing-config';

const LOCATION_CACHE_KEY = 'elevate_location';
const LOCATION_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry {
  code: LocationCode;
  ts: number;
}

async function detectLocation(): Promise<LocationCode> {
  // Layer 1: localStorage cache with TTL
  try {
    const raw = localStorage.getItem(LOCATION_CACHE_KEY);
    if (raw) {
      const entry: CacheEntry = JSON.parse(raw);
      if (
        Date.now() - entry.ts < LOCATION_CACHE_TTL &&
        LOCATION_CURRENCY_MAP[entry.code]
      ) {
        return entry.code;
      }
    }
  } catch {
    // ignore storage errors
  }

  // Layer 2: ip-api.com with 4s timeout
  try {
    const res = await fetch('https://ip-api.com/json/?fields=status,countryCode', {
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success' && data.countryCode) {
        const loc = COUNTRY_TO_LOCATION[data.countryCode as string] ?? DEFAULT_LOCATION;
        try {
          localStorage.setItem(
            LOCATION_CACHE_KEY,
            JSON.stringify({ code: loc, ts: Date.now() })
          );
        } catch {
          // ignore storage errors
        }
        return loc;
      }
    }
  } catch {
    // Layer 3: fallback to default
  }

  const loc = DEFAULT_LOCATION;
  try {
    localStorage.setItem(
      LOCATION_CACHE_KEY,
      JSON.stringify({ code: loc, ts: Date.now() })
    );
  } catch {
    // ignore
  }
  return loc;
}

export interface ResolvedPricing {
  locationCode: LocationCode;
  countryName: string;
  packages: PricingPackage[];
  isLoading: boolean;
  error: string | null;
  setLocation: (code: LocationCode) => void;
}

export function useLocationPricing(): ResolvedPricing {
  const [locationCode, setLocationCode] = useState<LocationCode>(DEFAULT_LOCATION);
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchPricing(loc: LocationCode) {
    setIsLoading(true);
    setLocationCode(loc);
    try {
      const res = await fetch(`/api/pricing?location=${loc}`);
      if (!res.ok) throw new Error('pricing fetch failed');
      const data: PricingPackage[] = await res.json();
      setPackages(data);
      setError(null);
    } catch {
      // Layer 4: static fallback
      setPackages(buildFallbackPackages(loc));
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }

  function setLocation(code: LocationCode) {
    try {
      localStorage.setItem(
        LOCATION_CACHE_KEY,
        JSON.stringify({ code, ts: Date.now() })
      );
    } catch {
      // ignore
    }
    fetchPricing(code);
  }

  useEffect(() => {
    detectLocation().then((loc) => {
      fetchPricing(loc);
    });
  }, []);

  return {
    locationCode,
    countryName: LOCATION_CURRENCY_MAP[locationCode].country,
    packages,
    isLoading,
    error,
    setLocation,
  };
}
