const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing all remaining firestoreService calls...');

// Find all files that use firestoreService
const grepCommand = `grep -rl "firestoreService" src/`;
let files;

try {
  files = execSync(grepCommand, { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(f => f);
} catch (error) {
  console.log('✅ No files found with firestoreService calls');
  process.exit(0);
}

console.log(`Found ${files.length} files with firestoreService calls:`);
files.forEach(file => console.log(`  - ${file}`));

// Common Supabase imports to add
const supabaseImports = `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

`;

// Fix each file
files.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Add Supabase imports if not already present
    if (!content.includes('createClient') && !content.includes('supabase')) {
      // Find the first import statement and add after it
      const firstImportIndex = content.indexOf('import');
      if (firstImportIndex !== -1) {
        const endOfFirstImport = content.indexOf(';', firstImportIndex) + 1;
        const afterFirstImport = content.indexOf('\n', endOfFirstImport) + 1;
        content =
          content.slice(0, afterFirstImport) +
          '\n' +
          supabaseImports +
          content.slice(afterFirstImport);
        modified = true;
      }
    }

    // Replace common firestoreService method patterns
    const replacements = [
      // Get all methods
      {
        pattern: /await firestoreService\.getAll(\w+)\(\)/g,
        replacement: (match, tableName) => {
          const table = tableName.toLowerCase() + 's';
          return `await supabase.from('${table}').select('*').order('created_at', { ascending: false })`;
        },
      },
      // Get methods
      {
        pattern: /await firestoreService\.get(\w+)\((\w+)\)/g,
        replacement: (match, entity, idVar) => {
          const table = entity.toLowerCase() + 's';
          return `await supabase.from('${table}').select('*').eq('id', ${idVar}).single()`;
        },
      },
      // Create methods
      {
        pattern: /await firestoreService\.create(\w+)\((\w+)\)/g,
        replacement: (match, entity, dataVar) => {
          const table = entity.toLowerCase() + 's';
          return `await supabase.from('${table}').insert(${dataVar}).select().single()`;
        },
      },
      // Update methods
      {
        pattern: /await firestoreService\.update(\w+)\((\w+),\s*(\w+)\)/g,
        replacement: (match, entity, idVar, dataVar) => {
          const table = entity.toLowerCase() + 's';
          return `await supabase.from('${table}').update({...${dataVar}, updated_at: new Date().toISOString()}).eq('id', ${idVar})`;
        },
      },
      // Delete methods
      {
        pattern: /await firestoreService\.delete(\w+)\((\w+)\)/g,
        replacement: (match, entity, idVar) => {
          const table = entity.toLowerCase() + 's';
          return `await supabase.from('${table}').delete().eq('id', ${idVar})`;
        },
      },
      // Specific patterns found in the codebase
      {
        pattern: /await firestoreService\.getLearningPlanTemplates\(\)/g,
        replacement: () =>
          `await supabase.from('learning_plans').select('*').order('created_at', { ascending: false })`,
      },
      {
        pattern: /await firestoreService\.getLearningPlanTemplate\((\w+)\)/g,
        replacement: (match, idVar) =>
          `await supabase.from('learning_plans').select('*').eq('id', ${idVar}).single()`,
      },
      {
        pattern:
          /await firestoreService\.updateLearningPlanTemplate\((\w+),\s*(\w+)\)/g,
        replacement: (match, idVar, dataVar) =>
          `await supabase.from('learning_plans').update({...${dataVar}, updated_at: new Date().toISOString()}).eq('id', ${idVar})`,
      },
      {
        pattern: /await firestoreService\.getUserProgress\((\w+)\)/g,
        replacement: (match, userIdVar) =>
          `await supabase.from('user_progress').select('*').eq('user_id', ${userIdVar}).single()`,
      },
      {
        pattern:
          /await firestoreService\.saveQuestionProgress\((\w+),\s*(\w+)\)/g,
        replacement: (match, userIdVar, progressVar) =>
          `await supabase.from('question_progress').upsert({user_id: ${userIdVar}, ...${progressVar}, updated_at: new Date().toISOString()})`,
      },
    ];

    // Apply replacements
    replacements.forEach(({ pattern, replacement }) => {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        modified = true;
      }
    });

    // Add error handling for Supabase queries if needed
    if (modified && !content.includes('if (error')) {
      // Find supabase queries and add error handling
      content = content.replace(
        /(const\s+(?:{[^}]+}|\w+)\s*=\s*await supabase[^;]+;)/g,
        match => {
          if (match.includes('{ data:') && !match.includes('error')) {
            return match;
          }
          return match + '\n    if (error) throw error;';
        }
      );
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${filePath}`);
    } else {
      console.log(`⏭️  Skipped ${filePath} (no changes needed)`);
    }
  } catch (error) {
    console.error(`❌ Failed to process ${filePath}:`, error.message);
  }
});

console.log('\n✅ Finished fixing firestore Service calls');
console.log(
  '⚠️  Note: You may need to manually review and adjust some complex method calls'
);
