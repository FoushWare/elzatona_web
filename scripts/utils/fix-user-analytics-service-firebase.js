const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  '../../src/lib/user-analytics-service.ts'
);

let content = fs.readFileSync(filePath, 'utf8');

// Replace Firebase functions with Supabase equivalents
const replacements = [
  // Replace getDocs with Supabase select
  [
    /const (\w+)Snapshot = await getDocs\(\s*query\(\s*collection\([^)]+\)[^)]*\)\s*\);/g,
    "const { data: $1Snapshot, error: $1Error } = await supabase.from('user_progress').select('*');",
  ],

  // Replace collection with table references
  [/collection\([^)]+\)/g, "'user_progress'"],

  // Replace where clauses
  [/where\(([^,]+),\s*'==',\s*([^)]+)\)/g, '.eq($1, $2)'],

  // Replace orderBy
  [/orderBy\(([^,]+),\s*\{[^}]+\}\)/g, '.order($1)'],

  // Replace Firebase snapshot handling
  [/if \(\w+Snapshot\.empty\)/g, 'if (!$1Snapshot || $1Snapshot.length === 0)'],
  [
    /if \(\w+Snapshot\.length === 0\)/g,
    'if (!$1Snapshot || $1Snapshot.length === 0)',
  ],

  // Replace snapshot.docs access
  [/\w+Snapshot\.docs\[0\]/g, '$1Snapshot[0]'],
  [/\w+Snapshot\.map\(doc =>/g, '$1Snapshot.map(item =>'],

  // Replace Firebase updateDoc with Supabase update
  [
    /await updateDoc\([^,]+,\s*([^)]+)\)/g,
    "await supabase.from('user_progress').update($1)",
  ],

  // Replace Firebase addDoc with Supabase insert
  [
    /await addDoc\([^,]+,\s*([^)]+)\)/g,
    "await supabase.from('user_progress').insert($1)",
  ],

  // Replace Firebase deleteDoc with Supabase delete
  [
    /await deleteDoc\([^)]+\)/g,
    "await supabase.from('user_progress').delete()",
  ],
];

// Apply replacements
replacements.forEach(([pattern, replacement]) => {
  content = content.replace(pattern, replacement);
});

// Write the updated content back
fs.writeFileSync(filePath, content);

console.log('✅ Fixed Firebase references in user-analytics-service.ts');
