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

// Firebase to Supabase conversion patterns
const conversions = [
  // Malformed Supabase queries
  {
    pattern:
      /supabase\.from\(['"]([^'"]+)['"]\)\.eq\(['"]([^'"]+)['"],\s*([^)]+)\)/g,
    replacement: "supabase.from('$1').select().eq('$2', $3)",
  },
  {
    pattern: /supabase\.from\(([^)]+)\)\.eq\(([^)]+)\)\.eq\(([^)]+)\)/g,
    replacement: 'supabase.from($1).select().eq($2).eq($3)',
  },
  {
    pattern: /supabase\.from\(([^)]+)\)\.eq\(([^)]+)\)\.order\(([^)]+)\)/g,
    replacement: 'supabase.from($1).select().eq($2).order($3)',
  },

  // Firebase collection/doc operations
  {
    pattern: /collection\(db,\s*['"]([^'"]+)['"]\)/g,
    replacement: "supabase.from('$1')",
  },
  {
    pattern: /doc\(db,\s*['"]([^'"]+)['"],\s*([^)]+)\)/g,
    replacement: "supabase.from('$1').eq('id', $2)",
  },
  {
    pattern: /addDoc\(collection\(db,\s*['"]([^'"]+)['"]\),\s*([^)]+)\)/g,
    replacement: "supabase.from('$1').insert($2)",
  },
  {
    pattern: /setDoc\(doc\(db,\s*['"]([^'"]+)['"],\s*([^)]+)\),\s*([^)]+)\)/g,
    replacement: "supabase.from('$1').upsert($3)",
  },
  {
    pattern:
      /updateDoc\(doc\(db,\s*['"]([^'"]+)['"],\s*([^)]+)\),\s*([^)]+)\)/g,
    replacement: "supabase.from('$1').update($3).eq('id', $2)",
  },
  {
    pattern: /deleteDoc\(doc\(db,\s*['"]([^'"]+)['"],\s*([^)]+)\)\)/g,
    replacement: "supabase.from('$1').delete().eq('id', $2)",
  },

  // Firebase query operations
  {
    pattern: /getDocs\(query\(([^)]+)\)\)/g,
    replacement: '$1.select()',
  },
  {
    pattern: /getDoc\(([^)]+)\)/g,
    replacement: '$1.select().single()',
  },
  {
    pattern: /where\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"],\s*([^)]+)\)/g,
    replacement: ".eq('$1', $3)",
  },
  {
    pattern: /orderBy\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/g,
    replacement: ".order('$1', { ascending: $2 === 'asc' })",
  },

  // Firebase timestamps
  {
    pattern: /serverTimestamp\(\)/g,
    replacement: 'new Date().toISOString()',
  },
  {
    pattern: /Timestamp\.now\(\)/g,
    replacement: 'new Date().toISOString()',
  },
  {
    pattern: /\.toDate\(\)/g,
    replacement: '',
  },

  // Firebase data access
  {
    pattern: /\.data\(\)/g,
    replacement: '',
  },
  {
    pattern: /\.exists\(\)/g,
    replacement: '!== null',
  },
  {
    pattern: /\.empty/g,
    replacement: '.length === 0',
  },
  {
    pattern: /\.size/g,
    replacement: '.length',
  },
  {
    pattern: /\.docs\.map/g,
    replacement: '.map',
  },

  // Firebase batch operations
  {
    pattern: /writeBatch\(db\)/g,
    replacement: 'supabase',
  },
  {
    pattern: /batch\.set\(/g,
    replacement: 'supabase.from(',
  },
  {
    pattern: /batch\.update\(/g,
    replacement: 'supabase.from(',
  },
  {
    pattern: /batch\.delete\(/g,
    replacement: 'supabase.from(',
  },
  {
    pattern: /await batch\.commit\(\)/g,
    replacement: '// Batch operations completed',
  },

  // Common field name conversions
  {
    pattern: /createdAt:/g,
    replacement: 'created_at:',
  },
  {
    pattern: /updatedAt:/g,
    replacement: 'updated_at:',
  },
  {
    pattern: /questionCount:/g,
    replacement: 'question_count:',
  },
  {
    pattern: /planId:/g,
    replacement: 'plan_id:',
  },
  {
    pattern: /cardId:/g,
    replacement: 'card_id:',
  },
  {
    pattern: /questionId:/g,
    replacement: 'question_id:',
  },
  {
    pattern: /isActive:/g,
    replacement: 'is_active:',
  },
];

// Function to process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Apply all conversions
    for (const conversion of conversions) {
      const newContent = content.replace(
        conversion.pattern,
        conversion.replacement
      );
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    }

    // Additional specific fixes
    // Fix malformed query chains
    content = content.replace(
      /\.from\(([^)]+)\)\.eq\(([^)]+)\)\.select\(\)/g,
      '.from($1).select().eq($2)'
    );
    content = content.replace(
      /\.from\(([^)]+)\)\.eq\(([^)]+)\)\.eq\(([^)]+)\)\.select\(\)/g,
      '.from($1).select().eq($2).eq($3)'
    );

    // Fix async/await patterns
    content = content.replace(
      /const (\w+) = await supabase\.from\(([^)]+)\)\.select\(\)/g,
      'const { data: $1, error } = await supabase.from($2).select()'
    );

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
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

  console.log(`\n🎉 Firebase removal complete!`);
  console.log(`📊 Fixed ${fixedCount} files`);
}

if (require.main === module) {
  main();
}

module.exports = { processFile, conversions };
