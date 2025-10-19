const fs = require('fs');
const path = require('path');
const { execSync } = require('child_function');

console.log('🔧 Fixing Supabase destructuring issues...');

// Find all files that have the pattern "const X = await supabase"
const grepCommand = `grep -rl "const \\w\\+ = await supabase" src/app/api/`;
let files;

try {
  files = execSync(grepCommand, { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(f => f);
} catch (error) {
  console.log('✅ No files found with Supabase queries');
  process.exit(0);
}

console.log(`Found ${files.length} files with Supabase queries to check`);

files.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix pattern: const X = await supabase.from(...)...
    // Should be: const { data: X, error } = await supabase.from(...)...
    content = content.replace(
      /const (\w+) = await supabase\.from\(([^)]+)\)\.select\(([^)]+)\)([^;]+);/g,
      (match, varName, table, selectParams, rest) => {
        // Check if already destructured
        if (match.startsWith('const { data:')) {
          return match;
        }
        modified = true;
        return `const { data: ${varName}, error } = await supabase.from(${table}).select(${selectParams})${rest};`;
      }
    );

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Failed to process ${filePath}:`, error.message);
  }
});

console.log('\n✅ Finished fixing Supabase destructuring issues');
