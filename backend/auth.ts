/**
 * Backend auth - admin session validation for protected API routes.
 */

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SESSION_COOKIE = 'admin_session';
const SESSION_SECRET = process.env.SESSION_SECRET ?? '';

function isValidToken(token: string): boolean {
  try {
    const dotIndex = token.lastIndexOf('.');
    if (dotIndex === -1) return false;
    const random = token.slice(0, dotIndex);
    const signature = token.slice(dotIndex + 1);
    if (!random || !signature) return false;
    const expected = crypto.createHmac('sha256', SESSION_SECRET).update(random).digest('hex');
    if (signature.length !== expected.length) return false;
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);

  if (!session?.value || !isValidToken(session.value)) {
    return NextResponse.json(
      { error: 'Unauthorized - Admin access required' },
      { status: 401 }
    );
  }

  return null;
}
