const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjE0NzQzMCwiZXhwIjoyMDQ3NzIzNDMwfQ.8K8v8K8v8K8v8K8v8K8v8K8v8K8v8K8v8K8v8K8v8K8';

const supabase = createClient(supabaseUrl, supabaseKey);

// Data directory
const dataDir = path.join(__dirname, '../apps/admin/network/data/json');

// Technology mappings
const technologyMappings = {
  css: 'CSS',
  html: 'HTML',
  javasciprt: 'JavaScript',
  React: 'React',
  nextjs: 'Next.js',
  'design-patterns': 'Design Patterns',
  'performance-patterns': 'Performance',
  'rendering-patterns': 'Rendering Patterns',
  security: 'Security',
  system_design: 'System Design',
};

// Generate UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Process questions from a file
async function processQuestionsFromFile(filePath, technology) {
  try {
    console.log(`Processing ${filePath}...`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const questions = JSON.parse(fileContent);

    if (!Array.isArray(questions)) {
      console.log(`Skipping ${filePath} - not an array`);
      return 0;
    }

    let processedCount = 0;
    const batchSize = 10;

    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      const sqlInserts = [];

      for (const question of batch) {
        try {
          // Map question to our schema
          const mappedQuestion = {
            id: generateUUID(),
            title: question.title || 'Untitled Question',
            content: question.content || '',
            type:
              question.type === 'open-ended'
                ? 'multiple-choice'
                : question.type || 'multiple-choice',
            difficulty: question.difficulty || 'intermediate',
            points: question.points || 10,
            options: question.options ? JSON.stringify(question.options) : null,
            correct_answer: question.correct_answer || null,
            explanation: question.explanation || '',
            test_cases: question.test_cases
              ? JSON.stringify(question.test_cases)
              : null,
            hints: question.hints
              ? JSON.stringify(question.hints)
              : 'ARRAY[]::text[]',
            tags: question.tags
              ? JSON.stringify(question.tags)
              : JSON.stringify([technology.toLowerCase()]),
            stats: JSON.stringify({
              views: 0,
              attempts: 0,
              correct_attempts: 0,
              average_time: 0,
            }),
            metadata: JSON.stringify({
              original_id: question.id,
              original_type: question.type,
              topic: question.topic || technology,
              subcategory: question.subcategory || '',
              sample_answers: question.sampleAnswers || [],
              time_limit: question.timeLimit || 120,
              related_links: question.relatedLinks || [],
              created_by: question.createdBy || 'system',
              updated_by: question.updatedBy || 'system',
              technology: technology,
            }),
            category_id: 'db86beef-f5b8-4ffc-93b5-6ba95a360f58', // HTML category ID
            is_active: question.isActive !== false,
            created_at: question.createdAt || new Date().toISOString(),
            updated_at: question.updatedAt || new Date().toISOString(),
          };

          // Generate SQL INSERT
          const sql = `INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
            '${mappedQuestion.id}',
            '${mappedQuestion.title.replace(/'/g, "''")}',
            '${mappedQuestion.content.replace(/'/g, "''")}',
            '${mappedQuestion.type}',
            '${mappedQuestion.difficulty}',
            ${mappedQuestion.points},
            ${mappedQuestion.options ? `'${mappedQuestion.options.replace(/'/g, "''")}'` : 'NULL'},
            ${mappedQuestion.correct_answer ? `'${mappedQuestion.correct_answer.replace(/'/g, "''")}'` : 'NULL'},
            '${mappedQuestion.explanation.replace(/'/g, "''")}',
            ${mappedQuestion.test_cases ? `'${mappedQuestion.test_cases.replace(/'/g, "''")}'` : 'NULL'},
            ${mappedQuestion.hints},
            '${mappedQuestion.tags.replace(/'/g, "''")}',
            '${mappedQuestion.stats.replace(/'/g, "''")}',
            '${mappedQuestion.metadata.replace(/'/g, "''")}',
            '${mappedQuestion.category_id}',
            ${mappedQuestion.is_active},
            '${mappedQuestion.created_at}',
            '${mappedQuestion.updated_at}'
          );`;

          sqlInserts.push(sql);
        } catch (error) {
          console.error(
            `Error processing question in ${filePath}:`,
            error.message
          );
        }
      }

      // Execute batch
      if (sqlInserts.length > 0) {
        try {
          const { error } = await supabase.rpc('execute_sql', {
            query: sqlInserts.join('\n'),
          });

          if (error) {
            console.error(
              `Error executing batch from ${filePath}:`,
              error.message
            );
          } else {
            processedCount += sqlInserts.length;
            console.log(
              `Processed ${sqlInserts.length} questions from ${filePath}`
            );
          }
        } catch (error) {
          console.error(`Error executing SQL batch:`, error.message);
        }
      }
    }

    return processedCount;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
    return 0;
  }
}

// Main function
async function seedAllQuestions() {
  console.log('Starting comprehensive question seeding...');

  let totalProcessed = 0;

  // Process each technology directory
  for (const [dirName, technology] of Object.entries(technologyMappings)) {
    const techDir = path.join(dataDir, dirName);

    if (!fs.existsSync(techDir)) {
      console.log(`Directory ${techDir} does not exist, skipping...`);
      continue;
    }

    console.log(`\nProcessing ${technology} questions...`);

    const files = fs
      .readdirSync(techDir)
      .filter(file => file.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(techDir, file);
      const processed = await processQuestionsFromFile(filePath, technology);
      totalProcessed += processed;
    }
  }

  console.log(`\nTotal questions processed: ${totalProcessed}`);
}

// Run the script
seedAllQuestions().catch(console.error);
