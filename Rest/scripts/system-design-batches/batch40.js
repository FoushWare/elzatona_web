const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q124',
    title: 'What is serverless frontend hosting?',
    content:
      'Describe serverless frontend hosting platforms like Vercel or Netlify.',
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
      'Serverless hosting platforms automatically scale static sites and serverless functions, handling SSL, CDN, and caching without manual infrastructure setup.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Serverless hosting platforms automatically scale static sites and serverless functions, handling SSL, CDN, and caching without manual infrastructure setup.',
        isCorrect: true,
        explanation:
          'Serverless hosting platforms automatically scale static sites and serverless functions, handling SSL, CDN, and caching without manual infrastructure setup.',
      },
      {
        id: 'o2',
        text: 'Serverless hosting platforms automatically scale static sites and serverless functions, handling SSL, CDN, and caching without manual infrastructure setup',
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
    id: 'system-design-q125',
    title:
      'What is blue-green deployment and how does it apply to frontend apps?',
    content: 'Explain blue-green deployment strategy in frontend deployments.',
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
      'Blue-green deployment maintains two environments: blue (current) and green (new). After testing the green environment, traffic is switched with zero downtime.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Blue-green deployment maintains two environments: blue (current) and green (new). After testing the green environment, traffic is switched with zero downtime.',
        isCorrect: true,
        explanation:
          'Blue-green deployment maintains two environments: blue (current) and green (new). After testing the green environment, traffic is switched with zero downtime.',
      },
      {
        id: 'o2',
        text: 'Blue-green deployment maintains two environments: blue (current) and green (new)',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' After testing the green environment, traffic is switched with zero downtime',
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
    id: 'system-design-q126',
    title: 'What is canary release and why is it useful for frontend apps?',
    content: 'Describe canary release strategy in frontend deployment.',
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
      'Canary releases gradually roll out a new version to a small subset of users. If no issues arise, it expands to all users. Useful for catching bugs early.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Canary releases gradually roll out a new version to a small subset of users. If no issues arise, it expands to all users. Useful for catching bugs early.',
        isCorrect: true,
        explanation:
          'Canary releases gradually roll out a new version to a small subset of users. If no issues arise, it expands to all users. Useful for catching bugs early.',
      },
      {
        id: 'o2',
        text: 'Canary releases gradually roll out a new version to a small subset of users',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' If no issues arise, it expands to all users',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 40)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
