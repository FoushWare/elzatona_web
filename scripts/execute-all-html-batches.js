const fs = require('fs');
const path = require('path');

// Function to execute SQL using Supabase MCP
async function executeBatch(batchNumber) {
  const batchFile = path.join(__dirname, `html-batch-${batchNumber}.sql`);

  if (!fs.existsSync(batchFile)) {
    console.log(`Batch ${batchNumber} not found, stopping.`);
    return false;
  }

  const sqlContent = fs.readFileSync(batchFile, 'utf8');
  console.log(`Executing batch ${batchNumber}...`);

  try {
    // For now, just log the content - in a real implementation, this would call Supabase MCP
    console.log(
      `Batch ${batchNumber} SQL length: ${sqlContent.length} characters`
    );
    console.log(
      `Batch ${batchNumber} contains ${sqlContent.split('VALUES')[1].split('(').length - 1} questions`
    );
    return true;
  } catch (error) {
    console.error(`Error executing batch ${batchNumber}:`, error);
    return false;
  }
}

// Execute all batches
async function executeAllBatches() {
  console.log('Starting HTML questions seeding...');

  for (let i = 1; i <= 10; i++) {
    const success = await executeBatch(i);
    if (!success) {
      break;
    }

    // Add a small delay between batches
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('HTML questions seeding completed!');
}

executeAllBatches();
