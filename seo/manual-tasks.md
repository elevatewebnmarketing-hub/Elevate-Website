# Manual dashboard tasks: do these at the end

## 27 November 2026 update

- Completed in Search Console: indexing requests accepted for `/services`, `/services/google-ads`, `/services/website-redesign`, `/services/website-maintenance`, `/get-quote` and portfolio items 3, 4, 5 and 7. Confirm actual indexing later; avoid duplicate submissions now.
- Sitemap checked: successful, 69 discovered URLs, last read 27 November. No resubmission needed.
- After deploying the client-enquiries branch: inspect `/case-studies/mansa-luxe-realty` and request indexing once. Map/test the new enquiry data-layer events in the existing GTM/GA4 setup before publishing container changes. Details: `seo/client-enquiries-2026-11-27.md`.

Ufuoma does these by hand once the code work is finished and pushed. Code changes (pricing, testimonials, portfolio, pages) are **not** listed here: they're done in code.

## 16 Nov 2026: new ads pages are live (do these)

- [ ] **Google Search Console → URL Inspection → Request indexing** (Google doesn't take IndexNow; one URL at a time, daily quota):
  - https://www.elevatewebandmarketing.com/services/google-ads
  - https://www.elevatewebandmarketing.com/services/facebook-instagram-ads
  - https://www.elevatewebandmarketing.com/services/digital-marketing
  - https://www.elevatewebandmarketing.com/services/local-seo (prices and scope changed)
  - https://www.elevatewebandmarketing.com/pricing
- [x] IndexNow (Bing, Yandex and partners): 14 changed URLs submitted 16 Nov 2026, all accepted. Re-run any time with `npx tsx scripts/submit-indexnow.ts` (whole sitemap) or pass paths.
- [ ] Top up DataForSEO (balance was $0.001 on 16 Nov; minimum top-up $50) before using OpenSEO or map rank grids.

## After the site is deployed

- [ ] **Google Search Console:** submit `sitemap.xml`, then request indexing for:
  - `/services/local-seo`, `/services/website-design`, `/services/website-redesign`, `/services/landing-pages`, `/services/website-maintenance`
  - `/locations/asaba`, `/locations/nigeria`
  - `/case-studies`, `/portfolio`
  - `/ai-visibility-check`, `/how-to-get-more-customers`, `/uk`, `/case-studies/runway-refined`
  - `/websites-for/coaches`, `/websites-for/clinics`, `/websites-for/diaspora-businesses`
- [ ] **Search Console → Pages report:** find out why most of the 21 blog posts aren't indexed (on 17 Oct a `site:` search showed only 3 posts).
- [ ] **Bing Webmaster Tools:** import from Search Console, then run `scripts/submit-indexnow.ts`.

## Elevate's Google Business Profile (updated 16 Nov 2026)

- [ ] Paste the copy in `seo/gbp-profile-copy-2026-11-16.md` (Google, Bing, Apple, Facebook), one big edit at a time. It replaces the earlier "switch to an Abuja service area" list: Ufuoma chose to keep the Asaba address shown (risk in `decisions.md`).

## Elevate listings (with the same name, phone and Abuja service area)

- [ ] Bing Places, Apple Business Connect, Foursquare, Facebook page
- [ ] VConnect, BusinessList.com.ng, Finelib, ConnectNigeria

## MR DGN Construction's Google Business Profile (case study #1)

- [ ] Check the address and service area so it appears for "building materials Okpanam" (missing from the top 10 on 17 Oct).
- [ ] Add categories (Building materials supplier plus relevant secondary ones), products (cement, blocks, sand) and photos.
- [ ] Review requests to every past buyer.
- [ ] Re-check these four searches every 2 weeks: cement blocks in Asaba (#6), cement supplier Asaba (#7), building materials in Asaba (not top 10), building materials Okpanam (not top 10).

## Foreign clients (UK and US)

- [ ] Payoneer: send yourself a small test payment ($5 to $10) from someone abroad through "Request a payment", to confirm money arrives and you can withdraw.
- [ ] Optional backup: turn on international payments in Paystack (needs your CAC BN and full KYC).
- [ ] Create agency listings on Clutch and GoodFirms (real reviews only), linking to `/uk` and the case studies.
- [ ] Ask Alek for a 30-second video testimonial for the Runway Refined case study.
- [ ] Record a short face-to-camera video for the `/uk` page and LinkedIn: who you are and how a remote project works.
- [ ] After the 18 Oct deploy, request indexing in Search Console (when the daily quota resets) for:
  - https://www.elevatewebandmarketing.com/us
  - https://www.elevatewebandmarketing.com/guides/why-your-website-isnt-on-google
  - https://www.elevatewebandmarketing.com/guides/lovable-wix-squarespace-seo
  - https://www.elevatewebandmarketing.com/guides/website-cost-uk
- [ ] Put the website link (https://www.elevatewebandmarketing.com) in the bio of every social account: Instagram, X, Facebook, YouTube, TikTok.
- [ ] Create a LinkedIn profile (and later a company page) with the same name. LinkedIn is where UK and US coaches and clinics are.

## Accounts

- [ ] DataForSEO: verify the account at app.dataforseo.com, so I can run proper map rank grids.
