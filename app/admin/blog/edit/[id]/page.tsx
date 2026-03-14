'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Breadcrumbs } from '@/admin/Breadcrumbs';
import { Skeleton } from '@/admin/Skeleton';

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

export default function AdminBlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch(`/api/blog/${id}`, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(setForm)
      .catch(() => setForm(null))
      .finally(() => setFetching(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include',
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) {
          alert('Session expired. Please log in again.');
          router.push('/admin/login');
          return;
        }
        throw new Error(data.error || 'Failed to save');
      }
      router.push('/admin/blog');
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/admin' },
            { label: 'Blog Posts', href: '/admin/blog' },
            { label: 'Edit' },
          ]}
        />
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl mb-6" />
        <Skeleton className="h-10 w-full max-w-2xl mb-4" />
        <Skeleton className="h-10 w-full max-w-2xl mb-4" />
        <Skeleton className="h-24 w-full max-w-2xl" />
      </div>
    );
  }
  if (!form) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/admin' },
            { label: 'Blog Posts', href: '/admin/blog' },
            { label: 'Edit' },
          ]}
        />
        <p className="text-text/80">Post not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Blog Posts', href: '/admin/blog' },
          { label: form.title || 'Edit Post' },
        ]}
      />
      <h1 className="font-heading font-bold text-3xl text-primary mb-6">
        Edit Blog Post
      </h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block font-medium text-primary mb-2">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-primary mb-2">Slug (URL)</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block font-medium text-primary mb-2">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block font-medium text-primary mb-2">Content</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={12}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none font-mono text-sm"
          />
          <div className="mt-2 p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm text-text/80">
            <p className="font-semibold text-primary mb-2">Content formatting</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Use plain text—paste as <strong>Ctrl+Shift+V</strong> (plain paste) to avoid HTML tags appearing in your post.</li>
              <li><strong>Bold:</strong> **text** • <strong>Headings:</strong> ## or ### at start of line • <strong>Lists:</strong> - at start of line</li>
            </ul>
          </div>
        </div>

        <div>
          <label className="block font-medium text-primary mb-2">Publish date</label>
          <input
            type="date"
            value={form.publishedAt ? form.publishedAt.slice(0, 10) : ''}
            onChange={(e) => setForm({ ...form, publishedAt: e.target.value ? e.target.value + 'T00:00:00.000Z' : form.publishedAt })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block font-medium text-primary mb-2">Author</label>
          <input
            type="text"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition disabled:opacity-70"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href="/admin/blog"
            className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
