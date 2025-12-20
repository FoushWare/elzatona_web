/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const WEBSITE_SRC = path.join(__dirname, "../../../apps/website/src");
const WEBSITE_ROOT = path.join(__dirname, "../../../apps/website");
const ADMIN_SRC = path.join(__dirname, "../../../apps/admin/src");
const ADMIN_ROOT = path.join(__dirname, "../../../apps/admin");

// Directories/files to move from src/ to root (excluding app/)
const ITEMS_TO_MOVE = [
  "lib",
  "context",
  "components",
  "providers",
  "types",
  "test-utils",
  "translations",
  "utils",
  "config",
  "pages",
  "middleware.ts",
  "admin.config.ts",
  "app.test.tsx",
];

function moveItem(srcPath, destPath, itemName) {
  if (!fs.existsSync(srcPath)) {
    console.log(`⚠️  Skipping ${itemName} - doesn't exist`);
    return false;
  }

  // If destination exists, merge directories or skip files
  if (fs.existsSync(destPath)) {
    const srcStat = fs.statSync(srcPath);
    const destStat = fs.statSync(destPath);

    if (srcStat.isDirectory() && destStat.isDirectory()) {
      console.log(`⚠️  ${itemName} exists, merging...`);
      // Merge directories - copy files that don't exist
      const srcFiles = fs.readdirSync(srcPath);
      for (const file of srcFiles) {
        const srcFile = path.join(srcPath, file);
        const destFile = path.join(destPath, file);
        if (!fs.existsSync(destFile)) {
          fs.copyFileSync(srcFile, destFile);
          console.log(`  ✅ Copied ${file}`);
        } else {
          console.log(`  ⚠️  Skipped ${file} - already exists`);
        }
      }
      return true;
    } else if (srcStat.isFile() && destStat.isFile()) {
      console.log(`⚠️  ${itemName} exists, skipping...`);
      return false;
    }
  }

  // Move the item
  fs.renameSync(srcPath, destPath);
  console.log(`✅ Moved ${itemName}`);
  return true;
}

function processApp(appName, srcDir, rootDir) {
  console.log(`\n📦 Processing ${appName}...`);
  console.log("=".repeat(50));

  let movedCount = 0;
  let skippedCount = 0;

  for (const item of ITEMS_TO_MOVE) {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(rootDir, item);

    if (moveItem(srcPath, destPath, item)) {
      movedCount++;
    } else {
      skippedCount++;
    }
  }

  console.log(`\n✅ ${appName}: Moved ${movedCount}, Skipped ${skippedCount}`);
}

// Process both apps
console.log("🚀 Moving files from src/ to root...\n");
processApp("website", WEBSITE_SRC, WEBSITE_ROOT);
processApp("admin", ADMIN_SRC, ADMIN_ROOT);
console.log("\n✅ Migration complete!");
