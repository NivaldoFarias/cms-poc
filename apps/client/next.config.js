/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // * Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  typescript: {
    // ! WARN Dangerously allow production builds to successfully complete even if
    // ! your project has type errors.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
