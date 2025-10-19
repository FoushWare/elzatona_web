#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Final targeted Firebase-to-Supabase syntax fixes...');

// Specific fixes for the remaining errors
const specificFixes = [
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
