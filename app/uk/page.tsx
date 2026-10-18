import type { Metadata } from 'next';
import ServiceDetailPage from '@/components/sections/ServiceDetailPage';
import { ukPage } from '@/lib/market-pages';
import { ORGANIZATION_ID } from '@/components/seo/JsonLd';

const SITE_URL = 'https://www.elevatewebandmarketing.com';
const detail = ukPage.detail!;
const fullTitle = `${detail.metaTitle} | Elevate Web & Marketing`;

export const metadata: Metadata = {
  title: { absolute: fullTitle },
  description: detail.metaDescription,
  alternates: { canonical: '/uk' },
  openGraph: { title: fullTitle, description: detail.metaDescription, url: '/uk', locale: 'en_GB', images: ['/opengraph-image'] },
  twitter: { title: fullTitle, description: detail.metaDescription },
};

export default function UkPage() {
  const url = `${SITE_URL}/uk`;
  // Service with areaServed only: no UK LocalBusiness, because there is no UK address.
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: detail.h1,
      serviceType: 'Website design and SEO',
      description: detail.metaDescription,
      url,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: { '@type': 'Country', name: 'United Kingdom' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: ukPage.title, item: url },
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
      <ServiceDetailPage config={ukPage} detail={detail} parent={null} />
    </>
  );
}
