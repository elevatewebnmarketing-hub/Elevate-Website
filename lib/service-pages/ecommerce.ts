import type { ServicePageConfig } from '@/lib/services-content';

/** E-commerce service page (restored 9 Nov 2026; Ufuoma confirmed e-commerce is a current service). */
export const ecommerce: ServicePageConfig = {
  slug: 'ecommerce',
  type: 'service',
  title: 'E-commerce Websites',
  subtitle: 'Online shops that take orders, take payment and can be found on Google',
  description:
    'E-commerce websites for Nigerian and UK businesses: product catalogue, cart, checkout and payment, order notifications, and product pages built for Google.',
  detail: {
    metaTitle: 'E-commerce Website Design in Abuja and Nigeria',
    metaDescription:
      'E-commerce websites with product pages, cart, checkout, payments and order alerts, built so Google can index every product. Fixed prices, 3 to 5 weeks.',
    h1: 'E-commerce website design',
    updated: '2026-11-09',
    keyTakeaways: [
      'An online shop with a product catalogue, cart, checkout, payment and order notifications.',
      'Every product gets its own page that Google can read and index, with a product sitemap.',
      'Typical delivery is 3 to 5 weeks, with two rounds of revisions before launch.',
      'The Growth Suite adds GA4 e-commerce tracking, Tag Manager and Search Console setup.',
    ],
    intro: [
      'If you sell products on Instagram and WhatsApp, every order costs you a conversation: price, stock, delivery, account number, proof of payment. An online shop lets customers do that themselves, at any hour, and lets Google show your products to people searching for them.',
      'We build shops with a product page for every item, a checkout that works on a phone, payment and order alerts, and the SEO groundwork done before launch.',
    ],
    problems: [
      'You sell products through Instagram or WhatsApp and spend hours answering the same questions.',
      'You have a shop on a platform that Google barely indexes, so your products never appear in search.',
      'Customers abroad want to buy from you but can’t pay easily.',
      'You want to run ads to a shop that actually converts.',
    ],
    included: [
      {
        title: 'Storefront and catalogue',
        detail: 'Product pages, categories and search, designed for phones first.',
      },
      {
        title: 'Cart, checkout and payment',
        detail: 'A payment gateway set up for your market, with order notifications to you and to the customer.',
      },
      {
        title: 'Product SEO',
        detail:
          'A readable page per product with its own title and description, product structured data that matches the page, and a product sitemap submitted to Google Search Console.',
      },
      {
        title: 'Trust and sales sections',
        detail: 'Delivery and returns information, contact options and clear calls to action on every product.',
      },
      {
        title: 'Analytics and launch support',
        detail: 'Basic analytics and lead capture, two revision rounds and help on launch day.',
      },
    ],
    process: [
      { title: 'Plan', detail: 'We list your products, categories, delivery areas and payment needs.' },
      { title: 'Build', detail: 'Usually 3 to 5 weeks, depending on how many products are ready to upload.' },
      { title: 'Launch and index', detail: 'We submit the sitemap and check that Google can index your product pages.' },
    ],
    pricing: {
      summary: 'Fixed packages. The pricing page shows them in your currency.',
      points: [
        'E-commerce Website: storefront, checkout, payments and product SEO',
        'E-commerce Growth Suite: everything above plus GA4 e-commerce tracking, Tag Manager, Search Console and a reporting dashboard',
      ],
    },
    proof: [
      {
        name: 'BSG Beelicious Signatures Global',
        url: 'https://experiencebsg.com',
        detail: 'An e-commerce and brand site for a luxury fragrance and home brand.',
      },
    ],
    localContext: [
      'Most of our clients are in Abuja and Asaba, and we build shops for businesses anywhere in Nigeria and the UK. Delivery areas, payment options and prices on the shop are set to your market.',
    ],
    whyUs: [
      'We build shops so Google can read every product page, which many page-builder shops don’t do well.',
      'Fixed prices and no long contracts. Large builds are paid 50% upfront and 50% on delivery.',
    ],
    faqs: [
      {
        q: 'How much does an e-commerce website cost in Nigeria?',
        a: 'Our E-commerce Website and Growth Suite packages have fixed prices, listed on the pricing page in your currency.',
      },
      {
        q: 'How long does it take to build an online shop?',
        a: 'Usually 3 to 5 weeks. The biggest factor is how quickly product photos, descriptions and prices are ready.',
      },
      {
        q: 'Will my products show up on Google?',
        a: 'We build each product as a page Google can read and submit them in a sitemap. Whether a product ranks depends on the search and the competition, so we can’t promise positions.',
      },
      {
        q: 'Can I update products myself?',
        a: 'Yes. You can add products, change prices and mark items out of stock. On a care plan we can do it for you.',
      },
    ],
    nearby: [
      { label: 'Abuja', href: '/locations/abuja' },
      { label: 'Katampe Extension', href: '/locations/katampe-extension' },
      { label: 'Guzape', href: '/locations/guzape' },
      { label: 'Asaba', href: '/locations/asaba' },
      { label: 'Okpanam', href: '/locations/okpanam' },
      { label: 'Lagos', href: '/locations/lagos' },
    ],
    related: ['website-design', 'landing-pages', 'local-seo', 'website-maintenance'],
  },
};
