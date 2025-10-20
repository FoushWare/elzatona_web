#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Comprehensive Firebase-to-Supabase syntax fixes...');

// Function to fix a file
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix malformed query assignments with commas
    content = content.replace(
      /const\s+existingQuery\s*=\s*\n\s*supabase\.from\([^)]+\)\.eq\([^)]+\)\s*,\s*\n\s*\.eq\([^)]+\)\n\s*\);/g,
      match => {
        const cleaned = match
          .replace(/,\s*\n\s*\.eq\(/g, '.eq(')
          .replace(/\n\s*\);/g, ';');
        return cleaned;
      }
    );

    // Fix malformed query assignments with tasksRef
    content = content.replace(
      /q\s*=\s*\n\s*tasksRef\s*,\s*\n\s*\.eq\([^)]+\)\s*,\s*\n\s*\.order\([^)]+\)\n\s*\);/g,
      match => {
        const cleaned = match
          .replace(/tasksRef\s*,\s*\n\s*\.eq\(/g, 'tasksRef.eq(')
          .replace(/,\s*\n\s*\.order\(/g, '.order(')
          .replace(/\n\s*\);/g, ';');
        return cleaned;
      }
    );

    // Fix malformed limit calls
    content = content.replace(/\.limit\(\d+\)\s*\)/g, '.limit($1)');

    // Fix malformed query assignments
    content = content.replace(
      /const\s+cartQuery\s*=\s*\n\s*supabase\.from\([^)]+\)\.eq\([^)]+\)\n\s*\);/g,
      match => {
        const cleaned = match.replace(/\n\s*\);/g, ';');
        return cleaned;
      }
    );

    // Fix malformed spread operators
    content = content.replace(
      /supabase\.from\([^)]+\)\.\.\.conditions\.slice\([^)]+\)\n\s*\);/g,
      match => {
        const cleaned = match.replace(
          /\.\.\.conditions\.slice\([^)]+\)\n\s*\);/g,
          ';'
        );
        return cleaned;
      }
    );

    // Fix malformed query assignments with sectionsRef
    content = content.replace(
      /const\s+sectionsQuery\s*=\s*\n\s*sectionsRef\s*,\s*\n\s*\.eq\([^)]+\)\s*,\s*\n\s*\.order\([^)]+\)\n\s*\);/g,
      match => {
        const cleaned = match
          .replace(/sectionsRef\s*,\s*\n\s*\.eq\(/g, 'sectionsRef.eq(')
          .replace(/,\s*\n\s*\.order\(/g, '.order(')
          .replace(/\n\s*\);/g, ';');
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
console.log('✅ Comprehensive Firebase-to-Supabase syntax fixes complete!');
