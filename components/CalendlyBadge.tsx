'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { trackTikTokEvent } from '@/lib/tiktok';

export default function CalendlyBadge() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);
  }, []);

  // A completed Calendly booking is the deepest conversion -> Purchase.
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (
        event.origin === 'https://calendly.com' &&
        (event.data as { event?: string })?.event === 'calendly.event_scheduled'
      ) {
        trackTikTokEvent('Purchase', {
          content_type: 'product',
          content_name: 'Discovery Call',
          currency: 'GBP',
          value: 0,
        });
      }
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="lazyOnload"
    />
  );
}
