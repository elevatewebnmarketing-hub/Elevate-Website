/**
 * Site-wide configuration. Update these values to customize your site.
 */

export const siteConfig = {
  companyName: 'Elevate Web & Marketing',
  tagline:
    'Nigeria-based web & marketing studio building high-performance websites and growth systems for businesses worldwide—no matter the timezone.',
  contactEmail: 'hello@elevatewebandmarketing.com',
  phone: '+234 814 493 3788',
  location: 'Nigeria · Worldwide',

  whatsappNumber: '2348144933788',
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
    { href: 'https://wa.me/2348144933788', label: 'WhatsApp' },
  ],
} as const;
