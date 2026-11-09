# SEO decisions

Decisions made with Ufuoma for elevatewebandmarketing.com, so the next session doesn't re-ask.

| Date | Decision | Why |
|---|---|---|
| 2026-10-17 | Service pages rebuilt to the rank-ready-website service page spec; one file per service in `lib/service-pages/` | Old pages were about 200 words with no city in the title |
| 2026-10-17 | `/services/website-development` merged into `/services/website-design` (301) | Same search intent; two thin pages competed with each other |
| 2026-10-17 | `/services/seo` replaced by `/services/local-seo` (301) | Local SEO and GBP is the flagship offer |
| 2026-10-17 | New `/services/landing-pages` | Sold on the homepage but had no page |
| 2026-10-17 | Service pages target Asaba only; no UK or US targeting on service pages | Gate 3: no UK address. A separate "for UK businesses" page comes later |
| 2026-10-17 | Missing facts marked `[TODO: …]` in the page copy | Ufuoma will supply them; don't deploy with TODOs visible |
| 2026-10-17 | Industry pages left on the short template | Phase 2 |

## Open: Gate 2 (Google Business Profile address)

Elevate's GBP may use the MR DGN office in Asaba. That's only allowed if Elevate staff actually work there during the stated hours. If not, the profile should be a service-area business with the address hidden. Confirm before editing the GBP.

## 2026-10-17 (later): ads removed, pricing and case studies

| Date | Decision | Why |
|---|---|---|
| 2026-10-17 | Removed all Google and Meta ads offers; `/services/google-ads` 301 to `/services/local-seo`, `/meta-ads` 301 to `/services/landing-pages` | Ufuoma: no ads; websites, SEO, landing pages and care plans only |
| 2026-10-17 | Pricing picks the currency from the browser time zone (Africa/Lagos = NGN, Europe/London = GBP, everything else = USD); naira prices are in the server HTML | No permission prompt; crawlers that don't run JavaScript see real prices |
| 2026-10-17 | Replaced the 7 placeholder case studies (Luxe Salon, Horizon Real Estate and others) with real projects | The placeholders weren't real clients; fake results are a legal and trust risk |
| 2026-10-17 | The Meta Pixel and TikTok pixel stay | They track Elevate's own marketing, which isn't an ads service |
| 2026-10-17 | Service pages stay on Asaba (matches the GBP). Added `/locations/abuja` (organic only) and `/locations/nigeria` (national). No Lagos or Port Harcourt pages until real work there | Ufuoma's choice; location decision tree; Abuja priority |
| 2026-10-17 | Prices: NG ₦250k / ₦450k, care ₦30k / ₦80k per month; UK £600 / £1,100, care £49 / £149; US $750 / $1,400, care $59 / $179. Care plans reuse the `google_growth` and `meta_growth` price slots | Agreed with Ufuoma; no database migration needed |

## 2026-10-17 (later): GBP becomes an Abuja service-area business (supersedes the Asaba targeting above)

| Date | Decision | Why |
|---|---|---|
| 2026-10-17 | GBP switches to a service-area business based in Abuja, with the address hidden and service areas in the FCT | Nobody from Elevate works at the MR DGN Asaba office; a shown address there breaks Google's rules (Gate 2). Ufuoma works from Abuja |
| 2026-10-17 | Service pages retargeted to Abuja (titles, H1s, local context). Schema address is now Abuja, FCT, with no street and no map pin | Matches the GBP base; Abuja is the top priority |
| 2026-10-17 | `/locations/abuja` replaced by `/locations/asaba`, backed by the MR DGN and MansaLuxe work. The site says honestly: based in Abuja, Asaba meetings by appointment at MR DGN's office | Asaba is outside the Abuja service area: organic only |
| 2026-10-17 | Testimonials replaced with 3 real Google reviews (MrDGN, Experience Bsg, Alek Malek), quoted exactly. Onome's review is left off the site because it's about ads | Real reviews only |
| 2026-10-17 | Runway Refined by Alek (UK) added to case studies | First non-Nigerian case study |

## 2026-10-17 (later): pricing and policy defaults accepted

