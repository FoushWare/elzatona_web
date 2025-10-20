#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing remaining Firebase-to-Supabase syntax errors...');

// Define the patterns to fix
const fixes = [
  // Fix malformed object properties with .insert() calls
  {
    pattern: /(\w+):\s*(\w+)\s*\|\|\s*(\d+)\.insert\(/g,
    replacement: '$1: $2 || $3,',
  },

  // Fix malformed collection queries
  {
    pattern: /collection\(db[^,]*,\s*["'][^"']*["']\)\.eq\(/g,
    replacement: 'supabase.from(',
  },

  // Fix malformed query chains
  {
    pattern: /(\w+)\s*=\s*supabase\.from\(["'][^"']*["']\)\.eq\(/g,
    replacement: '$1 = supabase.from(',
  },

  // Fix malformed order calls
  {
    pattern: /\.order\(["'][^"']*["']\)\)/g,
    replacement: '.order(',
  },

  // Fix malformed update calls
  {
    pattern: /(\w+):\s*(\w+)\.update\(/g,
    replacement: '$1: $2,',
  },

  // Fix malformed spread operators
  {
    pattern: /\.\.\.constraints\)/g,
    replacement: ')',
  },

  // Fix malformed array push calls
  {
    pattern: /conditions\.push\(\.order\(/g,
    replacement: 'conditions.push(',
  },

  // Fix malformed limit calls
  {
    pattern: /limit\(\d+\)\s*\)/g,
    replacement: '.limit($1)',
  },

  // Fix malformed select calls
  {
    pattern: /\.select\(\)\s*\)/g,
    replacement: '.select()',
  },
];

// Function to fix a file
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Apply all fixes
    fixes.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Function to find all TypeScript files in src/app/api
function findApiFiles(dir) {
  const files = [];

  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

// Main execution
const apiDir = path.join(process.cwd(), 'src', 'app', 'api');
const apiFiles = findApiFiles(apiDir);

console.log(`📁 Found ${apiFiles.length} API files to check`);

let fixedCount = 0;
apiFiles.forEach(file => {
  if (fixFile(file)) {
    fixedCount++;
  }
});

console.log(`\n🎉 Fixed ${fixedCount} files`);
console.log('✅ Firebase-to-Supabase syntax fixes complete!');
