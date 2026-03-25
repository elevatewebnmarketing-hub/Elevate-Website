import type { BlogPost } from '@/backend/data';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export default function BlogPostJsonLd({ post }: { post: BlogPost }) {
  const url = `${SITE_URL}/blog/${post.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author || 'Elevate Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Elevate Web & Marketing',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
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

