import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { approveLaunch, getProjectByToken } from '@/backend/workflow';
import { apiFail } from '@/backend/http';
import { clientIp, crossSite, emailHtml, esc, notifyOwner, rateOk } from '@/backend/notify';

/** Client approves the website for launch: records name, time and IP. */
export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const h = await headers();
  if (crossSite(h)) return NextResponse.json({ error: 'Cross-site request blocked' }, { status: 403 });
  const ip = clientIp(h);
  if (!rateOk(`approve:${ip}`, 10, 3600_000)) return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
  try {
    const project = await getProjectByToken((await params).token);
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (project.launchApprovedAt) return NextResponse.json(project);
    if (project.stage !== 'review' && project.stage !== 'launch') {
      return NextResponse.json({ error: 'The website is not ready for approval yet.' }, { status: 400 });
    }
    const b = await request.json();
    const name = String(b.name ?? '').trim().slice(0, 120);
    if (b.agree !== true) return NextResponse.json({ error: 'Please tick the box to approve.' }, { status: 400 });
    if (name.length < 2) return NextResponse.json({ error: 'Please type your full name.' }, { status: 400 });
    const updated = await approveLaunch(project.id, name, ip);
    await notifyOwner(
      `${project.clientBusiness || project.clientName} approved the website for launch`,
      emailHtml(`<p><strong>${esc(name)}</strong> approved <strong>${esc(project.title)}</strong> for launch.</p><p><a href="https://www.elevatewebandmarketing.com/admin/projects/${project.id}">Open the project</a> and work through the launch checklist.</p>`)
    );
    return NextResponse.json(updated);
  } catch (error) {
    return apiFail(error, 'Approve launch');
  }
}
