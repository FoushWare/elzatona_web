#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing final targeted syntax errors v4...');

const patterns = [
  // Fix malformed query chains with .limit($1), and .limit($1);
  {
    pattern:
      /supabase\.from\(['"][^'"]+['"]\)\.order\([^)]+\)\.select\(\),\s*\.limit\(\$1\),/g,
    replacement: "supabase.from('$1').order('$2', \"$3\").select().limit($4)",
    description: 'Fix malformed query chains with .limit($1),',
  },
  {
    pattern:
      /supabase\.from\(['"][^'"]+['"]\)\.order\([^)]+\)\.select\(\),\s*\.limit\(\$1\);/g,
    replacement: "supabase.from('$1').order('$2', \"$3\").select().limit($4)",
    description: 'Fix malformed query chains with .limit($1);',
  },
];

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    patterns.forEach(({ pattern, replacement, description }) => {
      const matches = content.match(pattern);
      if (matches) {
        console.log(`  📝 ${description} in ${path.basename(filePath)}`);

        // Extract table name, order field, order direction, and limit value
        content = content.replace(pattern, match => {
          const tableMatch = match.match(/supabase\.from\(['"]([^'"]+)['"]\)/);
          const orderMatch = match.match(
            /\.order\(['"]([^'"]+)['"],\s*["']([^"']+)["']\)/
          );
          const limitMatch = match.match(/\.limit\((\$?\d+)\)/);

          if (tableMatch && orderMatch && limitMatch) {
            const table = tableMatch[1];
            const orderField = orderMatch[1];
            const orderDir = orderMatch[2];
            const limit = limitMatch[1];

            return `supabase.from('${table}').order('${orderField}', "${orderDir}").select().limit(${limit})`;
          }

          return match;
        });

        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }

    return false;
  } catch (error) {
    console.error(`  ❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function findApiFiles(dir) {
  const files = [];

  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...findApiFiles(fullPath));
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }

  return files;
}

// Find all API files
const apiDir = path.join(process.cwd(), 'src', 'app', 'api');
const apiFiles = findApiFiles(apiDir);

console.log(`Found ${apiFiles.length} API files to check`);

let fixedCount = 0;

apiFiles.forEach(filePath => {
  if (fixFile(filePath)) {
    fixedCount++;
  }
});

console.log(`\n✅ Fixed ${fixedCount} files`);
console.log('🎉 Final targeted syntax errors v4 fix complete!');
