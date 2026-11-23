'use client';

import { useState } from 'react';
import { siteConfig } from '@/lib/site-config';

type Reviews = {
  rating: number | null;
  count: number;
  reviews: { author: string; authorUrl?: string; rating: number; text: string }[];
};

export default function GoogleReviews() {
  const [data, setData] = useState<Reviews | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  async function loadReviews() {
    setStatus('loading');
    try {
      const response = await fetch('/api/google-reviews', { method: 'POST', cache: 'no-store' });
      if (!response.ok) throw new Error('Reviews unavailable');
      setData(await response.json());
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section aria-labelledby="google-reviews-heading" className="bg-background px-4 py-12 dark:bg-slate-900 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 id="google-reviews-heading" className="font-heading text-3xl font-bold text-primary dark:text-white">Google reviews</h2>
        <p className="mt-2 text-text/80 dark:text-gray-300">See what customers say about Elevate Web And Marketing in Asaba.</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          {!data && (
            <button type="button" disabled={status === 'loading'} onClick={loadReviews}
              className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 font-semibold text-white disabled:opacity-70 dark:bg-white dark:text-primary">
              {status === 'loading' ? 'Loading reviews…' : status === 'error' ? 'Try loading reviews again' : 'Show Google reviews'}
            </button>
          )}
          <a href={siteConfig.googleMapsUrl} className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4 dark:text-white">Read all reviews on Google Maps</a>
        </div>
        {status === 'error' && <p role="status" className="mt-3 text-sm">Reviews are unavailable here right now. You can read them on Google Maps.</p>}
        {data && (
          <div className="mt-5" aria-live="polite">
            {data.rating !== null && <p className="font-semibold">{data.rating.toFixed(1)} out of 5 · {data.count} {data.count === 1 ? 'review' : 'reviews'} on Google Maps</p>}
            {data.reviews.length ? (
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {data.reviews.map((review, index) => (
                  <li key={index} className="min-w-0 rounded-xl border border-slate-300 p-5 [overflow-wrap:anywhere] dark:border-slate-600">
                    <p className="font-semibold">
                      {review.authorUrl
                        ? <a href={review.authorUrl} className="underline underline-offset-4">{review.author}</a>
                        : review.author}
                    </p>
                    <p className="mt-1 text-sm">{review.rating} out of 5 · Google Maps</p>
                    {review.text && <blockquote className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{review.text}</blockquote>}
                  </li>
                ))}
              </ul>
            ) : <p className="mt-3">There are no reviews to display here yet.</p>}
          </div>
        )}
      </div>
    </section>
  );
}
