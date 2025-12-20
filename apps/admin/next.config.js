/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  transpilePackages: [
    "ui",
    "auth",
    "database",
    "utils",
    "@elzatona/components",
    "@elzatona/contexts",
    "@elzatona/hooks",
    "@elzatona/shared-atoms",
    "@elzatona/types",
    "nuqs",
  ],
  // Configure build to handle error pages
  generateBuildId: async () => {
    // Use a static build ID to ensure consistent builds
    return "admin-build";
  },
  // Handle TypeScript compilation issues
  experimental: {
    forceSwcTransforms: true,
  },
  // Configure webpack to handle CSS type conflicts
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
