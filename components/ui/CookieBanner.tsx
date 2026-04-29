'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, X } from 'lucide-react';
import {
  ALL_LOCATION_CODES,
  LOCATION_CURRENCY_MAP,
  DEFAULT_LOCATION,
  type LocationCode,
} from '@/lib/pricing-config';
import {
  hasConsent,
  giveConsent,
  readCachedLocation,
  writeLocation,
  detectLocationFromIP,
  LOCATION_UPDATED_EVENT,
} from '@/lib/detect-location';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState<LocationCode>(DEFAULT_LOCATION);
  const [detecting, setDetecting] = useState(true);

  useEffect(() => {
    // Don't show if already consented
    if (hasConsent()) return;

    setVisible(true);

    // Pre-fill dropdown: use cached value or detect from IP
    const cached = readCachedLocation();
    if (cached) {
      setSelectedLoc(cached);
      setDetecting(false);
    } else {
      detectLocationFromIP().then((loc) => {
        setSelectedLoc(loc);
        setDetecting(false);
      });
    }
  }, []);

  function handleAccept() {
    giveConsent();
    writeLocation(selectedLoc, true); // confirmed = true so it never expires
    window.dispatchEvent(
      new CustomEvent(LOCATION_UPDATED_EVENT, { detail: selectedLoc })
    );
    setVisible(false);
  }

  function handleDismiss() {
    // Dismiss without saving location — consent still given to stop banner showing
    giveConsent();
    // Save the detected/selected location without the confirmed flag
    writeLocation(selectedLoc, false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent and location"
      className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-white shadow-2xl border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">

          {/* Message */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white/90 leading-relaxed">
              We use cookies to personalise your experience and show accurate pricing.{' '}
              <Link
                href="/cookies"
                className="underline underline-offset-2 text-accent hover:text-white transition-colors whitespace-nowrap"
              >
                Cookie Policy
              </Link>
            </p>
          </div>

          {/* Location selector */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <MapPin size={16} className="text-accent flex-shrink-0" />
            <label htmlFor="cookie-location" className="text-sm text-white/80 whitespace-nowrap">
              Your location:
            </label>
            <select
              id="cookie-location"
              value={selectedLoc}
              onChange={(e) => setSelectedLoc(e.target.value as LocationCode)}
              disabled={detecting}
              className="text-sm border border-white/20 rounded-lg px-3 py-1.5 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent/60 cursor-pointer disabled:opacity-50"
            >
              {ALL_LOCATION_CODES.map((loc) => (
                <option key={loc} value={loc} className="bg-primary text-white">
                  {LOCATION_CURRENCY_MAP[loc].country} ({LOCATION_CURRENCY_MAP[loc].code})
                </option>
              ))}
            </select>
          </div>

          {/* Accept button */}
          <button
            type="button"
            onClick={handleAccept}
            className="flex-shrink-0 px-5 py-2 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent/90 transition-colors whitespace-nowrap"
          >
            Accept & Continue
          </button>

          {/* Dismiss */}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="flex-shrink-0 p-1.5 text-white/50 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>

        </div>
      </div>
    </div>
  );
}
