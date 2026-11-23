'use client';

import EnquiryStarts from '@/components/analytics/EnquiryStarts';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import CalendlyBadge from '@/components/CalendlyBadge';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import MetaPixel from '@/components/analytics/MetaPixel';
import { NO_TRACKING_TEST } from '@/lib/no-tracking';
import TikTokPixel from '@/components/analytics/TikTokPixel';

export default function SiteExtras() {
  const pathname = usePathname();
  if (pathname === '/invoice-generator') return null;
  return (
    <>
        {/* Google Tag Manager - afterInteractive defers main-thread work past first paint */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `if(!${NO_TRACKING_TEST})(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M5H9XHZ8');`,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M5H9XHZ8"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <EnquiryStarts />
        <MetaPixel />
        <TikTokPixel />
        <CalendlyBadge />
        <WhatsAppFloatButton />
    </>
  );
}
