/**
 * UI verification: loads every page type at five screen sizes, clicks the interactive parts and takes screenshots.
 * Run against a production build:  npm run build && npx next start -p 3120
 *   BASE=http://localhost:3120 OUT=.ui-check node scripts/verify-ui.cjs
 * The contact and quote forms are submitted with /api/contact intercepted, so no email is sent.
 * SKIP_PAGES=1 runs only the navigation, form and interaction checks.
 * Exit code 1 if any check fails. Report: $OUT/report.json, screenshots in $OUT.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE || 'http://localhost:3120';
const OUT = process.env.OUT || '.ui-check';
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: 'phone', width: 375, height: 812, mobile: true },
  { name: 'tablet', width: 768, height: 1024, mobile: true },
  { name: 'laptop', width: 1024, height: 768 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'wide', width: 1920, height: 1080 },
];

const results = [];
const fail = (check, detail) => { results.push({ ok: false, check, detail }); console.log('FAIL', check, detail || ''); };
const pass = (check, detail) => { results.push({ ok: true, check, detail }); console.log('ok  ', check, detail || ''); };
const slug = (u) => (u === '/' ? 'home' : u.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '_'));

async function pagesFromSitemap() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const all = [...xml.matchAll(/<loc>[^<]*?\.com([^<]*)<\/loc>/g)].map((m) => m[1] || '/');
  const seen = new Set();
  const picked = [];
  for (const u of all) {
    const parts = u.split('/').filter(Boolean);
    const type = parts.length > 1 ? `/${parts[0]}/*` : u;
    // every top-level page, plus the first two of each dynamic type
    const count = [...seen].filter((t) => t.startsWith(type + '#')).length;
    if (parts.length <= 1 && !seen.has(type)) { seen.add(type); picked.push(u); }
    else if (parts.length > 1 && count < 2) { seen.add(`${type}#${count}`); picked.push(u); }
  }
  for (const extra of ['/contact', '/get-quote', '/google-business-profile-website-offer']) if (!picked.includes(extra)) picked.push(extra);
  return picked;
}

const settle = (page) => page.waitForTimeout(700);
async function scrollThrough(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 700) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(60); }
  await page.evaluate(() => window.scrollTo(0, 0));
}

async function checkPages(browser, pages) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.mobile, hasTouch: !!vp.mobile });
    const page = await ctx.newPage();
    for (const u of pages) {
      const errors = [];
      page.removeAllListeners('pageerror');
      page.on('pageerror', (e) => errors.push(e.message.slice(0, 160)));
      const res = await page.goto(BASE + u, { waitUntil: 'load', timeout: 45000 }).catch((e) => ({ status: () => 0, e }));
      if (!res || res.status() >= 400) { fail(`load ${u} @${vp.name}`, `status ${res && res.status()}`); continue; }
      await settle(page);
      await scrollThrough(page);
      const m = await page.evaluate(() => ({
        sw: document.documentElement.scrollWidth,
        iw: window.innerWidth,
        h1: document.querySelectorAll('h1').length,
        smallTargets: [...document.querySelectorAll('main a, main button')].filter((el) => {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          return r.width > 0 && r.height > 0 && r.height < 24 && cs.display !== 'inline' && el.offsetParent !== null;
        }).length,
      }));
      if (m.sw > m.iw + 1) fail(`no horizontal scroll ${u} @${vp.name}`, `${m.sw}px > ${m.iw}px`);
      else pass(`no horizontal scroll ${u} @${vp.name}`);
      if (m.h1 !== 1) fail(`one h1 ${u} @${vp.name}`, `${m.h1} h1s`);
      if (errors.length) fail(`no JS errors ${u} @${vp.name}`, errors.join(' | '));
      const full = vp.name === 'phone' || vp.name === 'wide';
      await page.screenshot({ path: path.join(OUT, `${vp.name}-${slug(u)}.png`), fullPage: full });
    }
    await ctx.close();
  }
}

async function checkNav(browser) {
  for (const vp of [VIEWPORTS[0], VIEWPORTS[3]]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    await page.goto(BASE + '/', { waitUntil: 'load' });
    await settle(page);
    if (vp.name === 'phone') {
      await page.getByRole('button', { name: /toggle menu/i }).click();
      await page.waitForTimeout(400);
      const visible = await page.getByRole('link', { name: 'Pricing' }).first().isVisible();
      visible ? pass('mobile menu opens') : fail('mobile menu opens');
    } else {
      await page.getByRole('button', { name: /^services/i }).first().click();
      await page.waitForTimeout(300);
      const visible = await page.getByRole('link', { name: /Google Ads Management/ }).first().isVisible();
      visible ? pass('services dropdown opens') : fail('services dropdown opens');
    }
    await page.screenshot({ path: path.join(OUT, `nav-${vp.name}.png`) });
    await ctx.close();
  }
}

async function checkForm(browser, route, variant) {
  for (const vp of [VIEWPORTS[0], VIEWPORTS[3]]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    let payload = null;
    await page.route('**/api/contact', async (r) => { payload = JSON.parse(r.request().postData() || '{}'); await r.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' }); });
    await page.goto(BASE + route, { waitUntil: 'load' });
    await settle(page);
    const shot = (n) => page.screenshot({ path: path.join(OUT, `form-${variant}-${vp.name}-${n}.png`) });
    const form = page.locator('form[aria-labelledby="inquiry-question"]');
    await form.scrollIntoViewIfNeeded();
    const cont = form.getByRole('button', { name: /continue/i });

    await cont.click();
    (await form.getByText(/pick at least one/i).isVisible()) ? pass(`${variant} @${vp.name}: empty step 1 shows error`) : fail(`${variant} @${vp.name}: empty step 1 shows error`);
    await shot('1-error');
    await form.getByRole('button', { name: 'New website' }).click();
    await form.getByRole('button', { name: 'Google Ads' }).click();
    (await form.getByRole('button', { name: 'New website' }).getAttribute('aria-pressed')) === 'true' ? pass(`${variant} @${vp.name}: chip toggles`) : fail(`${variant} @${vp.name}: chip toggles`);
    await shot('1-picked');
    await cont.click();
    await page.waitForTimeout(350);
    (await form.getByRole('heading', { name: 'When do you want to start?' }).isVisible()) ? pass(`${variant} @${vp.name}: step 2 reached`) : fail(`${variant} @${vp.name}: step 2 reached`);
    // focus moved to the new question (after the 200ms exit + 200ms enter animation)
    await page.waitForTimeout(400);
    const focused = await page.evaluate(() => document.activeElement && document.activeElement.id);
    focused === 'inquiry-question' ? pass(`${variant} @${vp.name}: focus moves to question`) : fail(`${variant} @${vp.name}: focus moves to question`, focused);
    // back and forward
    await form.getByRole('button', { name: /back/i }).click();
    await page.waitForTimeout(350);
    (await form.getByRole('button', { name: 'Google Ads' }).getAttribute('aria-pressed')) === 'true' ? pass(`${variant} @${vp.name}: back keeps answers`) : fail(`${variant} @${vp.name}: back keeps answers`);
    await cont.click();
    await page.waitForTimeout(350);
    await form.getByRole('radio', { name: 'Within a month' }).click();
    await page.waitForTimeout(650);
    (await form.getByRole('heading', { name: 'What budget do you have in mind?' }).isVisible()) ? pass(`${variant} @${vp.name}: single choice auto-advances`) : fail(`${variant} @${vp.name}: single choice auto-advances`);
    await shot('3-budget');
    await form.getByRole('radio').nth(1).click();
    await page.waitForTimeout(650);
    await cont.click();
    (await form.getByText(/add a sentence or two/i).isVisible()) ? pass(`${variant} @${vp.name}: short message blocked`) : fail(`${variant} @${vp.name}: short message blocked`);
    if (variant === 'quote') await form.getByLabel(/what kind of business/i).fill('Real estate agency in Abuja');
    await form.getByLabel(/your business and what you need/i).fill('We sell land in Asaba and want more calls from Google and Facebook.');
    await form.getByLabel(/current website/i).fill('https://example.com');
    await shot('4-business');
    await form.getByLabel(/current website/i).press('Enter'); // Enter advances
    await page.waitForTimeout(350);
    (await form.getByRole('heading', { name: 'Where should we reply?' }).isVisible()) ? pass(`${variant} @${vp.name}: Enter advances`) : fail(`${variant} @${vp.name}: Enter advances`);
    await form.getByLabel('Your name').fill('Test Person');
    await form.getByLabel('Email').fill('not-an-email');
    await form.getByRole('button', { name: /send my enquiry/i }).click();
    (await form.getByText(/enter an email address/i).isVisible()) ? pass(`${variant} @${vp.name}: bad email blocked`) : fail(`${variant} @${vp.name}: bad email blocked`);
    await form.getByLabel('Email').fill('test@example.com');
    await form.getByLabel(/whatsapp number/i).fill('+234 800 000 0000');
    await shot('5-details');
    await form.getByRole('button', { name: /send my enquiry/i }).click();
    await page.waitForTimeout(800);
    const ok = payload && payload.name === 'Test Person' && payload.email === 'test@example.com' && payload.service === 'New website, Google Ads' &&
      payload.timeline === 'Within a month' && payload.budget && payload.message.includes('Asaba') && payload.phone && (variant !== 'quote' || payload.source === 'quote');
    ok ? pass(`${variant} @${vp.name}: posts the right fields to /api/contact`, JSON.stringify(payload)) : fail(`${variant} @${vp.name}: posts the right fields`, JSON.stringify(payload));
    (await page.getByText(/your enquiry is in/i).isVisible()) ? pass(`${variant} @${vp.name}: success message`) : fail(`${variant} @${vp.name}: success message`);
    await shot('6-sent');
    await ctx.close();
  }
}

