const fs = require("fs");
const path = require("path");

const PAGE_COMPONENTS_DIR = path.join(
  __dirname,
  "../../../apps/website/page-components",
);

// Import path replacements for page-components
const REPLACEMENTS = [
  // Context imports - use @/ alias
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
  // Types imports - use @/ alias
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
  // Component imports - need to check if they exist in the same directory structure
  // For now, keep relative imports for components in the same page directory
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

console.log("🔧 Fixing import paths in page-components...\n");

const files = walkDir(PAGE_COMPONENTS_DIR);
let totalFixed = 0;

for (const file of files) {
  if (fixImportsInFile(file)) {
    totalFixed++;
  }
}

console.log(`\n✅ Total files fixed: ${totalFixed}`);
console.log("✨ Import path fixing complete!");
