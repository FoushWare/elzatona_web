#!/usr/bin/env node

/**
 * Script to convert QuestionsBank markdown files to unified Firebase format
 * and push them to Firebase using the API endpoint
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

// Configuration
const QUESTIONS_BANK_DIR = path.join(__dirname, '..', 'QuestionsBank');
const API_BASE_URL = 'http://localhost:3000'; // Adjust if needed

// Learning path mapping
const LEARNING_PATH_MAPPING = {
  'frontend-basics': 'frontend-basics',
  'advanced-css': 'advanced-css',
  'javascript-deep-dive': 'javascript-deep-dive',
  'react-mastery': 'react-mastery',
  'typescript-essentials': 'typescript-essentials',
  'web-performance': 'performance-optimization',
  security: 'security',
  'testing-strategies': 'testing-strategies',
  'system-design': 'system-design',
  accessibility: 'accessibility',
  'api-design': 'api-integration',
  'api-integration': 'api-integration',
  'git-version-control': 'git-version-control',
  'english-learning': 'english-learning',
  'deployment-devops': 'performance-optimization', // Map to performance-optimization
};

// Difficulty mapping based on content analysis
const DIFFICULTY_MAPPING = {
  'frontend-basics': 'beginner',
  'advanced-css': 'intermediate',
  'javascript-deep-dive': 'intermediate',
  'react-mastery': 'intermediate',
  'typescript-essentials': 'intermediate',
  'web-performance': 'advanced',
  security: 'advanced',
  'testing-strategies': 'intermediate',
  'system-design': 'advanced',
  accessibility: 'intermediate',
  'api-design': 'intermediate',
  'api-integration': 'intermediate',
  'git-version-control': 'beginner',
  'english-learning': 'beginner',
  'deployment-devops': 'intermediate',
};

/**
 * Parse JSON question file
 */
function parseJsonQuestions(filePath, learningPath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    if (data.questions && Array.isArray(data.questions)) {
      return data.questions.map((q, index) => ({
        id: q.id || `${learningPath}-mc-${index + 1}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        category: q.category || getCategoryFromLearningPath(learningPath),
        difficulty:
          q.difficulty || DIFFICULTY_MAPPING[learningPath] || 'intermediate',
        tags: q.tags || [learningPath, 'multiple-choice'],
        learningPath: learningPath,
        type: 'multiple-choice',
        order: index + 1,
      }));
    }

    return [];
  } catch (error) {
    console.error(`Error parsing JSON ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Parse markdown question file and extract multiple-choice questions
 */
function parseMarkdownQuestions(filePath, learningPath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const questions = [];

    // Split by question separators
    const questionBlocks = content.split(/^---$/m);

    for (let i = 0; i < questionBlocks.length; i++) {
      const block = questionBlocks[i].trim();
      if (!block) continue;

      // Extract question details using regex
      const questionMatch = block.match(
        /\*\*Question:\*\*\s*(.+?)(?=\*\*Answer:|\*\*Options:)/s
      );
      const answerMatch = block.match(
        /\*\*Answer:\*\*\s*([A-D])\)\s*(.+?)(?=\*\*Explanation:|\*\*Options:|$)/s
      );
      const explanationMatch = block.match(
        /\*\*Explanation:\*\*\s*(.+?)(?=\*\*Options:|$)/s
      );
      const optionsMatch = block.match(
        /\*\*Options:\*\*\s*([\s\S]+?)(?=---|$)/
      );

      if (questionMatch && answerMatch && optionsMatch) {
        const questionText = questionMatch[1].trim();
        // const correctAnswerLetter = answerMatch[1].trim(); // Unused variable
        const correctAnswerText = answerMatch[2].trim();
        const explanation = explanationMatch ? explanationMatch[1].trim() : '';
        const optionsText = optionsMatch[1].trim();

        // Parse options
        const options = [];
        const optionLines = optionsText.split('\n');

        for (const line of optionLines) {
          const optionMatch = line.match(/^([A-D])\)\s*(.+)$/);
          if (optionMatch) {
            options.push(optionMatch[2].trim());
          }
        }

        if (options.length >= 2) {
          // Find correct answer index
          const correctAnswerIndex = options.findIndex(
            option => option.toLowerCase() === correctAnswerText.toLowerCase()
          );

          if (correctAnswerIndex !== -1) {
            const question = {
              id: `${learningPath}-mc-${questions.length + 1}`,
              question: questionText,
              options: options,
              correctAnswer: correctAnswerIndex,
              explanation: explanation,
              category: getCategoryFromLearningPath(learningPath),
              difficulty: DIFFICULTY_MAPPING[learningPath] || 'intermediate',
              tags: [learningPath, 'multiple-choice'],
              learningPath: learningPath,
              type: 'multiple-choice',
              order: questions.length + 1,
            };

            questions.push(question);
          }
        }
      }
    }

    return questions;
  } catch (err) {
    console.error(`Error parsing ${filePath}:`, err.message);
    return [];
  }
}

/**
 * Get category from learning path
 */
function getCategoryFromLearningPath(learningPath) {
  const categoryMap = {
    'frontend-basics': 'HTML',
    'advanced-css': 'CSS',
    'javascript-deep-dive': 'JavaScript',
    'react-mastery': 'React',
    'typescript-essentials': 'TypeScript',
    'performance-optimization': 'Performance',
    security: 'Security',
    'testing-strategies': 'Testing',
    'system-design': 'System Design',
    accessibility: 'Accessibility',
    'api-integration': 'API',
    'git-version-control': 'Git',
    'english-learning': 'English',
  };

  return (
    categoryMap[learningPath] ||
    learningPath.charAt(0).toUpperCase() + learningPath.slice(1)
  );
}

/**
 * Send questions to Firebase via API
 */
async function sendQuestionsToFirebase(questions, learningPath) {
  if (questions.length === 0) {
    console.log(`No questions to send for ${learningPath}`);
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/questions/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questions }),
    });

    const result = await response.json();

    if (result.success) {
      console.log(
        `✅ Successfully added ${questions.length} questions for ${learningPath}`
      );
    } else {
      console.error(
        `❌ Failed to add questions for ${learningPath}:`,
        result.error
      );
    }
  } catch (error) {
    console.error(
      `❌ Error sending questions for ${learningPath}:`,
      error.message
    );
  }
}

