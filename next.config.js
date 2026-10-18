/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig = {
  async redirects() {
    return [
      // Merged into website-design (same search intent).
      { source: '/services/website-development', destination: '/services/website-design', permanent: true },
      // Replaced by the local SEO and Google Business Profile page.
      { source: '/services/seo', destination: '/services/local-seo', permanent: true },
      // Ads services retired on 17 Oct 2026: Elevate does websites, SEO, landing pages and care plans only.
      { source: '/services/google-ads', destination: '/services/local-seo', permanent: true },
      { source: '/meta-ads', destination: '/services/landing-pages', permanent: true },
      // Ads posts retired, and the duplicate of the new guide consolidated into it (18 Oct 2026).
      { source: '/blog/how-to-get-more-customers-from-your-website-nigeria', destination: '/how-to-get-more-customers', permanent: true },
      { source: '/blog/meta-ads-vs-google-ads-2026', destination: '/how-to-get-more-customers', permanent: true },
      { source: '/blog/facebook-instagram-meta-ads-growth-engine', destination: '/how-to-get-more-customers', permanent: true },
      { source: '/blog/why-your-business-isnt-showing-up-on-google-2026', destination: '/guides/why-your-website-isnt-on-google', permanent: true },
    ];
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // Hashed JS/CSS bundles are immutable — cache for 1 year
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // Public images and assets — cache for 7 days
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
      {
        // Fonts and other public static files — cache for 1 day
        source: '/:file(.*\\.(?:png|jpg|jpeg|svg|ico|webp|avif|woff|woff2|ttf|pdf))',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ];
  },
  // Make sure Next.js and Turbopack use this folder as the root
  turbopack: {
    root: __dirname,
  },
  // Fix output file tracing for production `next start`
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
