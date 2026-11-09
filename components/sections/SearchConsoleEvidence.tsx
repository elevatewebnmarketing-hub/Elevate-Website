'use client';

import { useState } from 'react';
import { evidence } from '@/lib/evidence';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthName = (ym: string) => `${MONTHS[Number(ym.slice(5, 7)) - 1]} ${ym.slice(0, 4)}`;
const BAR = '#2B7FE6'; // validated against light and dark surfaces (dataviz validator, 9 Nov 2026)

/** Monthly Google impressions for one anonymised client site, from a real Search Console export. */
export default function SearchConsoleEvidence({ id }: { id: string }) {
  const set = evidence[id];
  const [active, setActive] = useState<number | null>(null);
  if (!set) return null;

  const max = Math.max(...set.months.map((m) => m.impressions));
  const first = set.months[0];
  const last = set.months[set.months.length - 1];
  const totalAi = set.months.reduce((sum, m) => sum + m.aiOverview, 0);
  const shown = active ?? set.months.length - 1;

  return (
    <figure className="bg-white dark:bg-slate-800 rounded-card-lg border border-gray-200 dark:border-white/10 p-6">
      <figcaption className="mb-5">
        <p className="font-heading font-semibold text-lg text-primary dark:text-white">Google impressions per month</p>
        <p className="text-sm font-medium text-text/80 dark:text-gray-300">{set.label}</p>
        <p className="text-sm text-text/70 dark:text-gray-400 mt-1">{set.workNote}</p>
      </figcaption>

      <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
        <div>
          <p className="text-text/60 dark:text-gray-400">{monthName(first.month)}</p>
          <p className="font-heading font-bold text-2xl text-primary dark:text-white">{first.impressions.toLocaleString()}</p>
          <p className="text-text/60 dark:text-gray-400">impressions</p>
        </div>
        <div>
          <p className="text-text/60 dark:text-gray-400">{monthName(last.month)}</p>
          <p className="font-heading font-bold text-2xl text-primary dark:text-white">{last.impressions.toLocaleString()}</p>
          <p className="text-text/60 dark:text-gray-400">impressions</p>
        </div>
        <div>
          <p className="text-text/60 dark:text-gray-400">AI Overviews</p>
          <p className="font-heading font-bold text-2xl text-primary dark:text-white">{totalAi.toLocaleString()}</p>
          <p className="text-text/60 dark:text-gray-400">appearances, 6 months</p>
        </div>
      </div>

      <p className="text-sm text-text/80 dark:text-gray-300 mb-2 min-h-[1.25rem]" aria-live="polite">
        {monthName(set.months[shown].month)}: {set.months[shown].impressions.toLocaleString()} impressions,{' '}
        {set.months[shown].clicks} clicks, average position {set.months[shown].position}
      </p>
      <div className="flex items-end gap-[2px] h-40 border-b border-gray-200 dark:border-white/10" role="img" aria-label={`Monthly impressions from ${first.impressions} in ${monthName(first.month)} to ${last.impressions} in ${monthName(last.month)}`}>
        {set.months.map((m, i) => (
          <button
            key={m.month}
            type="button"
            className="flex-1 h-full flex items-end focus:outline-none group"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            aria-label={`${monthName(m.month)}: ${m.impressions} impressions`}
          >
            <span
              className="w-full rounded-t-[4px] transition-opacity group-focus-visible:ring-2 group-focus-visible:ring-primary"
              style={{
                height: `${Math.max(2, (m.impressions / max) * 100)}%`,
                background: BAR,
                opacity: active === null || active === i ? 1 : 0.45,
              }}
            />
          </button>
        ))}
      </div>
      <div className="flex gap-[2px] mt-1">
        {set.months.map((m) => (
          <span key={m.month} className="flex-1 text-center text-xs text-text/60 dark:text-gray-400">
            {MONTHS[Number(m.month.slice(5, 7)) - 1]}
          </span>
        ))}
      </div>

      <details className="mt-5 text-sm">
        <summary className="cursor-pointer text-accent font-medium">See the numbers</summary>
        <table className="w-full mt-3 text-left text-text/80 dark:text-gray-300">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/10">
              <th className="py-1 font-medium">Month</th>
              <th className="py-1 font-medium text-right">Impressions</th>
              <th className="py-1 font-medium text-right">Clicks</th>
              <th className="py-1 font-medium text-right">Avg. position</th>
              <th className="py-1 font-medium text-right">AI Overviews</th>
            </tr>
          </thead>
          <tbody>
            {set.months.map((m) => (
              <tr key={m.month} className="border-b border-gray-100 dark:border-white/5">
                <td className="py-1">{monthName(m.month)}</td>
                <td className="py-1 text-right">{m.impressions.toLocaleString()}</td>
                <td className="py-1 text-right">{m.clicks}</td>
                <td className="py-1 text-right">{m.position}</td>
                <td className="py-1 text-right">{m.aiOverview}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <p className="text-xs text-text/50 dark:text-gray-500 mt-4">{set.source}</p>
    </figure>
  );
}
