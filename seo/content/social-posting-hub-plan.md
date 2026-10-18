# Social posting hub plan (18 Oct 2026)

**Goal:** post Elevate's short videos and posts everywhere (LinkedIn, Instagram, Facebook, TikTok, YouTube Shorts, X, Threads, maybe Reddit) without doing it by hand 8 times.

## Recommendation

**Phase 1, now: use an existing scheduler. Don't build anything yet.**
- Building our own hub means app reviews and audits on several platforms before posts can even go public (details below). That's weeks of setup for no new clients.
- **Pick: Buffer Essentials** at $5 per channel per month. Choose the 5 channels that matter (LinkedIn, Instagram, TikTok, YouTube, Facebook), about $25 a month.
  - Buffer posts to all of those plus X and Threads, and also Google Business Profile.
  - Start on the free plan (3 channels, 10 scheduled posts each) to test the workflow, then upgrade.
- **Alternative: Metricool Starter** at about $20 a month (annual).
  - Better analytics and one brand covering many networks.
  - The free plan excludes LinkedIn and X, and X is a paid add-on on every plan.

**Phase 2, later (only if Phase 1 becomes the bottleneck): a custom hub.**
- Worth it once you post daily across 6 or more networks, or offer posting as a service to clients.
- Build it on the official APIs below, starting with the networks that need no audit (LinkedIn personal, YouTube, Threads, Instagram), and add TikTok after its audit.

## What a custom hub would face (official docs, checked 18 Oct 2026)

| Platform | Can our app post? | Hurdles | Limits |
|---|---|---|---|
| **LinkedIn (personal profile)** | Yes, through the self-serve "Share on LinkedIn" product (`w_member_social`) | No partner review for your own profile (per vendor guides; confirm in LinkedIn's developer portal) | Video up to **15 min, 5 GB** (LinkedIn Help) |
| **LinkedIn (company page)** | Only through the Community Management API | Partner approval: registered business, verified email, screencast review | Same |
| **Instagram** | Yes, Business or Creator accounts only | `instagram_business_content_publish` permission; the Facebook Page may need Page Publishing Authorisation | **100 API posts per 24 h** (the docs also say 50 for carousels); Reels and carousels of up to 10 items |
| **Facebook Page** | Yes, through the Graph API with Page permissions | Meta app review for public use | |
| **TikTok** | Yes, through the Content Posting API (`video.publish`) | **Unaudited apps can only post privately** until TikTok audits the app | |
| **YouTube (Shorts)** | Yes, through `videos.insert` | Google OAuth app verification for public users; uploads from unverified projects aren't forced private | **100 uploads a day** per project |
| **Threads** | Yes (`threads_content_publish`) | Meta app setup | **250 posts per 24 h; 500 characters; video up to 5 min** |
| **X** | Yes, but **paid**: pay-per-use since 6 Feb 2026, with no free tier for new developers | Prepaid credits | Third-party reports say about $0.015 per post and $0.20 if it contains a link (check docs.x.com before budgeting) |
| **Reddit** | Technically yes; free tier is non-commercial | Each subreddit sets its own rules; blasting links is treated as spam | **Not recommended for automation.** Post by hand, value first, in relevant communities |

## Caption, video and hashtag guide

| Platform | Text limit | Video | Hashtags | Note |
|---|---|---|---|---|
| LinkedIn | 3,000 characters | Up to 15 min (official) | 3 to 5 relevant ones | "See more" cuts in at about 140 characters, so the hook goes first |
| Instagram | 2,200 characters | Reels up to 90 s through the API (vendor docs) | **Max 5 per post** (rolled out from Dec 2025, widely reported) | Mosseri: hashtags help with search and context, not reach |
| Facebook | Very long posts allowed | Reels are short vertical video | 1 to 3, optional | |
| TikTok | 2,200 characters (one source says 4,000) | In-app uploads can be long; keep posts short | 3 to 5 | |
| YouTube Shorts | Title 100 characters, description 5,000 | **Up to 3 min** since 15 Oct 2024 (widely reported) | 3 to 5 in the description | |
| X | 280 characters (Premium: much longer) | About 140 s on free accounts (vendor guide) | 1 to 2 | |
| Threads | 500 characters (official) | Up to 5 min (official) | 1 topic tag | |
| Reddit | Long text allowed | Video supported | None | Follow each subreddit's rules |

Limits change often. Each tool shows the live limit when you post, so treat this table as a writing guide, not a contract.

## Weekly content system (Phase 1)

1. **Record once:** one 30 to 60-second vertical video a day, with your face on camera. Ideas:
   - an AI visibility check teardown of a real site, with the name blurred or used with permission
   - one SEO tip in plain English
   - a client story (MR DGN found through ChatGPT; Runway Refined)
   - a myth, for example "you need ads to get customers"
2. **Write one master caption:** hook in the first line, one point, a call to action ("Run the free AI visibility check", with the link in your bio or a comment), and 3 to 5 specific hashtags.
3. **Schedule in Buffer** to LinkedIn, Instagram Reels, TikTok, YouTube Shorts and Facebook. Add Threads and X when you upgrade.
4. **Reddit and LinkedIn comments, by hand:** answer real questions in r/smallbusiness, r/Entrepreneur and niche subreddits (coaching, private practice). No links unless the subreddit allows them.
5. **Reuse:** every week, turn the best video into a blog post or guide section on the website. That's internal content that can rank, linked to the money pages.
6. **Measure monthly:** followers matter less than enquiries. Track WhatsApp messages, tool checks (count them in GA4) and calls booked.

## Phase 2 sketch (if built later)

- **Stack:** a small Next.js admin inside the existing site, or a separate app. A post queue in Supabase or a JSON file, video files on Cloudinary, a scheduled job (Vercel Cron) that publishes through each official API, and per-platform caption fields with live character counters.
- **Effort:** roughly 2 to 4 weeks of build plus app-review waiting time.
  - LinkedIn personal, YouTube and Threads first.
  - Instagram and Facebook after Meta review.
  - TikTok after its audit.
  - X only if worth paying per post.
- **Bonus:** the same hub could become a client service later (social posting for SEO clients).

## Sources

- [Buffer pricing](https://buffer.com/pricing)
- [Metricool pricing](https://metricool.com/pricing/)
- [Instagram content publishing (Meta)](https://developers.facebook.com/docs/instagram-platform/content-publishing)
- [Threads API overview (Meta)](https://developers.facebook.com/docs/threads/overview)
- [TikTok Content Posting API](https://developers.tiktok.com/doc/content-posting-api-get-started)
- [YouTube videos.insert](https://developers.google.com/youtube/v3/docs/videos/insert)
- [LinkedIn video specs (LinkedIn Help)](https://www.linkedin.com/help/linkedin/answer/a548372)
- [Share on LinkedIn (LinkedIn developers)](https://developer.linkedin.com/documents/share-api)
- [X API pay-per-use (OpenTweet summary)](https://opentweet.io/x-api-pricing)
- [Instagram 5-hashtag limit (Inmagic summary)](https://inmagic.ai/how-many-hashtags-on-instagram/)
- [YouTube Shorts up to 3 minutes (Gigazine)](https://gigazine.net/gsc_news/en/20241004-youtube-short-video-length-3-minutes)
- [Reddit API limits and rules (Postiz summary)](https://postiz.com/blog/reddit-api-limits-rules-and-posting-restrictions-explained)
- [Character limits (Upload-Post docs)](https://docs.upload-post.com/resources/character-limits)
