'use client';

import { useState } from 'react';
import { Check, CheckCircle2, ExternalLink, FileText, MessageCircle, Plus, Star, Trash2 } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { siteConfig } from '@/lib/site-config';
import { PROJECT_STAGES, type FeedbackRound, type ProjectItem, type ProjectStage } from '@/lib/workflow';
import { PROJECT_TERMS_URL } from '@/lib/project-terms';

interface PublicProject {
  title: string;
  stage: ProjectStage;
  clientName: string;
  clientBusiness: string;
  stagingUrl: string;
  liveUrl: string;
  roundsIncluded: number;
  launchApprovedAt: string | null;
  launchApprovedName: string;
}

const card = 'bg-white rounded-2xl border border-gray-200 p-5 sm:p-6';
const h2 = 'font-heading text-lg font-bold text-[#0B1F3A] mb-1';
const field = 'w-full px-3 py-2.5 rounded-lg border border-gray-300 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#4F9CF9] bg-white';
const btn = 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B1F3A] text-white font-semibold hover:bg-[#13305a] disabled:opacity-60';
const when = (iso: string) => new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

async function post(url: string, body: object) {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}

export default function ProjectClientView({
  token,
  project: initial,
  initialItems,
  initialFeedback,
  invoiceLink,
}: {
  token: string;
  project: PublicProject;
  initialItems: ProjectItem[];
  initialFeedback: FeedbackRound[];
  invoiceLink: string;
}) {
  const [project, setProject] = useState(initial);
  const [items, setItems] = useState(initialItems);
  const [feedback, setFeedback] = useState(initialFeedback);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [savedNote, setSavedNote] = useState<string | null>(null);
  const [rows, setRows] = useState([{ page: '', change: '' }]);
  const [name, setName] = useState(initial.clientName);
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState<{ where: string; text: string } | null>(null);
  const [sentRound, setSentRound] = useState<{ round: number; extra: boolean } | null>(null);

  const stageIdx = PROJECT_STAGES.findIndex((s) => s.value === project.stage);
  const inReview = project.stage === 'review' || project.stage === 'launch';
  const done = items.filter((i) => i.done).length;
  const roundsUsed = feedback.length;
  const wa = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hello Elevate, it's ${project.clientName} about ${project.title}.`)}`;

  async function updateItem(id: string, body: { done?: boolean; clientNote?: string }) {
    setError(null);
    setBusy(`item-${id}`);
    const before = items;
    // Show the tick straight away (slow connections); undo it if saving fails.
    if (body.done !== undefined) setItems((list) => list.map((i) => (i.id === id ? { ...i, done: body.done! } : i)));
    try {
      setItems(await post(`/api/p/${token}/items/${id}`, body));
      if (body.clientNote !== undefined) {
        setSavedNote(id);
        setTimeout(() => setSavedNote(null), 2000);
      }
    } catch (e) {
      setItems(before);
      setError({ where: `item-${id}`, text: e instanceof Error ? e.message : 'Error' });
    } finally {
      setBusy('');
    }
  }

  async function sendFeedback(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const list = rows.filter((r) => r.change.trim());
    if (!list.length) return setError({ where: 'feedback', text: 'Add at least one change.' });
    if (roundsUsed >= project.roundsIncluded && !confirm(`You have used the ${project.roundsIncluded} included rounds of changes. Extra rounds are quoted before we start them. Send anyway?`)) return;
    setBusy('feedback');
    try {
      const data = await post(`/api/p/${token}/feedback`, { items: list, name });
      setFeedback(data.feedback);
      setSentRound({ round: data.round, extra: data.extra });
      setRows([{ page: '', change: '' }]);
    } catch (e) {
      setError({ where: 'feedback', text: e instanceof Error ? e.message : 'Error' });
    } finally {
      setBusy('');
    }
  }

  async function approve(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!agree) return setError({ where: 'approve', text: 'Please tick the box to approve.' });
    setBusy('approve');
    try {
      const p = await post(`/api/p/${token}/approve`, { name, agree: true });
      setProject((x) => ({ ...x, launchApprovedAt: p.launchApprovedAt, launchApprovedName: p.launchApprovedName }));
    } catch (e) {
      setError({ where: 'approve', text: e instanceof Error ? e.message : 'Error' });
    } finally {
      setBusy('');
    }
  }

  const err = (where: string) =>
    error?.where === where ? (
      <p role="alert" className="mt-2 text-sm text-red-700">
        {error.text}
      </p>
    ) : null;

  return (
    <div className="admin-panel min-h-screen bg-[#F7F9FC] py-6 sm:py-10 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto space-y-5">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="-my-3 -ml-2 h-16 w-32 overflow-hidden flex items-center">
            <Logo variant="black" width={130} height={130} />
          </div>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:underline">
            <MessageCircle size={16} aria-hidden /> Message us
          </a>
        </header>

        <section className={card} aria-labelledby="p-title">
          <p className="text-sm text-gray-500">{project.clientBusiness || project.clientName}</p>
          <h1 id="p-title" className="font-heading text-2xl sm:text-3xl font-bold text-[#0B1F3A]">{project.title}</h1>
          <ol className="mt-5 grid grid-cols-6 gap-1.5" aria-label="Project progress">
            {PROJECT_STAGES.map((s, i) => (
              <li key={s.value}>
                <span className={`block h-2 rounded-full ${i <= stageIdx ? 'bg-[#4F9CF9]' : 'bg-gray-200'}`} aria-hidden />
                <span className={`mt-1.5 block text-[11px] sm:text-xs leading-tight ${i === stageIdx ? 'font-semibold text-[#0B1F3A]' : 'text-gray-500'}`}>
                  {s.label}
                  <span className="sr-only">{i < stageIdx ? ' (done)' : i === stageIdx ? ' (now)' : ''}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[15px] text-gray-700">{PROJECT_STAGES[stageIdx]?.client}</p>
          {invoiceLink && (
            <a href={invoiceLink} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:underline">
              <FileText size={16} aria-hidden /> View your invoice
            </a>
          )}
        </section>

        {project.stage === 'live' && (
          <section className={`${card} border-emerald-200`} aria-labelledby="live-h">
            <h2 id="live-h" className={h2}>Your website is live</h2>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-[#2563eb] hover:underline break-all">
                {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')} <ExternalLink size={14} aria-hidden />
              </a>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={`/p/${token}/handover`} className={btn}>
                <FileText size={16} aria-hidden /> Your handover pack
              </a>
            </div>
            <div className="mt-5 rounded-lg bg-[#F7F9FC] p-4">
              <p className="font-semibold text-[#0B1F3A] flex items-center gap-2">
                <Star size={16} aria-hidden /> A small favour
              </p>
              <p className="text-sm text-gray-700 mt-1">
                If you’re happy with your website, an honest Google review helps us a lot.{' '}
                <a href={siteConfig.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="text-[#2563eb] underline">
                  Leave a review
                </a>
                .
              </p>
            </div>
          </section>
        )}

        {items.length > 0 && project.stage !== 'live' && (
          <section className={card} aria-labelledby="need-h">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="need-h" className={h2}>What we need from you</h2>
              <span className="text-sm text-gray-500">{done} of {items.length} done</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Tick each item when it’s sent, and paste links (Google Drive, WeTransfer) or notes. Please never paste passwords here.</p>
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.id} className={`rounded-xl border p-4 ${it.done ? 'border-emerald-200 bg-emerald-50/40' : 'border-gray-200'}`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={it.done}
                      onChange={(e) => updateItem(it.id, { done: e.target.checked })}
                      className="mt-1 h-5 w-5 accent-[#0B1F3A]"
                    />
                    <span>
                      <span className={`block font-semibold ${it.done ? 'text-gray-500 line-through' : 'text-[#0B1F3A]'}`}>{it.label}</span>
                      {it.hint && <span className="block text-sm text-gray-600">{it.hint}</span>}
                    </span>
                  </label>
                  <div className="mt-3 pl-8">
                    <label htmlFor={`note-${it.id}`} className="sr-only">Note or link for {it.label}</label>
                    <textarea
                      id={`note-${it.id}`}
                      rows={2}
                      className={field}
                      placeholder="Link or note (optional)"
                      value={notes[it.id] ?? it.clientNote}
                      onChange={(e) => setNotes((n) => ({ ...n, [it.id]: e.target.value }))}
                    />
                    {notes[it.id] !== undefined && notes[it.id] !== it.clientNote && (
                      <button type="button" onClick={() => updateItem(it.id, { clientNote: notes[it.id] })} disabled={busy === `item-${it.id}`} className="mt-2 text-sm font-semibold text-[#2563eb] hover:underline">
                        Save note
                      </button>
                    )}
                    {savedNote === it.id && <span className="ml-2 text-sm text-emerald-700">Saved</span>}
                    {err(`item-${it.id}`)}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {inReview && (
          <section className={card} aria-labelledby="review-h">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="review-h" className={h2}>Review your website</h2>
              <span className={`text-sm ${roundsUsed >= project.roundsIncluded ? 'text-amber-800' : 'text-gray-500'}`}>
                {roundsUsed} of {project.roundsIncluded} rounds of changes used
              </span>
            </div>
            {project.stagingUrl && (
              <a href={project.stagingUrl} target="_blank" rel="noopener noreferrer" className={`${btn} mt-2`}>
                Open the preview <ExternalLink size={16} aria-hidden />
              </a>
            )}
            {!project.launchApprovedAt && (
              <>
                <p className="text-sm text-gray-600 mt-4">
                  Look through every page on your phone and computer, then send all your changes together in one list. Each list
                  counts as one round. Your project includes {project.roundsIncluded} rounds (see the{' '}
                  <a href={PROJECT_TERMS_URL} target="_blank" rel="noopener noreferrer" className="underline">project terms</a>).
                </p>
                {sentRound && (
                  <p role="status" className="mt-3 rounded-lg bg-emerald-50 text-emerald-900 px-3 py-2 text-sm">
                    Thank you. Round {sentRound.round} is with us{sentRound.extra ? ' (an extra round: we will send a quote before starting it)' : ''}.
                  </p>
                )}
                <form onSubmit={sendFeedback} className="mt-4 space-y-3" aria-label="Send changes">
                  {rows.map((r, i) => (
                    <div key={i} className="grid sm:grid-cols-[10rem_1fr_auto] gap-2 items-start">
                      <div>
                        <label htmlFor={`pg-${i}`} className="sr-only">Page {i + 1}</label>
                        <input id={`pg-${i}`} className={field} placeholder="Page (e.g. Home)" value={r.page} onChange={(e) => setRows((x) => x.map((y, k) => (k === i ? { ...y, page: e.target.value } : y)))} />
                      </div>
                      <div>
                        <label htmlFor={`ch-${i}`} className="sr-only">Change {i + 1}</label>
                        <textarea id={`ch-${i}`} rows={2} className={field} placeholder="What should change?" value={r.change} onChange={(e) => setRows((x) => x.map((y, k) => (k === i ? { ...y, change: e.target.value } : y)))} />
                      </div>
                      {rows.length > 1 && (
                        <button type="button" onClick={() => setRows((x) => x.filter((_, k) => k !== i))} className="p-2.5 text-gray-500 hover:text-red-600" aria-label={`Remove change ${i + 1}`}>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => setRows((x) => [...x, { page: '', change: '' }])} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] hover:underline">
                    <Plus size={16} aria-hidden /> Add another change
                  </button>
                  <div className="flex flex-wrap items-end gap-2 pt-2">
                    <div className="flex-1 min-w-[12rem]">
                      <label htmlFor="fb-name" className="block text-sm text-gray-600 mb-1">Your name</label>
                      <input id="fb-name" className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                    </div>
                    <button type="submit" disabled={busy === 'feedback'} className={btn}>
                      {busy === 'feedback' ? 'Sending…' : 'Send this round of changes'}
                    </button>
                  </div>
                  {err('feedback')}
                </form>
              </>
            )}
            {feedback.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-[#0B1F3A] mb-2">Changes you sent</h3>
                <ol className="space-y-3">
                  {feedback.map((f) => (
                    <li key={f.id} className="rounded-lg border border-gray-200 p-3 text-sm">
                      <p className="font-semibold text-[#0B1F3A] flex flex-wrap items-center gap-2">
                        Round {f.round}
                        <span className="font-normal text-gray-500">{when(f.submittedAt)}</span>
                        {f.status === 'done' && (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-800 bg-emerald-50 rounded-full px-2 py-0.5">
                            <Check size={12} aria-hidden /> Done
                          </span>
                        )}
                      </p>
                      <ol className="list-decimal pl-5 mt-1 space-y-0.5">
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
              </div>
            )}
          </section>
        )}

        {inReview && (
          <section className={card} aria-labelledby="approve-h">
            <h2 id="approve-h" className={h2}>Approve for launch</h2>
            {project.launchApprovedAt ? (
              <p role="status" className="mt-2 flex items-start gap-2 rounded-lg bg-emerald-50 text-emerald-900 px-3 py-2 text-sm">
                <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" aria-hidden />
                Approved by {project.launchApprovedName} on {when(project.launchApprovedAt)}. We’ll do our final checks and put it live.
              </p>
            ) : (
              <form onSubmit={approve} className="mt-2">
                <p className="text-sm text-gray-600 mb-3">When you’re happy with every page, approve the website and we’ll put it live.</p>
                <label className="flex items-start gap-2.5 text-[15px] mb-3">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 h-4 w-4 accent-[#0B1F3A]" />
                  <span>I’ve checked the website, including spelling, phone numbers, prices and addresses, and I approve it for launch.</span>
                </label>
                <div className="flex flex-wrap items-end gap-2">
                  <div className="flex-1 min-w-[12rem]">
                    <label htmlFor="ap-name" className="block text-sm text-gray-600 mb-1">Your full name</label>
                    <input id="ap-name" className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                  </div>
                  <button type="submit" disabled={busy === 'approve'} className={btn}>
                    {busy === 'approve' ? 'Saving…' : 'Approve for launch'}
                  </button>
                </div>
                {err('approve')}
              </form>
            )}
          </section>
        )}

        <p className="text-center text-xs text-gray-500 pb-4">
          Elevate Web &amp; Marketing · WhatsApp {siteConfig.phone} · hello@elevatewebandmarketing.com
        </p>
      </div>
    </div>
  );
}
