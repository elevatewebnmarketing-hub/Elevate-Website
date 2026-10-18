import type { ServicePageConfig } from '@/lib/services-content';
import { STATIC_PRICING_FALLBACK } from '@/lib/pricing-config';

/** Niche pages for clients abroad (UK and US first). Prices come from pricing-config. */
const gb = STATIC_PRICING_FALLBACK.GB;
const us = STATIC_PRICING_FALLBACK.US;
const money = (n: number, sym: string) => `${sym}${n.toLocaleString('en-GB')}`;
const PRICE_POINTS = [
  `Starter Website: ${money(gb.starter.amount, '£')} / ${money(us.starter.amount, '$')}`,
  `Business Website: ${money(gb.business.amount, '£')} / ${money(us.business.amount, '$')}`,
  `SEO Care Plan: ${money(gb.meta_growth.amount, '£')} / ${money(us.meta_growth.amount, '$')} per month`,
];
const PRICE_SUMMARY = 'Fixed prices in pounds or dollars, invoiced up front: a deposit before work starts and the balance at launch.';
const TRUST = ['Based in Nigeria, serving the UK and US', 'Fixed prices in £ and $', 'You own your site', 'Replies within 48 hours'];
const RUNWAY = {
  name: 'Runway Refined by Alek, UK',
  url: '/case-studies/runway-refined',
  detail:
    'A website for a UK-based model coach with clients worldwide: coaching packages priced in pounds with checkout on the page, a resources sign-up, journal, testimonials and an admin portal. Alek’s Google review: “Amazing work, very professional! I’m pleased with my website.”',
};
const MRDGN = {
  name: 'MR DGN Construction (our SEO work)',
  url: 'https://construction.mrdgngroup.com',
  detail: 'After we rebuilt and optimised the site, a buyer found the company through ChatGPT and enquired, in September 2026.',
};

