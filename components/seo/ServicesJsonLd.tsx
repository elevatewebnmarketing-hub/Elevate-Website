import { servicePages } from '@/lib/services-content';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

const services = Object.values(servicePages).map((service) => ({
  '@type': 'Service',
  name: service.title,
  description: service.description,
  url: `${SITE_URL}/services/${service.slug}`,
  serviceType: service.type === 'industry' ? 'Industry Website Service' : 'Digital Service',
  areaServed: ['Asaba', 'Delta State', 'Nigeria'],
  provider: {
    '@type': 'ProfessionalService',
    name: 'Elevate Web & Marketing',
    url: SITE_URL,
  },
}));

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Services',
  url: `${SITE_URL}/services`,
  description:
    'Website design, redesign, landing pages, local visibility support, SEO foundations, and ongoing website care for businesses in Nigeria.',
  mainEntity: services,
};

export default function ServicesJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
