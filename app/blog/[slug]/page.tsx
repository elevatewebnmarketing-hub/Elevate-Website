import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/data';
import { stripHtmlTags } from '@/lib/blog-utils';
import BlogPostJsonLd from '@/components/seo/BlogPostJsonLd';
import BlogPostViewTracker from '@/components/blog/BlogPostViewTracker';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, ArrowRight, Clock } from 'lucide-react';

const BASE_URL = 'https://www.elevatewebandmarketing.com';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  const description = post.excerpt.slice(0, 160);
  const url = `${BASE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.image ? [{ url: post.image, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.image ? [post.image] : undefined,
    },
    alternates: { canonical: url },
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatContent(content: string): string {
  const cleaned = stripHtmlTags(content);
  const parts: string[] = [];
  let inList = false;

  cleaned.split('\n').forEach((line) => {
    if (line.startsWith('### ')) {
      if (inList) {
        parts.push('</ul>');
        inList = false;
      }
      parts.push(`<h3 class="blog-prose-h3">${escapeHtml(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      if (inList) {
        parts.push('</ul>');
        inList = false;
      }
      parts.push(`<h2 class="blog-prose-h2">${escapeHtml(line.slice(3))}</h2>`);
    } else if (line.startsWith('- ')) {
      if (!inList) {
        parts.push('<ul class="blog-prose-ul">');
        inList = true;
      }
      const raw = line.slice(2);
      const inner = escapeHtml(raw).replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-primary dark:text-white">$1</strong>');
      parts.push(`<li class="blog-prose-li">${inner}</li>`);
    } else if (line.trim() === '') {
      if (inList) {
        parts.push('</ul>');
        inList = false;
      }
      parts.push('<div class="h-4"></div>');
    } else {
      if (inList) {
        parts.push('</ul>');
        inList = false;
      }
      const inner = escapeHtml(line).replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-primary dark:text-white">$1</strong>');
      parts.push(`<p class="blog-prose-p">${inner}</p>`);
    }
  });

  if (inList) parts.push('</ul>');
  return parts.join('\n');
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getReadingTimeMinutes(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200);
  return Math.max(1, minutes);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const formattedContent = formatContent(post.content);
  const readingTime = getReadingTimeMinutes(post.content);
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <BlogPostJsonLd post={post} />
      <BlogPostViewTracker slug={post.slug} />
      <Header />
      <main className="min-h-screen bg-background dark:bg-slate-900">
        <article>
          {/* Hero / header section */}
          <header className="relative pt-24 pb-12 overflow-hidden">
            <div className="absolute inset-0 hero-radial opacity-50" aria-hidden />
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium text-sm mb-8 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Blog
              </Link>

              <div className="flex flex-wrap items-center gap-4 text-sm text-accent mb-6">
                <time
                  dateTime={post.publishedAt}
                  className="inline-flex items-center gap-1.5"
                >
                  <Calendar size={16} />
                  {formatDate(post.publishedAt)}
                </time>
                <span className="inline-flex items-center gap-1.5">
                  <User size={16} />
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={16} />
                  {readingTime} min read
                </span>
              </div>

              <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white leading-tight tracking-tight">
                {post.title}
              </h1>
            </div>
          </header>

          {/* Featured image */}
          {post.image && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-12">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-700 shadow-soft">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 832px"
                  priority
                />
              </div>
            </div>
          )}

          {/* Prose content */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <aside className="mt-20 pt-16 border-t border-gray-200 dark:border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-heading font-bold text-2xl text-primary dark:text-white mb-8">
                  More from the blog
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/blog/${p.slug}`}
                      className="group block rounded-2xl bg-white dark:bg-slate-800 shadow-soft hover:shadow-soft-xl border border-gray-100 dark:border-white/10 overflow-hidden transition-all"
                    >
                      {p.image && (
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <time
                          dateTime={p.publishedAt}
                          className="text-accent text-xs font-medium"
                        >
                          {formatDate(p.publishedAt)}
                        </time>
                        <h3 className="font-heading font-semibold text-lg text-primary dark:text-white mt-1 mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {p.title}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-accent font-medium text-sm">
                          Read more
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* Back to blog footer */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-20">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
            >
              <ArrowLeft size={18} />
              Back to all posts
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
