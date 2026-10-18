import type { ServicePageConfig } from '@/lib/services-content';
import { STATIC_PRICING_FALLBACK } from '@/lib/pricing-config';

/** Country pages for clients abroad. Elevate has no office there: these target non-local searches only. */
const gb = STATIC_PRICING_FALLBACK.GB;
const gbp = (n: number) => `£${n.toLocaleString('en-GB')}`;

export const ukPage: ServicePageConfig = {
  slug: 'uk',
  type: 'service',
  title: 'SEO Websites for UK Small Businesses',
  subtitle: 'Websites built to be found on Google and ChatGPT, delivered remotely from Nigeria',
  description:
    'SEO-ready websites for UK small businesses, coaches and personal brands: service pages, structured data and AI readability built in, at fixed prices in pounds.',
  detail: {
    metaTitle: 'SEO Websites for UK Businesses',
    metaDescription: `SEO-ready websites for UK small businesses and coaches, built to be found on Google and ChatGPT. Fixed prices from ${gbp(gb.starter.amount)}, delivered remotely.`,
    h1: 'SEO websites for UK small businesses',
    intro: [
      'We build websites for UK small businesses, coaches and personal brands that need the site to bring in enquiries, not just look good. Every site is built so Google, Bing and AI assistants like ChatGPT can read every page.',
      'We’re based in Nigeria and work with UK clients remotely. Nigeria is in the same time zone as the UK for much of the year, so calls happen during your working day. One of our clients is Runway Refined by Alek, a UK-based model coach.',
    ],
    trust: ['Based in Nigeria, serving the UK', 'UK working hours', 'Fixed prices in pounds', 'Replies within 48 hours'],
    problems: [
      'You built your site with Wix, Squarespace or an AI builder, and it barely shows up on Google.',
      'You’re a coach, consultant or personal brand getting attention on Instagram or TikTok, but no website turning that attention into paying clients.',
      'UK agencies have quoted you thousands of pounds for a small business website.',
      'You want to show up when people ask ChatGPT or Google’s AI for a recommendation in your field.',
    ],
    included: [
      {
        title: 'A page for every service or package',
        detail: 'Each with its own title, description and answers to the questions your clients ask, so Google can match you to more searches.',
      },
      {
        title: 'Readable by search engines and AI',
        detail: 'Server-rendered pages, structured data, a sitemap and Search Console and Bing setup. We check what crawlers see before launch.',
      },
      {
        title: 'Bookings, payments and lead capture',
        detail: 'Contact forms, booking links, email sign-ups and checkout where you need them, with enquiries sent straight to your inbox.',
      },
      {
        title: 'UK basics handled',
        detail: 'Privacy policy and cookie consent for UK GDPR, your Companies House number if you’re a limited company, and fast loading on mobile.',
      },
      {
        title: 'Google Business Profile, if you have premises',
        detail: 'Set up or cleaned up with your UK address and postcode written exactly as Royal Mail lists them, matched to your website.',
      },
    ],
    process: [
      { title: 'Free check', detail: 'Send your website or business name. We show you what Google and ChatGPT see today, and quote a fixed price.' },
      { title: 'Plan', detail: 'A short video call and an intake form for your services, prices and photos. We send the page plan for approval.' },
      { title: 'Design and build', detail: 'You review the design and the full site on a preview link before anything goes live.' },
      { title: 'Launch', detail: 'We connect your domain, submit the site to Google and Bing, and run our crawler check.' },
    ],
    pricing: {
      summary: 'Fixed prices in pounds, invoiced in £ and paid to our business receiving account: a deposit before work starts and the balance at launch.',
      points: [
        `Starter Website: ${gbp(gb.starter.amount)}`,
        `Business Website: ${gbp(gb.business.amount)}`,
        `Website Care Plan: ${gbp(gb.google_growth.amount)} per month; SEO Care Plan: ${gbp(gb.meta_growth.amount)} per month`,
      ],
    },
    proof: [
      {
        name: 'Runway Refined by Alek, UK',
        url: 'https://www.runwayrefinedbyalek.com',
        detail:
          'A website for a UK-based model coach working with clients worldwide: coaching packages priced in pounds with checkout on the page, portfolio, resources, journal and testimonials. Alek’s Google review: “Amazing work, very professional! I’m pleased with my website.”',
      },
      {
        name: 'MR DGN Construction, Nigeria',
        url: 'https://construction.mrdgngroup.com',
        detail:
          'Our SEO work in practice: after we rebuilt and optimised the site, a buyer found the company through ChatGPT and enquired, in September 2026.',
      },
    ],
    localHeading: 'Working with a Nigeria-based team from the UK',
    localContext: [
      'We’re open about where we are, because you should know who you’re paying. You get a written agreement, a fixed price before work starts, and you see the full site on a preview link before the final payment.',
      'Calls happen within UK working hours, and evening calls can be booked. Most day-to-day communication runs over WhatsApp and email.',
      'UK rules matter for your site: UK GDPR and cookie consent if you use analytics, and the fake-reviews ban under the DMCC Act, in force since 6 April 2025. We only ever add real reviews.',
      'Comparing quotes? Our guide to [how much a website costs in the UK in 2026](/guides/website-cost-uk) shows typical UK prices and the questions to ask.',
    ],
    whyUs: [
      'SEO and AI readability built in, not sold as an extra.',
      'Fixed prices in pounds, below typical UK freelancer quotes.',
      'You own the site and domain once it’s paid for.',
      'You can talk to the person building your site.',
    ],
    faqs: [
      {
        q: 'Is it safe to hire a web designer in Nigeria?',
        a: 'Ask any agency the same questions: can you see their live work, speak to them on video, and get a written agreement with a fixed price? With us you get all three, and you review the finished site on a preview link before paying the balance.',
      },
      {
        q: 'Can you help my business rank in my UK town?',
        a: 'For Google Maps, your Google Business Profile must use your real UK address, which we set up for you. Your website can also rank for your services and the questions your clients ask. We can’t promise positions, and nobody honest can.',
      },
      {
        q: 'How do I pay from the UK?',
        a: 'You receive an invoice in pounds and pay to our business receiving account: a deposit before work starts and the balance at launch, as set out in our agreement.',
      },
      {
        q: 'What time zone are you in?',
        a: 'West Africa Time, which matches UK time during British Summer Time and is one hour ahead in winter. We work UK hours and can book evening calls.',
      },
    ],
    related: ['website-design', 'local-seo', 'landing-pages', 'website-maintenance'],
  },
};

