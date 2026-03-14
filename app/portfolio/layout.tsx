import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'View our web design and development projects. Elevate Web & Marketing has built sites for MR DGN Group, MansaLuxeRealty, Experience BSG, TMM Scholars, and more.',
  openGraph: {
    title: 'Our Work | Elevate Web & Marketing Portfolio',
    description: 'Web design and development projects for Nigerian and global businesses.',
    url: '/portfolio',
  },
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
