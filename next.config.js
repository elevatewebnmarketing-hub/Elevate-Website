/** @type {import('next').NextConfig} */
const nextConfig = {
  // Make sure Next.js and Turbopack use this folder as the root
  turbopack: {
    root: __dirname,
  },
  // Fix output file tracing for production `next start`
  outputFileTracingRoot: __dirname,
  images: {
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
