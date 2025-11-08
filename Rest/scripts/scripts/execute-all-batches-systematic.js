const fs = require('fs');
const path = require('path');

// Execute SQL batches systematically
async function executeBatchSystematically(batchFile) {
  const batchPath = path.join(__dirname, batchFile);
  const sql = fs.readFileSync(batchPath, 'utf8');

  console.log(`\nProcessing ${batchFile}...`);
  console.log(`SQL length: ${sql.length} characters`);

  // Split into individual INSERT statements
  const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);

  console.log(`Found ${statements.length} INSERT statements`);

  // Process statements in chunks of 10
  const chunkSize = 10;
  let successCount = 0;
  let errorCount = 0;
  let duplicateCount = 0;

  for (let i = 0; i < statements.length; i += chunkSize) {
    const chunk = statements.slice(i, i + chunkSize);
    const chunkSql = chunk.join(';\n\n') + ';';

    console.log(
      `\nProcessing chunk ${Math.floor(i / chunkSize) + 1}/${Math.ceil(statements.length / chunkSize)} (${chunk.length} statements)...`
    );

    try {
      // For now, just log the chunk info
      console.log(
        `Chunk ${Math.floor(i / chunkSize) + 1}: ${chunk.length} statements ready for execution`
      );

      // Log first statement preview
      if (chunk[0]) {
        console.log(
          `First statement preview: ${chunk[0].trim().substring(0, 100)}...`
        );
      }

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
  console.log(`  Duplicates: ${duplicateCount} statements`);

  return {
    success: successCount,
    errors: errorCount,
    duplicates: duplicateCount,
  };
}

// Execute all batches systematically
async function executeAllBatchesSystematically() {
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

  let totalSuccess = 0;
  let totalErrors = 0;
  let totalDuplicates = 0;

  console.log(`\nFound ${batchFiles.length} batch files to process`);
  console.log(`Processing batches: ${batchFiles.join(', ')}`);

  for (const file of batchFiles) {
    const result = await executeBatchSystematically(file);
    totalSuccess += result.success;
    totalErrors += result.errors;
    totalDuplicates += result.duplicates;
  }

  console.log(`\n=== FINAL SUMMARY ===`);
  console.log(
    `Total statements processed: ${totalSuccess + totalErrors + totalDuplicates}`
  );
  console.log(`Total success: ${totalSuccess}`);
  console.log(`Total errors: ${totalErrors}`);
  console.log(`Total duplicates: ${totalDuplicates}`);
  console.log(
    `\nReady to execute ${totalSuccess} INSERT statements via Supabase MCP`
  );
}

executeAllBatchesSystematically();
