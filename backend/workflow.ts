/**
 * Leads, client projects, review rounds and launch approval. Supabase only (supabase/client-workflow-2026-11.sql).
 */
import { check, db, newToken } from '@/backend/invoices';
import {
  DEFAULT_PROJECT_ITEMS,
  type FeedbackRound,
  type Lead,
  type LeadStatus,
  type Project,
  type ProjectItem,
} from '@/lib/workflow';

/* ---------------- Leads ---------------- */

type LeadRow = {
  id: string; created_at: string; status: LeadStatus; form: string | null; name: string; email: string;
  phone: string | null; business: string | null; website: string | null; service: string | null;
  project_type: string | null; industry: string | null; timeline: string | null; budget: string | null;
  message: string | null; page: string | null; utm_source: string | null; utm_medium: string | null;
  utm_campaign: string | null; notes: string | null; invoice_id: string | null;
};

const leadFromRow = (r: LeadRow): Lead => ({
  id: r.id,
  createdAt: r.created_at,
  status: r.status,
  form: r.form ?? '',
  name: r.name,
  email: r.email,
  phone: r.phone ?? '',
  business: r.business ?? '',
  website: r.website ?? '',
  service: r.service ?? '',
  projectType: r.project_type ?? '',
  industry: r.industry ?? '',
  timeline: r.timeline ?? '',
  budget: r.budget ?? '',
  message: r.message ?? '',
  page: r.page ?? '',
  utmSource: r.utm_source ?? '',
  utmMedium: r.utm_medium ?? '',
  utmCampaign: r.utm_campaign ?? '',
  notes: r.notes ?? '',
  invoiceId: r.invoice_id,
});

export async function createLead(l: Omit<Lead, 'id' | 'createdAt' | 'status' | 'notes' | 'invoiceId'>): Promise<string> {
  const { data, error } = await db()
    .from('leads')
    .insert({
      form: l.form || null,
      name: l.name,
      email: l.email,
      phone: l.phone || null,
      business: l.business || null,
      website: l.website || null,
      service: l.service || null,
      project_type: l.projectType || null,
      industry: l.industry || null,
      timeline: l.timeline || null,
      budget: l.budget || null,
      message: l.message || null,
      page: l.page || null,
      utm_source: l.utmSource || null,
      utm_medium: l.utmMedium || null,
      utm_campaign: l.utmCampaign || null,
    })
    .select('id')
    .single();
  check(error, 'Save lead');
  return (data as { id: string }).id;
}

export async function listLeads(): Promise<Lead[]> {
  const { data, error } = await db().from('leads').select('*').order('created_at', { ascending: false }).limit(1000);
  check(error, 'List leads');
  return (data as LeadRow[]).map(leadFromRow);
}

export async function getLead(id: string): Promise<Lead | null> {
  const { data, error } = await db().from('leads').select('*').eq('id', id).maybeSingle();
  check(error, 'Get lead');
  return data ? leadFromRow(data as LeadRow) : null;
}

export async function updateLead(id: string, patch: { status?: LeadStatus; notes?: string; invoiceId?: string | null }) {
  const row: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (patch.status) row.status = patch.status;
  if (patch.notes !== undefined) row.notes = patch.notes;
  if (patch.invoiceId !== undefined) row.invoice_id = patch.invoiceId;
  const { error } = await db().from('leads').update(row).eq('id', id);
  check(error, 'Update lead');
}

export async function deleteLead(id: string) {
  const { error } = await db().from('leads').delete().eq('id', id);
  check(error, 'Delete lead');
}

/* ---------------- Projects ---------------- */

type ProjectRow = {
  id: string; created_at: string; updated_at: string; public_token: string; title: string; stage: Project['stage'];
  client_name: string; client_business: string | null; client_email: string | null; client_phone: string | null;
  staging_url: string | null; live_url: string | null; rounds_included: number; launch_approved_at: string | null;
  launch_approved_name: string | null; launch_checklist: Record<string, boolean> | null; handover: Project['handover'] | null;
  notes: string | null; lead_id: string | null; intake_id: string | null; invoice_id: string | null;
};

const projectFromRow = (r: ProjectRow): Project => ({
  id: r.id,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
  publicToken: r.public_token,
  title: r.title,
  stage: r.stage,
  clientName: r.client_name,
  clientBusiness: r.client_business ?? '',
  clientEmail: r.client_email ?? '',
  clientPhone: r.client_phone ?? '',
  stagingUrl: r.staging_url ?? '',
  liveUrl: r.live_url ?? '',
  roundsIncluded: r.rounds_included ?? 2,
  launchApprovedAt: r.launch_approved_at,
  launchApprovedName: r.launch_approved_name ?? '',
  launchChecklist: r.launch_checklist ?? {},
  handover: r.handover ?? {},
  notes: r.notes ?? '',
  leadId: r.lead_id,
  intakeId: r.intake_id,
  invoiceId: r.invoice_id,
});

export type ProjectInput = Pick<
  Project,
  'title' | 'stage' | 'clientName' | 'clientBusiness' | 'clientEmail' | 'clientPhone' | 'stagingUrl' | 'liveUrl' | 'roundsIncluded' | 'launchChecklist' | 'handover' | 'notes' | 'leadId' | 'intakeId' | 'invoiceId'
>;

const projectToRow = (p: ProjectInput) => ({
  title: p.title,
  stage: p.stage,
  client_name: p.clientName,
  client_business: p.clientBusiness || null,
  client_email: p.clientEmail || null,
  client_phone: p.clientPhone || null,
  staging_url: p.stagingUrl || null,
  live_url: p.liveUrl || null,
  rounds_included: p.roundsIncluded,
  launch_checklist: p.launchChecklist,
  handover: p.handover,
  notes: p.notes || null,
  lead_id: p.leadId,
  intake_id: p.intakeId,
  invoice_id: p.invoiceId,
  updated_at: new Date().toISOString(),
});

