/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: new URL(process.env.NEXT_PUBLIC_STRAPI).protocol.replace(':', ''),
        hostname: new URL(process.env.NEXT_PUBLIC_STRAPI).hostname,
        port: new URL(process.env.NEXT_PUBLIC_STRAPI).port || '',
        pathname: '/uploads/**',
      },
      // Hetzner S3 Object Storage domain here
      {
        protocol: 'https',
        hostname: 'fsn1.your-objectstorage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
