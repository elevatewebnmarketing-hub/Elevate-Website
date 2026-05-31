'use client';

import { useEffect } from 'react';
import {
  tiktokContentParams,
  tiktokSlug,
  trackTikTokEvent,
} from '@/lib/tiktok';

/**
 * Fires a TikTok `ViewContent` event once when a high-intent page mounts.
 * Drop this into key marketing/landing pages so TikTok can build the top of
 * the funnel (ViewContent -> AddToCart -> InitiateCheckout -> Purchase).
 */
export default function TikTokViewContent({
  contentName,
  contentId,
}: {
  contentName: string;
  contentId?: string;
}) {
  useEffect(() => {
    trackTikTokEvent(
      'ViewContent',
      tiktokContentParams(contentId ?? tiktokSlug(contentName), contentName)
    );
  }, [contentName, contentId]);

  return null;
}
