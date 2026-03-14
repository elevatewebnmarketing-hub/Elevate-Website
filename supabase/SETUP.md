# Supabase Setup for Elevate Web & Marketing

## 1. Create a Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **New project**
3. Choose organization, name the project (e.g. `elevate-website`), set a database password
4. Wait for the project to be created

## 2. Run the schema

1. In the Supabase dashboard, open **SQL Editor**
2. Click **New query**
3. Copy the contents of `supabase/schema.sql` and paste
4. Click **Run**

## 3. Get your credentials

1. Go to **Project Settings** (gear icon) → **API**
2. Copy:
   - **Project URL** → use as `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** key (under "Project API keys") → use as `SUPABASE_SERVICE_ROLE_KEY`

   ⚠️ Never expose the `service_role` key on the client. It bypasses Row Level Security.

## 4. Add env vars

### Local (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

### Vercel

1. Project → **Settings** → **Environment Variables**
2. Add both variables (mark as Production / Preview as needed)

## 5. Seed initial data (one time)

If you have existing data in `data/blog.json`, `data/testimonials.json`, `data/portfolio.json`:

```bash
npm run db:seed
```

This imports all JSON data into Supabase. Run once after creating the tables.
