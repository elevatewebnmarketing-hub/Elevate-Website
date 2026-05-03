/**
 * Site-wide configuration. Update these values to customize your site.
 */

const PHONE_E164 = '2347086039012';

export const siteConfig = {
  companyName: 'Elevate Web & Marketing',
  tagline:
    'Lead-generating websites, landing pages, and growth systems for service businesses that need clearer messaging, stronger trust, and more qualified leads.',
  contactEmail: 'hello@elevatewebandmarketing.com',
  phone: '+234 708 603 9012',
  location: 'Lagos, Nigeria · Serving clients worldwide',

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
    { href: '/contact', label: 'Contact' },
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
