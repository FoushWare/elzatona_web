/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const WEBSITE_DIR = path.join(__dirname, "../../../apps/website");
const ADMIN_DIR = path.join(__dirname, "../../../apps/admin");

// Patterns to replace
const REPLACEMENTS = [
  // Website imports
  {
    pattern: /from\s+['"]@\/lib\/([^'"]+)['"]/g,
    replacement: "from '@/lib/$1'",
    description: "@/lib imports (should stay the same)",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/src\/lib\/([^'"]+)['"]/g,
    replacement: "from '../../lib/$1'",
    description: "Relative src/lib imports",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/src\/lib\/([^'"]+)['"]/g,
    replacement: "from '../../../lib/$1'",
    description: "Relative src/lib imports (3 levels)",
  },
  {
    pattern: /from\s+['"]\.\.\/src\/lib\/([^'"]+)['"]/g,
    replacement: "from '../lib/$1'",
    description: "Relative src/lib imports (1 level)",
  },
  {
    pattern: /from\s+['"]\.\/src\/lib\/([^'"]+)['"]/g,
    replacement: "from './lib/$1'",
    description: "Relative src/lib imports (same dir)",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/src\/context\/([^'"]+)['"]/g,
    replacement: "from '../../context/$1'",
    description: "Relative src/context imports",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/src\/context\/([^'"]+)['"]/g,
    replacement: "from '../../../context/$1'",
    description: "Relative src/context imports (3 levels)",
  },
  {
    pattern: /from\s+['"]\.\.\/src\/context\/([^'"]+)['"]/g,
    replacement: "from '../context/$1'",
    description: "Relative src/context imports (1 level)",
  },
  {
    pattern: /from\s+['"]\.\/src\/context\/([^'"]+)['"]/g,
    replacement: "from './context/$1'",
    description: "Relative src/context imports (same dir)",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/src\/components\/([^'"]+)['"]/g,
    replacement: "from '../../components/$1'",
    description: "Relative src/components imports",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/src\/components\/([^'"]+)['"]/g,
    replacement: "from '../../../components/$1'",
    description: "Relative src/components imports (3 levels)",
  },
  {
    pattern: /from\s+['"]\.\.\/src\/components\/([^'"]+)['"]/g,
    replacement: "from '../components/$1'",
    description: "Relative src/components imports (1 level)",
  },
  {
    pattern: /from\s+['"]\.\/src\/components\/([^'"]+)['"]/g,
    replacement: "from './components/$1'",
    description: "Relative src/components imports (same dir)",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/src\/providers\/([^'"]+)['"]/g,
    replacement: "from '../../providers/$1'",
    description: "Relative src/providers imports",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/src\/providers\/([^'"]+)['"]/g,
    replacement: "from '../../../providers/$1'",
    description: "Relative src/providers imports (3 levels)",
  },
  {
    pattern: /from\s+['"]\.\.\/src\/providers\/([^'"]+)['"]/g,
    replacement: "from '../providers/$1'",
    description: "Relative src/providers imports (1 level)",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/src\/types\/([^'"]+)['"]/g,
    replacement: "from '../../types/$1'",
    description: "Relative src/types imports",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/src\/types\/([^'"]+)['"]/g,
    replacement: "from '../../../types/$1'",
    description: "Relative src/types imports (3 levels)",
  },
  {
    pattern: /from\s+['"]\.\.\/src\/types\/([^'"]+)['"]/g,
    replacement: "from '../types/$1'",
    description: "Relative src/types imports (1 level)",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/src\/test-utils\/([^'"]+)['"]/g,
    replacement: "from '../../test-utils/$1'",
    description: "Relative src/test-utils imports",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/src\/test-utils\/([^'"]+)['"]/g,
    replacement: "from '../../../test-utils/$1'",
    description: "Relative src/test-utils imports (3 levels)",
  },
  {
    pattern: /from\s+['"]\.\.\/src\/test-utils\/([^'"]+)['"]/g,
    replacement: "from '../test-utils/$1'",
    description: "Relative src/test-utils imports (1 level)",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/src\/utils\/([^'"]+)['"]/g,
    replacement: "from '../../utils/$1'",
    description: "Relative src/utils imports",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/src\/utils\/([^'"]+)['"]/g,
    replacement: "from '../../../utils/$1'",
    description: "Relative src/utils imports (3 levels)",
  },
  {
    pattern: /from\s+['"]\.\.\/src\/utils\/([^'"]+)['"]/g,
    replacement: "from '../utils/$1'",
    description: "Relative src/utils imports (1 level)",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/src\/config\/([^'"]+)['"]/g,
    replacement: "from '../../config/$1'",
    description: "Relative src/config imports",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/src\/config\/([^'"]+)['"]/g,
    replacement: "from '../../../config/$1'",
    description: "Relative src/config imports (3 levels)",
  },
  {
    pattern: /from\s+['"]\.\.\/src\/config\/([^'"]+)['"]/g,
    replacement: "from '../config/$1'",
    description: "Relative src/config imports (1 level)",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/src\/middleware['"]/g,
    replacement: "from '../../middleware'",
    description: "Relative src/middleware imports",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/src\/middleware['"]/g,
    replacement: "from '../../../middleware'",
    description: "Relative src/middleware imports (3 levels)",
  },
  {
    pattern: /from\s+['"]\.\.\/src\/middleware['"]/g,
    replacement: "from '../middleware'",
    description: "Relative src/middleware imports (1 level)",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/src\/admin\.config['"]/g,
    replacement: "from '../../admin.config'",
    description: "Relative src/admin.config imports",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/src\/admin\.config['"]/g,
    replacement: "from '../../../admin.config'",
    description: "Relative src/admin.config imports (3 levels)",
  },
  {
    pattern: /from\s+['"]\.\.\/src\/admin\.config['"]/g,
    replacement: "from '../admin.config'",
    description: "Relative src/admin.config imports (1 level)",
  },
];

function fixImportsInFile(filePath, _appRoot) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  for (const { pattern, replacement, description } of REPLACEMENTS) {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    return true;
  }
  return false;
}

function walkDir(dir, appRoot, extensions = [".ts", ".tsx", ".js", ".jsx"]) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let fixedCount = 0;

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
      fixedCount += walkDir(fullPath, appRoot, extensions);
    } else if (
      entry.isFile() &&
      extensions.some((ext) => entry.name.endsWith(ext))
    ) {
      if (fixImportsInFile(fullPath, appRoot)) {
        fixedCount++;
      }
    }
  }

  return fixedCount;
}

console.log("🔧 Fixing import paths after src/ move...\n");

console.log("Processing website...");
const websiteFixed = walkDir(WEBSITE_DIR, WEBSITE_DIR);
console.log(`✅ Fixed ${websiteFixed} files in website\n`);

console.log("Processing admin...");
const adminFixed = walkDir(ADMIN_DIR, ADMIN_DIR);
console.log(`✅ Fixed ${adminFixed} files in admin\n`);

console.log(`\n✅ Total: Fixed ${websiteFixed + adminFixed} files`);
