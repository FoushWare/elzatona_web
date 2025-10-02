#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Admin Import Paths...\n');

const adminDir = path.join(process.cwd(), 'apps/web/app/admin');

// Import path mappings for the unified structure
const importMappings = {
  '@/hooks/': '../../../libs/shared/hooks/src/',
  '@/components/ui/': '../../../libs/shared/ui/src/components/ui/',
  '@/components/': '../../../libs/shared/ui/src/components/',
  '@/contexts/': '../../../libs/shared/contexts/src/',
  '@/lib/': '../../../libs/data/firebase/src/',
  '@/types/': '../../../libs/shared/types/src/',
  '@/utils/': '../../../libs/shared/utils/src/',
};

function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Calculate relative depth from admin file to root
    const relativePath = path.relative(adminDir, filePath);
    const depth = relativePath.split(path.sep).length - 1;
    const backPath = '../'.repeat(depth + 3); // +3 for apps/web/app

    // Replace each import mapping
    for (const [oldPath, newPath] of Object.entries(importMappings)) {
      const regex = new RegExp(
        oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'g'
      );
      if (content.includes(oldPath)) {
        content = content.replace(regex, backPath + newPath);
        hasChanges = true;
      }
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, content);
      console.log(`   ✅ Fixed: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.log(`   ❌ Error fixing ${filePath}: ${error.message}`);
    return false;
  }
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let totalFixed = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      totalFixed += processDirectory(fullPath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      if (fixImportsInFile(fullPath)) {
        totalFixed++;
      }
    }
  }

  return totalFixed;
}

console.log('📁 Processing admin directory...');
const fixedCount = processDirectory(adminDir);

console.log(`\n🎉 Import fixing complete!`);
console.log(`   📊 Fixed ${fixedCount} files`);
console.log(`   🚀 Ready to build unified app`);
