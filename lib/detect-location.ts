import {
  type LocationCode,
  LOCATION_CURRENCY_MAP,
  COUNTRY_TO_LOCATION,
  DEFAULT_LOCATION,
} from '@/lib/pricing-config';

export const LOCATION_STORAGE_KEY = 'elevate_location';
export const CONSENT_STORAGE_KEY = 'elevate_consent_given';
export const LOCATION_UPDATED_EVENT = 'elevate:location-updated';
const LOCATION_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry {
  code: LocationCode;
  ts: number;
  confirmed?: boolean; // true if user explicitly chose this location
}

export function readCachedLocation(): LocationCode | null {
  try {
    const raw = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    // User-confirmed locations never expire
    if (entry.confirmed) return entry.code;
    if (Date.now() - entry.ts < LOCATION_CACHE_TTL && LOCATION_CURRENCY_MAP[entry.code]) {
      return entry.code;
    }
  } catch {
    // ignore
  }
  return null;
}

export function writeLocation(code: LocationCode, confirmed = false): void {
  try {
    const entry: CacheEntry = { code, ts: Date.now(), confirmed };
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // ignore
  }
}

export function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function giveConsent(): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'true');
  } catch {
    // ignore
  }
}

export async function detectLocationFromIP(): Promise<LocationCode> {
  try {
    const res = await fetch('https://ip-api.com/json/?fields=status,countryCode', {
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success' && data.countryCode) {
        return COUNTRY_TO_LOCATION[data.countryCode as string] ?? DEFAULT_LOCATION;
      }
    }
  } catch {
    // ignore network errors / timeout
  }
  return DEFAULT_LOCATION;
}
