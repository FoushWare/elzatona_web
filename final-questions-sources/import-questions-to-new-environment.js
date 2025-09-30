#!/usr/bin/env node

/**
 * Import Questions to New Environment
 * 
 * Imports questions from the exported files to a new environment
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.TARGET_BASE_URL || 'http://localhost:3000';
const SOURCE_DIR = path.join(__dirname, 'final-questions-sources');

async function importQuestionsToNewEnvironment() {
  console.log('📥 Importing questions to new environment...\n');
  
  try {
    // Read master export file
    const masterFilePath = path.join(SOURCE_DIR, 'master-questions-export.json');
    
    if (!fs.existsSync(masterFilePath)) {
      throw new Error('Master export file not found. Please run export-questions-for-deployment.js first.');
    }
    
    const masterData = JSON.parse(fs.readFileSync(masterFilePath, 'utf-8'));
    const questions = masterData.questions || [];
    
    console.log(`📊 Found ${questions.length} questions to import`);
    
    // Import questions in batches
    const batchSize = 50;
    let importedCount = 0;
    let failedCount = 0;
    
    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      
      try {
        const response = await fetch(`${BASE_URL}/api/questions/unified`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bulk: true,
            questions: batch
          })
        });
        
        if (response.ok) {
          const result = await response.json();
          importedCount += result.data.success || batch.length;
          console.log(`✅ Imported batch ${Math.floor(i / batchSize) + 1}: ${result.data.success || batch.length} questions`);
        } else {
          console.log(`❌ Failed to import batch ${Math.floor(i / batchSize) + 1}: ${response.status}`);
          failedCount += batch.length;
        }
      } catch (error) {
        console.log(`❌ Error importing batch ${Math.floor(i / batchSize) + 1}: ${error.message}`);
        failedCount += batch.length;
      }
    }
    
    console.log(`\n📊 IMPORT SUMMARY`);
    console.log(`Successfully imported: ${importedCount}`);
    console.log(`Failed to import: ${failedCount}`);
    console.log(`Success rate: ${((importedCount / questions.length) * 100).toFixed(1)}%`);
    
    console.log('\n✅ Import process completed!');
    
  } catch (error) {
    console.error('❌ Import process failed:', error.message);
    process.exit(1);
  }
}

// Run the import
if (require.main === module) {
  importQuestionsToNewEnvironment();
}

module.exports = { importQuestionsToNewEnvironment };
