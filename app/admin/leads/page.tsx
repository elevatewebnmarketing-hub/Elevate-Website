'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Inbox, Mail, MessageCircle, Phone, Receipt, Trash2, FolderKanban, Gauge, ExternalLink } from 'lucide-react';
import { Breadcrumbs } from '@/admin/Breadcrumbs';
import { CardSkeleton } from '@/admin/Skeleton';
import { LEAD_STATUSES, type Lead, type LeadStatus } from '@/lib/workflow';
import type { VisibilityCheckRecord, CheckFollowUp } from '@/backend/visibility-leads';

const FORM_LABEL: Record<string, string> = { quote: 'Quote form', contact: 'Contact form', 'visibility-check': 'Free AI check' };

const STATUS_STYLE: Record<LeadStatus, string> = {
  new: 'bg-blue-50 text-blue-700',
  contacted: 'bg-indigo-50 text-indigo-700',
  call_booked: 'bg-violet-50 text-violet-700',
  quoted: 'bg-amber-50 text-amber-800',
  won: 'bg-emerald-50 text-emerald-700',
  lost: 'bg-gray-100 text-gray-600',
};

function sourceOf(l: Lead) {
  if (l.utmSource) return `${l.utmSource}${l.utmCampaign ? ` · ${l.utmCampaign}` : ''}`;
  try {
    return l.page ? new URL(l.page).pathname : '';
  } catch {
    return '';
  }
}

