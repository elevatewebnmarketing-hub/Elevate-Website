import type { ServicePageConfig } from '@/lib/services-content';

/**
 * Abuja-area and Lagos location pages (added 9 November 2026).
 * Each page carries facts only it can carry: its own search data, its own client work, its own questions.
 * Sources: seo/research-2026-11-09.md, seo/data/, and Ufuoma's answers of 9 Nov 2026 (see seo/decisions.md).
 */

const PRICING_POINTER = {
  summary:
    'The same fixed packages everywhere. The pricing page shows them in naira for Nigeria, and in pounds or dollars if you’re abroad.',
  points: [
    'Starter Website: four pages, a year of domain, Google Business Profile setup and core SEO',
    'Business Website: more pages, landing-page support and lead tracking',
    'SEO Care Plan: a new page or post each month, profile updates and a monthly report',
  ],
};

const UPDATED = '2026-11-09';

export const abujaLocationPages: Record<string, ServicePageConfig> = {
  abuja: {
    slug: 'abuja',
    type: 'service',
    title: 'Web Design & SEO in Abuja',
    subtitle: 'Websites and local SEO for businesses across the FCT',
    description:
      'Web design and local SEO in Abuja: websites Google and ChatGPT can read, a Google Business Profile that matches them, and monthly reports on who called you.',
    detail: {
      metaTitle: 'Web Design & SEO in Abuja',
      metaDescription:
        'Web design and local SEO in Abuja from the team behind Mansa Luxe Realty’s site. Pages Google and ChatGPT can read, and reports on who called you.',
      h1: 'Web design and SEO in Abuja',
      updated: UPDATED,
      keyTakeaways: [
        'We build websites and do local SEO for Abuja businesses, and we’re based in Abuja ourselves.',
        'Our Abuja proof is Mansa Luxe Realty: its Google impressions grew from 46 in May 2026 to 843 in October 2026, and it appeared in Google’s AI Overviews 363 times in those six months.',
        'In early November 2026 two business owners contacted us about getting found on Google. One told us ChatGPT had suggested us.',
        'Around 70 people a month search “web design in Abuja”. Page 1 is mostly small agencies with one Abuja page, so a well-built site can compete.',
        'We report progress by the people who call or message you from Google and AI search, not only by clicks.',
      ],
      intro: [
        'Most of the businesses that ask us for help in Abuja have the same problem: people search for exactly what they sell, and someone else shows up. We fix that with a website that has a page for each thing you sell, a Google Business Profile that matches it, and text that ChatGPT and Google’s AI answers can read and quote.',
        'We’re based in Abuja. Our office address is MR DGN’s office in Asaba, and Abuja is the main area we serve. If you mainly want ChatGPT to recommend you, start with [our ChatGPT guide](/guides/how-to-get-recommended-by-chatgpt).',
      ],
      problems: [
        'You run a business in Abuja, such as a clinic, a law firm, an estate agency, a school or a contractor, and customers can’t find you when they search.',
        'Your competitors in Wuse, Garki or Gwarinpa show on Google Maps and you don’t.',
        'You ask ChatGPT for “the best [your trade] in Abuja” and it names other businesses.',
        'Your website was built on a page builder and Google has indexed only a few of its pages, or none.',
      ],
      included: [
        {
          title: 'A page for each service you sell',
          detail:
            'Each page names the service and Abuja in the title and heading, answers the questions buyers ask, and shows your work. Google matches searches to pages, so one “Services” page can only rank for one thing.',
        },
        {
          title: 'Google Business Profile set up or cleaned up',
          detail:
            'Categories, services, hours, photos and a description that match your website. If you serve customers at their location, we set you up as a service-area business with your address hidden, which is what Google’s rules ask for.',
        },
        {
          title: 'Pages Google and AI tools can read',
          detail:
            'Server-rendered pages, so the text is in the HTML and not only produced by JavaScript, plus a sitemap submitted to Google Search Console and Bing Webmaster Tools. AI crawlers mostly don’t run JavaScript, so this decides whether ChatGPT can see you at all.',
        },
        {
          title: 'Listings Abuja buyers check',
          detail:
            'The same name, address and phone number on Google, Bing, Apple Maps, Facebook and Nigerian directories such as VConnect and Finelib. When they disagree, Google trusts all of them less.',
        },
        {
          title: 'A way to ask for honest reviews',
          detail:
            'A short WhatsApp message and a QR card your staff can use with every customer. We never write reviews or tell customers what to say.',
        },
        {
          title: 'Reports on calls and messages',
          detail:
            'Each month we show how many people found you on Google and AI search, and how many called, messaged or filled in a form. That’s the number that tells you whether it’s working.',
        },
      ],
      process: [
        {
          title: 'Free check',
          detail:
            'Send your business name on WhatsApp. We search for you on Google, Maps and ChatGPT and tell you what we find.',
        },
        {
          title: 'Plan the pages',
          detail:
            'We list every service you want customers to find and match each one to a page and to your Google profile.',
        },
        {
          title: 'Build and submit',
          detail:
            'Starter sites usually take 7 to 10 business days and Business sites 2 to 4 weeks. On launch day we submit the sitemap and check that Google can index every page.',
        },
        {
          title: 'Watch and improve',
          detail:
            'We check Search Console for at least a month, see which searches you appear for, and strengthen the pages that are close to page 1.',
        },
      ],
      pricing: PRICING_POINTER,
      proof: [
        {
          name: 'Mansa Luxe Realty, Abuja and Asaba',
          url: 'https://mansaluxerealty.mrdgngroup.com',
          detail:
            'A real estate agency selling homes in Katampe Extension, Guzape, Gwarinpa Extension and Idu, and land in Asaba. We rebuilt the site so every listing and area has its own readable page. In our own tests in November 2026, ChatGPT named Mansa Luxe first or second when asked about property in Katampe Extension.',
        },
        {
          name: 'Two enquiries through ChatGPT, November 2026',
          detail:
            'Two business owners messaged us within a few days of each other asking how to get found on Google and get more clients. One told us ChatGPT had suggested us. We didn’t ask what she typed, so we can’t tell you the exact question.',
        },
      ],
      evidenceIds: ['real-estate-abuja-asaba'],
      localHeading: 'What Abuja searches look like right now',
      localContext: [
        'We checked Google from an Abuja location on 9 November 2026. For “web design in Abuja” the map pack shows three agencies with 53 to 74 reviews each, and the first page below it is mostly small agencies with a single Abuja page, plus directories such as Sortlist. Nobody on that page is out of reach.',
        'For “SEO company in Abuja” the first page is split between “best SEO companies in Abuja” lists and small agencies. Those lists matter beyond Google: ChatGPT reads them when it decides who to recommend, so part of our work is getting you named on them honestly.',
        'Search volumes in Abuja are small. Google Ads data puts “web design in Abuja” at about 70 searches a month and “digital marketing agency in Abuja” at about 110. That’s why we build pages for the specific things you sell. A searcher who types “dental implants in Wuse” is closer to booking than one who types “dentist”.',
      ],
      whyUs: [
        'We show you the Search Console numbers from our own client work, with the chart above.',
        'We build the site and do the SEO, so nobody blames the other party when it doesn’t rank.',
        'No long contracts. Normal projects are invoiced; large builds are 50% upfront and 50% on delivery.',
      ],
      faqs: [
        {
          q: 'How long does SEO take to work in Abuja?',
          a: 'In our experience, once the website is built properly and submitted to Google Search Console, it takes about three weeks for Google to start showing it, and the first calls often come in around then. Competitive searches take longer. We won’t promise a position or a date.',
        },
        {
          q: 'Can you get my Abuja business recommended by ChatGPT?',
          a: 'We can make sure ChatGPT can read your website and finds the same facts about you elsewhere, which is what it relies on. Nobody can force a recommendation. Mansa Luxe Realty is one client ChatGPT now names for Katampe Extension property.',
        },
        {
          q: 'How much does a website cost in Abuja?',
          a: 'The same as anywhere in Nigeria with us. The pricing page lists the fixed packages; the Starter Website includes Google Business Profile setup.',
        },
        {
          q: 'Do I need an office in Abuja to show on Google Maps?',
          a: 'No. If you visit customers or work from home, Google lets you list as a service-area business with your address hidden. If customers come to you, the address on your profile has to be a place where you meet them during your opening hours.',
        },
        {
          q: 'Do you only work with real estate businesses?',
          a: 'No. Mansa Luxe is our Abuja example because it’s the work we can show in numbers. We also build for building-materials suppliers, coaches, clinics and other service businesses.',
        },
        {
          q: 'How will I know it’s working?',
          a: 'Each month we show you how often you appeared on Google, how many people visited, and most importantly how many called, messaged on WhatsApp or sent a form after finding you on Google, ChatGPT or Bing.',
        },
      ],
      nearby: [
        { label: 'Katampe Extension', href: '/locations/katampe-extension' },
        { label: 'Guzape', href: '/locations/guzape' },
        { label: 'Asaba', href: '/locations/asaba' },
        { label: 'Lagos', href: '/locations/lagos' },
        { label: 'All of Nigeria', href: '/locations/nigeria' },
      ],
      related: ['local-seo', 'website-design', 'website-redesign', 'ecommerce'],
    },
  },

  'katampe-extension': {
    slug: 'katampe-extension',
    type: 'service',
    title: 'Web Design & SEO in Katampe Extension, Abuja',
    subtitle: 'For estate agents, developers and the businesses that serve Katampe residents',
    description:
      'Websites and local SEO for businesses in Katampe Extension, Abuja, from the team that built Mansa Luxe Realty’s Katampe Extension pages.',
    detail: {
      metaTitle: 'Web Design & SEO in Katampe Extension, Abuja',
      metaDescription:
        'We built Mansa Luxe Realty’s Katampe Extension pages, which ChatGPT now names for property there. Websites and local SEO for Katampe businesses.',
      h1: 'Web design and SEO in Katampe Extension, Abuja',
      updated: UPDATED,
      keyTakeaways: [
        'We built the Katampe Extension area guide and listing pages for Mansa Luxe Realty, which markets four 5-bedroom homes there.',
        'In our tests in November 2026, ChatGPT named Mansa Luxe first or second for property in Katampe Extension.',
        '“Katampe Extension” gets about 8,100 Google searches a month in Nigeria. “House for sale in Katampe Extension” gets about 20, and property portals hold that first page.',
        'The opening for a Katampe business is the area search itself: guides, videos and pages with facts nobody else publishes.',
      ],
      intro: [
        'Katampe Extension is where most of our real estate SEO work has happened. Mansa Luxe Realty sells homes there, and we built the pages that describe the district, its roads and what’s around it, and each property for sale.',
        'If you sell property in Katampe Extension, or you run a business residents use, this page explains what we’ve learned about getting found for Katampe searches.',
      ],
      problems: [
        'You’re an estate agent or developer with Katampe Extension listings, and buyers only find them on property portals.',
        'You run a gym, clinic, school, restaurant or service that Katampe residents use, and you don’t appear when they search nearby.',
        'You post listings on Instagram and WhatsApp but have no website that Google or ChatGPT can read.',
      ],
      included: [
        {
          title: 'An area page with first-hand facts',
          detail:
            'For Mansa Luxe that meant the roads buyers ask about, such as Aminu Sale Road, what is nearby, such as Kahera Country Club on Patrick Yakowa Street, how long homes take to sell, and what buyers ask most (whether the area is safe). Portals don’t publish that.',
        },
        {
          title: 'One page per listing or service',
          detail:
            'Each property or service gets its own page with real photos, the asking price where you publish one, and an enquiry button. We don’t create several pages chasing the same search, because Google then can’t tell which one to rank.',
        },
        {
          title: 'Portal listings that point back to you',
          detail:
            'Nigeria Property Centre and PropertyPro hold most of page 1 for “house for sale in Katampe Extension”. We list your properties there too, with a link to your own page, so you appear on page 1 through them while your site builds up.',
        },
        {
          title: 'Video for the area search',
          detail:
            'YouTube videos rank on page 1 for “Katampe Extension”. A walkthrough with an exact title and a written description, embedded on your area page, can reach that search faster than a new page alone.',
        },
      ],
      process: [
        {
          title: 'Free check',
          detail: 'We search your business and your listings on Google and ChatGPT from an Abuja location and show you what comes up.',
        },
        {
          title: 'Area page and listings',
          detail: 'We write the area page with you, using what you know about Katampe, and build a page per listing.',
        },
        {
          title: 'Portals, video and reports',
          detail: 'We set up the portal listings, help plan the video, and report monthly on enquiries.',
        },
      ],
      pricing: PRICING_POINTER,
      proof: [
        {
          name: 'Mansa Luxe Realty: Katampe Extension',
          url: 'https://mansaluxerealty.mrdgngroup.com/katampe-extension-abuja-property',
          detail:
            'The area guide lists four 5-bedroom detached duplexes for sale (asking prices of ₦400 million to ₦1.3 billion, 27 October 2026) and what the agency has learned selling there. Search Console shows the Katampe Extension pages appearing for Katampe searches, and we’re now combining them into one stronger page.',
        },
      ],
      evidenceIds: ['real-estate-abuja-asaba'],
      localHeading: 'What Katampe Extension searches look like',
      localContext: [
        'On 9 November 2026, “house for sale in Katampe Extension” and “land for sale in Katampe Extension” showed only property portals on page 1: six of the top ten results were Nigeria Property Centre. A single agency site won’t outrank them for that search, so we use the portals rather than fight them.',
        'The search for the district name is different. About 8,100 people a month search “Katampe Extension”, and page 1 has area guides, Facebook posts and two YouTube videos. People also search “where is Katampe Extension located” and “how much is land in Katampe”. Those are questions an agent who works there can answer better than a portal.',
        'We’ve also learned to keep one page per question. Mansa Luxe had six pages that all appeared for “Katampe Extension”, and none of them averaged a page 1 position. We’re merging them into one strong area page.',
      ],
      whyUs: [
        'We’ve done this exact work in Katampe Extension, with the Search Console data to show for it.',
        'Ufuoma, our founder, also works in Abuja real estate, so we know what buyers ask.',
        'We never invent reviews, prices or sales figures for a listing.',
      ],
      faqs: [
        {
          q: 'Can my agency rank for “house for sale in Katampe Extension”?',
          a: 'Not quickly with your own site: property portals own that page. List your properties on the portals with a link to your site, and build your own area page to rank for the district name and the questions buyers ask.',
        },
        {
          q: 'What should a Katampe Extension area page include?',
          a: 'Facts from someone who works there: popular roads, what’s nearby, safety, how long sales take, and what is for sale now. The more of it nobody else publishes, the more likely Google and ChatGPT are to use it.',
        },
        {
          q: 'Do you only work with estate agents in Katampe?',
          a: 'No. Any business that serves Katampe residents can use the same approach: a page per service and a profile that matches it.',
        },
        {
          q: 'How much does it cost?',
          a: 'Our packages are fixed and listed on the pricing page. Portal listing fees, if any, are paid to the portal.',
        },
      ],
      nearby: [
        { label: 'Abuja', href: '/locations/abuja' },
        { label: 'Guzape', href: '/locations/guzape' },
        { label: 'Asaba', href: '/locations/asaba' },
      ],
      related: ['local-seo', 'website-design', 'website-redesign', 'landing-pages'],
    },
  },

  guzape: {
    slug: 'guzape',
    type: 'service',
    title: 'Web Design & SEO in Guzape, Abuja',
    subtitle: 'For property sellers and premium businesses in Guzape',
    description:
      'Websites and local SEO for businesses in Guzape, Abuja: listing pages, area guides and a Google profile that match what buyers search.',
    detail: {
      metaTitle: 'Web Design & SEO in Guzape, Abuja',
      metaDescription:
        'Websites and local SEO for Guzape businesses. A small Guzape-only site ranks #1 for Guzape house searches; we show how to build one that can compete.',
      h1: 'Web design and SEO in Guzape, Abuja',
      updated: UPDATED,
      keyTakeaways: [
        'About 50 people a month search “house for sale in Guzape”, and about 12,100 search “Guzape”.',
        'On 9 November 2026 the #1 result for “house for sale in Guzape” was a small site about Guzape alone, ahead of the big portals.',
        'We built the Guzape listing and price guide for Mansa Luxe Realty, which has a 5-bedroom detached duplex there asking ₦900 million.',
        'A focused site with first-hand detail can win in Guzape, which is harder in Gwarinpa or Katampe.',
      ],
      intro: [
        'Guzape is one of the few Abuja districts where a small, focused website already beats the property portals on Google. On 9 November 2026 the top result for “house for sale in Guzape” was a site about Guzape alone.',
        'We built the Guzape pages for Mansa Luxe Realty: a listing for a 5-bedroom detached duplex and a guide to how Guzape asking prices have moved. If you sell or serve in Guzape, here is how we’d approach it.',
      ],
      problems: [
        'You sell or let property in Guzape and depend on portals and word of mouth for buyers.',
        'You run a premium service in Guzape, such as interiors, security, a clinic or a school, and wealthy residents can’t find you online.',
        'Your site lists Guzape among ten districts on one page, so Google doesn’t rank it for any of them.',
      ],
      included: [
        {
          title: 'A Guzape page that answers buyers first',
          detail:
            'Asking prices and how they’ve moved, what a buyer gets for the price, how long sales take in your experience, and what to check before paying.',
        },
        {
          title: 'Listing pages with real photos',
          detail:
            'Each property gets its own page with its own photos and an enquiry button. We never use construction photos as if they showed the finished house.',
        },
        {
          title: 'Google Business Profile and listings',
          detail:
            'Set up to match the website, with the same name, address and phone number everywhere.',
        },
      ],
      process: [
        { title: 'Free check', detail: 'We look at the Guzape search results with you and see where you could fit.' },
        { title: 'Build', detail: 'A Guzape page, listing pages and your profile, usually within 2 to 4 weeks.' },
        { title: 'Report', detail: 'Monthly reports on the searches you appear for and the enquiries they bring.' },
      ],
      pricing: PRICING_POINTER,
      proof: [
        {
          name: 'Mansa Luxe Realty: Guzape',
          url: 'https://mansaluxerealty.mrdgngroup.com/guides/guzape-abuja-property-prices-then-and-now',
          detail:
            'A 5-bedroom fully detached duplex in Guzape asking ₦900,000,000, and a price guide comparing Guzape asking prices then and now. In the agency’s experience its last Guzape sale took about nine months.',
        },
      ],
      localHeading: 'What Guzape searches look like',
      localContext: [
        'For “house for sale in Guzape” (about 50 searches a month), page 1 on 9 November 2026 had a Guzape-only site at #1, then Jiji, Nigeria Property Centre and PropertyPro, plus a YouTube tour of Guzape homes. A site that covers one district well can sit above the portals.',
        'Far more people search the district name: about 12,100 a month for “Guzape”. Most of them want to know what the area is like before they think about buying, which is a reason to publish an honest area guide.',
      ],
      whyUs: [
        'We’ve built real Guzape listing and price pages, not a template with the district name swapped in.',
        'We tell you which searches you can realistically win before you pay for anything.',
      ],
      faqs: [
        {
          q: 'Is it worth building a site just for Guzape?',
          a: 'If most of your listings or customers are in Guzape, a site or section focused on it can compete; the current #1 result for Guzape house searches is exactly that. If you sell across Abuja, one strong page per district you actually sell in works better.',
        },
        {
          q: 'How long does it take to show up for Guzape searches?',
          a: 'In our experience Google starts showing a properly built site about three weeks after it’s submitted to Search Console. Reaching page 1 for a district search usually takes longer, and we don’t promise a date.',
        },
        {
          q: 'Can you write about Guzape prices for my site?',
          a: 'Yes, from your own asking prices and experience, marked as such. We don’t publish sale prices you haven’t agreed to share, and we don’t invent market figures.',
        },
      ],
      nearby: [
        { label: 'Abuja', href: '/locations/abuja' },
        { label: 'Katampe Extension', href: '/locations/katampe-extension' },
      ],
      related: ['website-design', 'local-seo', 'landing-pages', 'website-maintenance'],
    },
  },

  okpanam: {
    slug: 'okpanam',
    type: 'service',
    title: 'Web Design & SEO in Okpanam, Asaba',
    subtitle: 'For building-materials sellers, builders and trades around Okpanam',
    description:
      'Websites and local SEO for businesses in Okpanam, Asaba, from our office by Okpanam City Gate and the team behind MR DGN Construction’s site.',
    detail: {
      metaTitle: 'Web Design & SEO in Okpanam, Asaba',
      metaDescription:
        'Our office is by Okpanam City Gate. We built MR DGN Construction’s site, which ChatGPT lists first for cement blocks in Asaba. Websites and SEO for Okpanam.',
      h1: 'Web design and SEO in Okpanam, Asaba',
      updated: UPDATED,
      keyTakeaways: [
        'Our office address is MR DGN’s office: Jossie Excel School, after Okpanam City Gate by the Express, Asaba.',
        'We built the website for MR DGN Construction, a building-materials supplier in Okpanam. ChatGPT listed it first when asked where to buy cement blocks in Asaba with delivery (our test, 6 November 2026).',
        'Its site appears in Google’s AI Overviews: 279 times from May to October 2026.',
        'Okpanam and Asaba searches are small, so a business that does the basics well can be found quickly.',
      ],
      intro: [
        'Okpanam is where our Asaba work is based. Our office address is MR DGN’s office by Okpanam City Gate, and MR DGN Construction, which sells cement, blocks and sand from the same area, is one of our clients.',
        'Most businesses around Okpanam that we talk to sell to builders and people building at home: materials, transport, labour and fittings. Many of their customers live in Abuja, Lagos or abroad and choose a supplier online before they ever visit.',
      ],
      problems: [
        'You sell building materials or a trade service around Okpanam and customers only find you by word of mouth.',
        'People building in Asaba from Abuja or abroad can’t check your prices, delivery or stock online.',
        'Your shop isn’t on Google Maps, or the pin is in the wrong place.',
      ],
      included: [
        {
          title: 'A page for each product or service',
          detail:
            'For MR DGN that meant separate pages for cement, blocks, pavers and delivery in Asaba, plus one for Okpanam, each written around what buyers ask.',
        },
        {
          title: 'Google Business Profile at your yard or shop',
          detail: 'Correct pin, categories, products, photos and opening hours, and help with Google’s video verification.',
        },
        {
          title: 'Facts AI tools can repeat',
          detail:
            'Clear text about what you sell, where you deliver and how to order, on pages ChatGPT can read. That’s what put MR DGN at the top of ChatGPT’s answer for cement blocks.',
        },
      ],
      process: [
        { title: 'Free check', detail: 'We search for you on Google, Maps and ChatGPT and send you what we find.' },
        { title: 'Build', detail: 'Starter sites usually launch in 7 to 10 business days.' },
        { title: 'Keep improving', detail: 'On the SEO Care Plan we add a page or post each month and report on enquiries.' },
      ],
      pricing: PRICING_POINTER,
      proof: [
        {
          name: 'MR DGN Construction & Developers, Okpanam',
          url: 'https://construction.mrdgngroup.com',
          detail:
            'In September 2026 a buyer found the company through ChatGPT and enquired about concrete blocks. On 6 November 2026 we asked ChatGPT “Where can I buy cement blocks in Asaba with delivery?” and MR DGN Construction was the first answer.',
        },
      ],
      localHeading: 'Getting found around Okpanam',
      localContext: [
        'Google reports almost no measurable search volume for Okpanam and Asaba trade searches. That doesn’t mean nobody searches; it means the searches are spread over many small phrases, and ChatGPT questions don’t show up in Google’s numbers at all. MR DGN’s first ChatGPT customer came from exactly that kind of search.',
        'Customers here describe places by landmarks, such as City Gate, the Express and Okpanam Road. We use those names on your pages where they’re true for you.',
      ],
      whyUs: [
        'Our office is in Okpanam, and our proof is a supplier on the same road.',
        'We know how builders and home-builders abroad search for materials, because we’ve watched the data for MR DGN.',
      ],
      faqs: [
        {
          q: 'Can I visit your office in Okpanam?',
          a: 'Yes, by appointment, at MR DGN’s office: Jossie Excel School, after Okpanam City Gate by the Express. Most projects run over WhatsApp and calls.',
        },
        {
          q: 'My customers are mostly in Abuja and abroad. Can a website help?',
          a: 'Yes. They can’t visit your yard first, so they decide from your website, your Google reviews and what ChatGPT says. MR DGN’s ChatGPT enquiry came from a buyer who searched before contacting anyone.',
        },
        {
          q: 'How much does it cost?',
          a: 'Our fixed packages are on the pricing page. The Starter Website includes Google Business Profile setup.',
        },
      ],
      nearby: [
        { label: 'Asaba', href: '/locations/asaba' },
        { label: 'Abuja', href: '/locations/abuja' },
      ],
      related: ['local-seo', 'website-design', 'ecommerce', 'website-maintenance'],
    },
  },

  lagos: {
    slug: 'lagos',
    type: 'service',
    title: 'Web Design & SEO in Lagos',
    subtitle: 'Remote web design and local SEO for Lagos businesses',
    description:
      'Web design and local SEO for Lagos businesses, delivered remotely: we pick the specific searches you can win instead of chasing “SEO company in Lagos”.',
    detail: {
      metaTitle: 'Web Design & SEO in Lagos',
      metaDescription:
        'Web design and local SEO for Lagos businesses, delivered remotely. We target the specific searches you can win in your part of Lagos. Fixed prices.',
      h1: 'Web design and SEO for Lagos businesses',
      updated: UPDATED,
      keyTakeaways: [
        'We work with Lagos businesses remotely, over WhatsApp and video calls. We don’t have a Lagos office.',
        'Lagos is Nigeria’s busiest search market: about 1,600 searches a month for “SEO company in Lagos” and 480 for “web design in Lagos”.',
        'That also makes the broad searches crowded, so we aim your pages at the service and area you actually serve.',
        'Our Lagos client so far is SOCASEMP Initiative, a Lagos non-profit we built a donation platform for. Our search results proof is from Abuja and Asaba clients.',
      ],
      intro: [
        'Lagos has more people searching for local services than anywhere else in Nigeria, and more businesses competing for each search. A clinic in Lekki or a caterer in Ikeja is up against hundreds of others for the broad searches.',
        'We work with Lagos clients remotely. In Lagos we built the donation platform for SOCASEMP Initiative, a non-profit. Our search results so far are with an Abuja real estate agency and an Asaba building-materials supplier, and the method is the same in Lagos.',
      ],
      problems: [
        'You run a service business in Lagos and depend on Instagram or referrals for new customers.',
        'You rank for your own name but not for the service you sell in your area.',
        'You paid for a website that looks good but brings no enquiries.',
      ],
      included: [
        {
          title: 'Pages for the searches you can win',
          detail:
            'A page per service, named for the part of Lagos you serve where that’s true. We don’t create a page for every Lagos district; Google treats near-copies with swapped place names as spam.',
        },
        {
          title: 'Google Business Profile',
          detail: 'Set up or cleaned up to match your site, at your real address or as a service-area business.',
        },
        {
          title: 'A site AI tools can read',
          detail: 'Server-rendered pages, a submitted sitemap and consistent listings, so ChatGPT and Google’s AI answers have facts to use.',
        },
      ],
      process: [
        { title: 'Free check', detail: 'We search for you from a Lagos location on Google and ChatGPT and send what we find.' },
        { title: 'Pick the searches', detail: 'We look at who ranks for your services and choose the ones a new site can realistically win.' },
        { title: 'Build and report', detail: 'Starter sites in 7 to 10 business days, then monthly reports on enquiries.' },
      ],
      pricing: PRICING_POINTER,
      proof: [
        {
          name: 'SOCASEMP Donation Platform, Lagos',
          url: 'https://donate.socasemp.org',
          detail: 'A donation platform for SOCASEMP Initiative, a Lagos-based non-profit, with supporter accounts, an admin area and an ambassador programme.',
        },
        {
          name: 'Mansa Luxe Realty, Abuja',
          url: 'https://mansaluxerealty.mrdgngroup.com',
          detail: 'Google impressions grew from 46 a month to 843 a month between May and October 2026. Details on our Abuja page.',
        },
        {
          name: 'MR DGN Construction, Asaba',
          url: 'https://construction.mrdgngroup.com',
          detail: 'Listed first by ChatGPT for cement blocks in Asaba with delivery (our test, 6 November 2026).',
        },
      ],
      localHeading: 'What Lagos searches look like',
      localContext: [
        'On 9 November 2026, page 1 for “SEO company in Lagos” held agency sites, directories such as Clutch and The Manifest, and the map pack had three agencies. That’s a hard page for a new site.',
        'Searches that name a service and a part of Lagos, such as “physiotherapy clinic in Yaba”, have fewer competitors and people closer to buying. That’s where we start.',
      ],
      whyUs: [
        'Honest about what we have done in Lagos so far: one non-profit platform, no SEO case study yet.',
        'Fixed prices, WhatsApp-first communication and no long contracts.',
      ],
      faqs: [
        {
          q: 'Do you have an office in Lagos?',
          a: 'No. We work with Lagos clients over WhatsApp and video calls. Our office address is in Asaba and our founder is based in Abuja.',
        },
        {
          q: 'Can you rank my business for “web design in Lagos” or “SEO company in Lagos”?',
          a: 'Those are among the most crowded searches in Nigeria, so we don’t start there. We aim for searches that name your exact service and area, which are easier to win and bring people closer to buying.',
        },
        {
          q: 'How much does a website cost for a Lagos business?',
          a: 'The same fixed packages as everywhere in Nigeria, listed on the pricing page.',
        },
      ],
      nearby: [
        { label: 'Abuja', href: '/locations/abuja' },
        { label: 'All of Nigeria', href: '/locations/nigeria' },
      ],
      related: ['website-design', 'local-seo', 'landing-pages', 'website-redesign'],
    },
  },
};
