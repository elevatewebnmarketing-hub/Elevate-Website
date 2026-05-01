import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ServiceSlugPage from './ServiceSlugPage';
import { getServiceBySlug, serviceSlugs } from '@/lib/services-content';

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
  return {
    title: config.title,
    description: config.description.slice(0, 160),
    openGraph: {
      title: `${config.title} | Elevate Web & Marketing`,
      description: config.description.slice(0, 160),
      url: `/services/${slug}`,
    },
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const config = getServiceBySlug(slug);
  if (!config) notFound();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: config.title,
    description: config.description,
    url: `${SITE_URL}/services/${slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Elevate Web & Marketing',
      url: SITE_URL,
    },
    areaServed: ['Nigeria', 'United Kingdom', 'United States', 'Canada', 'Australia'],
    serviceType: config.type === 'industry' ? 'Industry-Specific Website' : 'Digital Marketing Service',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServiceSlugPage config={config} />
    </>
  );
}
