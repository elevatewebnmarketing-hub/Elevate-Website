import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/i/'],
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'GPTBot', 'ChatGPT-User'],
        allow: '/',
        disallow: ['/admin/', '/i/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
