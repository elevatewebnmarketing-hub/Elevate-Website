const SITE_URL = 'https://elevatewebandmarketing.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Elevate Web & Marketing',
  url: SITE_URL,
  description:
    'Nigeria-based. High-performance websites and marketing systems that help businesses grow—working with brands across the world.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressCountry: 'NG',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@elevatewebandmarketing.com',
    telephone: '+234-814-493-3788',
    contactType: 'customer service',
    areaServed: 'Worldwide',
    availableLanguage: 'English',
  },
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
