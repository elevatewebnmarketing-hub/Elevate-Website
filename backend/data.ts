/**
 * Backend data layer - handles blog, testimonials, portfolio, and pricing.
 * Uses Supabase when configured (production). Falls back to JSON files for local dev.
 */

import { promises as fs } from 'fs';
import path from 'path';
import { getSupabase } from '@/lib/supabase';
import type { PricingPackage, LocationCode, PackageKey } from '@/lib/pricing-config';

const dataDir = path.join(process.cwd(), 'data');

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  image: string | null;
}

export interface Testimonial {
  id: string;
  name: string;
  business: string;
  review: string;
}

export interface PortfolioItem {
  id: string;
  name: string;
  industry: string;
  description: string;
  image: string | null;
  url: string | null;
  featured: boolean;
  service: string | null;
  problem: string | null;
  solution: string | null;
  screenshots: string[];
  technologies: string[];
  result: string | null;
  ownerName: string | null;
  ownerJob: string | null;
}

type PortfolioItemInput = Omit<PortfolioItem, 'screenshots' | 'technologies'> & {
  screenshots?: string[];
  technologies?: string[];
};

function normalizePortfolioItem(raw: PortfolioItemInput): PortfolioItem {
  return {
    ...raw,
    solution: raw.solution ?? null,
    screenshots: Array.isArray(raw.screenshots) ? raw.screenshots : [],
    technologies: Array.isArray(raw.technologies) ? raw.technologies : [],
    result: raw.result ?? null,
  };
}

// --- File-based (fallback) ---
async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(dataDir, filename);
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(dataDir, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function toBlogRow(post: BlogPost) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    published_at: post.publishedAt,
    author: post.author,
    image: post.image,
  };
}

function fromBlogRow(row: Record<string, unknown>): BlogPost {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    excerpt: String(row.excerpt ?? ''),
    content: String(row.content ?? ''),
    publishedAt: String(row.published_at ?? row.publishedAt ?? ''),
    author: String(row.author ?? ''),
    image: row.image ? String(row.image) : null,
  };
}

function toTestimonialRow(item: Testimonial) {
  return { id: item.id, name: item.name, business: item.business, review: item.review };
}

function fromTestimonialRow(row: Record<string, unknown>): Testimonial {
  return {
    id: String(row.id),
    name: String(row.name),
    business: String(row.business),
    review: String(row.review),
  };
}

function toPortfolioRow(item: PortfolioItem) {
  return {
    id: item.id,
    name: item.name,
    industry: item.industry,
    description: item.description,
    image: item.image,
    url: item.url,
    featured: item.featured,
    service: item.service,
    problem: item.problem,
    solution: item.solution,
    screenshots: item.screenshots,
    technologies: item.technologies,
    result: item.result,
    owner_name: item.ownerName,
    owner_job: item.ownerJob,
  };
}

function fromPortfolioRow(row: Record<string, unknown>): PortfolioItem {
  return normalizePortfolioItem({
    id: String(row.id),
    name: String(row.name),
    industry: String(row.industry),
    description: String(row.description),
    image: row.image ? String(row.image) : null,
    url: row.url ? String(row.url) : null,
    featured: Boolean(row.featured),
    service: row.service ? String(row.service) : null,
    problem: row.problem ? String(row.problem) : null,
    solution: row.solution ? String(row.solution) : null,
    screenshots: Array.isArray(row.screenshots) ? (row.screenshots as string[]) : [],
    technologies: Array.isArray(row.technologies) ? (row.technologies as string[]) : [],
    result: row.result ? String(row.result) : null,
    ownerName: row.owner_name ? String(row.owner_name) : null,
    ownerJob: row.owner_job ? String(row.owner_job) : null,
  });
}

// --- Blog ---
export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });
    if (!error && data) {
      return data.map((row) => fromBlogRow(row));
    }
  }
  const posts = await readJsonFile<BlogPost[]>('blog.json');
  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
    if (!error && data) return fromBlogRow(data);
  }
  const posts = await getBlogPosts();
  return posts.find((p) => p.id === id) ?? null;
}

export async function saveBlogPost(post: BlogPost): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    const row = toBlogRow(post);
    const { error } = await supabase.from('blog_posts').upsert(row, { onConflict: 'id' });
    if (error) throw new Error(error.message);
    return;
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'Database not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel environment variables.'
    );
  }
  const posts = await getBlogPosts();
  const index = posts.findIndex((p) => p.id === post.id);
  if (index >= 0) posts[index] = post;
  else posts.push(post);
  await writeJsonFile('blog.json', posts);
}

export async function deleteBlogPost(id: string): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) throw new Error(`Failed to delete blog post: ${error.message}`);
    return;
  }
  const posts = await getBlogPosts();
  const filtered = posts.filter((p) => p.id !== id);
  await writeJsonFile('blog.json', filtered);
}

