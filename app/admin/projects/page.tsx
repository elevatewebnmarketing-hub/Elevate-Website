'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FolderKanban, Plus } from 'lucide-react';
import { Breadcrumbs } from '@/admin/Breadcrumbs';
import { CardSkeleton } from '@/admin/Skeleton';
import { PROJECT_STAGES, type Project } from '@/lib/workflow';

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/projects', { credentials: 'include', cache: 'no-store' })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || 'Could not load projects');
        setItems(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Projects' }]} />
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-3xl text-primary mb-1">Projects</h1>
          <p className="text-text/80">One page per client: progress, what you need from them, review rounds and launch.</p>
        </div>
        <Link href="/admin/projects/new" className="flex items-center gap-2 px-4 py-2 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition">
          <Plus size={18} aria-hidden /> New project
        </Link>
      </div>
      {error && <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">{error}</div>}
      {loading ? (
        <CardSkeleton />
      ) : items.length === 0 && !error ? (
        <div className="p-10 text-center bg-white rounded-card shadow-soft border border-gray-100">
          <FolderKanban className="mx-auto mb-3 text-text/40" size={32} aria-hidden />
          <p className="text-text/80">No projects yet. Start one from a lead, an onboarding form or here.</p>
        </div>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {items.map((p) => {
            const stageIdx = PROJECT_STAGES.findIndex((s) => s.value === p.stage);
            return (
              <li key={p.id}>
                <Link href={`/admin/projects/${p.id}`} className="block p-5 bg-white rounded-card shadow-soft border border-gray-100 hover:border-accent transition">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-heading font-semibold text-primary">{p.title}</p>
                      <p className="text-sm text-text/70">{p.clientBusiness || p.clientName}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-primary whitespace-nowrap">
                      {PROJECT_STAGES[stageIdx]?.label}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-1" aria-hidden>
                    {PROJECT_STAGES.map((s, i) => (
                      <span key={s.value} className={`h-1.5 flex-1 rounded-full ${i <= stageIdx ? 'bg-accent' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  {p.launchApprovedAt && (
                    <p className="mt-3 text-xs text-emerald-700">Approved for launch by {p.launchApprovedName}</p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
