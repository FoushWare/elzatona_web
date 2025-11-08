const fs = require('fs');
const path = require('path');

// Simulate Supabase MCP execute_sql function
async function execute_sql(query) {
  // This is a placeholder - in a real implementation, you would use the Supabase MCP
  console.log('Executing SQL query...');
  console.log('Query length:', query.length);
  return { success: true };
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

  for (const batchFile of batchFiles) {
    const batchPath = path.join(scriptsDir, batchFile);
    const sql = fs.readFileSync(batchPath, 'utf8');

    console.log(`\nExecuting ${batchFile}...`);
    try {
      const result = await execute_sql(sql);
      if (result.success) {
        console.log(`✅ ${batchFile} executed successfully`);
      } else {
        console.log(`❌ ${batchFile} failed`);
      }
    } catch (error) {
      console.log(`❌ ${batchFile} failed with error:`, error.message);
    }
  }

  console.log('\nAll batches executed!');
}

executeAllBatches().catch(console.error);
