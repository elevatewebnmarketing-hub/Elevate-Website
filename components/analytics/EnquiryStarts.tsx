'use client';

import { useEffect } from 'react';
import { trackEnquiryStart } from '@/lib/enquiry-start';
import { trackSearchEnquiry } from '@/lib/search-measurement';

export default function EnquiryStarts() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href);
      if (url.protocol === 'https:' && (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com')) {
        trackSearchEnquiry('enquiry_click', 'whatsapp');
        trackEnquiryStart('whatsapp');
      } else if (url.protocol === 'tel:') {
        trackSearchEnquiry('enquiry_click', 'phone');
      } else if (url.origin === 'https://calendly.com' && url.pathname.startsWith('/elevatewebnmarketing/')) {
        trackSearchEnquiry('enquiry_click', 'booking');
        trackEnquiryStart('booking');
      }
    }
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);
  return null;
}
