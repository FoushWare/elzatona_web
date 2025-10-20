const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../src/lib/backup-service.ts');

console.log('🔧 Fixing remaining Firebase references in backup-service.ts...');

let content = fs.readFileSync(filePath, 'utf8');

// More comprehensive replacements
const replacements = [
  // Replace the specific setDoc operation that's causing the error
  {
    from: /await setDoc\(\s*doc\(db, this\.BACKUP_COLLECTION, backupId\),\s*\{([\s\S]*?)\},\s*\{ merge: true \}\s*\);/g,
    to: `await supabase.from('backups').update({$1}).eq('id', backupId);`,
  },

  // Replace any remaining setDoc operations
  {
    from: /await setDoc\(doc\(db, ([^,]+), ([^)]+)\), ([^;]+);/g,
    to: `await supabase.from('$1').update($3).eq('id', $2);`,
  },

  // Replace any remaining getDocs operations
  {
    from: /const snapshot = await getDocs\(collection\(db, ([^)]+)\)\);/g,
    to: `const { data: documents, error } = await supabase.from('$1').select('*');`,
  },

  // Replace any remaining doc operations
  {
    from: /doc\(db, ([^,]+), ([^)]+)\)/g,
    to: `'$2'`,
  },

  // Replace any remaining collection operations
  {
    from: /collection\(db, ([^)]+)\)/g,
    to: `'$1'`,
  },

  // Replace any remaining addDoc operations
  {
    from: /await addDoc\(collection\(db, ([^)]+)\), ([^;]+);/g,
    to: `await supabase.from('$1').insert($2);`,
  },

  // Replace any remaining updateDoc operations
  {
    from: /await updateDoc\(doc\(db, ([^,]+), ([^)]+)\), ([^;]+);/g,
    to: `await supabase.from('$1').update($3).eq('id', $2);`,
  },

  // Replace any remaining deleteDoc operations
  {
    from: /await deleteDoc\(doc\(db, ([^,]+), ([^)]+)\);/g,
    to: `await supabase.from('$1').delete().eq('id', $2);`,
  },
];

// Apply replacements
replacements.forEach(({ from, to }) => {
  const newContent = content.replace(from, to);
  if (newContent !== content) {
    console.log(
      `✅ Applied replacement: ${from.toString().substring(0, 50)}...`
    );
    content = newContent;
  }
});

// Write the updated content
fs.writeFileSync(filePath, content);

console.log('✅ Fixed remaining Firebase references in backup-service.ts');
