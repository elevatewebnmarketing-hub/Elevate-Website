const SITE_URL = 'https://www.elevatewebandmarketing.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Elevate Web & Marketing',
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  founder: {
    '@type': 'Person',
    name: 'Ufuoma Onakpoyan',
  },
  foundingDate: '2023',
  priceRange: '₦₦',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 6.1982,
    longitude: 6.7319,
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61578521342361',
    'https://www.instagram.com/elevate_web_and_marketing/',
    'https://x.com/elevate_web_',
  ],
  description:
    'High-performance websites and marketing systems for businesses in Asaba and across Nigeria that want clearer positioning, stronger trust, and more leads.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Asaba',
    addressRegion: 'Delta State',
    addressCountry: 'NG',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@elevatewebandmarketing.com',
    telephone: '+234-708-603-9012',
    contactType: 'customer service',
    areaServed: 'Nigeria',
    availableLanguage: 'English',
  },
  areaServed: ['Asaba', 'Delta State', 'Nigeria'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Design & Digital Marketing Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Design',
          url: `${SITE_URL}/services/website-design`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Development',
          url: `${SITE_URL}/services/website-development`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Redesign',
          url: `${SITE_URL}/services/website-redesign`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SEO Optimisation',
          url: `${SITE_URL}/services/seo`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Maintenance',
          url: `${SITE_URL}/services/website-maintenance`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Google Ads / PPC',
          url: `${SITE_URL}/services/google-ads`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Meta Ads (Facebook & Instagram)',
          url: `${SITE_URL}/meta-ads`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Construction Industry Websites',
          url: `${SITE_URL}/services/construction`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Real Estate Websites',
          url: `${SITE_URL}/services/real-estate`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'E-commerce Websites',
          url: `${SITE_URL}/services/ecommerce`,
        },
      },
    ],
  },
};

const websiteSchema = {
  '@type': 'WebSite',
  name: 'Elevate Web & Marketing',
  url: SITE_URL,
  description: 'Web design, SEO, and digital marketing services for growing businesses.',
  inLanguage: 'en',
};

const graphSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    { ...organizationSchema, '@context': undefined },
    websiteSchema,
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
    />
  );
}
