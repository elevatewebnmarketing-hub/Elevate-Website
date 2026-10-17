/**
 * Site-wide configuration. Update these values to customize your site.
 */

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

  navLinks: [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/process', label: 'Process' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
  ],

  footerLinks: [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/process', label: 'Process' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
    { href: '/get-quote', label: 'Get a Quote' },
    { href: '/locations/asaba', label: 'Web Design in Asaba' },
    { href: '/locations/nigeria', label: 'Websites Across Nigeria' },
    { href: '/how-to-get-more-customers', label: 'How to Get More Customers' },
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
    { href: `https://wa.me/${PHONE_E164}`, label: 'WhatsApp' },
  ],
} as const;
