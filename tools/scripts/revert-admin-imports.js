#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Reverting Admin Import Paths to @ aliases...\n');

const adminDir = path.join(process.cwd(), 'apps/web/app/admin');

function revertImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Revert complex relative paths back to @ aliases
    const revertMappings = [
      [
        /\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/libs\/shared\/hooks\/src\//g,
        '@/hooks/',
      ],
      [
        /\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/libs\/shared\/ui\/src\/components\//g,
        '@/components/',
      ],
      [
        /\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/libs\/shared\/contexts\/src\//g,
        '@/contexts/',
      ],
      [
        /\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/libs\/data\/firebase\/src\//g,
        '@/lib/',
      ],
      [
        /\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/libs\/shared\/types\/src\//g,
        '@/types/',
      ],
      [
        /\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/libs\/shared\/utils\/src\//g,
        '@/utils/',
      ],
    ];

    for (const [regex, replacement] of revertMappings) {
      if (regex.test(content)) {
        content = content.replace(regex, replacement);
        hasChanges = true;
      }
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, content);
      console.log(`   ✅ Reverted: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.log(`   ❌ Error reverting ${filePath}: ${error.message}`);
    return false;
  }
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let totalReverted = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      totalReverted += processDirectory(fullPath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      if (revertImportsInFile(fullPath)) {
        totalReverted++;
      }
    }
  }

  return totalReverted;
}

console.log('📁 Processing admin directory...');
const revertedCount = processDirectory(adminDir);

console.log(`\n🎉 Import reversion complete!`);
console.log(`   📊 Reverted ${revertedCount} files`);
console.log(`   🚀 Now using TypeScript path mapping`);
