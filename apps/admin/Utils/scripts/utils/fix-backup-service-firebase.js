const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../src/lib/backup-service.ts');

console.log('🔧 Fixing Firebase references in backup-service.ts...');

let content = fs.readFileSync(filePath, 'utf8');

// Replace Firebase operations with Supabase equivalents
const replacements = [
  // Replace setDoc operations
  {
    from: /await setDoc\(doc\(db, this\.BACKUP_COLLECTION, backupId\), \{([^}]+)\}, \{ merge: true \}\);/g,
    to: `await supabase.from('backups').update({$1}).eq('id', backupId);`,
  },

  // Replace getDocs operations
  {
    from: /const backupDoc = await getDocs\(\s*doc\(db, this\.BACKUP_COLLECTION, backupId\)\s*\);/g,
    to: `const { data: backupDoc, error: backupError } = await supabase.from('backups').select('*').eq('id', backupId).single();`,
  },

  // Replace backupDoc checks
  {
    from: /if \(!backupDoc!== null\) \{/g,
    to: `if (backupError || !backupDoc) {`,
  },

  // Replace collection operations in restore
  {
    from: /const snapshot = await getDocs\(collection\(db, collectionName\)\);/g,
    to: `const { data: documents, error: collectionError } = await supabase.from(collectionName).select('*');`,
  },

  // Replace snapshot operations
  {
    from: /snapshot\.forEach\(doc => \{/g,
    to: `(documents || []).forEach(doc => {`,
  },

  // Replace doc.id references
  {
    from: /doc\.id/g,
    to: `doc.id`,
  },

  // Replace doc.data() references
  {
    from: /doc\.data\(\)/g,
    to: `doc`,
  },

  // Replace addDoc operations
  {
    from: /await addDoc\(collection\(db, collectionName\), docData\);/g,
    to: `await supabase.from(collectionName).insert(docData);`,
  },

  // Replace updateDoc operations
  {
    from: /await updateDoc\(doc\(db, collectionName, docId\), docData\);/g,
    to: `await supabase.from(collectionName).update(docData).eq('id', docId);`,
  },

  // Replace deleteDoc operations
  {
    from: /await deleteDoc\(doc\(db, collectionName, docId\)\);/g,
    to: `await supabase.from(collectionName).delete().eq('id', docId);`,
  },

  // Replace getDocs for listing backups
  {
    from: /const snapshot = await getDocs\(collection\(db, this\.BACKUP_COLLECTION\)\);/g,
    to: `const { data: backups, error: listError } = await supabase.from('backups').select('*').order('metadata.created_at', { ascending: false });`,
  },

  // Replace snapshot.docs.map
  {
    from: /snapshot\.docs\.map\(doc => \(\{[\s\S]*?id: doc\.id,[\s\S]*?\}\)\)/g,
    to: `(backups || []).map(backup => ({ id: backup.id, ...backup }))`,
  },

  // Replace deleteDoc for deleting backups
  {
    from: /await deleteDoc\(doc\(db, this\.BACKUP_COLLECTION, backupId\)\);/g,
    to: `await supabase.from('backups').delete().eq('id', backupId);`,
  },
];

// Apply replacements
replacements.forEach(({ from, to }) => {
  content = content.replace(from, to);
});

// Write the updated content
fs.writeFileSync(filePath, content);

console.log('✅ Fixed Firebase references in backup-service.ts');
