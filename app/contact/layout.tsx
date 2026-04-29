import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Elevate Web & Marketing. Book a call, send an enquiry, or reach us via WhatsApp. Nigeria-based web design and marketing agency.',
  keywords: [
    'contact web design agency Nigeria',
    'hire web designer Nigeria',
    'web design Lagos contact',
    'digital marketing agency contact Nigeria',
  ],
  openGraph: {
    title: 'Contact Us | Elevate Web & Marketing',
    description: 'Reach out for web design, SEO, and marketing projects. We work with businesses in Nigeria and worldwide.',
    url: `${SITE_URL}/contact`,
  },
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Home', url: SITE_URL },
          { name: 'Contact', url: `${SITE_URL}/contact` },
        ]}
      />
      {children}
    </>
  );
}
