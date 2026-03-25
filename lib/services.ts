export const SERVICE_OPTIONS = [
  { slug: 'website-design', label: 'Website Design' },
  { slug: 'website-development', label: 'Website Development' },
  { slug: 'website-redesign', label: 'Website Redesign' },
  { slug: 'seo-optimization', label: 'SEO Optimization' },
  { slug: 'meta-ads', label: 'Meta Ads (FB/IG)' },
  { slug: 'landing-pages', label: 'Landing Pages' },
  { slug: 'website-maintenance', label: 'Website Maintenance' },
] as const;

export type ServiceSlug = (typeof SERVICE_OPTIONS)[number]['slug'];

export function getServiceLabel(slug: string | null): string | null {
  if (!slug) return null;
  return SERVICE_OPTIONS.find((s) => s.slug === slug)?.label ?? null;
}
