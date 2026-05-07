'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackMetaEvent } from '@/app/google-business-profile-website-offer/tracking';

type TrackedActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventLabel: string;
  children: ReactNode;
};

export default function TrackedActionLink({
  eventName,
  eventLabel,
  children,
  onClick,
  ...props
}: TrackedActionLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackMetaEvent(eventName, {
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
