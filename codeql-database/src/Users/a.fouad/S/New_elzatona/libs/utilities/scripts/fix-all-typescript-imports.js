#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Comprehensive TypeScript Import Path Fixer
 * Fixes all @/ import paths to correct relative paths
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const PROJECT_ROOT = path.resolve(__dirname, "../../..");
const WEBSITE_DIR = path.join(PROJECT_ROOT, "apps/website");

function getRelativePath(fromFile, toFile) {
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

function fixImportsInFile(filePath) {
  if (!fs.existsSync(filePath)) return false;

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  let modified = false;

  // Map of @/ imports to actual file paths
  const importMap = {
    "@/admin.config": path.join(WEBSITE_DIR, "admin.config.ts"),
    "@/lib/supabase": path.join(WEBSITE_DIR, "lib/supabase.ts"),
    "@/lib/utils/api-config": path.join(WEBSITE_DIR, "lib/utils/api-config.ts"),
    "@/lib/utils/sanitize-server": path.join(
      WEBSITE_DIR,
      "lib/utils/sanitize-server.ts",
    ),
    "@/lib/utils/validation": path.join(WEBSITE_DIR, "lib/utils/validation.ts"),
    "@/lib/utils/environment": path.join(
      WEBSITE_DIR,
      "lib/utils/environment.ts",
    ),
    "@/lib/utils/test-env-loader": path.join(
      WEBSITE_DIR,
      "lib/utils/test-env-loader.ts",
    ),
    "@/lib/utils/sanitize": path.join(WEBSITE_DIR, "lib/utils/sanitize.tsx"),
    "@/lib/supabase-server": path.join(WEBSITE_DIR, "lib/supabase-server.ts"),
    "@/lib/supabase-client": path.join(WEBSITE_DIR, "lib/supabase-client.ts"),
    "@/lib/auth-config": path.join(WEBSITE_DIR, "lib/auth-config.ts"),
    "@/lib/user-auth": path.join(WEBSITE_DIR, "lib/user-auth.ts"),
    "@/lib/server-auth": path.join(WEBSITE_DIR, "lib/server-auth.ts"),
    "@/lib/unified-question-schema": path.join(
      WEBSITE_DIR,
      "lib/unified-question-schema.ts",
    ),
    "@/lib/auto-linking-service": path.join(
      WEBSITE_DIR,
      "lib/auto-linking-service.ts",
    ),
    "@/lib/section-service": path.join(WEBSITE_DIR, "lib/section-service.ts"),
    "@/lib/ai-validation-service": path.join(
      WEBSITE_DIR,
      "lib/ai-validation-service.ts",
    ),
    "@/lib/flashcards": path.join(WEBSITE_DIR, "lib/flashcards.ts"),
    "@/lib/cart": path.join(WEBSITE_DIR, "lib/cart.ts"),
    "@/lib/supabase-learning-cards-service": path.join(
      WEBSITE_DIR,
      "lib/supabase-learning-cards-service.ts",
    ),
    "@/lib/auth-session": path.join(WEBSITE_DIR, "lib/auth-session.ts"),
    "@/types/admin": path.join(WEBSITE_DIR, "types/admin.ts"),
    "@/types/learning-cards": path.join(WEBSITE_DIR, "types/learning-cards.ts"),
    "@/types/firestore": path.join(WEBSITE_DIR, "types/firestore.ts"),
    "@/components/NavbarSimple": path.join(
      WEBSITE_DIR,
      "components/NavbarSimple.tsx",
    ),
    "@/components/NotificationSystem": path.join(
      WEBSITE_DIR,
      "components/NotificationSystem.tsx",
    ),
    "@/components/AuthSessionSync": path.join(
      WEBSITE_DIR,
      "components/AuthSessionSync.tsx",
    ),
    "@/providers/JotaiProvider": path.join(
      WEBSITE_DIR,
      "providers/JotaiProvider.tsx",
    ),
    "@/providers/QueryProvider": path.join(
      WEBSITE_DIR,
      "providers/QueryProvider.tsx",
    ),
    "@/context/LearningTypeContext": path.join(
      WEBSITE_DIR,
      "context/LearningTypeContext.tsx",
    ),
  };

  lines.forEach((line, index) => {
    Object.entries(importMap).forEach(([wrongPath, targetFile]) => {
      // Match import statements with the wrong path
      const importRegex = new RegExp(
        `(['"\`])${wrongPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\1`,
        "g",
      );

      if (importRegex.test(line)) {
        // Check if target file exists
        if (fs.existsSync(targetFile)) {
          const relativePath = getRelativePath(filePath, targetFile);
          const newLine = line.replace(
            new RegExp(wrongPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
            relativePath,
          );

          if (newLine !== line) {
            lines[index] = newLine;
            modified = true;
          }
        }
      }
    });
  });

  if (modified) {
    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
    return true;
  }

  return false;
}

function findTypeScriptFiles(dir) {
  const files = [];

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      // Skip node_modules, .next, dist, etc.
      if (
        entry.name.startsWith(".") ||
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === "dist" ||
        entry.name === "build"
      ) {
        continue;
      }

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (
        (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) &&
        !entry.name.endsWith(".d.ts") &&
        !entry.name.includes(".test.") &&
        !entry.name.includes(".spec.")
      ) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

function main() {
  console.log("🔧 Fixing TypeScript import paths...\n");

  // Find all TypeScript files in apps/website
  const files = findTypeScriptFiles(WEBSITE_DIR);

  console.log(`📁 Found ${files.length} files to check\n`);

  let fixedCount = 0;
  files.forEach((file) => {
    if (fixImportsInFile(file)) {
      fixedCount++;
      const relativePath = path.relative(PROJECT_ROOT, file);
      console.log(`✅ Fixed: ${relativePath}`);
    }
  });

  console.log(`\n✅ Fixed ${fixedCount} files`);
}

if (require.main === module) {
  main();
}

module.exports = { fixImportsInFile, getRelativePath };
