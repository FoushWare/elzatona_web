import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSON_DIR = path.join(__dirname, '../data/json/javasciprt');

const difficultyMap = {
  easy: 'beginner',
  medium: 'intermediate',
  advanced: 'advanced',
  expert: 'advanced',
  beginner: 'beginner',
  intermediate: 'intermediate',
};

function generateExplanation(question) {
  if (
    question.type === 'open-ended' &&
    question.sampleAnswers &&
    question.sampleAnswers.length > 0
  ) {
    return question.sampleAnswers.join(' ');
  }
  if (question.type === 'multiple-choice' && question.options) {
    const correctOption = question.options.find(opt => opt.isCorrect);
    return correctOption
      ? `The correct answer is: ${correctOption.text}`
      : 'No explanation provided.';
  }
  return 'No explanation provided.';
}

function transformQuestion(question, fileBaseName) {
  const baseId = fileBaseName.replace(/\.json$/, '');
  const idPrefix = baseId.startsWith('js-') ? baseId : `javascript-${baseId}`;
  const newId = `${idPrefix}-${question.id}`;

  const topicMap = {
    '1-25QA': 'JavaScript Core Concepts',
    '26-50QA': 'ES6+ Features',
    '51-75QA': 'Async Programming',
    '76–100QA': 'DOM Manipulation',
    '101–125QA': 'Advanced JavaScript',
  };

  const topic = topicMap[fileBaseName] || 'JavaScript Fundamentals';

  const tags = ['javascript', topic.toLowerCase().replace(/\s/g, '-')];
  if (question.difficulty) {
    tags.push(difficultyMap[question.difficulty]);
  }

  return {
    id: newId,
    title: question.title,
    content: question.content,
    type: question.type,
    category: 'JavaScript',
    topic: topic,
    difficulty: difficultyMap[question.difficulty] || 'intermediate',
    learningCardId: 'core-technologies',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: tags,
    explanation: question.explanation || generateExplanation(question),
    points: 10,
    options: question.options?.map(opt => ({
      ...opt,
      explanation: opt.explanation || '',
    })),
    sampleAnswers: question.sampleAnswers,
  };
}

function main() {
  console.log('🔄 Starting transformation of JavaScript questions...');
  const files = fs.readdirSync(JSON_DIR).filter(file => file.endsWith('.json'));
  console.log(`Found ${files.length} JavaScript files to transform:`);
  files.forEach(file => console.log(`  - ${file}`));

  let totalTransformedQuestions = 0;
  files.forEach(file => {
    const filePath = path.join(JSON_DIR, file);
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const questions = JSON.parse(fileContent);
      const fileBaseName = path.basename(filePath, '.json');

      const transformedQuestions = questions.map(q =>
        transformQuestion(q, fileBaseName)
      );
      fs.writeFileSync(
        filePath,
        JSON.stringify(transformedQuestions, null, 2),
        'utf-8'
      );
      console.log(
        `✅ Transformed ${file}: ${transformedQuestions.length} questions`
      );
      totalTransformedQuestions += transformedQuestions.length;
    } catch (error) {
      console.error(`❌ Error transforming ${filePath}:`, error);
    }
  });
  console.log('\n🎉 Transformation complete!');
  console.log(`📊 Total questions transformed: ${totalTransformedQuestions}`);
  console.log(`📁 Files processed: ${files.length}`);

  console.log('\n🔍 Verifying JSON validity...');
  files.forEach(file => {
    const filePath = path.join(JSON_DIR, file);
    try {
      JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      console.log(`✅ ${file} - Valid JSON`);
    } catch (error) {
      console.error(`❌ ${file} - Invalid JSON:`, error);
    }
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
