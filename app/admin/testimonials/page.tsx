'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Breadcrumbs } from '@/admin/Breadcrumbs';
import { CardSkeleton } from '@/admin/Skeleton';

interface Testimonial {
  id: string;
  name: string;
  business: string;
  review: string;
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Testimonial>>({
    name: '',
    business: '',
    review: '',
  });
  const [saving, setSaving] = useState(false);

  function loadItems() {
    fetch('/api/testimonials')
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
        ? `/api/testimonials/${editing.id}`
        : '/api/testimonials';
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
      setForm({ name: '', business: '', review: '' });
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
    if (!confirm('Delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) loadItems();
      else alert('Failed to delete');
    } catch {
      alert('Failed to delete');
    }
  }

  function startEdit(item: Testimonial) {
    setEditing(item);
    setForm(item);
    setShowForm(true);
  }

  function cancelForm() {
    setEditing(null);
    setForm({ name: '', business: '', review: '' });
    setShowForm(false);
  }

  if (loading) {
    return (
      <div>
        <Breadcrumbs items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Testimonials' }]} />
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 w-36 bg-gray-200/80 rounded-lg animate-pulse mb-2" />
            <div className="h-4 w-40 bg-gray-200/80 rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-36 bg-gray-200/80 rounded-xl animate-pulse" />
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
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Testimonials' }]} />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-bold text-3xl text-primary mb-1">
            Testimonials
          </h1>
          <p className="text-text/80">
            Manage client reviews · {items.length} {items.length === 1 ? 'review' : 'reviews'}
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
          Add Testimonial
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 p-6 bg-white rounded-card shadow-soft border border-gray-100 space-y-4"
        >
          <h2 className="font-heading font-semibold text-primary">
            {editing ? 'Edit Testimonial' : 'New Testimonial'}
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
            <label className="block font-medium text-primary mb-2">Business</label>
            <input
              type="text"
              value={form.business || ''}
              onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-primary mb-2">Review</label>
            <textarea
              value={form.review || ''}
              onChange={(e) => setForm((f) => ({ ...f, review: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
              required
            />
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
            No testimonials yet. Add your first review above.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between p-6 bg-white rounded-card shadow-soft border border-gray-100 hover:shadow-soft-xl transition-shadow"
            >
              <div>
                <h2 className="font-heading font-semibold text-primary">
                  {item.name}
                </h2>
                <p className="text-accent text-sm mb-2">{item.business}</p>
                <p className="text-text/80 text-sm">{item.review}</p>
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
