#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Final targeted Firebase-to-Supabase syntax fixes...');

// Specific fixes for the remaining errors
const specificFixes = [
  // Fix malformed query assignments with tasksRef
  {
    file: 'src/app/api/admin/problem-solving/route.ts',
    pattern:
      /q\s*=\s*\n\s*tasksRef\s*,\s*\n\s*\.eq\('difficulty',\s*difficulty\s*,\s*\n\s*\.order\('createdAt',\s*'desc'\)\n\s*\);/g,
    replacement:
      "q = tasksRef.eq('difficulty', difficulty).order('createdAt', 'desc');",
  },

  // Fix malformed limit calls
  {
    file: 'src/app/api/admin/stats/route.ts',
    pattern: /\.limit\(\$1\)\s*,/g,
    replacement: '.limit(10),',
  },

  // Fix malformed limit calls
  {
    file: 'src/app/api/search/analytics/route.ts',
    pattern: /\.limit\(\$1\);/g,
    replacement: '.limit(10);',
  },

  // Fix malformed query assignments with sectionsRef
  {
    file: 'src/app/api/sections/auto-assign/route.ts',
    pattern:
      /const\s+sectionsQuery\s*=\s*\n\s*sectionsRef\s*,\s*\n\s*\.eq\('learningPath',\s*learningPathId\s*,\s*\n\s*\.order\('order'\s*,\s*'asc'\)\n\s*\);/g,
    replacement:
      "const sectionsQuery = sectionsRef.eq('learningPath', learningPathId).order('order', 'asc');",
  },
];

// Function to fix a specific file
function fixSpecificFile(filePath, pattern, replacement) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    let content = fs.readFileSync(fullPath, 'utf8');

    const newContent = content.replace(pattern, replacement);
    if (newContent !== content) {
      fs.writeFileSync(fullPath, newContent);
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
let fixedCount = 0;
specificFixes.forEach(fix => {
  if (fixSpecificFile(fix.file, fix.pattern, fix.replacement)) {
    fixedCount++;
  }
});

console.log(`\n🎉 Fixed ${fixedCount} files`);
console.log('✅ Final targeted Firebase-to-Supabase syntax fixes complete!');
