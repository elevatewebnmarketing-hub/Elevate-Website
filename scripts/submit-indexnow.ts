import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

const KEY = 'elevatewebandmarketing2026indexnow';
const HOST = 'www.elevatewebandmarketing.com';
const SITE_URL = 'https://www.elevatewebandmarketing.com';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function getUrls(): Promise<string[]> {
  const staticUrls = [
    `${SITE_URL}/`,
    `${SITE_URL}/about`,
    `${SITE_URL}/services`,
    `${SITE_URL}/services/website-design`,
    `${SITE_URL}/services/website-development`,
    `${SITE_URL}/services/website-redesign`,
    `${SITE_URL}/services/seo`,
    `${SITE_URL}/services/google-ads`,
    `${SITE_URL}/services/website-maintenance`,
    `${SITE_URL}/services/construction`,
    `${SITE_URL}/services/real-estate`,
    `${SITE_URL}/services/ecommerce`,
    `${SITE_URL}/portfolio`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/process`,
    `${SITE_URL}/pricing`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/faq`,
    `${SITE_URL}/get-quote`,
    `${SITE_URL}/team`,
    `${SITE_URL}/meta-ads`,
  ];

  const dynamicUrls: string[] = [];

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug')
      .order('published_at', { ascending: false });
    if (posts) {
      dynamicUrls.push(...posts.map((p: { slug: string }) => `${SITE_URL}/blog/${p.slug}`));
    }

    const { data: items } = await supabase
      .from('portfolio_items')
      .select('id');
    if (items) {
      dynamicUrls.push(...items.map((p: { id: string }) => `${SITE_URL}/portfolio/${p.id}`));
    }
  }

  return [...staticUrls, ...dynamicUrls];
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
