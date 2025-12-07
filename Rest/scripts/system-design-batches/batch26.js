const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q82',
    title: 'What are ARIA roles and how do you use them?',
    content: 'Explain ARIA roles and attributes to improve accessibility.',
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
      'ARIA roles and attributes provide semantic information for assistive technologies. Use roles like <code>button</code>, <code>dialog</code>, and states like <code>aria-expanded</code> to convey meaning.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'ARIA roles and attributes provide semantic information for assistive technologies. Use roles like `button`, `dialog`, and states like `aria-expanded` to convey meaning.',
        isCorrect: true,
        explanation:
          'ARIA roles and attributes provide semantic information for assistive technologies. Use roles like `button`, `dialog`, and states like `aria-expanded` to convey meaning.',
      },
      {
        id: 'o2',
        text: 'ARIA roles and attributes provide semantic information for assistive technologies',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Use roles like `button`, `dialog`, and states like `aria-expanded` to convey meaning',
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
    id: 'system-design-q83',
    title: 'How do you test accessibility in frontend applications?',
    content: 'Describe tools and methods to verify a11y compliance.',
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
      'Use browser extensions like Axe or WAVE, automated tools like Lighthouse, and manual testing with keyboard navigation and screen readers to ensure accessibility compliance.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use browser extensions like Axe or WAVE, automated tools like Lighthouse, and manual testing with keyboard navigation and screen readers to ensure accessibility compliance.',
        isCorrect: true,
        explanation:
          'Use browser extensions like Axe or WAVE, automated tools like Lighthouse, and manual testing with keyboard navigation and screen readers to ensure accessibility compliance.',
      },
      {
        id: 'o2',
        text: 'Use browser extensions like Axe or WAVE, automated tools like Lighthouse, and manual testing with keyboard navigation and screen readers to ensure accessibility compliance',
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
    id: 'system-design-q84',
    title: 'What are common accessibility mistakes in frontend apps?',
    content: 'Identify frequent a11y issues and how to avoid them.',
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
    explanation: 'The correct answer is: Missing alt text on images',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Missing alt text on images',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Poor color contrast',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Non-focusable interactive elements',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Using semantic HTML',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 26)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
