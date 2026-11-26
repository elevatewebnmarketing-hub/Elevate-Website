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

## 2026-11-09 (evening): content from the AnswerThePublic topics (plan: `seo/content-plan-2026-11-09.md`)

| Date | Decision | Why |
|---|---|---|
| 2026-11-09 | New guide `/guides/launch-online-store-nigeria` (the two ATP drafts merged): platforms table (custom, Shopify, WooCommerce), payments table (Paystack, Flutterwave, Stripe, bank transfer with manual checks, NOWPayments crypto), documents, testing, delivery, FCCPA/NDPA | Ufuoma: Elevate builds custom code, Shopify or any platform and integrates all of those gateways. Only Paystack's fees are stated (its own support page); Flutterwave, Shopify, CAC and courier figures conflict between sources, so readers are sent to the official pages. Stripe: no standard accounts for Nigerian-registered businesses |
| 2026-11-09 | New guide `/guides/google-business-profile-setup-nigeria`, new post `/blog/seo-or-google-ads-small-business-nigeria`; care plan page gains a "care plan or one-off build" table and three FAQs; e-commerce page lists every payment option | ATP topics with measurable or AI-answer demand; ads stay "on request" |

## 2026-11-16: ads services back, new local SEO pricing, full suite

| Date | Decision | Why |
|---|---|---|
| 2026-11-16 | **Google Ads and Facebook & Instagram ads are services again** (supersedes the 17 Oct "no ads" decision). New pages `/services/google-ads`, `/services/facebook-instagram-ads` and `/services/digital-marketing`; the `/services/google-ads` 301 removed, `/meta-ads` now 301s to `/services/facebook-instagram-ads`. Header, services hub, pricing, FAQ, quote form and llms.txt updated | Ufuoma: "we are going to be running Google ads and Facebook ads" |
| 2026-11-16 | Ads management fee: **₦100,000 a month per platform** (Google, or Facebook & Instagram), ad budget paid by the client to Google/Meta directly. Abroad: **$349 / £299 / CAD 479 / AUD 529** per platform per month | Ufuoma's NG price. Foreign prices keep the site's existing NG-to-foreign ratio (₦250k → $750) and sit at the low end of what US/UK freelancers charge (US about $500–1,500, UK about £300–1,500; agency blogs, no independent survey). Research: Claude-Motion-Graphics `research/` and the 16 Nov session |
| 2026-11-16 | **Local SEO: ₦70,000 setup + ₦30,000 a month** ("Local SEO Plan"), replacing the ₦80,000/month SEO Care Plan. Scope: GBP, Bing Places, Apple Business Connect and Facebook page optimised and aligned with the website; review training (how to ask for and answer reviews); monthly posts, review help, listings kept in step and a map-position report. No monthly new page or blog post any more. Abroad: setup $249 / £199 / CAD 339 / AUD 379, then $99 / £79 / CAD 135 / AUD 149 a month | Ufuoma's NG price; foreign prices by the same ratio. The `meta_growth` price key now holds the monthly fee; new keys `local_seo_setup`, `google_ads`, `meta_ads` |
| 2026-11-16 | **Full Digital Marketing Suite**: website, all profiles, Google and Facebook ads with copy, images and videos, ads and website maintained, Search Console checks. Custom quote after a call | Ufuoma |
| 2026-11-16 | "Custom & Enterprise" pricing card renamed **Software & Web Apps** (custom quote) | Ufuoma lists software design and applications as a service |
| 2026-11-16 | GBP address: **Asaba (MR DGN office) stays shown** on the profile | Ufuoma's choice after being told Google only allows a shown address where staff are present during the listed hours. Risk recorded: suspension if Google checks. Revisit if Ufuoma gets a staffed Abuja address |
| 2026-11-16 | Open: Canada and Australia Website Care Plan prices (CAD 349, AUD 399) look out of line with the US ($59) and UK (£49) | Spotted while adding new prices; not changed, Ufuoma to confirm |

## 2026-11-16: `/locations/nigeria` rewritten from Ufuoma's copy

