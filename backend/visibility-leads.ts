/**
 * Free AI visibility check -> leads. Supabase table: supabase/lead-capture-2026-11.sql.
 * Follow-up process: Claude-Motion-Graphics/business/operations/lead-follow-up.md.
 */
import { check, db } from '@/backend/invoices';
import type { Check, VisibilityReport } from '@/lib/visibility-check';

export const CHECK_STATUSES = ['new', 'followed_up', 'not_a_fit'] as const;
export type CheckFollowUp = (typeof CHECK_STATUSES)[number];

export interface VisibilityCheckRecord {
  id: string;
  createdAt: string;
  url: string;
  host: string;
  score: number;
  checks: Check[];
  page: string;
  utmSource: string;
  utmCampaign: string;
  status: CheckFollowUp;
  leadId: string | null;
}

type Row = {
  id: string; created_at: string; url: string; host: string; score: number; checks: Check[] | null;
  page: string | null; utm_source: string | null; utm_campaign: string | null; status: CheckFollowUp; lead_id: string | null;
};

const fromRow = (r: Row): VisibilityCheckRecord => ({
  id: r.id,
  createdAt: r.created_at,
  url: r.url,
  host: r.host,
  score: r.score,
  checks: r.checks ?? [],
  page: r.page ?? '',
  utmSource: r.utm_source ?? '',
  utmCampaign: r.utm_campaign ?? '',
  status: r.status,
  leadId: r.lead_id,
});

/** UTM tags from the page the visitor was on (the Referer header). */
export function utmFrom(referer: string) {
  try {
    const u = new URL(referer);
    return {
      source: u.searchParams.get('utm_source')?.slice(0, 80) ?? '',
      medium: u.searchParams.get('utm_medium')?.slice(0, 80) ?? '',
      campaign: u.searchParams.get('utm_campaign')?.slice(0, 120) ?? '',
    };
  } catch {
    return { source: '', medium: '', campaign: '' };
  }
}

export function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url.slice(0, 200);
  }
}

export async function logCheck(report: VisibilityReport, referer: string): Promise<string> {
  const utm = utmFrom(referer);
  const { data, error } = await db()
    .from('visibility_checks')
    .insert({
      url: report.url.slice(0, 2048),
      host: hostOf(report.url),
      score: report.score,
      words: report.words,
      checks: report.checks,
      page: referer.slice(0, 500) || null,
      utm_source: utm.source || null,
      utm_medium: utm.medium || null,
      utm_campaign: utm.campaign || null,
    })
    .select('id')
    .single();
  check(error, 'Log visibility check');
  return (data as { id: string }).id;
}

export async function getCheck(id: string): Promise<VisibilityCheckRecord | null> {
  const { data, error } = await db().from('visibility_checks').select('*').eq('id', id).maybeSingle();
  check(error, 'Get visibility check');
  return data ? fromRow(data as Row) : null;
}

export async function listChecks(days = 30): Promise<VisibilityCheckRecord[]> {
  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  const { data, error } = await db()
    .from('visibility_checks')
    .select('*')
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(500);
  check(error, 'List visibility checks');
  return (data as Row[]).map(fromRow);
}

export async function updateCheck(id: string, patch: { status?: CheckFollowUp; leadId?: string }) {
  const row: Record<string, unknown> = {};
  if (patch.status) row.status = patch.status;
  if (patch.leadId) row.lead_id = patch.leadId;
  const { error } = await db().from('visibility_checks').update(row).eq('id', id);
  check(error, 'Update visibility check');
}

/** Leads still marked "new" after `hours`, and checks with no lead and no follow-up, for the daily reminder. */
export async function followUpDue(hours = 20) {
  const before = new Date(Date.now() - hours * 3_600_000).toISOString();
  const since = new Date(Date.now() - 7 * 86_400_000).toISOString();
  const [leads, checks] = await Promise.all([
    db().from('leads').select('id, created_at, name, phone, email, form, website').eq('status', 'new').lte('created_at', before).order('created_at').limit(50),
    db().from('visibility_checks').select('*').eq('status', 'new').is('lead_id', null).gte('created_at', since).order('created_at', { ascending: false }).limit(50),
  ]);
  check(leads.error, 'Leads due');
  check(checks.error, 'Checks due');
  return {
    leads: (leads.data ?? []) as { id: string; created_at: string; name: string; phone: string | null; email: string | null; form: string | null; website: string | null }[],
    checks: ((checks.data ?? []) as Row[]).map(fromRow),
  };
}
