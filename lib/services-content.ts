export type PageType = 'service' | 'industry';

export interface ServicePageConfig {
  slug: string;
  type: PageType;
  title: string;
  subtitle: string;
  description: string;
  challenges: string[];
  solutions: string[];
  portfolioId?: string;
  portfolioName?: string;
  portfolioUrl?: string;
}

export const servicePages: Record<string, ServicePageConfig> = {
  // Services
  'website-design': {
    slug: 'website-design',
    type: 'service',
    title: 'Website Design',
    subtitle: 'Custom designs that convert',
    description:
      'We create visually stunning, user-friendly interfaces that reflect your brand and turn visitors into customers. Every design decision—layout, typography, colour, imagery—is made with your business goals in mind.',
    challenges: [
      'Your current site looks outdated or doesn\'t reflect your brand',
      'Visitors leave without taking action',
      'Design is inconsistent or hard to navigate on mobile',
    ],
    solutions: [
      'Brand-aligned visual design that feels premium and professional',
      'User experience (UX) research and optimization for conversions',
      'Responsive layouts for all devices and screen sizes',
      'Conversion-focused layouts with clear CTAs and trust elements',
    ],
  },
  'website-development': {
    slug: 'website-development',
    type: 'service',
    title: 'Website Development',
    subtitle: 'Fast, modern, built to last',
    description:
      'We build websites with modern technology and best practices. Clean code, SEO-friendly structure, and performance you can measure. From Next.js and React to accessibility standards (WCAG), we deliver sites that work.',
    challenges: [
      'Your site is slow or breaks on certain devices',
      'You need more than a template—custom features and flows',
      'You want a site that ranks and loads quickly',
    ],
    solutions: [
      'Next.js, React, and modern frameworks for speed and reliability',
      'SEO-friendly structure, meta tags, and clean URLs',
      'Performance optimization (Core Web Vitals, fast loading)',
      'Accessibility standards (WCAG) for inclusive design',
    ],
  },
  'website-redesign': {
    slug: 'website-redesign',
    type: 'service',
    title: 'Website Redesign',
    subtitle: 'Fresh look, better results',
    description:
      'We audit your current site and rebuild it for better results. A modern design refresh, improved user flows, and content migration so you keep what works and fix what doesn\'t.',
    challenges: [
      'Your site looks old or doesn\'t match your current brand',
      'Navigation is confusing and visitors can\'t find what they need',
      'Content is scattered and hard to update',
    ],
    solutions: [
      'Current site audit and strategy before we build',
      'Modern design refresh aligned with your brand',
      'Improved user flows and navigation',
      'Content migration and structured layouts',
    ],
  },
  seo: {
    slug: 'seo',
    type: 'service',
    title: 'SEO Optimization',
    subtitle: 'Get found by your ideal customers',
    description:
      'We use data-driven SEO strategies to improve your search visibility and organic traffic. Technical audits, keyword research, on-page optimization, and content strategy that supports long-term growth.',
    challenges: [
      'Your site doesn\'t rank for relevant search terms',
      'You\'re not sure which keywords matter for your business',
      'Technical issues are holding back your visibility',
    ],
    solutions: [
      'Technical SEO audits to fix crawl and index issues',
      'Keyword research and strategy aligned with your goals',
      'On-page optimization (titles, meta, headings, content)',
      'Link building and content strategy for authority',
    ],
  },
  'website-maintenance': {
    slug: 'website-maintenance',
    type: 'service',
    title: 'Website Maintenance',
    subtitle: 'Keep your site secure and up to date',
    description:
      'Ongoing maintenance so your site stays secure, fast, and up-to-date. Security updates, backups, content updates, and performance monitoring—peace of mind so you can focus on your business.',
    challenges: [
      'You worry about security breaches or downtime',
      'Plugins or themes need updates and you\'re not technical',
      'Content changes take too long or require developer help',
    ],
    solutions: [
      'Security updates and monitoring',
      'Backup and recovery so you never lose data',
      'Content updates and minor changes as needed',
      'Performance monitoring and optimization',
    ],
  },
  'google-ads': {
    slug: 'google-ads',
    type: 'service',
    title: 'Google Ads & Campaign Management',
    subtitle: 'Turn search traffic into leads and sales',
    description:
      'We set up, optimize, and report on Google Ads campaigns. From keyword research to conversion tracking, we help you reach the right people at the right time and turn clicks into customers.',
    challenges: [
      'You want to appear in search results but don\'t know how',
      'Ad spend feels wasted with little return',
      'You need someone to manage campaigns and report on performance',
    ],
    solutions: [
      'Campaign setup and monthly optimization (1–3 core campaigns)',
      'Keyword research and targeting for your services and locations',
      'Conversion tracking and Google Analytics (GA4) setup',
      'Monthly performance reports and 30-minute strategy calls',
    ],
  },
  // Industries
  construction: {
    slug: 'construction',
    type: 'industry',
    title: 'Web Design for Construction',
    subtitle: 'Sites that build trust and win projects',
    description:
      'Construction companies and building materials suppliers need websites that showcase projects, list services, and make it easy for clients to request quotes. We build sites that reflect your expertise and convert visitors into customers.',
    challenges: [
      'Clients can\'t easily see your portfolio or request quotes',
      'Your site doesn\'t reflect the scale and quality of your work',
      'Product catalogs or service pages are hard to navigate',
    ],
    solutions: [
      'Project galleries and case studies that highlight your work',
      'Service pages for commercial, residential, infrastructure, and more',
      'Product catalogs with WhatsApp or form-based ordering',
      'Trust elements: stats, testimonials, and clear contact paths',
    ],
    portfolioId: '2',
    portfolioName: 'MR DGN Construction',
    portfolioUrl: 'https://construction.mrdgngroup.com',
  },
  'real-estate': {
    slug: 'real-estate',
    type: 'industry',
    title: 'Web Design for Real Estate',
    subtitle: 'Showcase properties and book consultations',
    description:
      'Real estate agencies and developers need a strong online presence—property listings, consultation booking, and premium design that matches the high-end market. We build sites that attract serious buyers and support lead generation.',
    challenges: [
      'Property listings are hard to browse or outdated',
      'High-net-worth clients expect a premium experience',
      'No clear path to schedule viewings or consultations',
    ],
    solutions: [
      'Featured properties and property browse with filters',
      'Consultation and viewing booking flows',
      'Trust metrics (transactions, properties sold, testimonials)',
      'Premium design aligned with luxury positioning',
    ],
    portfolioId: '3',
    portfolioName: 'MansaLuxeRealty Limited',
    portfolioUrl: 'https://mansaluxerealty.mrdgngroup.com',
  },
  education: {
    slug: 'education',
    type: 'industry',
    title: 'Web Design for Education',
    subtitle: 'Sites that inform and convert applicants',
    description:
      'Schools, programs, and education brands need websites that clearly explain offerings, eligibility, and how to apply. We build accessible, information-rich sites that become the go-to place for students and partners.',
    challenges: [
      'Applicants can\'t find eligibility criteria or application steps',
      'Your vision and mission aren\'t clearly communicated',
      'Contact and inquiry paths are unclear',
    ],
    solutions: [
      'Clear structure: vision, mission, eligibility, and application flow',
      'Accessible design and content for all audiences',
      'WhatsApp and email contact for questions',
      'Content that supports conversion from visitors to applicants',
    ],
    portfolioId: '5',
    portfolioName: 'TMM Scholars',
    portfolioUrl: 'https://TMMscholars.com',
  },
  ecommerce: {
    slug: 'ecommerce',
    type: 'industry',
    title: 'Web Design for E‑commerce & Retail',
    subtitle: 'Online stores that convert',
    description:
      'Retail brands need e-commerce sites that showcase products, support discovery, and make buying easy. We build stores with clear navigation, product categories, and checkout flows that turn browsers into buyers.',
    challenges: [
      'Products are hard to discover or the experience feels cheap',
      'Checkout and payment flows are confusing',
      'Brand story and product story don\'t come through',
    ],
    solutions: [
      'Product catalogs with categories and collections',
      'Elegant design that reflects your brand',
      'Cart and checkout (Stripe, Paystack, or Shopify-style)',
      'Newsletter signup and subscription for new arrivals',
    ],
    portfolioId: '4',
    portfolioName: 'Experience BSG',
    portfolioUrl: 'https://experienceBSG.com',
  },
};

export const serviceSlugs = Object.keys(servicePages);

export function getServiceBySlug(slug: string): ServicePageConfig | null {
  return servicePages[slug] ?? null;
}
