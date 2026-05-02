import { NextResponse } from 'next/server';
import { getTestimonialById, saveTestimonial, deleteTestimonial } from '@/lib/data';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await getTestimonialById(id);
    if (!item) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error('API testimonials [id] GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonial' },
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
    const existing = await getTestimonialById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    const body = await request.json();
    const item = {
      id: existing.id,
      name: body.name ?? existing.name,
      business: body.business ?? existing.business,
      review: body.review ?? existing.review,
    };
    await saveTestimonial(item);
    return NextResponse.json(item);
  } catch (error) {
    console.error('API testimonials [id] PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
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
    const existing = await getTestimonialById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    await deleteTestimonial(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API testimonials [id] DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}
