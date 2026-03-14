import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ServiceSlugPage from './ServiceSlugPage';
import { getServiceBySlug, serviceSlugs } from '@/lib/services-content';

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
  return <ServiceSlugPage config={config} />;
}
