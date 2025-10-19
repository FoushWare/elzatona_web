#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

// Files with specific syntax errors that need manual fixing
const filesToFix = [
  'src/shared/components/admin/ProblemSolvingEditor.tsx',
  'src/app/api/admin/frontend-tasks/route.ts',
  'src/app/api/admin/learning-cards/route.ts',
  'src/app/api/admin/plan-questions/route.ts',
  'src/app/api/admin/problem-solving/route.ts',
  'src/app/api/admin/stats/route.ts',
  'src/app/api/admin/update-learning-paths/route.ts',
  'src/app/api/cards/[id]/route.ts',
  'src/app/api/flashcards/route.ts',
  'src/app/api/learning-cart/route.ts',
  'src/app/api/plans/[id]/route.ts',
  'src/app/api/questions/by-topic/[topicId]/route.ts',
  'src/app/api/search/analytics/route.ts',
  'src/app/api/search/questions/route.ts',
  'src/app/api/sections/auto-assign/route.ts',
  'src/app/api/sectors/by-path/[id]/route.ts',
];

async function fixComplexSyntaxErrors(filePath) {
  const fullPath = path.join(projectRoot, filePath);

  try {
    let content = await fs.readFile(fullPath, 'utf8');
    let originalContent = content;

    // Fix specific malformed patterns from the build errors

    // 1. Fix malformed query assignments with comma syntax
    content = content.replace(/let\s+q\s*=\s*([^,]+),\s*\./g, 'let q = $1.');
    content = content.replace(
      /const\s+q\s*=\s*([^,]+),\s*\./g,
      'const q = $1.'
    );
    content = content.replace(/q\s*=\s*q,\s*\./g, 'q = q.');

    // 2. Fix malformed .eq() calls with extra parameters
    content = content.replace(
      /\.eq\(([^,]+),\s*'==',\s*([^)]+)\)/g,
      '.eq($1, $2)'
    );

    // 3. Fix malformed object properties with .update() calls
    content = content.replace(
      /(\w+):\s*(\w+)\s*\|\|\s*(\d+)\.update\(/g,
      '$1: $2 || $3,'
    );
    content = content.replace(/(\w+):\s*(\w+)\.update\(/g, '$1: $2,');

    // 4. Fix malformed await calls
    content = content.replace(/await\s+(\w+),\s*\{/g, 'await $1.update({');

    // 5. Fix malformed array syntax
    content = content.replace(/\[\s*\.(\w+)\(/g, '[$1(');

    // 6. Fix malformed limit calls
    content = content.replace(/limit\((\d+)\.(\w+)\(\)\)/g, 'limit($1).$2()');

    // 7. Fix malformed collection calls
    content = content.replace(
      /collection\(db!?,\s*'(\w+)',\s*\./g,
      'collection(db!, "$1").'
    );

    // 8. Fix malformed supabase query chains
    content = content.replace(
      /supabase\.from\(([^)]+),\s*\./g,
      'supabase.from($1).'
    );

    // 9. Fix malformed order calls
    content = content.replace(
      /\.order\(([^,]+),\s*'([^']+)'\.select\(\)/g,
      '.order($1, "$2").select()'
    );

    // 10. Fix malformed update calls with spread syntax
    content = content.replace(
      /\.update\(\{\s*\.\.\.(\w+)\.update\(/g,
      '.update({ ...$1,'
    );

    // 11. Fix malformed push calls with .eq()
    content = content.replace(/\.push\(\.eq\(/g, '.push(q.eq(');

    // 12. Fix malformed constraints array operations
    content = content.replace(
      /constraints\.push\(\.eq\(/g,
      'constraints.push(q.eq('
    );
    content = content.replace(
      /conditions\.push\(\.eq\(/g,
      'conditions.push(q.eq('
    );

    // 13. Fix malformed query assignments with trailing commas
    content = content.replace(/=\s*(\w+),\s*\.order\(/g, '= $1.order(');

    // 14. Fix malformed collection queries
    content = content.replace(
      /collection\(db!?,\s*"([^"]+)"\)\.eq\(/g,
      'collection(db!, "$1").eq('
    );

    // 15. Fix duplicate default exports by removing all but the last one
    const defaultExportRegex = /export\s+default\s+\w+;/g;
    const matches = content.match(defaultExportRegex);
    if (matches && matches.length > 1) {
      // Find the last occurrence and remove all others
      const lines = content.split('\n');
      let foundFirst = false;
      content = lines
        .map(line => {
          if (line.includes('export default') && !foundFirst) {
            foundFirst = true;
            return ''; // Remove first occurrence
          }
          return line;
        })
        .join('\n');
    }

    if (content !== originalContent) {
      await fs.writeFile(fullPath, content, 'utf8');
      console.log(`✅ Fixed complex syntax: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🔧 Fixing complex syntax errors in API routes...\n');

  let fixedCount = 0;
  for (const filePath of filesToFix) {
    if (await fixComplexSyntaxErrors(filePath)) {
      fixedCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Files fixed: ${fixedCount}`);
  console.log(`📁 Total processed: ${filesToFix.length}`);

  console.log('\n🎉 Complex syntax error fixes completed!');

  console.log('\n📋 Next steps:');
  console.log("1. Run 'npm run build:check' to verify fixes");
  console.log('2. Manually review and fix any remaining complex syntax issues');
  console.log('3. Test the updated API routes');
}

main().catch(console.error);
