'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Check, Copy, ExternalLink, FileText, Link2, Plus, Save, Star, Trash2 } from 'lucide-react';
import { Breadcrumbs } from '@/admin/Breadcrumbs';
import { CardSkeleton } from '@/admin/Skeleton';
import { siteConfig } from '@/lib/site-config';
import {
  LAUNCH_CHECKLIST,
  LAUNCH_ITEM_COUNT,
  PROJECT_STAGES,
  emptyProject,
  type FeedbackRound,
  type Project,
  type ProjectItem,
} from '@/lib/workflow';

const input = 'w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none bg-white';
const label = 'block text-sm font-medium text-primary mb-1.5';
const card = 'p-6 bg-white rounded-card shadow-soft border border-gray-100';
const SITE = 'https://www.elevatewebandmarketing.com';

type Draft = ReturnType<typeof emptyProject> & Partial<Pick<Project, 'id' | 'publicToken' | 'launchApprovedAt' | 'launchApprovedName'>>;

export default function AdminProjectPage() {
  const router = useRouter();
  const params = useParams();
  const search = useSearchParams();
  const id = params.id as string;
  const isNew = id === 'new';

  const [p, setP] = useState<Draft>(emptyProject());
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [feedback, setFeedback] = useState<FeedbackRound[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [newItem, setNewItem] = useState({ label: '', hint: '' });

  const load = useCallback(() => {
    Promise.all([
      fetch(`/api/projects/${id}`, { credentials: 'include', cache: 'no-store' }).then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || 'Could not load project');
        return d;
      }),
      fetch(`/api/projects/${id}/items`, { credentials: 'include', cache: 'no-store' }).then((r) => (r.ok ? r.json() : [])),
      fetch(`/api/projects/${id}/feedback`, { credentials: 'include', cache: 'no-store' }).then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([proj, its, fb]) => {
        setP(proj);
        setItems(its);
        setFeedback(fb);
      })
      .catch((e) => setMessage({ kind: 'err', text: e.message }))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!isNew) {
      load();
      return;
    }
    // New project: fill in from a lead, an onboarding form or an invoice.
    const lead = search.get('lead');
    const intake = search.get('intake');
    const invoice = search.get('invoice');
    if (lead)
      fetch(`/api/leads/${lead}`, { credentials: 'include' })
        .then((r) => (r.ok ? r.json() : null))
        .then((l) => l && setP((x) => ({ ...x, leadId: l.id, clientName: l.name, clientBusiness: l.industry, clientEmail: l.email, clientPhone: l.phone, title: `${l.industry || l.name} website` })))
        .catch(() => {});
    if (intake)
      fetch(`/api/intake/${intake}`, { credentials: 'include' })
        .then((r) => (r.ok ? r.json() : null))
        .then((it) => it && setP((x) => ({ ...x, intakeId: it.id, clientName: it.contactName, clientBusiness: it.businessName, clientEmail: it.email, clientPhone: it.phone, title: `${it.businessName} website` })))
        .catch(() => {});
    if (invoice)
      fetch(`/api/invoices/${invoice}`, { credentials: 'include' })
        .then((r) => (r.ok ? r.json() : null))
        .then((inv) => inv && setP((x) => ({ ...x, invoiceId: inv.id, clientName: inv.clientName, clientBusiness: inv.clientBusiness, clientEmail: inv.clientEmail, clientPhone: inv.clientPhone, title: `${inv.clientBusiness || inv.clientName} website` })))
        .catch(() => {});
  }, [isNew, load, search]);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setP((x) => ({ ...x, [k]: v }));
  const clientUrl = p.publicToken ? `${SITE}/p/${p.publicToken}` : '';
  const doneItems = items.filter((i) => i.done).length;
  const ticked = useMemo(() => Object.values(p.launchChecklist).filter(Boolean).length, [p.launchChecklist]);
  const roundsUsed = feedback.length;

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(isNew ? '/api/projects' : `/api/projects/${id}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(p),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save');
      setP(data);
      setMessage({ kind: 'ok', text: 'Saved' });
      if (isNew) router.replace(`/admin/projects/${data.id}`);
    } catch (e) {
      setMessage({ kind: 'err', text: e instanceof Error ? e.message : 'Could not save' });
    } finally {
      setSaving(false);
    }
  }

  async function copy(text: string, what: string) {
    await navigator.clipboard.writeText(text).catch(() => {});
    setMessage({ kind: 'ok', text: `${what} copied` });
  }

  async function itemApi(path: string, method: string, body?: object) {
    const res = await fetch(`/api/projects/${id}/items${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    if (!res.ok) return setMessage({ kind: 'err', text: data.error || 'Could not update' });
    setItems(data);
  }

  async function feedbackStatus(fid: string, status: 'received' | 'done') {
    const res = await fetch(`/api/projects/${id}/feedback/${fid}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status }),
    });
    if (res.ok) setFeedback(await res.json());
  }

  async function remove() {
    if (!confirm('Delete this project, its checklist and review rounds? This cannot be undone.')) return;
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) router.push('/admin/projects');
  }

  const first = p.clientName.split(' ')[0] || 'there';
  const linkMessage = `Hi ${first}, here is your project page for ${p.title}: ${clientUrl}\n\nIt shows where we are, and what we still need from you. You can tick things off and paste links there. When the website is ready, you'll send your changes and approve it there too.`;
  const reviewMessage = `Hi ${first}, thank you for working with us on ${p.title}. If you're happy with your website, an honest Google review would help us a lot: ${siteConfig.googleProfileUrl}\n\nAnd if you know another business owner who needs this, we'd be grateful for an introduction. Thank you!`;

  if (loading) return <CardSkeleton />;

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Projects', href: '/admin/projects' }, { label: isNew ? 'New project' : p.title }]} />
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="font-heading font-bold text-3xl text-primary">{isNew ? 'New project' : p.title}</h1>
        <div className="flex flex-wrap gap-2">
          {!isNew && clientUrl && (
            <>
              <button type="button" onClick={() => copy(linkMessage, 'Message with the project link')} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
                <Link2 size={16} aria-hidden /> Copy client link message
              </button>
              <a href={clientUrl.replace(SITE, '')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
                <ExternalLink size={16} aria-hidden /> Client view
              </a>
            </>
          )}
          <button type="button" onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 disabled:opacity-70">
            <Save size={16} aria-hidden /> {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {message && (
        <div role="status" className={`mb-6 p-3 rounded-xl text-sm ${message.kind === 'ok' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className={card}>
            <h2 className="font-heading font-semibold text-primary mb-4">Project</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={label} htmlFor="title">Title *</label>
                <input id="title" className={input} value={p.title} onChange={(e) => set('title', e.target.value)} placeholder="Ada Dental website" />
              </div>
              <div>
                <label className={label} htmlFor="clientName">Client name *</label>
                <input id="clientName" className={input} value={p.clientName} onChange={(e) => set('clientName', e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="clientBusiness">Business</label>
                <input id="clientBusiness" className={input} value={p.clientBusiness} onChange={(e) => set('clientBusiness', e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="clientEmail">Email</label>
                <input id="clientEmail" type="email" className={input} value={p.clientEmail} onChange={(e) => set('clientEmail', e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="clientPhone">WhatsApp / phone</label>
                <input id="clientPhone" type="tel" className={input} value={p.clientPhone} onChange={(e) => set('clientPhone', e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="stagingUrl">Preview link (for the client to review)</label>
                <input id="stagingUrl" type="url" className={input} value={p.stagingUrl} onChange={(e) => set('stagingUrl', e.target.value)} placeholder="https://…vercel.app" />
              </div>
              <div>
                <label className={label} htmlFor="liveUrl">Live website</label>
                <input id="liveUrl" type="url" className={input} value={p.liveUrl} onChange={(e) => set('liveUrl', e.target.value)} placeholder="https://www.…" />
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="notes">Private notes</label>
                <textarea id="notes" rows={3} className={input} value={p.notes} onChange={(e) => set('notes', e.target.value)} />
              </div>
            </div>
          </section>

          {!isNew && (
            <section className={card}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h2 className="font-heading font-semibold text-primary">What we need from the client</h2>
                <span className="text-sm text-text/70">{doneItems} of {items.length} done</span>
              </div>
              <ul className="divide-y divide-gray-100">
                {items.map((it) => (
                  <li key={it.id} className="py-3 flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={it.done}
                      onChange={(e) => {
                        const done = e.target.checked;
                        setItems((list) => list.map((x) => (x.id === it.id ? { ...x, done } : x)));
                        itemApi(`/${it.id}`, 'PATCH', { done });
                      }}
                      className="mt-1 h-4 w-4 accent-[#4F9CF9]"
                      aria-label={`Mark “${it.label}” done`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${it.done ? 'text-text/60 line-through' : 'text-primary'}`}>{it.label}</p>
                      {it.hint && <p className="text-xs text-text/60">{it.hint}</p>}
                      {it.clientNote && <p className="mt-1 text-sm whitespace-pre-line break-words bg-gray-50 rounded-lg px-2 py-1">Client: {it.clientNote}</p>}
                    </div>
                    <button type="button" onClick={() => itemApi(`/${it.id}`, 'DELETE')} className="p-1.5 text-text/50 hover:text-red-600" aria-label={`Remove “${it.label}”`}>
                      <Trash2 size={15} />
                    </button>
                  </li>
                ))}
              </ul>
              <form
                className="mt-3 grid sm:grid-cols-[1fr_1fr_auto] gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newItem.label.trim()) return;
                  itemApi('', 'POST', newItem).then(() => setNewItem({ label: '', hint: '' }));
                }}
              >
                <input aria-label="What you need" className={input} placeholder="Add something you need…" value={newItem.label} onChange={(e) => setNewItem({ ...newItem, label: e.target.value })} />
                <input aria-label="Hint for the client" className={input} placeholder="Hint (optional)" value={newItem.hint} onChange={(e) => setNewItem({ ...newItem, hint: e.target.value })} />
                <button type="submit" className="flex items-center justify-center gap-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
                  <Plus size={16} aria-hidden /> Add
                </button>
              </form>
            </section>
          )}

          {!isNew && (
            <section className={card}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h2 className="font-heading font-semibold text-primary">Review rounds</h2>
                <span className={`text-sm ${roundsUsed > p.roundsIncluded ? 'text-amber-800 font-medium' : 'text-text/70'}`}>
                  {roundsUsed} of {p.roundsIncluded} included rounds used
                </span>
              </div>
              {feedback.length === 0 ? (
                <p className="text-sm text-text/70">No changes sent yet. When the stage is “Your review”, the client can send changes from their page.</p>
              ) : (
                <ol className="space-y-4">
                  {feedback.map((f) => (
                    <li key={f.id} className="rounded-xl border border-gray-200 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <p className="font-medium text-primary">
                          Round {f.round}
                          {f.round > p.roundsIncluded && <span className="ml-2 text-xs text-amber-800 bg-amber-50 rounded-full px-2 py-0.5">extra: quote first</span>}
                          <span className="text-sm font-normal text-text/60"> · {f.submittedName}, {new Date(f.submittedAt).toLocaleDateString('en-GB')}</span>
                        </p>
                        <button
                          type="button"
                          onClick={() => feedbackStatus(f.id, f.status === 'done' ? 'received' : 'done')}
                          className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full border ${f.status === 'done' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-gray-200'}`}
                        >
                          <Check size={14} aria-hidden /> {f.status === 'done' ? 'Done' : 'Mark done'}
                        </button>
                      </div>
                      <ol className="list-decimal pl-5 space-y-1 text-sm">
                        {f.items.map((i, k) => (
                          <li key={k} className="whitespace-pre-line">
                            {i.page && <strong>{i.page}: </strong>}
                            {i.change}
                          </li>
                        ))}
                      </ol>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          )}

          {!isNew && (
            <section className={card}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h2 className="font-heading font-semibold text-primary">Launch checklist</h2>
                <span className="text-sm text-text/70">{ticked} of {LAUNCH_ITEM_COUNT}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 mb-4 overflow-hidden" aria-hidden>
                <div className="h-full bg-accent" style={{ width: `${(ticked / LAUNCH_ITEM_COUNT) * 100}%` }} />
              </div>
              <div className="space-y-5">
                {LAUNCH_CHECKLIST.map((g) => (
                  <fieldset key={g.group}>
                    <legend className="text-sm font-semibold text-primary mb-2">{g.group}</legend>
                    <div className="space-y-1.5">
                      {g.items.map((it) => (
                        <label key={it.id} className="flex items-start gap-2.5 text-sm">
                          <input
                            type="checkbox"
                            checked={!!p.launchChecklist[it.id]}
                            onChange={(e) => set('launchChecklist', { ...p.launchChecklist, [it.id]: e.target.checked })}
                            className="mt-0.5 h-4 w-4 accent-[#4F9CF9]"
                          />
                          <span className={p.launchChecklist[it.id] ? 'text-text/60 line-through' : ''}>{it.label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>
              <p className="text-xs text-text/60 mt-3">Ticks are saved when you press Save.</p>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-20 self-start">
          <section className={card}>
            <label className={label} htmlFor="stage">Stage</label>
            <select id="stage" className={input} value={p.stage} onChange={(e) => set('stage', e.target.value as Draft['stage'])}>
              {PROJECT_STAGES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <p className="text-xs text-text/60 mt-1.5">The client sees: “{PROJECT_STAGES.find((s) => s.value === p.stage)?.client}”</p>
            <label className={`${label} mt-4`} htmlFor="rounds">Review rounds included</label>
            <input id="rounds" type="number" min={0} max={10} className={input} value={p.roundsIncluded} onChange={(e) => set('roundsIncluded', Number(e.target.value))} />
            {!isNew && (
              <div className={`mt-4 rounded-xl px-3 py-2 text-sm ${p.launchApprovedAt ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-50 text-text/70'}`}>
                {p.launchApprovedAt
                  ? `Approved for launch by ${p.launchApprovedName} on ${new Date(p.launchApprovedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}`
                  : 'Not approved for launch yet. The client approves from their page at the “Your review” or “Launch” stage.'}
              </div>
            )}
          </section>

          {!isNew && (
            <section className={card}>
              <h2 className="font-heading font-semibold text-primary mb-3">Handover pack</h2>
              <div className="space-y-3">
                <div>
                  <label className={label} htmlFor="h-date">Launch date</label>
                  <input id="h-date" type="date" className={input} value={p.handover.launchDate ?? ''} onChange={(e) => set('handover', { ...p.handover, launchDate: e.target.value })} />
                </div>
                <div>
                  <label className={label} htmlFor="h-pages">Pages built</label>
                  <textarea id="h-pages" rows={2} className={input} value={p.handover.pages ?? ''} onChange={(e) => set('handover', { ...p.handover, pages: e.target.value })} placeholder="Home, Services (4), About, Projects, Contact" />
                </div>
                <div>
                  <label className={label} htmlFor="h-admin">Website admin link</label>
                  <input id="h-admin" type="url" className={input} value={p.handover.adminUrl ?? ''} onChange={(e) => set('handover', { ...p.handover, adminUrl: e.target.value })} />
                </div>
                <div>
                  <label className={label} htmlFor="h-email">Enquiries go to</label>
                  <input id="h-email" className={input} value={p.handover.leadsEmail ?? ''} onChange={(e) => set('handover', { ...p.handover, leadsEmail: e.target.value })} />
                </div>
                <div>
                  <label className={label} htmlFor="h-reg">Domain registrar</label>
                  <input id="h-reg" className={input} value={p.handover.registrar ?? ''} onChange={(e) => set('handover', { ...p.handover, registrar: e.target.value })} placeholder="e.g. Namecheap, Whogohost" />
                </div>
                <div>
                  <label className={label} htmlFor="h-care">Care plan</label>
                  <input id="h-care" className={input} value={p.handover.carePlan ?? ''} onChange={(e) => set('handover', { ...p.handover, carePlan: e.target.value })} placeholder="e.g. Website Care Plan, ₦30,000/month" />
                </div>
              </div>
              {clientUrl && (
                <a href={`/p/${p.publicToken}/handover`} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-sm">
                  <FileText size={16} aria-hidden /> Open handover pack (PDF)
                </a>
              )}
              <p className="text-xs text-text/60 mt-2">Save first. The client also sees it on their page once the stage is Live.</p>
            </section>
          )}

          {!isNew && (
            <section className={card}>
              <h2 className="font-heading font-semibold text-primary mb-2">Review request</h2>
              <p className="text-sm text-text/70 mb-3">
                Send after launch. Honest reviews only: never offer anything in exchange (Google policy).
              </p>
              <button type="button" onClick={() => copy(reviewMessage, 'Review request message')} className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-sm">
                <Star size={16} aria-hidden /> Copy review request
              </button>
              {p.clientPhone && (
                <a
                  href={`https://wa.me/${p.clientPhone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(reviewMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-sm"
                >
                  <Copy size={16} aria-hidden /> Send on WhatsApp
                </a>
              )}
            </section>
          )}

          {!isNew && (
            <div className="flex flex-col gap-2 text-sm">
              {p.invoiceId && <Link href={`/admin/invoices/${p.invoiceId}`} className="text-accent hover:underline">Open the linked invoice</Link>}
              {!p.invoiceId && <Link href={`/admin/invoices/new`} className="text-accent hover:underline">Create an invoice</Link>}
              <button type="button" onClick={remove} className="text-left text-red-700 hover:underline">Delete project</button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
