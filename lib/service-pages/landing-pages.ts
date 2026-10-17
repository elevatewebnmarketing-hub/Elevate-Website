import type { ServicePageConfig } from '@/lib/services-content';

export const landingPages: ServicePageConfig = {
  slug: 'landing-pages',
  type: 'service',
  title: 'Landing Pages',
  subtitle: 'One page, one offer, built to turn ad clicks into enquiries',
  description:
    'Landing page design in Abuja for offers, launches and promotions: one focused page per offer, with WhatsApp and form tracking so you can see where enquiries come from.',
  detail: {
    metaTitle: 'Landing Page Design in Abuja',
    metaDescription:
      'Landing page design in Abuja: one offer, one page, built to turn visitors from your ads, posts or outreach into WhatsApp enquiries. Tracking included.',
    h1: 'Landing page design in Abuja',
    intro: [
      'A landing page is a single page built for one offer and one action. It’s where your own ads, social posts, flyers or WhatsApp broadcasts send people, and its only job is to turn that click into a WhatsApp message, call or form enquiry.',
      'Sending ad traffic to your homepage usually wastes money: visitors land on a general page, can’t see the offer they clicked, and leave. A focused landing page keeps the promise of the ad and gives one clear next step.',
    ],
    problems: [
      'You’re running your own ads or posting on social media and getting clicks but few enquiries.',
      'Your ads or posts send people to your homepage or Instagram profile.',
      'You can’t tell which ad or offer actually produced a customer.',
      'You have a seasonal promotion, a new estate, a course intake or an event, and need a page fast.',
    ],
    included: [
      {
        title: 'One page, one offer',
        detail:
          'Headline that matches the ad, the offer and price, who it’s for, proof, frequently asked questions and one main call to action.',
      },
      {
        title: 'WhatsApp-first contact',
        detail: 'A WhatsApp button with a pre-filled message naming the offer, plus call and a short form if you want one.',
      },
      {
        title: 'Tracking set up',
        detail:
          'GA4 events for WhatsApp clicks, calls and form submissions, plus the conversion tag for whichever ad platform you use, so cost per lead is visible.',
      },
      {
        title: 'Fast on mobile data',
        detail: 'Compressed images and a light page, because most visitors in Nigeria arrive on phones using mobile data.',
      },
      {
        title: 'Search-readable',
        detail:
          'The page is server-rendered, so it can also rank and be read by AI tools. Use “noindex” instead for short promotions you don’t want in search.',
      },
    ],
    process: [
      {
        title: 'Offer brief',
        detail: 'You tell us the offer, price, deadline, audience and where your traffic will come from.',
      },
      {
        title: 'Copy and layout',
        detail: 'We write the page around the offer and send a draft for approval.',
      },
      {
        title: 'Build and tracking',
        detail: 'We build the page, connect it to your domain, and test every tracked click.',
      },
      {
        title: 'Launch and adjust',
        detail: 'Once traffic arrives, we review where visitors drop off and suggest changes. Most landing pages go live within 3 to 5 business days of receiving your brief.',
      },
    ],
    pricing: {
      summary:
        'A dedicated lead-generation landing page is included in the Business Website package (₦450,000). Standalone landing pages are priced per page.',
      points: [
        'Standalone landing page: ₦120,000.',
        'What changes the price: copywriting from scratch, number of sections, forms and integrations.',
      ],
    },
    proof: [
      {
        name: 'Website and Google Business Profile offer page',
        url: 'https://www.elevatewebandmarketing.com/google-business-profile-website-offer',
        detail: 'Our own landing page for the website and profile offer, built with the same structure we use for clients.',
      },
      {
        name: 'MR DGN Construction: bulk cement block offer',
        url: 'https://construction.mrdgngroup.com/promo',
        detail:
          'A single-offer page for buyers ordering in bulk (“Buy 10,000 cement blocks, get 30 free, plus free delivery in Asaba”), with one clear next step.',
      },
      {
        name: 'MR DGN Construction: building in Asaba from abroad',
        url: 'https://construction.mrdgngroup.com/building-in-asaba-from-abroad',
        detail:
          'A page for Nigerians abroad who are building at home and need materials delivered to their site in Asaba without being there.',
      },
    ],
    localContext: [
      'Most people in Abuja who click through from an ad or a post want to continue on WhatsApp. We make WhatsApp the main action and track each click, so you can compare campaigns by real conversations, not just clicks.',
      'Prices and offers matter here: pages that show a clear naira price or “from” price filter out time-wasters and get more serious enquiries.',
    ],
    whyUs: [
      'Tracking is part of the build, not an extra, so you know your cost per enquiry.',
      'The page is built by the same team that builds SEO-ready websites, so it can also rank if you want it to.',
      'Pages are light and fast on mobile data.',
    ],
    faqs: [
      {
        q: 'What is the difference between a landing page and a website?',
        a: 'A website has many pages for people who are exploring. A landing page is one page for one offer, built for people who just clicked an ad. It removes menus and distractions so visitors take one action.',
      },
      {
        q: 'Do I need a landing page if I run my own Facebook or Instagram ads?',
        a: 'You can send ads straight to WhatsApp, but a landing page lets you explain the offer, show proof, and track which ads produce enquiries. For higher-priced offers, like property or courses, it usually improves lead quality.',
      },
      {
        q: 'Can you track WhatsApp clicks from my page?',
        a: 'Yes. We record every WhatsApp button click as a conversion in GA4 and in your ad platform, so you can see the cost per WhatsApp enquiry for each ad you run.',
      },
      {
        q: 'Can the landing page live on my existing domain?',
        a: 'Yes. We can host it on a page of your current domain, such as yourbusiness.com/offer, or on a subdomain.',
      },
    ],
    related: ['website-design', 'local-seo', 'website-maintenance'],
  },
};
