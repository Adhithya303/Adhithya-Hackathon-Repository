/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow static HTML in public/ to coexist with API routes
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index.html',
      },
    ];
  },
};

export default nextConfig;
