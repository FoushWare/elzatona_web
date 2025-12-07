const fs = require('fs');
const path = require('path');

/**
 * Adds 3 more CSS Animations questions (Batch 2)
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
    "Explain CSS 'animation-play-state' property. How can it be used to pause/resume animations?",
    'Animation play state controls animation execution. Explain how to pause and resume animations dynamically.',
    'intermediate',
    ['css', 'animations', 'play-state', 'intermediate'],
    'animation-play-state: running (default, plays), paused (pauses animation). Can be toggled with :hover, JavaScript, or media queries. Useful for interactive controls, accessibility (prefers-reduced-motion).',
    15,
    [
      {
        id: 'o1',
        text: 'running: plays animation; paused: pauses animation; can be toggled dynamically',
        isCorrect: true,
        explanation: 'Correct. play-state controls animation execution.',
      },
      {
        id: 'o2',
        text: 'They are identical',
        isCorrect: false,
        explanation: 'Incorrect. They control different states.',
      },
      {
        id: 'o3',
        text: 'Only works with JavaScript',
        isCorrect: false,
        explanation: 'Incorrect. Can be controlled with CSS.',
      },
      {
        id: 'o4',
        text: 'Is deprecated',
        isCorrect: false,
        explanation: 'Incorrect. play-state is a standard property.',
      },
    ]
  ),
  createQuestion(
    "What is the difference between CSS 'transition' and 'animation'? When should each be used?",
    'Transitions and animations both create motion. Explain the differences and appropriate use cases for each.',
    'intermediate',
    ['css', 'animations', 'transitions', 'intermediate'],
    'transition: simple state changes (hover, focus), single property changes, automatic trigger. animation: complex sequences, multiple keyframes, programmatic control, loops. Use transition for simple changes, animation for complex sequences.',
    15,
    [
      {
        id: 'o1',
        text: 'transition: simple state changes; animation: complex sequences with keyframes',
        isCorrect: true,
        explanation: 'Correct. They serve different purposes.',
      },
      {
        id: 'o2',
        text: 'They are identical',
        isCorrect: false,
        explanation: 'Incorrect. They work differently.',
      },
      {
        id: 'o3',
        text: 'animation is deprecated',
        isCorrect: false,
        explanation: 'Incorrect. Both are valid and useful.',
      },
      {
        id: 'o4',
        text: 'transition only works with JavaScript',
        isCorrect: false,
        explanation: 'Incorrect. transition is pure CSS.',
      },
    ]
  ),
  createQuestion(
    "Which CSS animation properties respect 'prefers-reduced-motion'? How should animations be made accessible?",
    'Accessibility is crucial for animations. Explain how to respect user motion preferences and create accessible animations.',
    'difficult',
    [
      'css',
      'animations',
      'accessibility',
      'prefers-reduced-motion',
      'difficult',
    ],
    'prefers-reduced-motion: user preference for less motion. Use @media (prefers-reduced-motion: reduce) to disable or simplify animations. Essential for vestibular disorders, motion sensitivity. Always provide reduced-motion alternative.',
    20,
    [
      {
        id: 'o1',
        text: 'Use @media (prefers-reduced-motion: reduce) to disable/simplify animations; essential for accessibility',
        isCorrect: true,
        explanation: 'Correct. Always respect motion preferences.',
      },
      {
        id: 'o2',
        text: 'Animations ignore user preferences',
        isCorrect: false,
        explanation: 'Incorrect. We should respect preferences.',
      },
      {
        id: 'o3',
        text: 'Only works with JavaScript',
        isCorrect: false,
        explanation: 'Incorrect. Can be handled with CSS media queries.',
      },
      {
        id: 'o4',
        text: 'Is deprecated',
        isCorrect: false,
        explanation:
          'Incorrect. prefers-reduced-motion is essential for accessibility.',
      },
    ]
  ),
];

existingQuestions.push(...newQuestions);
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));

console.log(`✅ Added ${newQuestions.length} Animations questions (Batch 2)`);
console.log(`📊 Total CSS questions: ${existingQuestions.length}`);
