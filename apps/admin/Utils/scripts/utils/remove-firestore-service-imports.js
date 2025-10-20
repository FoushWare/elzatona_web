const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Removing firestore-service imports from all files...');

// Find all files that import firestore-service
const grepCommand = `grep -rl "firestore-service" src/`;
let files;

try {
  files = execSync(grepCommand, { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(f => f);
} catch (error) {
  console.log('✅ No files found with firestore-service imports');
  process.exit(0);
}

console.log(`Found ${files.length} files with firestore-service imports:`);
files.forEach(file => console.log(`  - ${file}`));

// Remove the import lines
files.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove the import statement
    content = content.replace(
      /import\s+{\s*firestoreService\s*}\s+from\s+['"]@\/lib\/firestore-service['"];?\s*\n/g,
      ''
    );
    content = content.replace(
      /import\s+\*\s+as\s+\w+\s+from\s+['"]@\/lib\/firestore-service['"];?\s*\n/g,
      ''
    );

    // Write back
    fs.writeFileSync(filePath, content);
    console.log(`✅ Removed import from ${filePath}`);
  } catch (error) {
    console.error(`❌ Failed to process ${filePath}:`, error.message);
  }
});

console.log('\n✅ Finished removing firestore-service imports');
console.log(
  '⚠️  Note: You may need to replace firestoreService method calls with direct Supabase calls'
);