export const nichePages: Record<string, ServicePageConfig> = {
  coaches: {
    slug: 'coaches',
    type: 'service',
    title: 'Websites for Coaches & Personal Brands',
    subtitle: 'Turn followers into booked clients, with a site that also gets found on Google and ChatGPT',
    description:
      'Websites for coaches, consultants and personal brands: clear packages, booking and checkout, lead capture and SEO, so attention turns into paying clients.',
    detail: {
      metaTitle: 'Websites for Coaches & Personal Brands',
      metaDescription:
        `Websites for coaches and personal brands: packages, booking, checkout and email sign-ups, built to be found on Google and ChatGPT. From ${money(gb.starter.amount, '£')} or ${money(us.starter.amount, '$')}.`,
      h1: 'Websites for coaches and personal brands',
      intro: [
        'If people discover you on Instagram, TikTok or LinkedIn, your website is where that attention becomes income. It should explain what you offer, prove you’re good at it, and let someone book and pay without a long chat in your DMs.',
        'We build websites for coaches, consultants and personal brands, including Runway Refined by Alek, a UK-based model coach working with clients around the world.',
      ],
      trust: TRUST,
      problems: [
        'You get comments and DMs, but people ask the same questions before they buy, and many never do.',
        'Your packages live in a link-in-bio page or a PDF that doesn’t look like a serious business.',
        'You want clients who find you through Google or ChatGPT, not only through your latest post.',
        'You have resources, a course or a newsletter, but no proper place to collect emails.',
      ],
      included: [
        { title: 'Packages that sell themselves', detail: 'A clear page for each package or programme, with what’s included, prices, and booking or checkout on the same page.' },
        { title: 'Your story and proof', detail: 'An About page, portfolio or results, and testimonials, written so a stranger trusts you before the first call.' },
        { title: 'Lead capture', detail: 'Free resources, an email sign-up and contact forms that send leads straight to your inbox.' },
        { title: 'A portal you control', detail: 'Where it helps, an admin area to upload resources (PDFs and videos), manage reviews and see payments, without a developer.' },
        { title: 'Found on Google and AI', detail: 'Pages that answer what your clients search for, structured data and fast loading, so the site works even when you’re not posting.' },
      ],
      process: [
        { title: 'Free check', detail: 'Send your social handle or current site. We show you what Google and ChatGPT find about you today.' },
        { title: 'Offer and page plan', detail: 'We map your packages, story and proof into pages, and agree a fixed price.' },
        { title: 'Design and build', detail: 'You review everything on a preview link, including checkout and sign-up flows.' },
        { title: 'Launch', detail: 'We connect your domain, submit the site to Google and Bing, and test every booking and payment path.' },
      ],
      pricing: { summary: PRICE_SUMMARY, points: PRICE_POINTS },
      proof: [RUNWAY, MRDGN],
      localHeading: 'What a coaching website needs to do',
      localContext: [
        'Social media rewards new posts; a website rewards good answers. A page that explains your coaching, who it’s for and what it costs can bring enquiries for years, while a post fades in days.',
        'Most coaching clients want to see three things before they pay: proof that you’ve helped someone like them, a clear price or starting price, and an easy way to book. We put all three on the first screens of the site.',
        'If you take payments online, card checkout on your own site looks more professional than asking for a bank transfer in a DM, and it gives clients a receipt straight away.',
      ],
      whyUs: [
        'We’ve built exactly this for a working coach: packages, checkout, resources and an admin portal.',
        'SEO and AI readability built in, so the site works when you’re not posting.',
        'Fixed prices in £ or $, and you own the site.',
      ],
      faqs: [
        { q: 'Do I need a website if I already have a big social following?', a: 'Your following belongs to the platform; your website belongs to you. A site lets people who search for your kind of coaching find you, and gives followers a professional place to book and pay.' },
        { q: 'Can clients pay for coaching packages on the website?', a: 'Yes. We can add card checkout to each package, as we did for Runway Refined, or connect booking tools you already use.' },
        { q: 'Can I add free resources and collect emails?', a: 'Yes. We set up a resources area and an email sign-up, and you can upload new resources yourself from an admin portal.' },
        { q: 'How long does a coaching website take?', a: 'A Starter site usually launches in 7 to 10 business days and a Business site in 2 to 4 weeks, once we have your content.' },
      ],
      related: ['website-design', 'landing-pages', 'local-seo', 'website-maintenance'],
    },
  },

  clinics: {
    slug: 'clinics',
    type: 'service',
    title: 'Websites for Clinics & Health Practices',
    subtitle: 'Treatment pages, booking and Google Maps visibility for clinics and wellness businesses',
    description:
      'Websites for clinics, therapists and wellness businesses: a page per treatment, practitioner profiles, booking, Google Business Profile setup and privacy-aware forms.',
    detail: {
      metaTitle: 'Websites for Clinics & Health Practices',
      metaDescription:
        'Websites for clinics and wellness businesses: treatment pages, booking, Google Maps setup and privacy-aware forms, built to be found on Google and ChatGPT.',
      h1: 'Websites for clinics and health practices',
      intro: [
        'Patients search for a treatment and a place: “physiotherapist near me”, “dental implants cost”, “private GP appointment”. A clinic website should answer those searches clearly, build trust quickly and make booking easy.',
        'We build SEO-ready websites for clinics, therapists and health and wellness businesses. Because clinics have real premises, they can also rank on Google Maps, which we set up for you.',
      ],
      trust: TRUST,
      problems: [
        'Your website lists all your treatments on one page, so Google can’t match you to each one.',
        'Competitors appear on Google Maps for your treatments, and you don’t.',
        'Patients call to ask prices and opening times that should be on your site.',
        'Your booking form collects health details by plain email, which isn’t a safe way to handle patient information.',
      ],
      included: [
        { title: 'A page for every treatment', detail: 'What it is, who it’s for, what to expect, typical price or price range, and questions patients ask, so each treatment can rank on its own.' },
        { title: 'Practitioner profiles', detail: 'Qualifications, registrations and photos of the people patients will see, which matter more for health than almost any other business.' },
        { title: 'Booking that fits your practice', detail: 'Online booking, call and WhatsApp buttons, or a connection to the booking system you already use.' },
        { title: 'Google Business Profile at your premises', detail: 'Treatments, hours, photos and categories matched to your website, so you can appear on Google Maps.' },
        { title: 'Privacy-aware forms', detail: 'Contact forms that don’t ask for medical details, and a recommendation to use a dedicated booking or patient system for anything clinical.' },
      ],
      process: [
        { title: 'Free check', detail: 'We look at your site and Google profile and show you where patients can’t find you today.' },
        { title: 'Treatment map', detail: 'We list every treatment and practitioner and turn them into a page plan.' },
        { title: 'Design and build', detail: 'You review each page for clinical accuracy before launch.' },
        { title: 'Launch and profile', detail: 'We launch the site, submit it to Google and Bing, and update your Google Business Profile to match.' },
      ],
      pricing: { summary: PRICE_SUMMARY, points: PRICE_POINTS },
      proof: [
        {
          name: 'Mama Onome Natural Health',
          url: 'https://mama-onome.vercel.app',
          detail: 'A website for a Nigeria-based natural wellness brand: clear product pages, prices and WhatsApp ordering, with a calm design built for trust.',
        },
        MRDGN,
      ],
      localHeading: 'Health websites have extra rules',
      localContext: [
        'Health is one of the areas where Google expects the most trust. Pages should show who wrote or reviewed them, real qualifications, and accurate information that your practitioners have checked.',
        'Health information needs care. In the UK it’s special category data under UK GDPR, and in the US clinics handling patient data may fall under HIPAA. We keep clinical details out of ordinary website forms and recommend dedicated, compliant booking systems for them. This isn’t legal advice; your practice should confirm its own obligations.',
        'Advertising rules apply to health claims too, for example the UK’s advertising codes. We write treatment pages to describe what you offer without promising outcomes.',
      ],
      whyUs: [
        'SEO structure built around treatments, which is how patients search.',
        'Google Business Profile done together with the website, so Maps and site agree.',
        'Careful with patient data and health claims.',
      ],
      faqs: [
        { q: 'Should every treatment have its own page?', a: 'Yes, if patients search for it separately. A page per treatment lets Google match you to each search and lets patients find answers without calling.' },
        { q: 'Can the website take bookings?', a: 'Yes. We can add online booking or connect the booking system you already use, plus call and WhatsApp buttons.' },
        { q: 'Can patients send us medical details through the website?', a: 'We don’t recommend collecting medical information through ordinary website forms. We point clinical details to a dedicated, compliant booking or patient system instead.' },
        { q: 'Do you build websites for clinics in the UK and US?', a: 'Yes, remotely, with fixed prices in pounds or dollars. Your Google Business Profile uses your own clinic address.' },
      ],
      related: ['local-seo', 'website-design', 'website-redesign', 'website-maintenance'],
    },
  },

  'diaspora-businesses': {
    slug: 'diaspora-businesses',
    type: 'service',
    title: 'Websites for Diaspora-Owned Businesses',
    subtitle: 'For founders abroad serving two audiences: their local market and their community worldwide',
    description:
      'Websites for diaspora-owned businesses in the UK, US and beyond: built to win local customers on Google, reach your community worldwide and take payment in any currency.',
    detail: {
      metaTitle: 'Websites for Diaspora-Owned Businesses',
      metaDescription:
        'Websites for diaspora-owned businesses in the UK and US: found on Google and ChatGPT, built for local and international customers, with fixed £ and $ prices.',
      h1: 'Websites for diaspora-owned businesses',
      intro: [
        'Many diaspora-owned businesses serve two audiences at once: customers in the city where you live, and a community spread across countries. Your website has to work for both, and earn trust from people who have never met you.',
        'We build SEO-ready websites for founders abroad, including Runway Refined by Alek, a UK-based business serving clients worldwide. We work across time zones every day and understand customers who pay from one country for a service in another.',
      ],
      trust: TRUST,
      problems: [
        'Most of your business comes through WhatsApp groups and word of mouth, and you want customers who find you on Google too.',
        'Your customers are in several countries and need prices, payment and delivery explained clearly.',
        'Local customers outside your community don’t find you, because your site doesn’t answer what they search for.',
        'You want a site that looks as professional as the big brands in your field.',
      ],
      included: [
        { title: 'Pages for each audience and service', detail: 'Clear pages for what you sell, written for local customers and for your wider community, without duplicate copy.' },
        { title: 'Payments and enquiries that cross borders', detail: 'Prices in the currencies your customers use, card checkout where it fits, and WhatsApp and email contact.' },
        { title: 'Local visibility where you live', detail: 'A Google Business Profile at your real address, if you have premises, matched to your website.' },
        { title: 'Trust built in', detail: 'Your story, real reviews, clear policies and fast pages on any phone, wherever your customer is.' },
      ],
      process: [
        { title: 'Free check', detail: 'We show you what Google and ChatGPT see about your business today.' },
        { title: 'Plan', detail: 'We map your services and audiences into pages and agree a fixed price.' },
        { title: 'Design and build', detail: 'You review everything on a preview link before launch.' },
        { title: 'Launch', detail: 'We launch, submit the site to Google and Bing, and set up your Google profile if you have premises.' },
      ],
      pricing: { summary: PRICE_SUMMARY, points: PRICE_POINTS },
      proof: [
        RUNWAY,
        {
          name: 'MR DGN Construction: building from abroad',
          url: 'https://construction.mrdgngroup.com/building-in-asaba-from-abroad',
          detail: 'A page for Nigerians abroad building at home, explaining how to buy and receive materials without being there. A real example of writing for customers in another country.',
        },
      ],
      localHeading: 'Building for customers in more than one country',
      localContext: [
        'Customers who can’t visit you rely on what they can check online: a professional website, real reviews from people like them, and clear answers about price, payment and delivery.',
        'Your local market and your community often search differently. Local customers search for the service and your town; your community may search for the service and the culture, or come through a recommendation. We write pages for both, without copy-paste pages for different cities.',
        'We’re a Nigeria-based team working with clients abroad, so we’re used to time differences, cross-border payments and customers who mostly communicate on WhatsApp.',
      ],
      whyUs: [
        'We work across countries every day, for clients and their customers.',
        'SEO and AI readability built in.',
        'Fixed prices in £ or $, and you own your site.',
      ],
      faqs: [
        { q: 'Can my website show prices in different currencies?', a: 'Yes. We can show prices in the currencies your customers use and add checkout for card payments.' },
        { q: 'Can I rank on Google in my city if most customers are my community?', a: 'Yes. A Google Business Profile at your real address and pages that answer local searches help you reach customers outside your community too.' },
        { q: 'Do you understand businesses that sell across countries?', a: 'Yes. Several of our projects serve customers in more than one country, including buyers abroad paying for projects in Nigeria.' },
        { q: 'How do we work together across time zones?', a: 'Over WhatsApp, email and scheduled video calls. Calls can be booked outside our normal hours when needed.' },
      ],
      related: ['website-design', 'local-seo', 'landing-pages', 'website-maintenance'],
    },
  },
};

export const nicheSlugs = Object.keys(nichePages);
