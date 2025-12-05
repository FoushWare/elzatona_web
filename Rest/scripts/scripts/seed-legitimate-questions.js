const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
  'System Design': 'bd289118-05c1-42ae-9e69-772a60bfb2c5',
};

async function seedQuestions() {
  console.log('🚀 Starting legitimate questions seeding...');

  const dataDir = path.join(__dirname, '../apps/admin/network/data/json');
  const technologies = [
    'html',
    'css',
    'javasciprt',
    'React',
    'nextjs',
    'design-patterns',
    'performance-patterns',
    'rendering-patterns',
    'security',
    'system_design',
  ];

  let totalQuestions = 0;

  for (const tech of technologies) {
    const techDir = path.join(dataDir, tech);
    if (!fs.existsSync(techDir)) continue;

    console.log(`\n📁 Processing ${tech}...`);

    const files = fs.readdirSync(techDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(techDir, file);
      const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      console.log(`  📄 ${file}: ${questions.length} questions`);

      for (const q of questions) {
        if (!q.title || !q.content) continue;

        const categoryId = categoryMap[q.category] || categoryMap[tech];
        if (!categoryId) continue;

        const questionData = {
          id: genUUID(),
          title: q.title,
          content: q.content,
          type: q.type === 'multiple-choice' ? 'multiple-choice' : 'open-ended',
          difficulty: q.difficulty || 'beginner',
          points: q.points || 2,
          options: q.options || null,
          correct_answer: q.correct_answer || null,
          explanation: q.explanation || null,
          test_cases: q.test_cases || null,
          hints: q.hints || [],
          tags:
            q.tags ||
            [q.category?.toLowerCase(), q.topic?.toLowerCase()].filter(Boolean),
          stats: JSON.stringify({
            views: 0,
            attempts: 0,
            correct_attempts: 0,
            average_time: 0,
          }),
          metadata: JSON.stringify({
            original_id: q.id,
            original_type: q.type,
            topic: q.topic,
            subcategory: q.subcategory,
            learning_card_id: q.learningCardId,
            created_by: 'admin',
            updated_by: 'system',
          }),
          category_id: categoryId,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        try {
          const { error } = await supabase
            .from('questions')
            .insert(questionData);
          if (error) {
            console.error(`    ❌ Error inserting question: ${error.message}`);
          } else {
            totalQuestions++;
          }
        } catch (err) {
          console.error(`    ❌ Error: ${err.message}`);
        }
      }
    }
  }

  console.log(`\n✅ Seeding completed! Total questions: ${totalQuestions}`);
}

function genUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

seedQuestions().catch(console.error);
