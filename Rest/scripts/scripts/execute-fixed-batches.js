const fs = require('fs');
const path = require('path');

// This script will execute SQL batches using Supabase MCP
// Note: This is a template - the actual execution will be done via MCP tools

async function executeBatch(batchFile) {
  const batchPath = path.join(__dirname, batchFile);
  const sql = fs.readFileSync(batchPath, 'utf8');

  console.log(`\nExecuting ${batchFile}...`);
  console.log(`SQL length: ${sql.length} characters`);

  // Split into individual INSERT statements
  const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);

  console.log(`Found ${statements.length} INSERT statements`);

  // For now, just log the first few statements as an example
  statements.slice(0, 3).forEach((stmt, index) => {
    console.log(`Statement ${index + 1}: ${stmt.trim().substring(0, 100)}...`);
  });

  return { success: true, statements: statements.length };
}

async function executeAllBatches() {
  const scriptsDir = path.join(__dirname);
  const batchFiles = fs
    .readdirSync(scriptsDir)
    .filter(
      file => file.startsWith('questions-batch-') && file.endsWith('.sql')
    )
    .sort((a, b) => {
      const aNum = parseInt(a.match(/questions-batch-(\d+)\.sql/)[1]);
      const bNum = parseInt(b.match(/questions-batch-(\d+)\.sql/)[1]);
      return aNum - bNum;
    });

  console.log(`Found ${batchFiles.length} batch files to execute`);

  let totalStatements = 0;
  for (const batchFile of batchFiles) {
    try {
      const result = await executeBatch(batchFile);
      if (result.success) {
        console.log(
          `✅ ${batchFile} processed successfully (${result.statements} statements)`
        );
        totalStatements += result.statements;
      } else {
        console.log(`❌ ${batchFile} failed`);
      }
    } catch (error) {
      console.log(`❌ ${batchFile} failed with error:`, error.message);
    }
  }

  console.log(`\nTotal statements processed: ${totalStatements}`);
  console.log('All batches processed!');
}

executeAllBatches().catch(console.error);
