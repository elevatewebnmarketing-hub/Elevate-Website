'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  ALL_LOCATION_CODES,
  LOCATION_CURRENCY_MAP,
  type LocationCode,
} from '@/lib/pricing-config';
import {
  readCachedLocation,
  writeLocation,
  detectLocationFromIP,
  FALLBACK_LOCATION,
  HOME_LOCATION,
  LOCATION_UPDATED_EVENT,
} from '@/lib/detect-location';

const REGION_FLAGS: Record<LocationCode, string> = {
  NG: '🇳🇬',
  GB: '🇬🇧',
  US: '🇺🇸',
  CA: '🇨🇦',
  AU: '🇦🇺',
};

export default function LocationModal() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<LocationCode>(FALLBACK_LOCATION);
  // ipLoc is what we detected — used as fallback when user dismisses
  const [ipLoc, setIpLoc] = useState<LocationCode>(FALLBACK_LOCATION);

  useEffect(() => {
    // Already answered — don't show again
    const cached = readCachedLocation();
    if (cached?.confirmed) return;

    // Detect from IP first, then show modal with pre-selection
    detectLocationFromIP().then((detected) => {
      const loc = detected ?? FALLBACK_LOCATION;
      setIpLoc(loc);
      setSelected(loc);
      setVisible(true);
    });
  }, []);

  function confirm(loc: LocationCode) {
    writeLocation(loc, true);
    window.dispatchEvent(new CustomEvent(LOCATION_UPDATED_EVENT, { detail: loc }));
    setVisible(false);
  }

  function handleContinue() {
    confirm(selected);
  }

  function handleDismiss() {
    // Respect IP detection for Nigeria; everywhere else → US
    const fallback = ipLoc === HOME_LOCATION ? HOME_LOCATION : FALLBACK_LOCATION;
    confirm(fallback);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* Close */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 text-text/40 hover:text-text/80 dark:text-gray-500 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
        >
          <X size={18} />
        </button>

        <h2
          id="location-modal-title"
          className="font-heading font-bold text-2xl text-primary dark:text-white mb-1"
        >
          Where are you based?
        </h2>
        <p className="text-text/60 dark:text-gray-400 text-sm mb-6">
          We&apos;ll show you pricing in your local currency.
        </p>

        {/* Region options */}
        <div className="grid grid-cols-1 gap-2 mb-6">
          {ALL_LOCATION_CODES.map((loc) => {
            const { country, code } = LOCATION_CURRENCY_MAP[loc];
            const isSelected = selected === loc;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => setSelected(loc)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-accent bg-accent/5 dark:bg-accent/10'
                    : 'border-gray-200 dark:border-white/10 hover:border-accent/40 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className="text-2xl leading-none" aria-hidden="true">
                  {REGION_FLAGS[loc]}
                </span>
                <span className="flex-1">
                  <span className={`font-semibold block text-sm ${isSelected ? 'text-accent' : 'text-primary dark:text-white'}`}>
                    {country}
                  </span>
                  <span className="text-xs text-text/50 dark:text-gray-500">{code}</span>
                </span>
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                      <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-3 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition-colors"
        >
          Continue
        </button>

        <p className="text-center mt-3 text-xs text-text/40 dark:text-gray-600">
          Not your region?{' '}
          <button
            type="button"
            onClick={handleDismiss}
            className="underline hover:text-text/60 dark:hover:text-gray-400 transition-colors"
          >
            Skip — show US pricing
          </button>
        </p>

        <p className="text-center mt-3 text-xs text-text/30 dark:text-gray-700">
          <a href="/cookies" className="hover:text-text/50 transition-colors">Cookie Policy</a>
        </p>
      </div>
    </div>
  );
}
