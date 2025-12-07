const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-03-sec23',
    title: 'What is a Man-in-the-Middle (MITM) attack?',
    content:
      'Explain what MITM attacks are and how they affect web communication.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Web Security Fundamentals',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:23:00.000Z',
    updatedAt: '2025-11-11T19:01:36.830Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'web-security-fundamentals', 'mitm', 'intermediate'],
    explanation:
      'A MITM attack occurs when an attacker intercepts communication between the client and server, potentially reading, modifying, or injecting data without either party noticing.',
    points: 10,
    sampleAnswers: [
      'A MITM attack occurs when an attacker intercepts communication between the client and server, potentially reading, modifying, or injecting data without either party noticing.',
    ],
    subcategory: 'MITM',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'A MITM attack occurs when an attacker intercepts communication between the client and server, potentially reading, modifying, or injecting data without either party noticing.',
        isCorrect: true,
        explanation:
          'A MITM attack occurs when an attacker intercepts communication between the client and server, potentially reading, modifying, or injecting data without either party noticing.',
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
    id: 'sec-03-sec24',
    title: 'True or False: Using HTTPS prevents all types of MITM attacks.',
    content: 'Evaluate this statement.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Web Security Fundamentals',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:24:00.000Z',
    updatedAt: '2025-11-11T19:01:36.830Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'web-security-fundamentals', 'mitm', 'intermediate'],
    explanation: 'The correct answer is: False',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'True',
        isCorrect: false,
        explanation:
          'HTTPS protects against MITM attacks in transit, but misconfigured certificates or weak crypto can still be exploited.',
      },
      {
        id: 'o2',
        text: 'False',
        isCorrect: false,
        explanation:
          'HTTPS protects against MITM attacks in transit, but misconfigured certificates or weak crypto can still be exploited.',
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
    subcategory: 'MITM',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-03-sec25',
    title:
      'Which of the following improve web app security against MITM attacks?',
    content: 'Select all correct options.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Web Security Fundamentals',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:25:00.000Z',
    updatedAt: '2025-11-11T19:01:36.830Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'web-security-fundamentals', 'mitm', 'intermediate'],
    explanation:
      'Proper HTTPS, certificate validation, and strong crypto protect against MITM; client-side validation alone is not sufficient.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Enforce HTTPS and HSTS',
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
        text: 'Use strong encryption algorithms',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Rely only on client-side validation',
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
  `✅ Added ${newQuestions.length} questions for Web Security Fundamentals (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
