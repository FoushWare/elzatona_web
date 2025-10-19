#!/usr/bin/env node

/**
 * Script to fix Firebase import errors by replacing them with Supabase imports
 * This script will systematically update all files that import from deleted Firebase files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🔧 Fixing Firebase import errors...\n');

// Files that need to be updated based on the build errors
const filesToFix = [
  // API Routes
  'src/app/api/questions/by-topic/[topicId]/route.ts',
  'src/app/api/questions/count/route.ts',
  'src/app/api/questions/stats/route.ts',
  'src/app/api/questions/unified/[id]/route.ts',
  'src/app/api/questions/update-counts/route.ts',
  'src/app/api/sections/auto-assign/route.ts',
  'src/app/api/sections/route.ts',
  'src/app/api/sectors/by-path/[id]/route.ts',

  // Admin API Routes
  'src/app/api/admin/create-missing-plans/route.ts',
  'src/app/api/admin/stats/route.ts',
  'src/app/api/admin/topics/[topicId]/route.ts',
  'src/app/api/admin/topics/initialize/route.ts',
  'src/app/api/admin/topics/route.ts',
  'src/app/api/admin/clear-questions/route.ts',
  'src/app/api/admin/frontend-tasks/[id]/route.ts',
  'src/app/api/admin/frontend-tasks/route.ts',
  'src/app/api/admin/learning-cards/[id]/route.ts',
  'src/app/api/admin/learning-cards/route.ts',
  'src/app/api/admin/plan-questions/route.ts',
  'src/app/api/admin/problem-solving/[id]/route.ts',
  'src/app/api/admin/problem-solving/route.ts',
  'src/app/api/admin/update-learning-paths/route.ts',

  // Other API Routes
  'src/app/api/categories/[id]/route.ts',
  'src/app/api/questions/[id]/route.ts',
  'src/app/api/questions/add/route.ts',
  'src/app/api/questions/bulk-topics/route.ts',
  'src/app/api/questions/by-learning-path/[learningPath]/route.ts',
  'src/app/api/questions/question-topics/[questionId]/route.ts',
  'src/app/api/search/analytics/route.ts',
  'src/app/api/search/questions/route.ts',
  'src/app/api/search/suggestions/route.ts',
  'src/app/api/cards/[id]/route.ts',
  'src/app/api/custom-plans/[id]/route.ts',
  'src/app/api/custom-plans/route.ts',
  'src/app/api/flashcards/[id]/route.ts',
  'src/app/api/flashcards/route.ts',
  'src/app/api/guided-learning/plans/[planId]/sections/[sectionId]/route.ts',
  'src/app/api/learning-cart/route.ts',
  'src/app/api/learning-paths/route.ts',
  'src/app/api/plans/[id]/route.ts',
];

// Import replacements
const importReplacements = [
  {
    from: /import\s*{\s*([^}]+)\s*}\s*from\s*['"]@\/lib\/firebase-server['"];?/g,
    to: `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);`,
  },
  {
    from: /import\s*{\s*db\s*}\s*from\s*['"]@\/lib\/firebase-server['"];?/g,
    to: `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);`,
  },
  {
    from: /import\s*{\s*db\s*}\s*from\s*['"]@\/lib\/firebase['"];?/g,
    to: `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);`,
  },
];

// Function replacements for common Firebase operations
const operationReplacements = [
  // Collection operations
  { from: /collection\(db,\s*['"]([^'"]+)['"]\)/g, to: "supabase.from('$1')" },
  { from: /query\(([^)]+)\)/g, to: '$1' },
  { from: /where\(([^)]+)\)/g, to: '.eq($1)' },
  { from: /orderBy\(([^)]+)\)/g, to: '.order($1)' },
  { from: /getDocs\(([^)]+)\)/g, to: '$1.select()' },
  { from: /addDoc\(([^)]+),\s*([^)]+)\)/g, to: '$1.insert($2)' },
  { from: /updateDoc\(([^)]+),\s*([^)]+)\)/g, to: '$1.update($2)' },
  { from: /deleteDoc\(([^)]+)\)/g, to: '$1.delete()' },
  { from: /getDoc\(([^)]+)\)/g, to: '$1.select().single()' },
  {
    from: /doc\(db,\s*['"]([^'"]+)['"],\s*([^)]+)\)/g,
    to: "supabase.from('$1').eq('id', $2)",
  },
];

function fixFile(filePath) {
  const fullPath = path.join(projectRoot, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;

  // Apply import replacements
  for (const replacement of importReplacements) {
    if (replacement.from.test(content)) {
      content = content.replace(replacement.from, replacement.to);
      modified = true;
    }
  }

  // Apply operation replacements
  for (const replacement of operationReplacements) {
    if (replacement.from.test(content)) {
      content = content.replace(replacement.from, replacement.to);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  } else {
    console.log(`ℹ️  No changes needed: ${filePath}`);
    return false;
  }
}

async function main() {
  console.log(`📁 Processing ${filesToFix.length} files...\n`);

  let fixedCount = 0;
  let notFoundCount = 0;

  for (const filePath of filesToFix) {
    const fullPath = path.join(projectRoot, filePath);

    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      notFoundCount++;
      continue;
    }

    if (fixFile(filePath)) {
      fixedCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`✅ Files fixed: ${fixedCount}`);
  console.log(`⚠️  Files not found: ${notFoundCount}`);
  console.log(`📁 Total processed: ${filesToFix.length}`);

  if (fixedCount > 0) {
    console.log(`\n🎉 Firebase import fixes completed!`);
    console.log(`\n📋 Next steps:`);
    console.log(`1. Run 'npm run build:check' to verify fixes`);
    console.log(`2. Test the updated API routes`);
    console.log(`3. Update any remaining Firebase-specific logic`);
  } else {
    console.log(`\nℹ️  No files needed fixing.`);
  }
}

main().catch(console.error);
