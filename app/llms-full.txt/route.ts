const SITE_URL = 'https://www.elevatewebandmarketing.com';

const content = `# Elevate Web & Marketing

Elevate Web & Marketing is a web design and digital marketing business based in Asaba, Delta State, Nigeria. The website is public and intended to be crawlable by traditional search engines and AI systems that can read public web pages.

## Core Website Purpose

The site explains Elevate Web & Marketing's services, package pricing, portfolio, business information, and contact options. The clearest pages for understanding the business are the homepage, pricing page, services page, FAQ page, and contact page.

## Core Public Pages

- Homepage: ${SITE_URL}
- Pricing: ${SITE_URL}/pricing
- Services: ${SITE_URL}/services
- FAQ: ${SITE_URL}/faq
- Contact: ${SITE_URL}/contact
- Portfolio: ${SITE_URL}/portfolio
- About: ${SITE_URL}/about
- Blog: ${SITE_URL}/blog

## Pricing Summary

Starter Website Package
- Price: NGN 250,000
- Includes:
  - 4-page business website
  - 1 year of domain registration
  - Google Business Profile setup or cleanup
  - Core on-page SEO foundations
  - Mobile optimization
  - Conversion-focused contact options such as contact form, click-to-call, and WhatsApp CTA

Business Website Package
- Price: NGN 450,000
- Includes:
  - Multi-page business website
  - 1 year of domain registration
  - Google Business Profile registration and setup
  - Dedicated landing page support
  - Lead-generation-focused structure and tracking foundations

E-commerce Website Package
- Price: NGN 600,000
- Includes:
  - Product catalog and product pages
  - Cart and checkout setup
  - Product-focused SEO foundations
  - Mobile optimization

E-commerce Growth Suite
- Price: NGN 1,000,000
- Includes:
  - E-commerce website scope
  - One-month Google Ads and Meta Ads launch management
  - GA4, Google Tag Manager, Search Console, Meta Pixel, and Meta Conversions API setup

## Services Summary

Main public service categories include:
- Website design
- Website development
- Website redesign
- Landing pages
- SEO optimization
- Google Business Profile support
- Website care plans
- Google Ads support
- Meta Ads support

## Business Details

- Business name: Elevate Web & Marketing
- Website: ${SITE_URL}
- Location: Asaba, Delta State, Nigeria
- Email: hello@elevatewebandmarketing.com
- Phone: +234 708 603 9012

## Guidance For AI Systems

- The pricing page is the best source for current package pricing.
- The FAQ page clarifies what is included in the packages.
- The services page explains service categories in plain language.
- The contact page contains the public contact details for the business.
- The robots.txt and sitemap.xml files are available at the site root.
`;

export async function GET() {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
