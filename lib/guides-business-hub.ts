import type { Guide } from '@/lib/guides';

export const chatgptBusinessHub: Guide = {
  slug: 'chatgpt-business-hub-setup',
  title: 'ChatGPT Business Hub Setup in Nigeria | My Experience',
  h1: 'How I set up Elevate in ChatGPT Business Hub',
  description:
    'I claimed and verified Elevate in ChatGPT Business Hub from Nigeria. Here’s what I used for ID, CAC and domain verification, and what the dashboard showed.',
  published: '2026-11-21',
  image: '/images/founder-ufuoma-onakpoyan.png',
  keyTakeaways: [
    'I found Elevate by searching for our business name in ChatGPT Business Hub, then claimed the listing.',
    'I used my Nigerian driver’s licence, completed a face check, and submitted our CAC documents as a PDF and screenshots.',
    'I verified control of our website with a DNS TXT record. It took a couple of tries for the check to go through.',
    'I got a confirmation email. The dashboard showed website access confirmed and still displayed dashes for mentions, profile views and website clicks.',
  ],
  intro: [
    'I saw a few videos about ChatGPT Business Hub, so I Googled it and clicked through to see if I could set up Elevate Web & Marketing. The first thing it asked me to do was search for my business name. Elevate came up, and I claimed it.',
    'Finding the business was the easy part. I had to try the document and website checks more than once. This was my experience setting up Elevate from Nigeria in November 2026, while Business Hub was still rolling out.',
  ],
  sections: [
    {
      h2: 'What to have ready before you start',
      list: [
        'A personal ID you can show clearly. I used my Nigerian driver’s licence.',
        'A readable PDF of your Corporate Affairs Commission (CAC) documents. I had screenshots of the documents on hand as well.',
        'A camera and somewhere with good lighting for the face verification step.',
        'Your business name, address, website and primary category, plus a few photos or videos that show your real work.',
        'Access to the DNS settings for your domain, or someone who can add a TXT record for you.',
      ],
    },
    {
      h2: '1. Search for your business and claim it',
      paragraphs: [
        'Open [ChatGPT Business Hub](https://chatgpt.com/business-hub), sign in and search for your business name. After I claimed Elevate, it asked me to verify my identity and the business.',
        'If your screen looks different, bear in mind that I tried this from my own account in Nigeria. I don’t know which other accounts have the same options yet.',
      ],
    },
    {
      h2: '2. Verify your identity and business documents',
      paragraphs: [
        'I used my driver’s licence for the ID check and did a face check on camera. Get the lighting right before you begin. If you’re using a passport or another form of ID, check the choices shown on your own screen. The licence is the one I actually tested.',
        'The CAC check was the part I had to go back to. I submitted the PDF, then I tried screenshots as well. I couldn’t tell which one went through in the end. Nobody had to come out to our office for my verification.',
      ],
    },
    {
      h2: '3. Confirm that you control your website',
      paragraphs: [
        'Business Hub asked me to verify our domain. I added the TXT value it provided as a DNS record where our domain is managed, then went back and ran the check. If you’ve verified a domain in Google Search Console, the idea is familiar.',
        'It took a couple of tries before the check went through. If yours is still pending, double-check the host and value against the setup screen and give the DNS record time to update before you retry. My dashboard eventually displayed **Website access: Access confirmed**.',
      ],
    },
    {
      h2: '4. Choose your main category and finish the profile',
      paragraphs: [
        'I went with **Web designer**. That’s the main thing we do at Elevate. On Google Business Profile I’d normally add a marketing category as well. The Business Hub screen I used gave me one main category.',
        'I checked the business address, filled in the profile details and added pictures. The interface also offered video. If you’ve already put together your details for [Google Business Profile](/guides/google-business-profile-setup-nigeria), you can use that as a starting point and check the details against your website.',
      ],
    },
    {
      h2: 'What the dashboard showed after verification',
      paragraphs: [
        'I received a confirmation email. In the dashboard I could see the website access confirmation, and I didn’t see a public verification badge. Under **Brand insights**, there were fields for mentions, profile views and website clicks. Mine still showed dashes. The mentions panel says trends appear once there are enough mentions.',
        'I could see an **Agent insights** tab too. There was no data available to me when I checked, and I don’t know if other accounts are seeing the same thing. I’ll update this when I have numbers to share.',
      ],
    },
    {
      h2: 'Is it worth verifying early?',
      paragraphs: [
        'I’d get it done early if you already have the documents. My theory is that, if ChatGPT starts using these listings more in its answers, having your own verified profile could help. I’m still waiting for figures in my dashboard. So for now, I have no evidence of a boost or that ChatGPT puts a verified Business Hub profile ahead of a Google Business Profile.',
        'I’d still keep the website and Google Business Profile current. If your goal is to be found in ChatGPT answers, here’s what we’ve tested beyond Business Hub in our guide to [getting your business recommended by ChatGPT](/guides/how-to-get-recommended-by-chatgpt).',
      ],
    },
  ],
  faqs: [
    {
      q: 'Can I use a Nigerian driver’s licence for ChatGPT Business Hub verification?',
      a: 'I used my Nigerian driver’s licence and completed a face check. Check which ID types the verification screen offers for your own account.',
    },
    {
      q: 'What Nigerian business documents did you submit?',
      a: 'I submitted my Corporate Affairs Commission (CAC) documents as a PDF and also tried screenshots. I’d prepare a clear PDF before starting.',
    },
    {
      q: 'Does Business Hub verification get your business recommended by ChatGPT?',
      a: 'I received confirmation and saw website access confirmed in my dashboard. At the time of this walkthrough, my dashboard showed no figures for mentions, profile views or website clicks, so I had no result I could attribute to verification.',
    },
  ],
  cta: {
    heading: 'Can AI tools read your website?',
    text: 'Check what an AI crawler can read on your homepage and see where your business details could be clearer.',
    href: '/ai-visibility-check',
    label: 'Run the free AI visibility check',
  },
  sources: [
    { label: 'ChatGPT Business Hub', url: 'https://chatgpt.com/business-hub' },
  ],
};
