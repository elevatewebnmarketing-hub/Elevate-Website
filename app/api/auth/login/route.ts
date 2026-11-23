import { logSecurityOutcome } from '@/backend/security-monitor';
import { readBoundedJson } from '@/lib/bounded-json';
import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import crypto from 'crypto';
import { Resend } from 'resend';
import { SESSION_COOKIE, SESSION_TTL_MS, createSessionToken } from '@/lib/admin-session';
import { verifyTotp } from '@/lib/totp';
import { loginBlocked, recordLoginAttempt } from '@/backend/login-guard';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';
const SESSION_SECRET = process.env.SESSION_SECRET ?? '';
const TOTP_SECRET = process.env.ADMIN_TOTP_SECRET ?? '';
const ALERT_EMAIL = process.env.ADMIN_ALERT_EMAIL ?? 'contact@elevatewebandmarketing.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

const sha256 = (s: string) => crypto.createHash('sha256').update(s).digest();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const GENERIC_FAIL = 'Wrong password or code';

async function alert(subject: string, lines: string[]) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  try {
    const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!);
    await new Resend(key).emails.send({
      from: FROM_EMAIL,
      to: ALERT_EMAIL,
      subject,
      html: `<div style="font-family:sans-serif;font-size:14px">${lines.map((l) => `<p>${esc(l)}</p>`).join('')}<p>If this wasn't you, change ADMIN_PASSWORD and SESSION_SECRET in Vercel now (changing SESSION_SECRET signs everyone out).</p></div>`,
    });
  } catch (error) {
    console.error('Admin alert email failed:', error);
  }
}

async function handlePost(request: Request) {
  try {
    if (!ADMIN_PASSWORD || SESSION_SECRET.length < 16) {
      console.error('Security: ADMIN_PASSWORD and a SESSION_SECRET of 16+ characters (32+ recommended) must be set');
      return NextResponse.json({ error: 'Admin login is not configured' }, { status: 503 });
    }
    if (SESSION_SECRET.length < 32) console.warn('Security: SESSION_SECRET is shorter than 32 characters; replace it');

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

    const parsed = await readBoundedJson(request, 4096);
    if ('response' in parsed) return parsed.response;
    const { body } = parsed;

    // Vercel sets x-real-ip to the visitor's address; fall back to the first x-forwarded-for hop.
    const ip = h.get('x-real-ip')?.trim() || h.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    const userAgent = h.get('user-agent') ?? '';

    const blocked = await loginBlocked(ip);
    if (blocked) {
      if (blocked === 'global') console.error('Security: admin login locked site-wide after too many failures');
      return NextResponse.json(
        { error: 'Too many failed attempts. Admin login is locked for 15 minutes.' },
        { status: 429, headers: { 'Retry-After': '900' } }
      );
    }

    const password = typeof body.password === 'string' ? body.password : '';
    const code = typeof body.code === 'string' ? body.code : '';

    // Hash first so the comparison takes the same time whatever the length of the guess.
    const passwordOk = !!password && crypto.timingSafeEqual(sha256(password), sha256(ADMIN_PASSWORD));
    const codeOk = !TOTP_SECRET || verifyTotp(TOTP_SECRET, code);

    if (!passwordOk || !codeOk) {
      await recordLoginAttempt(ip, false, userAgent);
      await sleep(600 + Math.floor(Math.random() * 400));
      // Tell the page a code is needed only once the password is right, so the code field doesn't help guessers.
      return NextResponse.json({ error: GENERIC_FAIL, needsCode: passwordOk && !!TOTP_SECRET && !code }, { status: 401 });
    }

    await recordLoginAttempt(ip, true, userAgent);
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, await createSessionToken(SESSION_SECRET), {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: SESSION_TTL_MS / 1000,
      path: '/',
    });

    await alert('Admin login: elevatewebandmarketing.com', [
      `Someone signed in to the admin panel at ${new Date().toUTCString()}.`,
      `IP: ${ip}`,
      `Device: ${userAgent || 'unknown'}`,
      TOTP_SECRET ? 'Two-step code: used' : 'Two-step code: NOT set up yet (add ADMIN_TOTP_SECRET in Vercel)',
    ]);

    return NextResponse.json({ success: true, twoFactor: !!TOTP_SECRET });
  } catch (error) {
    console.error('Auth login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const response = await handlePost(request);
    const outcome = response.status === 401 ? 'sign_in_incomplete' : undefined;
    logSecurityOutcome('admin_login', response.status, request.headers, outcome);
    return response;
  } catch (error) {
    logSecurityOutcome('admin_login', 500, request.headers);
    throw error;
  }
}
