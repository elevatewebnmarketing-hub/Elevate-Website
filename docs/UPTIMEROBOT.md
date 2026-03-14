# UptimeRobot – Keep Supabase from Pausing

Supabase free-tier projects pause after ~7 days of inactivity. UptimeRobot pings your site regularly so your backend stays awake.

---

## Step 1: Create an account

1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Sign up (free)

---

## Step 2: Add a new monitor

1. Click **Add New Monitor**
2. Set:
   - **Monitor Type:** `HTTP(s)`
   - **Friendly Name:** e.g. `Elevate Website` or `My Site Keep-Alive`
   - **URL:** your site, e.g. `https://www.elevatewebandmarketing.com` or `https://your-vercel-url.vercel.app`
   - **Monitoring Interval:** `5` minutes (default on free plan; pick the shortest allowed)

---

## Step 3: (Optional) Use an API endpoint instead

For a lighter check (e.g. only wake Supabase without full page load):

1. Use this URL: `https://www.elevatewebandmarketing.com/api/blog`
2. This hits your blog API, which reads from Supabase and keeps it active

---

## Step 4: Save

1. Click **Create Monitor**
2. UptimeRobot will start pinging every few minutes

---

## What this does

- Sends an HTTP request to your URL on a schedule
- Keeps Supabase from pausing your project
- Sends alert emails if your site goes down (optional)

---

## Notes

- Free tier usually allows 50 monitors and 5‑minute checks
- Don’t set the interval below 5 minutes on the free plan
- After creating the monitor, give Supabase a few minutes before the first ping if it was paused
