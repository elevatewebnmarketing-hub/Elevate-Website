/**
 * Adds 6 new blog posts to data/blog.json and upserts them into Supabase.
 * Run: npx tsx scripts/push-new-blog-posts.ts
 *
 * Safe to re-run — posts are upserted by ID (no duplicates created).
 */

import { config } from 'dotenv';

config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Supabase client (direct — no path-alias imports needed)
// ---------------------------------------------------------------------------

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// ---------------------------------------------------------------------------
// Post data
// ---------------------------------------------------------------------------

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published_at: string;
  author: string;
  image: string | null;
}

const newPosts: Post[] = [
  {
    id: '16',
    slug: 'website-cost-in-nigeria-2026',
    title: 'How Much Does a Website Cost in Nigeria in 2026? (Honest Price Breakdown)',
    excerpt:
      "From ₦100K brochure sites to ₦15M custom builds — here's exactly what different budgets get you and the hidden costs most agencies won't tell you upfront.",
    published_at: '2026-05-06T00:00:00.000Z',
    author: 'Elevate Team',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    content: `If you've asked three different web designers what a website costs in Nigeria, you've probably received three completely different quotes. One says ₦80,000. Another says ₦500,000. A third says ₦1.5 million. All three claim to build professional websites.

The variation isn't random — it reflects a market where "website" means very different things to different people. This guide breaks down what you actually get at each price point, what costs are usually absent from the initial quote, and what to ask before committing to anyone.

## The 4 Main Website Types and Their Price Ranges

Understanding which category your business falls into puts everything else in perspective.

**Basic brochure or informational site — ₦100,000 to ₦300,000**

Three to five pages: Home, About, Services, Contact, maybe a Gallery. No e-commerce, no blog, a standard contact form. Built on a template with moderate customisation. This works for sole traders, freelancers, and small service businesses that simply need a credible online presence.

At this price range, expect a pre-built template with your branding applied, stock photography, and limited post-launch involvement from the builder.

**Small business website — ₦250,000 to ₦600,000**

Six to fifteen pages, typically including a blog, inquiry forms, basic SEO setup, and a mobile-responsive layout that was intentionally designed — not just resized from a desktop template. This is the most common genuine need for Nigerian SMEs that want to generate leads and appear in Google results.

At this price range, expect meaningful design customisation, SEO structure built into the code, analytics setup, and a brief training handover so you can update content yourself.

**E-commerce website — ₦450,000 to ₦2,000,000+**

Product listings, shopping cart, payment gateway integration (Paystack, Flutterwave, or both), inventory management, and order notifications. Price scales with the number of products, checkout complexity, and any custom features. A 50-product store is a very different project from a multi-vendor marketplace.

**Custom or enterprise — ₦2,000,000 to ₦15,000,000+**

Custom-built functionality: member portals, advanced booking systems, API integrations with your existing tools, SaaS products, or complex multi-language platforms. These require full development teams and extended timelines. If you're in this category, you already know it.

## The Additional Costs Most Agencies Don't Mention Upfront

The quote you receive for the "build" is often just the starting number. These additional costs are real, recurring, and frequently omitted from initial proposals:

- **Domain name:** ₦10,000–₦30,000 per year. A .com costs more than a .com.ng. Some agencies include this; most don't.
- **Web hosting:** ₦20,000–₦500,000 per year. Shared hosting, managed hosting, VPS, and cloud infrastructure are very different products. Cheap hosting means slow sites and more downtime — both of which directly cost you customers and rankings.
- **SSL certificate:** Required for the security padlock in the browser and for Google to rank you. Often bundled in hosting plans but not always — confirm before signing.
- **Website maintenance:** ₦50,000–₦1,000,000 per year. Security patches, software updates, content changes, and backups all require ongoing work. If your quote doesn't mention maintenance, ask what happens when something breaks six months after launch.
- **Content writing and photography:** ₦30,000–₦200,000+ one-time. Many builds assume you supply all the text and images. If you're not ready for this, the cost is real and significant.
- **Payment gateway setup:** Integrating Paystack or Flutterwave isn't always included in e-commerce builds — confirm upfront.

**A ₦200,000 quote that excludes hosting, SSL, domain, and maintenance is not necessarily cheaper than a ₦350,000 all-in quote. Calculate the full first-year cost before comparing figures.**

## Freelancer vs. Agency: What the Price Difference Means

**Freelancers — ₦50,000 to ₦300,000 per project.** The right freelancer can be exceptional — focused, skilled, and often more responsive than a large agency. The risk: they're a single point of failure. If they get sick, take on another project, or move on, your project stalls. Post-launch support is usually informal.

**Agencies — ₦300,000 to ₦2,000,000+.** You're paying for a structured process, team accountability, and continuity. A well-run agency has a designer, a developer, and a project manager coordinating your build. The risk: price doesn't guarantee quality. Some agencies charge premium rates for template sites with light customisation.

The best indicator of quality at any price point isn't whether you hire a freelancer or an agency — it's the live work they've already shipped. Open their previous client sites on your phone. If they're slow, generic, or broken on mobile, the price they charged is irrelevant.

## What You Actually Get at Each Price Point

**Under ₦150,000:** Template sites with minimal customisation. Often built on basic website builders or free themes. Functional for a basic presence, but difficult to differentiate from competitors, with limited SEO capability and no real performance optimisation.

**₦150,000–₦400,000:** Properly customised design, a cleaner SEO foundation, Google Analytics setup, and usually some post-launch guidance. Adequate for most small businesses starting out online.

**₦400,000–₦1,000,000:** Brand-aligned design, mobile-first development, a conversion-focused layout, technical SEO built into the structure, and genuine ongoing support. This is the range where websites start actively generating leads rather than just existing.

**₦1,000,000+:** Fully custom builds, complex functionality, integrations with your CRM or operations tools, and strategic input on content and conversion flows. Appropriate for businesses where the website is a primary revenue driver.

## 5 Questions to Ask Before You Pay Anyone

Before signing a contract or paying a deposit, get clear answers to these five questions:

- Does this price include hosting and domain, or just the design and build?
- Will I own the design files, source code, and domain outright — or am I locked into your platform?
- What does post-launch support look like, and what does it cost?
- Can I see live examples of sites you've built at this budget level?
- What happens if I need changes or additions after we launch?

A confident, professional agency or freelancer will answer every one of these clearly and without hesitation. Vague answers before a contract are a reliable preview of vague delivery after one.

At Elevate Web & Marketing, we give itemised quotes based on your actual business needs — not pre-packaged tiers that may not fit your situation. If you want a clear, honest breakdown of what your website project would actually cost, request a free quote or book a strategy call and we'll walk you through everything upfront.`,
  },
  {
    id: '17',
    slug: 'how-to-choose-web-design-agency-nigeria',
    title: 'How to Choose a Web Design Agency in Nigeria: What to Look For, Red Flags to Avoid',
    excerpt:
      "The Lagos web design market is crowded. Here's the practical buyer's guide — portfolio checks, the right questions, and the red flags that save you from a bad hire.",
    published_at: '2026-05-06T12:00:00.000Z',
    author: 'Elevate Team',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    content: `The web design market in Lagos — and across Nigeria — is genuinely competitive. Good agencies exist. But so do operations that show beautiful portfolios of work they didn't build, quote low and inflate costs after the contract is signed, or disappear after the site goes live. The gap between the best agencies and the worst is significant, and the price difference doesn't always tell you which is which.

This guide gives you the framework to evaluate any web design agency or freelancer in Nigeria before you commit a naira.

## Step 1: Get Clear on What You Actually Need

Agencies pitch to whatever need you present. If you don't know what you need, you'll be sold what they want to sell. Before approaching anyone, be clear on:

- **Type of site:** informational, service-focused, e-commerce, booking system, or portfolio
- **Who manages content after launch:** you, a team member, or do you need ongoing support?
- **Your realistic budget:** not what you hope it costs, but what you can actually spend including first-year running costs
- **Timeline and hard deadlines:** a launch tied to a business event changes the dynamic entirely
- **Key goals:** more leads, e-commerce sales, local search visibility, or something else specific

With these answers, you can evaluate whether an agency's approach actually fits your situation rather than just sounding impressive.

## What to Look at in Their Portfolio

A portfolio is a curated presentation. Here's how to go beyond the surface:

- **Load the live sites they claim.** Not screenshots — the actual URLs. Do they load fast on your phone? Are they live and maintained, or returning a 404 error?
- **Test on mobile.** Open each site on your phone. Is the experience genuinely designed for mobile, or is it a desktop layout squeezed into a smaller screen?
- **Ask directly:** "Did you design and build this entirely, or was it adapted from a purchased template?" A confident agency answers plainly. A defensive answer is a red flag.
- **Look for consistency.** One excellent site in a portfolio of ten mediocre ones signals luck, not skill. You want consistent quality across the body of work.
- **Find work in your industry or a comparable one.** A developer who has built three strong e-commerce sites understands your problems. One who has only built informational brochure sites may not.

## The 6 Questions Every Serious Agency Should Answer Clearly

When you're in conversation with an agency or freelancer, these questions reveal whether they have a real process or are improvising:

- **What does your build process look like from brief to launch?** You should hear a defined sequence: discovery, wireframes or design, development, testing, handover.
- **Who exactly will be working on my project?** Will the person you're speaking to actually build it, or will it be handed to a junior or subcontractor?
- **What's included after launch — and what costs extra?** Hosting, maintenance, security updates, content changes — get specific answers.
- **How do you handle revisions and scope changes?** How many rounds of revisions are included? What happens if requirements grow?
- **Do you handle SEO setup, or just the visual design?** A strong agency builds SEO structure into the site from the beginning, not as an afterthought.
- **Can I speak to a recent client?** A confident, established agency will say yes without hesitation.

## Red Flags That Signal a Bad Hire

These patterns reliably indicate a poor experience ahead:

- Can't show you live sites — only mockups, screenshots, or a Behance portfolio of concepts that were never built
- No written contract or formal scope of work before requesting a deposit
- Quote comes with no line-item breakdown — just a single total number
- Promises first-page Google ranking "within weeks" — this is not how SEO works, and anyone who says otherwise is misleading you
- Refuses to give you ownership of your source code and domain
- Communication is slow or vague before you've paid anything
- Uses pressure tactics or artificial urgency to rush your decision

**If they can't communicate clearly and professionally before the contract, they won't after it. The pre-sales experience is the best preview you'll get of the working relationship.**

## The Difference Between a Good Quote and a Cheap Quote

A proper quote itemises what you're getting:

- Design (number of pages, rounds of revisions included)
- Development (what technology, what functionality)
- SEO setup (title tags, meta descriptions, sitemap, Google Analytics)
- Content (who writes it, who provides images)
- Hosting and domain (included or separate, for how long)
- Training (will you be shown how to manage content?)
- Post-launch support (how long, what's covered)

A cheap quote that omits hosting, domain, ongoing support, and content can cost significantly more in the first year than a slightly higher all-in quote. Always calculate the full cost of ownership before comparing figures.

## How to Evaluate Reviews and Testimonials

Testimonials on an agency's own website are not independent verification — they can be cherry-picked, outdated, or written by the agency itself. Here's how to get a more accurate picture:

- **Check their Google Business Profile.** Google reviews are harder to fabricate than website testimonials, and the pattern of reviews — frequency, detail, the agency's responses — tells you a lot.
- **Look at LinkedIn.** Who works there? Is the team visible and professional? Have clients endorsed specific people?
- **Request an introduction to a recent client.** Frame it as wanting to understand their experience. A confident agency facilitates this without concern.
- **Search the agency name plus "review" or "experience"** — forums, Twitter/X, and Facebook groups sometimes surface real client experiences that don't appear in official review platforms.

At Elevate Web & Marketing, we're happy to answer every question on this list before you commit to anything. We give itemised quotes, we don't use pressure tactics, and we can connect you with clients we've worked with. If you're evaluating agencies and want a transparent conversation about what your project needs and what it will cost, book a free strategy call.`,
  },
  {
    id: '18',
    slug: 'how-to-get-more-customers-from-your-website-nigeria',
    title: 'How to Get More Customers From Your Website (Practical Steps for Nigerian Businesses)',
    excerpt:
      "Traffic without conversions is wasted money. Here's how to turn your website into a customer-generating machine — practical steps built for Nigerian businesses.",
    published_at: '2026-05-13T00:00:00.000Z',
    author: 'Elevate Team',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    content: `There are two separate problems businesses face online: not enough people visiting the website, and people who visit but don't take any action. Most businesses focus almost entirely on the first problem — running ads, posting on social media, trying to rank on Google. Very few solve the second one.

Here's the hard truth: if your website converts at 1%, doubling your ad spend gives you twice the leads. But so does doubling your conversion rate — for free, from the same traffic you already have. Fixing how your website performs with existing visitors is almost always faster and cheaper than chasing more traffic.

This guide covers both problems, in the right order.

## Start With Conversion Before You Chase Traffic

A "conversion" is whatever action matters to your business: a contact form submission, a WhatsApp message, a phone call, a purchase. The conversion rate is the percentage of visitors who take that action.

Most Nigerian business websites convert at well under 2%. That means 98 out of every 100 visitors leave without doing anything. Before spending money to send more people to a site that isn't working, fix the site.

The good news: many conversion improvements cost nothing and can be made in a day.

## Make the First 5 Seconds Count

When someone lands on your website, they make a near-instant decision: stay or leave. That decision happens before they've read a single paragraph. It's made based on how the page looks, loads, and whether the headline immediately communicates what you do.

Your homepage hero section — the first thing visible before scrolling — needs to answer three questions clearly:

- What do you do?
- Who do you do it for?
- Why should they care?

Headlines like "Your Partner in Growth" or "Excellence in Business" answer none of these. A headline like "We build fast, professional websites for Nigerian businesses that want more customers" answers all three.

Check your homepage now. Could a complete stranger understand your core offer in five seconds without scrolling? If the answer is no, your headline is the first thing to fix.

## Remove Friction From the Conversion Path

Every obstacle between a visitor and a conversion costs you enquiries. The goal is to make taking action as easy as possible.

- **Fewer form fields.** Research shows removing a single form field can increase completions by up to 50%. Ask only what you genuinely need: name, email or phone, message. Save the detailed questions for the follow-up conversation.
- **One primary call to action per section.** Multiple competing options — "contact us, shop now, subscribe, learn more" — create paralysis. Guide visitors with a single clear next step at each point in the page.
- **WhatsApp button on every page.** In Nigeria, many customers prefer to message rather than fill in a form. A visible WhatsApp button removes that friction entirely. Make it tap-to-chat on mobile, not just a phone number to copy manually.
- **Clickable phone number.** If your number is displayed as text, most mobile users won't bother typing it. A tel: link means tapping calls you directly.

## Build Trust Before They Have to Ask

People need to trust you before they'll contact or buy — especially online in a market where poor service is a real concern. Your website needs to do that trust-building before the conversation even starts.

- **Show real testimonials near every call to action.** Not generic quotes — specific outcomes. "They built our site in three weeks and we had more enquiries in the first month than in the previous six" is far more convincing than "Great service, highly recommend."
- **Use real photos.** Stock photos of handshakes and anonymous office spaces signal generic. Photos of your actual team, workspace, or real project work signal credibility and accountability.
- **Be specific.** "We've worked with 47 businesses across Lagos, Abuja, and Port Harcourt" builds more trust than "We've helped many satisfied clients." Specificity suggests honesty.
- **Make your contact information visible everywhere.** Phone number, email, and at minimum your city in the header or footer tells visitors you're a real business with real accountability.

## Speed: The Invisible Conversion Killer

Page speed is not a technical concern — it's a revenue concern. Studies consistently show that a significant portion of mobile users abandon a page that takes more than three seconds to load. In Nigeria, where many users are on 4G connections that vary in quality, every extra second of loading time costs you visitors.

- Run your site through Google PageSpeed Insights (pagespeed.web.dev) right now
- Target a score above 75 on mobile
- The most common culprits: large uncompressed images, too many third-party scripts, and cheap overcrowded shared hosting

A slow site doesn't just lose visitors — it also ranks lower on Google. Speed is simultaneously a conversion problem and an SEO problem.

## Get Local Search Traffic Working for You

Traffic from local search is qualitatively different from traffic from paid ads. People who find you by searching "web designer Lagos" or "digital marketing agency Abuja" are already looking for what you offer — they have genuine buying intent.

Businesses with complete Google Business Profiles receive 7x more clicks than those with incomplete profiles. And the local pack — the map results that appear above everything else for location-based searches — is driven almost entirely by GBP quality and reviews.

If you haven't claimed and completed your Google Business Profile, do it this week. It's free, and the return is measurable and fast. Ask every satisfied client for a review and make it a habit rather than an occasional afterthought.

## Use WhatsApp as a Conversion Tool, Not Just a Chat App

Your customers are already on WhatsApp. For many Nigerian businesses, it's the highest-converting channel available — because it's where the conversation feels natural and immediate.

Beyond just having a button on your site:

- Set an immediate greeting message that arrives when someone first contacts you. Don't leave people waiting hours for an acknowledgment.
- Use broadcast lists to follow up with leads who went quiet after an initial enquiry.
- Use WhatsApp Business labels to track where prospects are in your pipeline: New Lead, Quoted, Follow Up, Customer.

The faster you respond on WhatsApp, the higher your conversion rate. Businesses that respond within an hour significantly outperform those that reply the next day.

At Elevate Web & Marketing, we build websites designed to convert from the first visit — with clear copy, fast performance, and WhatsApp integration that fits how Nigerian customers actually behave. If your current site isn't generating the enquiries your business deserves, book a free audit and we'll show you exactly what's costing you customers.`,
  },
  {
    id: '19',
    slug: 'website-maintenance-guide-nigeria',
    title: 'Website Maintenance in Nigeria: Why It Matters and What to Actually Do (Complete Guide)',
    excerpt:
      "A neglected website loses rankings, customers, and security. Here's the practical guide to keeping your website fast, secure, and earning its keep in Nigeria.",
    published_at: '2026-05-13T12:00:00.000Z',
    author: 'Elevate Team',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
    content: `Most business owners think the work ends at launch. Build the site, go live, done. In reality, launch is where a different kind of work begins. A website that isn't actively maintained degrades — slowly at first, then visibly. Security vulnerabilities accumulate. Page speed drops as browsers and mobile standards evolve. Content goes stale. Rankings slip. And the business pays for it in lost customers without ever knowing why.

In Nigeria, where trust and first impressions drive purchasing decisions more than almost anywhere else, a neglected website does more than nothing — it actively damages your brand. This guide covers what website maintenance actually involves, what happens if you skip it, and how to approach it whether you're doing it yourself or hiring professional support.

## Why Website Maintenance Is Not Optional

**Security.** Outdated software is the primary cause of hacked websites worldwide. If your site runs WordPress or any CMS with plugins, every unpatched vulnerability is an open door. A hacked site loses search rankings immediately, displays malware warnings to visitors, and takes days or weeks to fully recover — at significant cost in time and money.

**Performance.** Browsers update. Mobile devices diversify. Standards evolve. A site that loaded quickly in 2023 may load significantly slower in 2026 if its codebase hasn't been maintained alongside the web it runs on. Slower load times directly cost you visitors and rankings.

**Accuracy.** A wrong phone number, an outdated pricing page, or a broken contact form is invisible to you but immediately visible to a potential customer trying to reach you. These errors quietly cost you enquiries every week.

**Search rankings.** Google favours websites that are regularly updated, technically sound, and fast. A neglected site gradually loses ground to competitors who are actively maintaining theirs — even if your underlying content is stronger.

## Content Updates: Keeping Your Site Working for You

Content is one of the clearest signals Google uses to determine whether a site is active and relevant. Regular updates tell search engines your site is worth sending visitors to.

Review these every quarter:

- **Services page:** Does it accurately reflect what you offer today? Have you added services, changed pricing, or stopped offering something?
- **Contact details:** Phone numbers, email addresses, and business hours must be current. A wrong number is a direct lost customer.
- **Team page:** Staff changes need to be reflected promptly. An outdated team page undermines trust.
- **Testimonials and case studies:** Fresh social proof is significantly more convincing than reviews from three years ago. Add new ones as you earn them.

Blog posts deserve particular attention. An article published in 2023 that references outdated information needs to be updated — or clearly marked as historical. In Nigeria's rapidly evolving digital market, what was accurate last year may actively mislead readers today.

## Performance Monitoring: Speed Is Revenue

A slow website doesn't just frustrate visitors — it loses them. On Nigerian mobile networks, where connection quality varies significantly across regions and times of day, a site that performs adequately on WiFi may load frustratingly slowly on a 4G connection.

- Run PageSpeed Insights (pagespeed.web.dev) monthly on your key pages — homepage, main services page, and contact page
- Target a score of 75 or above on mobile
- Common causes of performance regression: new images uploaded without compression, new plugins or scripts added without review, hosting plan overloaded, or a CDN removed

Useful free tools: PageSpeed Insights, Google Search Console (Core Web Vitals section), and Microsoft Clarity (free session recordings and heatmaps that show exactly where visitors lose patience and leave).

## Security: What Can Go Wrong and How to Prevent It

Cyber threats targeting Nigerian businesses are increasing. A compromised website causes immediate damage — loss of customer data, removal from Google's index, and a reputational hit that takes months to recover from.

**Practical security habits:**

- Keep all software, plugins, and themes updated promptly when new versions are available. This single habit prevents the majority of successful attacks.
- Check your SSL certificate expiry date regularly. A lapsed certificate causes browsers to show visitors a "Not Secure" warning — one that drives most people away instantly. Renewals cost very little and take minutes.
- Use strong, unique passwords for your hosting control panel, CMS, and admin accounts. A password manager makes this practical at no extra cost.
- Scan regularly for malware. Many hosting providers include this; if yours doesn't, use a security plugin or managed service.

If you're on Nigerian shared hosting, check specifically what security measures your provider includes. Budget hosting often provides fewer protections than mid-range managed hosting — and the difference in monthly cost is usually far less than the cost of recovering from a single incident.

## Backups: Your Safety Net When Things Go Wrong

Without a functioning backup, a serious site problem can mean starting from scratch. With one, recovery from almost any issue becomes a matter of hours rather than weeks.

- **Frequency:** At minimum, weekly full backups — database plus files. For active e-commerce sites, daily backups.
- **Storage:** Keep backups somewhere other than your main server. If your host has a hardware failure, you don't want your only backup in the same location.
- **Testing:** A backup you've never tested is an assumption, not a backup. Restore from your backup at least once a year to confirm it actually works.
- **Options:** Many hosting providers offer automated backups. WordPress-specific plugins like UpdraftPlus work well for self-managed sites. Paid backup services provide more reliability for business-critical websites.

## Mobile Responsiveness and Cross-Browser Testing

Over 80% of Nigerian internet users access the web primarily on mobile. If your site breaks or degrades on a phone, you're losing the majority of your potential customers before they've read a single word.

After any significant site change — new pages, design updates, plugin additions — run a proper mobile test:

- Test on actual devices, not just browser developer tools. Emulation and real-world rendering can differ in ways that matter.
- Test on both Android and iOS
- Check the browsers most common in Nigeria: Chrome, Samsung Internet, Opera Mini, and Safari on iOS
- Verify: navigation opens and closes correctly, buttons are large enough to tap comfortably, forms submit without errors, images load at appropriate sizes

## SEO Health Checks: Don't Let Rankings Slip Quietly

Search rankings don't disappear overnight — they erode. Regular SEO checks catch the causes before they become serious.

- **Google Search Console is free** and shows you crawl errors, pages with indexing problems, security issues, and your Core Web Vitals scores. Check it monthly.
- Look specifically for: pages accidentally set to "noindex," broken internal links, and duplicate meta titles or descriptions
- Review your ranking positions quarterly. If key pages are consistently dropping, a technical issue on the site is often the cause — not a shift in competition.
- Refresh older content annually: update statistics, revise outdated recommendations, and adjust for how search behaviour has changed. Content freshness is a ranking signal.

## DIY vs. Hiring a Maintenance Retainer

Some maintenance tasks are straightforward to handle yourself:

- Updating text content and images on existing pages
- Writing and publishing new blog posts
- Checking that contact forms are working correctly
- Running monthly PageSpeed tests and monitoring for obvious issues

Others require developer expertise:

- CMS and plugin updates on live production sites — a bad update can break a working site if not handled correctly
- Security patching and technical hardening
- Backup setup and periodic testing
- Hosting migrations and server-side configuration
- Diagnosing and fixing layout or functionality issues after browser updates

If your website generates meaningful revenue — or is supposed to — a professional maintenance retainer pays for itself. You get regular upkeep, peace of mind, and someone accountable when something goes wrong. The alternative is finding an emergency developer at premium rates while your site is down or broken and enquiries are being lost.

At Elevate Web & Marketing, we offer website maintenance retainers for businesses that want their site professionally managed on an ongoing basis. If you'd like to understand what's included and whether it makes sense for your situation, get in touch and we'll give you an honest answer.`,
  },
  {
    id: '20',
    slug: 'seo-for-nigerian-businesses-2026',
    title: "SEO for Nigerian Businesses in 2026: The Step-by-Step Beginner's Guide",
    excerpt:
      "Google controls 97% of Nigerian search. Here's the practical, 2026-updated guide to getting your business found — including what AI search changes for you.",
    published_at: '2026-05-20T00:00:00.000Z',
    author: 'Elevate Team',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
    content: `SEO in 2026 is not the same game it was in 2021. If you've read a beginner's guide from three or four years ago, most of the fundamentals still apply — but there's a new layer that didn't exist then, and ignoring it means missing a growing portion of search traffic.

This guide is written for Nigerian business owners who know SEO matters but haven't yet acted on it, or who have tried and haven't seen results. It covers what has changed in 2026, what still works, and the exact sequence to follow when starting from nothing.

## Why SEO Matters More in Nigeria Right Now

Google controls 97% of the Nigerian search engine market. That means when someone in Lagos searches "web designer near me," "accountant Abuja," or "building materials supplier Lagos," they are using Google — and Google decides who gets seen.

Over 85% of those searches happen on mobile phones. Nigeria has more than 100 million mobile internet users, and that number is still growing. The business with the best mobile website and the strongest local search presence consistently wins new customers, regardless of how long they've been operating.

Here's the opportunity most Nigerian businesses are missing: local SEO competition is still relatively low in most industries. Many competitors have unclaimed Google Business Profiles, slow websites, and no content strategy at all. You don't need to be perfect to outperform them — you just need to be consistent and intentional.

## Step 1: Get Your Google Business Profile Right — This Week

Google Business Profile is the single most underused free marketing tool available to Nigerian businesses. For local searches — any query with a city name, "near me," or a local intent — Google shows a map pack of three businesses above all other results. That position is driven almost entirely by GBP quality and reviews.

**What to do:**

- Go to google.com/business and claim your listing if you haven't already
- Complete every field: business name (exact — no keyword stuffing), category, address or service area, phone, hours, website URL
- Upload at least five to ten photos: your team, your workspace, work samples, your logo
- Write a 750-character business description that naturally includes your main service and location
- Post an update at least twice a month to signal that your business is active

Then start systematically building reviews. Ask every satisfied client — not occasionally, every time. Send the direct Google review link after every completed project. A business with 25 genuine five-star reviews will consistently outrank a competitor with better service but no reviews online.

## Step 2: Fix Your Technical Foundation

Search engines can't rank a site they can't crawl, read, or trust. Before investing time in content or links, your technical foundation needs to be solid.

- **Mobile-first:** Google indexes your mobile site, not your desktop site. If your mobile experience is poor, your rankings suffer regardless of how polished the desktop version is.
- **Page speed:** Target 75 or above on Google PageSpeed Insights (pagespeed.web.dev) on mobile. Slow pages get deprioritised.
- **HTTPS:** An SSL certificate is non-negotiable. Browsers flag non-HTTPS sites as "Not Secure" and Google uses HTTPS as a ranking signal.
- **Clean URL structure:** /services/web-design ranks better than /?page_id=43 and is easier for both users and search engines to understand.
- **XML sitemap:** Submit it to Google Search Console so Google knows which pages exist and can crawl them efficiently.

## Step 3: On-Page SEO — What to Actually Do

On-page SEO is how you communicate to Google what each page is about. The principles are simple:

- **One primary keyword per page.** Don't try to rank one page for fifteen different search terms. Focus each page on the single most relevant query.
- **Include your keyword in the right places:** page title, H1 heading, the first 100 words of content, and the meta description.
- **Write headings that match how people search.** If someone searches "how much does a website cost in Nigeria," your H2 could literally be "How Much Does a Website Cost in Nigeria?" — Google reads headings carefully.
- **Write meta descriptions that earn the click.** They don't directly affect your ranking position, but a well-written meta description (140–160 characters) significantly increases how many people click your result over a competitor's.
- **Alt text on every image.** This describes images for search engines and screen readers. Keep it simple, descriptive, and avoid keyword stuffing.

## Step 4: Publish Content That Answers Real Questions

One well-structured, genuinely useful article per month compounds over twelve months into a real content asset. By the end of a year, you have 12 pages targeting 12 different search queries — each one a potential entry point for a new customer who has never heard of you.

To find what to write:

- Type your core service into Google and look at the autocomplete suggestions — each one is a real search that real people are making
- Scroll to the "People also ask" section on any Google results page — these are the specific questions your audience has
- Check what your competitors are writing and find the gaps they're missing

Format matters as much as content. Google and AI systems both prefer content with clear headings, short paragraphs, bullet points, and direct answers. If your article answers a question clearly in a well-structured format, it's significantly more likely to appear in featured snippets and AI-generated summaries.

## Step 5: Build Local Authority

Once your technical foundation and content are in place, external signals — what other websites say about you — become the next significant ranking factor.

- **List your business in Nigerian directories:** VConnect, BusinessList, ConnectNigeria. Make sure your business name, address, and phone number are identical across every listing — Google uses consistency as a trust signal.
- **Pursue press coverage or expert mentions.** A single mention in TechCabal, Techpoint, BusinessDay, or a relevant industry publication carries significant authority weight.
- **Partner mentions.** If you work with complementary businesses — an accountant who refers web clients, a photographer whose clients need websites — a mention on their site or social profiles builds relevant local authority.

## The 2026 Factor: AI Search and What It Changes

Google's AI Overviews now appear above traditional search results for a growing number of queries. These are AI-generated summaries that answer questions directly on the search page — and the businesses that appear in them get visibility even when they're not ranked number one in the traditional results below.

This is what the industry calls Generative Engine Optimization (GEO): writing and structuring your content so that AI search systems understand, trust, and cite you.

How to write for AI citation:

- Answer specific questions directly and completely — don't bury the answer at the bottom of a long introduction
- Use structured headings that clearly signal the topic of each section
- Add FAQ sections to your service pages — AI systems pull heavily from clearly formatted question-and-answer content
- Demonstrate genuine expertise through detailed about pages, specific case studies, author credentials, and original data
- Use Schema.org structured data so search engines understand exactly what your business does and serves

## What to Prioritise if You're Starting From Zero

Do these in this order. Each step makes the next one more effective:

- **Week 1:** Claim and complete your Google Business Profile. Start asking every satisfied client for a review.
- **Month 1:** Fix technical issues — page speed, HTTPS, mobile experience, submit XML sitemap to Google Search Console.
- **Month 1–3:** Optimise your key pages (homepage, services, contact) for their specific target keywords.
- **Month 2 onwards:** Publish one useful, well-structured content piece per month.
- **Month 3 onwards:** Build local directory listings and pursue external mentions from relevant publications or partners.

Realistic timeline: most businesses see meaningful movement in rankings within three to six months of consistent, well-executed effort. Less competitive local and niche terms often move within weeks. Highly competitive terms in saturated markets take longer.

SEO is not a one-time fix. It's the most reliable long-term source of organic customer acquisition available to Nigerian businesses — and it compounds. Every article you publish, every review you earn, every technical improvement you make, stays working for you.

At Elevate Web & Marketing, we handle full SEO setup and ongoing strategy for businesses in Nigeria and internationally. If you want a clear picture of where your site currently stands and what it would take to rank for your target terms, book a free SEO audit.`,
  },
  {
    id: '21',
    slug: 'whatsapp-marketing-nigeria-small-business',
    title: 'WhatsApp Marketing for Small Businesses in Nigeria: The Complete Practical Guide',
    excerpt:
      "Nigeria has 90M+ WhatsApp users. Most businesses use it reactively. Here's how to use it as a structured marketing and sales system that actually grows revenue.",
    published_at: '2026-05-27T00:00:00.000Z',
    author: 'Elevate Team',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80',
    content: `Nigeria has over 90 million WhatsApp users. More than 91% of Nigerian social media users are on the platform. It is not one of many communication channels — for most Nigerians, it is the primary one. People use it to communicate with family, buy and sell goods, coordinate with colleagues, and discover businesses. It is the country's default messaging layer.

Most businesses use WhatsApp reactively. They respond when someone messages, and that's roughly where the strategy ends. The businesses winning with WhatsApp treat it as a structured marketing and sales channel — with a systematic approach to building contact lists, creating content, sending consistently, and converting conversations into transactions.

This guide covers that system from the ground up.

## Why WhatsApp Is Different From Every Other Channel

**Open rates.** WhatsApp messages are opened by approximately 98% of recipients. Email marketing averages around 20%. That difference is not marginal — it's the difference between being seen and being invisible.

**Trust and intimacy.** A WhatsApp message feels personal in a way that an email newsletter or a Facebook post doesn't. When a business sends a message on WhatsApp, it appears in the same thread as messages from the recipient's friends and family. That proximity carries significant weight in the buying decision.

**Zero friction.** Your customers are already on WhatsApp. There's no account to create, no app to download, no algorithm deciding whether your message gets shown. You send it; they receive it.

Businesses using WhatsApp systematically report 45% increases in customer engagement and 33% boosts in sales conversion rates compared to other channels. The platform access is there for every Nigerian business. The question is whether you're using it deliberately or not.

## WhatsApp Business vs. WhatsApp Business API: Which Do You Need?

**WhatsApp Business — free app**

Designed for small businesses with one phone number managed by one or two people. Features include:

- Business profile with name, category, description, address, hours, and website link
- Product and service catalogue
- Automated greeting and away messages
- Quick replies for common questions
- Labels for organising contacts by stage

This is the right starting point for most Nigerian small businesses. It's free, available on the device you probably already use, and significantly more capable than regular WhatsApp for business purposes.

**WhatsApp Business API**

Designed for larger businesses that need multiple agents responding from the same number, automated message flows, CRM integration, and detailed analytics. Requires a third-party service provider (Interakt, WATI, Respond.io, and others) and comes with monthly costs.

**Recommendation:** Start with the free WhatsApp Business app and use it properly before considering the API. Most small businesses in Nigeria never outgrow it.

## Setting Up WhatsApp Business Correctly

A professional setup takes under an hour and significantly changes how customers perceive your business:

- **Business profile:** Complete every field — business name consistent with your Google Business Profile, category, a description that explains what you do and who you serve, address or service area, hours, website URL.
- **Profile photo:** Your logo or a high-quality professional photo. Not a personal photo, not a low-resolution image.
- **Greeting message:** The first message someone receives when they contact you. Make it warm, specific, and action-oriented: "Hi! Thanks for reaching out to [Your Business]. We help [target customer] with [service]. What can we help you with today?" is far more effective than a generic hello.
- **Away message:** Acknowledge after-hours messages, set a clear expectation for when you'll reply, and consider including a link to your website or FAQ page.
- **Quick replies:** Save your answers to the five most common questions — pricing, availability, how you work, turnaround time, payment options. Quick replies let you send detailed, professional answers in seconds.

## Groups vs. Broadcast Lists vs. Channels: Use the Right Tool

Most businesses use only one of these three features and miss the specific advantages of the others.

**WhatsApp Groups:** Everyone in the group can see and reply to everyone else. Good for project coordination with a specific client, community building around your brand, event management. Not suitable for mass marketing — the noise of multiple people replying makes it unmanageable at scale, and people leave groups they find irrelevant.

**Broadcast Lists:** You send a message to a saved list; each recipient receives it as a personal message in their individual chat with you. They must have your number saved in their contacts. This is the most powerful tool for marketing on WhatsApp. Use it for product or service announcements, time-limited offers, follow-ups with prospects, and re-engaging dormant customers.

**WhatsApp Channels:** A one-way feed that followers can subscribe to without saving your number. Good for brand building, announcements, and reaching people who aren't yet in your contact list. Not suitable for direct sales conversations — there's no two-way communication.

**Simple rule:** Broadcast lists for marketing and selling. Channels for awareness and reach. Groups for collaboration and community.

## Building a Broadcast List That Works

A broadcast list is only as valuable as the quality of contacts on it. These must be people who have saved your number — required for broadcast messages to be received — and have an existing relationship with your business.

**Build your list organically:**

- Include your WhatsApp number prominently on your website, business cards, receipts, and invoices
- Ask customers to save your number after every transaction: "Save this number — we send exclusive updates and offers to our WhatsApp contacts"
- Use a QR code at your physical location or on printed materials that opens a WhatsApp chat directly
- Run a simple opt-in: "Save our number and send 'YES' to receive [a discount, a useful guide, early access]"

**Send the right cadence:** Once or twice a week maximum for promotional messages. More than this and people start blocking you. Consistency matters more than frequency — one valuable message a week is better than five irrelevant ones.

**Segment where possible:** Separate existing customers from prospects. If your business has distinct product or service categories, separate lists for each improve relevance and results.

## What to Send and What Never to Send

**What works:**

- New product or service announcements with a single, clear call to action
- Limited-time offers with a genuine deadline — artificial urgency gets recognised quickly
- Useful content your audience actually values: tips, guides, relevant information
- Follow-ups on quotes or enquiries that went quiet
- Review requests from satisfied customers, with a direct link
- Personalised check-ins after a period of inactivity

**What gets you blocked:**

- Daily messages with no clear value to the recipient
- Content completely unrelated to why the person originally contacted you
- The same message sent week after week with no variation
- Long, unformatted walls of text
- Promotional messages with no genuine offer or benefit

**Format:** Keep messages conversational. Short paragraphs or bullet points. One clear call to action. A relevant image or short video if it adds value. Emoji are normal in Nigerian messaging culture and make messages feel less formal — use them in moderation.

## WhatsApp and Your Website Working Together

WhatsApp should not exist separately from your website — it should be built into the customer journey your site creates.

- **Click-to-chat button on every page.** Not just the contact page. Everywhere a visitor might have a question or be ready to enquire. Use the wa.me link with a pre-filled message so they don't have to type anything: "Hi, I'm interested in your [service]."
- **Follow up website enquiries via WhatsApp within the hour.** Response rate is dramatically higher than email follow-up, and it starts a real conversation rather than an exchange of formal messages.
- **WhatsApp for post-sale communication.** Project status updates, delivery notifications, review requests — all of this is more effective via WhatsApp than email for Nigerian customers, and it deepens the relationship after the sale.

## Tracking Results Without Complicated Tools

You don't need analytics software to measure WhatsApp performance as a small business. Track these manually:

- How many new leads arrived via WhatsApp this month vs. last month
- Which broadcast messages received replies, questions, or direct purchases — note this in a simple spreadsheet
- Use WhatsApp Business labels consistently: New Lead, Quoted, Awaiting Response, Customer, Inactive — then review your pipeline every week

The businesses that grow through WhatsApp are the ones who treat it as a system, not a chat app. Build the list. Send consistently. Follow up promptly. Measure what's working.

At Elevate Web & Marketing, we build websites with WhatsApp integration designed to convert — click-to-chat buttons, pre-filled message flows, and contact pages optimised for how Nigerian customers actually behave. If you want a site that works with your customers where they already are, book a free strategy call.`,
  },
];

