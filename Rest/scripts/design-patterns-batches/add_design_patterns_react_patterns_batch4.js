const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-provider-pattern-70',
    title: 'Styled-Components Provider',
    content: 'What role does the ThemeProvider from styled-components play?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'React Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.208Z',
    updatedAt: '2025-11-11T18:36:58.282Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation:
      'It provides a theme object via context so that styled components can access theme values without passing them as props. It applies consistent design tokens (colors, spacing, etc.) across the entire component tree.',
    points: 10,
    sampleAnswers: [
      'It provides a theme object via context so that styled components can access theme values without passing them as props.',
      'It applies consistent design tokens (colors, spacing, etc.) across the entire component tree.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'It provides a theme object via context so that styled components can access theme values without passing them as props.',
        isCorrect: true,
        explanation:
          'It provides a theme object via context so that styled components can access theme values without passing them as props. It applies consistent design tokens (colors, spacing, etc.) across the entire component tree.',
      },
      {
        id: 'o2',
        text: 'This is not correct. Please refer to the explanation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Incorrect. Review the design pattern concepts.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is a common misconception. The correct answer is different.',
        isCorrect: false,
        explanation: '',
      },
    ],
  },
];

// Read existing questions
let existingQuestions = [];
if (fs.existsSync(questionsFile)) {
  existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
}

// Add new questions
existingQuestions.push(...newQuestions);

// Write back
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));

console.log(
  `✅ Added ${newQuestions.length} questions for React Patterns (Batch 4)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
