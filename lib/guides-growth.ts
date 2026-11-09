import type { Guide } from '@/lib/guides';

/**
 * Guides added 9 November 2026 from the AnswerThePublic topic list (seo/content-plan-2026-11-09.md).
 * Fees and prices are only stated where the provider's own page or several sources agree; otherwise the reader is
 * sent to the provider's pricing page. Elevate facts: Ufuoma, 9 Nov 2026.
 */

export const launchOnlineStore: Guide = {
  slug: 'launch-online-store-nigeria',
  title: 'How to Launch an Online Store in Nigeria (With Payments)',
  h1: 'How to launch an online store in Nigeria, with payments that work',
  description:
    'Launch an online store in Nigeria: custom code vs Shopify vs WooCommerce, Paystack, Flutterwave, bank transfer and crypto payments, the documents gateways ask for, delivery and the legal basics.',
  published: '2026-11-09',
  image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  keyTakeaways: [
    'Go in this order: choose how you’ll sell, register the business, set up payments, list your products, then sort delivery and your policies.',
    'You can sell on a custom-built site, Shopify, WooCommerce or another platform. The right one depends on your budget, how much control you want and who will run it.',
    'Paystack charges 1.5% + ₦100 on local payments, capped at ₦2,000 per transaction (Paystack’s pricing page). Check every other gateway’s current fees on its own pricing page.',
    'The name on your CAC certificate, bank account and gateway application must match exactly, or onboarding stalls.',
    'Never mark an order paid because the browser says so. Confirm the payment on the server, or by hand for bank transfers.',
  ],
  intro: [
    'Most Nigerian sellers start on WhatsApp and Instagram: a customer asks the price, you send an account number, they send proof of payment, and you check your bank app. It works until you have more orders than you can answer. An online store lets customers see prices, pay and get a confirmation without waiting for you.',
    'We build online stores in custom code and on Shopify or whatever platform a client prefers, and we connect Paystack, Flutterwave, Stripe (for businesses in countries Stripe supports), bank transfer with manual checks, and crypto through NOWPayments. This is the order we follow.',
  ],
  sections: [
    {
      h2: '1. Choose how you’ll sell',
      paragraphs: [
        'You can sell on a marketplace, on your own store, or both. A marketplace such as Jumia or Konga brings buyers but takes a commission and owns the customer relationship. Your own store keeps the customer and the margin, but you have to bring the traffic, which is where SEO and a [Google Business Profile](/guides/google-business-profile-setup-nigeria) come in.',
        'For your own store, the choice is the platform:',
      ],
      table: {
        head: ['', 'Custom-built store', 'Shopify', 'WooCommerce (WordPress)'],
        rows: [
          ['What it is', 'A store coded for your business', 'A hosted store builder with a monthly plan', 'A free plugin on a WordPress site you host'],
          ['Monthly cost', 'Hosting only; no platform fee', 'A monthly plan; prices vary by country, so check shopify.com/ng/pricing', 'Hosting, plus any paid plugins'],
          ['Payments', 'Any gateway you can connect, including bank transfer and crypto', 'Through Shopify’s supported payment apps', 'Paystack, Flutterwave and others through plugins'],
          ['Control and speed', 'Full control; pages can be fast and readable by Google and AI tools', 'Limited checkout changes', 'Flexible, but plugins and updates need looking after'],
          ['Best for', 'Brands that want their own checkout, special payment flows or very fast pages', 'Owners who want to run the store themselves quickly', 'Sellers already on WordPress'],
        ],
      },
      after: [
        'There are also Nigerian store builders made for small sellers. Whatever you pick, check that each product gets its own page Google can read, because that is how people searching for what you sell will find it.',
      ],
    },
    {
      h2: '2. Register the business and prepare the documents',
      paragraphs: [
        'Payment gateways ask for business documents before they release your money. Register your business name with the Corporate Affairs Commission (CAC) on its online portal. Published guides disagree on the current fees, and the CAC has run free registration schemes for small businesses, so check the fee on the CAC portal itself rather than paying an agent’s markup.',
        'Before you apply to any gateway, have these ready:',
      ],
      list: [
        'CAC certificate and business details',
        'BVN and a valid ID for the owner or directors',
        'A bank account in the business name, matching the CAC name exactly',
        'Your Tax Identification Number (TIN)',
        'A website or business page that shows your name, contact details, refund policy and privacy policy',
      ],
    },
    {
      h2: '3. Choose and connect your payment options',
      paragraphs: [
        'Most stores offer more than one way to pay. Here is what we connect and what to know about each. Fees change, so treat the provider’s own pricing page as the source.',
      ],
      table: {
        head: ['Payment option', 'What to know', 'Fees'],
        rows: [
          ['Paystack', 'Cards, bank transfer, USSD; official Shopify and WooCommerce plugins; works for custom stores', '1.5% + ₦100 on local payments, ₦100 waived under ₦2,500, capped at ₦2,000 (Paystack pricing)'],
          ['Flutterwave', 'Cards, transfers and other local methods; good if you also take international payments', 'See Flutterwave’s Nigeria pricing page; third-party trackers report about 2% on local payments'],
          ['Stripe', 'For businesses registered in a country Stripe supports, such as the UK. Nigerian-registered businesses generally can’t open a standard Stripe account; in Nigeria, Stripe works through Paystack', 'See Stripe’s pricing for your country'],
          ['Bank transfer with manual checks', 'No gateway fee. The customer transfers and uploads proof; you confirm the money has arrived before you ship', 'Your bank’s charges only'],
          ['Crypto (NOWPayments)', 'For customers who want to pay in cryptocurrency; you can receive crypto or convert it', 'NOWPayments publishes its own fees; reported at about 0.5% for standard payments'],
        ],
      },
      after: [
        'Paystack and Flutterwave both settle local payments to your bank account the next working day, according to their published terms.',
      ],
    },
    {
      h2: '4. Test the checkout properly',
      paragraphs: [
        'Every gateway has a test mode. Put real products in the store, switch to test keys, and buy one of each type: a successful card payment, a failed one and a cancelled one.',
        'Two rules prevent most problems. First, set up the webhook the gateway gives you, so an order is marked paid even if the customer closes the browser before returning to your site. Second, confirm every payment on your server before you fulfil the order: the page a customer lands on after paying is not proof that they paid. For bank transfers, the same rule means checking your bank, not the screenshot.',
        'Keep secret API keys on the server only, never in the website’s code where anyone can read them.',
      ],
    },
    {
      h2: '5. List products customers can find and trust',
      list: [
        'A clear product name that says what it is, a price, stock status and delivery time',
        'Several real photos taken in good light, from more than one angle',
        'A product page per item, with its own title and description, so Google can show it',
        'Your delivery areas and returns policy linked from every product',
      ],
    },
    {
      h2: '6. Sort out delivery before the first order',
      paragraphs: [
        'Decide which couriers you’ll use for your own city and for other states, what you charge for delivery, and what happens if a delivery fails. Courier rates depend on weight and destination and change often, so get current quotes from GIG Logistics, Kwik, Sendbox or a local rider before you set your delivery fee. Write the policy down and put it on the site.',
      ],
    },
    {
      h2: '7. The legal basics',
      paragraphs: [
        'The Federal Competition and Consumer Protection Act 2018 protects buyers of faulty or wrongly described goods, so a blanket “no refunds” line won’t protect you. Publish a returns policy that says how long customers have, what condition items must be in and how refunds work. The Nigeria Data Protection Act 2023 means you need a privacy notice that says what customer data you collect and why, and marketing messages need consent and a way to opt out.',
      ],
    },
    {
      h2: 'What it costs',
      paragraphs: [
        'A do-it-yourself store can start cheaply: a domain, hosting or a platform plan, and your time. A store built for you costs more upfront and less in lost orders. Our [E-commerce Website and E-commerce Growth Suite](/services/ecommerce) packages have fixed prices on the [pricing page](/pricing), shown in your currency. Gateway fees are charged per sale, so they aren’t part of the launch budget.',
      ],
    },
  ],
  faqs: [
    {
      q: 'What is the best payment gateway in Nigeria?',
      a: 'It depends on your orders. Paystack’s ₦2,000 cap helps on large orders; Flutterwave is useful if you also take international payments; bank transfer with manual checks has no gateway fee. Many stores offer two options.',
    },
    {
      q: 'Paystack or Flutterwave?',
      a: 'Both work well for Nigerian stores and have plugins for Shopify and WooCommerce. Compare their current fees on their own pricing pages against your typical order size, and check which one your customers already trust.',
    },
    {
      q: 'Can I use Stripe in Nigeria?',
      a: 'A business registered in Nigeria generally can’t open a standard Stripe account; Stripe works in Nigeria through Paystack. If your business is registered in a country Stripe supports, such as the UK, we can connect it.',
    },
    {
      q: 'Can my online store accept crypto?',
      a: 'Yes. We connect crypto payments through NOWPayments, alongside card and bank payments.',
    },
    {
      q: 'Do I need to register with CAC to sell online?',
      a: 'Not to start, but payment gateways ask for business documents before releasing larger sums, and a registered name builds trust. Register early and check the current fee on the CAC portal.',
    },
    {
      q: 'Shopify, WooCommerce or a custom store?',
      a: 'Shopify if you want to run it yourself quickly; WooCommerce if you’re already on WordPress; a custom store if you want full control of checkout, payment options and page speed. We build all three.',
    },
  ],
  cta: {
    heading: 'Want the store built and the payments connected?',
    text: 'Tell us what you sell and how customers want to pay. We’ll recommend a platform, connect the payment options and test the checkout before launch.',
    href: '/services/ecommerce',
    label: 'See our e-commerce websites',
  },
  sources: [
    { label: 'Paystack: transaction pricing', url: 'https://support.paystack.com/en/articles/2130306' },
    { label: 'Flutterwave: pricing (Nigeria)', url: 'https://flutterwave.com/ng/pricing' },
    { label: 'Shopify: pricing (Nigeria)', url: 'https://www.shopify.com/ng/pricing' },
    { label: 'Stripe: Nigeria availability', url: 'https://docs.stripe.com/payments/countries/nigeria' },
    { label: 'NOWPayments: fees guide', url: 'https://nowpayments.notion.site/A-Full-Guide-on-NOWPayments-Fees-and-Discounts-3b4b318f4ddb8002a402f4cd800bcdf8' },
    { label: 'Corporate Affairs Commission: registration portal', url: 'https://pre.cac.gov.ng' },
  ],
};

