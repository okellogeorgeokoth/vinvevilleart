/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io", "iili.io"], // Added "iili.io" to the allowed domains
  },
};

module.exports = nextConfig;
