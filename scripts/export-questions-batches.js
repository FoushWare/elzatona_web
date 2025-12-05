/**
 * Export questions from Supabase database to local JSON files in batches
 * 
 * Usage: 
 *   node scripts/export-questions-batches.js [batchSize] [startBatch] [startOffset]
 * 
 * Examples:
 *   node scripts/export-questions-batches.js 50 1 10    // Export 50 questions per batch, start from batch 1, offset 10
 *   node scripts/export-questions-batches.js 100        // Export 100 questions per batch, start from batch 1, offset 0
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuration (environment variables required)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Error: Missing required Supabase environment variables');
  console.error('   NEXT_PUBLIC_SUPABASE_URL and (SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY) must be set');
  process.exit(1);
}

const OUTPUT_DIR = path.join(__dirname, '..', 'Rest', 'questions-vo2');
const DEFAULT_BATCH_SIZE = 50;

// Get command line arguments
const batchSize = parseInt(process.argv[2]) || DEFAULT_BATCH_SIZE;
const startBatch = parseInt(process.argv[3]) || 1;
const startOffset = parseInt(process.argv[4]) || 0;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✅ Created directory: ${OUTPUT_DIR}`);
}

/**
 * Fetch questions batch from Supabase
 */
async function fetchQuestionsBatch(offset, limit) {
  try {
    const { data, error, count } = await supabase
      .from('questions')
      .select(
        `
        id,
        title,
        content,
        type,
        difficulty,
        explanation,
        options,
        resources,
        points,
        is_active,
        created_at,
        updated_at
        `,
        { count: 'exact' }
      )
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    // Transform data to match expected format
    const transformedData = (data || []).map(q => ({
      id: q.id,
      title: q.title,
      content: q.content,
      type: q.type,
      difficulty: q.difficulty,
      explanation: q.explanation,
      options: q.options,
      resources: q.resources,
      points: q.points,
      isActive: q.is_active,
      createdAt: q.created_at,
      updatedAt: q.updated_at,
    }));

    return {
      questions: transformedData,
      totalCount: count || 0,
    };
  } catch (error) {
    console.error(`❌ Error fetching questions:`, error.message);
    throw error;
  }
}

/**
 * Save batch to JSON file
 */
function saveBatchToFile(batchNumber, questions) {
  const filename = `questions-batch-${String(batchNumber).padStart(3, '0')}.json`;
  const filepath = path.join(OUTPUT_DIR, filename);
  
  const jsonContent = JSON.stringify(questions, null, 2);
  fs.writeFileSync(filepath, jsonContent, 'utf8');
  
  return filepath;
}

/**
 * Get total question count
 */
async function getTotalQuestionCount() {
  try {
    const { count, error } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return count || 0;
  } catch (error) {
    console.error(`❌ Error getting total count:`, error.message);
    throw error;
  }
}

/**
 * Main export function
 */
async function exportQuestions() {
  console.log(`\n🚀 Starting question export...`);
  console.log(`📊 Configuration:`);
  console.log(`   - Supabase URL: ${SUPABASE_URL}`);
  console.log(`   - Batch size: ${batchSize} questions per file`);
  console.log(`   - Starting from batch: ${startBatch}`);
  console.log(`   - Starting offset: ${startOffset}`);
  console.log(`   - Output directory: ${OUTPUT_DIR}\n`);

  try {
    // Get total question count
    const totalQuestions = await getTotalQuestionCount();
    console.log(`📈 Total questions in database: ${totalQuestions}\n`);

    if (totalQuestions === 0) {
      console.log(`⚠️  No questions found in database. Exiting.`);
      return;
    }

    const totalBatches = Math.ceil(totalQuestions / batchSize);
    let currentBatch = startBatch;
    let currentOffset = startOffset;
    let totalExported = startOffset;

    console.log(`📦 Will process approximately ${totalBatches} batches\n`);

    while (currentOffset < totalQuestions) {
      const limit = Math.min(batchSize, totalQuestions - currentOffset);
      
      console.log(`\n📦 Processing batch ${currentBatch}...`);
      console.log(`   Fetching questions ${currentOffset + 1} to ${currentOffset + limit} of ${totalQuestions}...`);
      
      try {
        // Fetch questions for this batch
        const { questions, totalCount } = await fetchQuestionsBatch(currentOffset, limit);
        
        if (!questions || questions.length === 0) {
          console.log(`⚠️  No more questions found. Stopping export.`);
          break;
        }

        // Save to file
        const filepath = saveBatchToFile(currentBatch, questions);
        
        totalExported += questions.length;
        console.log(`   ✅ Saved ${questions.length} questions → ${path.basename(filepath)}`);
        console.log(`   📊 Progress: ${totalExported}/${totalQuestions} (${Math.round((totalExported / totalQuestions) * 100)}%)`);
        
        // If we got fewer questions than the batch size, we've reached the end
        if (questions.length < limit) {
          console.log(`\n✅ Reached end of questions. Export complete!`);
          break;
        }
        
        currentBatch++;
        currentOffset += batchSize;
        
        // Add a small delay to avoid overwhelming the database
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`❌ Error processing batch ${currentBatch}:`, error.message);
        console.error(`   Skipping to next batch...\n`);
        currentBatch++;
        currentOffset += batchSize;
        continue;
      }
    }

    console.log(`\n🎉 Export complete!`);
    console.log(`   Total questions exported: ${totalExported}`);
    console.log(`   Total batches created: ${currentBatch - startBatch}`);
    console.log(`   Files saved to: ${OUTPUT_DIR}\n`);

    // Create/update README
    const readmePath = path.join(OUTPUT_DIR, 'README.md');
    const readmeContent = `# Questions Export - Version 2

This directory contains exported questions from the Supabase database, organized in batches.

## Structure

- Each file contains an array of question objects in JSON format
- Files are named: \`questions-batch-XXX.json\` where XXX is a 3-digit batch number
- Each batch contains up to ${batchSize} questions (configurable)

## File Format

Each question object contains:
- \`id\`: Unique question identifier
- \`title\`: Question title
- \`content\`: Question content/text
- \`type\`: Question type (multiple-choice, code, etc.)
- \`difficulty\`: Difficulty level (beginner, intermediate, advanced)
- \`explanation\`: Explanation for the answer
- \`options\`: Answer options (for multiple-choice questions)
- \`resources\`: Learning resources array
- \`points\`: Points value
- \`isActive\`: Active status
- \`createdAt\`: Creation timestamp
- \`updatedAt\`: Last update timestamp

## Usage

These files can be used for:
- Reviewing questions locally
- Data migration
- Backup purposes
- Quality assurance

## Export Status

- Total questions in database: ${totalQuestions}
- Total batches exported: ${currentBatch - startBatch}
- Total questions exported: ${totalExported}
- Batch size: ${batchSize} questions per file
- Last updated: ${new Date().toISOString()}
`;

    fs.writeFileSync(readmePath, readmeContent, 'utf8');
    console.log(`📝 Updated README.md\n`);

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the export
if (require.main === module) {
  exportQuestions().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { exportQuestions, fetchQuestionsBatch, saveBatchToFile };

