export interface Question {
  id: string;
  title: string;
  question: string;
  answer: string;
  explanation?: string;
  codeExample?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  tags?: string[];
  options?: string[];
  correctAnswer?: number;
}

export interface QuestionGroup {
  id: string;
  title: string;
  questions: Question[];
  totalQuestions: number;
}

export interface QuestionsData {
  groups: QuestionGroup[];
  totalQuestions: number;
}

// Mapping from learning path IDs to QuestionsBank directories
export const pathToQuestionsMap: Record<string, string> = {
  'frontend-basics': 'frontend-basics',
  'advanced-css': 'advanced-css',
  'javascript-deep-dive': 'javascript-deep-dive',
  'react-mastery': 'react-mastery',
  'typescript-essentials': 'typescript-essentials',
  'performance-optimization': 'web-performance',
  'security-essentials': 'security',
  'system-design': 'system-design',
  'api-integration': 'api-design',
  'testing-strategies': 'testing-strategies',
  'build-tools-mastery': 'deployment-devops',
  accessibility: 'accessibility',
  'git-version-control': 'git-version-control',
  'english-learning': 'english-learning',
};

// Mock questions data for demonstration
export const mockQuestionsData: Record<string, Question[]> = {
  'frontend-basics': [
    {
      id: 'q1',
      title: 'CSS Display Properties - Block Elements',
      question:
        'Which of the following statements about display: block is true?',
      answer: 'B) It always starts on a new line.',
      explanation:
        'Block-level elements always start on a new line and take up the full width of their container. They can have width and height properties set, unlike inline elements.',
      difficulty: 'beginner',
      category: 'CSS',
      options: [
        'It takes only the width of its content.',
        'It always starts on a new line.',
        'Width and height cannot be set.',
        'It behaves like inline elements.',
      ],
      correctAnswer: 1,
    },
    {
      id: 'q2',
      title: 'CSS Display Properties - Inline Elements',
      question: 'What happens when you apply display: inline to an element?',
      answer: 'B) It ignores width and height properties.',
      explanation:
        'Inline elements ignore width and height properties and only take up as much space as their content requires. They flow with text and do not start on new lines.',
      difficulty: 'beginner',
      category: 'CSS',
      options: [
        'It takes the full width of its parent.',
        'It ignores width and height properties.',
        'It always starts on a new line.',
        'It behaves like a block element.',
      ],
      correctAnswer: 1,
    },
    {
      id: 'q3',
      title: 'CSS Display Properties - Inline-Block Elements',
      question:
        'Which display type allows you to place elements side-by-side and set custom width and height?',
      answer: 'C) inline-block',
      explanation:
        'inline-block combines the best of both worlds: elements flow inline like inline elements but can have width and height set like block elements, making them perfect for side-by-side layouts with custom dimensions.',
      difficulty: 'beginner',
      category: 'CSS',
      options: ['block', 'inline', 'inline-block', 'none of the above'],
      correctAnswer: 2,
    },
    {
      id: 'q4',
      title: 'CSS Display Properties - Inline Behavior',
      question:
        'For an element with display: inline, which of the following is true?',
      answer: 'C) It flows with text and takes only content width.',
      explanation:
        'Inline elements flow with text content and only take up the width needed for their content. They cannot have width/height set and do not start on new lines.',
      difficulty: 'beginner',
      category: 'CSS',
      options: [
        'You can set width and height freely.',
        'Vertical margin works normally.',
        'It flows with text and takes only content width.',
        'It always pushes the next element to a new line.',
      ],
      correctAnswer: 2,
    },
    {
      id: 'q5',
      title: 'CSS Display Properties - Block Elements Examples',
      question:
        'Which of the following are examples of default block-level elements? (Choose all that apply)',
      answer: 'A, B, D) <div>, <p>, <h1>',
      explanation:
        'Block-level elements like <div>, <p>, and <h1> take up the full width of their container and start on new lines. <span> is an inline element by default.',
      difficulty: 'beginner',
      category: 'CSS',
      options: ['<div>', '<p>', '<span>', '<h1>'],
      correctAnswer: 0, // Note: This is a multiple choice question, but the current system only supports single choice
    },
    {
      id: 'q6',
      title: 'CSS Display Properties - Inline Elements Examples',
      question:
        'Which of the following are examples of default inline elements? (Choose all that apply)',
      answer: 'A, B) <a>, <strong>',
      explanation:
        'Inline elements like <a> and <strong> flow with text and only take up the space needed for their content. <img> is inline-block by default, and <section> is a block element.',
      difficulty: 'beginner',
      category: 'CSS',
      options: ['<a>', '<strong>', '<img>', '<section>'],
      correctAnswer: 0, // Note: This is a multiple choice question, but the current system only supports single choice
    },
    {
      id: 'q7',
      title: 'CSS Display Properties - Navigation Layout',
      question:
        'If you want to create button-like navigation items that align side-by-side and allow custom width/height, which display property is most suitable?',
      answer: 'C) inline-block',
      explanation:
        'inline-block is perfect for navigation items because it allows elements to sit side-by-side (like inline) while still allowing you to set custom width and height (like block).',
      difficulty: 'beginner',
      category: 'CSS',
      options: ['block', 'inline', 'inline-block', 'flex'],
      correctAnswer: 2,
    },
    {
      id: 'q8',
      title: 'JavaScript Variables',
      question:
        'Explain the difference between `var`, `let`, and `const` in JavaScript.',
      answer:
        '**`var`**: Function-scoped, can be redeclared, hoisted with `undefined` value. Can cause issues with block scope.\n\n**`let`**: Block-scoped, cannot be redeclared in same scope, hoisted but not initialized (temporal dead zone).\n\n**`const`**: Block-scoped, cannot be redeclared or reassigned, must be initialized when declared.',
      explanation:
        'The key differences are in scoping, hoisting behavior, and mutability. `var` has function scope and is hoisted, while `let` and `const` have block scope and are in a temporal dead zone until declared.',
      difficulty: 'beginner',
      category: 'JavaScript',
      options: [
        'var is function-scoped and hoisted, let and const are block-scoped with temporal dead zone',
        'All three are exactly the same in modern JavaScript',
        'var is for numbers, let is for strings, const is for objects',
        'var is deprecated, let and const are the same thing',
      ],
      correctAnswer: 0,
    },
    {
      id: 'q9',
      title: 'HTML Semantic Elements',
      question: 'What are semantic HTML elements and why are they important?',
      answer:
        'Semantic HTML elements clearly describe their meaning and purpose to both browsers and developers.\n\n**Examples:**\n- `<header>`: Page or section header\n- `<nav>`: Navigation links\n- `<main>`: Main content of the page\n- `<article>`: Self-contained content\n- `<section>`: Thematic grouping of content\n- `<aside>`: Sidebar or related content\n- `<footer>`: Page or section footer\n\n**Benefits:**\n- **Accessibility**: Screen readers understand content structure\n- **SEO**: Search engines better understand content\n- **Maintainability**: Code is self-documenting\n- **Styling**: Easier to target with CSS',
      explanation:
        'Semantic elements provide meaning to the content, making it more accessible to assistive technologies and better for SEO. They also make the code more maintainable and easier to style.',
      difficulty: 'beginner',
      category: 'HTML',
      options: [
        'They provide meaning to content, improving accessibility, SEO, and code maintainability',
        'They are just fancy divs with no real purpose',
        'They are only important for mobile websites',
        'They are deprecated in HTML5',
      ],
      correctAnswer: 0,
    },
  ],
  'advanced-css': [
    {
      id: 'q1',
      title: 'CSS Grid vs Flexbox',
      question: 'When should you use CSS Grid vs Flexbox?',
      answer:
        '**CSS Grid**: 2-dimensional layout system (rows and columns). Best for complex layouts, page structure, and when you need precise control over both dimensions. Use for: page layouts, card grids, complex forms.\n\n**Flexbox**: 1-dimensional layout system (either row OR column). Best for component-level layouts and distributing space within a container. Use for: navigation bars, centering content, distributing items evenly.\n\n**Rule of thumb**: Grid for layout, Flexbox for components.',
      explanation:
        'Grid is for 2D layouts (both rows and columns), while Flexbox is for 1D layouts (either row or column). Grid is better for overall page structure, Flexbox is better for component-level layouts.',
      difficulty: 'intermediate',
      category: 'CSS',
      options: [
        'Grid for 2D layouts and page structure, Flexbox for 1D layouts and components',
        "Always use Grid because it's more powerful",
        "Always use Flexbox because it's simpler",
        'They are exactly the same, use whichever you prefer',
      ],
      correctAnswer: 0,
    },
  ],
  'javascript-deep-dive': [
    {
      id: 'q1',
      title: 'JavaScript Event Loop',
      question: 'What is the execution order of this code?',
      answer:
        "The Event Loop manages asynchronous execution with a Call Stack (sync code), a Microtask Queue (for promises), and a Macrotask Queue (for timers, events).\n\n**Execution Order:**\n1. 'start' (sync, goes to stack)\n2. 'end' (sync, goes to stack)\n3. 'promise' (microtask, runs after sync code)\n4. 'timeout' (macrotask, runs after microtasks are clear)\n\n**Output:** start, end, promise, timeout.",
      explanation:
        'Synchronous code runs first, then microtasks (promises), then macrotasks (setTimeout). This is because microtasks have higher priority than macrotasks in the event loop.',
      difficulty: 'intermediate',
      category: 'JavaScript',
      codeExample:
        "console.log('start');\nsetTimeout(() => console.log('timeout'), 0);\nPromise.resolve().then(() => console.log('promise'));\nconsole.log('end');",
      options: [
        'start, end, promise, timeout',
        'start, promise, end, timeout',
        'start, timeout, end, promise',
        'promise, start, end, timeout',
      ],
      correctAnswer: 0,
    },
  ],
};

