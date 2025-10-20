import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSON_DIR = path.join(__dirname, '../data/json/system_design');

const difficultyMap = {
  easy: 'beginner',
  intermediate: 'intermediate',
  advanced: 'advanced',
  beginner: 'beginner',
  expert: 'advanced',
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
  return question.explanation || 'No explanation provided.';
}

function transformQuestion(question, fileBaseName) {
  const newId = `system-design-${question.id}`;
  const topic =
    question.topic || question.subcategory || 'General System Design';

  const tags = ['system-design', topic.toLowerCase().replace(/\s/g, '-')];
  if (question.difficulty) {
    tags.push(difficultyMap[question.difficulty]);
  }

  return {
    id: newId,
    title: question.title,
    content: question.content,
    type: question.type,
    category: 'System Design',
    topic: topic,
    difficulty: difficultyMap[question.difficulty] || 'intermediate',
    learningCardId: 'system-design', // Assign to system-design card
    isActive: question.isActive !== undefined ? question.isActive : true,
    createdAt: question.createdAt || new Date().toISOString(),
    updatedAt: question.updatedAt || new Date().toISOString(),
    createdBy: question.createdBy || 'admin',
    updatedBy: question.updatedBy || 'admin',
    tags: tags,
    explanation: question.explanation || generateExplanation(question),
    points: question.points || 10,
    options: question.options?.map(opt => ({
      ...opt,
      explanation: opt.explanation || '',
    })),
    sampleAnswers: question.sampleAnswers,
    hints: question.hints || [],
    metadata: question.metadata || {},
  };
}

function main() {
  console.log('🔄 Starting transformation of system design questions...');
  const files = fs.readdirSync(JSON_DIR).filter(file => file.endsWith('.json'));
  console.log(`Found ${files.length} system design files to transform:`);
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
