/**
 * Admin session tokens: "<expiresAtMs>.<random>.<hmac>". Signed with SESSION_SECRET (HMAC-SHA256).
 * Uses Web Crypto so the same code runs in proxy.ts (page guard) and in API routes.
 * Rotating SESSION_SECRET in Vercel signs everyone out immediately.
 */

export const SESSION_COOKIE = 'admin_session';
export const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

const enc = new TextEncoder();

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('');
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(secret: string, now = Date.now()): Promise<string> {
  const random = Array.from(crypto.getRandomValues(new Uint8Array(32)), (b) => b.toString(16).padStart(2, '0')).join('');
  const payload = `${now + SESSION_TTL_MS}.${random}`;
  return `${payload}.${await hmacHex(secret, payload)}`;
}

export async function verifySessionToken(token: string | undefined, secret: string, now = Date.now()): Promise<boolean> {
  if (!token || !secret || secret.length < 16) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [exp, random, sig] = parts;
  const expMs = Number(exp);
  if (!Number.isFinite(expMs) || expMs <= now || expMs > now + SESSION_TTL_MS + 60_000) return false;
  if (!/^[0-9a-f]{64}$/.test(random) || !/^[0-9a-f]{64}$/.test(sig)) return false;
  return safeEqual(sig, await hmacHex(secret, `${exp}.${random}`));
}
