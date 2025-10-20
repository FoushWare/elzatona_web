const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  '../../src/lib/guided-learning-service.ts'
);

let content = fs.readFileSync(filePath, 'utf8');

// Add Supabase imports at the top
content = content.replace(
  '// v1.0 - Guided Learning Service\n// Handles guided learning plans, progress tracking, and user activities\n\n\n\n',
  `// v1.0 - Guided Learning Service
// Handles guided learning plans, progress tracking, and user activities

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

`
);

// Remove Firebase-specific helper function
content = content.replace(
  "// Helper function to check database initialization\nconst checkDb = (): Firestore => {\n  if (!db) {\n    throw new Error('Database not initialized');\n  }\n  return db;\n};",
  '// Supabase client is initialized above'
);

// Replace Firebase operations with Supabase equivalents
content = content.replace(
  /addDoc\(\s*collection\(checkDb\(\), ([^)]+)\),/g,
  'supabase.from($1).insert('
);
content = content.replace(
  /doc\(checkDb\(\), ([^,]+), ([^)]+)\)/g,
  "supabase.from($1).select().eq('id', $2)"
);
content = content.replace(/setDoc\(/g, 'supabase.from(');
content = content.replace(/updateDoc\(/g, 'supabase.from(');
content = content.replace(/getDocs\(/g, 'supabase.from(');
content = content.replace(/query\(/g, 'supabase.from(');
content = content.replace(/collection\(checkDb\(\), ([^)]+)\)/g, '$1');
content = content.replace(/where\(/g, '.eq(');
content = content.replace(/orderBy\(/g, '.order(');
content = content.replace(/limit\(/g, '.limit(');
content = content.replace(/increment\(/g, '');
content = content.replace(/Timestamp\.fromDate\(/g, '');
content = content.replace(/\.toDate\(\)/g, '');

// Fix specific method calls
content = content.replace(/\.select\(\)\.single\(\)/g, '.single()');
content = content.replace(
  /\.eq\('isActive', true\)/g,
  ".eq('is_active', true)"
);
content = content.replace(
  /\.eq\('userId', userId\)/g,
  ".eq('user_id', userId)"
);
content = content.replace(
  /\.eq\('userId', userId\)/g,
  ".eq('user_id', userId)"
);

// Fix variable names
content = content.replace(/planId/g, 'plan_id');
content = content.replace(/questionId/g, 'question_id');
content = content.replace(/userId/g, 'user_id');

// Fix collection names to match Supabase table names
content = content.replace(/this\.COLLECTIONS\.PLANS/g, "'learning_plans'");
content = content.replace(
  /this\.COLLECTIONS\.USER_PROGRESS/g,
  "'user_plan_progress'"
);
content = content.replace(
  /this\.COLLECTIONS\.USER_ACTIVITIES/g,
  "'user_activities'"
);
content = content.replace(/this\.COLLECTIONS\.USER_STATS/g, "'user_stats'");
content = content.replace(/this\.COLLECTIONS\.ACHIEVEMENTS/g, "'achievements'");
content = content.replace(
  /this\.COLLECTIONS\.USER_ACHIEVEMENTS/g,
  "'user_achievements'"
);

// Fix async/await patterns for Supabase
content = content.replace(
  /const planRef = await addDoc\(/g,
  'const { data: planRef, error } = await'
);
content = content.replace(
  /return planRef\.id;/g,
  'if (error) throw error; return planRef.id;'
);

// Fix specific Firebase patterns
content = content.replace(
  /const progressSnap = await progressRef\.select\(\)\.single\(\);/g,
  "const { data: progressSnap, error: progressError } = await supabase.from('user_plan_progress').select('*').eq('id', `${userId}_${plan_id}`).single();"
);
content = content.replace(
  /if \(!progressSnap!== null\)/g,
  'if (progressError || !progressSnap)'
);

// Fix date handling
content = content.replace(
  /new Date\(\)\.toISOString\(\)/g,
  'new Date().toISOString()'
);
content = content.replace(/createdAt/g, 'created_at');
content = content.replace(/updatedAt/g, 'updated_at');

// Fix boolean comparisons
content = content.replace(/!== null/g, '!== null');

// Fix method calls that need proper Supabase syntax
content = content.replace(
  /await updateDoc\(progressRef, \{/g,
  "await supabase.from('user_plan_progress').update({"
);
content = content.replace(
  /await updateDoc\(statsRef, \{/g,
  "await supabase.from('user_stats').update({"
);

// Fix the specific error patterns
content = content.replace(
  /if \(!progressSnap!== null\) \{[\s\S]*?throw new Error\('User progress not found'\);\s*\}/g,
  "if (progressError || !progressSnap) {\n        throw new Error('User progress not found');\n      }"
);

// Write the updated content back to the file
fs.writeFileSync(filePath, content);

console.log('✅ Fixed guided-learning-service.ts Firebase references');
