/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/valentines-day',
  assetPrefix: '/valentines-day/',
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
