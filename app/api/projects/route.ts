import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { createProject, listProjects, updateLead } from '@/backend/workflow';
import { apiFail } from '@/backend/http';
import { sanitizeProject } from '@/lib/workflow';

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    return NextResponse.json(await listProjects());
  } catch (error) {
    return apiFail(error, 'List projects');
  }
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const parsed = sanitizeProject(await request.json());
    if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const project = await createProject(parsed.value);
    if (project.leadId) await updateLead(project.leadId, { status: 'won' }).catch(() => {});
    return NextResponse.json(project);
  } catch (error) {
    return apiFail(error, 'Create project');
  }
}