export async function getQuestionsForPath(
  pathId: string
): Promise<QuestionsData> {
  try {
    // Try to fetch questions from API first
    const response = await fetch(`/api/questions/${pathId}`);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.warn(
        `Could not load questions from API for ${pathId}, falling back to mock data`
      );
      return getMockQuestionsForPath(pathId);
    }
  } catch (error) {
    console.warn(
      `Error fetching questions for ${pathId}, falling back to mock data:`,
      error
    );
    return getMockQuestionsForPath(pathId);
  }
}

function getMockQuestionsForPath(pathId: string): QuestionsData {
  const questions = mockQuestionsData[pathId] || [];

  // Group questions into chunks of 20
  const groups: QuestionGroup[] = [];
  const questionsPerGroup = 20;

  for (let i = 0; i < questions.length; i += questionsPerGroup) {
    const groupQuestions = questions.slice(i, i + questionsPerGroup);
    const groupNumber = Math.floor(i / questionsPerGroup) + 1;

    groups.push({
      id: `group-${groupNumber}`,
      title: `Questions ${i + 1}-${Math.min(i + questionsPerGroup, questions.length)}`,
      questions: groupQuestions,
      totalQuestions: groupQuestions.length,
    });
  }

  return {
    groups,
    totalQuestions: questions.length,
  };
}

export async function getQuestionById(
  pathId: string,
  questionId: string
): Promise<Question | null> {
  const questionsData = await getQuestionsForPath(pathId);

  for (const group of questionsData.groups) {
    const question = group.questions.find(q => q.id === questionId);
    if (question) {
      return question;
    }
  }

  return null;
}
