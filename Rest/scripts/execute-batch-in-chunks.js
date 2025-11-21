const fs = require('fs');
const path = require('path');

/**
 * Split a large SQL batch file into smaller chunks and output instructions
 * for executing each chunk via MCP
 */

const BATCH_FILE = process.argv[2];
const CHUNK_SIZE = parseInt(process.argv[3]) || 10; // Default: 10 questions per chunk

if (!BATCH_FILE) {
  console.error('Usage: node execute-batch-in-chunks.js <batch-file> [chunk-size]');
  process.exit(1);
}

const sql = fs.readFileSync(BATCH_FILE, 'utf8');

// Extract the INSERT statement header (without the opening parenthesis after VALUES)
const headerMatch = sql.match(/^(INSERT INTO questions[^)]+\) VALUES\s*)/);
if (!headerMatch) {
  console.error('❌ Could not parse SQL file');
  process.exit(1);
}

const header = headerMatch[1]; // Don't add opening parenthesis - values will be wrapped
const valuesSection = sql.substring(headerMatch[0].length);

// Split by "), (" to get individual question values
// Note: valuesSection starts with '(', and after split, first value has '(', others don't
const questionValues = valuesSection.split(/\),\s*\(/).map((val, idx, arr) => {
  if (idx === arr.length - 1) {
    return val.replace(/\);?\s*$/, ''); // Remove trailing );
  }
  // Keep the leading ( for first value, add ( for others
  return val;
});

console.log(`📦 Splitting ${BATCH_FILE}`);
console.log(`   Total questions: ${questionValues.length}`);
console.log(`   Chunk size: ${CHUNK_SIZE} questions`);
console.log(`   Number of chunks: ${Math.ceil(questionValues.length / CHUNK_SIZE)}\n`);

// Create chunks
const chunks = [];
for (let i = 0; i < questionValues.length; i += CHUNK_SIZE) {
  const chunk = questionValues.slice(i, i + CHUNK_SIZE);
  chunks.push(chunk);
}

// Output each chunk as a separate SQL file
const batchDir = path.dirname(BATCH_FILE);
const batchName = path.basename(BATCH_FILE, '.sql');
const outputDir = path.join(batchDir, `${batchName}-chunks`);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

chunks.forEach((chunk, idx) => {
  // Each value should be wrapped in parentheses and separated by commas
  // Normalize: remove any existing parentheses, then wrap consistently
  const valuesSQL = chunk.map((val) => {
    let cleanVal = val.trim();
    // Remove leading ( if present
    if (cleanVal.startsWith('(')) {
      cleanVal = cleanVal.substring(1);
    }
    // Remove trailing ) if present
    if (cleanVal.endsWith(')')) {
      cleanVal = cleanVal.slice(0, -1);
    }
    // Wrap in parentheses
    return `(${cleanVal})`;
  }).join(',\n    ');
  
  const chunkSQL = header + '(' + valuesSQL + ');'; // Add opening ( after VALUES
  
  const chunkFile = path.join(outputDir, `chunk-${String(idx + 1).padStart(2, '0')}.sql`);
  fs.writeFileSync(chunkFile, chunkSQL);
  console.log(`   ✅ Created: ${path.basename(chunkFile)} (${chunk.length} questions)`);
});

console.log(`\n💡 Execute each chunk file using: mcp_supabase_execute_sql`);
console.log(`   Chunk files are in: ${outputDir}`);

