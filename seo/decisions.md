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
