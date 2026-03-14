'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/admin/Breadcrumbs';

export default function AdminBlogNewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Elevate Team',
    publishedAt: new Date().toISOString().slice(0, 10),
  });

  function slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  function handleTitleChange(title: string) {
    setForm((f) => ({ ...f, title, slug: slugify(title) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          publishedAt: form.publishedAt ? form.publishedAt + 'T00:00:00.000Z' : new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error('Failed to save');
      const post = await res.json();
      router.push(`/admin/blog`);
      router.refresh();
    } catch {
      alert('Failed to save post');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Blog Posts', href: '/admin/blog' },
          { label: 'New Post' },
        ]}
      />
      <h1 className="font-heading font-bold text-3xl text-primary mb-6">
        New Blog Post
      </h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block font-medium text-primary mb-2">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-primary mb-2">Slug (URL)</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block font-medium text-primary mb-2">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block font-medium text-primary mb-2">Content</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            rows={12}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none font-mono text-sm"
          />
          <div className="mt-2 p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm text-text/80">
            <p className="font-semibold text-primary mb-2">How to write content</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Use <strong>plain text</strong>—do not paste from Word or Google Docs with formatting; paste as plain text (Ctrl+Shift+V) to avoid HTML tags showing up.</li>
              <li><strong>Bold:</strong> wrap text in **double asterisks** (e.g. <code>**important**</code>)</li>
              <li><strong>Headings:</strong> start a line with <code>## </code> for section titles, <code>### </code> for subsections</li>
              <li><strong>Lists:</strong> start each item with <code>- </code> (dash and space)</li>
              <li><strong>Paragraphs:</strong> leave a blank line between paragraphs</li>
            </ul>
          </div>
        </div>

        <div>
          <label className="block font-medium text-primary mb-2">Publish date</label>
          <input
            type="date"
            value={form.publishedAt}
            onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block font-medium text-primary mb-2">Author</label>
          <input
            type="text"
            value={form.author}
            onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition disabled:opacity-70"
          >
            {loading ? 'Saving...' : 'Publish Post'}
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
