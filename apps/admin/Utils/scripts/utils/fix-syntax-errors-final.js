#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript/JavaScript files
function findFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  const files = [];

  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip node_modules, .next, and other build directories
        if (!['node_modules', '.next', 'dist', 'build'].includes(item)) {
          traverse(fullPath);
        }
      } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

// Specific syntax fixes for the errors we're seeing
const syntaxFixes = [
  // Fix malformed query chains
  {
    pattern: /query\(\s*collection\([^)]+\)\s*,\s*\.eq\(/g,
    replacement: 'query(\n        collection(',
  },
  {
    pattern: /,\s*\.eq\(/g,
    replacement: ',\n        where(',
  },
  {
    pattern: /,\s*\.order\(/g,
    replacement: ',\n        orderBy(',
  },

  // Fix malformed object properties
  {
    pattern: /created_at:\s*data\.createdAt\?\s*\|\|\s*new Date\(\)\s*,/g,
    replacement: 'created_at: data.createdAt || new Date().toISOString(),',
  },

  // Fix malformed Supabase queries
  {
    pattern:
      /supabase\.from\(['"]([^'"]+)['"]\)\.eq\(['"]([^'"]+)['"],\s*([^)]+)\)/g,
    replacement: "supabase.from('$1').select().eq('$2', $3)",
  },

  // Fix malformed query function calls
  {
    pattern: /query\(q,\s*\.eq\(/g,
    replacement: 'query(q, where(',
  },
];

// Function to process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Apply all syntax fixes
    for (const fix of syntaxFixes) {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    }

    // Additional specific fixes for common patterns
    // Fix malformed query chains that start with collection
    content = content.replace(
      /query\(\s*collection\(([^)]+)\)\s*,\s*\.eq\(([^)]+)\)\s*,\s*\.eq\(([^)]+)\)\s*\)/g,
      'query(\n        collection($1),\n        where($2),\n        where($3)\n      )'
    );

    // Fix malformed query chains with orderBy
    content = content.replace(
      /query\(\s*collection\(([^)]+)\)\s*,\s*\.eq\(([^)]+)\)\s*,\s*\.order\(([^)]+)\)\s*\)/g,
      'query(\n        collection($1),\n        where($2),\n        orderBy($3)\n      )'
    );

    // Fix malformed query chains with multiple conditions
    content = content.replace(
      /query\(\s*collection\(([^)]+)\)\s*,\s*\.eq\(([^)]+)\)\s*,\s*\.eq\(([^)]+)\)\s*,\s*\.eq\(([^)]+)\)\s*\)/g,
      'query(\n        collection($1),\n        where($2),\n        where($3),\n        where($4)\n      )'
    );

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed syntax: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
function main() {
  const srcDir = path.join(process.cwd(), 'src');
  const files = findFiles(srcDir);

  console.log(`🔍 Found ${files.length} files to process...`);

  let fixedCount = 0;

  for (const file of files) {
    if (processFile(file)) {
      fixedCount++;
    }
  }

  console.log(`\n🎉 Syntax fixes complete!`);
  console.log(`📊 Fixed ${fixedCount} files`);
}

if (require.main === module) {
  main();
}

module.exports = { processFile, syntaxFixes };
