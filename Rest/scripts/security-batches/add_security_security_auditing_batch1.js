const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-09-sec79',
    title: 'What is a security audit for frontend applications?',
    content: 'Explain the purpose of frontend security audits.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Security Auditing',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:19:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'security-auditing', 'audit', 'intermediate'],
    explanation:
      'A security audit identifies vulnerabilities in frontend code, including XSS, CSRF, insecure storage, misconfigured headers, and third-party libraries, and provides recommendations to fix them.',
    points: 10,
    sampleAnswers: [
      'A security audit identifies vulnerabilities in frontend code, including XSS, CSRF, insecure storage, misconfigured headers, and third-party libraries, and provides recommendations to fix them.',
    ],
    subcategory: 'Audit',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'A security audit identifies vulnerabilities in frontend code, including XSS, CSRF, insecure storage, misconfigured headers, and third-party libraries, and provides recommendations to fix them.',
        isCorrect: true,
        explanation:
          'A security audit identifies vulnerabilities in frontend code, including XSS, CSRF, insecure storage, misconfigured headers, and third-party libraries, and provides recommendations to fix them.',
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
  `✅ Added ${newQuestions.length} questions for Security Auditing (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
