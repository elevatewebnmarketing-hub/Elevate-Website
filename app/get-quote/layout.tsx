import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get a Quote',
  description:
    'Request a custom quote for web design, development, SEO, or digital marketing. Tell us about your project and we’ll get back within 24 hours.',
  openGraph: {
    title: 'Get a Quote | Elevate Web & Marketing',
    description: 'Request a quote for your web design or marketing project.',
    url: '/get-quote',
  },
  alternates: { canonical: '/get-quote' },
};

export default function GetQuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
