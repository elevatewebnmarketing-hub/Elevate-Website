const KEY = 'elevatewebandmarketing2026indexnow';
const HOST = 'www.elevatewebandmarketing.com';
const SITE_URL = 'https://www.elevatewebandmarketing.com';


// Reads the live sitemap, so the list never goes stale (the old hard-coded list still had retired URLs).
// Pass URLs as arguments to submit only those: npx tsx scripts/submit-indexnow.ts /services/google-ads /pricing
async function getUrls(): Promise<string[]> {
  const args = process.argv.slice(2);
  if (args.length) return args.map((a) => (a.startsWith('http') ? a : `${SITE_URL}${a.startsWith('/') ? a : `/${a}`}`));
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function submit(urls: string[]) {
  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList: urls,
  });

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
  ];

  for (const endpoint of endpoints) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body,
    });
    const name = endpoint.includes('bing') ? 'Bing' : 'IndexNow';
    if (res.ok || res.status === 202) {
      console.log(`  ✓ ${name} accepted (${res.status})`);
    } else {
      console.warn(`  ⚠ ${name} returned ${res.status}: ${await res.text()}`);
    }
  }
}

async function main() {
  console.log('Collecting URLs from sitemap...');
  const urls = await getUrls();
  console.log(`Found ${urls.length} URLs to submit.\n`);

  console.log('Submitting to IndexNow (Bing + IndexNow API)...');
  await submit(urls);

  console.log(`\nDone. Key file is live at: ${SITE_URL}/${KEY}.txt`);
  console.log('To verify with Bing: https://www.bing.com/indexnow');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
