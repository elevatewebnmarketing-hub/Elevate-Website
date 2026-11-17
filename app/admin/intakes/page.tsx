'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ClipboardList, Copy, Receipt, Trash2 } from 'lucide-react';
import { Breadcrumbs } from '@/admin/Breadcrumbs';
import { CardSkeleton } from '@/admin/Skeleton';
import { INTAKE_SECTIONS } from '@/lib/intake-questions';
import type { ClientIntake, IntakeStatus } from '@/backend/invoices';

const FORM_URL = 'https://www.elevatewebandmarketing.com/onboarding';
const STATUS_STYLE: Record<IntakeStatus, string> = {
  new: 'bg-blue-50 text-blue-700',
  reviewed: 'bg-emerald-50 text-emerald-700',
  archived: 'bg-gray-100 text-gray-600',
};

export default function AdminIntakesPage() {
  const [items, setItems] = useState<ClientIntake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [copied, setCopied] = useState('');

  function load() {
    fetch('/api/intake', { credentials: 'include', cache: 'no-store' })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || 'Could not load');
        setItems(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }
  useEffect(load, []);

  async function setStatus(id: string, status: IntakeStatus) {
    const res = await fetch(`/api/intake/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status }),
    });
    if (res.ok) setItems((list) => list.map((i) => (i.id === id ? { ...i, status } : i)));
  }

  async function remove(id: string) {
    if (!confirm('Delete this onboarding form for good?')) return;
    const res = await fetch(`/api/intake/${id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) setItems((list) => list.filter((i) => i.id !== id));
  }

  async function copy(text: string, what: string) {
    await navigator.clipboard.writeText(text);
    setCopied(what);
    setTimeout(() => setCopied(''), 2000);
  }

  // Plain-text copy of every answer, for pasting into a brief or an AI prompt.
  function asText(it: ClientIntake) {
    return INTAKE_SECTIONS.map((s) => {
      const lines = s.fields.filter((f) => it.data[f.id]).map((f) => `${f.label}:\n${it.data[f.id]}`);
      return lines.length ? `## ${s.title}\n${lines.join('\n\n')}` : '';
    })
      .filter(Boolean)
      .join('\n\n');
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Onboarding' }]} />
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-3xl text-primary mb-1">Onboarding forms</h1>
          <p className="text-text/80 max-w-2xl">
            Send new clients the form after the deposit. Their answers land here, and you get an email.
          </p>
        </div>
        <button
          type="button"
          onClick={() => copy(FORM_URL, 'link')}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition"
        >
          <Copy size={16} aria-hidden /> {copied === 'link' ? 'Copied' : 'Copy form link'}
        </button>
      </div>

      {error && <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">{error}</div>}

      {loading ? (
        <CardSkeleton />
      ) : items.length === 0 && !error ? (
        <div className="p-10 text-center bg-white rounded-card shadow-soft border border-gray-100">
          <ClipboardList className="mx-auto mb-3 text-text/40" size={32} aria-hidden />
          <p className="text-text/80">No forms yet. Send a client {FORM_URL}</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((it) => {
            const open = openId === it.id;
            return (
              <li key={it.id} className="bg-white rounded-card shadow-soft border border-gray-100">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : it.id)}
                  aria-expanded={open}
                  className="w-full flex flex-wrap items-center justify-between gap-3 p-5 text-left"
                >
                  <span>
                    <span className="font-heading font-semibold text-primary">{it.businessName}</span>
                    <span className="block text-sm text-text/70">
                      {it.contactName} · {it.phone || it.email} · {new Date(it.createdAt).toLocaleDateString('en-GB')}
                    </span>
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLE[it.status]}`}>{it.status}</span>
                </button>

                {open && (
                  <div className="px-5 pb-5 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2 py-4">
                      <Link
                        href={`/admin/invoices/new?intake=${it.id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-accent text-white rounded-lg hover:bg-accent/90"
                      >
                        <Receipt size={15} aria-hidden /> Create invoice
                      </Link>
                      <button type="button" onClick={() => copy(asText(it), it.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                        <Copy size={15} aria-hidden /> {copied === it.id ? 'Copied' : 'Copy all answers'}
                      </button>
                      {(['new', 'reviewed', 'archived'] as IntakeStatus[])
                        .filter((s) => s !== it.status)
                        .map((s) => (
                          <button key={s} type="button" onClick={() => setStatus(it.id, s)} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 capitalize">
                            Mark {s}
                          </button>
                        ))}
                      <button type="button" onClick={() => remove(it.id)} className="ml-auto p-1.5 text-text/50 hover:text-red-600" aria-label="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                      {INTAKE_SECTIONS.map((s) => {
                        const fields = s.fields.filter((f) => it.data[f.id]);
                        if (!fields.length) return null;
                        return (
                          <section key={s.id}>
                            <h3 className="font-heading font-semibold text-primary mb-2">{s.title}</h3>
                            <dl className="space-y-2 text-sm">
                              {fields.map((f) => (
                                <div key={f.id}>
                                  <dt className="text-text/60">{f.label}</dt>
                                  <dd className="whitespace-pre-line break-words">
                                    {f.type === 'url' && /^https?:\/\//.test(it.data[f.id]) ? (
                                      <a href={it.data[f.id]} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                        {it.data[f.id]}
                                      </a>
                                    ) : (
                                      it.data[f.id]
                                    )}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          </section>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
