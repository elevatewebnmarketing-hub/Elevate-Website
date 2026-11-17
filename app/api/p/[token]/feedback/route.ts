import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { addFeedback, getProjectByToken, listFeedback } from '@/backend/workflow';
import { apiFail } from '@/backend/http';
import { clientIp, crossSite, emailHtml, esc, notifyOwner, rateOk } from '@/backend/notify';

/** Client sends one round of changes: a list of { page, change }. */
export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const h = await headers();
  if (crossSite(h)) return NextResponse.json({ error: 'Cross-site request blocked' }, { status: 403 });
  if (!rateOk(`feedback:${clientIp(h)}`, 10, 3600_000)) return NextResponse.json({ error: 'Too many submissions. Try again later.' }, { status: 429 });
  try {
    const project = await getProjectByToken((await params).token);
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (project.launchApprovedAt) return NextResponse.json({ error: 'The website has already been approved for launch. Message us for any new changes.' }, { status: 400 });
    const b = await request.json();
    const name = String(b.name ?? '').trim().slice(0, 120);
    const items = (Array.isArray(b.items) ? b.items : [])
      .map((i: Record<string, unknown>) => ({ page: String(i?.page ?? '').trim().slice(0, 120), change: String(i?.change ?? '').trim().slice(0, 3000) }))
      .filter((i: { change: string }) => i.change)
      .slice(0, 50);
    if (name.length < 2) return NextResponse.json({ error: 'Please type your name.' }, { status: 400 });
    if (!items.length) return NextResponse.json({ error: 'Add at least one change.' }, { status: 400 });
    const round = (await listFeedback(project.id)).length + 1;
    await addFeedback(project.id, round, items, name);
    const extra = round > project.roundsIncluded;
    await notifyOwner(
      `${project.clientBusiness || project.clientName}: review round ${round}${extra ? ' (beyond included rounds)' : ''}`,
      emailHtml(
        `<p><strong>${esc(project.title)}</strong>: ${esc(name)} sent round ${round} of ${project.roundsIncluded} included${extra ? ' (<strong>extra round</strong>: quote before doing)' : ''}.</p><ol>${items
          .map((i: { page: string; change: string }) => `<li>${i.page ? `<strong>${esc(i.page)}</strong>: ` : ''}${esc(i.change).replace(/\n/g, '<br>')}</li>`)
          .join('')}</ol><p><a href="https://www.elevatewebandmarketing.com/admin/projects/${project.id}">Open the project</a></p>`
      )
    );
    return NextResponse.json({ round, extra, feedback: await listFeedback(project.id) });
  } catch (error) {
    return apiFail(error, 'Send feedback');
  }
}
