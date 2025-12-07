const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q46',
    title: 'What is the difference between reflow and repaint in the browser?',
    content: 'Explain how reflow and repaint affect rendering performance.',
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
      'The correct answer is: Reflow recalculates layout and can trigger repaint',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Reflow recalculates layout and can trigger repaint',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Repaint only redraws pixels without layout calculation',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Reflow and repaint are the same',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q47',
    title: 'How can HTTPS help with frontend performance?',
    content: 'Explain performance benefits of HTTPS beyond security.',
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
      'HTTPS enables HTTP/2 or HTTP/3 which supports multiplexing, header compression, and better caching, improving load performance.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'HTTPS enables HTTP/2 or HTTP/3 which supports multiplexing, header compression, and better caching, improving load performance.',
        isCorrect: true,
        explanation:
          'HTTPS enables HTTP/2 or HTTP/3 which supports multiplexing, header compression, and better caching, improving load performance.',
      },
      {
        id: 'o2',
        text: 'HTTPS enables HTTP/2 or HTTP/3 which supports multiplexing, header compression, and better caching, improving load performance',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'This method prioritizes user experience and maintainability.',
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
    id: 'system-design-q48',
    title: 'What is bundle splitting and why is it important?',
    content: 'Explain how splitting JavaScript bundles improves performance.',
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
      'Bundle splitting breaks the app into smaller chunks, allowing the browser to load only necessary code on demand, reducing initial load time.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Bundle splitting breaks the app into smaller chunks, allowing the browser to load only necessary code on demand, reducing initial load time.',
        isCorrect: true,
        explanation:
          'Bundle splitting breaks the app into smaller chunks, allowing the browser to load only necessary code on demand, reducing initial load time.',
      },
      {
        id: 'o2',
        text: 'Bundle splitting breaks the app into smaller chunks, allowing the browser to load only necessary code on demand, reducing initial load time',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'This method prioritizes user experience and maintainability.',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 14)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
