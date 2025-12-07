const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-01-sec9',
    title:
      'True or False: CSP (Content Security Policy) can help mitigate XSS.',
    content: 'Evaluate whether this statement is true or false.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Content Security Policy (CSP)',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:00:00.000Z',
    updatedAt: '2025-11-11T19:01:36.827Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'content-security-policy-csp',
      'csp',
      'beginner',
      'intermediate',
    ],
    explanation: 'The correct answer is: True',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'True',
        isCorrect: true,
        explanation: 'CSP restricts allowed script sources, mitigating XSS.',
      },
      {
        id: 'o2',
        text: 'False',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Partially true - depends on the context',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Not applicable',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'CSP',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-02-sec13',
    title: 'What is the purpose of a Content Security Policy (CSP)?',
    content:
      'Explain how CSP protects web applications and what types of attacks it mitigates.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Content Security Policy (CSP)',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:13:00.000Z',
    updatedAt: '2025-11-11T19:01:36.829Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'content-security-policy-csp', 'csp', 'intermediate'],
    explanation:
      'CSP restricts which sources are allowed for scripts, styles, and media. It reduces XSS, clickjacking, and data injection risks.',
    points: 10,
    sampleAnswers: [
      'CSP restricts which sources are allowed for scripts, styles, and media. It reduces XSS, clickjacking, and data injection risks.',
    ],
    subcategory: 'CSP',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'CSP restricts which sources are allowed for scripts, styles, and media. It reduces XSS, clickjacking, and data injection risks.',
        isCorrect: true,
        explanation:
          'CSP restricts which sources are allowed for scripts, styles, and media. It reduces XSS, clickjacking, and data injection risks.',
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
    id: 'sec-04-sec30',
    title: 'What is the role of Content Security Policy (CSP) in web security?',
    content: 'Explain how CSP helps protect frontend applications.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Content Security Policy (CSP)',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:30:00.000Z',
    updatedAt: '2025-11-11T19:01:36.831Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'content-security-policy-csp', 'csp', 'intermediate'],
    explanation:
      'CSP defines allowed sources for scripts, styles, images, and other resources, mitigating XSS, clickjacking, and data injection by restricting what can be loaded or executed.',
    points: 10,
    sampleAnswers: [
      'CSP defines allowed sources for scripts, styles, images, and other resources, mitigating XSS, clickjacking, and data injection by restricting what can be loaded or executed.',
    ],
    subcategory: 'CSP',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'CSP defines allowed sources for scripts, styles, images, and other resources, mitigating XSS, clickjacking, and data injection by restricting what can be loaded or executed.',
        isCorrect: true,
        explanation:
          'CSP defines allowed sources for scripts, styles, images, and other resources, mitigating XSS, clickjacking, and data injection by restricting what can be loaded or executed.',
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
  `✅ Added ${newQuestions.length} questions for Content Security Policy (CSP) (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
