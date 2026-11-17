import { NextResponse } from 'next/server';
import { isAdminSession } from '@/backend/auth';

export async function GET() {
  if (!(await isAdminSession())) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json(
    { authenticated: true, twoFactorEnabled: !!process.env.ADMIN_TOTP_SECRET },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
