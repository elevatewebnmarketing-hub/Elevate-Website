const SITE_URL = 'https://www.elevatewebandmarketing.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Elevate Web & Marketing',
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  logo: `${SITE_URL}/icon.svg`,
  sameAs: [
    'https://www.facebook.com/profile.php?id=61578521342361',
    'https://www.instagram.com/elevate_web_and_marketing/',
    'https://x.com/elevate_web_',
  ],
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
    telephone: '+234-708-603-9012',
    contactType: 'customer service',
    areaServed: 'Worldwide',
    availableLanguage: 'English',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Elevate Web & Marketing',
  url: SITE_URL,
  description: 'Web design, SEO, and digital marketing services for growing businesses.',
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
