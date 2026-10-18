/**
 * Free AI visibility check: what search engines and AI crawlers receive from a public page,
 * without running JavaScript. A small TypeScript port of the rank-ready checker's core tests.
 * Server-only: fetches arbitrary user URLs, so every request goes through safeFetch.
 */
import { lookup } from 'dns/promises';
import { isIP } from 'net';

export type CheckStatus = 'pass' | 'warn' | 'fail';
export interface Check {
  id: string;
  label: string;
  status: CheckStatus;
  detail: string;
}
export interface VisibilityReport {
  url: string;
  score: number;
  words: number;
  checks: Check[];
}

const UA = 'Mozilla/5.0 (compatible; ElevateVisibilityCheck/1.0; +https://www.elevatewebandmarketing.com/ai-visibility-check)';
const MAX_BYTES = 2_000_000;
const MAX_REDIRECTS = 3;
const TIMEOUT_MS = 8000;
export const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'];

// --- SSRF guard -------------------------------------------------------------

export function isPrivateAddress(ip: string): boolean {
  const v = ip.toLowerCase();
  if (v.startsWith('::ffff:')) return isPrivateAddress(v.slice(7));
  if (isIP(v) === 4) {
    const [a, b] = v.split('.').map(Number);
    return (
      a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 198 && (b === 18 || b === 19))
    );
  }
  if (isIP(v) === 6) {
    return v === '::' || v === '::1' || v.startsWith('fc') || v.startsWith('fd') || v.startsWith('fe8') ||
      v.startsWith('fe9') || v.startsWith('fea') || v.startsWith('feb') || v.startsWith('ff');
  }
  return true;
}

export function normaliseUrl(input: string): URL {
  const raw = input.trim();
  const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new Error('Only http and https addresses can be checked.');
  if (url.port && url.port !== '80' && url.port !== '443') throw new Error('Only standard web ports can be checked.');
  if (url.username || url.password) throw new Error('Addresses with login details can’t be checked.');
  const host = url.hostname.toLowerCase();
  if (!host.includes('.') || host === 'localhost' || /\.(local|internal|localhost|test)$/.test(host)) {
    throw new Error('That address isn’t a public website.');
  }
  return url;
}

async function assertPublicHost(url: URL): Promise<void> {
  const host = url.hostname.replace(/^\[|\]$/g, '');
  const addresses = isIP(host) ? [host] : (await lookup(host, { all: true })).map((a) => a.address);
  if (addresses.length === 0 || addresses.some(isPrivateAddress)) throw new Error('That address isn’t a public website.');
}

/**
 * Fetch with redirects followed by hand so every hop is re-checked.
 * shortcut: DNS is checked before fetch resolves again, so a fast DNS-rebinding attack is still
 * possible; upgrade to a pinned-IP agent if this tool is ever deployed next to internal services.
 */
async function safeFetch(start: URL): Promise<{ url: URL; status: number; body: string }> {
  let url = start;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertPublicHost(url);
    const res = await fetch(url, {
      redirect: 'manual',
      headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml,text/plain,application/xml;q=0.9' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const location = res.headers.get('location');
    if (res.status >= 300 && res.status < 400 && location) {
      url = normaliseUrl(new URL(location, url).toString());
      continue;
    }
    return { url, status: res.status, body: await readCapped(res) };
  }
  throw new Error('That address redirects too many times.');
}

async function readCapped(res: Response): Promise<string> {
  if (!res.body) return '';
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (total < MAX_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    total += value.length;
  }
  await reader.cancel().catch(() => {});
  return new TextDecoder().decode(Buffer.concat(chunks).subarray(0, MAX_BYTES));
}

// --- HTML analysis ----------------------------------------------------------

const decode = (s: string) =>
  s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

export function visibleWords(html: string): number {
  const text = decode(
    html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<(script|style|noscript|svg|template)[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  );
  return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

const attr = (tag: string, name: string) => tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1] ?? null;

function metaContent(html: string, key: string): string | null {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    if ((attr(tag, 'name') ?? attr(tag, 'property'))?.toLowerCase() === key) return attr(tag, 'content');
  }
  return null;
}

export function jsonLdTypes(html: string): string[] {
  const types = new Set<string>();
  const walk = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (node && typeof node === 'object') {
      const t = (node as Record<string, unknown>)['@type'];
      (Array.isArray(t) ? t : [t]).forEach((x) => typeof x === 'string' && types.add(x));
      Object.values(node).forEach(walk);
    }
  };
  for (const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      walk(JSON.parse(m[1]));
    } catch {
      // invalid JSON-LD is reported as missing
    }
  }
  return [...types];
}

