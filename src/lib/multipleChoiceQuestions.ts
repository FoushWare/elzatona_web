export interface MultipleChoiceQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer (0-based)
  explanation: string;
  category: 'css' | 'javascript' | 'html' | 'websockets' | 'react' | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export const multipleChoiceQuestions: MultipleChoiceQuestion[] = [
  // CSS Questions
  {
    id: 'css-1',
    question:
      "You have two columns, and in the second column items are sitting at the bottom, even though you didn't set any alignment. Which CSS property is causing this by default?",
    options: [
      'align-items: stretch',
      'align-items: flex-start',
      'align-items: flex-end',
      'justify-content: flex-end',
    ],
    correctAnswer: 1,
    explanation:
      'align-items: flex-start is the default value for flex containers. However, margin-top: auto or grid alignment could also push items down depending on context.',
    category: 'css',
    difficulty: 'medium',
    tags: ['flexbox', 'alignment', 'css'],
  },
  {
    id: 'css-2',
    question: 'What is the computed width when using box-sizing: border-box?',
    options: [
      'width + padding + border',
      'width',
      'content-width + padding',
      'content-width + padding + border',
    ],
    correctAnswer: 1,
    explanation:
      'With box-sizing: border-box, the declared width includes padding and border, so the computed width equals the declared width.',
    category: 'css',
    difficulty: 'easy',
    tags: ['box-model', 'css', 'layout'],
  },
  {
    id: 'css-3',
    question: 'Which of the following selectors are pseudo-class selectors?',
    options: [':hover', '::before', ':nth-child(2)', '::after'],
    correctAnswer: 0,
    explanation:
      ':hover and :nth-child(2) are pseudo-classes, while ::before and ::after are pseudo-elements.',
    category: 'css',
    difficulty: 'medium',
    tags: ['selectors', 'pseudo-classes', 'css'],
  },
  {
    id: 'css-4',
    question:
      'If you set border widths like this: top = 10px, bottom = 5px, left = 20px, right = 1px, how would you write it in CSS shorthand?',
    options: [
      'border-width: 10px 5px 20px 1px;',
      'border-width: 10px 1px 5px 20px;',
      'border-width: 10px 20px 5px 1px;',
      'border-width: 10px 20px 1px 5px;',
    ],
    correctAnswer: 1,
    explanation:
      'CSS shorthand order is: top → right → bottom → left (clockwise from top).',
    category: 'css',
    difficulty: 'medium',
    tags: ['border', 'shorthand', 'css'],
  },
  {
    id: 'css-5',
    question: 'What is the universal selector in CSS?',
    options: ['*', '.', '#', ':root'],
    correctAnswer: 0,
    explanation: '* is the universal selector that matches all elements.',
    category: 'css',
    difficulty: 'easy',
    tags: ['selectors', 'css', 'universal'],
  },
  {
    id: 'css-6',
    question: 'What does the CSS contain: strict; property do?',
    options: [
      'Makes the element a containing block for fixed-position descendants',
      'Prevents the element from having visual effects outside its box',
      'Turns the element into a flex container with flex-wrap enabled',
      'Applies strict rendering optimizations for performance',
    ],
    correctAnswer: 1,
    explanation:
      "contain: strict creates a new containing block and stacking context, preventing visual effects from leaking outside the element's box.",
    category: 'css',
    difficulty: 'hard',
    tags: ['contain', 'css', 'performance'],
  },

  // HTML Questions
  {
    id: 'html-1',
    question: 'Which HTML event attribute occurs when you click an element?',
    options: ['onmouseover', 'onchange', 'onclick', 'ondblclick'],
    correctAnswer: 2,
    explanation:
      'onclick is the event attribute that fires when an element is clicked.',
    category: 'html',
    difficulty: 'easy',
    tags: ['events', 'html', 'click'],
  },

  // JavaScript Questions
  {
    id: 'js-1',
    question:
      'Which of the following returns a single character (char) in JavaScript?',
    options: [
      '"abc".substr(0)',
      '"abc".charAt(0)',
      '"abc".substring(0)',
      '"abc".slice(0)',
    ],
    correctAnswer: 1,
    explanation:
      'Only charAt(0) returns a single character "a". Other methods return the entire string from index 0 onward.',
    category: 'javascript',
    difficulty: 'easy',
    tags: ['strings', 'javascript', 'methods'],
  },
  {
    id: 'js-2',
    question:
      'Which of the following JavaScript events will always trigger when a key is pressed on the keyboard?',
    options: ['onkeypress', 'onkeydown', 'onkeyup', 'onclick'],
    correctAnswer: 1,
    explanation:
      "onkeydown triggers as soon as a key is pressed down, and it always fires for every key. onkeypress is deprecated and doesn't trigger for all keys.",
    category: 'javascript',
    difficulty: 'medium',
    tags: ['events', 'keyboard', 'javascript'],
  },
  {
    id: 'js-3',
    question:
      'Which of the following is the correct way to refresh (reload) the current page in JavaScript?',
    options: [
      'window.refresh()',
      'window.location.reload()',
      'document.reload()',
      'location.refresh()',
    ],
    correctAnswer: 1,
    explanation:
      "window.location.reload() is the standard way to reload the page in JavaScript. Other methods don't exist.",
    category: 'javascript',
    difficulty: 'easy',
    tags: ['browser-api', 'javascript', 'reload'],
  },
  {
    id: 'javascript-refresh-screen',
    question:
      'Which of the following is the correct way to refresh (reload) the current page in JavaScript?',
    options: [
      'window.refresh()',
      'window.location.reload()',
      'document.reload()',
      'location.refresh()',
    ],
    correctAnswer: 1,
    explanation:
      'window.location.reload() is the standard way to reload the page in JavaScript. Other options like refresh(), document.reload(), and location.refresh() do not exist in the JavaScript API.',
    category: 'javascript',
    difficulty: 'easy',
    tags: ['javascript', 'dom', 'browser-api', 'page-refresh'],
  },

  // WebSocket Questions
  {
    id: 'websocket-1',
    question:
      'Which WebSocket event should you count to track messages received from the server?',
    options: [
      'socket.onopen',
      'socket.onmessage',
      'socket.onerror',
      'socket.onclose',
    ],
    correctAnswer: 1,
    explanation:
      'onmessage fires each time data is received from the server—perfect for counting messages. onopen fires once when the connection opens, onerror fires when an error occurs, and onclose fires when the connection closes.',
    category: 'websockets',
    difficulty: 'medium',
    tags: ['websockets', 'events', 'javascript'],
  },

  // React Questions
  {
    id: 'react-1',
    question: 'What is Reconciliation in React?',
    options: [
      'The process of syncing React state with Redux.',
      'The algorithm React uses to decide how the Virtual DOM should update the Real DOM.',
      'The communication between frontend and backend.',
      'The way React merges CSS styles.',
    ],
    correctAnswer: 1,
    explanation:
      'Reconciliation is the process React uses to compare the current Virtual DOM with the new Virtual DOM (after state/props change) and determine the minimum set of updates needed to efficiently update the real DOM.',
    category: 'react',
    difficulty: 'hard',
    tags: ['react', 'reconciliation', 'virtual-dom', 'performance'],
  },
  {
    id: 'react-2',
    question: 'What is React Fiber?',
    options: [
      'A database system for React.',
      'A new reconciliation engine introduced in React 16 for incremental rendering.',
      'A CSS styling framework used in React.',
      'A replacement for React Virtual DOM.',
    ],
    correctAnswer: 1,
    explanation:
      'React Fiber is the reconciliation engine introduced in React 16. It allows React to split rendering work into small units, pause, prioritize, and resume tasks efficiently — enabling features like concurrent rendering.',
    category: 'react',
    difficulty: 'hard',
    tags: ['react', 'fiber', 'concurrent', 'performance'],
  },
  {
    id: 'react-3',
    question: 'What is the Virtual DOM in React?',
    options: [
      'A direct copy of the real DOM used for styling.',
      'A lightweight in-memory representation of the actual DOM.',
      'A scheduler for handling rendering tasks.',
      'A database used to store component state.',
    ],
    correctAnswer: 1,
    explanation:
      'The Virtual DOM is a lightweight, in-memory tree representation of the actual DOM. React uses it to determine the minimal set of changes required to update the real DOM.',
    category: 'react',
    difficulty: 'medium',
    tags: ['react', 'virtual-dom', 'performance', 'dom'],
  },
  {
    id: 'react-4',
    question: 'How does React Fiber differ from Virtual DOM?',
    options: [
      'Fiber is used for scheduling and prioritization, while Virtual DOM is used for representation of the DOM.',
      'Fiber replaces Virtual DOM completely.',
      "Fiber is faster because it doesn't use the Virtual DOM.",
      'Fiber is just another name for Virtual DOM.',
    ],
    correctAnswer: 0,
    explanation:
      "Virtual DOM = data structure representing the UI. Fiber = the engine that manages how and when Virtual DOM updates are applied. Fiber doesn't replace Virtual DOM; it works with it to make rendering more efficient.",
    category: 'react',
    difficulty: 'hard',
    tags: ['react', 'fiber', 'virtual-dom', 'architecture'],
  },
  {
    id: 'react-5',
    question: 'Which feature became possible mainly due to React Fiber?',
    options: [
      'Server-side rendering.',
      'Concurrent rendering (splitting tasks into chunks).',
      'Using JSX in React.',
      'Redux state management.',
    ],
    correctAnswer: 1,
    explanation:
      'Fiber enables concurrent rendering, letting React pause, prioritize, and resume rendering tasks, improving responsiveness for complex UIs.',
    category: 'react',
    difficulty: 'medium',
    tags: ['react', 'fiber', 'concurrent', 'rendering'],
  },

  // React Questions for Issues #43 and #42
  {
    id: 'react-reconciliation',
    question: 'What is Reconciliation in React?',
    options: [
      'The process of syncing React state with Redux.',
      'The algorithm React uses to decide how the Virtual DOM should update the Real DOM.',
      'The communication between frontend and backend.',
      'The way React merges CSS styles.',
    ],
    correctAnswer: 1,
    explanation:
      'Reconciliation is the process React uses to compare the current Virtual DOM with the new Virtual DOM (after state/props change) and determine the minimum set of updates needed to efficiently update the real DOM.',
    category: 'react',
    difficulty: 'medium',
    tags: [
      'react',
      'reconciliation',
      'virtual-dom',
      'performance',
      'rendering',
    ],
  },
  {
    id: 'react-fiber',
    question: 'What is React Fiber?',
    options: [
      'A database system for React.',
      'A new reconciliation engine introduced in React 16 for incremental rendering.',
      'A CSS styling framework used in React.',
      'A replacement for React Virtual DOM.',
    ],
    correctAnswer: 1,
    explanation:
      'React Fiber is the reconciliation engine introduced in React 16. It allows React to split rendering work into small units, pause, prioritize, and resume tasks efficiently — enabling features like concurrent rendering.',
    category: 'react',
    difficulty: 'hard',
    tags: ['react', 'fiber', 'concurrent', 'rendering', 'performance'],
  },
  {
    id: 'react-virtual-dom',
    question: 'What is the Virtual DOM in React?',
    options: [
      'A direct copy of the real DOM used for styling.',
      'A lightweight in-memory representation of the actual DOM.',
      'A scheduler for handling rendering tasks.',
      'A database used to store component state.',
    ],
    correctAnswer: 1,
    explanation:
      'The Virtual DOM is a lightweight, in-memory tree representation of the actual DOM. React uses it to determine the minimal set of changes required to update the real DOM.',
    category: 'react',
    difficulty: 'medium',
    tags: ['react', 'virtual-dom', 'dom', 'performance', 'rendering'],
  },
  {
    id: 'react-fiber-vs-virtual-dom',
    question: 'How does React Fiber differ from Virtual DOM?',
    options: [
      'Fiber is used for scheduling and prioritization, while Virtual DOM is used for representation of the DOM.',
      'Fiber replaces Virtual DOM completely.',
      "Fiber is faster because it doesn't use the Virtual DOM.",
      'Fiber is just another name for Virtual DOM.',
    ],
    correctAnswer: 0,
    explanation:
      "Virtual DOM = data structure representing the UI. Fiber = the engine that manages how and when Virtual DOM updates are applied. Fiber doesn't replace Virtual DOM; it works with it to make rendering more efficient.",
    category: 'react',
    difficulty: 'hard',
    tags: ['react', 'fiber', 'virtual-dom', 'architecture', 'rendering'],
  },
  {
    id: 'react-concurrent-rendering',
    question: 'Which feature became possible mainly due to React Fiber?',
    options: [
      'Server-side rendering.',
      'Concurrent rendering (splitting tasks into chunks).',
      'Using JSX in React.',
      'Redux state management.',
    ],
    correctAnswer: 1,
    explanation:
      'Fiber enables concurrent rendering, letting React pause, prioritize, and resume rendering tasks, improving responsiveness for complex UIs.',
    category: 'react',
    difficulty: 'medium',
    tags: ['react', 'fiber', 'concurrent', 'rendering', 'performance'],
  },

  // CSS/HTML Questions for Issue #40
  {
    id: 'css-flexbox-center',
    question:
      'How do you center an element both horizontally and vertically using CSS Flexbox?',
    options: [
      'display: center; align: center;',
      'display: flex; justify-content: center; align-items: center;',
      'display: flexbox; center: both;',
      'flex: center; align: center;',
    ],
    correctAnswer: 1,
    explanation:
      'To center an element both horizontally and vertically with Flexbox, use display: flex; justify-content: center; (horizontal centering) and align-items: center; (vertical centering).',
    category: 'css',
    difficulty: 'easy',
    tags: ['css', 'flexbox', 'layout', 'centering'],
  },
  {
    id: 'css-grid-template',
    question: 'What does grid-template-columns: repeat(3, 1fr) create?',
    options: [
      '3 rows with equal height',
      '3 columns with equal width',
      '3 columns with 1px width each',
      '3 columns with 100% width each',
    ],
    correctAnswer: 1,
    explanation:
      'grid-template-columns: repeat(3, 1fr) creates 3 columns where each column takes up 1 fraction (1fr) of the available space, making them equal width.',
    category: 'css',
    difficulty: 'medium',
    tags: ['css', 'grid', 'layout', 'responsive'],
  },
  {
    id: 'css-pseudo-elements',
    question:
      'Which CSS pseudo-element is used to add content before an element?',
    options: ['::after', '::before', '::first-line', '::first-letter'],
    correctAnswer: 1,
    explanation:
      "The ::before pseudo-element is used to insert content before an element. It's commonly used for decorative elements, icons, or additional content.",
    category: 'css',
    difficulty: 'medium',
    tags: ['css', 'pseudo-elements', 'content', 'styling'],
  },
  {
    id: 'html-semantic-tags',
    question:
      'Which HTML tag is most semantically appropriate for the main content of a webpage?',
    options: ['<div class="main">', '<main>', '<section>', '<article>'],
    correctAnswer: 1,
    explanation:
      'The <main> tag is the most semantically appropriate for the primary content of a webpage. It should contain the main content and there should typically be only one <main> element per page.',
    category: 'html',
    difficulty: 'easy',
    tags: ['html', 'semantics', 'accessibility', 'structure'],
  },
  {
    id: 'css-media-queries',
    question: 'What does @media (max-width: 768px) target?',
    options: [
      'Screens wider than 768px',
      'Screens 768px wide or narrower',
      'Screens exactly 768px wide',
      'Screens with height of 768px',
    ],
    correctAnswer: 1,
    explanation:
      '@media (max-width: 768px) targets screens that are 768px wide or narrower. This is commonly used for mobile-first responsive design.',
    category: 'css',
    difficulty: 'easy',
    tags: ['css', 'responsive', 'media-queries', 'mobile'],
  },
  {
    id: 'html-form-validation',
    question: 'Which HTML input attribute provides built-in form validation?',
    options: ['validate', 'required', 'check', 'verify'],
    correctAnswer: 1,
    explanation:
      'The required attribute provides built-in HTML5 form validation. When present, the form cannot be submitted unless the field has a value.',
    category: 'html',
    difficulty: 'easy',
    tags: ['html', 'forms', 'validation', 'html5'],
  },
  {
    id: 'css-transitions',
    question: 'What CSS property controls the duration of a transition?',
    options: [
      'transition-timing',
      'transition-duration',
      'transition-speed',
      'transition-time',
    ],
    correctAnswer: 1,
    explanation:
      'transition-duration controls how long a CSS transition takes to complete. It can be specified in seconds (s) or milliseconds (ms).',
    category: 'css',
    difficulty: 'medium',
    tags: ['css', 'transitions', 'animations', 'timing'],
  },
];

export const getQuestionsByCategory = (category: string) => {
  return multipleChoiceQuestions.filter(q => q.category === category);
};

export const getQuestionsByDifficulty = (difficulty: string) => {
  return multipleChoiceQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestion = () => {
  const randomIndex = Math.floor(
    Math.random() * multipleChoiceQuestions.length
  );
  return multipleChoiceQuestions[randomIndex];
};

export const getQuestionsByTags = (tags: string[]) => {
  return multipleChoiceQuestions.filter(q =>
    tags.some(tag => q.tags.includes(tag))
  );
};
