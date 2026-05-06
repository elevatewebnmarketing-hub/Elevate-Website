'use client';

import { useEffect } from 'react';

const VIEWER_STORAGE_KEY = 'elevate-blog-viewer-id';
const VIEW_DEDUPE_MS = 12 * 60 * 60 * 1000;

function getViewerId(): string {
  const existing = window.localStorage.getItem(VIEWER_STORAGE_KEY);
  if (existing) return existing;
  const created = crypto.randomUUID();
  window.localStorage.setItem(VIEWER_STORAGE_KEY, created);
  return created;
}

export default function BlogPostViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    if (!slug) return;

    const storageKey = `elevate-blog-view:${slug}`;
    const lastTracked = window.localStorage.getItem(storageKey);
    if (lastTracked) {
      const elapsed = Date.now() - Number(lastTracked);
      if (!Number.isNaN(elapsed) && elapsed < VIEW_DEDUPE_MS) {
        return;
      }
    }

    const visitorId = getViewerId();
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch('/api/blog/views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, visitorId }),
          keepalive: true,
        });

        if (response.ok) {
          window.localStorage.setItem(storageKey, String(Date.now()));
        }
      } catch {
        // Ignore tracking failures so reading experience is unaffected.
      }
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [slug]);

  return null;
}
