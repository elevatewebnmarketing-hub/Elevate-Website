import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Elevate Web & Marketing. Book a call, send an enquiry, or reach us via WhatsApp. Nigeria-based web design and marketing agency.',
  openGraph: {
    title: 'Contact Us | Elevate Web & Marketing',
    description: 'Reach out for web design, SEO, and marketing projects. We work with businesses in Nigeria and worldwide.',
    url: '/contact',
  },
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
