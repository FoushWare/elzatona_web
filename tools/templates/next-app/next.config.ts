import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', 'lucide-react'],
  },

  // Transpile packages for better compatibility
  transpilePackages: ['@supabase/supabase-js'],

  // Image optimization
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Output configuration
  output: 'standalone',
};

export default nextConfig;
