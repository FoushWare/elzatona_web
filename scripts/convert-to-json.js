// This is a utility script for converting markdown to JSON
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');

function parseMarkdownToJSON(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const questions = [];

  // Split content by question headers - handle both formats
  const questionSections = content.split(/^## Question \d+:?/m);
  questionSections.shift(); // Remove first empty section

  console.log(`Found ${questionSections.length} question sections`);

  questionSections.forEach((section, index) => {
    const lines = section.trim().split('\n');
    const title = lines[0]?.trim() || `Question ${index + 1}`;

    // Extract question content
    let questionContent = '';
    let answerContent = '';
    let inAnswer = false;
    let inQuestion = false;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('**Question:**')) {
        inQuestion = true;
        inAnswer = false;
        questionContent = line.replace('**Question:**', '').trim();
      } else if (line.startsWith('**Answer:**')) {
        inAnswer = true;
        inQuestion = false;
        answerContent = line.replace('**Answer:**', '').trim();
      } else if (line.startsWith('**Explanation:**')) {
        inAnswer = true;
        inQuestion = false;
        answerContent += '\n' + line.replace('**Explanation:**', '').trim();
      } else if (line.startsWith('---')) {
        // End of question
        break;
      } else if (inQuestion) {
        questionContent += '\n' + line;
      } else if (inAnswer) {
        answerContent += '\n' + line;
      }
    }

    // Clean up content
    questionContent = questionContent.trim();
    answerContent = answerContent.trim();

    if (questionContent && answerContent) {
      console.log(`Parsed question ${index + 1}: ${title}`);

      // Determine category based on title
      let category = 'General';
      if (
        title.toLowerCase().includes('css') ||
        title.toLowerCase().includes('display') ||
        title.toLowerCase().includes('flexbox') ||
        title.toLowerCase().includes('grid')
      ) {
        category = 'CSS';
      } else if (
        title.toLowerCase().includes('html') ||
        title.toLowerCase().includes('semantic')
      ) {
        category = 'HTML';
      } else if (
        title.toLowerCase().includes('javascript') ||
        title.toLowerCase().includes('js') ||
        title.toLowerCase().includes('function') ||
        title.toLowerCase().includes('array') ||
        title.toLowerCase().includes('object') ||
        title.toLowerCase().includes('var') ||
        title.toLowerCase().includes('let') ||
        title.toLowerCase().includes('const')
      ) {
        category = 'JavaScript';
      }

      // Determine difficulty
      let difficulty = 'beginner';
      if (
        title.toLowerCase().includes('advanced') ||
        title.toLowerCase().includes('deep') ||
        title.toLowerCase().includes('complex')
      ) {
        difficulty = 'advanced';
      } else if (
        title.toLowerCase().includes('intermediate') ||
        title.toLowerCase().includes('flexbox') ||
        title.toLowerCase().includes('grid') ||
        title.toLowerCase().includes('async')
      ) {
        difficulty = 'intermediate';
      }

      // Create options (for now, we'll create generic options since the markdown doesn't have them)
      const options = [
        'Option A (Correct Answer)',
        'Option B (Incorrect)',
        'Option C (Incorrect)',
        'Option D (Incorrect)',
      ];

      questions.push({
        id: `q${index + 1}`,
        title: title,
        question: questionContent,
        options: options,
        correctAnswer: 0,
        explanation: answerContent,
        difficulty: difficulty,
        category: category,
        tags: [category.toLowerCase()],
      });
    } else {
      console.log(`Failed to parse question ${index + 1}: ${title}`);
      console.log(`Question content: "${questionContent}"`);
      console.log(`Answer content: "${answerContent}"`);
    }
  });

  return questions;
}

// Convert frontend-basics
const frontendBasicsQuestions = parseMarkdownToJSON(
  'QuestionsBank/frontend-basics/questions.md'
);
const frontendBasicsJSON = {
  questions: frontendBasicsQuestions,
};

fs.writeFileSync(
  'QuestionsBank/frontend-basics/questions.json',
  JSON.stringify(frontendBasicsJSON, null, 2)
);

console.log(
  `Converted ${frontendBasicsQuestions.length} questions for frontend-basics`
);

// Convert javascript-deep-dive
const jsDeepDiveQuestions = parseMarkdownToJSON(
  'QuestionsBank/javascript-deep-dive/questions.md'
);
const jsDeepDiveJSON = {
  questions: jsDeepDiveQuestions,
};

fs.writeFileSync(
  'QuestionsBank/javascript-deep-dive/questions.json',
  JSON.stringify(jsDeepDiveJSON, null, 2)
);

console.log(
  `Converted ${jsDeepDiveQuestions.length} questions for javascript-deep-dive`
);
