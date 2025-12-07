const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q49',
    title: 'What is memoization in React and when should you use it?',
    content: 'Explain how memoization improves rendering performance in React.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'intermediate'],
    explanation:
      'Memoization (using React.memo, useMemo, or useCallback) avoids unnecessary re-rendering of components or expensive calculations when props/state haven’t changed.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Memoization (using React.memo, useMemo, or useCallback) avoids unnecessary re-rendering of components or expensive calculations when props/state haven’t changed.',
        isCorrect: true,
        explanation:
          'Memoization (using React.memo, useMemo, or useCallback) avoids unnecessary re-rendering of components or expensive calculations when props/state haven’t changed.',
      },
      {
        id: 'o2',
        text: 'Memoization (using React',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'memo, useMemo, or useCallback) avoids unnecessary re-rendering of components or expensive calculations when props/state haven’t changed',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is incorrect. Please refer to system design best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q50',
    title: 'What is infinite scroll and what are its pros and cons?',
    content:
      'Explain how infinite scroll works and its impact on UX and performance.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'intermediate'],
    explanation:
      'The correct answer is: Infinite scroll automatically loads more content as user scrolls',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Infinite scroll automatically loads more content as user scrolls',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Pros: improves UX for browsing feeds, keeps engagement high',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Cons: harder to track scroll position and can impact memory',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Infinite scroll replaces the need for backend pagination',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q51',
    title: 'How do you decide when to break a UI into smaller components?',
    content:
      'Explain criteria for dividing a large component into smaller reusable components.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'intermediate'],
    explanation:
      'Break components when parts are reusable, have independent state, or to improve readability and maintainability. Follow Single Responsibility Principle and avoid deep prop drilling.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Break components when parts are reusable, have independent state, or to improve readability and maintainability. Follow Single Responsibility Principle and avoid deep prop drilling.',
        isCorrect: true,
        explanation:
          'Break components when parts are reusable, have independent state, or to improve readability and maintainability. Follow Single Responsibility Principle and avoid deep prop drilling.',
      },
      {
        id: 'o2',
        text: 'Break components when parts are reusable, have independent state, or to improve readability and maintainability',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Follow Single Responsibility Principle and avoid deep prop drilling',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is incorrect. Please refer to system design best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
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
  `✅ Added ${newQuestions.length} system design questions (Batch 15)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
