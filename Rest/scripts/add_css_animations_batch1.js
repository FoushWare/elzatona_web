const fs = require('fs');
const path = require('path');

/**
 * Adds 3 more CSS Animations questions (Batch 1)
 */

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/css-questions.json'
);
let existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
let questionCounter = existingQuestions.length + 1;

const getQuestionId = () => {
  const id = `css-04-css${String(questionCounter++).padStart(2, '0')}`;
  return id;
};

const createQuestion = (
  title,
  content,
  difficulty,
  tags,
  explanation,
  points,
  options,
  questionType = 'multiple-choice'
) => {
  return {
    id: getQuestionId(),
    title,
    content,
    type: questionType,
    category: 'CSS',
    topic: 'Animations',
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
      'Consider browser compatibility and modern CSS features',
      'Think about performance implications and best practices',
      'Remember that CSS affects both visual design and user experience',
    ],
    metadata: {},
  };
};

const newQuestions = [
  createQuestion(
    "Explain CSS 'animation-fill-mode' property. What values does it accept and what do they do?",
    'Animation fill mode controls element state before/after animation. Explain fill-mode values and their behavior.',
    'intermediate',
    ['css', 'animations', 'fill-mode', 'intermediate'],
    'animation-fill-mode: none (default, no styles before/after), forwards (keeps final keyframe), backwards (applies first keyframe before start), both (forwards + backwards). Controls element appearance outside animation duration.',
    15,
    [
      {
        id: 'o1',
        text: 'none: no styles; forwards: keeps final; backwards: applies first; both: forwards + backwards',
        isCorrect: true,
        explanation: 'Correct. Each value controls different timing.',
      },
      {
        id: 'o2',
        text: 'They are identical',
        isCorrect: false,
        explanation: 'Incorrect. They behave differently.',
      },
      {
        id: 'o3',
        text: "Only 'forwards' works",
        isCorrect: false,
        explanation: 'Incorrect. All values are valid.',
      },
      {
        id: 'o4',
        text: 'Is deprecated',
        isCorrect: false,
        explanation: 'Incorrect. fill-mode is a standard property.',
      },
    ]
  ),
  createQuestion(
    'Which CSS properties enable hardware acceleration for animations? (Select all that apply)',
    'Hardware acceleration improves animation performance. Identify CSS properties that trigger GPU acceleration.',
    'intermediate',
    [
      'css',
      'animations',
      'performance',
      'hardware-acceleration',
      'intermediate',
    ],
    'Properties that trigger GPU: transform (translate, scale, rotate), opacity, filter, will-change. These use compositor layer, avoid layout/paint. Avoid animating width, height, top, left (trigger layout).',
    15,
    'multiple-select',
    [
      {
        id: 'o1',
        text: 'transform (translate, scale, rotate)',
        isCorrect: true,
        explanation: 'Correct. transform triggers GPU acceleration.',
      },
      {
        id: 'o2',
        text: 'opacity',
        isCorrect: true,
        explanation: 'Correct. opacity triggers GPU acceleration.',
      },
      {
        id: 'o3',
        text: 'filter',
        isCorrect: true,
        explanation: 'Correct. filter triggers GPU acceleration.',
      },
      {
        id: 'o4',
        text: 'width / height (not GPU accelerated)',
        isCorrect: false,
        explanation: 'Incorrect. width/height trigger layout, not GPU.',
      },
    ]
  ),
  createQuestion(
    "What is the purpose of 'will-change' property? When should it be used and when should it be avoided?",
    'will-change hints to browser about upcoming changes. Explain proper usage and performance implications.',
    'difficult',
    ['css', 'animations', 'performance', 'will-change', 'difficult'],
    "will-change: hints browser to optimize for property changes. Use sparingly: only when animation is about to start, remove after. Overuse causes memory issues. Don't use preemptively. Remove when animation ends.",
    20,
    [
      {
        id: 'o1',
        text: 'Hints browser for optimization; use only when animation starts, remove after; overuse causes memory issues',
        isCorrect: true,
        explanation: 'Correct. will-change should be used judiciously.',
      },
      {
        id: 'o2',
        text: 'Always use for all elements',
        isCorrect: false,
        explanation: 'Incorrect. Overuse causes performance issues.',
      },
      {
        id: 'o3',
        text: 'Only works with JavaScript',
        isCorrect: false,
        explanation: 'Incorrect. will-change is pure CSS.',
      },
      {
        id: 'o4',
        text: 'Is deprecated',
        isCorrect: false,
        explanation: 'Incorrect. will-change is a modern optimization feature.',
      },
    ]
  ),
];

existingQuestions.push(...newQuestions);
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));

console.log(`✅ Added ${newQuestions.length} Animations questions (Batch 1)`);
console.log(`📊 Total CSS questions: ${existingQuestions.length}`);
