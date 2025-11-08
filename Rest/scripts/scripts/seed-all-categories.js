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
        // Determine question type and options
        let questionType = 'multiple-choice';
        let options = null;
        let correctAnswer = null;

        if (
          question.type === 'multiple-choice' &&
          question.options &&
          Array.isArray(question.options)
        ) {
          // Use original options if available
          options = JSON.stringify(question.options);
          correctAnswer = question.correct_answer || null;
        } else if (question.type === 'true-false') {
          // Convert to true-false with proper options
          questionType = 'true-false';
          options = JSON.stringify([
            { id: 'true', text: 'True', isCorrect: false },
            { id: 'false', text: 'False', isCorrect: true },
          ]);
          correctAnswer = 'false';
        } else {
          // Convert everything else to multiple-choice with generic options
          questionType = 'multiple-choice';
          options = JSON.stringify([
            { id: 'a', text: 'Option A', isCorrect: false },
            { id: 'b', text: 'Option B', isCorrect: false },
            { id: 'c', text: 'Option C', isCorrect: true },
            { id: 'd', text: 'Option D', isCorrect: false },
          ]);
          correctAnswer = 'c';
        }

        // Map question to our schema
        const mappedQuestion = {
          id: generateUUID(),
          title: question.title || 'Untitled Question',
          content: question.content || '',
          type: questionType,
          difficulty: question.difficulty || 'intermediate',
          points: question.points || 10,
          options: options,
          correct_answer: correctAnswer,
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
    console.error(`Error processing ${filePath}:`, error.message);
    return [];
  }
}

// Process all questions from all categories
function processAllQuestions() {
  const allSqlInserts = [];

  // Get all subdirectories
  const subdirs = fs.readdirSync(dataDir).filter(item => {
    const itemPath = path.join(dataDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  for (const subdir of subdirs) {
    const technology = technologyMappings[subdir] || subdir;
    const subdirPath = path.join(dataDir, subdir);
    const files = fs
      .readdirSync(subdirPath)
      .filter(file => file.endsWith('.json'));

    console.log(
      `\nProcessing ${technology} (${subdir}) - ${files.length} files`
    );

    for (const file of files) {
      const filePath = path.join(subdirPath, file);
      const sqlInserts = processQuestionsFromFile(filePath, technology);
      allSqlInserts.push(...sqlInserts);
    }
  }

  return allSqlInserts;
}

// Main execution
console.log('Processing all questions from JSON files...');
const allSqlInserts = processAllQuestions();

console.log(`\nGenerated ${allSqlInserts.length} INSERT statements`);

// Write to file
const outputFile = path.join(__dirname, 'seed-all-categories.sql');
fs.writeFileSync(outputFile, allSqlInserts.join('\n\n'));

console.log(`SQL file saved to: ${outputFile}`);

// Create batches
const batchSize = 50;
const batches = [];

for (let i = 0; i < allSqlInserts.length; i += batchSize) {
  const batch = allSqlInserts.slice(i, i + batchSize);
  batches.push(batch);
}

console.log(`Created ${batches.length} batches`);

// Write batch files
for (let i = 0; i < batches.length; i++) {
  const batchFile = path.join(__dirname, `seed-categories-batch-${i + 1}.sql`);
  const batchContent = batches[i].join('\n\n') + ';';
  fs.writeFileSync(batchFile, batchContent);
  console.log(`Created batch ${i + 1}: ${batches[i].length} statements`);
}

console.log(
  `\nAll batch files created! Execute them using Supabase MCP tools.`
);
