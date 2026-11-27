# Search visibility and client enquiries: 27 November 2026

## Objective and evidence

Attract business owners looking to buy website design, local SEO/Google Business Profile work, redesigns and maintenance. Success is qualified enquiries and projects, with search clicks and impressions as diagnostic measures.

Reviewed the live Search Console property, the website source and existing research, `SEO_Website_AI_Skills/skills/rank-ready-website/`, and `Claude-Motion-Graphics/business/CONTEXT.md`. Later website decisions supersede older offer/pricing notes in the other repositories. No new software subscriptions or paid data were purchased.

Search Console Web report, 26 August–25 November 2026: 15 clicks, 2,119 impressions, 0.7% CTR, average position 43.6. Latest 28 days: 7 clicks, about 1,360 impressions, 0.5% CTR, position 49.7. This is a different reporting window from `docs/search-console-2026-11-23.md`; do not compare the totals as equivalent periods.

| Existing page | 3-month impressions | Clicks | Average position | Priority |
| --- | ---: | ---: | ---: | --- |
| WhatsApp marketing Nigeria article | 438 | 2 | 11.8 | Keep the 26 November title/content update stable; add relevant paths to services and measure the same query mix |
| Nigeria location page | 621 | 1 | 71.2 | Relevance, proof and authority before snippet experiments |
| Local SEO service | 59 | 0 | 57.7 | Link documented proof and useful supporting content |
| Website design service | 27 | 0 | 38.8 | Strengthen discovery from portfolio and articles |
| Abuja location page | 39 | 0 | 64.2 | Support real local proof; no additional city copies |
| ChatGPT recommendations guide | 242 | 0 | 51.0 | Support with verifiable examples, not guaranteed recommendations |

## Query-to-page priorities

These are target groups, not claims of measured volume or future ranking. Preserve the existing URLs.

| Buyer search group | Primary destination | Supporting proof/content |
| --- | --- | --- |
| local SEO services Abuja; Google Business Profile setup/optimisation Abuja | `/services/local-seo` | Mansa Luxe case study; GBP setup guide |
| SEO company Nigeria; SEO services Nigeria | `/locations/nigeria` | National service scope and project evidence; distinguish from local service intent |
| website design Abuja; business website design Abuja | `/services/website-design` | Portfolio projects; prices; website-cost guide |
| website redesign Abuja; fix website not showing on Google | `/services/website-redesign` | Diagnostic guide and actual rebuild work |
| website maintenance Abuja; website care plans Nigeria | `/services/website-maintenance` | Maintenance checklist; clearly scoped plan |
| WhatsApp marketing service Nigeria; WhatsApp channel growth | Existing WhatsApp article | Honest DIY answer; offer websites/local SEO/Meta ads where relevant. Elevate does not sell a standalone WhatsApp marketing service |

Avoid creating a second generic SEO page or pages for every Abuja district. The current aggregate query and page tables do not establish cannibalisation. Filter each important query to Pages and compare equivalent periods before merging URLs.

## Changes in this branch

- Added a Mansa Luxe Realty case study using the existing May–October 2026 data: 46 to 843 monthly web impressions, 40 clicks across the six months, and 363 separately reported AI Overview appearances. Discloses shared ownership and that impressions are not enquiries or sales; no causal or ranking guarantee.
- Linked the case study from the website design and local SEO pages, case-study hub and relevant blog next steps, and portfolio project 3. Added it to the sitemap.
- Added relevant commercial next steps to blog pages and topic-based related article selection, replacing date-only circular recommendations.
- Added service links, WhatsApp/quote CTAs and breadcrumb structured data to portfolio detail pages. Historical service tags resolve directly to current service URLs.
- Made the case-study hub and its evidence cards visible on first render by removing opacity-zero scroll reveals. This addresses usability and no-JavaScript visibility; it does not establish that Google was unable to crawl the old content.
- Corrected overconfident local SEO claims about first-page results, three-week calls, controlling distance and one supposedly decisive ranking signal.
- Added `enquiry_click`, `enquiry_form_start` and `enquiry_form_success` to the existing GTM data layer. Channels: WhatsApp, phone, booking and form. Success is emitted only after the contact endpoint succeeds. The new events exclude private routes and send no form values or query strings.

