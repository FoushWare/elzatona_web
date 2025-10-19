#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

// Files with specific syntax errors that need manual fixing
const filesToFix = [
  'src/app/api/admin/frontend-tasks/route.ts',
  'src/app/api/admin/learning-cards/[id]/route.ts',
  'src/app/api/admin/learning-cards/route.ts',
  'src/app/api/admin/plan-questions/route.ts',
  'src/app/api/admin/problem-solving/route.ts',
  'src/app/api/admin/stats/route.ts',
  'src/app/api/admin/topics/route.ts',
  'src/app/api/admin/update-learning-paths/route.ts',
  'src/app/api/cards/[id]/route.ts',
  'src/app/api/custom-plans/route.ts',
  'src/app/api/flashcards/route.ts',
  'src/app/api/guided-learning/plans/[planId]/sections/[sectionId]/route.ts',
  'src/app/api/learning-cart/route.ts',
  'src/app/api/plans/[id]/route.ts',
  'src/app/api/questions/by-learning-path/[learningPath]/route.ts',
  'src/app/api/questions/by-topic/[topicId]/route.ts',
  'src/app/api/questions/count/route.ts',
  'src/app/api/questions/question-topics/[questionId]/route.ts',
  'src/app/api/search/analytics/route.ts',
  'src/app/api/search/questions/route.ts',
  'src/app/api/search/suggestions/route.ts',
  'src/app/api/sections/auto-assign/route.ts',
  'src/app/api/sectors/by-path/[id]/route.ts',
  'src/shared/components/admin/ProblemSolvingEditor.tsx',
];

async function fixSyntaxErrors(filePath) {
  const fullPath = path.join(projectRoot, filePath);

  try {
    let content = await fs.readFile(fullPath, 'utf8');
    let originalContent = content;

    // Fix common syntax patterns
    // 1. Fix malformed Supabase queries with comma syntax
    content = content.replace(/let\s+q\s*=\s*(\w+),\s*\./g, 'let q = $1.');
    content = content.replace(/const\s+q\s*=\s*(\w+),\s*\./g, 'const q = $1.');
    content = content.replace(/q\s*=\s*q,\s*\./g, 'q = q.');

    // 2. Fix malformed object properties with .update() calls
    content = content.replace(
      /(\w+):\s*(\w+)\s*\|\|\s*(\d+)\.update\(/g,
      '$1: $2 || $3,'
    );
    content = content.replace(/(\w+):\s*(\w+)\.update\(/g, '$1: $2,');

    // 3. Fix malformed await calls
    content = content.replace(/await\s+(\w+),\s*\{/g, 'await $1.update({');

    // 4. Fix malformed array syntax
    content = content.replace(/\[\s*\.(\w+)\(/g, '[$1(');

    // 5. Fix malformed limit calls
    content = content.replace(/limit\((\d+)\.(\w+)\(\)\)/g, 'limit($1).$2()');

    // 6. Fix malformed collection calls
    content = content.replace(
      /collection\(db!?,\s*'(\w+)',\s*\./g,
      'collection(db!, "$1").'
    );

    // 7. Fix duplicate default exports
    const defaultExportMatches = content.match(/export\s+default\s+\w+;/g);
    if (defaultExportMatches && defaultExportMatches.length > 1) {
      // Keep only the last default export
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
      console.log(`✅ Fixed syntax: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🔧 Fixing syntax errors in API routes...\n');

  let fixedCount = 0;
  for (const filePath of filesToFix) {
    if (await fixSyntaxErrors(filePath)) {
      fixedCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Files fixed: ${fixedCount}`);
  console.log(`📁 Total processed: ${filesToFix.length}`);

  console.log('\n🎉 Syntax error fixes completed!');

  console.log('\n📋 Next steps:');
  console.log("1. Run 'npm run build:check' to verify fixes");
  console.log('2. Manually review and fix any remaining complex syntax issues');
  console.log('3. Test the updated API routes');
}

main().catch(console.error);
