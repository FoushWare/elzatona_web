const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q139',
    title:
      'What is log aggregation and why is it useful in frontend observability?',
    content:
      'Explain the role of log aggregation in debugging frontend issues.',
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
      'Log aggregation collects logs from multiple users and sessions into a central system. It helps identify patterns, diagnose errors, and analyze performance at scale.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Log aggregation collects logs from multiple users and sessions into a central system. It helps identify patterns, diagnose errors, and analyze performance at scale.',
        isCorrect: true,
        explanation:
          'Log aggregation collects logs from multiple users and sessions into a central system. It helps identify patterns, diagnose errors, and analyze performance at scale.',
      },
      {
        id: 'o2',
        text: 'Log aggregation collects logs from multiple users and sessions into a central system',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' It helps identify patterns, diagnose errors, and analyze performance at scale',
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
    id: 'system-design-q140',
    title: 'What is the difference between proactive and reactive monitoring?',
    content:
      'Compare proactive and reactive monitoring in frontend system design.',
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
      'The correct answer is: Proactive monitoring aims to detect issues before users are impacted',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Proactive monitoring aims to detect issues before users are impacted',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Reactive monitoring only responds after an issue is reported',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Proactive monitoring is not possible for frontend apps',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Reactive monitoring uses tools like alerts and dashboards',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q141',
    title:
      'What is XSS (Cross-Site Scripting) and how can frontend apps prevent it?',
    content:
      'Explain XSS attacks and mitigation techniques in frontend applications.',
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
      'XSS allows attackers to inject malicious scripts. Prevention includes escaping user input, using Content Security Policy (CSP), and avoiding dangerous APIs like innerHTML.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'XSS allows attackers to inject malicious scripts. Prevention includes escaping user input, using Content Security Policy (CSP), and avoiding dangerous APIs like innerHTML.',
        isCorrect: true,
        explanation:
          'XSS allows attackers to inject malicious scripts. Prevention includes escaping user input, using Content Security Policy (CSP), and avoiding dangerous APIs like innerHTML.',
      },
      {
        id: 'o2',
        text: 'XSS allows attackers to inject malicious scripts',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Prevention includes escaping user input, using Content Security Policy (CSP), and avoiding dangerous APIs like innerHTML',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 45)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
