import type { Metadata } from 'next';

const SITE_URL = 'https://elevatewebandmarketing.com';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet Ufuoma Onakpoyan—Founder and Lead Strategist at Elevate Web & Marketing. Self-taught developer, digital strategist, and UNIBEN Civil Engineering graduate.',
  openGraph: {
    title: 'Our Team | Elevate Web & Marketing',
    description: 'Meet the founder and lead strategist behind Elevate Web & Marketing.',
    url: `${SITE_URL}/team`,
  },
  alternates: { canonical: '/team' },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
