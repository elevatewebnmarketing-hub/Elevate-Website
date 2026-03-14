import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ThemeScript } from '@/components/providers/ThemeScript';
import JsonLd from '@/components/seo/JsonLd';
import CalendlyBadge from '@/components/CalendlyBadge';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';

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

const SITE_URL = 'https://elevatewebandmarketing.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Elevate Web & Marketing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elevate Web & Marketing | Websites That Convert',
    description:
      'Nigeria-based. High-performance websites and marketing systems that help businesses grow.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.png',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    // Optional: add when you have them
    // google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <JsonLd />
        <ThemeScript />
        <ThemeProvider>{children}</ThemeProvider>
        <CalendlyBadge />
        <WhatsAppFloatButton />
      </body>
    </html>
  );
}
