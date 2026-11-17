import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { addProjectItem, listProjectItems } from '@/backend/workflow';
import { apiFail } from '@/backend/http';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    return NextResponse.json(await listProjectItems((await params).id));
  } catch (error) {
    return apiFail(error, 'List checklist');
  }
}

export async function POST(request: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const b = await request.json();
    const label = String(b.label ?? '').trim().slice(0, 200);
    if (!label) return NextResponse.json({ error: 'Write what you need' }, { status: 400 });
    const id = (await params).id;
    const existing = await listProjectItems(id);
    await addProjectItem(id, label, String(b.hint ?? '').trim().slice(0, 300), existing.length);
    return NextResponse.json(await listProjectItems(id));
  } catch (error) {
    return apiFail(error, 'Add checklist item');
  }
}
