import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ServiceDetailPage from '@/components/sections/ServiceDetailPage';
import { locationPages, locationSlugs } from '@/lib/location-pages';
import { ORGANIZATION_ID } from '@/components/seo/JsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';
const AREA: Record<string, object> = {
  asaba: { '@type': 'City', name: 'Asaba' },
  nigeria: { '@type': 'Country', name: 'Nigeria' },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return locationSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const detail = locationPages[slug]?.detail;
  if (!detail) return {};
  const fullTitle = `${detail.metaTitle} | Elevate Web & Marketing`;
  return {
    title: { absolute: fullTitle },
    description: detail.metaDescription,
    openGraph: {
      title: fullTitle,
      description: detail.metaDescription,
      url: `/locations/${slug}`,
      images: ['/opengraph-image'],
    },
    twitter: { title: fullTitle, description: detail.metaDescription },
    alternates: { canonical: `/locations/${slug}` },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const config = locationPages[slug];
  if (!config?.detail) notFound();
  const { detail } = config;
  const url = `${SITE_URL}/locations/${slug}`;

  // Service with areaServed only: no LocalBusiness with a local address we don't have (rank-ready Gate 3).
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: detail.h1,
      serviceType: 'Website design and local SEO',
      description: detail.metaDescription,
      url,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: AREA[slug],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: config.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: detail.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <ServiceDetailPage config={config} detail={detail} parent={null} />
    </>
  );
}
