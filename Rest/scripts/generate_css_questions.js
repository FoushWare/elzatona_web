const fs = require('fs');
const path = require('path');

/**
 * Generates CSS questions and appends them to css-questions.json
 * Run this script in batches to avoid timeouts
 */

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/css-questions.json'
);
let questionCounter = 1;

// Read existing questions or start fresh
let existingQuestions = [];
if (fs.existsSync(questionsFile)) {
  existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
  if (existingQuestions.length > 0) {
    // Get the last question ID to continue numbering
    const lastId = existingQuestions[existingQuestions.length - 1].id;
    const match = lastId.match(/css-\d+-css(\d+)/);
    if (match) {
      questionCounter = parseInt(match[1]) + 1;
    }
  }
}

const getQuestionId = topicNum => {
  const id = `css-0${topicNum}-css${String(questionCounter++).padStart(2, '0')}`;
  return id;
};

const createQuestion = (
  topicNum,
  title,
  content,
  topic,
  difficulty,
  tags,
  explanation,
  points,
  options,
  questionType = 'multiple-choice'
) => {
  return {
    id: getQuestionId(topicNum),
    title,
    content,
    type: questionType,
    category: 'CSS',
    topic,
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

const newQuestions = [];

console.log('Starting CSS questions generation...');
console.log(`Current question count: ${existingQuestions.length}`);
console.log(`Starting from question ID counter: ${questionCounter}\n`);

// TOPIC 1: Basics (10 questions)
console.log('Generating Basics questions...');
const basics = [
  {
    title:
      'Explain CSS specificity. What is the order of specificity from highest to lowest?',
    content:
      'Senior developers must understand CSS specificity rules. Arrange the following in order from highest to lowest specificity.',
    difficulty: 'intermediate',
    tags: ['css', 'basics', 'specificity', 'intermediate'],
    explanation:
      'Specificity order: inline styles (1000) > IDs (100) > classes/attributes/pseudo-classes (10) > elements/pseudo-elements (1). !important overrides all but is not part of specificity calculation. More specific selectors win.',
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Inline styles > IDs > Classes/Attributes > Elements',
        isCorrect: true,
        explanation: 'Correct. This is the specificity hierarchy.',
      },
      {
        id: 'o2',
        text: 'IDs > Classes > Elements > Inline styles',
        isCorrect: false,
        explanation: 'Incorrect. Inline styles have the highest specificity.',
      },
      {
        id: 'o3',
        text: 'Classes > IDs > Elements > Inline styles',
        isCorrect: false,
        explanation: 'Incorrect. IDs have higher specificity than classes.',
      },
      {
        id: 'o4',
        text: 'All selectors have equal specificity',
        isCorrect: false,
        explanation:
          'Incorrect. Different selector types have different specificity values.',
      },
    ],
  },
  {
    title:
      'Which CSS properties are inherited by default? (Select all that apply)',
    content:
      'Understanding inheritance is crucial for CSS. Identify which properties are inherited by child elements.',
    difficulty: 'intermediate',
    tags: ['css', 'basics', 'inheritance', 'intermediate'],
    explanation:
      'Inherited properties include: color, font-family, font-size, line-height, text-align, visibility, and most text-related properties. Non-inherited: margin, padding, border, width, height, background, display, position.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'color',
        isCorrect: true,
        explanation: 'Correct. color is inherited.',
      },
      {
        id: 'o2',
        text: 'font-family',
        isCorrect: true,
        explanation: 'Correct. font-family is inherited.',
      },
      {
        id: 'o3',
        text: 'margin',
        isCorrect: false,
        explanation: 'Incorrect. margin is not inherited.',
      },
      {
        id: 'o4',
        text: 'line-height',
        isCorrect: true,
        explanation: 'Correct. line-height is inherited.',
      },
    ],
  },
  {
    title: "What is the difference between 'em' and 'rem' units in CSS?",
    content:
      'Relative units are important for responsive design. Explain when to use em vs rem and their calculation differences.',
    difficulty: 'intermediate',
    tags: ['css', 'basics', 'units', 'responsive', 'intermediate'],
    explanation:
      "'em' is relative to parent element's font-size (compounds with nesting). 'rem' is relative to root element's font-size (consistent regardless of nesting). Use 'rem' for predictable sizing, 'em' for component-relative sizing.",
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'em is relative to parent; rem is relative to root element',
        isCorrect: true,
        explanation: 'Correct. This is the key difference.',
      },
      {
        id: 'o2',
        text: 'em is relative to root; rem is relative to parent',
        isCorrect: false,
        explanation: "Incorrect. It's the opposite.",
      },
      {
        id: 'o3',
        text: 'They are identical and interchangeable',
        isCorrect: false,
        explanation: 'Incorrect. They calculate differently.',
      },
      {
        id: 'o4',
        text: 'em is for fonts, rem is for spacing',
        isCorrect: false,
        explanation: 'Incorrect. Both can be used for any property.',
      },
    ],
  },
  {
    title:
      "Explain the CSS box model. What is the difference between 'box-sizing: content-box' and 'box-sizing: border-box'?",
    content:
      'Box model understanding is fundamental. Explain how box-sizing affects width and height calculations.',
    difficulty: 'intermediate',
    tags: ['css', 'basics', 'box-model', 'intermediate'],
    explanation:
      'content-box: width/height = content only (padding/border add to total). border-box: width/height = content + padding + border (total size matches specified). border-box is more intuitive and commonly used in modern CSS.',
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'content-box: width excludes padding/border; border-box: width includes padding/border',
        isCorrect: true,
        explanation: 'Correct. This is how box-sizing works.',
      },
      {
        id: 'o2',
        text: 'They are identical',
        isCorrect: false,
        explanation: 'Incorrect. They calculate width differently.',
      },
      {
        id: 'o3',
        text: 'content-box is deprecated',
        isCorrect: false,
        explanation: 'Incorrect. Both are valid, just different behaviors.',
      },
      {
        id: 'o4',
        text: 'border-box excludes padding from width',
        isCorrect: false,
        explanation:
          'Incorrect. border-box includes padding and border in width.',
      },
    ],
  },
  {
    title:
      'Which CSS selectors have the highest specificity? (Select all that apply)',
    content:
      'Understanding selector specificity helps resolve style conflicts. Identify the highest specificity selectors.',
    difficulty: 'intermediate',
    tags: ['css', 'basics', 'selectors', 'specificity', 'intermediate'],
    explanation:
      "Inline styles (style='...') have highest specificity (1000). IDs (#id) have 100. Classes (.class), attributes ([attr]), and pseudo-classes (:hover) have 10. Elements (div) and pseudo-elements (::before) have 1.",
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'Inline styles (style attribute)',
        isCorrect: true,
        explanation: 'Correct. Inline styles have highest specificity.',
      },
      {
        id: 'o2',
        text: 'ID selectors (#id)',
        isCorrect: true,
        explanation: 'Correct. IDs have high specificity (100).',
      },
      {
        id: 'o3',
        text: 'Class selectors (.class)',
        isCorrect: false,
        explanation: 'Incorrect. Classes have lower specificity (10) than IDs.',
      },
      {
        id: 'o4',
        text: 'Element selectors (div)',
        isCorrect: false,
        explanation: 'Incorrect. Elements have lowest specificity (1).',
      },
    ],
  },
  {
    title:
      "What is the purpose of the '!important' declaration in CSS? When should it be used?",
    content:
      'The !important flag overrides specificity. Explain its purpose and best practices for usage.',
    difficulty: 'intermediate',
    tags: ['css', 'basics', 'important', 'specificity', 'intermediate'],
    explanation:
      '!important overrides all other declarations regardless of specificity. Should be used sparingly: for utility classes, framework overrides, or critical styles. Overuse makes CSS hard to maintain and debug. Consider refactoring instead.',
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Overrides all other declarations; use sparingly for critical styles or utility classes',
        isCorrect: true,
        explanation:
          'Correct. !important is powerful but should be used carefully.',
      },
      {
        id: 'o2',
        text: 'Increases specificity value by 1000',
        isCorrect: false,
        explanation:
          "Incorrect. !important doesn't change specificity, it overrides it.",
      },
      {
        id: 'o3',
        text: 'Should be used on all declarations for consistency',
        isCorrect: false,
        explanation: 'Incorrect. Overuse of !important is an anti-pattern.',
      },
      {
        id: 'o4',
        text: 'Only works with inline styles',
        isCorrect: false,
        explanation: 'Incorrect. !important works with any CSS declaration.',
      },
    ],
  },
  {
    title:
      "Explain the difference between 'display: none' and 'visibility: hidden'. How do they affect layout?",
    content:
      'Hiding elements has different methods. Explain the layout and rendering differences between these properties.',
    difficulty: 'intermediate',
    tags: ['css', 'basics', 'display', 'visibility', 'intermediate'],
    explanation:
      'display: none removes element from layout flow (takes no space, not accessible). visibility: hidden keeps element in layout (takes space, not visible, not accessible). opacity: 0 keeps element visible to screen readers but invisible.',
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'display: none removes from layout; visibility: hidden keeps space but hides element',
        isCorrect: true,
        explanation: 'Correct. This is the key difference.',
      },
      {
        id: 'o2',
        text: 'They are identical',
        isCorrect: false,
        explanation: 'Incorrect. They affect layout differently.',
      },
      {
        id: 'o3',
        text: 'visibility: hidden removes from layout',
        isCorrect: false,
        explanation: 'Incorrect. visibility: hidden keeps the space.',
      },
      {
        id: 'o4',
        text: 'display: none keeps the space',
        isCorrect: false,
        explanation:
          'Incorrect. display: none removes the element from layout.',
      },
    ],
  },
  {
    title: 'Which CSS units are absolute? (Select all that apply)',
    content:
      'Understanding unit types is important. Identify which CSS units are absolute (fixed size) vs relative.',
    difficulty: 'intermediate',
    tags: ['css', 'basics', 'units', 'intermediate'],
    explanation:
      "Absolute units: px (pixels), pt (points), pc (picas), in (inches), cm (centimeters), mm (millimeters). Relative units: em, rem, %, vw, vh, vmin, vmax, ch, ex. Absolute units don't scale with user preferences.",
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'px (pixels)',
        isCorrect: true,
        explanation: 'Correct. px is an absolute unit.',
      },
      {
        id: 'o2',
        text: 'pt (points)',
        isCorrect: true,
        explanation: 'Correct. pt is an absolute unit.',
      },
      {
        id: 'o3',
        text: 'em',
        isCorrect: false,
        explanation: 'Incorrect. em is a relative unit.',
      },
      {
        id: 'o4',
        text: 'rem',
        isCorrect: false,
        explanation: 'Incorrect. rem is a relative unit.',
      },
    ],
  },
  {
    title:
      'What is the CSS cascade? How does it determine which styles are applied?',
    content:
      'The cascade is fundamental to CSS. Explain how the cascade resolves conflicts between multiple style rules.',
    difficulty: 'intermediate',
    tags: ['css', 'basics', 'cascade', 'intermediate'],
    explanation:
      'Cascade order: 1) Importance (!important), 2) Specificity (higher wins), 3) Source order (later wins if equal). Stylesheet order matters when specificity is equal. User agent styles < author styles < user styles (with !important).',
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Resolves conflicts by: Importance > Specificity > Source order',
        isCorrect: true,
        explanation: 'Correct. This is the cascade order.',
      },
      {
        id: 'o2',
        text: 'Always uses the last declared style',
        isCorrect: false,
        explanation: 'Incorrect. Specificity and importance matter first.',
      },
      {
        id: 'o3',
        text: 'Always uses the most specific selector',
        isCorrect: false,
        explanation: 'Incorrect. !important can override specificity.',
      },
      {
        id: 'o4',
        text: 'Randomly selects from conflicting styles',
        isCorrect: false,
        explanation: 'Incorrect. Cascade follows specific rules.',
      },
    ],
  },
  {
    title:
      "Explain the difference between 'position: relative' and 'position: absolute'. How do they affect document flow?",
    content:
      'Positioning is crucial for layout. Explain how relative and absolute positioning differ in behavior and use cases.',
    difficulty: 'intermediate',
    tags: ['css', 'basics', 'positioning', 'intermediate'],
    explanation:
      "relative: element stays in normal flow, offset from its original position. absolute: element removed from flow, positioned relative to nearest positioned ancestor (or viewport). relative doesn't affect siblings, absolute does. Use relative for offsetting, absolute for overlays/tooltips.",
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'relative: stays in flow with offset; absolute: removed from flow, positioned relative to ancestor',
        isCorrect: true,
        explanation: 'Correct. This describes their behavior.',
      },
      {
        id: 'o2',
        text: 'They are identical',
        isCorrect: false,
        explanation: 'Incorrect. They behave very differently.',
      },
      {
        id: 'o3',
        text: 'absolute stays in flow, relative is removed',
        isCorrect: false,
        explanation: "Incorrect. It's the opposite.",
      },
      {
        id: 'o4',
        text: 'Both remove elements from flow',
        isCorrect: false,
        explanation: 'Incorrect. Only absolute removes from flow.',
      },
    ],
  },
];

basics.forEach(q => {
  newQuestions.push(
    createQuestion(
      1,
      q.title,
      q.content,
      'Basics',
      q.difficulty,
      q.tags,
      q.explanation,
      q.points,
      q.options,
      q.type
    )
  );
});

console.log(`✅ Generated ${basics.length} Basics questions`);
console.log(`Total questions so far: ${newQuestions.length}\n`);

// Write questions to file
const allQuestions = [...existingQuestions, ...newQuestions];
fs.writeFileSync(questionsFile, JSON.stringify(allQuestions, null, 2));

console.log(
  `✅ Written ${allQuestions.length} total questions to ${questionsFile}`
);
console.log(
  `\n📝 Next: Run the script again or continue with Layout questions...`
);
