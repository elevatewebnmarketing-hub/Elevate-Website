'use client';

import { useState, useEffect, useCallback } from 'react';
import { DollarSign, RotateCcw, Save } from 'lucide-react';
import { Breadcrumbs } from '@/admin/Breadcrumbs';
import {
  ALL_LOCATION_CODES,
  ALL_PACKAGE_KEYS,
  LOCATION_CURRENCY_MAP,
  STATIC_PRICING_FALLBACK,
  formatPrice,
  type LocationCode,
  type PackageKey,
  type PricingPackage,
} from '@/lib/pricing-config';

const PACKAGE_LABELS: Record<PackageKey, string> = {
  starter:       'Starter Website',
  business:      'Business Website',
  ecommerce:     'E-commerce Website',
  growth_suite:  'Complete Growth Suite',
  google_growth: 'Google Growth Package',
  meta_growth:   'Meta Growth Package',
};

type EditValues = Record<PackageKey, string>;

function defaultValues(loc: LocationCode): EditValues {
  const fallback = STATIC_PRICING_FALLBACK[loc];
  return ALL_PACKAGE_KEYS.reduce((acc, key) => {
    acc[key] = String(fallback[key].amount);
    return acc;
  }, {} as EditValues);
}

export default function AdminPricingPage() {
  const [selectedLoc, setSelectedLoc] = useState<LocationCode>('NG');
  // allPackages keyed by location, loaded once on mount
  const [allPackages, setAllPackages] = useState<Partial<Record<LocationCode, PricingPackage[]>>>({});
  const [editValues, setEditValues] = useState<EditValues>(defaultValues('NG'));
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  // Load all pricing once
  useEffect(() => {
    fetch('/api/pricing', { credentials: 'include' })
      .then((r) => r.json())
      .then((data: PricingPackage[]) => {
        const grouped = ALL_LOCATION_CODES.reduce((acc, loc) => {
          acc[loc] = data.filter((p) => p.locationCode === loc);
          return acc;
        }, {} as Record<LocationCode, PricingPackage[]>);
        setAllPackages(grouped);
      })
      .catch(() => {
        // silently fall back to static defaults
      });
  }, []);

  // Sync edit values when tab or loaded data changes
  const syncEdits = useCallback(
    (loc: LocationCode) => {
      const loaded = allPackages[loc];
      if (loaded && loaded.length > 0) {
        const vals = ALL_PACKAGE_KEYS.reduce((acc, key) => {
          const pkg = loaded.find((p) => p.packageKey === key);
          acc[key] = pkg ? String(pkg.amount) : String(STATIC_PRICING_FALLBACK[loc][key].amount);
          return acc;
        }, {} as EditValues);
        setEditValues(vals);
      } else {
        setEditValues(defaultValues(loc));
      }
    },
    [allPackages]
  );

  useEffect(() => {
    syncEdits(selectedLoc);
  }, [selectedLoc, syncEdits]);

  function handleTabChange(loc: LocationCode) {
    setSelectedLoc(loc);
    setStatus(null);
  }

  function handleReset() {
    setEditValues(defaultValues(selectedLoc));
    setStatus(null);
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);
    try {
      const body = ALL_PACKAGE_KEYS.map((key) => ({
        packageKey: key,
        amount: Number(editValues[key]) || 0,
        isMonthly: STATIC_PRICING_FALLBACK[selectedLoc][key].isMonthly,
      }));

      const res = await fetch(`/api/pricing/${selectedLoc}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(err.error ?? 'Save failed');
      }

      // Refresh cached data for this location
      const updated = await fetch(`/api/pricing?location=${selectedLoc}`).then((r) =>
        r.json()
      );
      setAllPackages((prev) => ({ ...prev, [selectedLoc]: updated }));
      setStatus({ ok: true, msg: `${LOCATION_CURRENCY_MAP[selectedLoc].country} pricing saved.` });
    } catch (err) {
      setStatus({
        ok: false,
        msg: err instanceof Error ? err.message : 'Save failed',
      });
    } finally {
      setSaving(false);
    }
  }

  const { symbol, country } = LOCATION_CURRENCY_MAP[selectedLoc];
  const loaded = allPackages[selectedLoc] ?? [];

  function currentDisplay(key: PackageKey): string {
    const pkg = loaded.find((p) => p.packageKey === key);
    if (pkg) return formatPrice(pkg);
    const { amount, isMonthly } = STATIC_PRICING_FALLBACK[selectedLoc][key];
    const n = selectedLoc === 'NG' ? amount.toLocaleString('en-NG') : amount.toLocaleString('en-US');
    return `${symbol}${n}${isMonthly ? '/mo' : ''}`;
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Pricing' },
        ]}
      />

      <div className="flex items-start gap-3 mb-2 mt-4">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
          <DollarSign className="text-accent" size={22} />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl text-primary">Pricing Management</h1>
          <p className="text-sm text-text/70 mt-0.5">
            Edit prices per region. Changes save to the database immediately.
          </p>
        </div>
      </div>

      {/* Location tabs */}
      <div className="flex gap-1 flex-wrap mt-6 mb-6 border-b border-gray-200">
        {ALL_LOCATION_CODES.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => handleTabChange(loc)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition -mb-px ${
              loc === selectedLoc
                ? 'border-accent text-accent bg-accent/5'
                : 'border-transparent text-text/60 hover:text-accent hover:bg-gray-50'
            }`}
          >
            {LOCATION_CURRENCY_MAP[loc].country}
            <span className="ml-1.5 text-xs opacity-60">({LOCATION_CURRENCY_MAP[loc].code})</span>
          </button>
        ))}
      </div>

      {/* Pricing table */}
      <div className="bg-white rounded-card shadow-soft border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-text/70">Package</th>
              <th className="text-left px-5 py-3 font-semibold text-text/70 hidden sm:table-cell">Type</th>
              <th className="text-left px-5 py-3 font-semibold text-text/70">Live Price</th>
              <th className="text-left px-5 py-3 font-semibold text-text/70">New Amount ({symbol})</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ALL_PACKAGE_KEYS.map((key) => {
              const isMonthly = STATIC_PRICING_FALLBACK[selectedLoc][key].isMonthly;
              return (
                <tr key={key} className="hover:bg-gray-50/50 transition">
                  <td className="px-5 py-3.5 font-medium text-primary">{PACKAGE_LABELS[key]}</td>
                  <td className="px-5 py-3.5 text-text/60 hidden sm:table-cell">
                    {isMonthly ? 'Monthly' : 'One-time'}
                  </td>
                  <td className="px-5 py-3.5 text-text/80 font-mono">{currentDisplay(key)}</td>
                  <td className="px-5 py-3.5">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={editValues[key]}
                      onChange={(e) =>
                        setEditValues((prev) => ({ ...prev, [key]: e.target.value }))
                      }
                      className="w-32 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent font-mono"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Status message */}
      {status && (
        <p
          className={`mt-3 text-sm font-medium ${
            status.ok ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {status.ok ? '✓' : '✗'} {status.msg}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-5">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent/90 disabled:opacity-60 transition"
        >
          <Save size={16} />
          {saving ? 'Saving…' : `Save ${country} Pricing`}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-text/70 text-sm font-medium rounded-lg hover:bg-gray-50 disabled:opacity-60 transition"
        >
          <RotateCcw size={16} />
          Reset to defaults
        </button>
      </div>
    </div>
  );
}
