import { NextResponse } from 'next/server';
import { getBlogPostBySlug, recordBlogPostView } from '@/lib/data';

const BOT_UA_PATTERN =
  /bot|crawler|spider|preview|slurp|headless|facebookexternalhit|whatsapp|telegrambot|linkedinbot|discordbot|embedly|quora link preview/i;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = typeof body.slug === 'string' ? body.slug.trim() : '';
    const visitorId = typeof body.visitorId === 'string' ? body.visitorId.trim() : '';

    if (!slug || !visitorId) {
      return NextResponse.json({ error: 'Missing slug or visitorId' }, { status: 400 });
    }

    const userAgent = request.headers.get('user-agent');
    if (userAgent && BOT_UA_PATTERN.test(userAgent)) {
      return NextResponse.json({ counted: false, reason: 'bot' });
    }

    const post = await getBlogPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const viewCount = await recordBlogPostView({
      postId: post.id,
      visitorId,
      userAgent,
    });

    return NextResponse.json({ counted: true, viewCount });
  } catch (error) {
    console.error('Blog view tracking error:', error);
    return NextResponse.json({ error: 'Failed to record blog view' }, { status: 500 });
  }
}
