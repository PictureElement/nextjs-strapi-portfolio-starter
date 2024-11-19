/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // Default Strapi port for local development
        pathname: '/uploads/**', // Adjust to match your local Strapi image URL
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'msof.me',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
