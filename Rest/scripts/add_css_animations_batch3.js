const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/css-questions.json'
);
let existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
let questionCounter = existingQuestions.length + 1;

const getQuestionId = () =>
  `css-04-css${String(questionCounter++).padStart(2, '0')}`;

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
    'Consider browser compatibility',
    'Think about performance',
    'Remember accessibility',
  ],
  metadata: {},
});

const newQuestions = [
  createQuestion(
    "Explain CSS 'animation-direction' property. What values control animation playback direction?",
    'Animation direction controls how keyframes are played. Explain direction values and their effects.',
    'intermediate',
    ['css', 'animations', 'direction', 'intermediate'],
    'animation-direction: normal (forward), reverse (backward), alternate (forward then reverse), alternate-reverse (reverse then forward). Controls keyframe sequence playback direction.',
    15,
    [
      {
        id: 'o1',
        text: 'normal: forward; reverse: backward; alternate: forward/reverse; alternate-reverse: reverse/forward',
        isCorrect: true,
        explanation: 'Correct. Each value controls playback direction.',
      },
      {
        id: 'o2',
        text: 'They are identical',
        isCorrect: false,
        explanation: 'Incorrect. They play differently.',
      },
      {
        id: 'o3',
        text: "Only 'normal' works",
        isCorrect: false,
        explanation: 'Incorrect. All values are valid.',
      },
      {
        id: 'o4',
        text: 'Is deprecated',
        isCorrect: false,
        explanation: 'Incorrect. direction is standard.',
      },
    ]
  ),
  createQuestion(
    "What is the purpose of CSS 'animation-timing-function'? Which timing functions are available?",
    'Timing functions control animation speed curves. Explain timing functions and their visual effects.',
    'intermediate',
    ['css', 'animations', 'timing-function', 'easing', 'intermediate'],
    'Timing functions: ease (default), linear (constant), ease-in (slow start), ease-out (slow end), ease-in-out (slow start/end), cubic-bezier (custom curve), steps (discrete steps). Controls acceleration/deceleration.',
    15,
    [
      {
        id: 'o1',
        text: 'Controls speed curve: ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier, steps',
        isCorrect: true,
        explanation: 'Correct. Timing functions control animation curve.',
      },
      {
        id: 'o2',
        text: "Only 'ease' exists",
        isCorrect: false,
        explanation: 'Incorrect. Multiple functions available.',
      },
      {
        id: 'o3',
        text: 'Controls animation duration',
        isCorrect: false,
        explanation: 'Incorrect. Duration is separate property.',
      },
      {
        id: 'o4',
        text: 'Is deprecated',
        isCorrect: false,
        explanation: 'Incorrect. Timing functions are essential.',
      },
    ]
  ),
  createQuestion(
    'How can CSS animations be synchronized with JavaScript? What APIs enable programmatic control?',
    'JavaScript can control CSS animations. Explain how to synchronize and control animations programmatically.',
    'difficult',
    ['css', 'animations', 'javascript', 'api', 'difficult'],
    'Use animation events: animationstart, animationend, animationiteration. Access via element.ontransitionend or addEventListener. Can pause/resume with animation-play-state. Use requestAnimationFrame for synchronization.',
    20,
    [
      {
        id: 'o1',
        text: 'Use animation events (animationstart/end/iteration); control with animation-play-state; sync with requestAnimationFrame',
        isCorrect: true,
        explanation: 'Correct. Multiple APIs enable control.',
      },
      {
        id: 'o2',
        text: 'Cannot be controlled',
        isCorrect: false,
        explanation: 'Incorrect. JavaScript can control animations.',
      },
      {
        id: 'o3',
        text: 'Only works with inline styles',
        isCorrect: false,
        explanation: 'Incorrect. Works with CSS classes too.',
      },
      {
        id: 'o4',
        text: 'Is deprecated',
        isCorrect: false,
        explanation: 'Incorrect. Animation APIs are standard.',
      },
    ]
  ),
];

existingQuestions.push(...newQuestions);
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));
console.log(`✅ Added ${newQuestions.length} Animations questions (Batch 3)`);
console.log(`📊 Total: ${existingQuestions.length} questions`);
