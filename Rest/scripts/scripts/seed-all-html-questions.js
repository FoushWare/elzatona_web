const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Function to map question to Supabase schema
function mapQuestionToSchema(question, technology, topic, categoryId) {
  const questionId = uuidv4();

  return {
    id: questionId,
    title: question.question || question.title || 'Untitled Question',
    content: question.question || question.content || '',
    type: 'multiple-choice',
    difficulty: question.difficulty || 'intermediate',
    points: question.points || 2,
    options: question.options || null,
    correct_answer: question.correct_answer || question.answer || null,
    explanation: question.explanation || question.solution || '',
    test_cases: null,
    hints: question.hints || null,
    tags: question.tags || [technology.toLowerCase(), topic.toLowerCase()],
    stats: JSON.stringify({
      views: 0,
      attempts: 0,
      correct_attempts: 0,
      average_time: 0,
    }),
    metadata: JSON.stringify({
      original_id: question.id || questionId,
      original_type: question.type || 'multiple-choice',
      topic: topic,
      subcategory: question.subcategory || '',
      sample_answers: question.sample_answers || [],
      time_limit: question.time_limit || 120,
      related_links: question.related_links || [],
      created_by: 'system',
      updated_by: 'system',
      technology: technology,
    }),
    category_id: categoryId,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// Function to generate SQL for a batch of questions
function generateBatchSQL(questions, batchNumber) {
  let sqlContent = `-- Batch ${batchNumber}: ${questions.length} questions\n`;
  sqlContent +=
    'INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES\n';

  const values = questions.map(q => {
    const options = q.options
      ? `'${JSON.stringify(q.options).replace(/'/g, "''")}'`
      : 'NULL';
    const correctAnswer = q.correct_answer
      ? `'${q.correct_answer.replace(/'/g, "''")}'`
      : 'NULL';
    const explanation = q.explanation
      ? `'${q.explanation.replace(/'/g, "''")}'`
      : 'NULL';
    const hints = q.hints
      ? `'${JSON.stringify(q.hints).replace(/'/g, "''")}'`
      : 'ARRAY[]::text[]';
    const tags =
      q.tags && q.tags.length > 0
        ? `ARRAY[${q.tags.map(tag => `'${tag.replace(/'/g, "''")}'`).join(',')}]`
        : 'ARRAY[]::text[]';
    const stats = q.stats
      ? `'${q.stats.replace(/'/g, "''")}'`
      : '\'{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}\'';
    const metadata = q.metadata
      ? `'${q.metadata.replace(/'/g, "''")}'`
      : "'{}'";

    return `('${q.id}', '${(q.title || '').replace(/'/g, "''")}', '${(q.content || '').replace(/'/g, "''")}', '${q.type}', '${q.difficulty}', ${q.points}, ${options}, ${correctAnswer}, ${explanation}, NULL, ${hints}, ${tags}, ${stats}, ${metadata}, '${q.category_id}', ${q.is_active}, '${q.created_at}', '${q.updated_at}')`;
  });

  sqlContent += values.join(',\n') + ';\n\n';
  return sqlContent;
}

// Function to seed all remaining HTML questions
async function seedAllHTMLQuestions() {
  console.log('🌱 Seeding All HTML Questions...');

  try {
    const htmlDir = path.join(
      __dirname,
      '../apps/admin/network/data/json/html'
    );
    const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.json'));

    const allQuestions = [];
    const htmlCategoryId = 'db86beef-f5b8-4ffc-93b5-6ba95a360f58';

    for (const file of files) {
      const filePath = path.join(htmlDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const questions = JSON.parse(fileContent);

      console.log(`📄 ${file}: ${questions.length} questions`);

      for (const question of questions) {
        const mappedQuestion = mapQuestionToSchema(
          question,
          'HTML',
          'HTML Basics',
          htmlCategoryId
        );
        allQuestions.push(mappedQuestion);
      }
    }

    console.log(`📊 Total HTML questions: ${allQuestions.length}`);

    // Generate SQL for all questions
    const sqlContent = generateBatchSQL(allQuestions, 'All HTML');

    const sqlFile = path.join(__dirname, 'all-html-questions.sql');
    fs.writeFileSync(sqlFile, sqlContent);

    console.log(`✅ Generated ${sqlFile}`);
    console.log(
      `🎉 All HTML Questions SQL Generated! ${allQuestions.length} questions ready.`
    );
  } catch (error) {
    console.error('❌ Error seeding HTML questions:', error);
  }
}

// Run the script
seedAllHTMLQuestions();