| Date | Decision | Why |
|---|---|---|
| 2026-10-17 | Standalone landing page ₦120,000; live in 3 to 5 business days | Accepted defaults |
| 2026-10-17 | Care plans: up to 4 (Website) or 8 (SEO) small changes a month, done within 2 business days; sites built by others need a one-off ₦30,000 check; cancel with 30 days' notice, and the client keeps the domain, content and files while hosting moves to their account | Accepted defaults |
| 2026-10-17 | Redesigns: package prices from ₦250,000; larger sites or JavaScript-app migrations quoted after a free audit, usually ₦600,000 to ₦1,000,000; 30 days of Search Console monitoring included | Accepted defaults |
| 2026-10-17 | Prices, testimonials and portfolio are managed in code; the admin panel isn't used for Elevate's own site | Ufuoma |
| 2026-10-17 | Added `/how-to-get-more-customers` guide (Article + Person + FAQPage schema, author Ufuoma), linked from the footer, sitemap and llms.txt | Plain-language lead page in Ufuoma's voice; ends with the free SEO check offer |
| 2026-10-17 | Share images restated on 11 segment layouts; portfolio detail titles get "Website Project" and the brand; descriptions trimmed to 160 | Rank-ready warnings |
| 2026-10-18 | Added `/uk`, `/case-studies/runway-refined` and niche pages `/websites-for/coaches`, `/clinics` and `/diaspora-businesses` (Service schema covering the UK, US and Nigeria, with no local address) | Foreign-client plan; Runway Refined is proof for coaches and diaspora, Mama Onome for clinics and wellness |
| 2026-10-18 | Added the free tool `/ai-visibility-check` and `/api/visibility-check`, a TypeScript port of the core rank-ready checks with an SSRF guard (http/https only, ports 80/443, DNS checked against private ranges on every redirect, 3 redirects max, 8-second timeout, 2 MB cap) and a rate limit of 10 checks per IP per hour (in memory) | Lead magnet for foreign clients; self-check in `scripts/visibility-check.test.ts` |
| 2026-10-18 | Internal linking: every blog post links in context to its matching money page (service page, guide, tool or `/uk`); the About and Pricing pages link to the service pages. Rule: link from pages that already get impressions to money pages, with descriptive anchors, and give every important page at least one link | Google's link guidance; GSC (12 months): WhatsApp post 1,229 impressions, maintenance checklist post 285, About 212, Pricing 96 |
| 2026-10-18 | Blog is read from `data/blog.json` (managed in code; view counts still from the database). The blog formatter renders `[text](/path)` as links, same-site paths only | Same decision as pricing and portfolio |
| 2026-10-18 | Retired, with 301s to `/how-to-get-more-customers`: `/blog/how-to-get-more-customers-from-your-website-nigeria` (duplicate of the guide), `/blog/meta-ads-vs-google-ads-2026` and `/blog/facebook-instagram-meta-ads-growth-engine` (ads) | Avoid two pages competing for one search; no-ads positioning |

## 2026-11-09: header, Abuja-first location pages, evidence, FAQ and the ChatGPT guide

Research behind these: `seo/research-2026-11-09.md` (Search Console export and DataForSEO data in `seo/data/`).