## Google Search Console actions already completed

Google confirmed priority-crawl-queue submissions for `/services`, `/services/google-ads`, `/services/website-redesign`, `/services/website-maintenance`, `/get-quote`, and `/portfolio/3`, `/portfolio/4`, `/portfolio/5`, `/portfolio/7`. The services overview required one retry. Requests are not proof of indexing.

The sitemap was successful, read on 27 November, and contained 69 discovered URLs before this branch. No need to resubmit an already healthy sitemap. Recheck the new case study after deployment, then request indexing once.

## Research basis

- [Google link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable): crawlable links with descriptive anchors; relevant internal links help discovery and understanding. Applied to blog → services, portfolio → services, services → proof.
- [Google helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): original information, first-hand expertise, clear sourcing. Applied to the documented case study and ownership/methodology disclosure.
- [Google Search Essentials](https://developers.google.com/search/docs/essentials): use buyer wording in prominent, descriptive places. Existing service titles already cover the main commercial terms; broad rewrites were unnecessary.
- [Google local ranking guidance](https://support.google.com/business/answer/7091): relevance, distance and prominence; accurate business details and genuine reviews. Website work cannot change distance or guarantee Maps placement.
- [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies): no doorway pages, link schemes or scaled low-value content. No paid links, city-page expansion or fabricated reviews were added.

The rank-ready guidance is a workflow, not a ranking mechanism. Google has no special plugin that guarantees page one. Useful free tools are Search Console, PageSpeed Insights, the existing checker and Bing Webmaster Tools. Screaming Frog's free allowance is sufficient for a site of this size. DataForSEO is optional for location-specific research; no paid calls were made.

## Validation and limitations

The existing raw-HTML checker reviewed 40 live URLs: 0 blocking failures, 82 warnings. Warnings include a checker header-case issue (it looks up `Content-Type` in a case-sensitive dictionary, while this server returns lower-case headers), decorative/tracking image alt warnings and some long metadata. They are not 82 verified ranking defects. A separate HTTP response confirmed the local SEO page is HTML with status 200. No server-rendering migration is needed.

Validation passed: `npm run build`, `npx tsc --noEmit`, `node --test scripts/seo-regression.test.mjs` (3 passing tests) and `git diff --check`. The tests cover relevant content paths, canonical service mappings, related-post behaviour and private-route exclusions in the new measurement events. Seven local production routes were also checked: the new case study, local SEO, website design, WhatsApp article, portfolio items 3 and 4, and case-study hub. Each returned one H1, its intended canonical and parseable JSON-LD; the relevant service, proof and enquiry links were present. The new article schema and ownership disclosure were present. The hub no longer emitted opacity-zero styles. The generated sitemap contained 70 unique URLs and included the new case study.

Live mobile performance, the GTM/GA4 container configuration, backlink quality and the actual Business Profile configuration have not been verified in this implementation pass. Search Console has insufficient Core Web Vitals field data. Do not label the site fast based on that absence.

## Next work after deployment

1. Inspect the new case study and updated local SEO page in Search Console; verify Google-selected canonicals and request indexing once. Monitor the nine submitted pages for actual indexing.
2. In GTM, map the new custom events to GA4 tags and test in Preview/DebugView before publishing. Use `enquiry_form_success` for confirmed submissions; WhatsApp/phone clicks are contact attempts, not confirmed enquiries. Existing container events were not inspected, so check for duplicates before mapping.
3. Compare 28-day performance by the same query group, country and device. Review the WhatsApp article's 26 November change only after a useful observation window; do not keep changing its title daily.
4. Test homepage, service page, article and quote page in PageSpeed Insights on mobile. Fix measured bottlenecks rather than removing useful features speculatively.
5. Review the real GBP services, categories, hours, address eligibility and website destination. Existing notes record an Asaba-address question; do not invent or add an Abuja office. Verify Bing Places, Apple Business, Facebook and relevant reputable listings for consistent details.
6. Ask clients for honest reviews without incentives or gating, and pursue relevant editorial mentions or genuine local partnerships. Verify existing listings before creating duplicates. These actions require their own factual/account checks; none were performed in this code branch.
7. Track actual qualified conversations and won projects separately. Search Console does not report ChatGPT referrals or lead quality.
