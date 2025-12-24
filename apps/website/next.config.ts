import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import { config } from "dotenv";
import { resolve } from "path";
import { existsSync } from "fs";

// CRITICAL: Load environment-specific files BEFORE Next.js loads .env.local
// This ensures NEXT_PUBLIC_ variables are set correctly
// Next.js loads .env.local automatically, so we need to override it early

const projectRoot = process.cwd();

// Load .env.test.local FIRST if APP_ENV is test (highest priority)
if (
  process.env.APP_ENV === "test" ||
  process.env.NEXT_PUBLIC_APP_ENV === "test"
) {
  const envTestLocal = resolve(projectRoot, ".env.test.local");

  if (existsSync(envTestLocal)) {
    // Load with override: true to ensure test vars take precedence
    config({ path: envTestLocal, override: true });
    console.log(
      "[Next.js Config] ✅ Loaded .env.test.local for test environment (overriding all other env files)",
    );

    // Also set NEXT_PUBLIC_APP_ENV to ensure it's available
    if (!process.env.NEXT_PUBLIC_APP_ENV) {
      process.env.NEXT_PUBLIC_APP_ENV = "test";
    }
  }
}

// Load .env.dev.local if APP_ENV is development
if (
  process.env.APP_ENV === "development" ||
  process.env.NEXT_PUBLIC_APP_ENV === "development"
) {
  const envDevLocal = resolve(projectRoot, ".env.dev.local");

  if (existsSync(envDevLocal)) {
    config({ path: envDevLocal, override: true });
    console.log(
      "[Next.js Config] ✅ Loaded .env.dev.local for development environment (overriding .env.local)",
    );

    // Also set NEXT_PUBLIC_APP_ENV to ensure it's available
    if (!process.env.NEXT_PUBLIC_APP_ENV) {
      process.env.NEXT_PUBLIC_APP_ENV = "development";
    }
  }
}

const nextConfig: NextConfig = {
  // CRITICAL: Tell Next.js to look in src/app, not app/
  // In Nx monorepos with sourceRoot, Next.js needs explicit path
  // This ensures Next.js finds pages in apps/website/src/app/

  // Turbopack configuration
  turbopack: {},

  // Skip static generation for problematic pages
  trailingSlash: false,

  // Disable automatic error page generation
  generateEtags: false,

  // Only use standalone output in production (for Docker deployments)
  // This breaks development routing, so we disable it in dev
  // CRITICAL: output: "standalone" causes all routes to return 404 in development
  // Removed completely - only enable for production builds, not dev server

  // Skip prerendering for error pages
  excludeDefaultMomentLocales: true,

  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["@heroicons/react", "lucide-react"],
    // Note: Turbopack is enabled via command line flag (--turbopack), not config
    // Removing turbo config as it's not valid in Next.js 16
  },

  // External packages for server components
  serverExternalPackages: [],

  // Disable automatic error page generation
  pageExtensions: ["tsx", "ts", "jsx", "js"],

  // Skip error page generation
  skipTrailingSlashRedirect: true,

  // Force dynamic rendering for all pages to avoid prerendering issues
  poweredByHeader: false,

  // Disable automatic error page generation
  generateBuildId: () => "build",

  // Disable automatic error page generation
  distDir: ".next",

  // Disable automatic error page generation
  reactStrictMode: false,

  // Transpile Firebase packages for better compatibility
  transpilePackages: ["firebase", "firebase-admin"],

  // Image optimization
  images: {
    // Enable image optimization
    unoptimized: false,
    // Configure image domains for external images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.icons8.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "process.fs.teachablecdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.filepicker.io",
        port: "",
        pathname: "/**",
      },
    ],
    // Image quality settings
    formats: ["image/webp", "image/avif"],
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
    // Ignore storybook files
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.stories\.(tsx?|jsx?)$/,
      use: "null-loader",
    });
    // Exclude scripts directory from build
    config.module.rules.push({
      test: /\.ts$/,
      include: /src\/scripts/,
      use: "ignore-loader",
    });

    // Monaco Editor webpack configuration
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@monaco-editor/react": "@monaco-editor/react",
      };

      // Ignore Monaco Editor on server side
      config.plugins = config.plugins || [];
    }

    // Memory-efficient webpack configuration for development
    if (dev) {
      // Reduce memory usage in development
      config.cache = {
        type: "filesystem",
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
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
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
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
              "font-src 'self' data: https://cdn.jsdelivr.net",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://cdn.jsdelivr.net",
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

// Wrap Next.js config with Sentry
const sentryNextConfig = withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source file uploading in dev mode
  silent: !process.env.SENTRY_DEBUG,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only upload source maps in production
  widenClientFileUpload: true,
  sourcemaps: {
    // Delete source maps after upload for security
    deleteSourcemapsAfterUpload: true,
  },
  disableLogger: true,
  automaticVercelMonitors: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  tunnelRoute: "/monitoring",
});

export default sentryNextConfig;
