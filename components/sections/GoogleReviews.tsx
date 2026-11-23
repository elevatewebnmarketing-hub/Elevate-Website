'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Star } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
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

function ReviewCards({ reviews, duplicate = false }: { reviews: Review[]; duplicate?: boolean }) {
  return (
    <ul aria-hidden={duplicate || undefined} className="flex shrink-0 gap-4 pr-4">
      {reviews.map((review, index) => (
        <li key={index} className="flex w-[min(82vw,22rem)] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
          <div className="flex items-center gap-3">
            <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e8f0fe] font-semibold text-[#185abc]">
              {Array.from(review.author.trim())[0]?.toLocaleUpperCase()}
            </span>
            <div className="min-w-0 [overflow-wrap:anywhere]">
              {!duplicate && review.authorUrl
                ? <a href={review.authorUrl} className="font-semibold underline-offset-4 hover:underline">{review.author}</a>
                : <p className="font-semibold">{review.author}</p>}
              <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">Google Maps</p>
            </div>
          </div>
          <div className="mt-4"><Stars rating={review.rating} /></div>
          {review.text && <blockquote className="mt-3 whitespace-pre-wrap text-sm leading-relaxed [overflow-wrap:anywhere]">{review.text}</blockquote>}
        </li>
      ))}
    </ul>
  );
}

export default function GoogleReviews() {
  const data = useContext(ReviewsContext);
  const rail = useRef<HTMLDivElement>(null);
  const loop = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const canLoop = (data?.reviews.length ?? 0) > 1 && !reducedMotion;

  useEffect(() => {
    const element = rail.current;
    if (!element || !loop.current || !canLoop || paused || interacting) return;
    let frame = 0;
    let last = 0;
    let position = element.scrollLeft;
    const advance = (time: number) => {
      if (last && loop.current) {
        if (Math.abs(element.scrollLeft - position) > 1) position = element.scrollLeft;
        position = (position + Math.min(time - last, 40) * 0.025) % loop.current.offsetLeft;
        element.scrollLeft = position;
      }
      last = time;
      frame = requestAnimationFrame(advance);
    };
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) {
        last = 0;
        position = element.scrollLeft;
        frame = requestAnimationFrame(advance);
      }
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [canLoop, paused, interacting]);

  function move(direction: number) {
    setPaused(true);
    rail.current?.scrollBy({ left: direction * Math.min(368, window.innerWidth * 0.82 + 16), behavior: reducedMotion ? 'instant' : 'smooth' });
  }

  return (
    <section id="testimonials" aria-labelledby="google-reviews-heading" className="bg-background px-4 py-16 dark:bg-slate-900 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="google-reviews-heading" className="font-heading text-3xl font-bold text-primary dark:text-white sm:text-4xl">Google reviews</h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Elevate Web And Marketing · Asaba</p>
          </div>
          <GoogleRating />
        </div>
        {!!data?.reviews.length && (
          <div className="mt-6">
            {data.reviews.length > 1 &&
              <div className="mb-3 flex justify-end gap-2">
                <button type="button" onClick={() => move(-1)} aria-label="Previous reviews" className="grid size-11 place-items-center rounded-full border border-slate-300 dark:border-slate-600"><ChevronLeft size={19} aria-hidden /></button>
                {canLoop && <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume review motion' : 'Pause review motion'} className="grid size-11 place-items-center rounded-full border border-slate-300 dark:border-slate-600">{paused ? <Play size={17} aria-hidden /> : <Pause size={17} aria-hidden />}</button>}
                <button type="button" onClick={() => move(1)} aria-label="Next reviews" className="grid size-11 place-items-center rounded-full border border-slate-300 dark:border-slate-600"><ChevronRight size={19} aria-hidden /></button>
              </div>
            }
            <div ref={rail} onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
              onFocusCapture={() => setPaused(true)} onTouchStart={() => setPaused(true)}
              className="relative overflow-x-auto pb-2" aria-label="Google review carousel">
              <div className="flex w-max items-stretch">
                <ReviewCards reviews={data.reviews} />
                {canLoop && <div ref={loop} className="flex"><ReviewCards reviews={data.reviews} duplicate /></div>}
                {canLoop && data.reviews.length < 4 && <ReviewCards reviews={data.reviews} duplicate />}
              </div>
            </div>
          </div>
        )}
        <a href={mapsUrl} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">Read all reviews on Google Maps</a>
      </div>
    </section>
  );
}
