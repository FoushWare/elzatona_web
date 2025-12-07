const fs = require('fs');
const path = require('path');

/**
 * Fix React questions file by reading it, deduplicating, and writing back
 */

const reactQuestionsFile = path.join(
  __dirname,
  '../final-questions-v01/react-questions.json'
);

console.log('🔧 Fixing React questions file...\n');

// Read the file
const questions = JSON.parse(fs.readFileSync(reactQuestionsFile, 'utf8'));

console.log(`📖 Read ${questions.length} entries from file`);

// Deduplicate by ID
const uniqueMap = new Map();
questions.forEach(q => {
  if (!uniqueMap.has(q.id)) {
    uniqueMap.set(q.id, q);
  }
});

const uniqueQuestions = Array.from(uniqueMap.values());

console.log(`✅ Found ${uniqueQuestions.length} unique questions`);
console.log(
  `   Removed ${questions.length - uniqueQuestions.length} duplicates\n`
);

// Sort: react-ref-* first, then react-ft-*
uniqueQuestions.sort((a, b) => {
  if (a.id.startsWith('react-ref-') && b.id.startsWith('react-ft-')) return -1;
  if (a.id.startsWith('react-ft-') && b.id.startsWith('react-ref-')) return 1;
  const aNum = parseInt(a.id.match(/\d+/)?.[0] || 0);
  const bNum = parseInt(b.id.match(/\d+/)?.[0] || 0);
  return aNum - bNum;
});

// Count by type
const refCount = uniqueQuestions.filter(q =>
  q.id.startsWith('react-ref-')
).length;
const ftCount = uniqueQuestions.filter(q =>
  q.id.startsWith('react-ft-')
).length;

console.log(`📊 Breakdown:`);
console.log(`   react-ref-*: ${refCount} questions`);
console.log(`   react-ft-*: ${ftCount} questions\n`);

// Write back (completely overwrite)
fs.writeFileSync(reactQuestionsFile, JSON.stringify(uniqueQuestions, null, 2));

console.log(`✅ Saved ${uniqueQuestions.length} unique questions to file`);

// Verify
const verify = JSON.parse(fs.readFileSync(reactQuestionsFile, 'utf8'));
const verifyIds = new Set(verify.map(q => q.id));

console.log(`\n✅ Verification:`);
console.log(`   File entries: ${verify.length}`);
console.log(`   Unique IDs: ${verifyIds.size}`);
console.log(
  `   Status: ${verify.length === verifyIds.size ? 'CLEAN ✅' : 'HAS DUPLICATES ⚠️'}`
);
