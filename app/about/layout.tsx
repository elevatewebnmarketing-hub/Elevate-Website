import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Elevate Web & Marketing—a Nigeria-based studio building high-performance websites and digital marketing for businesses worldwide. Founded 2023, CAC registered.',
  openGraph: {
    title: 'About Elevate Web & Marketing | Nigeria Web Design Agency',
    description:
      'Nigeria-based web & marketing studio. We design and develop modern websites, run effective marketing campaigns, and support businesses globally.',
    url: '/about',
  },
  alternates: { canonical: '/about' },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