export const gbpSetup: Guide = {
  slug: 'google-business-profile-setup-nigeria',
  title: 'Google Business Profile Setup in Nigeria: Step by Step',
  h1: 'How to set up a Google Business Profile in Nigeria, step by step',
  description:
    'Set up a Google Business Profile in Nigeria (Abuja, Asaba, Lagos or anywhere): the right name and category, address or service area, verification, services, photos and honest reviews.',
  published: '2026-11-09',
  image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
  keyTakeaways: [
    'A Google Business Profile is free and is how you appear on Google Maps and in the map results for searches near you.',
    'Use your real business name, the main category that describes what you are, and the address where you serve customers, or hide it if you go to them.',
    'Verification is often a short video showing your signage, premises and proof you run the business.',
    'Add every service, real photos and your hours, then ask every customer for an honest review.',
    'Put the same name, address and phone number on your website and everywhere else online.',
  ],
  intro: [
    'When business owners ask me how to get more clients, this is where I start. People search for what they need, Google shows a map with three businesses, and most calls go to those three. A complete Google Business Profile is how you get into that map, and it costs nothing.',
  ],
  sections: [
    {
      h2: 'Before you start',
      list: [
        'A Google account you’ll keep (a business Gmail is fine)',
        'Your exact business name as it appears on your signage',
        'A phone number you’ll keep for years, the same one on your website and WhatsApp',
        'Your address, or the areas you serve if customers don’t come to you',
        'Real photos of your premises, team and work',
      ],
    },
    {
      h2: 'Step by step',
      table: {
        head: ['Step', 'What to do', 'Common mistake'],
        rows: [
          ['1. Create or claim', 'Go to business.google.com and search for your business; claim it if it exists, otherwise add it', 'Creating a second profile when one already exists'],
          ['2. Name', 'Your real business name, exactly as on your signage', 'Adding keywords or a city to the name; Google can suspend profiles for it'],
          ['3. Category', 'The main category that describes what you are, then a few secondary ones', 'Choosing a category for something you only do occasionally'],
          ['4. Location', 'The address where customers visit you, or a service area with the address hidden', 'Using an address where you don’t work during your listed hours'],
          ['5. Contact', 'Your phone number and website', 'A different number from the one on your website'],
          ['6. Verify', 'Follow Google’s method; it is often a short video of your signage, premises and tools', 'Filming somewhere that doesn’t match the address'],
          ['7. Services and hours', 'Every service, named the way customers say it, plus opening hours', 'Leaving services empty'],
          ['8. Photos and description', 'Real photos and a plain description of what you do and where', 'Stock photos'],
        ],
      },
    },
    {
      h2: 'After verification: what keeps you on the map',
      paragraphs: [
        'Google ranks local results on relevance, distance and prominence. You can’t change how close you are, but you can make your profile match what people search for and build prominence over time.',
      ],
      list: [
        'Ask every customer for an honest review with a short WhatsApp message and link. Never offer anything for a review or ask only the happy ones.',
        'Reply to every review, good or bad.',
        'Add new photos every month.',
        'Give each service its own page on your website, with your city in the title, and link it from the profile.',
        'Keep your name, address and phone number identical on Google, Bing Places, Apple Business, Facebook and directories such as VConnect.',
      ],
    },
    {
      h2: 'Abuja, Asaba and service areas',
      paragraphs: [
        'If you visit customers or work from home, set a service area and hide your address. Google expects the service area to be within a reasonable drive of where you are based, so a business in Asaba can’t list Abuja as a service area and expect to appear on the Abuja map. For a city you serve remotely, a strong page on your website is the better route; that’s how we approach [Abuja](/locations/abuja) and [Lagos](/locations/lagos).',
      ],
    },
  ],
  faqs: [
    {
      q: 'Is a Google Business Profile free?',
      a: 'Yes. Creating, verifying and managing a profile is free.',
    },
    {
      q: 'How long does Google Business Profile verification take?',
      a: 'It varies. Video verification can be reviewed within days, but some profiles take longer, especially after edits. Don’t change the name or address while verification is pending.',
    },
    {
      q: 'Why is my Google Business Profile only visible to me?',
      a: 'Usually because it isn’t verified yet, is under review after an edit, or has been suspended. Open it while signed in to see its status.',
    },
    {
      q: 'Can I set up a profile without an office?',
      a: 'Yes, as a service-area business with your address hidden, if you serve customers at their location.',
    },
    {
      q: 'Can you set up my Google Business Profile for me?',
      a: 'Yes. Setup or cleanup is included in our Starter Website, and our local SEO service covers the whole profile, the matching website pages and the review system.',
    },
  ],
  cta: {
    heading: 'Want it done properly the first time?',
    text: 'We set up or clean up your Google Business Profile and build the website pages that match it.',
    href: '/services/local-seo',
    label: 'See local SEO and Google Business Profile',
  },
  sources: [
    { label: 'Google: Tips to improve your local ranking', url: 'https://support.google.com/business/answer/7091' },
    { label: 'Google: Guidelines for representing your business', url: 'https://support.google.com/business/answer/3038177' },
    { label: 'Google: Verify your business', url: 'https://support.google.com/business/answer/7107242' },
  ],
};
