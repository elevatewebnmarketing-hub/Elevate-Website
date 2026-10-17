import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ServiceSlugPage from './ServiceSlugPage';
import ServiceDetailPage from '@/components/sections/ServiceDetailPage';
import { getServiceBySlug, serviceSlugs } from '@/lib/services-content';
import { ORGANIZATION_ID } from '@/components/seo/JsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = getServiceBySlug(slug);
  if (!config) return {};
  const title = config.detail?.metaTitle ?? config.title;
  const description = config.detail?.metaDescription ?? config.description.slice(0, 160);
  // absolute: the services layout's plain title stops the root "| Elevate" template reaching here.
  const fullTitle = `${title} | Elevate Web & Marketing`;
  return {
    title: { absolute: fullTitle },
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: `/services/${slug}`,
      // A segment-level openGraph replaces the root one, so the image must be restated.
      images: ['/opengraph-image'],
    },
    twitter: { title: fullTitle, description },
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const config = getServiceBySlug(slug);
  if (!config) notFound();
  const url = `${SITE_URL}/services/${slug}`;
  const { detail } = config;

  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: detail?.h1 ?? config.title,
      serviceType: config.title,
      description: detail?.metaDescription ?? config.description,
      url,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: [
        { '@type': 'City', name: 'Abuja' },
        { '@type': 'AdministrativeArea', name: 'Federal Capital Territory' },
        { '@type': 'Country', name: 'Nigeria' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
        { '@type': 'ListItem', position: 3, name: config.title, item: url },
      ],
    },
  ];
  if (detail) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: detail.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      {detail ? <ServiceDetailPage config={config} detail={detail} /> : <ServiceSlugPage config={config} />}
    </>
  );
}
