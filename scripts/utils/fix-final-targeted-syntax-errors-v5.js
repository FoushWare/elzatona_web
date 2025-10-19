#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing final targeted syntax errors v5...');

const patterns = [
  // Fix malformed query chains with .limit($1) and missing commas
  {
    pattern:
      /supabase\.from\(['"][^'"]+['"]\)\.order\([^)]+\)\.select\(\)\.limit\(\$1\)\s+supabase\.from\(['"][^'"]+['"]\)\.select\(\)/g,
    replacement:
      "supabase.from('$1').order('$2', \"$3\").select().limit($4),\n      supabase.from('$5').select()",
    description: 'Fix malformed query chains with missing commas',
  },
  {
    pattern:
      /supabase\.from\(['"][^'"]+['"]\)\.order\([^)]+\)\.select\(\)\.limit\(\$1\)\s+supabase\.from\(['"][^'"]+['"]\)\.select\(\)/g,
    replacement:
      "supabase.from('$1').order('$2', \"$3\").select().limit($4),\n      supabase.from('$5').select()",
    description: 'Fix malformed query chains with missing commas',
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

        // Extract table names, order field, order direction, and limit value
        content = content.replace(pattern, match => {
          const tableMatch = match.match(
            /supabase\.from\(['"]([^'"]+)['"]\)\.order\(['"]([^'"]+)['"],\s*["']([^"']+)["']\)\.select\(\)\.limit\((\$?\d+)\)\s+supabase\.from\(['"]([^'"]+)['"]\)\.select\(\)/
          );

          if (tableMatch) {
            const table1 = tableMatch[1];
            const orderField = tableMatch[2];
            const orderDir = tableMatch[3];
            const limit = tableMatch[4];
            const table2 = tableMatch[5];

            return `supabase.from('${table1}').order('${orderField}', "${orderDir}").select().limit(${limit}),\n      supabase.from('${table2}').select()`;
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
console.log('🎉 Final targeted syntax errors v5 fix complete!');
