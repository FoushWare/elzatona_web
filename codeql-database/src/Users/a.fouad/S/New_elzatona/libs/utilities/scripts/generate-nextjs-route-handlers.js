#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Generate Next.js route handlers that import from network/routes/
 * This script creates route.ts files in src/app/api/ that re-export from network/routes/
 */

const fs = require("fs");
const path = require("path");

const WEBSITE_NETWORK_ROUTES = path.join(
  __dirname,
  "../../../apps/website/network/routes",
);
const WEBSITE_APP_API = path.join(
  __dirname,
  "../../../apps/website/src/app/api",
);
const ADMIN_NETWORK_ROUTES = path.join(
  __dirname,
  "../../../apps/admin/network/routes",
);
const ADMIN_APP_API = path.join(__dirname, "../../../apps/admin/src/app/api");

function generateRouteHandler(
  networkRoutePath,
  appApiPath,
  relativePath,
  _networkRoutesBase,
) {
  const routeHandlerPath = path.join(appApiPath, relativePath, "route.ts");

  // Calculate relative path from src/app/api to network/routes
  // e.g., from apps/website/src/app/api/questions/route.ts
  // to apps/website/network/routes/questions/route.ts
  // Result: ../../../network/routes/questions/route.ts
  const routeHandlerDir = path.dirname(routeHandlerPath);
  const networkRouteRelative = path
    .relative(routeHandlerDir, networkRoutePath)
    .replace(/\\/g, "/");

  // Ensure directory exists
  const routeDir = path.dirname(routeHandlerPath);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  // Remove .ts extension for TypeScript imports
  const importPath = networkRouteRelative.replace(/\.ts$/, "");

  const content = `// Auto-generated route handler
// This file imports from network/routes/ to maintain Next.js routing structure
// Source: ${networkRoutePath}

export * from '${importPath}';
`;

  fs.writeFileSync(routeHandlerPath, content);
  console.log(`Generated: ${routeHandlerPath}`);
}

function processRoutes(networkRoutesDir, appApiDir, appName) {
  if (!fs.existsSync(networkRoutesDir)) {
    console.log(`No network routes found for ${appName}`);
    return;
  }

  function walkDir(dir, relativePath = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const newRelativePath = path
        .join(relativePath, entry.name)
        .replace(/\\/g, "/");

      if (entry.isDirectory()) {
        walkDir(fullPath, newRelativePath);
      } else if (entry.name === "route.ts") {
        generateRouteHandler(
          fullPath,
          appApiDir,
          relativePath,
          networkRoutesDir,
        );
      }
    }
  }

  walkDir(networkRoutesDir);
}

console.log("Generating Next.js route handlers...\n");

// Generate website route handlers
console.log("Processing website routes...");
processRoutes(WEBSITE_NETWORK_ROUTES, WEBSITE_APP_API, "website");

// Generate admin route handlers
console.log("\nProcessing admin routes...");
processRoutes(ADMIN_NETWORK_ROUTES, ADMIN_APP_API, "admin");

console.log("\n✅ Route handler generation complete!");
console.log(
  "\nNote: You may need to update import paths in the generated handlers",
);
console.log(
  "if the relative paths from src/app/api to network/routes are incorrect.",
);
