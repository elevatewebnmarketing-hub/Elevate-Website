import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'elevate2024';
const SESSION_COOKIE = 'admin_session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'elevate-admin-secret';

function createToken(): string {
  return Buffer.from(
    `${SESSION_SECRET}:${Date.now()}`,
    'utf-8'
  ).toString('base64');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    const token = createToken();
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Auth login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
