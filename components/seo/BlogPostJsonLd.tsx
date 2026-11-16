import type { BlogPost } from '@/backend/data';
import { plainText } from '@/lib/blog-utils';

/** Q&As from a post's FAQ section ("## Questions people ask" / "## Frequently asked questions"): each "### question" and the text under it. */
function extractFaqs(content: string): { q: string; a: string }[] {
  const m = content.match(/^## (?:Questions people ask|Frequently asked questions|FAQs?)\s*$([\s\S]*?)(?=^## |(?![\s\S]))/im);
  if (!m) return [];
  return m[1]
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [q, ...rest] = block.split('\n');
      return { q: q.trim(), a: plainText(rest.join(' ').replace(/\s+/g, ' ').trim()) };
    })
    .filter((f) => f.q && f.a);
}

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
    dateModified: post.updatedAt ?? post.publishedAt,
    wordCount,
    inLanguage: 'en',
    author:
      post.author === 'Ufuoma Onakpoyan'
        ? { '@type': 'Person', name: post.author, url: `${SITE_URL}/about`, jobTitle: 'Founder, Elevate Web & Marketing' }
        : { '@type': 'Organization', name: post.author || 'Elevate Web & Marketing', url: SITE_URL },
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

  const faqs = extractFaqs(post.content);
  const faqSchema =
    faqs.length >= 2
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }
      : null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema ? [schema, faqSchema] : schema) }}
    />
  );
}
