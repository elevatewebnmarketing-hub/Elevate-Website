/**
 * FAQ page content (rebuilt 9 Nov 2026).
 * Questions come from three places: what clients ask Ufuoma (the first group), real Search Console queries for this
 * site, and Google's "People also ask" boxes pulled with DataForSEO (seo/data/dataforseo-2026-11-09/paa/).
 * Answers in Ufuoma's own experience are marked "in our experience". The pricing answer is filled in by the page.
 */

export interface FaqItem {
  q: string;
  a: string;
  link?: { label: string; href: string };
}

export interface FaqGroup {
  id: string;
  heading: string;
  items: FaqItem[];
}

export const PRICING_QUESTION = 'How much does a website cost?';

export const faqGroups: FaqGroup[] = [
  {
    id: 'more-clients',
    heading: 'Getting more clients',
    items: [
      {
        q: 'How can I get more clients for my business?',
        a: 'It’s the question we get asked most. Start where people already look: set up your Google Business Profile with your address, opening hours, photos and the services you sell, so people searching nearby can find you on the map and drive to you. Use exactly the same business name, address and phone number everywhere online. Then claim the searches nobody else is answering properly, such as “[your service] near me” and “[your service] in [your area]”, with a page on your website for each one. In our experience those easy, local searches are where new clients come from first.',
        link: { label: 'How to get more customers', href: '/how-to-get-more-customers' },
      },
      {
        q: 'How do I get my business on Google Maps?',
        a: 'Create or claim a free Google Business Profile, choose the right main category, add the services you offer, and verify it; Google often asks for a short video. If customers come to you, use the address where you serve them. If you go to them, list as a service-area business and hide the address.',
        link: { label: 'Local SEO and Google Business Profile', href: '/services/local-seo' },
      },
      {
        q: 'Can a small business win “near me” searches?',
        a: 'Yes. “Near me” results depend mostly on how close you are, how clearly your profile and website say what you offer, and how well known and reviewed you are. A small business near the searcher, with a complete profile and a matching page on its website, can beat a bigger one further away.',
      },
      {
        q: 'What is NAP consistency, and does it matter?',
        a: 'NAP is your business name, address and phone number. Google checks them against your website, your profile and directories such as Bing, Apple Maps, Facebook and VConnect. When they disagree, for example an old phone number on one site, Google is less sure which details are right, and that can hold you back on the map.',
      },
      {
        q: 'Do I need a website if I already sell on Instagram and WhatsApp?',
        a: 'If you want people who don’t follow you yet to find you, yes. Instagram posts rarely appear when someone searches Google for what you sell, and ChatGPT can’t read most of them. A website gives Google and AI tools pages to show, and sends the enquiries to your WhatsApp anyway.',
      },
    ],
  },
  {
    id: 'google-ai',
    heading: 'Showing up on Google and AI search',
    items: [
      {
        q: 'Why is my business not showing up on Google?',
        a: 'The usual reasons: the website was never submitted to Google Search Console, so Google hasn’t indexed it; the site is built in a way crawlers can’t read; there is one “Services” page instead of a page per service; or the Google Business Profile is missing, unverified or in the wrong category. Search Console tells you which of these it is.',
        link: { label: 'Why your website isn’t on Google', href: '/guides/why-your-website-isnt-on-google' },
      },
      {
        q: 'Why doesn’t my business show up in ChatGPT?',
        a: 'ChatGPT recommends businesses it can read about. If your site only shows its text after JavaScript runs, many AI crawlers see an empty page. If your services, area and contact details aren’t written plainly, or other sites don’t mention you, it has nothing to go on. Fix the website first, then get listed and mentioned elsewhere.',
        link: { label: 'How to get recommended by ChatGPT', href: '/guides/how-to-get-recommended-by-chatgpt' },
      },
      {
        q: 'Can you get ChatGPT to recommend my business?',
        a: 'Nobody can force it. We can make sure ChatGPT can read your website, that your facts match across the web, and that you’re mentioned where it looks. That is how MR DGN Construction became ChatGPT’s first answer for cement blocks in Asaba in our test on 6 November 2026.',
        link: { label: 'Free AI visibility check', href: '/ai-visibility-check' },
      },
      {
        q: 'Why is my Google Business Profile only visible to me?',
        a: 'Usually because it isn’t verified yet, it’s still under review after an edit, or it has been suspended. Open the profile while signed in; Google shows the status there. A profile that isn’t verified won’t appear to customers.',
      },
      {
        q: 'How can I see which of my pages Google has indexed?',
        a: 'For a quick look, search Google for site:yourdomain.com. That shows a sample, not the full list. The real count is the Pages report in Google Search Console, which also tells you why any page isn’t indexed.',
      },
      {
        q: 'Do I need schema markup to show up in AI answers?',
        a: 'Google says no special markup is needed for its AI features. Schema still helps with normal rich results, and it must match what’s visible on the page. For AI answers, readable text and consistent facts about your business matter more.',
      },
    ],
  },
  {
    id: 'seo',
    heading: 'SEO',
    items: [
      {
        q: 'How long does SEO take to work?',
        a: 'In our experience, once the website is built properly and submitted to Google Search Console, it takes about three weeks for Google to build up your site’s presence. When everything is set up well, that’s often when the first results and calls start. Competitive searches take longer, and we don’t promise positions or dates.',
      },
      {
        q: 'How do you report SEO progress?',
        a: 'We show you clicks and visitors, but the number that matters most is how many people contacted you after finding you: calls from your Google profile, WhatsApp messages and form enquiries from Google, ChatGPT, Bing and other AI tools.',
      },
      {
        q: 'Can I do SEO myself?',
        a: 'Yes, a lot of it. Set up your Google Business Profile, submit your site to Search Console, give each service its own page and ask every customer for an honest review. The parts people usually need help with are the technical build and knowing which searches are worth going after.',
        link: { label: 'SEO basics for small businesses', href: '/blog/seo-basics-for-small-business' },
      },
      {
        q: 'Is SEO being replaced by AI?',
        a: 'No. Google’s AI answers and tools like ChatGPT build their answers from pages they can find and read, so the basics of SEO are what get you into them. Google’s own guidance says the same fundamentals apply.',
      },
      {
        q: 'Do you guarantee first-page rankings?',
        a: 'No, and you should be careful with anyone who does. Google decides rankings. We promise the work: the pages, the profile, the technical setup and the monthly reports.',
      },
      {
        q: 'Do I need a blog to rank on Google?',
        a: 'Not always. For most local businesses, strong service pages, a complete Google profile and genuine reviews matter more than frequent posts. A blog helps when it answers questions your customers actually ask.',
      },
    ],
  },
  {
    id: 'websites',
    heading: 'Websites',
    items: [
      {
        q: 'How long does it take to build a website?',
        a: 'Starter websites usually take 7 to 10 business days, multi-page business websites 2 to 4 weeks, and e-commerce sites 3 to 5 weeks. The biggest factor is how quickly your content and photos are ready.',
      },
      {
        q: 'Can ChatGPT build my website?',
        a: 'It can draft text and code. The hard part is getting the site found: many AI website builders produce sites that send search engines an almost empty page until JavaScript runs. When we checked client sites in October 2026, most sites built that way were close to invisible to ChatGPT and other AI crawlers.',
        link: { label: 'Lovable, Wix and Squarespace SEO', href: '/guides/lovable-wix-squarespace-seo' },
      },
      {
        q: 'Can I create a website for free?',
        a: 'Yes, with free plans on site builders, but you usually get the builder’s name in your address, limited pages and limited control over SEO. For a business that wants customers from Google, a proper domain and a site search engines can read are worth paying for.',
      },
      {
        q: 'Can you redesign my existing website?',
        a: 'Yes. We look at what isn’t working, keep the pages that already get found, and rebuild around clear service pages and enquiry paths, with redirects so you don’t lose what Google already knows.',
        link: { label: 'Website redesign', href: '/services/website-redesign' },
      },
      {
        q: 'Do I need to provide the content and images?',
        a: 'Yes, though we guide you on what’s needed and help shape the text. Real photos of your work, team and premises do far more than stock images.',
      },
      {
        q: 'Are your websites mobile-friendly?',
        a: 'Yes. Most of your customers will see the site on a phone, so we design for phones first.',
      },
    ],
  },
  {
    id: 'pricing',
    heading: 'Pricing and payment',
    items: [
      { q: PRICING_QUESTION, a: '', link: { label: 'See all prices', href: '/pricing' } },
      {
        q: 'What is included in the Starter Website?',
        a: 'A 4-page business website, a year of domain registration, Google Business Profile setup or cleanup, mobile optimisation, core on-page SEO, indexing setup, and contact options: a form, click-to-call and WhatsApp.',
      },
      {
        q: 'How do I pay?',
        a: 'For most projects we send an invoice. For big projects, such as a web app that takes several months, we take 50% upfront and 50% on delivery.',
      },
      {
        q: 'Do I have to sign a long contract?',
        a: 'No. We don’t lock clients into contracts. Care plans run month to month; a longer agreement only makes sense when the project itself runs for months.',
      },
      {
        q: 'Do I own my website?',
        a: 'Yes. You own the website, the domain and the content.',
      },
      {
        q: 'Why are your prices lower than many agencies?',
        a: 'Our packages are fixed and focused on what brings in enquiries, and we’re a small team without big-agency overheads.',
      },
    ],
  },
  {
    id: 'working-with-us',
    heading: 'Working with us',
    items: [
      {
        q: 'Where are you based?',
        a: 'Our founder is based in Abuja, and our office address is MR DGN’s office: Jossie Excel School, after Okpanam City Gate by the Express, Asaba. We serve Abuja, Asaba and the rest of Nigeria, plus clients in the UK and elsewhere, mostly over WhatsApp and video calls.',
        link: { label: 'Web design and SEO in Abuja', href: '/locations/abuja' },
      },
      {
        q: 'Do you only work with clients in Nigeria?',
        a: 'No. We work with businesses across Nigeria, the UK and beyond. The pricing page shows naira, pounds or dollars depending on where you are.',
      },
      {
        q: 'Do you run Google or Facebook ads?',
        a: 'On request, for clients who already have a website that converts. Our main work is websites and SEO; we’d rather you get customers from search before you pay for ads.',
      },
      {
        q: 'How do I get started?',
        a: 'Run the free AI visibility check or send your business name on WhatsApp. We’ll tell you what Google and ChatGPT see today and which package fits.',
        link: { label: 'Free AI visibility check', href: '/ai-visibility-check' },
      },
    ],
  },
];
