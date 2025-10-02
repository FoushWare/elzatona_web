import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Nx and Vercel compatibility
  distDir: '.next',

  // Output configuration for single domain deployment (only for production)
  ...(process.env.NODE_ENV === 'production' && { output: 'standalone' }),

  // Base path configuration (if needed for subdirectory deployment)
  // basePath: '', // Keep empty for root domain deployment

  // Asset prefix for CDN (optional)
  // assetPrefix: 'https://elzatona-web.com',

  // ESLint configuration - temporarily disable during builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', 'lucide-react'],
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['elzatona-web.com'], // Allow images from your domain
  },

  // Compression
  compress: true,

  // Rewrites for admin routing (unified app approach)
  async rewrites() {
    return [
      // Admin routes - serve admin pages under /admin path
      {
        source: '/admin/:path*',
        destination: '/admin/:path*', // This will be handled by your admin pages
      },
      // API routes - ensure they work for both web and admin
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  // Redirects for better UX
  async redirects() {
    return [
      // Redirect /admin to /admin/dashboard (or your preferred admin landing page)
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: false,
      },
    ];
  },

  // Headers for performance and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      // Admin-specific headers
      {
        source: '/admin/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow', // Prevent admin pages from being indexed
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate', // Prevent caching of admin pages
          },
        ],
      },
    ];
  },

  // Bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          admin: {
            test: /[\\/]app[\\/]admin[\\/]/,
            name: 'admin',
            chunks: 'all',
            enforce: true,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
