/**
 * Backend auth - admin session validation for protected API routes.
 */

import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/admin-session';

const SESSION_SECRET = process.env.SESSION_SECRET ?? '';

export async function isAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value, SESSION_SECRET);
}

export async function requireAdmin(): Promise<NextResponse | null> {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 });
  }
  const h = await headers();
  const origin = h.get('origin');
  const host = h.get('x-forwarded-host') ?? h.get('host');
  if (origin) {
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json({ error: 'Cross-site request blocked' }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: 'Cross-site request blocked' }, { status: 403 });
    }
  }
  return null;
}
