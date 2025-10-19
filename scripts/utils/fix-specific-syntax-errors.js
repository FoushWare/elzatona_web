#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing specific Firebase-to-Supabase syntax errors...');

// Specific fixes for the remaining errors
const specificFixes = [
  // Fix malformed collection queries
  {
    file: 'src/app/api/admin/plan-questions/route.ts',
    pattern:
      /collection\(db,\s*PLAN_QUESTIONS_COLLECTION,\s*\.eq\('planId',\s*planId\)/g,
    replacement:
      "supabase.from(PLAN_QUESTIONS_COLLECTION).eq('planId', planId)",
  },

  // Fix malformed query chains
  {
    file: 'src/app/api/admin/problem-solving/route.ts',
    pattern:
      /tasksRef,\s*\.eq\('category',\s*category,\s*\.order\('createdAt',\s*'desc'\)/g,
    replacement: "tasksRef.eq('category', category).order('createdAt', 'desc')",
  },

  // Fix malformed limit calls
  {
    file: 'src/app/api/admin/stats/route.ts',
    pattern: /\.limit\(\$1\)/g,
    replacement: '.limit(10)',
  },

  // Fix malformed update calls
  {
    file: 'src/app/api/admin/update-learning-paths/route.ts',
    pattern:
      /questionCount:\s*update\.questionCount\.update\(updatedAt:\s*new\s*Date\(\)\.toISOString\(\)/g,
    replacement:
      'questionCount: update.questionCount, updatedAt: new Date().toISOString()',
  },

  // Fix malformed from calls
  {
    file: 'src/app/api/learning-cart/route.ts',
    pattern: /supabase\.from\('userId',\s*userId\)/g,
    replacement: "supabase.from('learningCarts').eq('userId', userId)",
  },

  // Fix malformed array push calls
  {
    file: 'src/app/api/search/questions/route.ts',
    pattern: /conditions\.push\(sortBy,\s*sortOrder\)\)/g,
    replacement: 'conditions.push(`.order(${sortBy}, ${sortOrder})`)',
  },

  // Fix malformed from calls with limit
  {
    file: 'src/app/api/search/suggestions/route.ts',
    pattern: /supabase\.from\('questions',\s*limit\(1000\)\.select\(\)/g,
    replacement: "supabase.from('questions').limit(1000).select()",
  },

  // Fix malformed from calls
  {
    file: 'src/app/api/sections/route.ts',
    pattern: /supabase\.from\('sections'\.select\(\)/g,
    replacement: "supabase.from('sections').select()",
  },

  // Fix malformed order calls
  {
    file: 'src/app/api/sections/auto-assign/route.ts',
    pattern:
      /questionsRef\.eq\('learningPath',\s*learningPathId,\s*\.order\('createdAt',\s*'asc'\)/g,
    replacement:
      "questionsRef.eq('learningPath', learningPathId).order('createdAt', 'asc')",
  },

  // Fix malformed order calls
  {
    file: 'src/app/api/sectors/by-path/[id]/route.ts',
    pattern: /sectorsRef\.eq\('pathId',\s*pathId,\s*\.order\('order'\)/g,
    replacement: "sectorsRef.eq('pathId', pathId).order('order')",
  },
];

// Function to fix a specific file
function fixSpecificFile(filePath, pattern, replacement) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    let content = fs.readFileSync(fullPath, 'utf8');

    const newContent = content.replace(pattern, replacement);
    if (newContent !== content) {
      fs.writeFileSync(fullPath, newContent);
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
let fixedCount = 0;
specificFixes.forEach(fix => {
  if (fixSpecificFile(fix.file, fix.pattern, fix.replacement)) {
    fixedCount++;
  }
});

console.log(`\n🎉 Fixed ${fixedCount} files`);
console.log('✅ Specific Firebase-to-Supabase syntax fixes complete!');
