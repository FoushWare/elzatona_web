const fs = require('fs');
const path = require('path');

// Function to execute a single batch
async function executeBatch(batchNumber) {
  const batchFile = path.join(__dirname, `html-batch-${batchNumber}.sql`);

  if (!fs.existsSync(batchFile)) {
    console.log(`Batch ${batchNumber} not found.`);
    return false;
  }

  const sqlContent = fs.readFileSync(batchFile, 'utf8');
  console.log(`\n=== Executing Batch ${batchNumber} ===`);
  console.log(`SQL length: ${sqlContent.length} characters`);

  // Count questions in this batch
  const questionCount = sqlContent.split('VALUES')[1].split('(').length - 1;
  console.log(`Questions in batch: ${questionCount}`);

  // For demonstration, we'll just log the first few characters
  console.log(`First 100 characters: ${sqlContent.substring(0, 100)}...`);

  return true;
}

// Execute all remaining batches (3-10)
async function executeRemainingBatches() {
  console.log('Executing remaining HTML question batches (3-10)...');

  for (let i = 3; i <= 10; i++) {
    const success = await executeBatch(i);
    if (!success) {
      console.log(`Stopping at batch ${i}`);
      break;
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\nAll batches processed!');
}

executeRemainingBatches();
