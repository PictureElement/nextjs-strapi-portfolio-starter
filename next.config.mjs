/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
