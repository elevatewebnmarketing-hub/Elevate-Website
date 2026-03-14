/**
 * Seed Supabase with data from JSON files.
 * Run once after creating tables: npm run db:seed
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { config } from 'dotenv';

config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import path from 'path';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(url, key);
const dataDir = path.join(process.cwd(), 'data');

async function seed() {
  const blog = JSON.parse(readFileSync(path.join(dataDir, 'blog.json'), 'utf-8'));
  const testimonials = JSON.parse(readFileSync(path.join(dataDir, 'testimonials.json'), 'utf-8'));
  const portfolio = JSON.parse(readFileSync(path.join(dataDir, 'portfolio.json'), 'utf-8'));

  const blogRows = blog.map((p: Record<string, unknown>) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? '',
    content: p.content ?? '',
    published_at: p.publishedAt ?? p.published_at,
    author: p.author ?? '',
    image: p.image ?? null,
  }));

  const { error: blogErr } = await supabase.from('blog_posts').upsert(blogRows, { onConflict: 'id' });
  if (blogErr) {
    console.error('Blog seed error:', blogErr);
    process.exit(1);
  }
  console.log(`Seeded ${blogRows.length} blog posts`);

  const testimonialRows = testimonials.map((t: Record<string, unknown>) => ({
    id: t.id,
    name: t.name,
    business: t.business,
    review: t.review,
  }));
  const { error: testErr } = await supabase.from('testimonials').upsert(testimonialRows, { onConflict: 'id' });
  if (testErr) {
    console.error('Testimonials seed error:', testErr);
    process.exit(1);
  }
  console.log(`Seeded ${testimonialRows.length} testimonials`);

  const portfolioRows = portfolio.map((p: Record<string, unknown>) => ({
    id: p.id,
    name: p.name,
    industry: p.industry,
    description: p.description,
    image: p.image ?? null,
    url: p.url ?? null,
    featured: Boolean(p.featured),
    service: p.service ?? null,
    problem: p.problem ?? null,
    solution: p.solution ?? null,
    screenshots: p.screenshots ?? [],
    technologies: p.technologies ?? [],
    result: p.result ?? null,
    owner_name: p.ownerName ?? p.owner_name ?? null,
    owner_job: p.ownerJob ?? p.owner_job ?? null,
  }));
  const { error: portErr } = await supabase.from('portfolio_items').upsert(portfolioRows, { onConflict: 'id' });
  if (portErr) {
    console.error('Portfolio seed error:', portErr);
    process.exit(1);
  }
  console.log(`Seeded ${portfolioRows.length} portfolio items`);

  console.log('Done.');
}

seed();
