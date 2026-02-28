/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  transpilePackages: [
    "ui",
    "auth",
    "database",
    "utils",
    "@elzatona/common-ui",
    "@elzatona/contexts",
    "@elzatona/hooks",
    "@elzatona/shared-atoms",
    "@elzatona/types",
    "nuqs",
  ],
  experimental: {
    forceSwcTransforms: true,
  },
  // Configure assets to be requested with /admin prefix for proxy compatibility
  assetPrefix: "/admin",
  // Configure build to handle error pages
  generateBuildId: async () => {
    // Use a static build ID to ensure consistent builds
    return "admin-build";
  },
};

module.exports = nextConfig;
