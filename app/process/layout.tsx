import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Process',
  description:
    'How we work: discovery, design, build, and launch. A clear process for web design and marketing projects with fixed timelines.',
  openGraph: {
    title: 'Our Process | Elevate Web & Marketing',
    description: 'Discovery to launch. See how we deliver websites and marketing projects.',
    url: '/process',
  },
  alternates: { canonical: '/process' },
};

export default function ProcessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
