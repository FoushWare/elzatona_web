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
  // Configure build to handle error pages
  generateBuildId: async () => {
    // Use a static build ID to ensure consistent builds
    return "admin-build";
  },
  // Explicitly tell Next.js to only use pages directory (Pages Router)
  // This prevents Next.js from detecting src/app or src/layouts as an app directory
  // The admin app uses Pages Router, not App Router
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  // CRITICAL: Ensure Next.js only uses Pages Router
  // This configuration prevents Next.js from scanning for app/ directories
  // which would cause the "pages and app directories should be under the same folder" error
  // The src/layouts/ directory is NOT an app directory - it's just for shared layouts
};

module.exports = nextConfig;
