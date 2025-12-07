const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-10-sec90',
    title: 'How do you mitigate XSS in React applications?',
    content: 'Select all correct options.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'XSS',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:29:00.000Z',
    updatedAt: '2025-11-11T19:01:36.834Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'cross-site-scripting-xss', 'xss', 'intermediate'],
    explanation:
      'React automatically escapes content in JSX. Any HTML inserted via dangerouslySetInnerHTML must be sanitized. Avoid storing sensitive tokens insecurely.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use JSX curly braces to escape content',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Sanitize any user-generated HTML before using dangerouslySetInnerHTML',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Use external scripts instead of inline scripts',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Store session tokens in localStorage without encryption',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'XSS',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-11-sec95',
    title: 'What are common signs that a website might be vulnerable to XSS?',
    content: 'Select all applicable options.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'XSS',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:34:00.000Z',
    updatedAt: '2025-11-11T19:01:36.834Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'cross-site-scripting-xss',
      'xss',
      'beginner',
      'intermediate',
    ],
    explanation:
      'Reflected input, unsanitized HTML rendering, and dynamic content from untrusted sources are common XSS vulnerabilities.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'User input is reflected without sanitization',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Using dangerouslySetInnerHTML without sanitation',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Input validation for forms',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Content loaded dynamically from unknown sources',
        isCorrect: true,
        explanation: '',
      },
    ],
    subcategory: 'XSS',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-11-sec99',
    title: 'How can React’s default escaping help prevent XSS?',
    content: 'Select the correct options.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'XSS',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:38:00.000Z',
    updatedAt: '2025-11-11T19:01:36.834Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'cross-site-scripting-xss',
      'xss',
      'beginner',
      'intermediate',
    ],
    explanation:
      'React escapes data in JSX, preventing scripts from executing. However, server-side validation is still required.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Automatically escapes data in JSX expressions',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Prevents execution of scripts in user content',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Replaces the need for server-side validation',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Removes all HTML from user input',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'XSS',
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

console.log(`✅ Added ${newQuestions.length} questions for XSS (Batch 7)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
