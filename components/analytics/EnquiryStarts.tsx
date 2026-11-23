'use client';

import { useEffect } from 'react';
import { trackEnquiryStart } from '@/lib/enquiry-start';

export default function EnquiryStarts() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href);
      if (url.protocol === 'https:' && (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com')) {
        trackEnquiryStart('whatsapp');
      } else if (url.origin === 'https://calendly.com' && url.pathname.startsWith('/elevatewebnmarketing/')) {
        trackEnquiryStart('booking');
      }
    }
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);
  return null;
}
