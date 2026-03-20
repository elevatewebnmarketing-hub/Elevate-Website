# SEO Checklist – elevatewebandmarketing.com

## Implemented (technical SEO)

- **Root metadata** – `app/layout.tsx`
  - `metadataBase`: https://elevatewebandmarketing.com
  - Title template: `%s | Elevate Web & Marketing`
  - Meta description, keywords, authors, creator
  - Open Graph: title, description, url, siteName, locale, images
  - Twitter Card: summary_large_image, title, description, images
  - Canonical for homepage
  - Robots: index, follow; googleBot settings
  - Placeholder for Google/Yandex verification codes

- **Sitemap** – `app/sitemap.ts`
  - All static routes (/, /about, /services, /portfolio, /blog, /process, /pricing, /contact)
  - Dynamic: every blog post (`/blog/[slug]`), every portfolio item (`/portfolio/[id]`)
  - lastModified, changeFrequency, priority set

- **Robots** – `app/robots.ts`
  - Allow all user agents on /
  - Disallow /admin/ and /api/
  - Sitemap URL: https://elevatewebandmarketing.com/sitemap.xml

- **Per-page metadata**
  - Layouts with title, description, openGraph, canonical for: About, Services, Portfolio, Blog, Contact, Process, Pricing
  - `generateMetadata` for blog posts: title, description, OG/Twitter, article meta, canonical
  - `generateMetadata` for portfolio projects: title, description, OG/Twitter, canonical

- **Structured data**
  - JSON-LD Organization schema in `components/seo/JsonLd.tsx` (name, url, description, address Lagos/NG, contactPoint)

---

## Your to-dos (post-launch)

1. **OG / social image**
   - Ensure OG/Twitter preview images exist. This project generates them via `app/opengraph-image.tsx` and `app/twitter-image.tsx` (served at `/opengraph-image` and `/twitter-image`).

2. **Search console**
   - [Google Search Console](https://search.google.com/search-console): add property for https://elevatewebandmarketing.com, verify (HTML tag or DNS).
   - Submit sitemap: https://elevatewebandmarketing.com/sitemap.xml
   - (Optional) [Bing Webmaster Tools](https://www.bing.com/webmasters): add site and sitemap.

3. **Verification codes**
   - In `app/layout.tsx`, uncomment and set `verification.google` and (optional) `verification.yandex` with the codes from Search Console / Yandex.

4. **Analytics**
   - Add Google Analytics 4 (or similar) and optional conversion tracking for “Book a Call” / contact form.

5. **Content**
   - Keep meta titles under ~60 characters and descriptions under ~160 where possible.
   - Use clear headings (H1 → H2 → H3) and alt text on images site-wide.

---

## URLs to test after deploy

- https://elevatewebandmarketing.com/sitemap.xml
- https://elevatewebandmarketing.com/robots.txt
- View source on key pages and check `<meta>`, `<link rel="canonical">`, and JSON-LD script.
