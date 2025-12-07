const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-04-sec31',
    title: 'Select the correct ways to implement CSP.',
    content: 'Choose all that apply.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Content Security Policy (CSP)',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:31:00.000Z',
    updatedAt: '2025-11-11T19:01:36.831Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'content-security-policy-csp', 'csp', 'intermediate'],
    explanation:
      'CSP works via meta tags or headers, and whitelisting trusted sources restricts malicious content.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use meta tag in HTML',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Set HTTP response headers',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Rely solely on HTTPS',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Whitelist only trusted sources',
        isCorrect: true,
        explanation: '',
      },
    ],
    subcategory: 'CSP',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-06-sec47',
    title: 'What is the Content Security Policy (CSP) header?',
    content: 'Explain how CSP helps prevent XSS and other attacks.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Content Security Policy (CSP)',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:47:00.000Z',
    updatedAt: '2025-11-11T19:01:36.832Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'content-security-policy-csp', 'csp', 'intermediate'],
    explanation:
      'CSP allows developers to define which sources of scripts, images, and other resources are trusted. It blocks inline scripts and unauthorized domains, reducing the risk of XSS, clickjacking, and data injection attacks.',
    points: 10,
    sampleAnswers: [
      'CSP allows developers to define which sources of scripts, images, and other resources are trusted. It blocks inline scripts and unauthorized domains, reducing the risk of XSS, clickjacking, and data injection attacks.',
    ],
    subcategory: 'CSP',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'CSP allows developers to define which sources of scripts, images, and other resources are trusted. It blocks inline scripts and unauthorized domains, reducing the risk of XSS, clickjacking, and data injection attacks.',
        isCorrect: true,
        explanation:
          'CSP allows developers to define which sources of scripts, images, and other resources are trusted. It blocks inline scripts and unauthorized domains, reducing the risk of XSS, clickjacking, and data injection attacks.',
      },
      {
        id: 'o2',
        text: 'This is not correct. Please refer to the explanation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Incorrect. Review web security concepts.',
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
        text: 'Not quite. Consider security best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
  },
  {
    id: 'sec-08-sec67',
    title: 'How does a Content Security Policy (CSP) improve security?',
    content: 'Select all correct options.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Content Security Policy (CSP)',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:07:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'content-security-policy-csp', 'csp', 'intermediate'],
    explanation:
      'CSP controls which sources are allowed for scripts and styles, blocks inline scripts, and helps mitigate XSS attacks. It does not encrypt cookies.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Restrict sources of scripts, styles, and media',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Prevent inline script execution',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Encrypt cookies automatically',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Mitigate XSS attacks',
        isCorrect: true,
        explanation: '',
      },
    ],
    subcategory: 'CSP',
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
  `✅ Added ${newQuestions.length} questions for Content Security Policy (CSP) (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
