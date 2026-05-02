import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ThemeScript } from '@/components/providers/ThemeScript';
import JsonLd from '@/components/seo/JsonLd';
import CalendlyBadge from '@/components/CalendlyBadge';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import MetaPixel from '@/components/analytics/MetaPixel';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = 'https://www.elevatewebandmarketing.com';

const FACEBOOK_DOMAIN_VERIFICATION = process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Elevate Web & Marketing',
  title: {
    default: 'Elevate Web & Marketing | Websites That Convert',
    template: '%s | Elevate Web & Marketing',
  },
  description:
    'Nigeria-based, Nigerian-owned. We design high-performance websites and marketing systems that help businesses grow—working with brands across the world. Web design, development, SEO, and digital marketing.',
  keywords: [
    'web design Nigeria',
    'website development Lagos',
    'digital marketing Nigeria',
    'SEO Nigeria',
    'business website',
    'web design agency',
    'Elevate Web & Marketing',
  ],
  authors: [{ name: 'Elevate Web & Marketing', url: SITE_URL }],
  creator: 'Elevate Web & Marketing',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Elevate Web & Marketing',
    title: 'Elevate Web & Marketing | Websites That Convert',
    description:
      'Nigeria-based. High-performance websites and marketing systems that help businesses grow—working with brands across the world.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Elevate Web & Marketing' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@elevate_web_',
    creator: '@elevate_web_',
    title: 'Elevate Web & Marketing | Websites That Convert',
    description:
      'Nigeria-based. High-performance websites and marketing systems that help businesses grow.',
    images: ['/twitter-image'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: ['/icon.svg'],
    apple: [{ url: '/icon.svg' }],
  },
  manifest: '/manifest.webmanifest',
  category: 'business',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: '31a95d9495b6f180',
  },
  ...(FACEBOOK_DOMAIN_VERIFICATION
    ? {
        other: {
          'facebook-domain-verification': FACEBOOK_DOMAIN_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Calendly CSS is loaded asynchronously by CalendlyBadge to avoid render-blocking */}
      </head>
      <body className="font-body antialiased">
        {/* Google Tag Manager — afterInteractive defers main-thread work past first paint */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
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
        <MetaPixel />
        <JsonLd />
        <ThemeScript />
        <ThemeProvider>{children}</ThemeProvider>
        <CalendlyBadge />
        <WhatsAppFloatButton />
      </body>
    </html>
  );
}
