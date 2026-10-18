import { STATIC_PRICING_FALLBACK } from '@/lib/pricing-config';

/** Long-form guides at /guides/[slug]. Paragraphs and list items accept **bold** and [text](/path) links. */
export interface Guide {
  slug: string;
  title: string;
  h1: string;
  description: string;
  published: string;
  intro: string[];
  sections: { h2: string; paragraphs?: string[]; list?: string[]; after?: string[] }[];
  faqs: { q: string; a: string }[];
  cta: { heading: string; text: string; href: string; label: string };
  sources: { label: string; url: string }[];
}

const gb = STATIC_PRICING_FALLBACK.GB;
const gbp = (n: number) => `£${n.toLocaleString('en-GB')}`;

const whyNotOnGoogle: Guide = {
  slug: 'why-your-website-isnt-on-google',
  title: 'Why Your Website Isn’t on Google or ChatGPT',
  h1: 'Why your website isn’t on Google or ChatGPT (and how to fix it)',
  description:
    'Why a website doesn’t show up on Google or ChatGPT: no Search Console, no sitemap, pages crawlers can’t read, no Bing or schema, and how to fix each one.',
  published: '2026-10-18',
  intro: [
    'The most common complaint I hear from business owners is this: “My website is fine. It looks nice. But nobody is reaching out.” The site is online, but it isn’t useful, because the people searching for what the business sells never see it.',
    'A website should be a reliable source of customers. Here are the reasons it usually isn’t, in the order I check them, and what to do about each one.',
  ],
  sections: [
    {
      h2: 'First, a two-minute test',
      list: [
        'Type **site:yourdomain.com** into Google. If nothing comes up, Google hasn’t indexed your site at all.',
        'Search for your main service and your town. Are you on the map or on page one?',
        'Ask ChatGPT for “the best [your service] in [your town]”. Are you mentioned?',
        'Run our [free AI visibility check](/ai-visibility-check) to see what Google and AI crawlers actually receive from your homepage.',
      ],
    },
    {
      h2: '1. Your site was never submitted to Google Search Console',
      paragraphs: [
        'Google Search Console is Google’s free dashboard for website owners. It’s where you prove you own the site, see which pages Google has indexed, see what people searched before they found you, and ask Google to look at a new page.',
        'Many websites are launched and never added to it. Google can still find a site on its own through links, but a new site with no links can wait a long time. Adding the site and requesting indexing for your main pages is the first fix.',
      ],
    },
    {
      h2: '2. No sitemap was submitted',
      paragraphs: [
        'A sitemap is a file that lists every page on your website, so search engines don’t have to guess. Google says a sitemap helps it crawl your site more efficiently, especially when the site is new or has few links pointing to it.',
        'Most website builders create one at yourdomain.com/sitemap.xml. It still has to be submitted in Search Console, and it should only list real pages you want people to find.',
      ],
    },
    {
      h2: '3. Search engines can’t read your pages',
      paragraphs: [
        'This is the one most people never hear about. Some websites look perfect in a browser but send almost nothing to search engines, because the text only appears after JavaScript code runs. Google can usually run that code later, but it says server-side rendering is still a good idea because not all crawlers can. The crawlers behind ChatGPT, Claude and Perplexity mostly read the raw page without running it.',
        'When we first checked the MR DGN Group website, search engines received 0 readable words. After we rebuilt it with server-side rendering, they received over 400. Sites made with some AI builders had the same problem: read our guide on [Lovable, Wix and Squarespace sites that don’t show up on Google](/guides/lovable-wix-squarespace-seo).',
      ],
    },
    {
      h2: '4. Your site isn’t on Bing',
      paragraphs: [
        'Google is the biggest search engine, but it isn’t the only one that matters. Bing’s index powers Microsoft Copilot and is one of the sources AI search tools draw on. If you only submit to Google, you’re leaving out a route to AI answers.',
        'Bing Webmaster Tools is free and can import your site straight from Google Search Console. IndexNow then lets your site tell Bing about new or changed pages straight away.',
      ],
    },
    {
      h2: '5. There’s no structured data for search engines and AI',
      paragraphs: [
        'Structured data (also called schema) is a small block of code that tells search engines, in their own language, who you are: your business name, what you do, where you work, your phone number, your services and your FAQs. People never see it, but Google and AI tools use it to understand the page and trust the details.',
        'Most websites have none, or only the generic block a theme adds. Every site we build includes it, matched to your Google Business Profile.',
      ],
    },
    {
      h2: '6. A setting is hiding your site',
      paragraphs: [
        'Sometimes the fix is a single switch. Check for any of these:',
      ],
      list: [
        'A “noindex” setting on the page or the whole site. WordPress has “Discourage search engines from indexing this site”; Wix and Squarespace have similar toggles.',
        'A robots.txt file that blocks crawlers.',
        'A password or “coming soon” page left on after launch.',
        'The site still running on a free subdomain (like yourname.wixsite.com) instead of your own domain.',
      ],
    },
    {
      h2: '7. There’s no page for what people search',
      paragraphs: [
        'Think about how you search TikTok, Instagram or YouTube for a video you saw a while back. The app pieces together what you typed and what it has, and shows its best match, because it wants you to stay. Google works the same way: it looks at what the person searched and where they are, and tries to show the page that answers it best.',
        'So if all your services sit on one page, Google has little to match. A separate page for each service, with your town in the title and answers to the questions your customers actually ask, gives Google something to show. See how we structure this in our [SEO-ready website design](/services/website-design).',
      ],
    },
    {
      h2: '8. Your Google Business Profile is missing or incomplete',
      paragraphs: [
        'For local searches, the map results appear above the websites. If you serve customers in a town or city, you need a verified Google Business Profile with the right category, your services, real photos and real reviews, and the services on it should match the pages on your website. Our [local SEO service](/services/local-seo) sets this up.',
      ],
    },
    {
      h2: '9. You’re ignoring the smaller searches',
      paragraphs: [
        'Lagos, Abuja and Port Harcourt get a lot of searches, so everyone fights for them. Smaller towns get fewer searches, and that’s exactly why most businesses ignore them. But the people there are still searching. If your website is the one that answers them, you get those customers with far less competition.',
      ],
    },
    {
      h2: 'What fixing it looks like in practice',
      paragraphs: [
        'MR DGN Construction, a building materials supplier in Asaba, had a site that wasn’t readable by search engines, had no service or product pages, and wasn’t in Google Search Console. We fixed all of that, added structured data and connected it to Bing. On 28 September 2026 the owner received an enquiry from a buyer who had found the company through ChatGPT.',
      ],
    },
  ],
  faqs: [
    {
      q: 'How long does it take Google to index a new website?',
      a: 'Anywhere from a few days to a few weeks. Submitting the site and its sitemap in Google Search Console and requesting indexing for the main pages usually speeds it up. Being indexed is not the same as ranking well: that takes longer.',
    },
    {
      q: 'My site is on Google, so why isn’t it in ChatGPT?',
      a: 'AI tools rely on pages they can read without running JavaScript, on sources like Bing, and on other websites that mention you. A site that Google renders fine may still look empty to AI crawlers. Run the free AI visibility check to see what they receive.',
    },
    {
      q: 'Do I have to pay Google to show up?',
      a: 'No. The normal search results and the map results are free. Paid ads are a separate thing, and they stop the day you stop paying.',
    },
    {
      q: 'Does submitting my site guarantee I’ll rank?',
      a: 'No. Submitting only makes sure Google knows your pages exist. Ranking depends on how well your pages answer the search, where the person is, and how well known and reviewed your business is.',
    },
  ],
  cta: {
    heading: 'Want us to check your site?',
    text: 'Send us your website or business name. We’ll check whether Google and ChatGPT can find and read it, tell you what to fix, and quote a fixed price if you want us to do it.',
    href: '/services/website-redesign',
    label: 'See our website redesign service',
  },
  sources: [
    { label: 'Google: Get your website on Google', url: 'https://developers.google.com/search/docs/fundamentals/get-on-google' },
    { label: 'Google: Sitemaps overview', url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview' },
    { label: 'Google: JavaScript SEO basics', url: 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics' },
    { label: 'Google: Intro to structured data', url: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data' },
    { label: 'Bing: IndexNow', url: 'https://www.bing.com/indexnow' },
    { label: 'OpenAI: Overview of OpenAI crawlers', url: 'https://platform.openai.com/docs/bots' },
  ],
};

const builders: Guide = {
  slug: 'lovable-wix-squarespace-seo',
  title: 'Lovable, Wix and Squarespace Sites Not on Google?',
  h1: 'Lovable, Wix or Squarespace site not showing on Google?',
  description:
    'Why Lovable, Wix and Squarespace sites often don’t show up on Google or ChatGPT, what changed in 2026, how to check yours, and when you need a rebuild.',
  published: '2026-10-18',
  intro: [
    'Website builders make it easy to get a good-looking site online in a day. Getting that site found is a different job, and each builder has its own usual problems. Lovable is the one I’ve had to fix most often.',
  ],
  sections: [
    {
      h2: 'Lovable: the rendering problem',
      paragraphs: [
        'Lovable used to build every site as a client-side React app. The page arrived almost empty, and the text only appeared after JavaScript ran in the browser. From my own work: even after submitting these sites to Google Search Console, they still had to be restructured with server-side rendering before Google and AI crawlers could properly read them.',
        'This has changed. According to Lovable’s own documentation, projects created from 13 May 2026 use server-side rendering (TanStack Start), so crawlers get the full page on the first request. Older projects get pre-rendered pages served only to verified crawlers such as Googlebot and Bingbot, and they can be upgraded to the new setup, which uses Lovable credits.',
      ],
      list: [
        '**Built before May 2026 and hosted on Lovable:** verified crawlers get a pre-rendered copy. Third-party checkers (ours included) aren’t verified, so they may show your page as empty even when Google sees it. Use the URL Inspection tool in Google Search Console to see what Google gets.',
        '**Built before May 2026 and exported to Vercel, Netlify or elsewhere:** you don’t get Lovable’s pre-rendering. Most crawlers will see an empty page until the site is upgraded or rebuilt.',
        '**Built after May 2026:** rendering is handled, but the rest still isn’t. Lovable says it doesn’t always create a sitemap, and the starting titles and descriptions are generic.',
      ],
    },
    {
      h2: 'Wix: usually a settings or content problem',
      paragraphs: [
        'Wix sends readable pages to search engines, and Wix says every page on a live site can be indexed by default. When a Wix site doesn’t show up, it’s usually one of these:',
      ],
      list: [
        'The “Let search engines index this page” toggle is off for a page, or the whole site is hidden from search.',
        'The site is still on a free yourname.wixsite.com address instead of your own domain.',
        'The site was never connected to Google Search Console.',
        'All the services are on one page, so there’s nothing specific for Google to match.',
        'Titles and descriptions were left as the template’s defaults.',
      ],
    },
    {
      h2: 'Squarespace: hidden pages and thin structure',
      paragraphs: [
        'Squarespace also sends readable pages and creates a sitemap at yourdomain.com/sitemap.xml automatically. The common problems are:',
      ],
      list: [
        'The site-wide “Block search engine crawlers” setting is on, or individual pages have “Hide page from search results” switched on.',
        'The site is still password-protected or in trial after launch.',
        'The site was never verified in Google Search Console.',
        'A one-page layout with every service on the homepage.',
        'Blank SEO titles and descriptions on most pages.',
      ],
    },
    {
      h2: 'How to check your site in five minutes',
      list: [
        'Open your site, press Ctrl+U (or Cmd+Option+U on a Mac) to view the page source, and search for your main headline. If it isn’t there, crawlers that don’t run JavaScript can’t see it either.',
        'In Google Search Console, use URL Inspection on your homepage and click “View crawled page”.',
        'Type **site:yourdomain.com** into Google to see how many of your pages are indexed.',
        'Run the [free AI visibility check](/ai-visibility-check) for a quick score.',
      ],
    },
    {
      h2: 'Fixing rendering is only the start',
      paragraphs: [
        'Once crawlers can read your site, the same rules apply as for any website: one page per service, titles that say what you do and where, answers to the questions your customers ask, structured data, a submitted sitemap, Bing as well as Google, and a matching Google Business Profile. Our guide on [why your website isn’t on Google or ChatGPT](/guides/why-your-website-isnt-on-google) goes through each one.',
      ],
    },
    {
      h2: 'Do you need a rebuild?',
      list: [
        '**Wix or Squarespace:** usually not. Fix the settings, connect Search Console, and split your services into proper pages first.',
        '**Lovable built before May 2026:** upgrade the project or rebuild it with server-side rendering. If it’s exported and hosted elsewhere, this matters even more.',
        '**Any builder, but the site has no service pages and brings no enquiries:** a [website redesign](/services/website-redesign) that keeps your existing addresses and adds redirects is often faster than patching.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Is Wix bad for SEO?',
      a: 'No. Wix sends readable pages and has the settings you need. Most Wix sites that don’t rank are missing service pages, have default titles, or were never added to Google Search Console.',
    },
    {
      q: 'Can a Lovable site rank on Google in 2026?',
      a: 'Yes, if it’s rendered properly and built well. New Lovable projects are server-rendered. Older ones should be upgraded, especially if they’re hosted outside Lovable.',
    },
    {
      q: 'Will moving my site to a new platform lose my rankings?',
      a: 'It can, if old page addresses stop working. A careful move keeps the same addresses where possible and redirects the rest, so Google carries your rankings across.',
    },
  ],
  cta: {
    heading: 'Not sure what’s wrong with your site?',
    text: 'Send us your website. We’ll check what Google and ChatGPT can read, tell you whether it needs a fix or a rebuild, and quote a fixed price.',
    href: '/services/website-redesign',
    label: 'See our website redesign service',
  },
  sources: [
    { label: 'Lovable: Optimize your app for SEO and AI search', url: 'https://docs.lovable.dev/features/seo-aeo' },
    { label: 'Lovable: Upgrade a project to TanStack Start', url: 'https://docs.lovable.dev/features/upgrade-to-tanstack-start' },
    { label: 'Wix: Site not appearing in search engine results', url: 'https://support.wix.com/en/article/site-not-appearing-in-search-engine-results' },
    { label: 'Squarespace: Hiding your site from search results', url: 'https://support.squarespace.com/hc/en-us/articles/21829426828045-Hiding-your-site-from-search-results' },
    { label: 'Squarespace: Why doesn’t my site appear in Google search results?', url: 'https://support.squarespace.com/hc/en-us/articles/205813898-Why-doesn-t-my-site-appear-in-Google-search-results' },
    { label: 'Google: JavaScript SEO basics', url: 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics' },
  ],
};

const ukCost: Guide = {
  slug: 'website-cost-uk',
  title: 'How Much Does a Website Cost in the UK in 2026?',
  h1: 'How much does a website cost in the UK in 2026?',
  description:
    'Typical UK website prices in 2026 for DIY builders, freelancers and agencies, the running costs after launch, and the questions to ask before you pay a quote.',
  published: '2026-10-18',
  intro: [
    'The honest answer is anything from a few pounds a month to tens of thousands. The useful answer depends on what the website has to do. Here are typical UK prices in 2026, what changes them, and how to judge a quote.',
  ],
  sections: [
    {
      h2: 'Typical UK prices in 2026',
      paragraphs: [
        'These ranges come from UK web agencies’ own 2026 pricing guides, so treat them as rough market rates rather than official figures:',
      ],
      list: [
        '**DIY website builder (Wix, Squarespace):** about £9 to £119 a month on Wix and £12 to £79 on Squarespace, before VAT, plus your own time.',
        '**Freelancer, 5-page brochure site:** about £500 to £3,000, depending on experience.',
        '**Agency, small brochure site:** about £3,000 to £12,000. London agencies are often quoted at £8,000 to £25,000.',
        '**Online shop:** about £5,000 to £20,000 or more through an agency.',
      ],
      after: [
        'One guide puts the typical spend for most UK small businesses at £3,000 to £6,000, and warns that copywriting, photography and SEO can add 30 to 50% to a quote that leaves them out.',
      ],
    },
    {
      h2: 'Running costs after launch',
      list: [
        '**Domain:** about £10 to £15 a year for a .co.uk.',
        '**Hosting:** roughly £7 to £18 a month for most small sites.',
        '**Maintenance or care plan:** from about £25 a month for basic updates and backups, and £100 to £500 a month for ongoing content and SEO work.',
      ],
      after: ['Altogether, a typical small business site costs about £500 to £2,500 a year to run.'],
    },
    {
      h2: 'What actually changes the price',
      list: [
        'How many pages, and whether each service gets its own page.',
        'Who writes the words. Good copy that answers your customers’ questions takes time.',
        'Bookings, payments, memberships or a shop.',
        'Whether SEO setup is included or sold later as an extra.',
        'How many rounds of changes you get after the first draft.',
      ],
    },
    {
      h2: 'The expensive mistake: a nice site nobody finds',
      paragraphs: [
        'Most clients ask me how the site will look and how long it will take. Those matter. But a beautiful website that doesn’t show up when your customers search is money spent for nothing. The real question is: when someone near you has the problem you solve and searches for it, will your business be the one they find?',
        'That’s why the cheapest quote can be the most expensive. Read [why websites don’t show up on Google or ChatGPT](/guides/why-your-website-isnt-on-google) before you compare prices.',
      ],
    },
    {
      h2: 'Questions to ask before you pay any quote',
      list: [
        'Will I own the website and the domain once it’s paid for?',
        'Is Google Search Console, Bing, a sitemap and structured data included?',
        'Will the pages be readable without JavaScript?',
        'Does each service get its own page?',
        'How many rounds of changes are included, and how long will it take?',
        'What will I pay each month after launch?',
        'Can I see live sites you’ve built that bring in enquiries?',
      ],
    },
    {
      h2: 'What we charge UK clients',
      paragraphs: [
        `We’re a small team based in Nigeria working remotely with UK clients, which keeps our costs lower than a UK agency’s. Our fixed prices: **Starter Website ${gbp(gb.starter.amount)}**, **Business Website ${gbp(gb.business.amount)}**, and care plans from ${gbp(gb.google_growth.amount)} a month. Every site includes the SEO setup above, not as an extra.`,
        'A detailed site with several services usually takes one to two weeks, including the changes after the first draft. See [SEO websites for UK small businesses](/uk) for how we work with UK clients, or the full [pricing page](/pricing).',
      ],
    },
  ],
  faqs: [
    {
      q: 'Why do some websites cost £300 and others £10,000?',
      a: 'The cheap ones are usually a template with your logo and little else. The expensive ones include strategy, original copy, custom design and SEO, and agency overheads. Compare what’s included, not just the price.',
    },
    {
      q: 'Is a cheap website worth it?',
      a: 'Only if it still gets you found. A low price is fine if the site has a page per service, is readable by search engines and AI, and is set up in Google Search Console. If not, you’ll pay again later.',
    },
    {
      q: 'Do I have to pay monthly for a website?',
      a: 'You’ll always pay for a domain and hosting. A care plan is optional, but someone has to keep the site updated, backed up and secure.',
    },
    {
      q: 'How long does a small business website take?',
      a: 'A simple site can be ready in about a week. A detailed site with several services usually takes one to two weeks, including changes after the first draft.',
    },
  ],
  cta: {
    heading: 'Get a fixed quote',
    text: 'Tell us what your business does and what you need the website to do. We’ll check your current site for free and send a fixed price in pounds.',
    href: '/uk',
    label: 'See how we work with UK businesses',
  },
  sources: [
    { label: 'Kwiboo: How much does a website cost in the UK? A 2026 breakdown', url: 'https://www.kwiboo.com/blog/How-much-does-a-website-cost-in-the-UK-A-2026-breakdown' },
    { label: 'Whito: Website design costs UK', url: 'https://whito.co.uk/research/website-design-costs-uk/' },
  ],
};

export const guides: Guide[] = [whyNotOnGoogle, builders, ukCost];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
