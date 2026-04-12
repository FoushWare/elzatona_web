/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,
  },
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

  // Multi-zone: the admin app is served at /admin on elzatona-web.com.
  // Setting assetPrefix ensures the HTML it produces references
  // /admin/_next/static/… instead of /_next/static/…, so Vercel's
  // path-based routing sends those asset requests to THIS deployment
  // rather than the main website deployment.
  assetPrefix: process.env.NODE_ENV === "production" ? "/admin" : "",

  async rewrites() {
    // Allow the admin deployment itself to serve the /admin/_next/* paths
    // that the browser requests due to the assetPrefix above.
    return [
      {
        source: "/admin/_next/:path*",
        destination: "/_next/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
