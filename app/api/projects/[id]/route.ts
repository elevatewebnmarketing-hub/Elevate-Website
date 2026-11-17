import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { deleteProject, getProject, updateProject } from '@/backend/workflow';
import { apiFail } from '@/backend/http';
import { sanitizeProject } from '@/lib/workflow';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const p = await getProject((await params).id);
    return p ? NextResponse.json(p) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    return apiFail(error, 'Get project');
  }
}

export async function PUT(request: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const parsed = sanitizeProject(await request.json());
    if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const p = await updateProject((await params).id, parsed.value);
    return p ? NextResponse.json(p) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    return apiFail(error, 'Update project');
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    await deleteProject((await params).id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiFail(error, 'Delete project');
  }
}