| Date | Decision | Why |
|---|---|---|
| 2026-11-16 | `/locations/nigeria` uses Ufuoma's supplied copy: new headings, price table (with e-commerce and ads), process infographic self-hosted at `public/images/locations/nigeria-how-it-works-and-prices.webp`, FAQ answers with the target phrases | Ufuoma: "use this and update the website". The SERP claim ("directories and one Coming Soon page") is Ufuoma's own research |
| 2026-11-16 | Page follows the ChatSEO article (ChatSEO conversation "Improve Google CTR for Elevate Web Nigeria Location Page", artifact 5c2acaba): 5 content H2s, its title `SEO Company in Nigeria \| Web Design & Local SEO - Elevate` (used as-is via `titleAbsolute`, no brand suffix) and its meta description. The "How local SEO works in Nigeria" section (from the retired `/blog/local-seo-nigerian-businesses`) is removed | ChatSEO (GSC data, 13 Nov): page at #64–96 with 464 impressions, 0 clicks; 11 H2s vs about 6 on a service page of this kind; title was 601px vs 580px shown; zero links point to the page. Ufuoma: use ChatSEO |
| 2026-11-16 | The "0 readable words" fact stays attached to MR DGN Group, not the real estate client; the supplied proof infographic (which says the real estate site had 0 words) and the placeholders (review, Maps screenshot, team photos) are not published | Our audit (6 Oct) records 0 words for mrdgngroup.com only. The live Search Console chart already shows the same numbers |
| 2026-11-16 | Service template: optional section headings, intro/outro paragraphs, pricing table, pricing figure and closing CTA; the default CTA no longer lowercases the page title | Needed for the Nigeria copy; other pages unchanged except the CTA case fix |

## 2026-11-16 (evening): ChatSEO opportunities 1–8 and the Google listing embed

Source: ChatSEO opportunities run (conversation a3f87d84), GSC data to 13 Nov 2026.

