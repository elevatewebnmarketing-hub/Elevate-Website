import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { deleteProjectItem, listProjectItems, updateProjectItem } from '@/backend/workflow';
import { apiFail } from '@/backend/http';

type Ctx = { params: Promise<{ id: string; itemId: string }> };

export async function PATCH(request: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const { id, itemId } = await params;
    const b = await request.json();
    await updateProjectItem(id, itemId, {
      done: typeof b.done === 'boolean' ? b.done : undefined,
      label: typeof b.label === 'string' ? b.label.trim().slice(0, 200) : undefined,
      hint: typeof b.hint === 'string' ? b.hint.trim().slice(0, 300) : undefined,
    });
    return NextResponse.json(await listProjectItems(id));
  } catch (error) {
    return apiFail(error, 'Update checklist item');
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const { id, itemId } = await params;
    await deleteProjectItem(id, itemId);
    return NextResponse.json(await listProjectItems(id));
  } catch (error) {
    return apiFail(error, 'Delete checklist item');
  }
}
