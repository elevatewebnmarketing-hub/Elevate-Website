/**
 * Site-wide configuration. Update these values to customize your site.
 */

/** Nigerian mobile in E.164 without + (WhatsApp / wa.me). Matches display phone 07086039012. */
const PHONE_E164 = '2347086039012';

export const siteConfig = {
  companyName: 'Elevate Web & Marketing',
  tagline:
    'High-performance websites and growth systems for businesses that want clearer messaging, stronger trust, and more leads.',
  contactEmail: 'hello@elevatewebandmarketing.com',
  phone: '+234 708 603 9012',
  location: 'Nigeria · Worldwide',

  whatsappNumber: PHONE_E164,
  whatsappMessage: "Hi! I'm visiting from the Elevate Web & Marketing website and would like to learn more about your services.",

  navLinks: [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/meta-ads', label: 'Meta Ads (FB/IG)' },
    { href: '/blog', label: 'Blog' },
    { href: '/process', label: 'Process' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/faq', label: 'FAQ' },
    { href: '/get-quote', label: 'Get a Quote' },
  ],

  footerLinks: [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/meta-ads', label: 'Meta Ads (FB/IG)' },
    { href: '/blog', label: 'Blog' },
    { href: '/process', label: 'Process' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/faq', label: 'FAQ' },
    { href: '/get-quote', label: 'Get a Quote' },
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
