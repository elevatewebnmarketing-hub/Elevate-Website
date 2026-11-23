import { createHmac } from 'node:crypto';
import { isIP } from 'node:net';

type Surface = 'admin_login' | 'admin_api' | 'contact';

function outcomeForStatus(status: number) {
  if (status === 401) return 'authentication_required';
  if (status === 403) return 'cross_site_denied';
  if (status === 429) return 'rate_limited';
  if (status === 413) return 'body_too_large';
  if (status === 415) return 'unsupported_media_type';
  if (status >= 500) return 'service_error';
  if (status >= 400) return 'invalid_request';
  return 'accepted';
}

export function logSecurityOutcome(surface: Surface, status: number, headers: Headers, outcome = outcomeForStatus(status)) {
  const ip = headers.get('x-real-ip')?.trim() || headers.get('x-forwarded-for')?.split(',')[0].trim() || '';
  const key = process.env.SESSION_SECRET;
  const day = new Date().toISOString().slice(0, 10);
  const source = key && key.length >= 32 && isIP(ip)
    ? createHmac('sha256', key).update(`security-monitor-v1:${day}:${ip}`).digest('hex').slice(0, 24)
    : undefined;
  // Fixed event fields only. Never include request bodies, URLs, raw headers or credentials.
  console.info(JSON.stringify({ event: 'elevate_security', surface, status, outcome, day, source }));
}
