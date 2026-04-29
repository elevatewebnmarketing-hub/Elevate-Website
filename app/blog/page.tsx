import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getBlogPosts } from '@/lib/data';
import BlogPostList from './BlogPostList';

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const initialPage = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);
  const posts = await getBlogPosts();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background dark:bg-slate-900">
        <section className="relative pt-28 pb-16 overflow-hidden">
          <div className="absolute inset-0 hero-radial opacity-60" aria-hidden />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary dark:text-white mb-4 tracking-tight">
                Blog
              </h1>
              <p className="text-text/80 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
                Insights on web design, digital marketing, and growing your business online.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <BlogPostList posts={posts} initialPage={initialPage} />
        </div>
      </main>
      <Footer />
    </>
  );
}
