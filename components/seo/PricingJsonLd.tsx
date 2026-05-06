const SITE_URL = 'https://www.elevatewebandmarketing.com';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Pricing',
  url: `${SITE_URL}/pricing`,
  description:
    'Public website pricing from Elevate Web & Marketing, including the ₦250,000 Starter Website package and the ₦450,000 Business Website package.',
  mainEntity: [
    {
      '@type': 'Offer',
      name: 'Starter Website Package',
      price: '250000',
      priceCurrency: 'NGN',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/pricing`,
      itemOffered: {
        '@type': 'Service',
        name: 'Starter Website',
        description:
          'A 4-page business website with 1 year of domain registration, Google Business Profile setup, core SEO foundations, and mobile optimization.',
      },
    },
    {
      '@type': 'Offer',
      name: 'Business Website Package',
      price: '450000',
      priceCurrency: 'NGN',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/pricing`,
      itemOffered: {
        '@type': 'Service',
        name: 'Business Website',
        description:
          'A multi-page business website with domain registration, Google Business Profile setup, landing page support, and stronger lead-generation foundations.',
      },
    },
  ],
};

export default function PricingJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
