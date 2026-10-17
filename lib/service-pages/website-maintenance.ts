import type { ServicePageConfig } from '@/lib/services-content';

export const websiteMaintenance: ServicePageConfig = {
  slug: 'website-maintenance',
  type: 'service',
  title: 'Website Care Plans',
  subtitle: 'Monthly maintenance so your site keeps working and keeps ranking',
  description:
    'Website care plans in Abuja: hosting and domain renewals, updates, uptime and security checks, small content changes, and a monthly search report, for a fixed monthly fee.',
  detail: {
    metaTitle: 'Website Maintenance in Abuja',
    metaDescription:
      'Website maintenance in Abuja: hosting, renewals, updates, uptime checks, content changes and a monthly Google report for one fixed monthly fee.',
    h1: 'Website maintenance and care plans in Abuja',
    intro: [
      'A website isn’t finished at launch. Domains expire, forms stop sending, prices change, and Google keeps changing what it rewards. A care plan means someone is responsible for all of that every month.',
      'Our care plans cover the technical upkeep and the small improvements that keep a site bringing in enquiries: content updates, tracking checks, and a short monthly report on how people find you.',
    ],
    problems: [
      'Your domain or hosting expired once and the site went down without warning.',
      'You need small text, price or photo changes, and waiting for a developer takes weeks.',
      'Your contact form stopped working and you only found out from a customer.',
      'You don’t know whether the site is bringing in any traffic or enquiries.',
    ],
    included: [
      {
        title: 'Hosting and renewals',
        detail: 'We keep hosting running and remind you before your domain renews, so the site never goes down over an unpaid bill.',
      },
      {
        title: 'Uptime monitoring',
        detail: 'Automatic checks on your site around the clock, with an alert to us if it goes down.',
      },
      {
        title: 'Updates and security',
        detail: 'Framework and dependency updates, security fixes and backups.',
      },
      {
        title: 'Content changes',
        detail: 'Text, price, photo and staff updates sent on WhatsApp: up to 4 small changes a month on the Website Care Plan and 8 on the SEO Care Plan.',
      },
      {
        title: 'Tracking and form checks',
        detail: 'We test your forms, WhatsApp buttons and GA4 tracking every month.',
      },
      {
        title: 'Monthly search report',
        detail: 'A one-page summary from Google Search Console and your Google Business Profile: searches, clicks, calls and top pages.',
      },
    ],
    process: [
      {
        title: 'Handover check',
        detail: 'If we didn’t build your site, we first run a one-off ₦30,000 check of access, hosting and backups.',
      },
      {
        title: 'Monthly routine',
        detail: 'Updates, uptime review, form and tracking tests, and your report.',
      },
      {
        title: 'Change requests',
        detail: 'Send changes on WhatsApp. Small changes are done within 2 business days.',
      },
    ],
    pricing: {
      summary: 'Care plans are a fixed monthly fee in naira.',
      points: [
        'Website Care Plan: ₦30,000 per month. Hosting, renewals, uptime monitoring, updates and small content changes.',
        'SEO Care Plan: ₦80,000 per month. Everything above, plus Google Business Profile posts and review replies, one new page or post a month, and a monthly ranking report.',
        'Larger changes, such as new pages or features, are quoted separately.',
      ],
    },
    proof: [
      {
        name: 'MR DGN Construction & Developers',
        url: 'https://construction.mrdgngroup.com',
        detail:
          'We keep updating and optimising the site month after month, adding pages such as the bulk offer and the building-from-abroad guide. In September 2026 a buyer found the company through ChatGPT.',
      },
    ],
    localContext: [
      'Many Nigerian business sites go offline because a domain renewal card payment failed or the person who built the site moved on. A care plan puts renewals, logins and backups in one place with a team that answers on WhatsApp.',
      'We test your site on a mid-range Android phone on mobile data each month, because that’s how most of your customers see it.',
    ],
    whyUs: [
      'One fixed monthly fee, agreed in advance.',
      'Monitoring is automatic, so problems are caught before customers report them.',
      'Monthly reports in plain language, not a wall of charts.',
    ],
    faqs: [
      {
        q: 'Do I need a website maintenance plan?',
        a: 'If your site brings in customers, yes. Without one, renewals, broken forms and outdated prices are easy to miss. If you have the time and skills to handle updates, hosting and tracking yourself, you may not need one.',
      },
      {
        q: 'What happens if my website goes down?',
        a: 'Our uptime monitor alerts us, and we investigate and fix it. Most outages are caused by hosting, domain or DNS problems, which we can fix directly because we hold the access.',
      },
      {
        q: 'Can I cancel a care plan?',
        a: 'Yes, with 30 days’ notice. You keep your domain, content and site files, and we move the hosting to your own account so the site stays online.',
      },
      {
        q: 'Do you maintain websites you didn’t build?',
        a: 'Yes. We start with a one-off ₦30,000 check of access, hosting and backups, then the care plan runs as normal.',
      },
    ],
    related: ['local-seo', 'website-redesign', 'website-design'],
  },
};
