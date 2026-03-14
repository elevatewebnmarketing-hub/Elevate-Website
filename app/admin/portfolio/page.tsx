'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';
import { Breadcrumbs } from '@/admin/Breadcrumbs';
import { CardSkeleton } from '@/admin/Skeleton';
import { SERVICE_OPTIONS, getServiceLabel } from '@/lib/services';

interface PortfolioItem {
  id: string;
  name: string;
  industry: string;
  description: string;
  image: string | null;
  url: string | null;
  featured: boolean;
  service: string | null;
  problem: string | null;
  solution: string | null;
  screenshots: string[];
  technologies: string[];
  result: string | null;
  ownerName: string | null;
  ownerJob: string | null;
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<PortfolioItem>>({
    name: '',
    industry: '',
    description: '',
    image: null,
    url: null,
    featured: false,
    service: null,
    problem: null,
    solution: null,
    screenshots: [],
    technologies: [],
    result: null,
    ownerName: null,
    ownerJob: null,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function loadItems() {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing
        ? `/api/portfolio/${editing.id}`
        : '/api/portfolio';
      const method = editing ? 'PUT' : 'POST';
      const body = editing
        ? { ...form, id: editing.id }
        : form;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Failed to save');
      setForm({
        name: '',
        industry: '',
        description: '',
        image: null,
        url: null,
        featured: false,
        service: null,
        problem: null,
        solution: null,
        screenshots: [],
        technologies: [],
        result: null,
        ownerName: null,
        ownerJob: null,
      });
      setEditing(null);
      setShowForm(false);
      loadItems();
    } catch {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this project?')) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (res.ok) loadItems();
      else alert('Failed to delete');
    } catch {
      alert('Failed to delete');
    }
  }

  function startEdit(item: PortfolioItem) {
    setEditing(item);
    setForm({
      ...item,
      screenshots: Array.isArray(item.screenshots) ? item.screenshots : [],
      technologies: Array.isArray(item.technologies) ? item.technologies : [],
    });
    setShowForm(true);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload/portfolio', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      setForm((f) => ({ ...f, image: url }));
    } catch {
      alert('Failed to upload image');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  function cancelForm() {
    setEditing(null);
    setForm({
      name: '',
      industry: '',
      description: '',
      image: null,
      url: null,
      featured: false,
      service: null,
      problem: null,
      solution: null,
      screenshots: [],
      technologies: [],
      result: null,
      ownerName: null,
      ownerJob: null,
    });
    setShowForm(false);
  }

  if (loading) {
    return (
      <div>
        <Breadcrumbs items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Portfolio' }]} />
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 w-40 bg-gray-200/80 rounded-lg animate-pulse mb-2" />
            <div className="h-4 w-32 bg-gray-200/80 rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-gray-200/80 rounded-xl animate-pulse" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Portfolio' }]} />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-bold text-3xl text-primary mb-1">
            Portfolio
          </h1>
          <p className="text-text/80">
            Manage projects · {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        <button
          onClick={() => {
            cancelForm();
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 p-6 bg-white rounded-card shadow-soft border border-gray-100 space-y-4"
        >
          <h2 className="font-heading font-semibold text-primary">
            {editing ? 'Edit Project' : 'New Project'}
          </h2>
          <div>
            <label className="block font-medium text-primary mb-2">Name</label>
            <input
              type="text"
              value={form.name || ''}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-primary mb-2">Industry</label>
            <input
              type="text"
              value={form.industry || ''}
              onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            />
          </div>
          <div>
            <label className="block font-medium text-primary mb-2">Service</label>
            <select
              value={form.service ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, service: e.target.value || null }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            >
              <option value="">None</option>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-primary mb-2">Description</label>
            <textarea
              value={form.description || ''}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
              placeholder="What the website does and key features"
            />
          </div>
          <div>
            <label className="block font-medium text-primary mb-2">Problem it solves</label>
            <textarea
              value={form.problem || ''}
              onChange={(e) => setForm((f) => ({ ...f, problem: e.target.value || null }))}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
              placeholder="e.g. Clients couldn't book online; no central menu"
            />
          </div>
          <div>
            <label className="block font-medium text-primary mb-2">Our solution</label>
            <textarea
              value={form.solution || ''}
              onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value || null }))}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
              placeholder="Summary of what we built and how it helped"
            />
          </div>
          <div>
            <label className="block font-medium text-primary mb-2">Screenshots (one URL per line)</label>
            <textarea
              value={Array.isArray(form.screenshots) ? form.screenshots.join('\n') : ''}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  screenshots: e.target.value
                    .split('\n')
                    .map((s) => s.trim())
                    .filter(Boolean),
                }))
              }
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
              placeholder={'https://example.com/shot1.png\nhttps://example.com/shot2.png'}
            />
          </div>
          <div>
            <label className="block font-medium text-primary mb-2">Technologies (comma-separated)</label>
            <input
              type="text"
              value={Array.isArray(form.technologies) ? form.technologies.join(', ') : ''}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  technologies: e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                }))
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
              placeholder="e.g. Next.js, React, Tailwind CSS"
            />
          </div>
          <div>
            <label className="block font-medium text-primary mb-2">Result / outcome</label>
            <input
              type="text"
              value={form.result || ''}
              onChange={(e) => setForm((f) => ({ ...f, result: e.target.value || null }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
              placeholder="e.g. Traffic up 40%, 2x more leads"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-primary mb-2">Owner / client name</label>
              <input
                type="text"
                value={form.ownerName || ''}
                onChange={(e) => setForm((f) => ({ ...f, ownerName: e.target.value || null }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                placeholder="e.g. Sarah Mitchell"
              />
            </div>
            <div>
              <label className="block font-medium text-primary mb-2">Owner job title</label>
              <input
                type="text"
                value={form.ownerJob || ''}
                onChange={(e) => setForm((f) => ({ ...f, ownerJob: e.target.value || null }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                placeholder="e.g. Owner, Salon Director"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium text-primary mb-2">Screenshot / thumbnail</label>
            <div className="flex flex-wrap items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition disabled:opacity-60"
              >
                <Upload size={20} />
                {uploading ? 'Uploading...' : 'Upload image'}
              </button>
              {form.image && (
                <div className="flex items-center gap-2">
                  <img
                    src={form.image}
                    alt="Preview"
                    className="h-14 w-auto rounded-lg border border-gray-200 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, image: null }))}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
              <span className="text-sm text-text/60">or paste URL below</span>
            </div>
            <input
              type="text"
              value={form.image || ''}
              onChange={(e) =>
                setForm((f) => ({ ...f, image: e.target.value || null }))
              }
              placeholder="https://... or upload above"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            />
          </div>
          <div>
            <label className="block font-medium text-primary mb-2">Project URL</label>
            <input
              type="text"
              value={form.url || ''}
              onChange={(e) =>
                setForm((f) => ({ ...f, url: e.target.value || null }))
              }
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured || false}
              onChange={(e) =>
                setForm((f) => ({ ...f, featured: e.target.checked }))
              }
              className="rounded border-gray-300 text-accent focus:ring-accent"
            />
            <label htmlFor="featured" className="text-primary">
              Featured
            </label>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition disabled:opacity-70"
            >
              {saving ? 'Saving...' : editing ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={cancelForm}
              className="px-6 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="bg-white rounded-card shadow-soft border border-gray-100 p-12 text-center text-text/80">
            No portfolio items yet. Add your first project above.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between p-6 bg-white rounded-card shadow-soft border border-gray-100 hover:shadow-soft-xl transition-shadow"
            >
              <div className="flex gap-4 items-start min-w-0">
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    className="h-16 w-24 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                  />
                )}
                <div className="min-w-0">
                  <h2 className="font-heading font-semibold text-primary">
                    {item.name}
                  </h2>
                  <p className="text-accent text-sm mb-1">{item.industry}</p>
                  <p className="text-text/80 text-sm">{item.description}</p>
                  {item.service && (
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
                      {getServiceLabel(item.service)}
                    </span>
                  )}
                  {item.ownerName && (
                    <p className="text-text/60 text-xs mt-1">
                      {item.ownerName}
                      {item.ownerJob && <> · {item.ownerJob}</>}
                    </p>
                  )}
                  {item.featured && (
                  <span className="inline-block mt-2 text-xs px-2 py-1 bg-accent/10 text-accent rounded">
                    Featured
                  </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 text-text/80 hover:text-accent transition"
                  aria-label="Edit"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                  aria-label="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
