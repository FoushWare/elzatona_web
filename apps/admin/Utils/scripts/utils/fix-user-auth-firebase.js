const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../src/lib/user-auth.ts');

let content = fs.readFileSync(filePath, 'utf8');

// Replace Firebase functions with Supabase equivalents
const replacements = [
  // Replace setDoc with Supabase insert
  [
    /await setDoc\(doc\(db, this\.COLLECTION_NAME, userId\),\s*([^)]+)\);/g,
    "await supabase.from('users').insert({ id: userId, ...$1 });",
  ],

  // Replace Firebase query with Supabase select
  [
    /const q = query\(\s*collection\([^)]+\)[^)]*\);/g,
    "const { data: q, error: qError } = await supabase.from('users').select('*').eq('email', email);",
  ],

  // Replace getDocs with direct data access
  [
    /const querySnapshot = await getDocs\(q\);/g,
    '// Data already fetched above',
  ],

  // Replace Firebase snapshot handling
  [/if \(querySnapshot\.length === 0\)/g, 'if (!q || q.length === 0)'],
  [/const doc = querySnapshot\.docs\[0\];/g, 'const doc = q[0];'],
  [/const data = doc;/g, 'const data = doc;'],

  // Replace Firebase doc with Supabase select
  [
    /const docRef = doc\(db, this\.COLLECTION_NAME, userId\);/g,
    "const { data: docSnap, error: docError } = await supabase.from('users').select('*').eq('id', userId).single();",
  ],

  // Replace Firebase docSnap handling
  [
    /const docSnap = await docRef\.select\(\)\.single\(\);/g,
    '// Data already fetched above',
  ],
  [/if \(!docSnap!== null\)/g, 'if (!docSnap)'],
  [/const data = docSnap;/g, 'const data = docSnap;'],

  // Replace updateDoc with Supabase update
  [
    /await updateDoc\(doc\(db, this\.COLLECTION_NAME, userId\),\s*([^)]+)\);/g,
    "await supabase.from('users').update($1).eq('id', userId);",
  ],

  // Replace Firebase collection with Supabase select
  [
    /const querySnapshot = await getDocs\(collection\(db, this\.COLLECTION_NAME\)\);/g,
    "const { data: querySnapshot, error: queryError } = await supabase.from('users').select('*');",
  ],

  // Replace Firebase forEach with array forEach
  [/querySnapshot\.forEach\(doc => \{/g, 'querySnapshot.forEach(doc => {'],
  [/const data = doc;/g, 'const data = doc;'],
];

// Apply replacements
replacements.forEach(([pattern, replacement]) => {
  content = content.replace(pattern, replacement);
});

// Write the updated content back
fs.writeFileSync(filePath, content);

console.log('✅ Fixed Firebase references in user-auth.ts');
