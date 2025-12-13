#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Fix TypeScript Module Resolution Errors
 * Fixes incorrect @/ import paths based on tsconfig.json mappings
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const PROJECT_ROOT = path.resolve(__dirname, "../../..");
const WEBSITE_DIR = path.join(PROJECT_ROOT, "apps/website");

// Map of incorrect imports to correct relative paths
const IMPORT_FIXES = {
  // admin.config.ts is at apps/website/admin.config.ts
  // @/admin.config should work, but if not, use relative
  "@/admin.config": "./admin.config",

  // lib/supabase.ts is at apps/website/lib/supabase.ts
  "@/lib/supabase": "../lib/supabase",

  // types/admin.ts is at apps/website/types/admin.ts
  "@/types/admin": "../types/admin",

  // lib/utils/api-config.ts is at apps/website/lib/utils/api-config.ts
  "@/lib/utils/api-config": "../lib/utils/api-config",
  "@/lib/utils/sanitize-server": "../lib/utils/sanitize-server",
  "@/lib/utils/validation": "../lib/utils/validation",
  "@/lib/utils/environment": "../lib/utils/environment",
  "@/lib/utils/test-env-loader": "../lib/utils/test-env-loader",

  // Other common lib imports
  "@/lib/supabase-client": "../lib/supabase-client",
  "@/lib/supabase-server": "../lib/supabase-server",
  "@/lib/auth-config": "../lib/auth-config",
  "@/lib/user-auth": "../lib/user-auth",
  "@/lib/server-auth": "../lib/server-auth",
  "@/lib/flashcards": "../lib/flashcards",
  "@/lib/cart": "../lib/cart",
  "@/lib/unified-question-schema": "../lib/unified-question-schema",
  "@/lib/supabase-learning-cards-service":
    "../lib/supabase-learning-cards-service",
  "@/lib/auto-linking-service": "../lib/auto-linking-service",
  "@/lib/section-service": "../lib/section-service",
  "@/lib/ai-validation-service": "../lib/ai-validation-service",

  // Components
  "@/components/NavbarSimple": "../components/NavbarSimple",
  "@/components/NotificationSystem": "../components/NotificationSystem",
  "@/components/AuthSessionSync": "../components/AuthSessionSync",

  // Providers
  "@/providers/JotaiProvider": "../providers/JotaiProvider",
  "@/providers/QueryProvider": "../providers/QueryProvider",

  // Context
  "@/context/LearningTypeContext": "../context/LearningTypeContext",

  // Types
  "@/types/learning-cards": "../types/learning-cards",
  "@/types/firestore": "../types/firestore",

  // Utils
  "@/lib/utils/sanitize": "../lib/utils/sanitize",
};

// Files that should use relative imports (in network/routes, page-components, etc.)
const FILES_TO_FIX = [
  "apps/website/network/routes/**/*.ts",
  "apps/website/page-components/**/*.tsx",
  "apps/website/lib/**/*.ts",
  "apps/website/src/**/*.ts",
  "apps/website/src/**/*.tsx",
];

function getRelativePath(fromFile, toFile) {
  const fromDir = path.dirname(fromFile);
  const relative = path.relative(fromDir, toFile);
  return relative.replace(/\\/g, "/").replace(/\.tsx?$/, "");
}

function fixImportsInFile(filePath) {
  if (!fs.existsSync(filePath)) return false;

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  let modified = false;

  lines.forEach((line, index) => {
    // Check for import statements with @/ paths
    Object.entries(IMPORT_FIXES).forEach(([wrongPath, correctPath]) => {
      if (line.includes(wrongPath)) {
        // Calculate relative path from current file
        const fileDir = path.dirname(filePath);
        const targetFile = path.join(
          WEBSITE_DIR,
          correctPath.replace("../", ""),
        );

        if (
          fs.existsSync(targetFile + ".ts") ||
          fs.existsSync(targetFile + ".tsx")
        ) {
          const relativePath = getRelativePath(filePath, targetFile);
          const newLine = line.replace(
            wrongPath,
            relativePath.startsWith(".") ? relativePath : "./" + relativePath,
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

function findFiles(pattern) {
  try {
    const result = execSync(
      `find ${PROJECT_ROOT} -type f -path "${pattern}" -name "*.ts" -o -name "*.tsx"`,
      {
        encoding: "utf8",
        cwd: PROJECT_ROOT,
      },
    );
    return result.trim().split("\n").filter(Boolean);
  } catch (error) {
    return [];
  }
}

function main() {
  console.log("🔧 Fixing TypeScript import paths...\n");

  let fixedCount = 0;
  const filesToCheck = [];

  // Find all TypeScript files
  FILES_TO_FIX.forEach((pattern) => {
    const files = findFiles(pattern);
    filesToCheck.push(...files);
  });

  // Remove duplicates
  const uniqueFiles = [...new Set(filesToCheck)];

  console.log(`📁 Found ${uniqueFiles.length} files to check\n`);

  uniqueFiles.forEach((file) => {
    if (fixImportsInFile(file)) {
      fixedCount++;
      console.log(`✅ Fixed: ${path.relative(PROJECT_ROOT, file)}`);
    }
  });

  console.log(`\n✅ Fixed ${fixedCount} files`);
}

if (require.main === module) {
  main();
}

module.exports = { fixImportsInFile, IMPORT_FIXES };
