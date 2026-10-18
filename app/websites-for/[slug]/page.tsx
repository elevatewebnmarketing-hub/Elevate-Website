import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ServiceDetailPage from '@/components/sections/ServiceDetailPage';
import { nichePages, nicheSlugs } from '@/lib/niche-pages';
import { ORGANIZATION_ID } from '@/components/seo/JsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return nicheSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const detail = nichePages[slug]?.detail;
  if (!detail) return {};
  const fullTitle = `${detail.metaTitle} | Elevate Web & Marketing`;
  return {
    title: { absolute: fullTitle },
    description: detail.metaDescription,
    alternates: { canonical: `/websites-for/${slug}` },
    openGraph: { title: fullTitle, description: detail.metaDescription, url: `/websites-for/${slug}`, images: ['/opengraph-image'] },
    twitter: { title: fullTitle, description: detail.metaDescription },
  };
}

export default async function NichePage({ params }: Props) {
  const { slug } = await params;
  const config = nichePages[slug];
  if (!config?.detail) notFound();
  const { detail } = config;
  const url = `${SITE_URL}/websites-for/${slug}`;
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: detail.h1,
      serviceType: config.title,
      description: detail.metaDescription,
      url,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: [
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'Nigeria' },
      ],
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
      mainEntity: detail.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <ServiceDetailPage config={config} detail={detail} parent={null} />
    </>
  );
}
