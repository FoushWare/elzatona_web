#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Comprehensive TypeScript Path Fixer
 * Fixes all incorrect relative import paths in network/routes files
 */

const fs = require("fs");
const path = require("path");

const WEBSITE_DIR = path.join(__dirname, "../../../apps/website");
const ROUTES_DIR = path.join(WEBSITE_DIR, "network/routes");

function getCorrectRelativePath(fromFile, toFile) {
  const fromDir = path.dirname(fromFile);
  const relative = path.relative(fromDir, toFile);
  let result = relative.replace(/\\/g, "/");

  // Remove .ts/.tsx extension
  result = result.replace(/\.tsx?$/, "");

  // Ensure it starts with ./
  if (!result.startsWith(".")) {
    result = "./" + result;
  }

  return result;
}

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return false;

  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  // Map of wrong patterns to correct target directories
  const wrongPatterns = [
    // Fix overly deep paths (6+ levels)
    {
      pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/(lib|types)\//g,
      getReplacement: (match, dir) => {
        const targetDir = path.join(WEBSITE_DIR, dir);
        return `from "${getCorrectRelativePath(filePath, targetDir)}/`;
      },
    },
    // Fix 5 levels
    {
      pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/(lib|types)\//g,
      getReplacement: (match, dir) => {
        const targetDir = path.join(WEBSITE_DIR, dir);
        return `from "${getCorrectRelativePath(filePath, targetDir)}/`;
      },
    },
    // Fix 4 levels (might be correct for some files, but let's recalculate)
    {
      pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/(lib|types)\//g,
      getReplacement: (match, dir) => {
        const targetDir = path.join(WEBSITE_DIR, dir);
        return `from "${getCorrectRelativePath(filePath, targetDir)}/`;
      },
    },
    // Fix 3 levels
    {
      pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/(lib|types)\//g,
      getReplacement: (match, dir) => {
        const targetDir = path.join(WEBSITE_DIR, dir);
        return `from "${getCorrectRelativePath(filePath, targetDir)}/`;
      },
    },
  ];

  wrongPatterns.forEach(({ pattern, getReplacement }) => {
    content = content.replace(pattern, (match, ...args) => {
      return getReplacement(match, ...args);
    });
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    return true;
  }

  return false;
}

function findFiles(dir) {
  const files = [];

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".ts") && !entry.name.includes(".test.")) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

function main() {
  console.log("🔧 Fixing TypeScript import paths in network/routes...\n");

  const files = findFiles(ROUTES_DIR);
  console.log(`📁 Found ${files.length} files to check\n`);

  let fixedCount = 0;
  files.forEach((file) => {
    if (fixFile(file)) {
      fixedCount++;
      const relativePath = path.relative(process.cwd(), file);
      console.log(`✅ Fixed: ${relativePath}`);
    }
  });

  console.log(`\n✅ Fixed ${fixedCount} files`);
}

if (require.main === module) {
  main();
}

module.exports = { fixFile, getCorrectRelativePath };
