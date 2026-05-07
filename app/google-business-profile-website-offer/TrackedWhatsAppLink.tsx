'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackMetaEvent } from '@/app/google-business-profile-website-offer/tracking';

type TrackedWhatsAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventLabel: string;
  children: ReactNode;
};

export default function TrackedWhatsAppLink({
  eventLabel,
  children,
  onClick,
  ...props
}: TrackedWhatsAppLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackMetaEvent('WhatsAppClick', {
          landing_page: 'google-business-profile-website-offer',
          click_target: eventLabel,
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
