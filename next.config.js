/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // Static HTML export for shared hosting
  trailingSlash: true,   // Ensures /about/ style URLs work on shared hosts
  images: {
    unoptimized: true,   // Required for static export (no Next.js image server)
  },
};

module.exports = nextConfig;