export default function AdminLeadsPage() {
  const [items, setItems] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<LeadStatus | 'all' | 'open'>('open');
  const [openId, setOpenId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/api/leads', { credentials: 'include', cache: 'no-store' })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || 'Could not load leads');
        setItems(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const l of items) c[l.status] = (c[l.status] ?? 0) + 1;
    return c;
  }, [items]);
  const decided = (counts.won ?? 0) + (counts.lost ?? 0);
  const shown = items.filter((l) => (filter === 'all' ? true : filter === 'open' ? l.status !== 'won' && l.status !== 'lost' : l.status === filter));

  async function patch(id: string, body: Record<string, unknown>) {
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      setError((await res.json().catch(() => ({}))).error || 'Could not save');
      return false;
    }
    setItems((list) => list.map((l) => (l.id === id ? { ...l, ...(body as Partial<Lead>) } : l)));
    return true;
  }

  async function remove(id: string) {
    if (!confirm('Delete this lead for good?')) return;
    const res = await fetch(`/api/leads/${id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) setItems((l) => l.filter((x) => x.id !== id));
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Leads' }]} />
      <h1 className="font-heading font-bold text-3xl text-primary mb-1">Leads</h1>
      <p className="text-text/80 mb-6">Every contact form, quote form and free AI check request, saved here as well as emailed. Move each lead along as you talk.</p>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4" aria-label="Pipeline">
        {LEAD_STATUSES.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => setFilter(s.value)}
            aria-pressed={filter === s.value}
            className={`rounded-xl border p-3 text-left transition ${filter === s.value ? 'border-accent bg-accent/5' : 'border-gray-200 bg-white hover:border-accent'}`}
          >
            <span className="block font-heading font-bold text-2xl text-primary">{counts[s.value] ?? 0}</span>
            <span className="text-xs text-text/70">{s.label}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
        {(['open', 'all'] as const).map((f) => (
          <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f} className={`px-3 py-1.5 rounded-full border ${filter === f ? 'border-accent bg-accent/10 text-primary font-medium' : 'border-gray-200'}`}>
            {f === 'open' ? 'Still open' : 'All'}
          </button>
        ))}
        {decided > 0 && (
          <span className="ml-auto text-text/70">
            Won {counts.won ?? 0} of {decided} decided ({Math.round(((counts.won ?? 0) / decided) * 100)}%)
          </span>
        )}
      </div>

      {error && <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">{error}</div>}

      <WebsiteChecks />

      {loading ? (
        <CardSkeleton />
      ) : shown.length === 0 ? (
        <div className="p-10 text-center bg-white rounded-card shadow-soft border border-gray-100">
          <Inbox className="mx-auto mb-3 text-text/40" size={32} aria-hidden />
          <p className="text-text/80">{items.length ? 'No leads in this view.' : 'No leads yet. New enquiries from the contact and quote forms appear here.'}</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {shown.map((l) => {
            const open = openId === l.id;
            const wa = l.phone ? `https://wa.me/${l.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`Hi ${l.name.split(' ')[0]}, this is Ufuoma from Elevate Web & Marketing. Thanks for your enquiry.`)}` : '';
            return (
              <li key={l.id} className="bg-white rounded-card shadow-soft border border-gray-100">
                <button type="button" onClick={() => setOpenId(open ? null : l.id)} aria-expanded={open} className="w-full flex flex-wrap items-center justify-between gap-3 p-5 text-left">
                  <span>
                    <span className="font-heading font-semibold text-primary">{l.name}</span>
                    {l.industry && <span className="text-text/70"> · {l.industry}</span>}
                    <span className="block text-sm text-text/60">
                      {new Date(l.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
                      {l.form && ` · ${FORM_LABEL[l.form] ?? l.form}`}
                      {sourceOf(l) && ` · from ${sourceOf(l)}`}
                    </span>
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLE[l.status]}`}>
                    {LEAD_STATUSES.find((s) => s.value === l.status)?.label}
                  </span>
                </button>
                {open && (
                  <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {wa && (
                        <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                          <MessageCircle size={15} aria-hidden /> WhatsApp
                        </a>
                      )}
                      {l.phone && (
                        <a href={`tel:${l.phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                          <Phone size={15} aria-hidden /> Call
                        </a>
                      )}
                      {l.email && (
                        <a href={`mailto:${l.email}`} className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                          <Mail size={15} aria-hidden /> Email
                        </a>
                      )}
                      <Link href={`/admin/invoices/new?lead=${l.id}`} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-accent text-white rounded-lg hover:bg-accent/90">
                        <Receipt size={15} aria-hidden /> Create invoice
                      </Link>
                      <Link href={`/admin/projects/new?lead=${l.id}`} className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                        <FolderKanban size={15} aria-hidden /> Start project
                      </Link>
                      <button type="button" onClick={() => remove(l.id)} className="ml-auto p-1.5 text-text/50 hover:text-red-600" aria-label="Delete lead">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div>
                      <label htmlFor={`st-${l.id}`} className="block text-sm font-medium text-primary mb-1">Status</label>
                      <select id={`st-${l.id}`} value={l.status} onChange={(e) => patch(l.id, { status: e.target.value })} className="px-3 py-2 rounded-xl border border-gray-200 bg-white">
                        {LEAD_STATUSES.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                    <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      {(
                        [
                          ['Email', l.email],
                          ['WhatsApp / phone', l.phone],
                          ['Business / industry', l.industry],
                          ['Current website', l.website],
                          ['Project type', l.projectType],
                          ['Services', l.service],
                          ['Timeline', l.timeline],
                          ['Budget', l.budget],
                          ['Sent from', l.page],
                          ['Campaign', [l.utmSource, l.utmMedium, l.utmCampaign].filter(Boolean).join(' / ')],
                        ] as [string, string][]
                      )
                        .filter(([, v]) => v)
                        .map(([k, v]) => (
                          <div key={k}>
                            <dt className="text-text/60">{k}</dt>
                            <dd className="break-words">{v}</dd>
                          </div>
                        ))}
                    </dl>
                    {l.message && (
                      <div>
                        <p className="text-sm text-text/60">Message</p>
                        <p className="whitespace-pre-line">{l.message}</p>
                      </div>
                    )}
                    <div>
                      <label htmlFor={`n-${l.id}`} className="block text-sm font-medium text-primary mb-1">Your notes (private)</label>
                      <textarea
                        id={`n-${l.id}`}
                        rows={3}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
                        value={notes[l.id] ?? l.notes}
                        onChange={(e) => setNotes((n) => ({ ...n, [l.id]: e.target.value }))}
                        onBlur={() => notes[l.id] !== undefined && notes[l.id] !== l.notes && patch(l.id, { notes: notes[l.id] })}
                        placeholder="What you discussed, next step, follow-up date…"
                      />
                      <p className="text-xs text-text/60 mt-1">Saved when you click away.</p>
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

/** Free AI visibility checks from the last 30 days. Checks that left details are already leads below. */
function WebsiteChecks() {
  const [checks, setChecks] = useState<VisibilityCheckRecord[] | null>(null);
  const [problem, setProblem] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/api/visibility-checks', { credentials: 'include', cache: 'no-store' })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || 'Could not load website checks');
        setChecks(data);
      })
      .catch((e) => setProblem(e.message));
  }, []);

  async function mark(id: string, status: CheckFollowUp) {
    const res = await fetch(`/api/visibility-checks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status }),
    });
    if (res.ok) setChecks((list) => list?.map((c) => (c.id === id ? { ...c, status } : c)) ?? null);
  }

  if (problem) return <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">Website checks: {problem}</div>;
  if (!checks) return null;
  const todo = checks.filter((c) => c.status === 'new' && !c.leadId);
  const shown = showAll ? checks : todo;

  return (
    <section className="mb-8 bg-white rounded-card shadow-soft border border-gray-100 p-5" aria-labelledby="checks-h">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
        <h2 id="checks-h" className="font-heading font-semibold text-xl text-primary flex items-center gap-2">
          <Gauge size={20} aria-hidden /> Website checks
        </h2>
        <span className="text-sm text-text/70">
          {checks.length} in 30 days · {checks.filter((c) => c.leadId).length} left details · {todo.length} to look at
        </span>
      </div>
      <p className="text-sm text-text/70 mb-4">
        Everyone who ran the free AI check. The ones who left details are leads below. For the rest, look the site up and follow the one-message rule in{' '}
        <code>business/operations/lead-follow-up.md</code>.
      </p>
      {shown.length === 0 ? (
        <p className="text-sm text-text/70">{checks.length ? 'Nothing waiting. Every check is followed up.' : 'No checks yet.'}</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {shown.slice(0, 50).map((c) => (
            <li key={c.id} className="py-3 flex flex-wrap items-center gap-3">
              <span className={`w-12 text-center font-heading font-bold rounded-lg py-1 ${c.score >= 85 ? 'bg-emerald-50 text-emerald-700' : c.score >= 60 ? 'bg-amber-50 text-amber-800' : 'bg-red-50 text-red-700'}`}>
                {c.score}
              </span>
              <span className="flex-1 min-w-[12rem]">
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:text-accent inline-flex items-center gap-1">
                  {c.host} <ExternalLink size={13} aria-hidden />
                </a>
                <span className="block text-xs text-text/60">
                  {new Date(c.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
                  {c.utmSource && ` · from ${c.utmSource}${c.utmCampaign ? ` · ${c.utmCampaign}` : ''}`}
                  {` · ${c.checks.filter((x) => x.status !== 'pass').length} to fix`}
                </span>
              </span>
              {c.leadId ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">Left details: see lead</span>
              ) : c.status === 'new' ? (
                <span className="flex gap-2">
                  <button type="button" onClick={() => mark(c.id, 'followed_up')} className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
                    Followed up
                  </button>
                  <button type="button" onClick={() => mark(c.id, 'not_a_fit')} className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
                    Not a fit
                  </button>
                </span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{c.status === 'followed_up' ? 'Followed up' : 'Not a fit'}</span>
              )}
            </li>
          ))}
        </ul>
      )}
      {checks.length > todo.length && (
        <button type="button" onClick={() => setShowAll((v) => !v)} className="mt-3 text-sm text-accent hover:underline">
          {showAll ? 'Show only the ones to look at' : 'Show all checks'}
        </button>
      )}
    </section>
  );
}
