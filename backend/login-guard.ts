/**
 * Brute-force protection for /admin login.
 * Attempts are stored in Supabase (admin_login_attempts) so the limit holds across every Vercel
 * instance. If the table is missing, a stricter in-memory limit is used and an error is logged.
 */
import { getSupabase } from '@/lib/supabase';

export const WINDOW_MS = 15 * 60 * 1000;
export const MAX_FAILS_PER_IP = 5; // per 15 minutes
export const MAX_FAILS_GLOBAL = 30; // all IPs together, per 15 minutes (stops distributed guessing)

const memory = new Map<string, number[]>();

function memoryBlocked(ip: string) {
  const now = Date.now();
  const recent = (memory.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  memory.set(ip, recent);
  return recent.length >= 3;
}

export type BlockReason = 'ip' | 'global' | null;

export async function loginBlocked(ip: string): Promise<BlockReason> {
  const supabase = getSupabase();
  if (supabase) {
    const since = new Date(Date.now() - WINDOW_MS).toISOString();
    const [perIp, global] = await Promise.all([
      supabase.from('admin_login_attempts').select('id', { count: 'exact', head: true }).eq('ip', ip).eq('success', false).gte('created_at', since),
      supabase.from('admin_login_attempts').select('id', { count: 'exact', head: true }).eq('success', false).gte('created_at', since),
    ]);
    if (!perIp.error && !global.error) {
      if ((perIp.count ?? 0) >= MAX_FAILS_PER_IP) return 'ip';
      if ((global.count ?? 0) >= MAX_FAILS_GLOBAL) return 'global';
      return memoryBlocked(ip) ? 'ip' : null;
    }
    console.error('Security: admin_login_attempts unavailable, using in-memory limit:', perIp.error ?? global.error);
  }
  return memoryBlocked(ip) ? 'ip' : null;
}

export async function recordLoginAttempt(ip: string, success: boolean, userAgent: string) {
  if (!success) memory.set(ip, [...(memory.get(ip) ?? []), Date.now()]);
  const supabase = getSupabase();
  if (!supabase) return;
  const { error } = await supabase
    .from('admin_login_attempts')
    .insert({ ip, success, user_agent: userAgent.slice(0, 300) });
  if (error) console.error('Security: could not record login attempt:', error.message);
}
