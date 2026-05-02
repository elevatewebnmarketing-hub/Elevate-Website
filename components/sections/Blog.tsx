'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  image?: string | null;
}

interface BlogProps {
  initialPosts?: BlogPost[];
}

export default function Blog({ initialPosts = [] }: BlogProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(initialPosts.length === 0);

  useEffect(() => {
    if (initialPosts.length > 0) {
      setLoading(false);
      return;
    }
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => setPosts(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [initialPosts.length]);

  return (
    <SectionWrapper id="blog" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
        >
          <div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white mb-4">
              Latest from the Blog
            </h2>
            <p className="text-text/80 dark:text-gray-300 text-lg max-w-2xl">
              Insights on web design, marketing, and growing your business online.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent font-heading font-semibold hover:underline"
          >
            View all posts
            <ArrowRight size={20} />
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-72 bg-gray-100 dark:bg-slate-800 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-text/80 dark:text-gray-300 py-12 text-center">No blog posts yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block h-full overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-soft hover:shadow-soft-xl border border-gray-100 dark:border-white/10 transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-slate-700">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/20 dark:from-primary/20 dark:to-accent/30" />
                    )}
                  </div>
                  <div className="p-6">
                    <time
                      dateTime={post.publishedAt}
                      className="text-accent text-sm font-medium"
                    >
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <h3 className="font-heading font-semibold text-xl text-primary dark:text-white mt-2 mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-text/80 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-accent font-medium text-sm group-hover:gap-2 transition-all">
                      Read more
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
