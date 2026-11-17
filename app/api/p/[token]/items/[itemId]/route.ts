import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getProjectByToken, listProjectItems, updateProjectItem } from '@/backend/workflow';
import { apiFail } from '@/backend/http';
import { clientIp, crossSite, emailHtml, esc, notifyOwner, rateOk } from '@/backend/notify';

/** Client ticks an item on their project page, or adds a note / link to it. */
export async function POST(request: Request, { params }: { params: Promise<{ token: string; itemId: string }> }) {
  const h = await headers();
  if (crossSite(h)) return NextResponse.json({ error: 'Cross-site request blocked' }, { status: 403 });
  if (!rateOk(`items:${clientIp(h)}`, 60, 3600_000)) return NextResponse.json({ error: 'Too many changes. Try again later.' }, { status: 429 });
  try {
    const { token, itemId } = await params;
    const project = await getProjectByToken(token);
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const items = await listProjectItems(project.id);
    const item = items.find((i) => i.id === itemId);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const b = await request.json();
    const done = typeof b.done === 'boolean' ? b.done : undefined;
    const clientNote = typeof b.clientNote === 'string' ? b.clientNote.trim().slice(0, 2000) : undefined;
    await updateProjectItem(project.id, itemId, { done, clientNote });
    if (done === true || (clientNote && clientNote !== item.clientNote)) {
      await notifyOwner(
        `${project.clientBusiness || project.clientName}: “${item.label}” ${done ? 'done' : 'updated'}`,
        emailHtml(`<p><strong>${esc(project.title)}</strong></p><p>${esc(item.label)}: ${done ? 'marked done' : 'note added'}.</p>${clientNote ? `<p>${esc(clientNote).replace(/\n/g, '<br>')}</p>` : ''}`)
      );
    }
    return NextResponse.json(await listProjectItems(project.id));
  } catch (error) {
    return apiFail(error, 'Update item');
  }
}
