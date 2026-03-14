/**
 * Backend auth - admin session validation for protected API routes.
 */

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'admin_session';

export async function requireAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);

  if (!session?.value) {
    return NextResponse.json(
      { error: 'Unauthorized - Admin access required' },
      { status: 401 }
    );
  }

  return null;
}
