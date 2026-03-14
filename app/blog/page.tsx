'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';

const POSTS_PER_PAGE = 6;

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  image?: string | null;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const searchParams = useSearchParams();
  const pageFromUrl = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = useMemo(() => {
    if (posts.length <= 6) return 1;
    return 1 + Math.ceil((posts.length - 6) / POSTS_PER_PAGE);
  }, [posts.length]);
  const safePage = Math.min(currentPage, totalPages);
  const featuredPost = safePage === 1 ? posts[0] ?? null : null;
  const gridPosts = useMemo(() => {
    if (safePage === 1) return posts.slice(1, 6);
    const start = 6 + (safePage - 2) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [posts, safePage]);

  const setPage = (p: number) => {
    const next = Math.max(1, Math.min(p, totalPages));
    setCurrentPage(next);
    const url = new URL(window.location.href);
    url.searchParams.set('page', String(next));
    window.history.replaceState({}, '', url.pathname + url.search);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background dark:bg-slate-900">
        {/* Hero section */}
        <section className="relative pt-28 pb-16 overflow-hidden">
          <div className="absolute inset-0 hero-radial opacity-60" aria-hidden />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary dark:text-white mb-4 tracking-tight">
                Blog
              </h1>
              <p className="text-text/80 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
                Insights on web design, digital marketing, and growing your business online.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-80 bg-gray-100 dark:bg-slate-800 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-text/80 dark:text-gray-400 text-lg">No blog posts yet.</p>
              <p className="text-text/60 dark:text-gray-500 mt-1 text-sm">
                Check back soon for new content.
              </p>
            </div>
          ) : (
            <>
              {/* Featured post (only on page 1) */}
              {safePage === 1 && featuredPost && (
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-16"
                >
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="group block overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-soft hover:shadow-soft-xl border border-gray-100 dark:border-white/10 transition-all duration-300"
                  >
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="relative aspect-video lg:aspect-auto lg:min-h-[360px] overflow-hidden">
                        {featuredPost.image ? (
                          <Image
                            src={featuredPost.image}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/20 dark:from-primary/20 dark:to-accent/30" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-accent mb-4">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar size={14} />
                            {formatDate(featuredPost.publishedAt)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <User size={14} />
                            {featuredPost.author}
                          </span>
                        </div>
                        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-primary dark:text-white mb-4 group-hover:text-accent transition-colors leading-tight">
                          {featuredPost.title}
                        </h2>
                        <p className="text-text/80 dark:text-gray-300 leading-relaxed mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                          Read article
                          <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              )}

              {/* Grid of posts (skip featured on page 1) */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {gridPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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
                            alt=""
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/20 dark:from-primary/20 dark:to-accent/30" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-6">
                        <time
                          dateTime={post.publishedAt}
                          className="text-accent text-sm font-medium"
                        >
                          {formatDate(post.publishedAt)}
                        </time>
                        <h3 className="font-heading font-bold text-xl text-primary dark:text-white mt-2 mb-3 group-hover:text-accent transition-colors line-clamp-2">
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

              {totalPages > 1 && (
                <nav
                  className="flex flex-wrap items-center justify-between gap-4 pt-12 mt-12 border-t border-gray-200 dark:border-white/10"
                  aria-label="Blog pagination"
                >
                  <p className="text-text/80 dark:text-gray-400 text-sm">
                    Page {safePage} of {totalPages}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPage(safePage - 1)}
                      disabled={safePage <= 1}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/20 text-primary dark:text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    >
                      <ChevronLeft size={18} />
                      Previous
                    </button>
                    {totalPages <= 7 && (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPage(p)}
                            className={`min-w-[2.5rem] h-10 rounded-xl font-medium transition-colors ${
                              p === safePage
                                ? 'bg-accent text-white'
                                : 'text-primary dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                            }`}
                            aria-current={p === safePage ? 'page' : undefined}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setPage(safePage + 1)}
                      disabled={safePage >= totalPages}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/20 text-primary dark:text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    >
                      Next
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </nav>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
