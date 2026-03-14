import { NextResponse } from 'next/server';
import { getBlogPostById, saveBlogPost, deleteBlogPost } from '@/lib/data';
import { stripHtmlTags } from '@/lib/blog-utils';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await getBlogPostById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error('API blog [id] GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
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
    const existing = await getBlogPostById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    const body = await request.json();
    const post = {
      id: existing.id,
      slug: body.slug ?? existing.slug,
      title: body.title ?? existing.title,
      excerpt: body.excerpt !== undefined ? stripHtmlTags(body.excerpt) : existing.excerpt,
      content: body.content !== undefined ? stripHtmlTags(body.content) : existing.content,
      publishedAt: body.publishedAt ?? existing.publishedAt,
      author: body.author ?? existing.author,
      image: body.image ?? existing.image,
    };
    await saveBlogPost(post);
    return NextResponse.json(post);
  } catch (error) {
    console.error('API blog [id] PUT error:', error);
    const message = error instanceof Error ? error.message : 'Failed to update blog post';
    return NextResponse.json(
      { error: message },
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
    const existing = await getBlogPostById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    await deleteBlogPost(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API blog [id] DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
