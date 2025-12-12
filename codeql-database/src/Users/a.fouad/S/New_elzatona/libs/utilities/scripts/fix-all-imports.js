/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

// Directories to process
const DIRS_TO_FIX = [
  path.join(__dirname, "../../../apps/website/network/routes"),
  path.join(__dirname, "../../../apps/website/page-components"),
  path.join(__dirname, "../../../apps/website/components"),
];

// Import path replacements
const REPLACEMENTS = [
  // Relative paths to @/ aliases for types
  {
    pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/types\/([^'"]+)['"]/g,
    replacement: "from '@/types/$1'",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/types\/([^'"]+)['"]/g,
    replacement: "from '@/types/$1'",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/types\/([^'"]+)['"]/g,
    replacement: "from '@/types/$1'",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/types\/([^'"]+)['"]/g,
    replacement: "from '@/types/$1'",
  },
  {
    pattern: /from\s+['"]\.\.\/types\/([^'"]+)['"]/g,
    replacement: "from '@/types/$1'",
  },
  // Context imports
  {
    pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/context\/([^'"]+)['"]/g,
    replacement: "from '@/context/$1'",
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/context\/([^'"]+)['"]/g,
    replacement: "from '@/context/$1'",
  },
  {
    pattern: /from\s+['"]\.\.\/context\/([^'"]+)['"]/g,
    replacement: "from '@/context/$1'",
  },
];

function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let modified = false;

    for (const { pattern, replacement } of REPLACEMENTS) {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function walkDir(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

console.log("🔧 Fixing all import paths...\n");

let totalFixed = 0;

for (const dir of DIRS_TO_FIX) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory not found: ${dir}`);
    continue;
  }

  console.log(`📁 Processing: ${dir}`);
  const files = walkDir(dir);
  let fixedCount = 0;

  for (const file of files) {
    if (fixImportsInFile(file)) {
      fixedCount++;
      totalFixed++;
    }
  }

  console.log(`   Fixed ${fixedCount} files\n`);
}

console.log(`\n✅ Total files fixed: ${totalFixed}`);
console.log("✨ Import path fixing complete!");
