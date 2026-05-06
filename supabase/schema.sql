-- Elevate Web & Marketing - Supabase schema
-- Run this in Supabase Dashboard: SQL Editor → New query → paste and run

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  author TEXT NOT NULL DEFAULT '',
  image TEXT
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Blog post views
CREATE TABLE IF NOT EXISTS blog_post_views (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  visitor_id TEXT NOT NULL,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_blog_post_views_post_id ON blog_post_views(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_post_views_post_visitor_time
  ON blog_post_views(post_id, visitor_id, viewed_at DESC);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  business TEXT NOT NULL,
  review TEXT NOT NULL
);

-- Portfolio items
CREATE TABLE IF NOT EXISTS portfolio_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  url TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  service TEXT,
  problem TEXT,
  solution TEXT,
  screenshots JSONB DEFAULT '[]',
  technologies JSONB DEFAULT '[]',
  result TEXT,
  owner_name TEXT,
  owner_job TEXT
);

CREATE INDEX IF NOT EXISTS idx_portfolio_items_featured ON portfolio_items(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_portfolio_items_service ON portfolio_items(service);

-- Pricing packages per location
CREATE TABLE IF NOT EXISTS pricing_packages (
  id              TEXT PRIMARY KEY,
  package_key     TEXT NOT NULL,
  location_code   TEXT NOT NULL,
  amount          NUMERIC(12,2) NOT NULL,
  currency_code   TEXT NOT NULL,
  currency_symbol TEXT NOT NULL,
  is_monthly      BOOLEAN NOT NULL DEFAULT FALSE,
  is_custom       BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT pricing_packages_unique UNIQUE (package_key, location_code)
);

CREATE INDEX IF NOT EXISTS idx_pricing_packages_location ON pricing_packages(location_code);
