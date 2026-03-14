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

3. (Optional) Create `.env.local` and set your admin password:

```
ADMIN_PASSWORD=your-secure-password
```

Default admin password is `elevate2024` if not set.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Dashboard

Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin). Use your admin password to sign in. From the dashboard you can:

- **Blog** – Create, edit, and delete blog posts (markdown supported)
- **Testimonials** – Manage client reviews
- **Portfolio** – Add and edit portfolio projects

### Production

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Set `ADMIN_PASSWORD` in your production environment for secure admin access.
