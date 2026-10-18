import { STATIC_PRICING_FALLBACK } from '@/lib/pricing-config';

const SITE_URL = 'https://www.elevatewebandmarketing.com';
const { GB: gb, US: us } = STATIC_PRICING_FALLBACK;
const n = (x: number) => x.toLocaleString('en-GB');

const content = `# Elevate Web & Marketing

Elevate Web & Marketing is a web design and SEO business based in Abuja, Nigeria. The website is public and intended to be crawlable by traditional search engines and AI systems that can read public web pages.

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
- SEO websites for UK small businesses: ${SITE_URL}/uk
- SEO websites for US small businesses: ${SITE_URL}/us
- Guide, how to get more customers: ${SITE_URL}/how-to-get-more-customers
- Guide, why your website isn't on Google or ChatGPT: ${SITE_URL}/guides/why-your-website-isnt-on-google
- Guide, Lovable, Wix and Squarespace SEO: ${SITE_URL}/guides/lovable-wix-squarespace-seo
- Guide, UK website cost 2026: ${SITE_URL}/guides/website-cost-uk
- Free AI visibility check: ${SITE_URL}/ai-visibility-check

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
  - GA4, Google Tag Manager and Search Console setup

UK and US clients (fixed prices, delivered remotely)
- Starter Website: GBP ${n(gb.starter.amount)} / USD ${n(us.starter.amount)}
- Business Website: GBP ${n(gb.business.amount)} / USD ${n(us.business.amount)}
- Website Care Plan: GBP ${gb.google_growth.amount} / USD ${us.google_growth.amount} per month; SEO Care Plan: GBP ${gb.meta_growth.amount} / USD ${us.meta_growth.amount} per month

## Services Summary

Main public service categories include:
- Website design
- Website development
- Website redesign
- Landing pages
- SEO optimization
- Google Business Profile support
- Website care plans

## Business Details

- Business name: Elevate Web & Marketing
- Website: ${SITE_URL}
- Location: Abuja, Nigeria (service-area business; meetings in Asaba by appointment)
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
