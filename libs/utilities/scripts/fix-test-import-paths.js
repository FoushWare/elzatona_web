const fs = require("fs");
const path = require("path");

const WEBSITE_PAGE_COMPONENTS = path.join(
  __dirname,
  "../../../apps/website/page-components",
);

function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // Fix LearningTypeContext imports
  const oldContextPattern = /\.\.\/\.\.\/context\/LearningTypeContext/g;
  if (oldContextPattern.test(content)) {
    content = content.replace(
      oldContextPattern,
      "../../src/context/LearningTypeContext",
    );
    modified = true;
  }

  // Fix test-utils/mocks/shared-contexts imports (2 levels up)
  const oldTestUtilsPattern = /\.\.\/\.\.\/test-utils\/mocks\/shared-contexts/g;
  if (oldTestUtilsPattern.test(content)) {
    content = content.replace(
      oldTestUtilsPattern,
      "../../src/test-utils/mocks/shared-contexts",
    );
    modified = true;
  }

  // Fix test-utils/mocks/shared-contexts imports (3 levels up for admin)
  const oldTestUtilsPattern3 =
    /\.\.\/\.\.\/\.\.\/test-utils\/mocks\/shared-contexts/g;
  if (oldTestUtilsPattern3.test(content)) {
    content = content.replace(
      oldTestUtilsPattern3,
      "../../../src/test-utils/mocks/shared-contexts",
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Fixed: ${filePath}`);
    return true;
  }
  return false;
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let fixedCount = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      fixedCount += walkDir(fullPath);
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".test.tsx") ||
        entry.name.endsWith(".integration.test.tsx"))
    ) {
      if (fixImportsInFile(fullPath)) {
        fixedCount++;
      }
    }
  }

  return fixedCount;
}

console.log("Fixing test import paths...\n");
const fixed = walkDir(WEBSITE_PAGE_COMPONENTS);
console.log(`\n✅ Fixed ${fixed} test file(s)`);
