const fs = require('fs');
const path = require('path');

/**
 * Generates remaining CSS questions (Responsive, Animations, Preprocessors, Performance, Architecture)
 */

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/css-questions.json'
);
let questionCounter = 21; // Continue from css-02-css20

// Read existing questions
let existingQuestions = [];
if (fs.existsSync(questionsFile)) {
  existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
  if (existingQuestions.length > 0) {
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

console.log('Starting CSS questions generation (Part 3 - Final)...');
console.log(`Current question count: ${existingQuestions.length}`);
console.log(`Starting from question ID counter: ${questionCounter}\n`);

// TOPIC 3: Responsive (10 questions)
console.log('Generating Responsive questions...');
const responsive = [
  {
    title:
      'Explain mobile-first vs desktop-first CSS. What are the advantages of mobile-first?',
    content:
      "Responsive design strategies differ. Explain mobile-first approach and why it's preferred over desktop-first.",
    difficulty: 'intermediate',
    tags: ['css', 'responsive', 'mobile-first', 'intermediate'],
    explanation:
      'Mobile-first: start with mobile styles, add larger screen styles with min-width media queries. Desktop-first: start with desktop, override with max-width. Mobile-first advantages: progressive enhancement, smaller initial CSS, better performance, aligns with mobile usage.',
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Mobile-first: start mobile, enhance for larger screens; better performance and progressive enhancement',
        isCorrect: true,
        explanation: 'Correct. Mobile-first is the modern best practice.',
      },
      {
        id: 'o2',
        text: 'Desktop-first is always better',
        isCorrect: false,
        explanation: 'Incorrect. Mobile-first is generally preferred.',
      },
      {
        id: 'o3',
        text: 'They are identical in performance',
        isCorrect: false,
        explanation:
          'Incorrect. Mobile-first typically has better performance.',
      },
      {
        id: 'o4',
        text: 'Mobile-first only works on mobile devices',
        isCorrect: false,
        explanation: 'Incorrect. Mobile-first works on all devices.',
      },
    ],
  },
  {
    title:
      'Which viewport meta tag settings are essential for responsive design? (Select all that apply)',
    content:
      'Viewport configuration is crucial for mobile responsiveness. Identify essential viewport settings.',
    difficulty: 'intermediate',
    tags: ['css', 'responsive', 'viewport', 'intermediate'],
    explanation:
      'width=device-width (sets viewport width), initial-scale=1 (prevents zoom on load), user-scalable (controls zoom). maximum-scale can prevent accessibility. Essential: width=device-width, initial-scale=1.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'width=device-width (sets viewport to device width)',
        isCorrect: true,
        explanation: 'Correct. Essential for responsive design.',
      },
      {
        id: 'o2',
        text: 'initial-scale=1 (prevents automatic zoom)',
        isCorrect: true,
        explanation: 'Correct. Prevents unwanted zoom on load.',
      },
      {
        id: 'o3',
        text: 'user-scalable=no (prevents user zoom - accessibility issue)',
        isCorrect: false,
        explanation: 'Incorrect. Disabling zoom harms accessibility.',
      },
      {
        id: 'o4',
        text: 'height=device-height (usually not needed)',
        isCorrect: false,
        explanation: 'Incorrect. Height is rarely needed for viewport.',
      },
    ],
  },
  {
    title:
      'Explain CSS container queries. How do they differ from media queries?',
    content:
      'Container queries are a modern CSS feature. Explain their purpose and advantages over media queries.',
    difficulty: 'difficult',
    tags: ['css', 'responsive', 'container-queries', 'difficult'],
    explanation:
      'Media queries: based on viewport size. Container queries: based on container size. Container queries enable component-level responsiveness (not just page-level). More flexible, better for component libraries. Limited browser support (Chrome 105+, Safari 16+).',
    points: 20,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Media queries: viewport-based; Container queries: container-based (component-level responsiveness)',
        isCorrect: true,
        explanation:
          'Correct. Container queries enable component-level responsiveness.',
      },
      {
        id: 'o2',
        text: 'They are identical',
        isCorrect: false,
        explanation: 'Incorrect. They query different things.',
      },
      {
        id: 'o3',
        text: 'Container queries are deprecated',
        isCorrect: false,
        explanation: 'Incorrect. Container queries are a modern feature.',
      },
      {
        id: 'o4',
        text: 'Media queries are always better',
        isCorrect: false,
        explanation: 'Incorrect. Container queries solve different problems.',
      },
    ],
  },
  {
    title:
      "What is the purpose of 'clamp()' function in CSS? How does it enable fluid typography?",
    content:
      'Fluid typography requires flexible sizing. Explain clamp() and how it creates responsive text sizes.',
    difficulty: 'intermediate',
    tags: ['css', 'responsive', 'typography', 'clamp', 'intermediate'],
    explanation:
      'clamp(min, preferred, max) sets value between min and max, with preferred scaling. Enables fluid typography that scales with viewport. Preferred value typically uses vw units. Example: clamp(1rem, 4vw, 2rem) scales between 1rem and 2rem based on viewport.',
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Sets value between min and max with fluid scaling; enables responsive typography',
        isCorrect: true,
        explanation: 'Correct. clamp() enables fluid responsive sizing.',
      },
      {
        id: 'o2',
        text: 'Only works for fixed sizes',
        isCorrect: false,
        explanation: 'Incorrect. clamp() is for fluid sizing.',
      },
      {
        id: 'o3',
        text: 'Is deprecated in favor of media queries',
        isCorrect: false,
        explanation:
          'Incorrect. clamp() is a modern feature that complements media queries.',
      },
      {
        id: 'o4',
        text: 'Only works with pixels',
        isCorrect: false,
        explanation: 'Incorrect. clamp() works with any CSS unit.',
      },
    ],
  },
  {
    title:
      'Which CSS units are best for responsive design? (Select all that apply)',
    content:
      'Unit choice affects responsiveness. Identify units that work well for responsive layouts.',
    difficulty: 'intermediate',
    tags: ['css', 'responsive', 'units', 'intermediate'],
    explanation:
      'Relative units are best: rem (root-relative), em (parent-relative), % (container-relative), vw/vh (viewport-relative), vmin/vmax (viewport min/max). Absolute units (px) are less flexible but sometimes needed for precise control.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'rem (root-relative, predictable)',
        isCorrect: true,
        explanation: 'Correct. rem is excellent for responsive design.',
      },
      {
        id: 'o2',
        text: 'vw/vh (viewport-relative)',
        isCorrect: true,
        explanation: 'Correct. Viewport units enable viewport-based sizing.',
      },
      {
        id: 'o3',
        text: '% (container-relative)',
        isCorrect: true,
        explanation: 'Correct. Percentages are flexible and responsive.',
      },
      {
        id: 'o4',
        text: 'px (absolute, less flexible)',
        isCorrect: false,
        explanation:
          'Incorrect. px is absolute and less flexible for responsive design.',
      },
    ],
  },
  {
    title:
      "Explain the difference between 'min-width' and 'max-width' in media queries. When should each be used?",
    content:
      'Media query direction matters for responsive design. Explain min-width vs max-width and their use cases.',
    difficulty: 'intermediate',
    tags: ['css', 'responsive', 'media-queries', 'intermediate'],
    explanation:
      'min-width: applies styles when viewport is at least X wide (mobile-first). max-width: applies when viewport is at most X wide (desktop-first). Use min-width for mobile-first, max-width for desktop-first. Mobile-first (min-width) is preferred.',
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'min-width: mobile-first (viewport >= X); max-width: desktop-first (viewport <= X)',
        isCorrect: true,
        explanation: 'Correct. min-width is for mobile-first approach.',
      },
      {
        id: 'o2',
        text: 'They are identical',
        isCorrect: false,
        explanation: 'Incorrect. They work in opposite directions.',
      },
      {
        id: 'o3',
        text: 'max-width is always better',
        isCorrect: false,
        explanation:
          'Incorrect. min-width (mobile-first) is generally preferred.',
      },
      {
        id: 'o4',
        text: 'min-width only works on mobile',
        isCorrect: false,
        explanation: 'Incorrect. min-width works on all devices.',
      },
    ],
  },
  {
    title:
      "What is the purpose of 'aspect-ratio' property? How does it help with responsive images and containers?",
    content:
      'Maintaining aspect ratios is important for responsive design. Explain the aspect-ratio property and its benefits.',
    difficulty: 'intermediate',
    tags: ['css', 'responsive', 'aspect-ratio', 'intermediate'],
    explanation:
      'aspect-ratio maintains width:height ratio when one dimension changes. Prevents layout shift, maintains design integrity. Useful for images, videos, cards. Format: aspect-ratio: 16/9 or aspect-ratio: 1 (square). Works with width or height.',
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Maintains width:height ratio; prevents layout shift in responsive designs',
        isCorrect: true,
        explanation: 'Correct. aspect-ratio prevents layout shift.',
      },
      {
        id: 'o2',
        text: 'Only works with images',
        isCorrect: false,
        explanation: 'Incorrect. aspect-ratio works with any element.',
      },
      {
        id: 'o3',
        text: 'Is deprecated',
        isCorrect: false,
        explanation: 'Incorrect. aspect-ratio is a modern CSS feature.',
      },
      {
        id: 'o4',
        text: 'Requires JavaScript',
        isCorrect: false,
        explanation: 'Incorrect. aspect-ratio is pure CSS.',
      },
    ],
  },
  {
    title:
      'Which media query features enable device-specific targeting? (Select all that apply)',
    content:
      'Media queries can target specific device characteristics. Identify features that enable precise targeting.',
    difficulty: 'intermediate',
    tags: ['css', 'responsive', 'media-queries', 'intermediate'],
    explanation:
      'width/height: viewport size. orientation: portrait/landscape. resolution: pixel density. prefers-color-scheme: dark/light mode. prefers-reduced-motion: accessibility. hover: pointer capability. pointer: fine/coarse/none.',
    points: 15,
    type: 'multiple-select',
    options: [
      {
        id: 'o1',
        text: 'orientation (portrait/landscape)',
        isCorrect: true,
        explanation: 'Correct. orientation targets device orientation.',
      },
      {
        id: 'o2',
        text: 'prefers-color-scheme (dark/light mode)',
        isCorrect: true,
        explanation: "Correct. Targets user's color scheme preference.",
      },
      {
        id: 'o3',
        text: 'hover (pointer capability)',
        isCorrect: true,
        explanation: 'Correct. Detects if device supports hover.',
      },
      {
        id: 'o4',
        text: 'device-type (not a real feature)',
        isCorrect: false,
        explanation: 'Incorrect. This is not a valid media query feature.',
      },
    ],
  },
  {
    title:
      "Explain 'object-fit' property. How does it control image/video sizing within containers?",
    content:
      'Responsive media requires proper sizing. Explain object-fit and its values for controlling media display.',
    difficulty: 'intermediate',
    tags: ['css', 'responsive', 'images', 'object-fit', 'intermediate'],
    explanation:
      'object-fit controls how replaced content (img, video) fits container: fill (stretch), contain (fit entire, may have gaps), cover (fill, may crop), none (original size), scale-down (smaller of contain/none). Essential for responsive images in fixed containers.',
    points: 15,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'Controls how img/video fits container: fill, contain, cover, none, scale-down',
        isCorrect: true,
        explanation: 'Correct. object-fit provides multiple fitting options.',
      },
      {
        id: 'o2',
        text: 'Only works with background images',
        isCorrect: false,
        explanation: 'Incorrect. object-fit works with img and video elements.',
      },
      {
        id: 'o3',
        text: 'Is deprecated',
        isCorrect: false,
        explanation: 'Incorrect. object-fit is a standard CSS property.',
      },
      {
        id: 'o4',
        text: 'Requires JavaScript',
        isCorrect: false,
        explanation: 'Incorrect. object-fit is pure CSS.',
      },
    ],
  },
  {
    title:
      "What is the difference between 'min()', 'max()', and 'clamp()' functions? When should each be used?",
    content:
      'CSS comparison functions enable flexible sizing. Explain min(), max(), and clamp() and their use cases.',
    difficulty: 'difficult',
    tags: ['css', 'responsive', 'functions', 'difficult'],
    explanation:
      'min(a, b): returns smaller value. max(a, b): returns larger value. clamp(min, val, max): constrains value between min and max. Use min() for maximum limits, max() for minimum limits, clamp() for both (most common for responsive sizing).',
    points: 20,
    type: 'multiple-choice',
    options: [
      {
        id: 'o1',
        text: 'min(): smaller value; max(): larger value; clamp(): value between min and max',
        isCorrect: true,
        explanation:
          'Correct. Each function serves different comparison purposes.',
      },
      {
        id: 'o2',
        text: 'They are identical',
        isCorrect: false,
        explanation: 'Incorrect. They perform different comparisons.',
      },
      {
        id: 'o3',
        text: 'clamp() is deprecated',
        isCorrect: false,
        explanation: 'Incorrect. clamp() is a modern, useful function.',
      },
      {
        id: 'o4',
        text: 'min() always returns the maximum',
        isCorrect: false,
        explanation: 'Incorrect. min() returns the minimum value.',
      },
    ],
  },
];

responsive.forEach(q => {
  newQuestions.push(
    createQuestion(
      3,
      q.title,
      q.content,
      'Responsive',
      q.difficulty,
      q.tags,
      q.explanation,
      q.points,
      q.options,
      q.type
    )
  );
});

console.log(`✅ Generated ${responsive.length} Responsive questions`);

// Continue with remaining topics in next part due to length...
// For now, write what we have
const allQuestions = [...existingQuestions, ...newQuestions];
fs.writeFileSync(questionsFile, JSON.stringify(allQuestions, null, 2));

console.log(
  `✅ Written ${allQuestions.length} total questions to ${questionsFile}`
);
console.log(
  `\n📝 Progress: Basics (10) + Layout (10) + Responsive (10) = ${allQuestions.length} questions`
);
console.log(
  `📝 Remaining: Animations, Preprocessors, Performance, Architecture`
);
