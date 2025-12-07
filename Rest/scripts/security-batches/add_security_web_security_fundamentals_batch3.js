const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-04-sec29',
    title: 'True or False: XSS attacks can be used to bypass CSRF protections.',
    content: 'Evaluate the statement.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Web Security Fundamentals',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:29:00.000Z',
    updatedAt: '2025-11-11T19:01:36.831Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'web-security-fundamentals',
      'xss & csrf',
      'intermediate',
    ],
    explanation: 'The correct answer is: True',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'True',
        isCorrect: true,
        explanation:
          'An XSS vulnerability can allow an attacker to execute scripts that perform CSRF-like actions using the victim’s credentials.',
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
    subcategory: 'XSS & CSRF',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-04-sec32',
    title: 'What is the Same-Origin Policy (SOP) and why is it important?',
    content: 'Explain SOP and its significance in web security.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Web Security Fundamentals',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:32:00.000Z',
    updatedAt: '2025-11-11T19:01:36.831Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'web-security-fundamentals', 'sop', 'intermediate'],
    explanation:
      'SOP is a browser security feature that restricts scripts on one origin from accessing data from another origin, protecting sensitive data from unauthorized access.',
    points: 10,
    sampleAnswers: [
      'SOP is a browser security feature that restricts scripts on one origin from accessing data from another origin, protecting sensitive data from unauthorized access.',
    ],
    subcategory: 'SOP',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'SOP is a browser security feature that restricts scripts on one origin from accessing data from another origin, protecting sensitive data from unauthorized access.',
        isCorrect: true,
        explanation:
          'SOP is a browser security feature that restricts scripts on one origin from accessing data from another origin, protecting sensitive data from unauthorized access.',
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
    id: 'sec-05-sec37',
    title: 'What is MITM (Man-in-the-Middle) attack?',
    content: 'Describe MITM attacks and their impact on frontend web security.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Web Security Fundamentals',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:37:00.000Z',
    updatedAt: '2025-11-11T19:01:36.831Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'web-security-fundamentals', 'mitm', 'intermediate'],
    explanation:
      'MITM attacks intercept communication between a client and server, potentially stealing sensitive data like passwords, session tokens, or credit card info. It often occurs on unsecured networks or via malicious proxies.',
    points: 10,
    sampleAnswers: [
      'MITM attacks intercept communication between a client and server, potentially stealing sensitive data like passwords, session tokens, or credit card info. It often occurs on unsecured networks or via malicious proxies.',
    ],
    subcategory: 'MITM',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'MITM attacks intercept communication between a client and server, potentially stealing sensitive data like passwords, session tokens, or credit card info. It often occurs on unsecured networks or via malicious proxies.',
        isCorrect: true,
        explanation:
          'MITM attacks intercept communication between a client and server, potentially stealing sensitive data like passwords, session tokens, or credit card info. It often occurs on unsecured networks or via malicious proxies.',
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
  `✅ Added ${newQuestions.length} questions for Web Security Fundamentals (Batch 3)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
