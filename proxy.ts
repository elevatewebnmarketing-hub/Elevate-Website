import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/admin-session';

const SESSION_SECRET = process.env.SESSION_SECRET ?? '';

function harden(res: NextResponse) {
  res.headers.set('Cache-Control', 'no-store');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    // Check the signature and expiry, not just that a cookie exists.
    const valid = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value, SESSION_SECRET);
    if (!valid) {
      const res = NextResponse.redirect(new URL('/admin/login', request.url));
      res.cookies.delete(SESSION_COOKIE);
      return harden(res);
    }
  }

  return harden(NextResponse.next());
}

export const config = {
  matcher: ['/admin/:path*'],
};
