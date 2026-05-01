import type { BlogPost } from '@/backend/data';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export default function BlogPostJsonLd({ post }: { post: BlogPost }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const wordCount = post.content.split(/\s+/).filter(Boolean).length;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    wordCount,
    inLanguage: 'en',
    author: {
      '@type': 'Organization',
      name: post.author || 'Elevate Team',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Elevate Web & Marketing',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    image: post.image ? [post.image] : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
