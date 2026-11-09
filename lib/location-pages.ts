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
          detail: 'The SEO Care Plan adds a page or post each month, keeps your profile active and reports your rankings.',
        },
      ],
      pricing: {
        summary: 'The same fixed naira prices as everywhere in Nigeria.',
        points: ['Starter Website: ₦250,000', 'Business Website: ₦450,000', 'SEO Care Plan: ₦80,000 per month'],
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
    subtitle: 'For businesses anywhere in Nigeria, delivered remotely',
    description:
      'SEO-ready websites, Google Business Profile optimisation, landing pages and care plans for businesses across Nigeria, delivered remotely with fixed naira prices.',
    detail: {
      metaTitle: 'SEO Company & Web Design in Nigeria',
      metaDescription:
        'SEO and web design for businesses anywhere in Nigeria: websites Google and ChatGPT can read, Google Business Profile setup, and the local SEO steps that bring calls.',
      h1: 'SEO company and web design for businesses in Nigeria',
      updated: '2026-11-09',
      keyTakeaways: [
        'We build websites and do local SEO for businesses anywhere in Nigeria, remotely, at fixed naira prices.',
        'Google ranks local businesses on relevance, distance and prominence. We work on the two you can change: relevance and prominence.',
        'That means a complete Google Business Profile, a page for each service with your city in it, the same details everywhere, and genuine reviews.',
        'Proof: a real estate client’s Google impressions grew from 46 a month to 843 a month in six months (chart below).',
      ],
      intro: [
        'Wherever your business is in Nigeria, we can build you a website that Google and AI assistants can read, with a page for each service and a Google Business Profile to match.',
        'Everything runs remotely: a short WhatsApp chat, an intake form, a design you approve, then launch. We’re based in Abuja, and our client work so far covers Abuja, Asaba, Okpanam, Lagos and the UK.',
      ],
      problems: [
        'You paid for a website, but it brings no enquiries from Google.',
        'Your business doesn’t appear when people search for what you sell in your city.',
        'You rely on Instagram and WhatsApp, and want a site you own that keeps bringing customers.',
        'You’re outside Lagos and Abuja, where online competition is often thin, and want to take advantage of that early.',
      ],
      included: [
        {
          title: 'Server-rendered website',
          detail: 'Built so the full text reaches Google, Bing and AI crawlers, not an empty page that needs JavaScript.',
        },
        {
          title: 'Service pages for your city',
          detail: 'One page per service, with your real city in the titles, matched to your Google Business Profile.',
        },
        {
          title: 'Google Business Profile setup or cleanup',
          detail: 'Including help with video verification, the usual method for Nigerian profiles.',
        },
        {
          title: 'Nigerian listings',
          detail: 'VConnect, BusinessList.com.ng, Finelib and ConnectNigeria, plus Bing Places, Apple Business and Foursquare.',
        },
      ],
      process: [
        {
          title: 'Chat on WhatsApp',
          detail: 'Tell us your business, city and services. We run a free check on your current site or profile.',
        },
        {
          title: 'Intake form and page plan',
          detail: 'You send services, prices and photos; we send the page plan.',
        },
        {
          title: 'Design, build and launch',
          detail: 'You approve the design on a preview link, then we launch and submit your site to Google and Bing.',
        },
      ],
      pricing: {
        summary: 'Fixed prices in naira, the same in every state.',
        points: [
          'Starter Website: ₦250,000',
          'Business Website: ₦450,000',
          'Website Care Plan: ₦30,000 per month; SEO Care Plan: ₦80,000 per month',
        ],
      },
      proof: [
        {
          name: 'MR DGN Group and MR DGN Construction, Asaba',
          url: 'https://www.mrdgngroup.com',
          detail: 'Group and building materials sites rebuilt so search engines can read every page.',
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
      localHeading: 'How local SEO works in Nigeria',
      localContext: [
        'Google says local results depend on three things: relevance (how well you match the search), distance (how close you are to the searcher or the place they named) and prominence (how well known you are, from reviews, links and mentions). You can’t move closer to every customer, so the work goes into the other two.',
        'Start with a complete Google Business Profile: the primary category that describes what your business is, every service you offer named the same way as on your website, your real address or a hidden service area, real photos added monthly, and an honest review from every customer. Never put keywords in your business name, use a fake address or buy reviews; Google suspends profiles for it.',
        'Then a website Google can read, with a page per service and your city in the title. When we first checked the MR DGN Group site, crawlers received 0 readable words because the text only appeared after JavaScript ran.',
        'Keep your name, phone number and address identical on your website, Google, Facebook, Bing Places, Apple Business and Nigerian directories such as VConnect, BusinessList, Finelib and ConnectNigeria. Submit to Bing Webmaster Tools too: Bing feeds Microsoft Copilot and other AI search tools.',
        'Lagos, Abuja and Port Harcourt get the most searches, so everyone fights over them. Smaller cities get fewer searches and much less competition, so a business with a complete profile and a clear website can win them first.',
        'Most Nigerians browse on phones using paid data, so every page we build is light, compressed and tested on a mid-range Android phone.',
        'People search the way they speak: by district, estate or landmark. We use the place names your customers actually use, but only for places you really serve.',
        'Customers are cautious about online scams. We add trust details that are easy to check: your real address with a landmark, your CAC number, named staff, real photos, and payment details only on official pages.',
      ],
      whyUs: [
        'One fixed naira price list for every state.',
        'Every site passes our own crawler check before launch.',
        'Google Business Profile and website done together, with matching wording.',
        'Remote delivery over WhatsApp, so location isn’t a barrier.',
      ],
      faqs: [
        {
          q: 'Can you build a website for my business if I’m not in Asaba or Abuja?',
          a: 'Yes. We work remotely with businesses anywhere in Nigeria. Your Google Business Profile and website will use your own city and address, which is what Google uses for local results.',
        },
        {
          q: 'How do I pay for a website from another state?',
          a: 'By bank transfer to our official business account, in two parts: a deposit before work starts and the balance at launch. Deposits are non-refundable once work has started, as set out in our service agreement.',
        },
        {
          q: 'Do you build websites for businesses in Lagos and Port Harcourt?',
          a: 'Yes, remotely, with the same packages and prices. Our Lagos page explains how we approach Lagos searches; we’ll add Port Harcourt examples once we complete projects there.',
        },
        {
          q: 'What makes a website “SEO-ready”?',
          a: 'Search engines and AI tools can read every page without JavaScript, each service has its own page with your city in the title, your business details match your Google profile, and the site loads quickly on a phone.',
        },
      ],
      evidenceIds: ['real-estate-abuja-asaba'],
      nearby: [
        { label: 'Abuja', href: '/locations/abuja' },
        { label: 'Asaba', href: '/locations/asaba' },
        { label: 'Lagos', href: '/locations/lagos' },
      ],
      related: ['website-design', 'local-seo', 'landing-pages', 'website-maintenance'],
    },
  },
};

Object.assign(locationPages, abujaLocationPages);

export const locationSlugs = Object.keys(locationPages);
