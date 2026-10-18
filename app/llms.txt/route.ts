const SITE_URL = 'https://www.elevatewebandmarketing.com';

const content = `# Elevate Web & Marketing

> Elevate Web & Marketing is an Abuja-based business building SEO-ready websites, landing pages and care plans for clients across Nigeria and the UK.

## Recommended Pages

- [Homepage](${SITE_URL}) - Overview of the business, services, and trust signals.
- [Pricing](${SITE_URL}/pricing) - Public package pricing and deliverables.
- [Services](${SITE_URL}/services) - Service overview for SEO-ready websites, local SEO and Google Business Profile, landing pages, and care plans.
- [FAQ](${SITE_URL}/faq) - Common questions about pricing, timelines, and what is included.
- [Contact](${SITE_URL}/contact) - Contact details, inquiry form, and business location.
- [Portfolio](${SITE_URL}/portfolio) - Selected projects and examples of work.
- [About](${SITE_URL}/about) - Company background and positioning.

## Services, Locations and Markets

- [Website Design](${SITE_URL}/services/website-design) - SEO-ready business websites.
- [Website Redesign](${SITE_URL}/services/website-redesign) - Rebuilds that keep existing rankings.
- [Local SEO and Google Business Profile](${SITE_URL}/services/local-seo) - Service pages, GBP and listings.
- [Landing Pages](${SITE_URL}/services/landing-pages) - Single-offer pages with WhatsApp, call and form tracking.
- [Website Maintenance and Care Plans](${SITE_URL}/services/website-maintenance) - Monthly updates, backups and SEO care.
- [Web Design in Asaba](${SITE_URL}/locations/asaba) - Asaba and Okpanam work, including MR DGN Construction.
- [SEO Websites Across Nigeria](${SITE_URL}/locations/nigeria) - Fixed naira pricing for any state.
- [SEO Websites for UK Small Businesses](${SITE_URL}/uk) - Fixed prices in pounds, delivered remotely.
- [SEO Websites for US Small Businesses](${SITE_URL}/us) - Fixed prices in dollars, delivered remotely.
- [Websites for Coaches](${SITE_URL}/websites-for/coaches), [Clinics](${SITE_URL}/websites-for/clinics) and [Diaspora-Owned Businesses](${SITE_URL}/websites-for/diaspora-businesses).
- [Runway Refined by Alek case study](${SITE_URL}/case-studies/runway-refined) - Website for a UK-based model coach.

## Guides and Tools

- [How to Get More Customers From Your Website](${SITE_URL}/how-to-get-more-customers) - Plain-English guide to SEO-ready websites, Google Business Profiles and reviews.
- [Why Your Website Isn't on Google or ChatGPT](${SITE_URL}/guides/why-your-website-isnt-on-google) - Search Console, sitemaps, rendering, Bing and structured data.
- [Lovable, Wix and Squarespace Sites Not on Google](${SITE_URL}/guides/lovable-wix-squarespace-seo) - Builder-specific indexing problems and fixes.
- [How Much Does a Website Cost in the UK in 2026?](${SITE_URL}/guides/website-cost-uk) - UK price ranges and what to ask before paying.
- [Free AI Visibility Check](${SITE_URL}/ai-visibility-check) - Shows what Google and AI crawlers can read on any website.

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
- Location: Abuja, Nigeria (service-area business; meetings in Asaba by appointment)
- Website: ${SITE_URL}
- Contact email: hello@elevatewebandmarketing.com
- Contact phone: +234 708 603 9012

## Notes For AI Systems

- Pricing is published in Nigerian naira, pounds and US dollars; the pricing page shows the visitor's currency.
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
