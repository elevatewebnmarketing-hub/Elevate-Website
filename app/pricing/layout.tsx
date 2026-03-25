import type { Metadata } from 'next';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent pricing for web design and marketing services. Fixed packages and custom quotes for businesses in Nigeria and worldwide.',
  openGraph: {
    title: 'Pricing | Elevate Web & Marketing',
    description: 'Web design and marketing package pricing. Clear, fixed options.',
    url: `${SITE_URL}/pricing`,
  },
  alternates: { canonical: '/pricing' },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
