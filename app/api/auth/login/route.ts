import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';
const SESSION_SECRET = process.env.SESSION_SECRET ?? '';
const SESSION_COOKIE = 'admin_session';

// In-memory rate limiter: max 10 attempts per IP per 15 minutes
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record || now > record.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (record.count >= MAX_ATTEMPTS) return false;
  record.count++;
  return true;
}

function createToken(): string {
  const random = crypto.randomBytes(32).toString('hex');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(random).digest('hex');
  return `${random}.${signature}`;
}

export async function POST(request: Request) {
  try {
    // Block if env vars are missing
    if (!ADMIN_PASSWORD || !SESSION_SECRET) {
      console.error('Security: ADMIN_PASSWORD and SESSION_SECRET must be set');
      return NextResponse.json({ error: 'Admin login is not configured' }, { status: 503 });
    }

    // Rate limit by IP
    const headerStore = await headers();
    const ip = headerStore.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 });
    }

    const body = await request.json();
    const { password } = body;

    if (typeof password !== 'string' || !password) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Constant-time comparison to prevent timing attacks
    const provided = Buffer.from(password);
    const expected = Buffer.from(ADMIN_PASSWORD);
    const match =
      provided.length === expected.length &&
      crypto.timingSafeEqual(provided, expected);

    if (!match) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = createToken();
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Auth login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
