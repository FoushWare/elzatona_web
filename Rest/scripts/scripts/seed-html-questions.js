const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Category mappings
const categoryMap = {
  HTML: 'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
  CSS: '3bd9c23e-6e43-4234-b741-ef78955a90a0',
  JavaScript: '70970873-3e49-46ec-91e0-2777ff9b9b42',
  React: '36d38588-6d79-4457-b5a9-89eac44e8207',
  'Next.js': '9686f91c-d21e-4b1b-a5b9-9f702a58631e',
  'Design Patterns': '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
  Performance: 'e9377536-8288-44c0-840c-f2c2f0f3d817',
  'Rendering Patterns': '3f42766a-740c-48ee-9cca-e3a023221d77',
  Security: '12d5c7b3-cb41-4238-87e5-1fc5fb6ac42c',
  'System Design': '8a9b2c3d-4e5f-6789-abcd-ef0123456789',
};

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

// Function to seed HTML questions
async function seedHTMLQuestions() {
  console.log('🌱 Seeding HTML Questions...');

  try {
    const htmlDir = path.join(
      __dirname,
      '../apps/admin/network/data/json/html'
    );
    const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.json'));

    const allQuestions = [];
    const htmlCategoryId = categoryMap['HTML'];

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

    // Generate SQL batches
    const batchSize = 20;
    let batchNumber = 1;

    for (let i = 0; i < allQuestions.length; i += batchSize) {
      const batch = allQuestions.slice(i, i + batchSize);
      const sqlContent = generateBatchSQL(batch, batchNumber);

      const sqlFile = path.join(__dirname, `html-batch-${batchNumber}.sql`);
      fs.writeFileSync(sqlFile, sqlContent);

      console.log(`✅ Generated ${sqlFile}`);
      batchNumber++;
    }

    console.log(
      `🎉 HTML Questions SQL Generated! ${batchNumber - 1} batches created.`
    );
  } catch (error) {
    console.error('❌ Error seeding HTML questions:', error);
  }
}

// Run the script
seedHTMLQuestions();