/** True when robots.txt blocks the whole site for this user agent (falls back to the * group). */
export function robotsBlocks(robots: string, bot: string): boolean {
  const groups: { agents: string[]; disallowAll: boolean; allowAll: boolean }[] = [];
  let current: (typeof groups)[number] | null = null;
  let lastWasAgent = false;
  for (const line of robots.split(/\r?\n/)) {
    const [rawKey, ...rest] = line.replace(/#.*/, '').split(':');
    const key = rawKey.trim().toLowerCase();
    const value = rest.join(':').trim();
    if (key === 'user-agent') {
      if (!current || !lastWasAgent) groups.push((current = { agents: [], disallowAll: false, allowAll: false }));
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else if (current && (key === 'disallow' || key === 'allow')) {
      if (value === '/') current[key === 'disallow' ? 'disallowAll' : 'allowAll'] = true;
      lastWasAgent = false;
    }
  }
  const group = groups.find((g) => g.agents.includes(bot.toLowerCase())) ?? groups.find((g) => g.agents.includes('*'));
  return Boolean(group?.disallowAll && !group.allowAll);
}

// --- The check --------------------------------------------------------------

export async function checkVisibility(input: string): Promise<VisibilityReport> {
  const page = await safeFetch(normaliseUrl(input));
  if (page.status >= 400) throw new Error(`The site answered with an error (HTTP ${page.status}).`);
  const html = page.body;
  const origin = page.url.origin;
  const [robots, sitemapAtRoot] = await Promise.all([
    safeFetch(new URL('/robots.txt', origin)).catch(() => null),
    safeFetch(new URL('/sitemap.xml', origin)).catch(() => null),
  ]);
  const robotsText = robots && robots.status < 400 && !/<html/i.test(robots.body) ? robots.body : '';
  const sitemapOk = Boolean(
    sitemapAtRoot && sitemapAtRoot.status < 400 && /<(urlset|sitemapindex)\b/i.test(sitemapAtRoot.body)
  ) || /^\s*sitemap\s*:/im.test(robotsText);

  const words = visibleWords(html);
  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '');
  const description = metaContent(html, 'description');
  const h1s = (html.match(/<h1\b/gi) ?? []).length;
  const types = jsonLdTypes(html);
  const businessType = types.find((t) => /LocalBusiness|Organization|ProfessionalService|Store|Restaurant|Clinic|Dentist|Physician/i.test(t));
  const blockedBots = robotsText ? AI_BOTS.filter((b) => robotsBlocks(robotsText, b)) : [];
  const googleBlocked = robotsText ? robotsBlocks(robotsText, 'Googlebot') : false;

  const checks: Check[] = [
    words >= 300
      ? { id: 'words', label: 'Readable text without JavaScript', status: 'pass', detail: `${words} words reach crawlers on the first request.` }
      : words >= 80
        ? { id: 'words', label: 'Readable text without JavaScript', status: 'warn', detail: `Only ${words} words reach crawlers. Most AI tools will see a thin page.` }
        : { id: 'words', label: 'Readable text without JavaScript', status: 'fail', detail: `Only ${words} words reach crawlers. The page is probably built in the browser with JavaScript, so ChatGPT, Perplexity and others see an almost empty page.` },
    title
      ? { id: 'title', label: 'Page title', status: title.length <= 65 ? 'pass' : 'warn', detail: `“${title.slice(0, 90)}” (${title.length} characters).` }
      : { id: 'title', label: 'Page title', status: 'fail', detail: 'No title in the HTML.' },
    description
      ? { id: 'description', label: 'Meta description', status: 'pass', detail: `${description.length} characters.` }
      : { id: 'description', label: 'Meta description', status: 'warn', detail: 'No meta description, so search engines write their own snippet.' },
    h1s === 1
      ? { id: 'h1', label: 'Main heading (H1)', status: 'pass', detail: 'One H1 in the HTML.' }
      : { id: 'h1', label: 'Main heading (H1)', status: h1s === 0 ? 'fail' : 'warn', detail: h1s === 0 ? 'No H1 in the HTML.' : `${h1s} H1 headings; one is clearer.` },
    businessType
      ? { id: 'schema', label: 'Business structured data', status: 'pass', detail: `Found ${businessType} schema, which helps Google and AI tools understand who you are.` }
      : { id: 'schema', label: 'Business structured data', status: 'warn', detail: types.length ? `Found ${types.slice(0, 4).join(', ')}, but no business (Organization or LocalBusiness) schema.` : 'No structured data found in the HTML.' },
    blockedBots.length === 0
      ? { id: 'ai-bots', label: 'AI crawlers allowed', status: 'pass', detail: robotsText ? 'robots.txt doesn’t block the main AI crawlers.' : 'No robots.txt rules blocking AI crawlers.' }
      : { id: 'ai-bots', label: 'AI crawlers allowed', status: 'warn', detail: `robots.txt blocks: ${blockedBots.join(', ')}. These tools can’t read your site to recommend you.` },
    googleBlocked
      ? { id: 'google', label: 'Google allowed', status: 'fail', detail: 'robots.txt blocks Googlebot from the whole site.' }
      : { id: 'google', label: 'Google allowed', status: 'pass', detail: 'Googlebot isn’t blocked.' },
    sitemapOk
      ? { id: 'sitemap', label: 'XML sitemap', status: 'pass', detail: 'A sitemap is available for search engines.' }
      : { id: 'sitemap', label: 'XML sitemap', status: 'warn', detail: 'No sitemap found at /sitemap.xml or in robots.txt.' },
    page.url.protocol === 'https:'
      ? { id: 'https', label: 'Secure (HTTPS)', status: 'pass', detail: 'The site loads over HTTPS.' }
      : { id: 'https', label: 'Secure (HTTPS)', status: 'fail', detail: 'The site doesn’t load over HTTPS.' },
    /href=["']tel:/i.test(html) || /wa\.me\/|api\.whatsapp\.com/i.test(html)
      ? { id: 'contact', label: 'Tap-to-call or WhatsApp', status: 'pass', detail: 'Visitors can call or WhatsApp you in one tap.' }
      : { id: 'contact', label: 'Tap-to-call or WhatsApp', status: 'warn', detail: 'No tap-to-call or WhatsApp link found on this page.' },
  ];
  const points = { pass: 10, warn: 5, fail: 0 } as const;
  const raw = Math.round((checks.reduce((s, c) => s + points[c.status], 0) / (checks.length * 10)) * 100);
  // A page crawlers can't read is the core failure, whatever its meta tags say.
  const score = checks[0].status === 'fail' ? Math.min(raw, 35) : raw;
  return { url: page.url.toString(), score, words, checks };
}
