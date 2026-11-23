'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Quote, Star } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { siteConfig } from '@/lib/site-config';

type Review = { author: string; authorUrl?: string; rating: number; text: string };
type Reviews = { rating: number | null; count: number; reviews: Review[] };
const ReviewsContext = createContext<Reviews | null | undefined>(undefined);
const mapsUrl = siteConfig.googleMapsUrl;

export function GoogleReviewsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Reviews | null>();
  const request = useRef<Promise<Reviews | null> | null>(null);
  useEffect(() => {
    let active = true;
    request.current ??= fetch('/api/google-reviews', { method: 'POST', cache: 'no-store' })
      .then(response => response.ok ? response.json() : null)
      .catch(() => null);
    void request.current.then(value => {
      if (active) setData(value);
    });
    return () => { active = false; };
  }, []);
  return <ReviewsContext.Provider value={data}>{children}</ReviewsContext.Provider>;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5 text-[#b06000] dark:text-[#fbbc04]" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="relative block">
          <Star size={17} aria-hidden />
          <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${Math.min(1, Math.max(0, rating - i)) * 100}%` }}>
            <Star size={17} className="fill-current" aria-hidden />
          </span>
        </span>
      ))}
    </span>
  );
}

export function GoogleRating() {
  const data = useContext(ReviewsContext);
  return (
    <a href={mapsUrl} className="inline-flex min-h-11 flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 hover:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
      {data?.rating != null ? (
        <>
          <strong className="tabular-nums">{data.rating.toFixed(1)}</strong>
          <Stars rating={data.rating} />
          <span>{data.count} Google {data.count === 1 ? 'review' : 'reviews'}</span>
        </>
      ) : <span>See our reviews on Google Maps</span>}
    </a>
  );
}

const reviewIntervalMs = 45_000;
const controlClass = 'grid size-11 place-items-center rounded-full border border-slate-300 bg-white text-slate-800 hover:border-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-slate-600 dark:bg-slate-800 dark:text-white';

export default function GoogleReviews() {
  const data = useContext(ReviewsContext);
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const count = data?.reviews.length ?? 0;
  const review = data?.reviews[index];
  const canRotate = count > 1 && !reducedMotion;

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canRotate || paused || hovered || !visible) return;
    const timer = window.setTimeout(() => {
      setIndex(current => (current + 1) % count);
    }, reviewIntervalMs);
    return () => window.clearTimeout(timer);
  }, [canRotate, count, index, paused, hovered, visible]);

  function move(direction: number) {
    setPaused(true);
    setIndex(current => (current + direction + count) % count);
  }

  return (
    <section ref={section} id="testimonials" aria-labelledby="google-reviews-heading" className="bg-background px-4 py-16 dark:bg-slate-900 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="google-reviews-heading" className="font-heading text-3xl font-bold text-primary dark:text-white sm:text-4xl">Google reviews</h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Elevate Web And Marketing · Asaba</p>
          </div>
          <GoogleRating />
        </div>

        {review && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            onFocusCapture={event => {
              if (event.target instanceof HTMLAnchorElement) setPaused(true);
            }}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-700 sm:px-6">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{index + 1} of {count} reviews</p>
              {count > 1 && <div className="flex gap-2" aria-label="Review controls">
                <button type="button" onClick={() => move(-1)} aria-label="Previous review" className={controlClass}><ChevronLeft size={19} aria-hidden /></button>
                {canRotate && <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume reviews' : 'Pause reviews'} className={controlClass}>{paused ? <Play size={17} aria-hidden /> : <Pause size={17} aria-hidden />}</button>}
                <button type="button" onClick={() => move(1)} aria-label="Next review" className={controlClass}><ChevronRight size={19} aria-hidden /></button>
              </div>}
            </div>
            <div aria-live={paused || !canRotate ? 'polite' : 'off'}>
              <motion.figure key={index} initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.24, ease: 'easeOut' }}
                className="grid gap-4 p-5 text-slate-900 dark:text-slate-100 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-5 sm:p-7">
                <Quote size={31} aria-hidden className="text-[#25588c] dark:text-blue-300" />
                <div className="min-w-0">
                  <Stars rating={review.rating} />
                  {review.text && <blockquote className="mt-2 max-w-[64ch] whitespace-pre-wrap text-base leading-relaxed [overflow-wrap:anywhere] sm:text-lg">{review.text}</blockquote>}
                  <figcaption className="mt-4 flex items-center gap-3">
                    <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e8f0fe] text-sm font-semibold text-[#185abc]">
                      {Array.from(review.author.trim())[0]?.toLocaleUpperCase()}
                    </span>
                    <div className="min-w-0 [overflow-wrap:anywhere]">
                      {review.authorUrl
                        ? <a href={review.authorUrl} className="font-semibold underline-offset-4 hover:underline">{review.author}</a>
                        : <p className="font-semibold">{review.author}</p>}
                      <p className="text-xs text-slate-600 dark:text-slate-300">Google Maps</p>
                    </div>
                  </figcaption>
                </div>
              </motion.figure>
            </div>
            {count > 1 && (
              <div role="group" aria-label="Choose a Google review" className="flex justify-center px-2 pb-3">
                {data.reviews.map((_, position) => (
                  <button
                    key={position}
                    type="button"
                    aria-label={`Show review ${position + 1} of ${count}`}
                    aria-current={position === index ? 'true' : undefined}
                    onClick={() => {
                      setPaused(true);
                      setIndex(position);
                    }}
                    className="grid size-11 place-items-center rounded-full hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent dark:hover:bg-slate-700"
                  >
                    <span aria-hidden className={position === index
                      ? 'size-3 rounded-full bg-primary dark:bg-white'
                      : 'size-2.5 rounded-full border border-slate-500 dark:border-slate-300'} />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        <a href={mapsUrl} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">Read all reviews on Google Maps</a>
      </div>
    </section>
  );
}
