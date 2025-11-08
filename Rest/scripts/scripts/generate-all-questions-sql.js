const fs = require('fs');
const path = require('path');

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

// Process questions from a file and generate SQL
function processQuestionsFromFile(filePath, technology) {
  try {
    console.log(`Processing ${filePath}...`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const questions = JSON.parse(fileContent);

    if (!Array.isArray(questions)) {
      console.log(`Skipping ${filePath} - not an array`);
      return [];
    }

    const sqlInserts = [];

    for (const question of questions) {
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

    return sqlInserts;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
    return [];
  }
}

// Main function to generate SQL files
function generateAllQuestionsSQL() {
  console.log('Generating SQL files for all questions...');

  let totalQuestions = 0;
  const allSQL = [];

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
      const sqlInserts = processQuestionsFromFile(filePath, technology);
      allSQL.push(...sqlInserts);
      totalQuestions += sqlInserts.length;
      console.log(`Generated ${sqlInserts.length} SQL inserts from ${file}`);
    }
  }

  // Write all SQL to a single file
  const outputFile = path.join(__dirname, 'all-questions-comprehensive.sql');
  fs.writeFileSync(outputFile, allSQL.join('\n'));

  console.log(`\nTotal questions processed: ${totalQuestions}`);
  console.log(`SQL file generated: ${outputFile}`);

  // Also create batch files (50 questions each)
  const batchSize = 50;
  const batches = [];

  for (let i = 0; i < allSQL.length; i += batchSize) {
    const batch = allSQL.slice(i, i + batchSize);
    batches.push(batch);

    const batchFile = path.join(
      __dirname,
      `questions-batch-${Math.floor(i / batchSize) + 1}.sql`
    );
    fs.writeFileSync(batchFile, batch.join('\n'));
    console.log(
      `Batch ${Math.floor(i / batchSize) + 1} created: ${batchFile} (${batch.length} questions)`
    );
  }

  console.log(`\nCreated ${batches.length} batch files for easier execution`);
}

// Run the script
generateAllQuestionsSQL();
