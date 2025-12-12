/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const APPS_DIR = path.join(__dirname, "../../../apps");

/**
 * Find source file for a test file
 */
function findSourceFile(testFilePath) {
  const testFileName = path.basename(testFilePath);
  const testDir = path.dirname(testFilePath);

  // Remove test extensions
  const sourceFileName = testFileName
    .replace(/\.test\.(tsx?|jsx?)$/, ".$1")
    .replace(/\.spec\.(tsx?|jsx?)$/, ".$1")
    .replace(/\.integration\.test\.(tsx?|jsx?)$/, ".$1");

  // Try same directory
  const sameDir = path.join(testDir, sourceFileName);
  if (fs.existsSync(sameDir)) {
    return sameDir;
  }

  // Try parent directory (for page-components/admin/content/page.test.tsx -> page.tsx)
  const parentDir = path.dirname(testDir);
  const parentFile = path.join(parentDir, sourceFileName);
  if (fs.existsSync(parentFile)) {
    return parentFile;
  }

  // Try src/app equivalent (for page-components -> src/app)
  if (testDir.includes("page-components")) {
    const srcAppPath = testDir.replace("page-components", "src/app");
    const srcAppFile = path.join(srcAppPath, sourceFileName);
    if (fs.existsSync(srcAppFile)) {
      return srcAppFile;
    }
  }

  return null;
}

/**
 * Move test file to be co-located with source
 */
function moveTestToSource(testFilePath, sourceFilePath) {
  if (!sourceFilePath) {
    console.log(`⚠️  No source found for ${testFilePath}, removing...`);
    fs.unlinkSync(testFilePath);
    return false;
  }

  const sourceDir = path.dirname(sourceFilePath);
  const testFileName = path.basename(testFilePath);
  const destPath = path.join(sourceDir, testFileName);

  // If already in correct location, skip
  if (testFilePath === destPath) {
    return false;
  }

  // If destination exists, skip
  if (fs.existsSync(destPath)) {
    console.log(
      `⚠️  Test already exists at ${destPath}, removing duplicate...`,
    );
    fs.unlinkSync(testFilePath);
    return false;
  }

  // Create directory if needed
  if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(sourceDir, { recursive: true });
  }

  // Move the file
  fs.renameSync(testFilePath, destPath);
  console.log(`✅ Moved ${testFilePath} -> ${destPath}`);
  return true;
}

/**
 * Process directory
 */
function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let movedCount = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip build/cache directories
    if (
      entry.name.startsWith(".") ||
      entry.name === "node_modules" ||
      entry.name === ".next" ||
      entry.name === "dist" ||
      entry.name === "build" ||
      entry.name === "coverage"
    ) {
      continue;
    }

    if (entry.isDirectory()) {
      movedCount += processDirectory(fullPath);
    } else if (entry.isFile()) {
      if (/\.(test|spec)\.(tsx?|jsx?)$/.test(entry.name)) {
        const sourceFile = findSourceFile(fullPath);
        if (moveTestToSource(fullPath, sourceFile)) {
          movedCount++;
        }
      }
    }
  }

  return movedCount;
}

console.log("🔧 Fixing orphaned test files...\n");
const moved = processDirectory(APPS_DIR);
console.log(
  `\n✅ Moved ${moved} test files to be co-located with their source files`,
);
