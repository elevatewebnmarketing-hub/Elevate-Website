'use client';

import { useEffect } from 'react';
import { trackMetaEvent } from '@/app/google-business-profile-website-offer/tracking';

export default function LandingPageViewTracker() {
  useEffect(() => {
    trackMetaEvent('LandingPageView', {
      landing_page: 'google-business-profile-website-offer',
    });
  }, []);

  return null;
}
