import type { Metadata } from 'next';
import ServiceDetailPage from '@/components/sections/ServiceDetailPage';
import { ORGANIZATION_ID } from '@/components/seo/JsonLd';
import type { ServicePageConfig } from '@/lib/services-content';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

/** Country landing pages (/uk, /us) for clients abroad. */
export function marketMetadata(config: ServicePageConfig, locale: string): Metadata {
  const detail = config.detail!;
  const fullTitle = `${detail.metaTitle} | Elevate Web & Marketing`;
  const path = `/${config.slug}`;
  return {
    title: { absolute: fullTitle },
    description: detail.metaDescription,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description: detail.metaDescription, url: path, locale, images: ['/opengraph-image'] },
    twitter: { title: fullTitle, description: detail.metaDescription },
  };
}

export default function MarketPage({ config, country }: { config: ServicePageConfig; country: string }) {
  const detail = config.detail!;
  const url = `${SITE_URL}/${config.slug}`;
  // Service with areaServed only: no LocalBusiness, because there is no address in that country.
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: detail.h1,
      serviceType: 'Website design and SEO',
      description: detail.metaDescription,
      url,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: { '@type': 'Country', name: country },
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
