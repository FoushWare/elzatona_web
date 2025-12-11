#!/usr/bin/env node
/**
 * Comprehensive script to remove all hardcoded secrets from repository files
 * Replaces them with environment variable requirements
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Patterns to find and replace
const SECRET_PATTERNS = [
  {
    name: "Supabase Service Role Key",
    pattern: /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[^'"]*/g,
    envVar: "SUPABASE_SERVICE_ROLE_KEY",
    replacement: "process.env.SUPABASE_SERVICE_ROLE_KEY",
  },
  {
    name: "Supabase Anon Key",
    pattern: /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[^'"]*/g,
    envVar: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    replacement: "process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY",
  },
  {
    name: "Google API Key",
    pattern: /AIzaSy[^'"]*/g,
    envVar: "GOOGLE_API_KEY",
    replacement: "process.env.GOOGLE_API_KEY",
  },
  {
    name: "GitHub Token",
    pattern: /gho_[^'"]*/g,
    envVar: "GITHUB_TOKEN",
    replacement: "process.env.GITHUB_TOKEN",
  },
  {
    name: "OpenAI Key",
    pattern: /sk-proj-[^'"]*/g,
    envVar: "OPENAI_API_KEY",
    replacement: "process.env.OPENAI_API_KEY",
  },
  {
    name: "Sentry Token",
    pattern: /sntryu_[^'"]*/g,
    envVar: "SENTRY_AUTH_TOKEN",
    replacement: "process.env.SENTRY_AUTH_TOKEN",
  },
  {
    name: "Google OAuth Secret",
    pattern: /GOCSPX-[^'"]*/g,
    envVar: "GOOGLE_OAUTH_CLIENT_SECRET",
    replacement: "process.env.GOOGLE_OAUTH_CLIENT_SECRET",
  },
];

// Directories to process
const DIRECTORIES_TO_PROCESS = [
  "scripts",
  "Rest/scripts/scripts",
  "Rest/scripts/setup",
];

// File extensions to process
const FILE_EXTENSIONS = [".js", ".mjs", ".ts"];

// Directories to exclude
const EXCLUDE_DIRS = [
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  ".cursor",
];

function shouldProcessFile(filePath) {
  // Check if file is in excluded directory
  for (const excludeDir of EXCLUDE_DIRS) {
    if (filePath.includes(excludeDir)) {
      return false;
    }
  }

  // Check file extension
  const ext = path.extname(filePath);
  return FILE_EXTENSIONS.includes(ext);
}

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let modified = false;
    const fixes = [];

    // Check for hardcoded secrets
    for (const secret of SECRET_PATTERNS) {
      const matches = content.match(secret.pattern);
      if (matches) {
        // Replace hardcoded values with env var references
        // Pattern: 'hardcoded-value' or "hardcoded-value" or hardcoded-value
        const patterns = [
          new RegExp(`'${secret.pattern.source}'`, "g"),
          new RegExp(`"${secret.pattern.source}"`, "g"),
          new RegExp(`\`${secret.pattern.source}\``, "g"),
          new RegExp(`= ${secret.pattern.source}`, "g"),
          new RegExp(`: ${secret.pattern.source}`, "g"),
        ];

        for (const pattern of patterns) {
          if (pattern.test(content)) {
            content = content.replace(pattern, secret.replacement);
            modified = true;
            fixes.push(secret.name);
          }
        }

        // Also handle || fallback patterns
        const fallbackPattern = new RegExp(
          `process\\.env\\.${secret.envVar}\\s*\\|\\|\\s*['"\`]${secret.pattern.source}['"\`]`,
          "g",
        );
        if (fallbackPattern.test(content)) {
          content = content.replace(fallbackPattern, secret.replacement);
          modified = true;
          fixes.push(`${secret.name} (fallback removed)`);
        }
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, "utf8");
      return { fixed: true, fixes };
    }
    return { fixed: false, fixes: [] };
  } catch (error) {
    console.error(`  ❌ Error processing ${filePath}:`, error.message);
    return { fixed: false, fixes: [], error: error.message };
  }
}

function main() {
  console.log("🔒 Comprehensive Secret Removal Script\n");
  console.log("📋 Processing files...\n");

  let totalFiles = 0;
  let fixedFiles = 0;
  const results = [];

  for (const dir of DIRECTORIES_TO_PROCESS) {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Directory not found: ${dir}`);
      continue;
    }

    console.log(`📁 Processing: ${dir}`);

    function walkDir(currentPath) {
      const files = fs.readdirSync(currentPath);

      for (const file of files) {
        const filePath = path.join(currentPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          if (!EXCLUDE_DIRS.some((exclude) => filePath.includes(exclude))) {
            walkDir(filePath);
          }
        } else if (shouldProcessFile(filePath)) {
          totalFiles++;
          const result = fixFile(filePath);
          if (result.fixed) {
            fixedFiles++;
            results.push({ file: filePath, fixes: result.fixes });
            console.log(
              `  ✅ Fixed: ${path.relative(process.cwd(), filePath)}`,
            );
            if (result.fixes.length > 0) {
              console.log(`     Removed: ${result.fixes.join(", ")}`);
            }
          }
        }
      }
    }

    walkDir(fullPath);
  }

  console.log(`\n✅ Complete!`);
  console.log(`   Total files processed: ${totalFiles}`);
  console.log(`   Files fixed: ${fixedFiles}`);
  console.log(
    `\n⚠️  Note: You may need to add validation code to require these environment variables`,
  );
  console.log(
    `   Example: if (!process.env.SUPABASE_SERVICE_ROLE_KEY) { process.exit(1); }`,
  );
}

main();
