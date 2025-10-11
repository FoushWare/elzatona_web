// This script will be used to manually add questions via Firebase MCP
// Since we can't use the CLI due to permission issues, we'll use MCP tools

const sampleQuestions = [
  {
    id: 'js-q-001',
    title: "What's the output of hoisting with var and let?",
    content:
      "What's the output?\n\n```javascript\nfunction sayHi() {\n  console.log(name);\n  console.log(age);\n  var name = 'Lydia';\n  let age = 21;\n}\nsayHi();\n```",
    type: 'multiple-choice',
    category: 'JavaScript Core',
    topic: 'Hoisting',
    learningPath: 'Advanced JavaScript Concepts',
    difficulty: 'intermediate',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
    tags: ['javascript', 'hoisting', 'var', 'let', 'temporal-dead-zone'],
    explanation:
      'Within the function, the `name` variable declared with `var` is hoisted and initialized with `undefined`. The `age` variable declared with `let` is hoisted but not initialized, so accessing it before declaration throws a `ReferenceError` due to the temporal dead zone.',
    points: 8,
    options: [
      {
        id: 'a',
        text: '`Lydia` and `undefined`',
        isCorrect: false,
        explanation:
          "`name` is hoisted but not yet assigned, so it's `undefined`, not `'Lydia'`.",
      },
      {
        id: 'b',
        text: '`Lydia` and `ReferenceError`',
        isCorrect: false,
        explanation: "`name` is `undefined`, not `'Lydia'`.",
      },
      {
        id: 'c',
        text: '`ReferenceError` and `21`',
        isCorrect: false,
        explanation:
          '`name` is accessible (as `undefined`), but `age` throws `ReferenceError` before assignment.',
      },
      {
        id: 'd',
        text: '`undefined` and `ReferenceError`',
        isCorrect: true,
        explanation:
          'Correct: `var` is hoisted and initialized to `undefined`; `let` is in TDZ and throws `ReferenceError`.',
      },
    ],
    metadata: {
      source: 'javascript-questions-repo',
      version: '1.0.0',
    },
  },
];

console.log('Sample questions prepared for Firebase MCP seeding:');
console.log(JSON.stringify(sampleQuestions, null, 2));