const us = STATIC_PRICING_FALLBACK.US;
const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

export const usPage: ServicePageConfig = {
  slug: 'us',
  type: 'service',
  title: 'SEO Websites for US Small Businesses',
  subtitle: 'Websites built to be found on Google and ChatGPT, delivered remotely from Nigeria',
  description:
    'SEO-ready websites for US small businesses, coaches and personal brands: service pages, structured data and AI readability built in, at fixed prices in dollars.',
  detail: {
    metaTitle: 'SEO Websites for US Businesses',
    metaDescription: `SEO-ready websites for US small businesses and coaches, built to be found on Google and ChatGPT. Fixed prices from ${usd(us.starter.amount)}, delivered remotely.`,
    h1: 'SEO websites for US small businesses',
    intro: [
      'We build websites for US small businesses, coaches and personal brands that need the site to bring in enquiries, not just look good. Every site is built so Google, Bing and AI assistants like ChatGPT can read every page.',
      'We’re based in Nigeria and work with clients abroad remotely. Our clients so far are in the UK and Nigeria. We’re upfront about that, so you can judge our work on the live sites below.',
    ],
    trust: ['Based in Nigeria, serving the US', 'Calls in your morning', 'Fixed prices in dollars', 'Replies within 48 hours'],
    problems: [
      'You built your site with Wix, Squarespace or an AI builder like Lovable, and it barely shows up on Google.',
      'You’re a coach, consultant or personal brand getting attention on Instagram or TikTok, but your website doesn’t turn that attention into booked calls.',
      'Your website looks fine, but nobody contacts you through it.',
      'You want to show up when people ask ChatGPT or Google’s AI for a recommendation in your field.',
    ],
    included: [
      {
        title: 'A page for every service or package',
        detail: 'Each with its own title, description and answers to the questions your clients ask, so Google can match you to more searches.',
      },
      {
        title: 'Readable by search engines and AI',
        detail: 'Server-rendered pages, structured data, a sitemap and Search Console and Bing setup. We check what crawlers see before launch.',
      },
      {
        title: 'Bookings, payments and lead capture',
        detail: 'Contact forms, booking links, email sign-ups and checkout where you need them, with enquiries sent straight to your inbox.',
      },
      {
        title: 'Accessibility and privacy basics',
        detail: 'Alt text, readable contrast and keyboard-friendly navigation, plus a privacy policy that covers the analytics and forms on your site.',
      },
      {
        title: 'Google Business Profile, if you have premises',
        detail: 'Set up or cleaned up with your US address written exactly as USPS lists it, matched to your website.',
      },
    ],
    process: [
      { title: 'Free check', detail: 'Send your website or business name. We show you what Google and ChatGPT see today, and quote a fixed price.' },
      { title: 'Plan', detail: 'A short video call and an intake form for your services, prices and photos. We send the page plan for approval.' },
      { title: 'Design and build', detail: 'You review the design and the full site on a preview link before anything goes live.' },
      { title: 'Launch', detail: 'We connect your domain, submit the site to Google and Bing, and run our crawler check.' },
    ],
    pricing: {
      summary: 'Fixed prices in dollars, invoiced in USD and paid to our business receiving account: a deposit before work starts and the balance at launch.',
      points: [
        `Starter Website: ${usd(us.starter.amount)}`,
        `Business Website: ${usd(us.business.amount)}`,
        `Website Care Plan: ${usd(us.google_growth.amount)} per month; SEO Care Plan: ${usd(us.meta_growth.amount)} per month`,
      ],
    },
    proof: [
      {
        name: 'Runway Refined by Alek, UK',
        url: 'https://www.runwayrefinedbyalek.com',
        detail:
          'A website for a UK-based model coach working with clients worldwide: coaching packages with checkout on the page, portfolio, resources, journal and testimonials. Alek’s Google review: “Amazing work, very professional! I’m pleased with my website.”',
      },
      {
        name: 'MR DGN Construction, Nigeria',
        url: 'https://construction.mrdgngroup.com',
        detail:
          'Our SEO work in practice: after we rebuilt and optimised the site, a buyer found the company through ChatGPT and enquired, in September 2026.',
      },
    ],
    localHeading: 'Working with a Nigeria-based team from the US',
    localContext: [
      'We’re open about where we are, because you should know who you’re paying. You get a written agreement, a fixed price before work starts, and you see the full site on a preview link before the final payment.',
      'Nigeria is 5 to 6 hours ahead of New York and 8 to 9 hours ahead of Los Angeles. Our afternoon is your morning, so calls usually happen before lunch on the East Coast, and other times can be booked. Most day-to-day communication runs over WhatsApp and email.',
      'If your site was built with an AI builder, read our guide to [why Lovable, Wix and Squarespace sites don’t show up on Google](/guides/lovable-wix-squarespace-seo) before you rebuild.',
    ],
    whyUs: [
      'SEO and AI readability built in, not sold as an extra.',
      'Fixed prices in dollars, well below typical US agency quotes.',
      'You own the site and domain once it’s paid for.',
      'You can talk to the person building your site.',
    ],
    faqs: [
      {
        q: 'Is it safe to hire a web designer in Nigeria?',
        a: 'Ask any agency the same questions: can you see their live work, speak to them on video, and get a written agreement with a fixed price? With us you get all three, and you review the finished site on a preview link before paying the balance.',
      },
      {
        q: 'Can you help my business rank in my US city?',
        a: 'For Google Maps, your Google Business Profile must use your real US address, which we set up for you. Your website can also rank for your services and the questions your clients ask. We can’t promise positions, and nobody honest can.',
      },
      {
        q: 'How do I pay from the US?',
        a: 'You receive an invoice in US dollars and pay to our business receiving account by bank transfer or card: a deposit before work starts and the balance at launch, as set out in our agreement.',
      },
      {
        q: 'What hours do you work?',
        a: 'West Africa Time (UTC+1), which is 5 to 6 hours ahead of US Eastern time. Calls usually happen in your morning, and other times can be booked.',
      },
    ],
    related: ['website-design', 'local-seo', 'landing-pages', 'website-maintenance'],
  },
};