| Date | Decision | Why |
|---|---|---|
| 2026-11-09 | **Address: MR DGN's office, Jossie Excel School, after Okpanam City Gate by the Express, Asaba. Abuja is a service area.** Schema `PostalAddress` changed back from Abuja to this street address; pages say "our founder is based in Abuja; our office address is MR DGN's office" | Ufuoma's instruction, superseding the 17 Oct entry. **Open risk:** Google only allows a shown GBP address where staff are present during the listed hours, and expects service areas within about 2 hours' drive (Abuja is about 7). Confirm staffing before showing the address on the GBP; Abuja ranks through pages, not the map |
| 2026-11-09 | Header: Services and Locations dropdowns (accessible: click, hover, Escape, outside click; accordion on mobile). Process and FAQ moved to the footer only | Ufuoma; Search Console shows both pages get only brand impressions (about 55 each), so nothing is lost |
| 2026-11-09 | New location pages: `/locations/abuja` (flagship), `/katampe-extension`, `/guzape` (breadcrumb under Abuja), `/okpanam` (under Asaba), `/lagos`. Each carries its own search data, client work and FAQs; no city-swapped copy. Lagos says plainly that there's no Lagos case study yet. London held back | Ufuoma's list; doorway-page rule in the rank-ready skill |
| 2026-11-09 | Location pages point to the pricing page instead of listing naira prices; the pricing page now also detects Canada and Australia by time zone | Ufuoma: show each visitor their own currency |
| 2026-11-09 | `/services/ecommerce` restored as a real page (the 301 to website-design removed) and added to the services hub | Ufuoma confirmed e-commerce is a current service |
| 2026-11-09 | Service and location pages get "The short answer" (key takeaways), a byline with updated date, an author bio, a mid-page CTA to the AI visibility check, and links to location pages | Rob Hoffman video review (adopted items) and Google's people-first guidance |
| 2026-11-09 | Anonymised Search Console chart (`components/sections/SearchConsoleEvidence.tsx`, data in `lib/evidence.ts`): Mansa Luxe impressions 46 (May) to 843 (Oct 2026), 363 AI Overview appearances. Domain hidden. The building-materials chart data is kept but **not shown**, because its impressions fell (532 to 288) and the honest proof there is the ChatGPT result | Ufuoma asked for anonymised Search Console proof |
| 2026-11-09 | FAQ rebuilt: 33 questions in six groups from Ufuoma's answers, Search Console queries and Google's People also ask. Owner facts: results often within about 3 weeks of a proper setup and Search Console submission (published as "in our experience", never a promise); progress reported as calls/messages from Google and AI; invoices, 50/50 on big projects; no lock-in contracts; ads on request only | Ufuoma, 9 Nov 2026 |
| 2026-11-09 | New pillar guide `/guides/how-to-get-recommended-by-chatgpt` (action intent). The existing `/guides/why-your-website-isnt-on-google` keeps the "why" intent; they link to each other | The existing guide already ranks (best #11) for "why isn't my website in ChatGPT or Google"; a second "why" page would compete with it |
| 2026-11-09 | Two November enquiries via ChatGPT described anonymously ("one told us ChatGPT suggested us") | Ufuoma allowed anonymous mention |

## 2026-11-09 (later): consolidation and near-page-1 upgrades (Search Console, 16 months to 9 Nov)

| Date | Decision | Why |
|---|---|---|
| 2026-11-09 | `/blog/local-seo-nigerian-businesses` retired with a 301 to `/locations/nigeria`; its how-to steps now live on that page, retitled "SEO Company & Web Design in Nigeria". `/blog/seo-for-nigerian-businesses-2026` now 301s straight there (no chain) | Three pages competed for "SEO company in Nigeria" (260/mo): `/locations/nigeria` #76, the post #55, `/services/local-seo` #58. The service page stays Abuja-focused |
| 2026-11-09 | WhatsApp post extended: short answer, a types comparison table, "How to grow a WhatsApp Channel in Nigeria", an honest "Should you pay for a WhatsApp marketing service?" (we don't sell it; websites feed WhatsApp; ads on request), FAQ | Biggest page: 1,283 impressions at #10.3; "whatsapp growth services nigeria" #13, "whatsapp marketing service nigeria" #23, "how to grow whatsapp channel nigeria" #25 |
| 2026-11-09 | Lovable/Wix/Squarespace guide: short answer and a table of our own 5–6 Oct 2026 audit (six single-page apps sent 0–8 words; the pre-rendered one about 700) | #13.9; first-party data is the information gain |
| 2026-11-09 | Maintenance checklist refocused on small businesses, with a one-table summary and a monthly ChatGPT check | 285 impressions at #91 for a worldwide query; aim at reachable small-business searches and link to care plans and the ChatGPT guide |
| 2026-11-09 | Lagos page corrected: SOCASEMP's donation platform is a Lagos client (no Lagos SEO case study yet) | The Nigeria page already listed it; the earlier Lagos copy said there was no Lagos work |
| 2026-11-09 | Blog posts and guides render markdown tables (`| a | b |`), with a 34rem minimum width that scrolls inside its box on phones | Comparison tables help readers and AI summaries |
