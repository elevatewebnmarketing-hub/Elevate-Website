import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ThemeScript } from '@/components/providers/ThemeScript';
import SiteExtras from '@/components/layout/SiteExtras';
import JsonLd from '@/components/seo/JsonLd';

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
    default: 'SEO Websites in Abuja & Nigeria | Elevate Web & Marketing',
    template: '%s | Elevate Web & Marketing',
  },
  description:
    'SEO-ready websites for businesses in Abuja and across Nigeria: service pages, Google Business Profile setup and care plans, built to be found on Google and ChatGPT.',
  keywords: [
    'web design Abuja',
    'SEO agency Abuja',
    'website design Nigeria',
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
    locale: 'en_NG',
    url: SITE_URL,
    siteName: 'Elevate Web & Marketing',
    title: 'SEO Websites in Abuja & Nigeria | Elevate Web & Marketing',
    description:
      'SEO-ready websites, local SEO and landing pages for businesses in Abuja and across Nigeria, built to be found on Google and ChatGPT.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Elevate Web & Marketing' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@elevate_web_',
    creator: '@elevate_web_',
    title: 'SEO Websites in Abuja & Nigeria | Elevate Web & Marketing',
    description:
      'SEO-ready websites, local SEO and landing pages for businesses in Abuja and across Nigeria, built to be found on Google and ChatGPT.',
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
        <SiteExtras />
        <JsonLd />
        <ThemeScript />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