| Date | Decision | Why |
|---|---|---|
| 2026-11-16 | **Address wording everywhere: "office in Asaba (MR DGN's office, Jossie Excel School, after Okpanam City Gate), founder works from Abuja, the main service area".** Hero, trust line, CTA, footer, contact page, Abuja page, Nigeria page, llms.txt updated; schema keeps the Asaba address | ChatSEO #5: schema said Asaba while copy said "based in Abuja". Matches the Google listing (Asaba, kept shown per Ufuoma) |
| 2026-11-16 | Google listing linked sitewide: footer "Find us on Google", contact page link and map embed, Asaba page map (`showMap`), schema `hasMap` (CID 6941066558127702684). Share link `share.google/jDF7bDOlrojDWs3B5` in `siteConfig.googleProfileUrl` | Ufuoma supplied the share link and embed; ChatSEO #2 noted the site never linked the profile. Claiming the profile is still Ufuoma's step |
| 2026-11-16 | Internal links added with ChatSEO's anchors: homepage → Nigeria page, AI check, ChatGPT guide; website-design → Nigeria page and local SEO; local SEO → Nigeria page and AI check; SEO-vs-ads post → Nigeria page; ChatGPT guide → Nigeria page and AI check; Nigeria page → local SEO, Google Ads, Facebook ads, AI check | ChatSEO #1, #4, #7. Skipped: the link from the retired `/blog/local-seo-nigerian-businesses` (301), and the "Google Business Profile setup in Abuja" anchor pointing at the ChatGPT guide (anchor doesn't match the page) |
| 2026-11-16 | Local SEO page: "SEO company in Abuja" section (honest base wording, map-pack review counts from the 9 Nov research) and FAQ | ChatSEO #6 |
| 2026-11-16 | ChatGPT guide: short answer first, then Google / Bing / ChatGPT H3s with a fix each; proof = MR DGN Construction named first by ChatGPT (our test, 6 Nov 2026) and 279 AI Overview appearances May–Oct 2026 (building-materials Search Console set) | ChatSEO #7 |
| 2026-11-16 | Lovable guide: H3 sub-answers and a "connect Lovable to Wix" section from Lovable's own Wix connector docs | ChatSEO #8 |
| 2026-11-16 | WhatsApp post: 131-character description; FAQ "How many people use WhatsApp in Nigeria?" without a user count (sources conflict: 15M, 51M, 90M), citing DataReportal (109M internet users, Oct 2025) and Orange/KPMG (installed on 95% of surveyed smartphones; installs, not users); "ads on request" line updated. Blog posts now emit FAQPage schema from their "Questions people ask" section | ChatSEO #3. The Channel-growth and "do we sell it" sections already existed (9 Nov) |
| 2026-11-16 | Not adopted from ChatSEO: asking clients to name the service and city in reviews (breaks Google's April 2026 review policy); exact-match "SEO company in Nigeria" anchors in directories and guest posts (link-spam risk; use brand or plain anchors) | rank-ready-website `references/gbp-setup.md` and `offsite-and-reviews.md` |

## 2026-11-16 (night): layout pass across the whole site, interactive enquiry form

Skills used: impeccable (refinement of the existing look, craft floor, detector: 0 findings), UI UX Pro Max (ChariHelp `.agents/skills/ui-ux-pro-max`, forms and layout rules), Anthropic frontend-design. Verified with `scripts/verify-ui.cjs` (clicks and screenshots at 375/768/1024/1440/1920).

| Date | Decision | Why |
|---|---|---|
| 2026-11-16 | Sections are visible by default (`SectionWrapper` no longer fades from opacity 0) | Unrevealed sections showed as large blank areas on fast scroll, anchor jumps and low-end phones |
| 2026-11-16 | Service, location, market and "websites for" pages: full-width header with "The short answer" card beside the title, then content plus a sticky sidebar (WhatsApp, call, quote, "On this page"); card lists in 2–3 column grids, an odd last card spans the row; paragraphs capped at 68ch | The single 768px column left most of a large screen empty |
| 2026-11-16 | Guides, blog posts and the how-to guide keep a 48rem reading column and add a sticky contents list and CTA on xl screens; FAQ gets a sticky topic list; AI check page gets a sticky "what we check" panel | Reading pages keep a comfortable line length; the side space now helps navigation |
| 2026-11-16 | Homepage: "What we do" lists all 8 services in a 4×2 grid; testimonials show all three Google reviews side by side with a link to Google; offer summary in a 3-column grid; founder strip as a full-width split; tighter stats bar; section padding 64–80px instead of 96px | Narrow boxes, orphan cards and a one-at-a-time carousel were the dead space on large screens |
| 2026-11-16 | Pricing: "Software & Web Apps" is a full-width card under the four packages | It sat alone on its own row |
| 2026-11-16 | Containers grow to 88rem on 2xl screens | Better use of 1920px+ screens without breaking line lengths |
| 2026-11-16 | Contact and get-quote use `components/forms/ProjectInquiryForm.tsx`: five steps, one question each (services as multi-select chips, timeline and budget as single-choice chips that auto-advance, business and message, then name/email/optional WhatsApp), budgets in the visitor's currency from `pricing-config`, progress bar, Back, Enter to continue, inline errors, focus moves to each question, reduced motion respected. Same `/api/contact` payload and TikTok events; the API now also accepts an optional `phone` | Ufuoma asked for an interactive form; one-question-per-page pattern (shadcn Questionnaire, Alberta design system question page) |
| 2026-11-16 | Contact page: details left, sticky form right, founder card and map in a full-width row; the duplicate final CTA removed | The old form ended halfway down next to a long left column |
| 2026-11-17 | Full sitemap audit (65 pages, 76 internal links): no broken links, one H1 and a self-canonical on every page. Fixed: FAQ title (90 → 59 chars with brand), shorter titles for e-commerce, Facebook/Instagram ads and Katampe Extension, two guide descriptions trimmed under 160 chars, og:image added to /terms and /privacy (page openGraph overrode the root image). Left: blog post `website-maintenance-checklist` title is 68 chars (lives in the backend database); http apex takes two hops to www (Vercel domain setting: point the apex straight at https://www.) | Easy wins from the marketingskills seo-audit pass; titles past ~60 chars get cut off in results |
| 2026-11-17 | Admin: invoices (/admin/invoices, print to PDF), client onboarding form (/onboarding, noindex) with inbox (/admin/intakes), and login hardening (DB-backed lockout per IP and site-wide, optional authenticator-app code, 8-hour signed sessions checked on every admin page, login email alerts, cross-site write block). Owner steps: docs/ADMIN-SECURITY-INVOICES-ONBOARDING.md | Owner request: bill and onboard clients from one place; admin was password-only with an in-memory rate limit that did not hold across Vercel instances |
| 2026-11-17 | Onboarding form branches by industry (14 types) with follow-up questions; admin panel locked to light colours (answers were unreadable when the browser was in dark mode) | Owner request: one link for every kind of client, more detailed per niche |
| 2026-11-17 | Payments: saved methods (bank, Raenest/Payoneer/Paystack/Grey links, own-wallet stablecoin), private client invoice page /i/<secret> with no tracking, payment log; Tailwind now scans admin/ and lib/ (admin-only classes were missing) | Owner answers: CAC-registered; offer all four providers; crypto to own wallet; online link + PDF. Grey held funds before, so two rails minimum |
| 2026-11-17 | Payer rules per payment method shown on invoices; quick-pick buttons for payment methods; Client link / Copy message / WhatsApp save first and offer Draft -> Sent; friendly page for wrong or unsent links | Owner hit a 404: the invoice was still a Draft. Payoneer requires business-account payers, so clients must see the rules |
| 2026-11-17 | Project terms on /terms#project-terms (11 plain-language terms, version 2026-11-17) and an "I accept" box on client invoices that records name, time and a snapshot of what was accepted; terms date fixed; IP section now says the client owns the site once paid (matches FAQ) | Owner: clients won't sign a contract for a $500–1,000 job. Pay-to-accept plus click-to-accept gives a record payment providers and disputes can rely on |
| 2026-11-17 | Client workflow: lead inbox (all forms saved), client project pages with checklist, review rounds (2 included, extra flagged), launch approval, launch checklist, handover pack, review request; monthly invoices, reminders (once each) and receipts via daily Vercel Cron; admin menu groups site content; own-site case study from the Search Console export | Owner asked for items 1–6 so a new client needs less chasing; launch-checklist.md already required forms to be stored in the admin |
| 2026-11-20 | Homepage rewritten around "Website Design & SEO in Abuja and Asaba" (new H1, title, description); new Abuja section (founder lives in Abuja, free discovery visits usually within 24 hours, districts, 4 Abuja projects, Abuja service links), Asaba office section (walk-ins at MR DGN's office), "Beyond Abuja and Asaba" (Lagos, Benin City, UK, online) and a homepage FAQ with FAQPage schema. Stock-photo "client" avatars removed from the hero. Abuja/Asaba/Okpanam/Nigeria pages, the WhatsApp post and the "not on Google" guide link back to the homepage | Owner, 20 Nov 2026: wants Abuja clear (20+ mentions), homepage traction passed to inner pages. Client cities from the owner: Abuja = Mansa Luxe, FP Conglomerate, BSG, MR DGN Construction (also Asaba); Asaba = MR DGN Group HQ, MR DGN Construction, Mama Onome; Lagos = SOCASEMP; Benin City = TMM Scholars (programme for Benin City, client not based there); UK = Runway Refined; online = Needool, Trade with MRK; K-CAP is in Owa, Delta State (its own site). No Abuja address is shown anywhere: Abuja is a service area (Gate 2) |
| 2026-11-20 | No Benin City location page (yet) | Gate 3: one one-page project for a client not based there, no visits or other Benin work. Benin City is named with TMM in "Beyond Abuja and Asaba". Revisit when there is a second Benin project or the owner's quote from Mr Jerry is confirmed word for word |

## 2026-11-26: Search Console quick wins (5+ word queries, last 3 months)

| Date | Decision | Why |
|---|---|---|
| 2026-11-26 | SEO-vs-ads post retitled "SEO vs Google Ads in Nigeria: Which Should You Do First?", first H2 and a new FAQ use "SEO vs Google Ads" | "seo vs google ads nigeria" at #10.7; the old title said "SEO or Google Ads" |
| 2026-11-26 | "Not on Google" guide: title, H1, description and the ChatGPT H3 now say "showing up" | "why isn't my website showing up in chatgpt…" variants at #8.5–10 |
| 2026-11-26 | WhatsApp post: "How to grow a WhatsApp Channel in Nigeria" rewritten as 6 numbered steps, plus a matching FAQ | "how to grow whatsapp channel nigeria" at #25 |
| 2026-11-26 | Off-site plan in `seo/listings-and-articles-2026-11-26.md`: listings first, then rewritten (not copied) articles on LinkedIn, Medium, Quora, Reddit, dev.to; Yelp skipped (Nigeria not supported) | Owner request; Google syndication guidance and link-spam policy |
| 2026-11-26 | Full 16-month export: titles/H1s changed for CTR on pages that rank top 10 but get no clicks: pricing ("Website Design & SEO Prices", H1 "Website design and SEO prices"), about (brand + "Web Design & SEO, Abuja"), process ("How We Build Your Website"), FAQ (80 → 54 chars). WhatsApp post retitled "WhatsApp Marketing in Nigeria: Types, Channel Growth and Services" (1,324 impressions, #10, 0.38% CTR); maintenance checklist and redesign posts retitled to match "monthly … checklist" and "signs it's time for a new website" | GSC 26 Nov 2026 (Mar–Nov), 37 clicks / 3,578 impressions |
| 2026-11-26 | New in-body links: maintenance service FAQ → checklist; redesign FAQs → redesign-signs post and Lovable guide; Facebook ads FAQ → WhatsApp post | These posts had 3–6 in-body inlinks |
| 2026-11-26 | Not done, owner decision: a WhatsApp marketing service page. "whatsapp marketing service nigeria" (#22) and "whatsapp growth services nigeria" (#13) are buying searches, but the post says we don't sell it separately | Don't promise a service that isn't offered |
