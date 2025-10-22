const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Test with just a few questions from HTML
async function testSeeding() {
  console.log('🧪 Testing Question Seeding...');

  try {
    // Load a small sample of HTML questions
    const htmlFile = path.join(
      __dirname,
      '../apps/admin/network/data/json/html/html-01.json'
    );
    const fileContent = fs.readFileSync(htmlFile, 'utf8');
    const questions = JSON.parse(fileContent);

    console.log(`📄 Loaded ${questions.length} questions from html-01.json`);

    // Get HTML category ID
    const htmlCategoryId = 'db86beef-f5b8-4ffc-93b5-6ba95a360f58';

    // Map first 3 questions to schema
    const testQuestions = questions.slice(0, 3).map((question, index) => {
      const questionId = uuidv4();

      return {
        id: questionId,
        title:
          question.question || question.title || `HTML Question ${index + 1}`,
        content: question.question || question.content || '',
        type: 'multiple-choice',
        difficulty: question.difficulty || 'beginner',
        points: question.points || 2,
        options: question.options || null,
        correct_answer: question.correct_answer || question.answer || null,
        explanation: question.explanation || question.solution || '',
        test_cases: null,
        hints: question.hints || null,
        tags: question.tags || ['html', 'basics'],
        stats: JSON.stringify({
          views: 0,
          attempts: 0,
          correct_attempts: 0,
          average_time: 0,
        }),
        metadata: JSON.stringify({
          original_id: question.id || questionId,
          original_type: question.type || 'multiple-choice',
          topic: 'HTML Basics',
          subcategory: question.subcategory || '',
          sample_answers: question.sample_answers || [],
          time_limit: question.time_limit || 120,
          related_links: question.related_links || [],
          created_by: 'system',
          updated_by: 'system',
          technology: 'HTML',
        }),
        category_id: htmlCategoryId,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    });

    console.log('📊 Test questions prepared:');
    testQuestions.forEach((q, i) => {
      console.log(`  ${i + 1}. ${q.title}`);
    });

    // Generate SQL for these test questions
    let sqlContent = '-- Test Questions Seeding\n';
    sqlContent +=
      'INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES\n';

    const values = testQuestions.map(q => {
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
        : 'NULL';
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

    sqlContent += values.join(',\n') + ';\n';

    // Write SQL file
    const sqlFile = path.join(__dirname, 'test-questions.sql');
    fs.writeFileSync(sqlFile, sqlContent);
    console.log(`✅ Test SQL generated: ${sqlFile}`);

    console.log('\n🎉 Test Questions Preparation Completed!');
    console.log('📋 Next Steps:');
    console.log('1. Execute the generated SQL file in Supabase SQL Editor');
    console.log('2. Verify the test questions are properly seeded');
    console.log('3. If successful, proceed with full seeding');
  } catch (error) {
    console.error('❌ Error during test seeding:', error);
  }
}

// Run the test
testSeeding();
