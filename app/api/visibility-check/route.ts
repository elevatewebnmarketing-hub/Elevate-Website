import { NextResponse, after } from 'next/server';
import { checkVisibility, type VisibilityReport } from '@/lib/visibility-check';
import { logCheck } from '@/backend/visibility-leads';
import { emailHtml, esc, notifyOwner } from '@/backend/notify';

export const runtime = 'nodejs';
export const maxDuration = 30;

const LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000;
// shortcut: in-memory limit per server instance; serverless instances don't share it. Upgrade to a
// shared store (Supabase table or KV) if the tool gets abused.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many checks from your connection. Please try again in an hour.' }, { status: 429 });
  }

  let url: unknown;
  try {
    ({ url } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Send a website address to check.' }, { status: 400 });
  }
  if (typeof url !== 'string' || url.trim().length < 4 || url.length > 2048) {
    return NextResponse.json({ error: 'Enter a website address, for example yourbusiness.com.' }, { status: 400 });
  }

  try {
    const report = await checkVisibility(url);
    // Log every check: a business that checks its own site is our warmest lead. Never block the report on it.
    let checkId: string | null = null;
    try {
      checkId = await logCheck(report, request.headers.get('referer') ?? '');
    } catch (error) {
      console.error('Visibility check log error (report still shown):', error);
    }
    after(() => notifyCheck(report, request.headers.get('referer') ?? ''));
    return NextResponse.json({ ...report, checkId }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const message =
      error instanceof Error && /isn’t a public|can’t be checked|Only |redirects too many|answered with an error/.test(error.message)
        ? error.message
        : 'We couldn’t reach that website. Check the address and try again.';
    return NextResponse.json({ error: message }, { status: 422 });
  }
}

function notifyCheck(report: VisibilityReport, referer: string) {
  const problems = report.checks.filter((c) => c.status !== 'pass');
  return notifyOwner(
    `Website check: ${report.url} scored ${report.score}/100`,
    emailHtml(`<p>Someone just ran the free AI visibility check on <a href="${esc(report.url)}">${esc(report.url)}</a> and scored <b>${report.score}/100</b>.</p>
<p>${problems.length ? `What needs fixing:</p><ul>${problems.map((c) => `<li>${esc(c.label)}</li>`).join('')}</ul>` : 'Every test passed.</p>'}
<p>They have not left their details yet. If they do, you get a second email with their name and number.</p>
<p>From: ${esc(referer || 'unknown page')}</p>
<p><a href="https://www.elevatewebandmarketing.com/admin/leads">Open Leads in the admin</a></p>`)
  );
}
