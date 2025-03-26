/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export
  images: {
    domains: ["cdn.sanity.io"],
    unoptimized: true // Required for static exports
  },
  // Optional: For trailing slash URLs (helps with cPanel routing)
  trailingSlash: true,
  // Optional: For SPA-like behavior with client-side routing
  skipTrailingSlashRedirect: true
};

module.exports = nextConfig;