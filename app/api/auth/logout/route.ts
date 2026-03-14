import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'admin_session';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);

  const acceptHeader = request.headers.get('accept') || '';
  if (acceptHeader.includes('application/json')) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.redirect(new URL('/admin/login', request.url));
}
