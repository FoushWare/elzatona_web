import fs from 'fs';
import path from 'path';

interface OldQuestion {
  id: number;
  title: string;
  content: string;
  type: 'open-ended' | 'multiple-choice' | 'true-false' | 'code';
  difficulty: 'easy' | 'medium' | 'hard' | 'advanced' | 'expert';
  sampleAnswers?: string[];
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

interface NewQuestion {
  id: string;
  title: string;
  content: string;
  type: 'open-ended' | 'multiple-choice' | 'true-false' | 'code';
  category: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningCardId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  tags: string[];
  explanation?: string;
  points: number;
  sampleAnswers?: string[];
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

// Topic mapping based on file names and question content
const topicMapping: Record<string, string> = {
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
const difficultyMapping: Record<
  string,
  'beginner' | 'intermediate' | 'advanced'
> = {
  easy: 'beginner',
  medium: 'intermediate',
  hard: 'advanced',
  advanced: 'advanced',
  expert: 'advanced',
};

function transformQuestion(
  oldQuestion: OldQuestion,
  fileName: string,
  questionIndex: number
): NewQuestion {
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

function generateExplanation(question: OldQuestion): string {
  if (question.type === 'multiple-choice' && question.options) {
    const correctOption = question.options.find(opt => opt.isCorrect);
    return correctOption ? correctOption.text : question.content;
  } else if (question.sampleAnswers && question.sampleAnswers.length > 0) {
    return question.sampleAnswers[0];
  }
  return question.content;
}

function transformFile(filePath: string): void {
  console.log(`Processing ${filePath}...`);

  const fileName = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const oldQuestions: OldQuestion[] = JSON.parse(fileContent);

  const newQuestions: NewQuestion[] = oldQuestions.map((question, index) =>
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

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { transformQuestion, transformFile };
