import { NextResponse } from 'next/server';

const placeId = 'ChIJxSEs5GPtQxARnIKLX0KfU2A';
const fields = 'id,displayName,rating,userRatingCount,reviews.rating,reviews.text,reviews.authorAttribution';
const headers = { 'Cache-Control': 'private, no-store' };
let windowEnds = 0;
let requests = 0;

type Place = {
  id?: string;
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    rating: number;
    text?: { text?: string };
    authorAttribution?: { displayName?: string; uri?: string };
  }[];
};

function googleAuthorLink(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.origin === 'https://www.google.com' && url.pathname.startsWith('/maps/contrib/')) return url.href;
  } catch {}
  return undefined;
}

export async function POST(request: Request) {
  const { headers: requestHeaders } = request;
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host');
  const protocol = requestHeaders.get('x-forwarded-proto') ?? new URL(request.url).protocol.slice(0, -1);
  if (requestHeaders.get('origin') !== `${protocol}://${host}` ||
      requestHeaders.get('sec-fetch-site') !== 'same-origin') {
    return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403, headers });
  }
  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!key) return NextResponse.json({ error: 'Reviews are unavailable.' }, { status: 503, headers });

  // Bound upstream calls per warm instance. Google Cloud quota controls the project-wide limit.
  const now = Date.now();
  if (now >= windowEnds) {
    windowEnds = now + 60_000;
    requests = 0;
  }
  if (requests >= 12) {
    return NextResponse.json({ error: 'Try again shortly.' }, { status: 429, headers: { ...headers, 'Retry-After': '60' } });
  }
  requests++;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=en`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': fields },
      cache: 'no-store',
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) {
      console.warn('Google reviews upstream status:', res.status);
      return NextResponse.json({ error: 'Reviews are unavailable.' }, { status: 503, headers });
    }
    const place: Place = await res.json();
    if (place.id !== placeId ||
        !/^elevate web (and|&) marketing$/i.test(place.displayName?.text?.trim() ?? '')) {
      console.warn('Google reviews listing could not be verified');
      return NextResponse.json({ error: 'Reviews are unavailable.' }, { status: 503, headers });
    }

    const reviews = (place.reviews ?? []).slice(0, 5).flatMap(review => {
      const author = review.authorAttribution?.displayName?.trim();
      if (!author || !Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5) return [];
      return [{ author, authorUrl: googleAuthorLink(review.authorAttribution?.uri), rating: review.rating, text: review.text?.text ?? '' }];
    });
    return NextResponse.json({ rating: place.rating ?? null, count: place.userRatingCount ?? 0, reviews }, { headers });
  } catch {
    return NextResponse.json({ error: 'Reviews are unavailable.' }, { status: 503, headers });
  }
}
