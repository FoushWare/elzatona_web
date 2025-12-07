const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q16',
    title: 'What are optimistic and pessimistic updates in frontend data flow?',
    content:
      'Describe the difference between optimistic and pessimistic updates in state management.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'advanced'],
    explanation:
      'Optimistic updates update UI immediately before server confirmation. Pessimistic updates wait for server response.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Optimistic update: update UI before server confirms',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Pessimistic update: update UI after server confirms',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Both approaches are identical',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q17',
    title: 'What are idempotent APIs and why are they important for frontend?',
    content:
      'Explain idempotency in APIs and its impact on frontend state consistency.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'advanced'],
    explanation:
      'Idempotent APIs produce the same result no matter how many times they are called. They prevent duplicate state changes if frontend retries requests due to network issues.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Idempotent APIs produce the same result no matter how many times they are called. They prevent duplicate state changes if frontend retries requests due to network issues.',
        isCorrect: true,
        explanation:
          'Idempotent APIs produce the same result no matter how many times they are called. They prevent duplicate state changes if frontend retries requests due to network issues.',
      },
      {
        id: 'o2',
        text: 'Idempotent APIs produce the same result no matter how many times they are called',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' They prevent duplicate state changes if frontend retries requests due to network issues',
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
    id: 'system-design-q19',
    title: 'What is the difference between virtual DOM and real DOM?',
    content:
      'Describe how virtual DOM improves rendering performance in frontend frameworks.',
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
    tags: ['system-design', 'frontend-system-design', 'beginner'],
    explanation:
      'The virtual DOM is an in-memory representation of the UI. Instead of updating the real DOM directly, frameworks update the virtual DOM and compute the minimal changes, which are then applied to the real DOM.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'The virtual DOM is an in-memory representation of the UI. Instead of updating the real DOM directly, frameworks update the virtual DOM and compute the minimal changes, which are then applied to the re...',
        isCorrect: true,
        explanation:
          'The virtual DOM is an in-memory representation of the UI. Instead of updating the real DOM directly, frameworks update the virtual DOM and compute the minimal changes, which are then applied to the real DOM.',
      },
      {
        id: 'o2',
        text: 'The virtual DOM is an in-memory representation of the UI',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Instead of updating the real DOM directly, frameworks update the virtual DOM and compute the minimal changes, which are then applied to the real DOM',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 5)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
