import { NextResponse } from 'next/server';
import { getPortfolioItems, savePortfolioItem, createId } from '@/lib/data';
import { requireAdmin } from '@/lib/api-auth';

export async function GET() {
  try {
    const items = await getPortfolioItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error('API portfolio GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio items' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const body = await request.json();
    const item = {
      id: body.id || createId(),
      name: body.name || '',
      industry: body.industry || '',
      description: body.description || '',
      image: body.image ?? null,
      url: body.url ?? null,
      featured: body.featured ?? false,
      service: body.service ?? null,
      problem: body.problem ?? null,
      solution: body.solution ?? null,
      screenshots: Array.isArray(body.screenshots) ? body.screenshots : [],
      technologies: Array.isArray(body.technologies) ? body.technologies : [],
      result: body.result ?? null,
      ownerName: body.ownerName ?? null,
      ownerJob: body.ownerJob ?? null,
    };
    await savePortfolioItem(item);
    return NextResponse.json(item);
  } catch (error) {
    console.error('API portfolio POST error:', error);
    return NextResponse.json(
      { error: 'Failed to save portfolio item' },
      { status: 500 }
    );
  }
}
