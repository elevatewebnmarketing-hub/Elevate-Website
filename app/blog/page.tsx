import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getBlogPosts } from '@/lib/data';
import type { Metadata } from 'next';
import BlogPostList from './BlogPostList';
import { guides } from '@/lib/guides';

// The guides are listed with the posts so they're reachable from the blog, not only the footer.
const guideEntries = [
  ...guides.map((g) => ({
    id: `guide-${g.slug}`,
    slug: g.slug,
    href: `/guides/${g.slug}`,
    title: g.title,
    excerpt: g.description,
    publishedAt: g.published,
    author: 'Ufuoma Onakpoyan',
    image: g.image,
  })),
  {
    id: 'guide-how-to-get-more-customers',
    slug: 'how-to-get-more-customers',
    href: '/how-to-get-more-customers',
    title: 'How to Get More Customers Online',
    excerpt:
      'A plain-English guide for business owners: how an SEO-ready website, Google Business Profile and reviews bring customers who are already searching for you.',
    publishedAt: '2026-10-17',
    author: 'Ufuoma Onakpoyan',
    image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&q=80',
  },
];

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ page?: string }> }): Promise<Metadata> {
  const page = parseInt((await searchParams).page ?? '1', 10);
  // Page 2+ canonicalise to themselves so Google follows the posts listed there.
  return page > 1 ? { title: `Blog: Page ${page}`, alternates: { canonical: `/blog?page=${page}` } } : {};
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const initialPage = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);
  const posts = [...(await getBlogPosts()), ...guideEntries].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

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
                Guides and articles on getting your business found on Google and ChatGPT, and turning your website into a source of customers.
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