// ---------------------------------------------------------------------------
// Map to the camelCase shape that blog.json uses (publishedAt, not published_at)
// ---------------------------------------------------------------------------

interface BlogJsonPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  image: string | null;
}

function toBlogJson(p: Post): BlogJsonPost {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    publishedAt: p.published_at,
    author: p.author,
    image: p.image,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const blogJsonPath = path.join(process.cwd(), 'data', 'blog.json');

  // ── Update blog.json ──────────────────────────────────────────────────────
  const raw = fs.readFileSync(blogJsonPath, 'utf-8');
  const currentPosts: BlogJsonPost[] = JSON.parse(raw);
  const existingIds = new Set(currentPosts.map((p) => p.id));
  const postsToAdd = newPosts.filter((p) => !existingIds.has(p.id));

  if (postsToAdd.length > 0) {
    const newJson = postsToAdd.map(toBlogJson);
    const merged = [
      ...newJson,
      ...currentPosts.filter((p) => !newPosts.some((n) => n.id === p.id)),
    ];
    merged.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
    fs.writeFileSync(blogJsonPath, JSON.stringify(merged, null, 2), 'utf-8');
    console.log(`✓ Added ${postsToAdd.length} new post(s) to data/blog.json`);
  } else {
    console.log('ℹ All posts already in data/blog.json — skipping file update.');
  }

  // ── Push to Supabase ──────────────────────────────────────────────────────
  if (!supabase) {
    console.warn(
      '\n⚠ Supabase not configured — skipping Supabase upsert.\n  Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local',
    );
    return;
  }

  console.log('\nUpserting posts to Supabase...');
  for (const post of newPosts) {
    const row = {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      published_at: post.published_at,
      author: post.author,
      image: post.image,
    };
    const { error } = await supabase
      .from('blog_posts')
      .upsert(row, { onConflict: 'id' });
    if (error) {
      console.error(`  ✗ ${post.id}: ${error.message}`);
    } else {
      console.log(`  ✓ ${post.id}: ${post.title}`);
    }
  }

  console.log('\nDone. Run "npm run dev" and visit /blog to verify all posts appear.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
