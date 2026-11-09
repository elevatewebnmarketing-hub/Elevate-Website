import type { Guide } from '@/lib/guides';

/**
 * Guides added 9 November 2026. Written from Elevate's own client data and tests (information nobody else has),
 * checked against Google's and OpenAI's documentation. Sources are listed on each guide.
 */

export const recommendedByChatgpt: Guide = {
  slug: 'how-to-get-recommended-by-chatgpt',
  title: 'How to Get Your Business Recommended by ChatGPT',
  h1: 'How to get your business recommended by ChatGPT',
  description:
    'How ChatGPT finds local businesses, and the steps that got our clients named first: a readable site, Bing, consistent facts, mentions, and checking monthly.',
  published: '2026-11-09',
  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  keyTakeaways: [
    'ChatGPT can only recommend businesses it can find and read. For local questions it searches the web, so the basics of SEO decide most of it.',
    'Make your website readable without JavaScript, let OpenAI’s search crawler (OAI-SearchBot) in, and submit your site to Google Search Console and Bing Webmaster Tools.',
    'Write plainly what you sell, where, and how to contact you, with one page per service, and keep those facts the same everywhere online.',
    'Get mentioned on other sites honestly: directories, local lists, partners. Nobody can pay ChatGPT to rank them.',
    'This is what put our client MR DGN Construction first in ChatGPT’s answer for cement blocks in Asaba (our test, 6 November 2026).',
  ],
  intro: [
    'In early November 2026 two business owners messaged me within a few days of each other. Both wanted the same thing: to show up on Google and get more clients. When I asked one of them how she found us, she said ChatGPT.',
    'I don’t know what she typed, and I didn’t want to pry. But it showed me that people now ask ChatGPT for a local service the way they used to ask a friend. This guide is what I do to get a business into those answers, with the results from our own clients.',
  ],
  sections: [
    {
      h2: 'How ChatGPT decides which businesses to name',
      paragraphs: [
        'When you ask ChatGPT something local, such as “where can I buy cement blocks in Asaba with delivery?”, it usually searches the web and builds its answer from the pages it finds. OpenAI says its search crawler, **OAI-SearchBot**, is what makes a site eligible to appear in ChatGPT search. If your robots.txt blocks it, your site won’t be shown in those answers.',
        'So ChatGPT is limited by the same things as Google. It needs pages it can reach, text it can read, and enough agreement across the web that your business is what you say it is.',
      ],
    },
    {
      h2: 'What Google needs and what ChatGPT needs',
      table: {
        head: ['', 'Google Search', 'ChatGPT'],
        rows: [
          ['Finds your site through', 'Google Search Console, sitemap, links', 'Web search results, links, OAI-SearchBot crawling'],
          ['Reads', 'Rendered pages, including some JavaScript', 'Mostly the raw HTML; JavaScript-only text is often missed'],
          ['Trusts you because of', 'Relevance, distance, prominence, reviews', 'Consistent facts and mentions across many sites'],
          ['Free tool to check', 'Google Search Console', 'Bing Webmaster Tools AI Performance report, and asking ChatGPT yourself'],
        ],
      },
    },
    {
      h2: '1. Check where you stand',
      list: [
        'Ask ChatGPT the question your customer would ask: “Who is the best [your service] in [your area]?” Try a few versions and write down who it names.',
        'Search Google for **site:yourdomain.com** to see a sample of your indexed pages. The full picture is in Google Search Console’s Pages report.',
        'Run our [free AI visibility check](/ai-visibility-check). It shows what an AI crawler receives when it opens your homepage.',
      ],
    },
    {
      h2: '2. Make your website readable without JavaScript',
      paragraphs: [
        'This is the most common problem I find. Many sites built with AI website builders and some page builders send an almost empty page to anything that doesn’t run JavaScript. When we audited our own client sites in October 2026, most of the ones built that way were close to invisible to AI crawlers. The MR DGN Group site sent crawlers **0 readable words** before we rebuilt it.',
        'The fix is a server-rendered site, where the text is already in the HTML. Our [guide to Lovable, Wix and Squarespace SEO](/guides/lovable-wix-squarespace-seo) explains how to check yours.',
      ],
    },
    {
      h2: '3. Let the crawlers in and submit your site',
      list: [
        'Open yourdomain.com/robots.txt and make sure it doesn’t block **OAI-SearchBot** or **Bingbot**. Blocking GPTBot only stops your content being used to train models; it doesn’t affect ChatGPT search.',
        'Submit your sitemap to [Google Search Console](/guides/why-your-website-isnt-on-google) and to Bing Webmaster Tools. Bing’s free AI Performance report shows when your pages are cited in Copilot answers.',
        'Check back after a month. Search Console shows which searches you appear for, and that tells you which pages to strengthen.',
      ],
    },
    {
      h2: '4. Say plainly what you do, where, and for whom',
      paragraphs: [
        'ChatGPT repeats facts it can find. Give each service its own page, name the area in the heading where it’s true, and answer the first question in the first two lines: what you sell, where you deliver or work, and how to reach you. A short summary at the top helps people and AI tools alike.',
        'For MR DGN Construction that meant a page each for cement, blocks, pavers and delivery in Asaba, written around what buyers ask. Asked “Where can I buy cement blocks in Asaba with delivery?” on 6 November 2026, ChatGPT named MR DGN Construction first. A buyer had already found the company through ChatGPT in September.',
      ],
    },
    {
      h2: '5. Keep your facts the same everywhere',
      paragraphs: [
        'Your business name, address, phone number, opening hours and services should match on your website, your Google Business Profile, Bing Places, Apple Business, Facebook and directories such as VConnect and Finelib. When they disagree, both Google and AI tools are less sure which version is true.',
      ],
    },
    {
      h2: '6. Get mentioned on other sites, honestly',
      paragraphs: [
        'When we checked “SEO company in Abuja” on 9 November 2026, three of the top ten results were “best SEO companies in Abuja” lists. ChatGPT reads lists like these when it decides who to recommend. Ask to be considered, join your local business associations, sponsor something local, and ask partners to link to you.',
        'Don’t buy links or fake reviews. Google treats bought links as spam, and fake reviews break Google’s rules and, in many countries, the law.',
      ],
    },
    {
      h2: '7. Watch it for a month, then improve what is close',
      paragraphs: [
        'Our real estate client Mansa Luxe Realty went from 46 Google impressions a month in May 2026 to 843 in October, and its pages appeared in Google’s AI Overviews 363 times in those six months. In our own tests in November 2026, ChatGPT named Mansa Luxe first or second when asked about property in Katampe Extension.',
      ],
      evidenceIds: ['real-estate-abuja-asaba'],
      after: [
        'Every month, ask ChatGPT your customers’ questions again, check Search Console and Bing’s AI report, and ask every new customer where they found you. That last question is how we learned about the two ChatGPT enquiries.',
      ],
    },
    {
      h2: 'What you don’t need',
      list: [
        'Special schema markup for AI. Google says its AI features need no special markup; schema still helps normal rich results.',
        'An llms.txt file. Google says it doesn’t use one for its AI features. It does no harm, but it won’t fix an unreadable site.',
        'Pages written in tiny “chunks” for AI. Write for people; Google says the same fundamentals apply.',
        'Anyone who promises to get you into ChatGPT by a date. Nobody controls its answers.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Can I pay to be recommended by ChatGPT?',
      a: 'No. Its answers are built from what it finds on the web. You can make your site readable and get mentioned on other sites, but you can’t buy a place in the answer.',
    },
    {
      q: 'How long does it take for ChatGPT to start recommending my business?',
      a: 'There is no fixed time. OpenAI says robots.txt changes can take about 24 hours to reach its search systems, but being recommended depends on what other sites say about you, which builds up over weeks and months.',
    },
    {
      q: 'Does ChatGPT use Google or Bing?',
      a: 'ChatGPT search uses its own crawler, OAI-SearchBot, alongside search partners. Submitting your site to both Google Search Console and Bing Webmaster Tools covers the main routes.',
    },
    {
      q: 'Why does ChatGPT recommend my competitor and not me?',
      a: 'Usually because their site is easier to read, their facts are consistent, or more sites mention them. Ask ChatGPT where it got its answer; it often shows the pages it used, and those tell you what to fix.',
    },
    {
      q: 'Do I need to block GPTBot?',
      a: 'Only if you don’t want your content used to train OpenAI’s models. Blocking GPTBot doesn’t remove you from ChatGPT search; blocking OAI-SearchBot does.',
    },
    {
      q: 'Will this also help me on Google?',
      a: 'Yes. Almost every step here is also how you show up on Google and in its AI Overviews.',
    },
  ],
  cta: {
    heading: 'Find out what ChatGPT sees',
    text: 'Run the free AI visibility check, or send your business name on WhatsApp and we’ll ask ChatGPT and Google about you and send you what comes back.',
    href: '/ai-visibility-check',
    label: 'Run the free AI visibility check',
  },
  sources: [
    { label: 'OpenAI: Overview of OpenAI crawlers', url: 'https://developers.openai.com/api/docs/bots' },
    { label: 'Google Search Central: AI features and your website', url: 'https://developers.google.com/search/docs/appearance/ai-features' },
    { label: 'Google: Tips to improve your local ranking', url: 'https://support.google.com/business/answer/7091' },
    { label: 'Google Search Central: Spam policies (link spam)', url: 'https://developers.google.com/search/docs/essentials/spam-policies' },
  ],
};
