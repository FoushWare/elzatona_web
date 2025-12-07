#!/usr/bin/env node

/**
 * Create Next.js page wrappers that import from pages/ directory
 * This maintains Next.js routing while using the new structure
 */

const fs = require("fs");
const path = require("path");

const WEBSITE_APP = path.join(__dirname, "../../../apps/website/src/app");
const WEBSITE_PAGES = path.join(__dirname, "../../../apps/website/pages");
const ADMIN_APP = path.join(__dirname, "../../../apps/admin/src/app");
const ADMIN_PAGES = path.join(__dirname, "../../../apps/admin/pages");

function createPageWrapper(appDir, pagesDir, relativePath) {
  const pagePath = path.join(appDir, relativePath, "page.tsx");
  const sourcePagePath = path.join(pagesDir, relativePath, "page.tsx");

  if (!fs.existsSync(sourcePagePath)) {
    return; // No source page to wrap
  }

  // Calculate relative import path
  const pageDir = path.dirname(pagePath);
  const importPath = path.relative(pageDir, sourcePagePath).replace(/\\/g, "/");

  // Remove .tsx extension for import
  const importPathWithoutExt = importPath.replace(/\.tsx$/, "");

  const wrapperContent = `// Next.js page wrapper - imports from pages/ directory
// This file maintains Next.js routing structure
// Source: ${sourcePagePath}

export { default } from "${importPathWithoutExt}";
`;

  // Ensure directory exists
  const pageDirPath = path.dirname(pagePath);
  if (!fs.existsSync(pageDirPath)) {
    fs.mkdirSync(pageDirPath, { recursive: true });
  }

  fs.writeFileSync(pagePath, wrapperContent);
  console.log(`Created wrapper: ${pagePath}`);
}

function processPages(appDir, pagesDir, appName) {
  if (!fs.existsSync(pagesDir)) {
    console.log(`No pages directory found for ${appName}`);
    return;
  }

  function walkDir(dir, relativePath = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const newRelativePath = path.join(relativePath, entry.name).replace(/\\/g, "/");

      if (entry.isDirectory()) {
        walkDir(fullPath, newRelativePath);
      } else if (entry.name === "page.tsx") {
        createPageWrapper(appDir, pagesDir, relativePath);
      }
    }
  }

  walkDir(pagesDir);
}

console.log("Creating Next.js page wrappers...\n");

// Process website pages
console.log("Processing website pages...");
processPages(WEBSITE_APP, WEBSITE_PAGES, "website");

// Process admin pages
console.log("\nProcessing admin pages...");
processPages(ADMIN_APP, ADMIN_PAGES, "admin");

console.log("\n✅ Page wrapper generation complete!");

