# SEO Audit (2026 Standard) — Elevate Web & Marketing

Last reviewed: 2026-03-25

Canonical host target: **https://www.elevatewebandmarketing.com**

## 1) Crawlability & indexability

### 1.1 Robots.txt
- **Standard**: `robots.txt` must allow crawling of public pages and reference the XML sitemap.
- **Repo status**: **PASS**
- **Evidence**: [`app/robots.ts`](app/robots.ts)

### 1.2 XML sitemap
- **Standard**: `sitemap.xml` should include only canonical, indexable URLs; include key static routes and dynamic content.
- **Repo status**: **PASS** (after www host alignment)
- **Evidence**: [`app/sitemap.ts`](app/sitemap.ts)

### 1.3 Noindex controls
- **Standard**: Public pages must not be `noindex`. Admin/auth/content-editing routes should be `noindex`.
- **Repo status**: **PASS**
- **Evidence**:
  - Public: root + per-route metadata (see section 2)
  - Admin: [`app/admin/layout.tsx`](app/admin/layout.tsx)

## 2) Canonicals & duplication control

### 2.1 One canonical host (www vs non-www)
- **Standard**: One canonical host across metadata, sitemap, robots, and link/OG URLs; host-level 301 redirects enforce it.
- **Repo status**: **NEEDS UPDATE**
- **Fix**: Update all hardcoded `SITE_URL` constants to `https://www.elevatewebandmarketing.com`.
- **Notes**: Hosting must 301 redirect non-www → www and http → https.

### 2.2 Self-referencing canonicals for public pages
- **Standard**: Every indexable page declares a canonical URL.
- **Repo status**: **PASS**
- **Notes**: Filtered URLs like `/case-studies?service=meta-ads` should canonicalize to the base page (intentional).

## 3) Metadata completeness (per page)

### Standard
Each public page should have:
- **Title** (unique and descriptive)
- **Meta description**
- **Canonical**
- **Open Graph** (at least title/description/url/image)
- **Twitter Card** (summary_large_image, title/description/image)

### Current coverage summary
- **Global defaults**: [`app/layout.tsx`](app/layout.tsx) provides title template, description, OG/Twitter defaults, and `metadataBase`.
- **Per-page overrides**: Most primary routes provide title/description/canonical and some provide OG/Twitter per-page.
- **Improvement**: Add OG/Twitter overrides for `/terms`, `/privacy`, `/case-studies` for cleaner share previews.

## 4) Structured data (JSON-LD)

### 4.1 Sitewide entity schema
- **Standard**: Organization/ProfessionalService + WebSite schema present on all pages.
- **Repo status**: **PASS**
- **Evidence**: [`components/seo/JsonLd.tsx`](components/seo/JsonLd.tsx) injected in [`app/layout.tsx`](app/layout.tsx)

### 4.2 Service schema (Meta Ads)
- **Standard**: Service pages should include `Service` schema (and FAQPage when FAQ exists).
- **Repo status**: **PASS**
- **Evidence**: [`components/seo/MetaAdsJsonLd.tsx`](components/seo/MetaAdsJsonLd.tsx) in [`app/meta-ads/page.tsx`](app/meta-ads/page.tsx)

### 4.3 FAQ schema
- **Standard**: FAQ pages should include `FAQPage` schema.
- **Repo status**: **NEEDS UPDATE**
- **Fix**: Add `FAQPage` JSON-LD to [`app/faq/page.tsx`](app/faq/page.tsx).

### 4.4 BlogPosting schema
- **Standard**: Blog post pages should include `BlogPosting`/`Article` schema.
- **Repo status**: **NEEDS UPDATE**
- **Fix**: Add `BlogPosting` JSON-LD to [`app/blog/[slug]/page.tsx`](app/blog/[slug]/page.tsx).

## 5) Images & accessibility signals that affect SEO

### 5.1 Meaningful alt text
- **Standard**: Meaningful images must have descriptive `alt` (decorative images may use `alt=\"\"`).
- **Repo status**: **NEEDS UPDATE**
- **Evidence**: blog featured and card images use `alt=\"\"` in [`app/blog/[slug]/page.tsx`](app/blog/[slug]/page.tsx)
- **Fix**: Use post title (or a descriptive variant) as alt text.

## 6) Performance / Core Web Vitals (repo + hosting)

### 6.1 Third-party scripts
- **Standard**: Minimize blocking scripts; use async/afterInteractive; avoid duplicate trackers.
- **Repo status**: **PASS** (with operational caution)
- **Notes**: GTM is present; Meta Pixel is optional and env-gated—do not install the same Pixel both in GTM and code.

### 6.2 Hosting requirements (outside repo)
- Ensure CDN + compression + caching.
- Enforce www+https redirects.
- Monitor CWV via PageSpeed/CrUX/GSC.

