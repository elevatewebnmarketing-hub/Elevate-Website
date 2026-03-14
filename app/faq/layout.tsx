import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about web design, pricing, timelines, and digital marketing in Nigeria. Elevate Web & Marketing answers your questions.',
  openGraph: {
    title: 'FAQ | Elevate Web & Marketing',
    description: 'Common questions about web design, pricing, and marketing services in Nigeria.',
    url: '/faq',
  },
  alternates: { canonical: '/faq' },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
