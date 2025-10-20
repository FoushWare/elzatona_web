const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  '../../src/lib/unified-question-schema.ts'
);

try {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Firebase imports and references
  content = content.replace(/import.*firebase.*/g, '');
  content = content.replace(/import.*firestore.*/g, '');
  content = content.replace(/import.*query.*/g, '');
  content = content.replace(/import.*collection.*/g, '');
  content = content.replace(/import.*where.*/g, '');
  content = content.replace(/import.*orderBy.*/g, '');
  content = content.replace(/import.*limit.*/g, '');
  content = content.replace(/import.*getDocs.*/g, '');
  content = content.replace(/import.*addDoc.*/g, '');
  content = content.replace(/import.*updateDoc.*/g, '');
  content = content.replace(/import.*deleteDoc.*/g, '');
  content = content.replace(/import.*doc.*/g, '');

  // Replace Firestore references
  content = content.replace(/Firestore/g, 'any');
  content = content.replace(/this\.db/g, 'supabase');
  content = content.replace(
    /if \(!this\.db\) throw new Error\('Firestore not initialized'\);/g,
    ''
  );

  // Replace Firebase query methods with Supabase equivalents
  content = content.replace(
    /query\(collection\(this\.db, '([^']+)'\)\)/g,
    "supabase.from('$1').select('*')"
  );
  content = content.replace(
    /query\(([^,]+),\s*where\('([^']+)',\s*([^)]+)\)\)/g,
    "$1.eq('$2', $3)"
  );
  content = content.replace(
    /query\(([^,]+),\s*where\('([^']+)',\s*'==',\s*([^)]+)\)\)/g,
    "$1.eq('$2', $3)"
  );
  content = content.replace(
    /query\(([^,]+),\s*orderBy\('([^']+)',\s*\{ ascending: ([^}]+) \}\)\)/g,
    "$1.order('$2', { ascending: $3 })"
  );
  content = content.replace(
    /query\(([^,]+),\s*limit\(([^)]+)\)\)/g,
    '$1.limit($2)'
  );

  // Replace getDocs calls
  content = content.replace(
    /const snapshot = await getDocs\(([^)]+)\);/g,
    'const { data, error } = await $1;'
  );
  content = content.replace(
    /snapshot\.docs\.map\(doc => \(\{[\s\S]*?id: doc\.id,[\s\S]*?\}\) as UnifiedQuestion\)/g,
    'data || []'
  );
  content = content.replace(
    /snapshot\.map\([\s\S]*?doc =>[\s\S]*?\{[\s\S]*?id: doc\.id,[\s\S]*?\}\) as UnifiedQuestion\)/g,
    'data || []'
  );

  // Replace addDoc calls
  content = content.replace(
    /await addDoc\(collection\(this\.db, '([^']+)'\),\s*([^)]+)\)/g,
    "await supabase.from('$1').insert($2).select().single()"
  );

  // Replace updateDoc calls
  content = content.replace(
    /await updateDoc\(doc\(this\.db, '([^']+)',\s*([^)]+)\),\s*([^)]+)\)/g,
    "await supabase.from('$1').update($3).eq('id', $2)"
  );

  // Replace deleteDoc calls
  content = content.replace(
    /await deleteDoc\(doc\(this\.db, '([^']+)',\s*([^)]+)\)\)/g,
    "await supabase.from('$1').delete().eq('id', $2)"
  );

  fs.writeFileSync(filePath, content);
  console.log('✅ Fixed Firebase references in unified-question-schema.ts');
} catch (error) {
  console.error('❌ Error fixing Firebase references:', error.message);
}
