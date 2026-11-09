import type { ServicePageConfig } from '@/lib/services-content';

export const websiteRedesign: ServicePageConfig = {
  slug: 'website-redesign',
  type: 'service',
  title: 'Website Redesign',
  subtitle: 'Rebuild an old or invisible site without losing what works',
  description:
    'Website redesign in Abuja: we audit your current site, rebuild it so search engines and AI tools can read it, keep your existing rankings and links, and make it easier for customers to contact you.',
  detail: {
    metaTitle: 'Website Redesign in Abuja',
    metaDescription:
      'Website redesign in Abuja: we rebuild slow, outdated or JavaScript-only sites so Google and ChatGPT can read them, without losing your rankings. Free audit.',
    h1: 'Website redesign in Abuja',
    updated: '2026-11-09',
    keyTakeaways: [
      'A redesign should fix why the site isn’t bringing enquiries, not only how it looks.',
      'We keep the pages Google already shows, redirect the ones that change, and rebuild the rest as clear service pages.',
      'Sites built with JavaScript-only builders often send search engines an empty page; we rebuild them so every page is readable.',
      'Before and after, we check what Google and ChatGPT can see.',
    ],
    evidenceIds: ['real-estate-abuja-asaba'],
    intro: [
      'A redesign is worth doing when your site is costing you customers: it’s slow, it looks dated, it hides your contact details, or search engines can’t read it at all.',
      'That last problem is more common than most owners realise. Many sites built with quick website builders or AI app generators send search engines an empty page, and the content only appears after JavaScript runs in a browser. Google can sometimes read it later; ChatGPT, Claude and Perplexity usually can’t. A redesign with us fixes the foundations first, then the look.',
    ],
    problems: [
      'Your site was built with Lovable, Bolt, a Vite or React template, or another tool, and it doesn’t appear in Google or AI answers.',
      'It looks outdated next to competitors, or doesn’t match your current brand.',
      'Visitors can’t find your prices, location or WhatsApp number.',
      'It’s slow on a phone, especially on mobile data.',
      'Every small text change needs a developer and takes days.',
      'You’re worried a redesign will lose the Google traffic you already have.',
    ],
    included: [
      {
        title: 'Free before-and-after audit',
        detail:
          'We run our crawler check on your current site and record how many words, headings and links search engines actually receive, plus your titles, sitemap and structured data.',
      },
      {
        title: 'Keep what already ranks',
        detail:
          'We list your pages that get traffic in Search Console, keep their content, and set up 301 redirects from every old address that changes, so links and rankings carry over.',
      },
      {
        title: 'Rebuild on a server-rendered stack',
        detail:
          'Pages are rebuilt in Next.js, so the full text reaches search engines and AI crawlers on the first request. If you need to keep your current stack, we can add pre-rendering instead.',
      },
      {
        title: 'Clearer structure and contact paths',
        detail:
          'One page per service, prices or price ranges where you’re happy to publish them, and WhatsApp, call and quote buttons on the first screen.',
      },
      {
        title: 'Design refresh',
        detail: 'A modern layout in your brand colours and fonts, with real photos of your work instead of stock images.',
      },
      {
        title: 'Relaunch checks',
        detail: 'Sitemap resubmitted to Google and Bing, redirects tested, and our crawler check run again to confirm the fix.',
      },
    ],
    process: [
      {
        title: 'Audit',
        detail: 'We check your current site and send you a short report with what’s working and what’s blocking you.',
      },
      {
        title: 'Plan',
        detail: 'We agree which pages stay, which merge, which are new, and how each old address redirects.',
      },
      {
        title: 'Design and rebuild',
        detail: 'We redesign and rebuild on a preview link while your current site stays live.',
      },
      {
        title: 'Switch over',
        detail: 'We move the domain to the new site, turn on redirects and resubmit the sitemap.',
      },
      {
        title: 'Watch the first month',
        detail: 'We check Search Console for errors and lost pages for 30 days after launch, included in the price.',
      },
    ],
    pricing: {
      summary:
        'Most redesigns follow our Starter (₦250,000) or Business (₦450,000) website packages, depending on how many pages you need.',
      points: [
        'Small business site redesign: from ₦250,000, using our standard website packages.',
        'Larger sites, e-commerce or a move away from a JavaScript-only app: quoted after a free audit, usually ₦600,000 to ₦1,000,000.',
        'What changes the price: the number of pages to migrate, redirects needed, and whether new copy and photos are required.',
      ],
    },
    proof: [
      {
        name: 'MR DGN Group',
        url: 'https://www.mrdgngroup.com',
        detail:
          'The site was a JavaScript-only app: our crawler check found 0 readable words, no heading and no links in what search engines received. After the rebuild, the homepage serves over 400 words of real content and passes every blocking check.',
      },
      {
        name: 'MR DGN Construction',
        url: 'https://construction.mrdgngroup.com',
        detail:
          'Rebuilt around what buyers search for, with a page title targeting “Building Materials in Asaba” and over 600 words readable by search engines.',
      },
    ],
    localContext: [
      'Many Abuja businesses got their first website from a template, a friend, or an app builder. These sites often look acceptable but are invisible to search engines, which is why the business gets no enquiries from Google even after paying for a site.',
      'We keep redesigns light for mobile data, and we add the trust details local customers check before they pay: a real address with a landmark, CAC registration, named staff and real photos.',
    ],
    whyUs: [
      'We measure your site before and after with the same crawler check, so you can see the difference in numbers.',
      'We protect your existing Google traffic with redirects instead of starting from zero.',
      'We fix the cause, such as JavaScript-only rendering, not only the colours.',
      'Fixed prices in naira, agreed before we start.',
    ],
    faqs: [
      {
        q: 'How soon will I see results?',
        a: 'In our experience, once the site is built properly and submitted to Google Search Console, it takes about three weeks for Google to build up its picture of the site, and that’s often when the first calls come. Competitive searches take longer, and we don’t promise dates or positions.',
      },
      {
        q: 'How do I pay, and is there a contract?',
        a: 'Most projects are invoiced. Big projects that run for months are paid 50% upfront and 50% on delivery. We don’t lock you into a long contract.',
      },
      {
        q: 'Will I lose my Google rankings if I redesign my website?',
        a: 'Not if the move is planned. We keep the content of pages that already rank and set up 301 redirects from every old address that changes. Rankings can wobble for a few weeks after any relaunch, so we watch Search Console closely.',
      },
      {
        q: 'My site was built with Lovable or another AI builder. Can you fix it?',
        a: 'Yes. These tools usually build a JavaScript app that sends search engines an almost empty page. We either rebuild the public pages on Next.js or add pre-rendering, so the text is in the HTML.',
      },
      {
        q: 'How do I know if search engines can read my current site?',
        a: 'Send us your website address on WhatsApp and we’ll run our crawler check for free. It shows how many words, headings and links reach Google and AI crawlers without JavaScript.',
      },
      {
        q: 'Can you redesign the site without changing my domain or email?',
        a: 'Yes. Your domain and your business email stay the same. We only change where the domain points for the website.',
      },
    ],
    nearby: [
      { label: 'Abuja', href: '/locations/abuja' },
      { label: 'Katampe Extension', href: '/locations/katampe-extension' },
      { label: 'Guzape', href: '/locations/guzape' },
      { label: 'Asaba', href: '/locations/asaba' },
      { label: 'Okpanam', href: '/locations/okpanam' },
      { label: 'Lagos', href: '/locations/lagos' },
    ],
    related: ['website-design', 'local-seo', 'website-maintenance', 'landing-pages'],
  },
};