async function checkMisc(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + '/faq', { waitUntil: 'load' });
  await settle(page);
  const q = page.locator('main button[aria-expanded]').first();
  await q.click();
  (await q.getAttribute('aria-expanded')) === 'true' ? pass('faq question opens') : fail('faq question opens');
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(BASE + '/guides/how-to-get-recommended-by-chatgpt', { waitUntil: 'load' });
  await settle(page);
  const link = page.locator('aside nav a').nth(1);
  const href = await link.getAttribute('href');
  await link.click();
  await page.waitForTimeout(500);
  page.url().endsWith(href) ? pass('guide contents link jumps', href) : fail('guide contents link jumps', page.url());
  await page.screenshot({ path: path.join(OUT, 'guide-toc-jump.png') });
  await page.goto(BASE + '/services/google-ads', { waitUntil: 'load' });
  await settle(page);
  await page.evaluate(() => window.scrollTo(0, 2500));
  await page.waitForTimeout(300);
  const sticky = await page.locator('aside[aria-label="Contact and page sections"] .sticky').boundingBox();
  sticky && sticky.y >= 0 && sticky.y < 200 ? pass('service sidebar stays in view while scrolling') : fail('service sidebar sticky', JSON.stringify(sticky));
  await page.screenshot({ path: path.join(OUT, 'service-sticky.png') });
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch();
  const pages = await pagesFromSitemap();
  console.log(`Checking ${pages.length} pages x ${VIEWPORTS.length} sizes`);
  const guard = async (name, fn) => { try { await fn(); } catch (e) { fail(name, e.message.split('\n')[0]); } };
  await guard('navigation', () => checkNav(browser));
  await guard('contact form', () => checkForm(browser, '/contact', 'contact'));
  await guard('quote form', () => checkForm(browser, '/get-quote', 'quote'));
  await guard('misc interactions', () => checkMisc(browser));
  if (!process.env.SKIP_PAGES) await guard('pages', () => checkPages(browser, pages));
  await browser.close();
  const failed = results.filter((r) => !r.ok);
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify({ base: BASE, pages, passed: results.length - failed.length, failed }, null, 2));
  console.log(`\n${results.length - failed.length} passed, ${failed.length} failed. Screenshots and report in ${OUT}`);
  process.exit(failed.length ? 1 : 0);
})();
