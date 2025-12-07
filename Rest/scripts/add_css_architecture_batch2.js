const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/css-questions.json'
);
let existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
let questionCounter = existingQuestions.length + 1;

const getQuestionId = () =>
  `css-07-css${String(questionCounter++).padStart(2, '0')}`;

const createQuestion = (
  title,
  content,
  difficulty,
  tags,
  explanation,
  points,
  options,
  questionType = 'multiple-choice'
) => ({
  id: getQuestionId(),
  title,
  content,
  type: questionType,
  category: 'CSS',
  topic: 'Architecture',
  difficulty,
  learningCardId: 'core-technologies',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: 'admin',
  updatedBy: 'admin',
  tags,
  explanation,
  points,
  options,
  hints: [
    'Consider browser compatibility',
    'Think about maintainability',
    'Remember scalability',
  ],
  metadata: {},
});

const newQuestions = [
  createQuestion(
    'Explain BEM (Block Element Modifier) naming convention. How does it prevent CSS conflicts?',
    'BEM is a CSS naming methodology. Explain Block__Element--Modifier structure and its benefits.',
    'intermediate',
    ['css', 'architecture', 'bem', 'naming', 'intermediate'],
    'BEM: Block (component), Element (part of block), Modifier (variant). Syntax: .block__element--modifier. Benefits: prevents conflicts, clear structure, no nesting needed, self-documenting.',
    15,
    [
      {
        id: 'o1',
        text: 'Block__Element--Modifier; prevents conflicts; clear structure; self-documenting',
        isCorrect: true,
        explanation: 'Correct. BEM provides clear naming.',
      },
      {
        id: 'o2',
        text: 'Only uses classes',
        isCorrect: false,
        explanation: 'Incorrect. BEM can use any selector.',
      },
      {
        id: 'o3',
        text: 'Requires deep nesting',
        isCorrect: false,
        explanation: 'Incorrect. BEM avoids deep nesting.',
      },
      {
        id: 'o4',
        text: 'Is deprecated',
        isCorrect: false,
        explanation: 'Incorrect. BEM is widely used.',
      },
    ]
  ),
  createQuestion(
    'What is the purpose of CSS Modules? How do they solve scoping and naming conflicts?',
    'CSS Modules provide scoped CSS. Explain how CSS Modules work and solve global scope issues.',
    'intermediate',
    ['css', 'architecture', 'css-modules', 'scoping', 'intermediate'],
    'CSS Modules: locally scoped classes, generated unique class names, imported as objects. Solves global scope pollution, enables component-scoped styles. Works with build tools (Webpack, Vite).',
    15,
    [
      {
        id: 'o1',
        text: 'Locally scoped classes; unique names; imported as objects; solves global scope issues',
        isCorrect: true,
        explanation: 'Correct. CSS Modules provide scoping.',
      },
      {
        id: 'o2',
        text: 'Only works with React',
        isCorrect: false,
        explanation: 'Incorrect. Works with any framework.',
      },
      {
        id: 'o3',
        text: 'Requires global classes',
        isCorrect: false,
        explanation: 'Incorrect. CSS Modules are scoped.',
      },
      {
        id: 'o4',
        text: 'Is deprecated',
        isCorrect: false,
        explanation: 'Incorrect. CSS Modules are widely used.',
      },
    ]
  ),
  createQuestion(
    'Explain utility-first CSS (Tailwind approach). What are the advantages and trade-offs?',
    'Utility-first CSS uses utility classes. Explain the approach, benefits, and when to use it.',
    'difficult',
    ['css', 'architecture', 'utility-first', 'tailwind', 'difficult'],
    'Utility-first: small utility classes (e.g., .text-center, .p-4). Advantages: rapid development, consistent design, small bundle (with purging). Trade-offs: HTML verbosity, learning curve, less semantic.',
    20,
    [
      {
        id: 'o1',
        text: 'Small utility classes; rapid development; consistent design; trade-off: HTML verbosity',
        isCorrect: true,
        explanation: 'Correct. Utility-first has trade-offs.',
      },
      {
        id: 'o2',
        text: 'Always better than component CSS',
        isCorrect: false,
        explanation: 'Incorrect. Depends on use case.',
      },
      {
        id: 'o3',
        text: 'Only works with Tailwind',
        isCorrect: false,
        explanation: 'Incorrect. Concept applies to any utility framework.',
      },
      {
        id: 'o4',
        text: 'Is deprecated',
        isCorrect: false,
        explanation: 'Incorrect. Utility-first is popular.',
      },
    ]
  ),
];

existingQuestions.push(...newQuestions);
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));
console.log(`✅ Added ${newQuestions.length} Architecture questions (Batch 2)`);
console.log(`📊 Total: ${existingQuestions.length} questions`);
