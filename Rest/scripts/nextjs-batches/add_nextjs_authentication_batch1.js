const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/nextjs-questions.json'
);

const newQuestions = [
  {
    id: 'next1-20-nextjs-q11',
    title: 'How do you handle authentication in Next.js?',
    content:
      'Use NextAuth.js (Auth.js) for built-in providers, or implement custom auth with cookies, JWT, and middleware in API routes or Server Components.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Authentication',
    difficulty: 'advanced',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.797Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'authentication', 'advanced'],
    explanation:
      'NextAuth.js integrates seamlessly with Next.js and supports OAuth, email, and credentials providers.',
    points: 8,
    sampleAnswers: [
      'Use NextAuth.js for quick setup with providers like Google, GitHub, or custom credentials. Store sessions in cookies for SSR compatibility.',
      'In App Router, protect routes using middleware that checks for valid session cookies before rendering Server Components.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Use NextAuth.js for quick setup with providers like Google, GitHub, or custom credentials. Store sessions in cookies for SSR compatibility.',
        isCorrect: true,
        explanation:
          'NextAuth.js integrates seamlessly with Next.js and supports OAuth, email, and credentials providers.',
      },
      {
        id: 'o2',
        text: 'This is not correct. Please refer to the explanation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Incorrect. Review Next.js documentation and concepts.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is a common misconception. The correct answer is different.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o5',
        text: 'Not quite. Consider Next.js best practices and architecture.',
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
  `✅ Added ${newQuestions.length} questions for Authentication (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
