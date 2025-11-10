import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ESLint configuration - temporarily disable during builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', 'lucide-react'],
    // Enable Turbopack for faster, more memory-efficient builds
    turbo: {
      // Reduce memory usage by limiting cache size
      resolveAlias: {
        // Optimize imports
      },
    },
  },

  // Transpile Firebase packages for better compatibility
  transpilePackages: ['firebase', 'firebase-admin'],

  // Image optimization
  images: {
    // Enable image optimization
    unoptimized: false,
    // Configure image domains for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'process.fs.teachablecdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.filepicker.io',
        port: '',
        pathname: '/**',
      },
    ],
    // Image quality settings
    formats: ['image/webp', 'image/avif'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum cache TTL
    minimumCacheTTL: 60,
    // Disable static image imports
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression
  compress: true,

  // Bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Exclude scripts directory from build
    config.module.rules.push({
      test: /\.ts$/,
      include: /src\/scripts/,
      use: 'ignore-loader',
    });

    // Memory-efficient webpack configuration for development
    if (dev) {
      // Reduce memory usage in development
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        // Limit cache size to reduce memory footprint
        maxMemoryGenerations: 1,
      };
      
      // Reduce parallelism to save memory
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }

    // Optimize bundle size for production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
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

  // Headers for performance
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
    ];
  },
};

export default nextConfig;
