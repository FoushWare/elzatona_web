const fs = require('fs');
const path = require('path');

// Topic mapping based on file names and question content
const topicMapping = {
  'rendering.json': 'Static Rendering',
  'rendering-2.json': 'Server-Side Rendering',
  'rendering-4.json': 'Client-Side Rendering',
  'rendering-5.json': 'Hybrid Rendering',
  'render-6.json': 'Edge Rendering',
  'render-7.json': 'Progressive Hydration',
  'rendering-8.json': 'Streaming Rendering',
  'rendering-9.json': 'Resumability',
  'rendering-10.json': 'Advanced Patterns',
  'island-archeticure.json': 'Islands Architecture',
};

// Difficulty mapping
const difficultyMapping = {
  easy: 'beginner',
  medium: 'intermediate',
  hard: 'advanced',
  advanced: 'advanced',
  expert: 'advanced',
};

function transformQuestion(oldQuestion, fileName, questionIndex) {
  const topic = topicMapping[fileName] || 'Rendering Patterns';
  const baseId = fileName.replace('.json', '').replace('-', '');

  return {
    id: `rendering-patterns-${baseId}-${questionIndex + 1}`,
    title: oldQuestion.title,
    content: oldQuestion.content,
    type: oldQuestion.type,
    category: 'Rendering Patterns',
    topic: topic,
    difficulty: difficultyMapping[oldQuestion.difficulty] || 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', topic.toLowerCase().replace(/\s+/g, '-')],
    explanation: generateExplanation(oldQuestion),
    points: 10,
    sampleAnswers: oldQuestion.sampleAnswers,
    options: oldQuestion.options,
  };
}

function generateExplanation(question) {
  if (question.type === 'multiple-choice' && question.options) {
    const correctOption = question.options.find(opt => opt.isCorrect);
    return correctOption ? correctOption.text : question.content;
  } else if (question.sampleAnswers && question.sampleAnswers.length > 0) {
    return question.sampleAnswers[0];
  }
  return question.content;
}

function transformFile(filePath) {
  console.log(`Processing ${filePath}...`);

  const fileName = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const oldQuestions = JSON.parse(fileContent);

  const newQuestions = oldQuestions.map((question, index) =>
    transformQuestion(question, fileName, index)
  );

  // Write the transformed file
  fs.writeFileSync(filePath, JSON.stringify(newQuestions, null, 2));
  console.log(`✅ Transformed ${fileName}: ${newQuestions.length} questions`);
}

function main() {
  const renderingPatternsDir = path.join(
    __dirname,
    '../data/json/rendering-patterns'
  );

  console.log('🔄 Starting transformation of rendering-patterns files...');

  const files = fs
    .readdirSync(renderingPatternsDir)
    .filter(file => file.endsWith('.json'))
    .sort();

  console.log(`Found ${files.length} files to transform:`);
  files.forEach(file => console.log(`  - ${file}`));

  let totalQuestions = 0;

  files.forEach(file => {
    const filePath = path.join(renderingPatternsDir, file);
    transformFile(filePath);

    // Count questions in the transformed file
    const content = fs.readFileSync(filePath, 'utf-8');
    const questions = JSON.parse(content);
    totalQuestions += questions.length;
  });

  console.log(`\n🎉 Transformation complete!`);
  console.log(`📊 Total questions transformed: ${totalQuestions}`);
  console.log(`📁 Files processed: ${files.length}`);

  // Verify all files are valid JSON
  console.log('\n🔍 Verifying JSON validity...');
  files.forEach(file => {
    const filePath = path.join(renderingPatternsDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      JSON.parse(content);
      console.log(`✅ ${file} - Valid JSON`);
    } catch (error) {
      console.error(`❌ ${file} - Invalid JSON:`, error);
    }
  });
}

if (require.main === module) {
  main();
}

module.exports = { transformQuestion, transformFile };
