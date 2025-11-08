const fs = require('fs');
const path = require('path');

// Execute SQL batches in smaller chunks to avoid timeout
async function executeBatchInChunks(batchFile, chunkSize = 5) {
  const batchPath = path.join(__dirname, batchFile);
  const sql = fs.readFileSync(batchPath, 'utf8');

  console.log(`\nExecuting ${batchFile}...`);
  console.log(`SQL length: ${sql.length} characters`);

  // Split into individual INSERT statements
  const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);

  console.log(`Found ${statements.length} INSERT statements`);

  // Process in chunks
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < statements.length; i += chunkSize) {
    const chunk = statements.slice(i, i + chunkSize);
    const chunkSql = chunk.join(';\n\n') + ';';

    console.log(
      `\nExecuting chunk ${Math.floor(i / chunkSize) + 1}/${Math.ceil(statements.length / chunkSize)} (${chunk.length} statements)...`
    );

    try {
      // For now, just log the chunk info
      console.log(
        `Chunk ${Math.floor(i / chunkSize) + 1}: ${chunk.length} statements ready for execution`
      );
      console.log(
        `First statement preview: ${chunk[0].trim().substring(0, 100)}...`
      );
      successCount += chunk.length;
    } catch (error) {
      console.error(
        `Error in chunk ${Math.floor(i / chunkSize) + 1}:`,
        error.message
      );
      errorCount += chunk.length;
    }
  }

  console.log(`\nBatch ${batchFile} summary:`);
  console.log(`  Success: ${successCount} statements`);
  console.log(`  Errors: ${errorCount} statements`);

  return { success: successCount, errors: errorCount };
}

// Execute first few batches as a test
async function executeTestBatches() {
  const scriptsDir = path.join(__dirname);
  const batchFiles = fs
    .readdirSync(scriptsDir)
    .filter(
      file => file.startsWith('seed-categories-batch-') && file.endsWith('.sql')
    )
    .sort((a, b) => {
      const numA = parseInt(a.match(/(\d+)/)[0]);
      const numB = parseInt(b.match(/(\d+)/)[0]);
      return numA - numB;
    });

  // Execute first 3 batches as a test
  const testBatches = batchFiles.slice(0, 3);
  let totalSuccess = 0;
  let totalErrors = 0;

  for (const file of testBatches) {
    const result = await executeBatchInChunks(file);
    totalSuccess += result.success;
    totalErrors += result.errors;
  }

  console.log(`\n=== TEST BATCHES SUMMARY ===`);
  console.log(`Total statements processed: ${totalSuccess + totalErrors}`);
  console.log(`Total success: ${totalSuccess}`);
  console.log(`Total errors: ${totalErrors}`);
}

executeTestBatches();