// --- Testimonials ---
export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from('testimonials').select('*');
    if (!error && data) return data.map((row) => fromTestimonialRow(row));
  }
  return readJsonFile<Testimonial[]>('testimonials.json');
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const items = await getTestimonials();
  return items.find((t) => t.id === id) ?? null;
}

export async function saveTestimonial(item: Testimonial): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    const row = toTestimonialRow(item);
    const { error } = await supabase.from('testimonials').upsert(row, { onConflict: 'id' });
    if (error) throw new Error(`Failed to save testimonial: ${error.message}`);
    return;
  }
  const items = await getTestimonials();
  const index = items.findIndex((t) => t.id === item.id);
  if (index >= 0) items[index] = item;
  else items.push(item);
  await writeJsonFile('testimonials.json', items);
}

export async function deleteTestimonial(id: string): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) throw new Error(`Failed to delete testimonial: ${error.message}`);
    return;
  }
  const items = await getTestimonials();
  const filtered = items.filter((t) => t.id !== id);
  await writeJsonFile('testimonials.json', filtered);
}

// --- Portfolio ---
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from('portfolio_items').select('*');
    if (!error && data) return data.map((row) => fromPortfolioRow(row));
  }
  const raw = await readJsonFile<PortfolioItemInput[]>('portfolio.json');
  return raw.map(normalizePortfolioItem);
}

export async function getPortfolioItemById(id: string): Promise<PortfolioItem | null> {
  const items = await getPortfolioItems();
  return items.find((p) => p.id === id) ?? null;
}

export type { PortfolioItemInput };

export async function savePortfolioItem(item: PortfolioItem): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    const row = toPortfolioRow(item);
    const { error } = await supabase.from('portfolio_items').upsert(row, { onConflict: 'id' });
    if (error) throw new Error(`Failed to save portfolio item: ${error.message}`);
    return;
  }
  const items = await getPortfolioItems();
  const index = items.findIndex((p) => p.id === item.id);
  if (index >= 0) items[index] = item;
  else items.push(item);
  const toStore = items.map(({ screenshots, technologies, ...rest }) => ({ ...rest, screenshots, technologies }));
  await writeJsonFile('portfolio.json', toStore);
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from('portfolio_items').delete().eq('id', id);
    if (error) throw new Error(`Failed to delete portfolio item: ${error.message}`);
    return;
  }
  const items = await getPortfolioItems();
  const filtered = items.filter((p) => p.id !== id);
  const toStore = filtered.map(({ screenshots, technologies, ...rest }) => ({ ...rest, screenshots, technologies }));
  await writeJsonFile('portfolio.json', toStore);
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function createId(): string {
  return generateId();
}

// --- Pricing ---

function toPricingRow(pkg: PricingPackage) {
  return {
    id: pkg.id,
    package_key: pkg.packageKey,
    location_code: pkg.locationCode,
    amount: pkg.amount,
    currency_code: pkg.currencyCode,
    currency_symbol: pkg.currencySymbol,
    is_monthly: pkg.isMonthly,
    is_custom: pkg.isCustom,
    updated_at: pkg.updatedAt || new Date().toISOString(),
  };
}

function fromPricingRow(row: Record<string, unknown>): PricingPackage {
  return {
    id: String(row.id),
    packageKey: String(row.package_key) as PackageKey,
    locationCode: String(row.location_code) as LocationCode,
    amount: Number(row.amount),
    currencyCode: String(row.currency_code),
    currencySymbol: String(row.currency_symbol),
    isMonthly: Boolean(row.is_monthly),
    isCustom: Boolean(row.is_custom),
    updatedAt: String(row.updated_at ?? ''),
  };
}

export async function getPricingPackages(locationCode?: string): Promise<PricingPackage[]> {
  const supabase = getSupabase();
  if (supabase) {
    let query = supabase
      .from('pricing_packages')
      .select('*')
      .order('location_code')
      .order('package_key');
    if (locationCode) query = query.eq('location_code', locationCode.toUpperCase());
    const { data, error } = await query;
    if (!error && data) return data.map((row) => fromPricingRow(row));
  }
  const all = await readJsonFile<PricingPackage[]>('pricing.json');
  if (locationCode) return all.filter((p) => p.locationCode === locationCode.toUpperCase());
  return all;
}

export async function savePricingPackage(pkg: PricingPackage): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    const row = { ...toPricingRow(pkg), updated_at: new Date().toISOString() };
    const { error } = await supabase
      .from('pricing_packages')
      .upsert(row, { onConflict: 'package_key,location_code' });
    if (error) throw new Error(`Failed to save pricing: ${error.message}`);
    return;
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'Database not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel environment variables.'
    );
  }
  const all = await getPricingPackages();
  const index = all.findIndex((p) => p.id === pkg.id);
  if (index >= 0) all[index] = pkg;
  else all.push(pkg);
  await writeJsonFile('pricing.json', all);
}