export async function listProjects(): Promise<Project[]> {
  const { data, error } = await db().from('projects').select('*').order('created_at', { ascending: false }).limit(500);
  check(error, 'List projects');
  return (data as ProjectRow[]).map(projectFromRow);
}

export async function getProject(id: string): Promise<Project | null> {
  const { data, error } = await db().from('projects').select('*').eq('id', id).maybeSingle();
  check(error, 'Get project');
  return data ? projectFromRow(data as ProjectRow) : null;
}

export async function getProjectByToken(token: string): Promise<Project | null> {
  if (!/^[A-Za-z0-9_-]{32}$/.test(token)) return null;
  const { data, error } = await db().from('projects').select('*').eq('public_token', token).maybeSingle();
  check(error, 'Get project');
  return data ? projectFromRow(data as ProjectRow) : null;
}

export async function createProject(p: ProjectInput): Promise<Project> {
  const { data, error } = await db()
    .from('projects')
    .insert({ ...projectToRow(p), public_token: newToken() })
    .select('*')
    .single();
  check(error, 'Create project');
  const project = projectFromRow(data as ProjectRow);
  const { error: e2 } = await db()
    .from('project_items')
    .insert(DEFAULT_PROJECT_ITEMS.map((it, i) => ({ project_id: project.id, label: it.label, hint: it.hint, sort: i })));
  check(e2, 'Create checklist');
  return project;
}

export async function updateProject(id: string, p: ProjectInput): Promise<Project | null> {
  const { data, error } = await db().from('projects').update(projectToRow(p)).eq('id', id).select('*').maybeSingle();
  check(error, 'Update project');
  return data ? projectFromRow(data as ProjectRow) : null;
}

export async function deleteProject(id: string) {
  const { error } = await db().from('projects').delete().eq('id', id);
  check(error, 'Delete project');
}

export async function approveLaunch(id: string, name: string, ip: string): Promise<Project | null> {
  const { data, error } = await db()
    .from('projects')
    .update({ launch_approved_at: new Date().toISOString(), launch_approved_name: name, launch_approved_ip: ip, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .maybeSingle();
  check(error, 'Approve launch');
  return data ? projectFromRow(data as ProjectRow) : null;
}

/* ---------------- What we need from the client ---------------- */

type ItemRow = { id: string; label: string; hint: string | null; sort: number; done: boolean; done_at: string | null; client_note: string | null };
const itemFromRow = (r: ItemRow): ProjectItem => ({
  id: r.id,
  label: r.label,
  hint: r.hint ?? '',
  sort: r.sort,
  done: r.done,
  doneAt: r.done_at,
  clientNote: r.client_note ?? '',
});

export async function listProjectItems(projectId: string): Promise<ProjectItem[]> {
  const { data, error } = await db().from('project_items').select('*').eq('project_id', projectId).order('sort');
  check(error, 'List checklist');
  return (data as ItemRow[]).map(itemFromRow);
}

export async function addProjectItem(projectId: string, label: string, hint: string, sort: number) {
  const { error } = await db().from('project_items').insert({ project_id: projectId, label, hint: hint || null, sort });
  check(error, 'Add checklist item');
}

export async function updateProjectItem(projectId: string, itemId: string, patch: { done?: boolean; clientNote?: string; label?: string; hint?: string }) {
  const row: Record<string, unknown> = {};
  if (patch.done !== undefined) {
    row.done = patch.done;
    row.done_at = patch.done ? new Date().toISOString() : null;
  }
  if (patch.clientNote !== undefined) row.client_note = patch.clientNote || null;
  if (patch.label !== undefined) row.label = patch.label;
  if (patch.hint !== undefined) row.hint = patch.hint || null;
  const { error } = await db().from('project_items').update(row).eq('id', itemId).eq('project_id', projectId);
  check(error, 'Update checklist item');
}

export async function deleteProjectItem(projectId: string, itemId: string) {
  const { error } = await db().from('project_items').delete().eq('id', itemId).eq('project_id', projectId);
  check(error, 'Delete checklist item');
}

/* ---------------- Review rounds ---------------- */

type FeedbackRow = { id: string; round: number; items: FeedbackRound['items']; submitted_name: string; submitted_at: string; status: FeedbackRound['status'] };
const feedbackFromRow = (r: FeedbackRow): FeedbackRound => ({
  id: r.id,
  round: r.round,
  items: Array.isArray(r.items) ? r.items : [],
  submittedName: r.submitted_name,
  submittedAt: r.submitted_at,
  status: r.status,
});

export async function listFeedback(projectId: string): Promise<FeedbackRound[]> {
  const { data, error } = await db().from('project_feedback').select('*').eq('project_id', projectId).order('round');
  check(error, 'List feedback');
  return (data as FeedbackRow[]).map(feedbackFromRow);
}

export async function addFeedback(projectId: string, round: number, items: FeedbackRound['items'], name: string) {
  const { error } = await db().from('project_feedback').insert({ project_id: projectId, round, items, submitted_name: name });
  check(error, 'Save feedback');
}

export async function setFeedbackStatus(projectId: string, feedbackId: string, status: FeedbackRound['status']) {
  const { error } = await db().from('project_feedback').update({ status }).eq('id', feedbackId).eq('project_id', projectId);
  check(error, 'Update feedback');
}
