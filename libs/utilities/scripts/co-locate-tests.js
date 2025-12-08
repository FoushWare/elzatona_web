const fs = require("fs");
const path = require("path");

const APPS_DIR = path.join(__dirname, "../../../apps");

/**
 * Find the corresponding source file for a test file
 */
function findSourceFile(testFilePath) {
  const testFileName = path.basename(testFilePath);
  
  // Remove test extensions (.test.tsx, .test.ts, .spec.tsx, .spec.ts)
  const sourceFileName = testFileName
    .replace(/\.test\.(tsx?|jsx?)$/, ".$1")
    .replace(/\.spec\.(tsx?|jsx?)$/, ".$1")
    .replace(/\.integration\.test\.(tsx?|jsx?)$/, ".$1");
  
  // Try same directory first
  const sameDir = path.join(path.dirname(testFilePath), sourceFileName);
  if (fs.existsSync(sameDir)) {
    return sameDir;
  }
  
  // Try parent directory (for __tests__/Component.test.tsx -> Component.tsx)
  const parentDir = path.join(path.dirname(path.dirname(testFilePath)), sourceFileName);
  if (fs.existsSync(parentDir)) {
    return parentDir;
  }
  
  return null;
}

/**
 * Move test file to be co-located with source file
 */
function moveTestFile(testFilePath, sourceFilePath) {
  if (!sourceFilePath) {
    console.log(`⚠️  No source file found for ${testFilePath}, skipping...`);
    return false;
  }
  
  const sourceDir = path.dirname(sourceFilePath);
  const testFileName = path.basename(testFilePath);
  const destPath = path.join(sourceDir, testFileName);
  
  // If test already exists in destination, skip
  if (fs.existsSync(destPath)) {
    console.log(`⚠️  Test already exists at ${destPath}, skipping...`);
    return false;
  }
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(sourceDir, { recursive: true });
  }
  
  // Move the file
  fs.renameSync(testFilePath, destPath);
  console.log(`✅ Moved ${testFilePath} -> ${destPath}`);
  return true;
}

/**
 * Process a directory recursively
 */
function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let movedCount = 0;
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    // Skip node_modules, .next, dist, etc.
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
      // Skip test directories - we'll handle them separately
      if (entry.name === "test" || entry.name === "test-results" || entry.name === "__tests__") {
        // Process files in test directory
        const testFiles = fs.readdirSync(fullPath, { withFileTypes: true });
        for (const testFile of testFiles) {
          if (testFile.isFile() && /\.(test|spec)\.(tsx?|jsx?)$/.test(testFile.name)) {
            const testFilePath = path.join(fullPath, testFile.name);
            const sourceFile = findSourceFile(testFilePath);
            if (moveTestFile(testFilePath, sourceFile)) {
              movedCount++;
            }
          }
        }
      } else {
        movedCount += processDirectory(fullPath);
      }
    } else if (entry.isFile()) {
      // Check if this is a test file in a test directory
      if (/\.(test|spec)\.(tsx?|jsx?)$/.test(entry.name)) {
        const parentDir = path.basename(path.dirname(fullPath));
        if (parentDir === "test" || parentDir === "test-results" || parentDir === "__tests__") {
          const sourceFile = findSourceFile(fullPath);
          if (moveTestFile(fullPath, sourceFile)) {
            movedCount++;
          }
        }
      }
    }
  }
  
  return movedCount;
}

/**
 * Remove empty test directories
 */
function removeEmptyTestDirs(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let removedCount = 0;
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (entry.name === "test" || entry.name === "test-results" || entry.name === "__tests__") {
        // Check if directory is empty
        const contents = fs.readdirSync(fullPath);
        if (contents.length === 0) {
          fs.rmdirSync(fullPath);
          console.log(`🗑️  Removed empty directory: ${fullPath}`);
          removedCount++;
        } else {
          console.log(`⚠️  Directory not empty, keeping: ${fullPath} (${contents.length} items)`);
        }
      } else {
        removedCount += removeEmptyTestDirs(fullPath);
      }
    }
  }
  
  return removedCount;
}

console.log("🧪 Co-locating test files...\n");

// Process both apps
console.log("Processing apps/website...");
const websiteMoved = processDirectory(path.join(APPS_DIR, "website"));
console.log(`✅ Moved ${websiteMoved} test files in website\n`);

console.log("Processing apps/admin...");
const adminMoved = processDirectory(path.join(APPS_DIR, "admin"));
console.log(`✅ Moved ${adminMoved} test files in admin\n`);

// Remove empty test directories
console.log("\n🗑️  Removing empty test directories...");
const websiteRemoved = removeEmptyTestDirs(path.join(APPS_DIR, "website"));
const adminRemoved = removeEmptyTestDirs(path.join(APPS_DIR, "admin"));
console.log(`✅ Removed ${websiteRemoved + adminRemoved} empty test directories\n`);

console.log(`\n✅ Complete! Moved ${websiteMoved + adminMoved} test files, removed ${websiteRemoved + adminRemoved} empty directories`);