/**
 * Process all question files in QuestionsBank
 */
async function processAllQuestions() {
  console.log('🚀 Starting QuestionsBank to Firebase conversion...\n');

  const learningPaths = Object.keys(LEARNING_PATH_MAPPING);
  let totalQuestions = 0;

  for (const learningPath of learningPaths) {
    const dirPath = path.join(QUESTIONS_BANK_DIR, learningPath);

    if (!fs.existsSync(dirPath)) {
      console.log(`⚠️  Directory not found: ${learningPath}`);
      continue;
    }

    console.log(`📁 Processing ${learningPath}...`);

    let questions = [];

    // Look for JSON files first
    const jsonFiles = fs
      .readdirSync(dirPath)
      .filter(file => file.endsWith('.json'));
    for (const jsonFile of jsonFiles) {
      const jsonPath = path.join(dirPath, jsonFile);
      const jsonQuestions = parseJsonQuestions(
        jsonPath,
        LEARNING_PATH_MAPPING[learningPath]
      );
      questions.push(...jsonQuestions);
    }

    // Look for questions.md file
    const questionsFile = path.join(dirPath, 'questions.md');
    if (fs.existsSync(questionsFile)) {
      const markdownQuestions = parseMarkdownQuestions(
        questionsFile,
        LEARNING_PATH_MAPPING[learningPath]
      );
      questions.push(...markdownQuestions);
    }

    if (questions.length > 0) {
      console.log(`   Found ${questions.length} multiple-choice questions`);
      await sendQuestionsToFirebase(
        questions,
        LEARNING_PATH_MAPPING[learningPath]
      );
      totalQuestions += questions.length;
    } else {
      console.log(
        `   No multiple-choice questions found (may contain open-ended questions)`
      );
    }

    console.log('');
  }

  console.log(
    `🎉 Conversion complete! Total questions processed: ${totalQuestions}`
  );
}

/**
 * Check if development server is running
 */
async function checkServer() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/questions/frontend-basics`
    );
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Checking if development server is running...');

  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.log(
      '❌ Development server is not running. Please start it with: npm run dev'
    );
    process.exit(1);
  }

  console.log('✅ Development server is running\n');

  await processAllQuestions();
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  parseMarkdownQuestions,
  sendQuestionsToFirebase,
  processAllQuestions,
};
