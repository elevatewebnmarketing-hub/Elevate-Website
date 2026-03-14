import { NextResponse } from 'next/server';
import { getTestimonials, saveTestimonial, createId } from '@/lib/data';
import { requireAdmin } from '@/lib/api-auth';

export async function GET() {
  try {
    const items = await getTestimonials();
    return NextResponse.json(items);
  } catch (error) {
    console.error('API testimonials GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
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
      business: body.business || '',
      review: body.review || '',
    };
    await saveTestimonial(item);
    return NextResponse.json(item);
  } catch (error) {
    console.error('API testimonials POST error:', error);
    return NextResponse.json(
      { error: 'Failed to save testimonial' },
      { status: 500 }
    );
  }
}
