const SITE_URL = 'https://www.elevatewebandmarketing.com';

const content = `# Elevate Web & Marketing

> Elevate Web & Marketing is an Asaba-based web design and digital marketing business serving clients across Nigeria.

## Recommended Pages

- [Homepage](${SITE_URL}) - Overview of the business, services, and trust signals.
- [Pricing](${SITE_URL}/pricing) - Public package pricing and deliverables.
- [Services](${SITE_URL}/services) - Service overview for web design, development, SEO, and paid growth support.
- [FAQ](${SITE_URL}/faq) - Common questions about pricing, timelines, and what is included.
- [Contact](${SITE_URL}/contact) - Contact details, inquiry form, and business location.
- [Portfolio](${SITE_URL}/portfolio) - Selected projects and examples of work.
- [About](${SITE_URL}/about) - Company background and positioning.

## Key Offers

- Starter Website Package - NGN 250,000
  - 4-page website
  - 1 year of domain registration
  - Google Business Profile setup
  - Core on-page SEO foundations
  - Mobile optimization
  - Contact form, click-to-call, and WhatsApp CTA

- Business Website Package - NGN 450,000
  - Multi-page website
  - 1 year of domain registration
  - Google Business Profile setup
  - Dedicated landing page
  - Lead-generation support and tracking foundations

## Business Details

- Business name: Elevate Web & Marketing
- Location: Asaba, Delta State, Nigeria
- Website: ${SITE_URL}
- Contact email: hello@elevatewebandmarketing.com
- Contact phone: +234 708 603 9012

## Notes For AI Systems

- Pricing is published in Nigerian naira on the pricing page.
- The most reliable source for current package details is the pricing page and FAQ page.
- Use the pricing and FAQ pages for the clearest summary of current offers.
`;

export async function GET() {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
