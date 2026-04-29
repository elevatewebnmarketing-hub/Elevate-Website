import {
  type LocationCode,
  LOCATION_CURRENCY_MAP,
  COUNTRY_TO_LOCATION,
} from '@/lib/pricing-config';

export const LOCATION_STORAGE_KEY = 'elevate_location';
export const LOCATION_UPDATED_EVENT = 'elevate:location-updated';

export const FALLBACK_LOCATION: LocationCode = 'US';
export const HOME_LOCATION: LocationCode = 'NG';

const LOCATION_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry {
  code: LocationCode;
  ts: number;
  confirmed: boolean;
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

async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: { 'Accept-Language': 'en', 'User-Agent': 'ElevateWebMarketing/1.0' },
        signal: AbortSignal.timeout(5000),
      }
    );
    if (res.ok) {
      const data = await res.json();
      const cc = (data?.address?.country_code as string | undefined)?.toUpperCase();
      return cc ?? null;
    }
  } catch {
    // ignore
  }
  return null;
}

/**
 * Requests location via the browser's native Geolocation API (triggers browser
 * permission prompt). Reverse-geocodes the coordinates to a country code.
 * Returns the mapped LocationCode for known regions, or null on denial / failure.
 */
export async function detectLocationFromBrowser(): Promise<LocationCode | null> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    return null;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const cc = await reverseGeocode(
          position.coords.latitude,
          position.coords.longitude
        );
        resolve(cc ? (COUNTRY_TO_LOCATION[cc] ?? null) : null);
      },
      () => resolve(null),
      { timeout: 10_000, maximumAge: 300_000 }
    );
  });
}
