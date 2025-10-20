import fs from 'fs';
import path from 'path';

// This script prepares JavaScript questions for Firebase MCP seeding
// Since Firebase MCP is working, we'll use it to add the questions

interface UnifiedQuestion {
  id: string;
  title: string;
  content: string;
  type: 'multiple-choice' | 'coding' | 'system-design' | 'open-ended';
  category: string;
  topic: string;
  learningPath: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  createdBy: string;
  updatedBy: string;
  tags: string[];
  explanation?: string;
  points?: number;
  options?: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }>;
  metadata?: {
    source?: string;
    version?: string;
  };
}

async function loadQuestionsFromFile(
  filePath: string
): Promise<UnifiedQuestion[]> {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const questions = JSON.parse(fileContent);
    return Array.isArray(questions) ? questions : [];
  } catch (error) {
    console.error(`❌ Error loading file ${filePath}:`, error);
    return [];
  }
}

async function prepareJavaScriptQuestions() {
  console.log('🚀 Preparing JavaScript questions for Firebase MCP seeding...');

  const javascriptDir = path.join(
    process.cwd(),
    'apps/admin/network/data/json/javasciprt'
  );
  const files = fs
    .readdirSync(javascriptDir)
    .filter(file => file.endsWith('.json'));

  console.log(`📁 Found ${files.length} JavaScript question files`);

  let allQuestions: UnifiedQuestion[] = [];

  for (const file of files) {
    const filePath = path.join(javascriptDir, file);
    console.log(`\n📄 Processing file: ${file}`);

    const questions = await loadQuestionsFromFile(filePath);

    if (questions.length === 0) {
      console.log(`⚠️  No questions found in ${file}`);
      continue;
    }

    console.log(`📊 Found ${questions.length} questions in ${file}`);

    // Update timestamps and creator info
    const updatedQuestions = questions.map(question => ({
      ...question,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      createdBy: 'seeding-script',
      updatedBy: 'seeding-script',
    }));

    allQuestions = allQuestions.concat(updatedQuestions);
  }

  console.log(
    `\n📋 Total JavaScript questions prepared: ${allQuestions.length}`
  );

  // Save to a file for Firebase MCP processing
  const outputFile = path.join(
    process.cwd(),
    'src/scripts/javascript-questions-for-firebase.json'
  );
  fs.writeFileSync(outputFile, JSON.stringify(allQuestions, null, 2));

  console.log(`💾 Questions saved to: ${outputFile}`);
  console.log('📝 Next steps:');
  console.log(
    '   1. Use Firebase MCP tools to add these questions to Firestore'
  );
  console.log(
    '   2. Each question can be added individually to unifiedQuestions collection'
  );
  console.log('   3. Questions are ready with proper timestamps and metadata');

  return allQuestions;
}

// Run the preparation process
prepareJavaScriptQuestions()
  .then(() => {
    console.log('✅ JavaScript questions preparation completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ JavaScript questions preparation failed:', error);
    process.exit(1);
  });
