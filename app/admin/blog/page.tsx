'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, ExternalLink, Search } from 'lucide-react';
import { Breadcrumbs } from '@/admin/Breadcrumbs';
import { Skeleton, TableRowSkeleton } from '@/admin/Skeleton';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  image: string | null;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/blog', { credentials: 'include' })
      .then((res) => res.json())
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Delete this post?')) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) {
        setPosts((p) => p.filter((post) => post.id !== id));
      } else {
        alert('Failed to delete');
      }
    } catch {
      alert('Failed to delete');
    } finally {
      setDeleting(null);
    }
  }

  const [search, setSearch] = useState('');
  const filteredPosts = useMemo(() => {
    if (!search.trim()) return posts;
    const q = search.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.author?.toLowerCase().includes(q)
    );
  }, [posts, search]);

  if (loading) {
    return (
      <div>
        <Breadcrumbs items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Blog Posts' }]} />
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
        <div className="bg-white rounded-card shadow-soft border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="text-left px-4 py-3 text-sm font-semibold text-primary">Title</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-primary hidden sm:table-cell">Excerpt</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-primary">Date</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-primary hidden md:table-cell">Author</th>
                <th className="w-28 px-4 py-3 text-right text-sm font-semibold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRowSkeleton key={i} cols={4} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Blog Posts' }]} />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="font-heading font-bold text-3xl text-primary mb-1">
            Blog Posts
          </h1>
          <p className="text-text/80">Create and manage blog content</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition w-fit"
        >
          <Plus size={20} />
          New Post
        </Link>
      </div>

      <div className="mb-6 p-4 rounded-xl bg-blue-50/80 dark:bg-slate-800/50 border border-blue-100 dark:border-white/10 text-sm text-text/80">
        <p className="font-semibold text-primary dark:text-white mb-2">How to create a blog post</p>
        <ol className="list-decimal ml-4 space-y-1">
          <li>Click <strong>New Post</strong></li>
          <li>Enter Title, Excerpt, and Content (Content uses simple formatting—see the guide on the form)</li>
          <li><strong>Use plain text only</strong>—when pasting from Word or Docs, use <strong>Ctrl+Shift+V</strong> so HTML tags don’t appear in your post</li>
          <li>Formatting: <strong>**bold**</strong>, <code>## heading</code>, <code>- list item</code></li>
          <li>Click <strong>Publish Post</strong></li>
        </ol>
      </div>

      {posts.length > 0 && (
        <div className="relative mb-4 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text/50" size={18} />
          <input
            type="search"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none text-sm"
          />
        </div>
      )}

      <div className="bg-white rounded-card shadow-soft border border-gray-100 overflow-hidden">
        {filteredPosts.length === 0 ? (
          <div className="p-8 text-center text-text/80">
            {posts.length === 0 ? 'No blog posts yet.' : 'No posts match your search.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="text-left px-4 py-3 text-sm font-semibold text-primary">Title</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-primary hidden sm:table-cell">Excerpt</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-primary">Date</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-primary hidden md:table-cell">Author</th>
                  <th className="w-28 px-4 py-3 text-right text-sm font-semibold text-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition"
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-primary">{post.title}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-text/80 hidden sm:table-cell max-w-[200px] truncate">
                      {post.excerpt}
                    </td>
                    <td className="px-4 py-3 text-sm text-text/70 whitespace-nowrap">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-text/70 hidden md:table-cell">
                      {post.author}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 text-text/80 hover:text-accent hover:bg-accent/10 rounded-lg transition"
                          aria-label="View post"
                        >
                          <ExternalLink size={18} />
                        </Link>
                        <Link
                          href={`/admin/blog/edit/${post.id}`}
                          className="p-2 text-text/80 hover:text-accent hover:bg-accent/10 rounded-lg transition"
                          aria-label="Edit post"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deleting === post.id}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                          aria-label="Delete post"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
