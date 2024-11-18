/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // Default Strapi port for local development
        pathname: '/uploads/**', // Adjust to match your local Strapi image URL
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'msof.me',
        port: '',
        pathname: '/storage/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
