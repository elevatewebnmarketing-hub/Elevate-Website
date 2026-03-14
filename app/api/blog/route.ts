import { NextResponse } from 'next/server';
import { getBlogPosts, getBlogPostBySlug, saveBlogPost, createId } from '@/lib/data';
import { stripHtmlTags } from '@/lib/blog-utils';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    if (slug) {
      const post = await getBlogPostBySlug(slug);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }
    const posts = await getBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('API blog GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;
  try {
    const body = await request.json();
    const post = {
      id: body.id || createId(),
      slug: body.slug || body.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '',
      title: body.title || '',
      excerpt: stripHtmlTags(body.excerpt || ''),
      content: stripHtmlTags(body.content || ''),
      publishedAt: body.publishedAt || new Date().toISOString(),
      author: body.author || 'Elevate Team',
      image: body.image || null,
    };
    await saveBlogPost(post);
    return NextResponse.json(post);
  } catch (error) {
    console.error('API blog POST error:', error);
    return NextResponse.json(
      { error: 'Failed to save blog post' },
      { status: 500 }
    );
  }
}
