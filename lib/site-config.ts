/**
 * Site-wide configuration. Update these values to customize your site.
 */

export type NavChild = { href: string; label: string; note?: string };
export type NavItem = { href: string; label: string; children?: NavChild[] };

const PHONE_E164 = '2347086039012';

export const siteConfig = {
  companyName: 'Elevate Web & Marketing',
  tagline:
    'SEO-ready websites, landing pages and care plans for businesses in Abuja and across Nigeria that want to be found on Google and ChatGPT.',
  contactEmail: 'hello@elevatewebandmarketing.com',
  phone: '+234 708 603 9012',
  location: 'Abuja, Nigeria · Serving clients across Nigeria and the UK',

  whatsappNumber: PHONE_E164,
  whatsappMessage: "Hi! I'm visiting from the Elevate Web & Marketing website and would like to learn more about your services.",

  /** Header menu. Items with `children` render as a dropdown; the parent href is the overview page. */
  navMenu: [
    {
      href: '/services',
      label: 'Services',
      children: [
        { href: '/services/website-design', label: 'Website Design', note: 'Business websites built to bring in enquiries' },
        { href: '/services/local-seo', label: 'Local SEO & Google Business Profile', note: 'Get found on Google, Maps and ChatGPT' },
        { href: '/services/website-redesign', label: 'Website Redesign', note: 'Fix an old or invisible site' },
        { href: '/services/landing-pages', label: 'Landing Pages', note: 'One offer, one page, more enquiries' },
        { href: '/services/ecommerce', label: 'E-commerce Websites', note: 'Online shops that take orders and payments' },
        { href: '/services/website-maintenance', label: 'Website Care Plans', note: 'Monthly upkeep and SEO' },
      ],
    },
    {
      href: '/locations/abuja',
      label: 'Locations',
      children: [
        { href: '/locations/abuja', label: 'Abuja', note: 'Web design and SEO across the FCT' },
        { href: '/locations/katampe-extension', label: 'Katampe Extension, Abuja', note: 'Real estate and premium homes' },
        { href: '/locations/guzape', label: 'Guzape, Abuja', note: 'Property and high-end services' },
        { href: '/locations/asaba', label: 'Asaba', note: 'Where our work started' },
        { href: '/locations/okpanam', label: 'Okpanam, Asaba', note: 'Building materials and trades' },
        { href: '/locations/lagos', label: 'Lagos', note: 'Remote web design and SEO' },
        { href: '/locations/nigeria', label: 'All of Nigeria', note: 'Fixed naira prices nationwide' },
      ],
    },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ] as NavItem[],

  footerLinks: [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/process', label: 'Process' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
    { href: '/get-quote', label: 'Get a Quote' },
    { href: '/locations/abuja', label: 'Web Design & SEO in Abuja' },
    { href: '/locations/asaba', label: 'Web Design in Asaba' },
    { href: '/locations/lagos', label: 'Web Design & SEO in Lagos' },
    { href: '/locations/nigeria', label: 'Websites Across Nigeria' },
    { href: '/ai-visibility-check', label: 'Free AI Visibility Check' },
    { href: '/how-to-get-more-customers', label: 'How to Get More Customers' },
    { href: '/uk', label: 'Websites for UK Businesses' },
    { href: '/us', label: 'Websites for US Businesses' },
    { href: '/guides/why-your-website-isnt-on-google', label: 'Why Your Site Isn’t on Google' },
    { href: '/guides/lovable-wix-squarespace-seo', label: 'Lovable, Wix & Squarespace SEO' },
    { href: '/guides/website-cost-uk', label: 'UK Website Cost 2026' },
    { href: '/websites-for/coaches', label: 'Websites for Coaches' },
    { href: '/websites-for/clinics', label: 'Websites for Clinics' },
    { href: '/websites-for/diaspora-businesses', label: 'Websites for Diaspora Businesses' },
    { href: '/team', label: 'Team' },
    { href: '/contact', label: 'Contact' },
  ],

  socialLinks: [
    {
      href: 'https://www.facebook.com/profile.php?id=61578521342361',
      label: 'Facebook',
    },
    { href: 'https://www.instagram.com/elevate_web_and_marketing/', label: 'Instagram' },
    { href: 'https://x.com/elevate_web_', label: 'X' },
    { href: 'https://www.youtube.com/@elevatewebmarketing-b6j', label: 'YouTube' },
    { href: 'https://www.tiktok.com/@elevate.web.marke', label: 'TikTok' },
    { href: `https://wa.me/${PHONE_E164}`, label: 'WhatsApp' },
  ],
} as const;
