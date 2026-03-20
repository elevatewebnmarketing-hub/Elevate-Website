# Elevate Web & Marketing

A modern, premium web design agency website built with Next.js, Tailwind CSS, and Framer Motion. Includes a blog section and admin dashboard for managing blog posts, testimonials, and portfolio items.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Ensure the logo is in `public/logo.png`. If not, copy your logo file to that location.

3. (Optional) Create `.env.local` and set your admin password for local dev:

```
ADMIN_PASSWORD=your-secure-password
```

Default admin password is `elevate2024` if not set (local only).

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Locally, data is read from `data/*.json` files.

### Admin Dashboard

Access at [http://localhost:3000/admin](http://localhost:3000/admin). Use your admin password to sign in.

- **Blog** – Create, edit, and delete blog posts
- **Testimonials** – Manage client reviews  
- **Portfolio** – Add and edit portfolio projects

### Production / Vercel Deployment

1. **Required env vars**
   - `ADMIN_PASSWORD` – strong password (required in production)
   - `SESSION_SECRET` – random string (32+ chars, required in production)
   - `NEXT_PUBLIC_SUPABASE_URL` – your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` – Supabase service role key (Settings → API)

2. **Supabase setup**
   - Create a project at [supabase.com/dashboard](https://supabase.com/dashboard)
   - In SQL Editor: run `supabase/schema.sql`
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to Vercel env vars
   - Run `npm run db:seed` locally (with Supabase env vars in `.env.local`) to migrate existing data from `data/*.json` into Supabase

3. **Optional**
   - `RESEND_API_KEY`, `RESEND_FROM_EMAIL` – contact form

4. **Keep Supabase awake (free tier)**  
   Supabase projects pause after ~7 days of inactivity. Use [UptimeRobot](https://uptimerobot.com) to ping your site every 5 minutes. See [docs/UPTIMEROBOT.md](docs/UPTIMEROBOT.md) for step-by-step setup.
