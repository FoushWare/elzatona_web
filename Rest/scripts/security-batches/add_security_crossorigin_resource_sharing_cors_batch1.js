const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-04-sec33',
    title:
      'True or False: Cross-Origin Resource Sharing (CORS) overrides the Same-Origin Policy.',
    content: 'Evaluate this statement.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Cross-Origin Resource Sharing (CORS)',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:33:00.000Z',
    updatedAt: '2025-11-11T19:01:36.831Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'cross-origin-resource-sharing-cors',
      'cors',
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
          'CORS allows controlled access to resources from different origins, effectively relaxing SOP for approved domains.',
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
    subcategory: 'CORS',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-07-sec53',
    title: 'What is CORS (Cross-Origin Resource Sharing)?',
    content: 'Explain CORS and its role in web security.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Cross-Origin Resource Sharing (CORS)',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:53:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'cross-origin-resource-sharing-cors',
      'cors',
      'intermediate',
    ],
    explanation:
      'CORS is a security feature implemented by browsers to restrict web pages from making requests to a different domain than the one that served the web page. Proper CORS headers allow safe cross-origin requests while preventing unauthorized access.',
    points: 10,
    sampleAnswers: [
      'CORS is a security feature implemented by browsers to restrict web pages from making requests to a different domain than the one that served the web page. Proper CORS headers allow safe cross-origin requests while preventing unauthorized access.',
    ],
    subcategory: 'CORS',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'CORS is a security feature implemented by browsers to restrict web pages from making requests to a different domain than the one that served the web page. Proper CORS headers allow safe cross-origin requests while preventing unauthorized access.',
        isCorrect: true,
        explanation:
          'CORS is a security feature implemented by browsers to restrict web pages from making requests to a different domain than the one that served the web page. Proper CORS headers allow safe cross-origin requests while preventing unauthorized access.',
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
    id: 'sec-07-sec54',
    title: 'How can you safely allow cross-origin requests?',
    content: 'Select all correct options.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Cross-Origin Resource Sharing (CORS)',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:54:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'cross-origin-resource-sharing-cors',
      'cors',
      'intermediate',
    ],
    explanation:
      "Allow only trusted domains, use credentials carefully, and proxy requests server-side to control access. Using '*' allows any domain and is unsafe for sensitive data.",
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Set Access-Control-Allow-Origin to a specific trusted domain',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Use credentials (cookies) only when necessary',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: "Set Access-Control-Allow-Origin to '*'",
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Use server-side proxy to handle requests',
        isCorrect: true,
        explanation: '',
      },
    ],
    subcategory: 'CORS',
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
  `✅ Added ${newQuestions.length} questions for Cross-Origin Resource Sharing (CORS) (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
