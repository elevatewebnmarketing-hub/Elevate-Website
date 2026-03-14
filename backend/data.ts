/**
 * Backend data layer - handles all data access for blog, testimonials, and portfolio.
 * Uses JSON files in the data/ directory.
 */

import { promises as fs } from 'fs';
import path from 'path';

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
  /** Service slug e.g. 'website-design', null = uncategorized */
  service: string | null;
  /** Problem the website solves for the client */
  problem: string | null;
  /** Our solution summary */
  solution: string | null;
  /** Screenshot image URLs for case study gallery */
  screenshots: string[];
  /** Tech stack e.g. ["React", "Next.js"] */
  technologies: string[];
  /** Outcome/metrics line e.g. "Traffic up 40%" */
  result: string | null;
  /** Client/owner full name */
  ownerName: string | null;
  /** Owner job title or role */
  ownerJob: string | null;
}

async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(dataDir, filename);
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(dataDir, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getBlogPosts(): Promise<BlogPost[]> {
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
  const posts = await getBlogPosts();
  return posts.find((p) => p.id === id) ?? null;
}

export async function saveBlogPost(post: BlogPost): Promise<void> {
  const posts = await getBlogPosts();
  const index = posts.findIndex((p) => p.id === post.id);
  if (index >= 0) {
    posts[index] = post;
  } else {
    posts.push(post);
  }
  await writeJsonFile('blog.json', posts);
}

export async function deleteBlogPost(id: string): Promise<void> {
  const posts = await getBlogPosts();
  const filtered = posts.filter((p) => p.id !== id);
  await writeJsonFile('blog.json', filtered);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return readJsonFile<Testimonial[]>('testimonials.json');
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const items = await getTestimonials();
  return items.find((t) => t.id === id) ?? null;
}

export async function saveTestimonial(item: Testimonial): Promise<void> {
  const items = await getTestimonials();
  const index = items.findIndex((t) => t.id === item.id);
  if (index >= 0) {
    items[index] = item;
  } else {
    items.push(item);
  }
  await writeJsonFile('testimonials.json', items);
}

export async function deleteTestimonial(id: string): Promise<void> {
  const items = await getTestimonials();
  const filtered = items.filter((t) => t.id !== id);
  await writeJsonFile('testimonials.json', filtered);
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

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const raw = await readJsonFile<PortfolioItemInput[]>('portfolio.json');
  return raw.map(normalizePortfolioItem);
}

export async function getPortfolioItemById(id: string): Promise<PortfolioItem | null> {
  const items = await getPortfolioItems();
  return items.find((p) => p.id === id) ?? null;
}

export type { PortfolioItemInput };

export async function savePortfolioItem(item: PortfolioItem): Promise<void> {
  const items = await getPortfolioItems();
  const index = items.findIndex((p) => p.id === item.id);
  if (index >= 0) {
    items[index] = item;
  } else {
    items.push(item);
  }
  await writeJsonFile('portfolio.json', items);
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const items = await getPortfolioItems();
  const filtered = items.filter((p) => p.id !== id);
  await writeJsonFile('portfolio.json', filtered);
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function createId(): string {
  return generateId();
}
