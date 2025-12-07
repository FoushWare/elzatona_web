const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q28',
    title: 'What is prefetching vs preloading in frontend performance?',
    content:
      'Explain how prefetch and preload directives differ in terms of resource loading strategy.',
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
      'Prefetch loads resources for future navigation, while preload ensures critical resources are fetched earlier for the current page.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Prefetch is for resources needed immediately',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Preload is for resources needed immediately',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Prefetch is for resources likely needed in future',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Preload defers resources until user interaction',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q29',
    title: 'What is the purpose of ARIA roles in frontend design?',
    content:
      'Explain how ARIA roles help assistive technologies interpret UI components.',
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
      'ARIA roles provide semantic information about elements to assistive technologies, improving accessibility for screen readers and keyboard navigation.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'ARIA roles provide semantic information about elements to assistive technologies, improving accessibility for screen readers and keyboard navigation.',
        isCorrect: true,
        explanation:
          'ARIA roles provide semantic information about elements to assistive technologies, improving accessibility for screen readers and keyboard navigation.',
      },
      {
        id: 'o2',
        text: 'ARIA roles provide semantic information about elements to assistive technologies, improving accessibility for screen readers and keyboard navigation',
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
    id: 'system-design-q30',
    title:
      'What are semantic HTML elements and why are they important for accessibility?',
    content: 'Discuss how semantic HTML improves usability and accessibility.',
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
      'Semantic elements like <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code> provide meaning, improving navigation for assistive technologies.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Semantic HTML improves SEO',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Semantic HTML is ignored by screen readers',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Semantic HTML improves accessibility for keyboard and screen reader users',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Semantic HTML automatically optimizes bundle size',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 8)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
