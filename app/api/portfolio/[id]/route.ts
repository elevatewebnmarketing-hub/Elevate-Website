import { NextResponse } from 'next/server';
import {
  getPortfolioItemById,
  savePortfolioItem,
  deletePortfolioItem,
} from '@/lib/data';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await getPortfolioItemById(id);
    if (!item) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error('API portfolio [id] GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio item' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const { id } = await params;
    const existing = await getPortfolioItemById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }
    const body = await request.json();
    const item = {
      id: existing.id,
      name: body.name ?? existing.name,
      industry: body.industry ?? existing.industry,
      description: body.description ?? existing.description,
      image: body.image ?? existing.image,
      url: body.url ?? existing.url,
      featured: body.featured ?? existing.featured,
      service: body.service !== undefined ? body.service : existing.service ?? null,
      problem: body.problem !== undefined ? body.problem : existing.problem ?? null,
      solution: body.solution !== undefined ? body.solution : existing.solution ?? null,
      screenshots: body.screenshots !== undefined && Array.isArray(body.screenshots) ? body.screenshots : existing.screenshots,
      technologies: body.technologies !== undefined && Array.isArray(body.technologies) ? body.technologies : existing.technologies,
      result: body.result !== undefined ? body.result : existing.result ?? null,
      ownerName: body.ownerName !== undefined ? body.ownerName : existing.ownerName ?? null,
      ownerJob: body.ownerJob !== undefined ? body.ownerJob : existing.ownerJob ?? null,
    };
    await savePortfolioItem(item);
    return NextResponse.json(item);
  } catch (error) {
    console.error('API portfolio [id] PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const { id } = await params;
    const existing = await getPortfolioItemById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }
    await deletePortfolioItem(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API portfolio [id] DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio item' },
      { status: 500 }
    );
  }
}
