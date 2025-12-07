const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-07-sec56',
    title: 'True or False: All third-party libraries are safe by default.',
    content: 'Evaluate the statement in terms of frontend security.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Web Security Fundamentals',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:56:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'web-security-fundamentals',
      'third-party security',
      'beginner',
      'intermediate',
    ],
    explanation: 'The correct answer is: False',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'True',
        isCorrect: false,
        explanation:
          'Third-party libraries can have vulnerabilities, outdated dependencies, or malicious code; always review and update them.',
      },
      {
        id: 'o2',
        text: 'False',
        isCorrect: false,
        explanation:
          'Third-party libraries can have vulnerabilities, outdated dependencies, or malicious code; always review and update them.',
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
    subcategory: 'Third-Party Security',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-09-sec73',
    title: 'What is Man-in-the-Middle (MITM) attack?',
    content: 'Explain how MITM attacks occur in web applications.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Web Security Fundamentals',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:13:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'web-security-fundamentals', 'mitm', 'intermediate'],
    explanation:
      'MITM attacks occur when an attacker intercepts communication between a client and server to eavesdrop, steal credentials, or manipulate data in transit.',
    points: 10,
    sampleAnswers: [
      'MITM attacks occur when an attacker intercepts communication between a client and server to eavesdrop, steal credentials, or manipulate data in transit.',
    ],
    subcategory: 'MITM',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'MITM attacks occur when an attacker intercepts communication between a client and server to eavesdrop, steal credentials, or manipulate data in transit.',
        isCorrect: true,
        explanation:
          'MITM attacks occur when an attacker intercepts communication between a client and server to eavesdrop, steal credentials, or manipulate data in transit.',
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
    id: 'sec-09-sec74',
    title: 'How can you prevent MITM attacks in web applications?',
    content: 'Select all correct options.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Web Security Fundamentals',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:14:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'web-security-fundamentals', 'mitm', 'intermediate'],
    explanation:
      'HTTPS, certificate validation, and HSTS protect against MITM attacks. Network-level security alone is insufficient.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use HTTPS for all communication',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Validate SSL/TLS certificates',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Implement HSTS headers',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Rely only on network-level security',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'MITM',
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
  `✅ Added ${newQuestions.length} questions for Web Security Fundamentals (Batch 5)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
