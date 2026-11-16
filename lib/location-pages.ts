import type { ServicePageConfig } from '@/lib/services-content';
import { abujaLocationPages } from '@/lib/location-pages-abuja';

/**
 * Location pages passed through the rank-ready-website location decision tree (see seo/decisions.md).
 * Abuja, its districts and Lagos live in location-pages-abuja.ts (added 9 Nov 2026 at Ufuoma's request; Lagos is
 * written honestly as remote work: one Lagos client, SOCASEMP, and no Lagos SEO case study yet). Port Harcourt waits for real work there.
 */
export const locationPages: Record<string, ServicePageConfig> = {
  asaba: {
    slug: 'asaba',
    type: 'service',
    title: 'Web Design & SEO in Asaba',
    subtitle: 'Where much of our work started: Asaba, Okpanam and Delta State',
    description:
      'Website design and local SEO for businesses in Asaba and Okpanam, from the team behind the MR DGN Construction and MansaLuxe Realty websites.',
    detail: {
      metaTitle: 'Web Design & SEO in Asaba',
      metaDescription:
        'Web design and local SEO in Asaba and Okpanam from the team behind MR DGN Construction’s site, found by buyers on ChatGPT. From ₦250,000.',
      h1: 'Web design and SEO in Asaba',
      updated: '2026-11-09',
      keyTakeaways: [
        'Our office address is in Asaba, by Okpanam City Gate, and most of our client work so far is for Asaba businesses.',
        'ChatGPT listed MR DGN Construction, our client, first when asked where to buy cement blocks in Asaba with delivery (our test, 6 November 2026).',
        'Asaba search results are thin: on 9 November 2026, page 1 for “web design in Asaba” was mostly a listicle, course pages and blog posts.',
        'A business that does the basics properly can show up here faster than in Abuja or Lagos.',
      ],
      intro: [
        'Much of our work so far has been in Asaba and Okpanam. We build and optimise the websites for MR DGN Group, MR DGN Construction & Developers and MansaLuxe Realty, all based in Asaba.',
        'Our office address is MR DGN’s office: Jossie Excel School, after Okpanam City Gate by the Express, Asaba. You can meet us there by appointment; most projects run over WhatsApp and video calls.',
      ],
      problems: [
        'You run a business in Asaba, Okpanam or Ibusa and want customers to find you when they search Google or ask ChatGPT.',
        'Your competitors are on Google Maps and you’re not, even though you’ve been in business longer.',
        'Customers in Abuja, Lagos or abroad check you online before they send money for a project in Asaba.',
      ],
      included: [
        {
          title: 'A website built around how Asaba customers search',
          detail: 'One page per service, using the place names customers really use, such as Asaba, Okpanam and Ibusa, and only where you actually work.',
        },
        {
          title: 'Google Business Profile at your Asaba premises',
          detail: 'Categories, products, photos and a pin and address that match your signage, plus help with video verification.',
        },
        {
          title: 'Listings, reviews and AI visibility',
          detail: 'Nigerian and global listings, a review request system, and checks on what ChatGPT says when people ask about your trade in Asaba.',
        },
      ],
      process: [
        {
          title: 'Free check',
          detail: 'Send your business name on WhatsApp. We show you what Google and ChatGPT see today.',
        },
        {
          title: 'Build',
          detail: 'Starter sites usually launch in 7 to 10 business days, Business sites in 2 to 4 weeks.',
        },
        {
          title: 'Keep improving (optional)',
          detail: 'The Local SEO Plan keeps your Google, Bing, Apple and Facebook profiles active and in step, helps you answer reviews and reports your map positions.',
        },
      ],
      pricing: {
        summary: 'The same fixed naira prices as everywhere in Nigeria.',
        points: ['Starter Website: ₦250,000', 'Business Website: ₦450,000', 'Local SEO: ₦70,000 setup, then ₦30,000 per month'],
      },
      proof: [
        {
          name: 'MR DGN Construction & Developers, Okpanam',
          url: 'https://construction.mrdgngroup.com',
          detail:
            'A building materials supplier selling cement, blocks and sand. In September 2026 a buyer found the company through ChatGPT and enquired about concrete blocks. Asking ChatGPT “I want to buy concrete blocks for my project in Asaba” listed MR DGN first on 29 September 2026, and it was still listed on 17 October 2026. On 6 November 2026 it was the first answer to “Where can I buy cement blocks in Asaba with delivery?”',
        },
        {
          name: 'MansaLuxe Realty',
          url: 'https://mansaluxerealty.mrdgngroup.com',
          detail: 'A real estate website for land and homes in Asaba and Abuja, with listings and buyer enquiry paths.',
        },
        {
          name: 'MR DGN Group',
          url: 'https://www.mrdgngroup.com',
          detail: 'The group site, rebuilt from a JavaScript-only app with 0 readable words into pages search engines can fully read.',
        },
      ],
      localHeading: 'Getting found in Asaba',
      localContext: [
        'Asaba is far less crowded online than Abuja or Lagos. For searches like “cement blocks in Asaba”, several of the top map results have only a handful of reviews and no website at all, so a business that does the basics properly can move up quickly.',
        'Many Asaba projects are paid for by people who don’t live there: Nigerians in Abuja and Lagos, and families abroad building at home. They can’t visit your yard or office first, so they judge you on your website, your Google reviews and what ChatGPT says about you.',
        'Customers here describe places by local landmarks and areas, such as Okpanam, Ibusa, the Express or City Gate. We use those names on your site where they’re true for you.',
      ],
      whyUs: [
        'Real results in Asaba: a building materials client that buyers found through ChatGPT.',
        'We know how people here search, from building and optimising sites in the area.',
        'Fixed naira prices and WhatsApp-first communication.',
      ],
      faqs: [
        {
          q: 'Do you have an office in Asaba?',
          a: 'Yes. Our office address is MR DGN’s office: Jossie Excel School, after Okpanam City Gate by the Express. Meetings there are by appointment, and most projects run over WhatsApp and video calls.',
        },
        {
          q: 'Can my Asaba business show up in ChatGPT?',
          a: 'Yes, if your website and listings give it clear facts to read. MR DGN Construction, a building materials supplier we work with, is suggested by ChatGPT for concrete blocks in Asaba, and the owner has received enquiries that way.',
        },
        {
          q: 'How much does a website cost in Asaba?',
          a: 'The same as anywhere in Nigeria with us: ₦250,000 for a Starter Website and ₦450,000 for a Business Website, both including Google Business Profile setup.',
        },
        {
          q: 'I live abroad and I’m building in Asaba. Can you help my business there?',
          a: 'Yes. Everything runs remotely, so you can manage the project from wherever you are while local customers in Asaba find your business.',
        },
      ],
      nearby: [
        { label: 'Okpanam', href: '/locations/okpanam' },
        { label: 'Abuja', href: '/locations/abuja' },
        { label: 'All of Nigeria', href: '/locations/nigeria' },
      ],
      related: ['local-seo', 'website-design', 'website-redesign', 'website-maintenance'],
    },
  },

  nigeria: {
    slug: 'nigeria',
    type: 'service',
    title: 'SEO Company & Web Design in Nigeria',
    subtitle: 'For businesses in every state, delivered remotely',
    description:
      'SEO and web design for businesses anywhere in Nigeria: websites Google and ChatGPT can read, a Google Business Profile to match, and fixed naira prices from ₦250,000.',
    detail: {
      metaTitle: 'SEO Company & Web Design in Nigeria',
      // Title and description from the ChatSEO article (sized to Google's ~580px title limit).
      titleAbsolute: 'SEO Company in Nigeria | Web Design & Local SEO - Elevate',
      metaDescription:
        'SEO company in Nigeria with fixed naira prices: websites from ₦250,000, Google Business Profile setup and local SEO that took a client 46 to 843.',
      h1: 'SEO company and web design for businesses in Nigeria',
      updated: '2026-11-16',
      intro: [
        'Elevate is an SEO company in Nigeria and a web design company in Nigeria, working remotely for businesses in every state. Search for “SEO company Nigeria” and you mostly get directories and one “Coming Soon” page: not one of them says what you get or what it costs. We do. A website Google and ChatGPT can read, a Google Business Profile to match it, and fixed naira prices from ₦250,000, with a reply within 48 hours.',
        'Next step: message us on WhatsApp or [request a quote](/get-quote), and we’ll tell you what to fix first.',
      ],
      keyTakeaways: [
        'One team does SEO and web design for businesses anywhere in Nigeria, remotely.',
        'You get a server-rendered website, a page per service with your city in the title, and a Google Business Profile that matches it.',
        'Fixed naira prices, the same in every state: websites from ₦250,000, Local SEO ₦70,000 setup then ₦30,000 a month.',
        'Proof: a real estate client’s Google impressions grew from 46 a month to 843 a month in six months (chart below).',
      ],
      headings: {
        included: 'What you get: SEO and web design for Nigerian businesses',
        process: 'How it works and what it costs',
        pricing: '',
        proof: 'Proof: 50+ websites and a client from 46 to 843 Google impressions',
        whyUs: 'Why Nigerian businesses pick Elevate',
      },
      intros: {
        included: [
          'One team does both halves, because they only work together. Our SEO services in Nigeria and our web design in Nigeria are a single job: the site gives search engines something to read, and the profile gives them a business to trust. Treat us as your SEO company in Nigeria and your web team at the same time.',
        ],
        process: ['Three steps, and the price is settled before we start.'],
        proof: [
          'We have built more than 50 websites since 2023. Named clients include MR DGN Group and MR DGN Construction in Asaba, MansaLuxe Realty in Asaba and Abuja, and SOCASEMP, the Lagos non-profit whose donation platform we built.',
          'The clearest result is search, not design. One real estate client went from 46 Google impressions a month in May 2026 to 843 in October 2026, with 363 AI Overview appearances over the same six months.',
        ],
        faqs: ['Short, direct answers to the questions Nigerian owners ask most about SEO in Nigeria.'],
      },
      outros: {
        included: [
          'It fits you if you paid for a website that brings no enquiries, if you don’t appear when someone searches what you sell in your city, or if you’re outside Lagos and Abuja, where the competition is still thin. The build side lives on our [website design](/services/website-design) page.',
        ],
        pricing: [
          'No hourly billing and no surprise line items. For what each package includes, read [what a website costs in Nigeria in 2026](/blog/website-cost-in-nigeria-2026).',
        ],
        proof: [
          'Why it moved: Google’s local results rest on relevance, distance and prominence. You cannot move closer to every customer, so the work goes into the other two. We rebuilt the site so crawlers could read every page, gave each area and listing its own page, added buyer guides, and matched the Google Business Profile to the site. If you are judging the best SEO company in Nigeria on what it has actually moved, compare it against those numbers.',
        ],
        whyUs: [
          'We are based in Abuja and Asaba and work across Nigeria, including [Abuja](/locations/abuja), [Asaba](/locations/asaba), Okpanam and [Lagos](/locations/lagos), and we take on businesses in any other state, Port Harcourt included. Most of it happens remotely. If you want the profile side explained first, read our guide to [Google Business Profile setup in Nigeria](/guides/google-business-profile-setup-nigeria).',
        ],
      },
      problems: [],
      included: [
        {
          title: 'Server-rendered website',
          detail: 'Every word of text reaches Google, Bing and AI crawlers, instead of an empty page that needs JavaScript to appear.',
        },
        {
          title: 'A page per service, your city in the title',
          detail: 'Each offer gets its own page, matched word-for-word to your Google Business Profile.',
        },
        {
          title: 'Google Business Profile setup or cleanup',
          detail: 'Including video verification, the usual method for Nigerian profiles.',
        },
        {
          title: 'Listings that agree with each other',
          detail: 'VConnect, BusinessList.com.ng, Finelib and ConnectNigeria, plus Bing Places, Apple Business and Foursquare.',
        },
      ],
      compare: {
        heading: '',
        head: ['What Google and AI search need', 'What you get'],
        rows: [
          ['Text a crawler can read without JavaScript', 'Server-rendered pages, every word in the HTML'],
          ['One page per service and city', 'A service page per offer, your city in the title'],
          ['Details that match your profile', 'Same name, phone and address on site, Google and directories'],
        ],
      },
      process: [
        {
          title: 'Chat on WhatsApp',
          detail: 'Tell us your business, your city and your services. We check your current site or Google profile for free and say what is holding you back.',
        },
        {
          title: 'Intake form and page plan',
          detail: 'You send services, prices and photos; we send the page plan and a fixed quote.',
        },
        {
          title: 'Design, build and launch',
          detail: 'You approve the design on a preview link, then we build, launch, and submit your sitemap to Google and Bing.',
        },
      ],
      pricing: {
        summary: 'Prices are fixed in naira and identical in every state.',
        points: [],
        table: {
          head: ['What', 'Price'],
          rows: [
            ['Starter Website', '₦250,000'],
            ['Business Website', '₦450,000'],
            ['E-commerce Website', '₦600,000'],
            ['Website Care Plan', '₦30,000 per month'],
            ['Local SEO Plan', '₦70,000 setup, then ₦30,000 per month'],
            ['Google Ads or Facebook & Instagram Ads management', '₦100,000 per month per platform, plus your ad spend'],
          ],
        },
        figure: {
          src: '/images/locations/nigeria-how-it-works-and-prices.webp',
          alt: 'Infographic showing the three-step process and the fixed naira price list for SEO and web design in Nigeria',
          width: 1536,
          height: 1024,
        },
      },
      proof: [
        {
          name: 'MR DGN Group and MR DGN Construction, Asaba',
          url: 'https://www.mrdgngroup.com',
          detail: 'Group and building materials sites rebuilt so search engines can read every page. When we first checked the MR DGN Group site, crawlers received 0 readable words.',
        },
        {
          name: 'MansaLuxe Realty, Asaba and Abuja',
          url: 'https://mansaluxerealty.mrdgngroup.com',
          detail: 'A property website serving buyers in two cities.',
        },
        {
          name: 'SOCASEMP Donation Platform, Lagos',
          url: 'https://donate.socasemp.org',
          detail: 'A donation app for a Lagos-based non-profit, with supporter accounts, an admin area and an ambassador programme.',
        },
      ],
      localContext: [],
      whyUs: [
        'One published naira price list for every state, not a private quote.',
        'Every site passes our own crawler check before launch: if Google can’t read it, it doesn’t ship.',
        'Google Business Profile and website done together, with matching wording.',
        'Remote delivery over WhatsApp, so your city is not a barrier.',
        'You deal with the founder, Ufuoma Onakpoyan, not a rotating account manager.',
      ],
      faqs: [
        {
          q: 'Can you build a website for my business if I’m not in Asaba or Abuja?',
          a: 'Yes. We work remotely with businesses anywhere in Nigeria. Your Google Business Profile and website will use your own city and address, which is what Google uses for local results.',
        },
        {
          q: 'How do I pay for a website from another state?',
          a: 'By bank transfer to our official business account, in two parts: a deposit before work starts and the balance at launch. Deposits are non-refundable once work has started, as set out in our service agreement. The same terms apply whether you hire us as an SEO agency in Nigeria, a web design company in Nigeria, or both.',
        },
        {
          q: 'Do you build websites for businesses in Lagos and Port Harcourt?',
          a: 'Yes, remotely, with the same packages and prices. Our Lagos page explains how we approach Lagos searches, and we will add Port Harcourt examples once we complete projects there. If you only need the search side, our SEO services in Nigeria cover Google Business Profile, local listings and on-page work on your existing site.',
        },
        {
          q: 'What makes a website “SEO-ready”?',
          a: 'Search engines and AI tools can read every page without JavaScript, each service has its own page with your city in the title, your business details match your Google profile, and the site loads quickly on a phone. It is the same checklist whether you hire an SEO consultant in Nigeria or a full SEO company in Nigeria.',
        },
      ],
      evidenceIds: ['real-estate-abuja-asaba'],
      cta: {
        heading: 'Talk to us about SEO in Nigeria',
        text: 'Tell us your city and what you sell, and we will tell you what to fix first. It’s free. Request a quote and we will reply within 48 hours.',
      },
      nearby: [
        { label: 'Abuja', href: '/locations/abuja' },
        { label: 'Asaba', href: '/locations/asaba' },
        { label: 'Lagos', href: '/locations/lagos' },
      ],
      related: ['website-design', 'local-seo', 'google-ads', 'landing-pages', 'website-maintenance'],
    },
  },
};

Object.assign(locationPages, abujaLocationPages);

export const locationSlugs = Object.keys(locationPages);
