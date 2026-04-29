import {
  type LocationCode,
  LOCATION_CURRENCY_MAP,
  COUNTRY_TO_LOCATION,
} from '@/lib/pricing-config';

export const LOCATION_STORAGE_KEY = 'elevate_location';
export const LOCATION_UPDATED_EVENT = 'elevate:location-updated';

// When we can't determine location, default to US (not Nigeria)
export const FALLBACK_LOCATION: LocationCode = 'US';

// Nigeria is the only location shown automatically without asking
export const HOME_LOCATION: LocationCode = 'NG';

const LOCATION_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry {
  code: LocationCode;
  ts: number;
  confirmed: boolean; // true = user explicitly chose this; never expires
}

export function readCachedLocation(): { code: LocationCode; confirmed: boolean } | null {
  try {
    const raw = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (entry.confirmed) return { code: entry.code, confirmed: true };
    if (Date.now() - entry.ts < LOCATION_CACHE_TTL && LOCATION_CURRENCY_MAP[entry.code]) {
      return { code: entry.code, confirmed: false };
    }
  } catch {
    // ignore
  }
  return null;
}

export function writeLocation(code: LocationCode, confirmed: boolean): void {
  try {
    const entry: CacheEntry = { code, ts: Date.now(), confirmed };
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // ignore
  }
}

/**
 * Detects country from IP. Returns the mapped LocationCode if it is one
 * of our known regions, or null if unknown / detection failed.
 */
export async function detectLocationFromIP(): Promise<LocationCode | null> {
  try {
    const res = await fetch('https://ip-api.com/json/?fields=status,countryCode', {
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success' && data.countryCode) {
        const mapped = COUNTRY_TO_LOCATION[data.countryCode as string];
        return mapped ?? null; // null = unknown country
      }
    }
  } catch {
    // network error / timeout
  }
  return null; // null = detection failed
}
