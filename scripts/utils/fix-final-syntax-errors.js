#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Final comprehensive Firebase-to-Supabase syntax fixes...');

// Function to fix a file
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix malformed query assignments
    content = content.replace(
      /let\s+q\s*=\s*\n\s*supabase\.from\([^)]+\)\.eq\([^)]+\)\n\s*\);/g,
      match => {
        const cleaned = match.replace(/\n\s*\);/g, ';');
        return cleaned;
      }
    );

    // Fix malformed query assignments with multiple lines
    content = content.replace(
      /q\s*=\s*\n\s*tasksRef\.eq\([^)]+\)\.order\([^)]+\)\n\s*\);/g,
      match => {
        const cleaned = match.replace(/\n\s*\);/g, ';');
        return cleaned;
      }
    );

    // Fix malformed limit calls
    content = content.replace(/\.limit\(\$1\)/g, '.limit(10)');

    // Fix malformed query assignments
    content = content.replace(
      /const\s+existingCartQuery\s*=\s*\n\s*supabase\.from\([^)]+\)\.eq\([^)]+\)\n\s*\);/g,
      match => {
        const cleaned = match.replace(/\n\s*\);/g, ';');
        return cleaned;
      }
    );

    // Fix malformed spread operators
    content = content.replace(
      /firestoreQuery,\s*\.\.\.conditions;/g,
      'firestoreQuery;'
    );

    // Fix malformed query assignments
    content = content.replace(
      /const\s+q\s*=\s*questionsRef\.eq\([^)]+\)\.order\([^)]+\)\n\s*\);/g,
      match => {
        const cleaned = match.replace(/\n\s*\);/g, ';');
        return cleaned;
      }
    );

    // Fix malformed query assignments
    content = content.replace(
      /const\s+q\s*=\s*sectorsRef\.eq\([^)]+\)\.order\([^)]+\)\n\s*\);/g,
      match => {
        const cleaned = match.replace(/\n\s*\);/g, ';');
        return cleaned;
      }
    );

    if (content !== fs.readFileSync(filePath, 'utf8')) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed: ${filePath}`);
      modified = true;
    }

    return modified;
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
console.log('✅ Final Firebase-to-Supabase syntax fixes complete!');
