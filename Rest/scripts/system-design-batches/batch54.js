const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-senior-7',
    title: 'How would you design a frontend A/B testing infrastructure?',
    content:
      'You need to run A/B tests on different UI variations. How would you architect this?',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-11-11T20:11:00.309Z',
    updatedAt: '2025-11-11T20:11:00.309Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'senior', 'intermediate'],
    explanation:
      'A/B platforms handle variant assignment and analytics. Variant routing shows correct version. Conversion tracking measures success. Statistical significance ensures valid results.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use A/B testing platform (Optimizely, VWO), implement variant routing, track conversion events, ensure statistical significance, and provide fallback to control',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Manually switch between versions',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Use only CSS to hide/show variants',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'A/B testing is not possible in frontend',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Consider system design principles and scalability',
      'Think about performance and user experience',
      'Review frontend architecture patterns',
    ],
    metadata: {},
  },
  {
    id: 'system-design-senior-8',
    title:
      'How do you design a frontend asset delivery and optimization system?',
    content:
      'Your app has thousands of images and assets. How would you optimize delivery?',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-11-11T20:11:00.309Z',
    updatedAt: '2025-11-11T20:11:00.309Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'senior', 'intermediate'],
    explanation:
      'CDN reduces latency globally. Image optimization reduces file sizes. Lazy loading improves initial load. Code splitting reduces bundle size. Versioning ensures cache updates.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use CDN for global distribution, implement image optimization (WebP, responsive images), lazy loading, code splitting, and asset versioning for cache busting',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Serve all assets from main server',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Use only PNG format',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Load all assets at once',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Consider system design principles and scalability',
      'Think about performance and user experience',
      'Review frontend architecture patterns',
    ],
    metadata: {},
  },
  {
    id: 'system-design-senior-9',
    title:
      'How would you design a frontend internationalization (i18n) system?',
    content:
      'Your app needs to support 50+ languages. How would you architect the i18n system?',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-11-11T20:11:00.309Z',
    updatedAt: '2025-11-11T20:11:00.309Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'senior', 'intermediate'],
    explanation:
      'i18n libraries handle translation management. Lazy loading reduces initial bundle. RTL support for Arabic/Hebrew. Pluralization handles language rules. Fallback ensures content always displays.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use i18n library (react-i18next), lazy load translation files, implement RTL support, handle pluralization, and provide fallback to default language',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Hardcode all translations',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Load all languages at once',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Use only English',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Consider system design principles and scalability',
      'Think about performance and user experience',
      'Review frontend architecture patterns',
    ],
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
  `✅ Added ${newQuestions.length} system design questions (Batch 54)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
