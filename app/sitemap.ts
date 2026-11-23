import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/data';
import { getPortfolioItems } from '@/lib/data';
import { servicePages } from '@/lib/services-content';
import { locationPages } from '@/lib/location-pages';
import { nicheSlugs } from '@/lib/niche-pages';
import { guides } from '@/lib/guides';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

/**
 * lastmod must be the date the page's content really changed. It used to be the build time for most URLs, so every
 * deploy told Google 45 pages had just changed; Google only uses lastmod when it is "consistently and verifiably
 * accurate", so it was being ignored (indexing review, 2026-11-20). When you change a page's content, update its
 * date here (or the page's own `updated` field for services, locations and guides).
 */
const UPDATED = {
  home: '2026-11-23',
  about: '2026-11-23',
  services: '2026-11-23',
  portfolio: '2026-10-19',
  blog: '2026-11-20',
  process: '2026-11-16',
  pricing: '2026-11-20',
  contact: '2026-11-23',
  faq: '2026-11-16',
  getQuote: '2026-11-16',
  team: '2026-11-16',
  caseStudies: '2026-10-17',
  terms: '2026-11-17',
  privacy: '2026-11-23',
  nichePages: '2026-11-16',
} as const;
const d = (iso: string) => new Date(`${iso}T12:00:00Z`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: d(UPDATED.home), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: d(UPDATED.about), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified: d(UPDATED.services), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, lastModified: d(UPDATED.portfolio), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: d(UPDATED.blog), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/process`, lastModified: d(UPDATED.process), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/pricing`, lastModified: d(UPDATED.pricing), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: d(UPDATED.contact), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified: d(UPDATED.faq), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/get-quote`, lastModified: d(UPDATED.getQuote), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/team`, lastModified: d(UPDATED.team), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/how-to-get-more-customers`, lastModified: new Date('2026-10-17'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services/web-app-development`, lastModified: d('2026-11-23') },
    { url: `${SITE_URL}/invoice-generator`, lastModified: d('2026-11-23') },
    { url: `${SITE_URL}/ai-visibility-check`, lastModified: new Date('2026-10-18'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/uk`, lastModified: new Date('2026-10-18'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/us`, lastModified: new Date('2026-10-18'), changeFrequency: 'monthly', priority: 0.8 },
    ...guides.map((g) => ({ url: `${SITE_URL}/guides/${g.slug}`, lastModified: new Date(g.updated ?? g.published), changeFrequency: 'monthly' as const, priority: 0.7 })),
    { url: `${SITE_URL}/case-studies/runway-refined`, lastModified: new Date('2026-10-18'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/case-studies/elevate-web-and-marketing`, lastModified: new Date('2026-11-17'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/case-studies`, lastModified: d(UPDATED.caseStudies), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/terms`, lastModified: d(UPDATED.terms), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: d(UPDATED.privacy), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const serviceUrls: MetadataRoute.Sitemap = Object.entries(servicePages).map(([slug, page]) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: d(page.detail?.updated ?? UPDATED.services),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const locationUrls: MetadataRoute.Sitemap = [
    ...Object.entries(locationPages).map(([slug, page]) => ({
      url: `${SITE_URL}/locations/${slug}`,
      lastModified: d(page.detail?.updated ?? UPDATED.home),
    })),
    ...nicheSlugs.map((slug) => ({ url: `${SITE_URL}/websites-for/${slug}`, lastModified: d(UPDATED.nichePages) })),
  ].map((u) => ({ ...u, changeFrequency: 'monthly' as const, priority: 0.7 }));

  let blogUrls: MetadataRoute.Sitemap = [];
  let portfolioUrls: MetadataRoute.Sitemap = [];

  try {
    const posts = await getBlogPosts();
    blogUrls = posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt ?? p.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    // ignore
  }

  try {
    const items = await getPortfolioItems();
    portfolioUrls = items.map((p) => ({
      url: `${SITE_URL}/portfolio/${p.id}`,
      lastModified: d(UPDATED.portfolio),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    // ignore
  }

  return [...staticPages, ...serviceUrls, ...locationUrls, ...blogUrls, ...portfolioUrls];
}
