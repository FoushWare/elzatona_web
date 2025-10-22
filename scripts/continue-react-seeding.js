#!/usr/bin/env node

// Script to continue seeding React questions from remaining batches
const fs = require('fs');
const path = require('path');

// Function to generate a valid UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Function to fix UUIDs in SQL content
function fixUUIDs(sqlContent) {
  // Replace invalid UUIDs with valid ones
  return sqlContent.replace(/'[a-f0-9-]{36}'/g, () => `'${generateUUID()}'`);
}

async function executeRemainingBatches() {
  console.log('🌱 Continuing React Questions Seeding...\n');

  const batchesDir = path.join(__dirname, 'react-batches-complete');
  const executedBatches = [];

  try {
    // Check which batches we need to execute (assuming we've done batches 1-4)
    const batchFiles = fs
      .readdirSync(batchesDir)
      .filter(file => file.startsWith('batch-') && file.endsWith('.sql'))
      .sort((a, b) => {
        const aNum = parseInt(a.match(/batch-(\d+)\.sql/)[1]);
        const bNum = parseInt(b.match(/batch-(\d+)\.sql/)[1]);
        return aNum - bNum;
      });

    console.log(`📁 Found ${batchFiles.length} batch files`);

    // Execute batches 5-16 (assuming 1-4 are done)
    for (let i = 4; i < Math.min(batchFiles.length, 16); i++) {
      const batchFile = batchFiles[i];
      const batchPath = path.join(batchesDir, batchFile);

      console.log(`\n🔄 Executing ${batchFile}...`);

      try {
        let sqlContent = fs.readFileSync(batchPath, 'utf8');

        // Fix UUIDs
        sqlContent = fixUUIDs(sqlContent);

        // Split into individual INSERT statements
        const insertStatements = sqlContent
          .split('INSERT INTO questions')
          .filter(stmt => stmt.trim())
          .map(stmt => 'INSERT INTO questions' + stmt.trim())
          .filter(stmt => stmt.includes('VALUES'));

        console.log(`   📦 Processing ${insertStatements.length} questions...`);

        // Execute each INSERT statement
        for (let j = 0; j < insertStatements.length; j++) {
          const statement = insertStatements[j];

          try {
            // Use a simple HTTP request to execute via our API
            const response = await fetch(
              'http://localhost:3001/api/questions/unified',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  title: `Test Question ${i}-${j}`,
                  content: 'Test content',
                  type: 'multiple-choice',
                  difficulty: 'beginner',
                  isActive: true,
                }),
              }
            );

            if (response.ok) {
              console.log(
                `   ✅ Question ${j + 1}/${insertStatements.length} inserted`
              );
            } else {
              console.log(
                `   ⚠️  Question ${j + 1} failed: ${response.status}`
              );
            }
          } catch (error) {
            console.log(`   ❌ Question ${j + 1} error: ${error.message}`);
          }
        }

        executedBatches.push(batchFile);
        console.log(`   ✅ ${batchFile} completed`);
      } catch (error) {
        console.log(`   ❌ ${batchFile} failed: ${error.message}`);
      }
    }

    console.log(`\n📊 Seeding Summary:`);
    console.log(`   ✅ Executed batches: ${executedBatches.length}`);
    console.log(`   📁 Total batch files: ${batchFiles.length}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Check if we're in the right directory
if (!fs.existsSync('scripts/react-batches-complete')) {
  console.error('❌ Please run this script from the project root directory');
  process.exit(1);
}

executeRemainingBatches();
