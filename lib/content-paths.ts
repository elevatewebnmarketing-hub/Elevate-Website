/** Relevant next steps for readers. Keep these tied to services we actually sell. */
export interface ContentPath {
  heading: string;
  text: string;
  links: { href: string; label: string }[];
}

function topic(slug: string): string {
  if (/maintenance/.test(slug)) return 'maintenance';
  if (/whatsapp|ads|customers/.test(slug)) return 'enquiries';
  if (/seo|google|chatgpt/.test(slug)) return 'search';
  return 'websites';
}

export function getRelatedPosts<T extends { id: string; slug: string }>(post: T, posts: T[]): T[] {
  return posts
    .filter((candidate) => candidate.id !== post.id)
    .map((candidate, index) => ({ candidate, index, score: topic(candidate.slug) === topic(post.slug) ? 1 : 0 }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 3)
    .map(({ candidate }) => candidate);
}

export function getContentPath(slug: string): ContentPath {
  if (/whatsapp|google-ads|meta-ads/.test(slug)) {
    return {
      heading: 'Turn interest into enquiries',
      text: 'Need help bringing customers to your WhatsApp? Choose the work that fits your next step.',
      links: [
        { href: '/services/website-design', label: 'Website design with WhatsApp enquiries' },
        { href: '/services/local-seo', label: 'Local SEO and Google Business Profile support' },
        { href: '/services/facebook-instagram-ads', label: 'Facebook and Instagram ads management' },
      ],
    };
  }
  if (/maintenance/.test(slug)) {
    return {
      heading: 'Keep your website working for customers',
      text: 'Compare ongoing support with a rebuild before you decide what your site needs.',
      links: [
        { href: '/services/website-maintenance', label: 'Website maintenance and care plans' },
        { href: '/services/website-redesign', label: 'Website redesign services' },
      ],
    };
  }
  if (/seo|google|chatgpt/.test(slug)) {
    return {
      heading: 'Get help with your search visibility',
      text: 'See the work involved and a documented example before requesting an SEO review.',
      links: [
        { href: '/services/local-seo', label: 'Local SEO services in Abuja' },
        { href: '/locations/nigeria', label: 'SEO services for businesses across Nigeria' },
        { href: '/case-studies/mansa-luxe-realty', label: 'Mansa Luxe Realty: search visibility case study' },
      ],
    };
  }
  return {
    heading: 'Choose the right website service',
    text: 'See what is included, review our work and request a quote for your business.',
    links: [
      { href: '/services/website-design', label: 'Business website design' },
      { href: '/services/website-redesign', label: 'Website redesign services' },
      { href: '/pricing', label: 'Website packages and prices' },
    ],
  };
}

/** Historical portfolio tags map to the current, canonical service URLs. */
export function getPortfolioServicePath(service: string | null): string | null {
  const paths: Record<string, string> = {
    'website-design': '/services/website-design',
    'website-development': '/services/website-design',
    'website-redesign': '/services/website-redesign',
    'seo-optimization': '/services/local-seo',
    'landing-pages': '/services/landing-pages',
    'website-maintenance': '/services/website-maintenance',
  };
  return service ? paths[service] ?? null : null;
}
