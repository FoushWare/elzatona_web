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

  // Additional JavaScript Fundamentals Questions
  {
    id: 'js-fundamentals-1',
    question: 'What is the output of: console.log(1 + "2" + "2")?',
    options: ['5', '122', '32', 'NaN'],
    correctAnswer: 1,
    explanation:
      'JavaScript performs type coercion. 1 + "2" = "12", then "12" + "2" = "122". String concatenation takes precedence.',
    category: 'javascript',
    difficulty: 'medium',
    tags: ['javascript', 'type-coercion', 'concatenation', 'operators'],
  },
  {
    id: 'js-fundamentals-2',
    question: 'What is the purpose of the "use strict" directive?',
    options: [
      'To enable strict mode which catches common coding mistakes',
      'To make the code run faster',
      'To enable ES6 features',
      'To disable browser compatibility features',
    ],
    correctAnswer: 0,
    explanation:
      '"use strict" enables strict mode, which catches common coding mistakes and prevents certain unsafe actions.',
    category: 'javascript',
    difficulty: 'medium',
    tags: ['javascript', 'strict-mode', 'best-practices', 'es5'],
  },
  {
    id: 'js-fundamentals-3',
    question: 'What is the difference between let, const, and var?',
    options: [
      'They are all the same',
      'let and const are block-scoped, var is function-scoped',
      'const is immutable, let and var are mutable',
      'var is deprecated, let and const are modern',
    ],
    correctAnswer: 1,
    explanation:
      'let and const are block-scoped and not hoisted, while var is function-scoped and hoisted. const cannot be reassigned.',
    category: 'javascript',
    difficulty: 'medium',
    tags: ['javascript', 'variables', 'scope', 'es6', 'hoisting'],
  },
  {
    id: 'js-fundamentals-4',
    question: 'What is the output of: console.log(0.1 + 0.2 === 0.3)?',
    options: ['true', 'false', 'undefined', 'Error'],
    correctAnswer: 1,
    explanation:
      'Due to floating-point precision issues, 0.1 + 0.2 equals approximately 0.30000000000000004, not exactly 0.3.',
    category: 'javascript',
    difficulty: 'medium',
    tags: ['javascript', 'floating-point', 'precision', 'numbers'],
  },
  {
    id: 'js-fundamentals-5',
    question: 'What is event bubbling in JavaScript?',
    options: [
      'Events bubble up from child to parent elements',
      'Events bubble down from parent to child elements',
      'Events create bubbles in the UI',
      'Events are stored in a bubble data structure',
    ],
    correctAnswer: 0,
    explanation:
      'Event bubbling is the process where an event triggers on the deepest target element, then bubbles up through its parent elements.',
    category: 'javascript',
    difficulty: 'medium',
    tags: ['javascript', 'events', 'dom', 'bubbling', 'capturing'],
  },
  {
    id: 'js-fundamentals-6',
    question: 'What is the purpose of the bind() method?',
    options: [
      'To bind two objects together',
      'To create a new function with a fixed "this" context',
      'To bind event listeners to DOM elements',
      'To bind data to a template',
    ],
    correctAnswer: 1,
    explanation:
      'bind() creates a new function with a fixed "this" value, allowing you to control the context when the function is called.',
    category: 'javascript',
    difficulty: 'hard',
    tags: ['javascript', 'this', 'context', 'bind', 'methods'],
  },
  {
    id: 'js-fundamentals-7',
    question: 'What is a Promise in JavaScript?',
    options: [
      'A guarantee that code will run',
      'An object representing the eventual completion of an asynchronous operation',
      'A type of function that always returns a value',
      'A way to make synchronous code asynchronous',
    ],
    correctAnswer: 1,
    explanation:
      'A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.',
    category: 'javascript',
    difficulty: 'medium',
    tags: ['javascript', 'promises', 'async', 'asynchronous'],
  },
  {
    id: 'js-fundamentals-8',
    question: 'What is the difference between call() and apply() methods?',
    options: [
      'call() takes arguments as an array, apply() takes them individually',
      'apply() takes arguments as an array, call() takes them individually',
      'They are identical in functionality',
      'call() is synchronous, apply() is asynchronous',
    ],
    correctAnswer: 1,
    explanation:
      'apply() takes arguments as an array, while call() takes arguments individually. Both methods set the "this" context.',
    category: 'javascript',
    difficulty: 'hard',
    tags: ['javascript', 'methods', 'this', 'context', 'call', 'apply'],
  },
  {
    id: 'js-fundamentals-9',
    question: 'What is the output of: console.log([] + [])?',
    options: ['[]', '""', 'undefined', 'Error'],
    correctAnswer: 1,
    explanation:
      'When arrays are converted to strings, they become empty strings. So [] + [] = "" + "" = "".',
    category: 'javascript',
    difficulty: 'medium',
    tags: ['javascript', 'arrays', 'type-coercion', 'concatenation'],
  },
  {
    id: 'js-fundamentals-10',
    question: 'What is the purpose of the Symbol type in JavaScript?',
    options: [
      'To create unique identifiers',
      'To represent mathematical symbols',
      'To create private properties',
      'To optimize string operations',
    ],
    correctAnswer: 0,
    explanation:
      'Symbols are primitive values that are guaranteed to be unique. They are often used as property keys to avoid naming conflicts.',
    category: 'javascript',
    difficulty: 'hard',
    tags: ['javascript', 'symbols', 'es6', 'unique-identifiers', 'primitives'],
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

  // Advanced Senior Developer Questions
  {
    id: 'senior-js-1',
    question:
      'What is the difference between Object.freeze() and Object.seal()?',
    options: [
      'Object.freeze() prevents adding/deleting properties, Object.seal() prevents modifying existing properties',
      'Object.seal() prevents adding/deleting properties, Object.freeze() prevents modifying existing properties',
      'They are identical in functionality',
      'Object.freeze() is for objects, Object.seal() is for arrays',
    ],
    correctAnswer: 1,
    explanation:
      'Object.seal() prevents adding/deleting properties but allows modifying existing ones. Object.freeze() prevents adding/deleting AND modifying existing properties.',
    category: 'javascript',
    difficulty: 'hard',
    tags: ['javascript', 'objects', 'immutability', 'es5', 'senior'],
  },
  {
    id: 'senior-js-2',
    question: 'What is the Temporal Dead Zone (TDZ) in JavaScript?',
    options: [
      'A period when variables are undefined',
      'The time between hoisting and initialization of let/const variables',
      'A browser security feature',
      'A performance optimization technique',
    ],
    correctAnswer: 1,
    explanation:
      'The Temporal Dead Zone is the period between entering scope and the line where a let/const variable is declared. Accessing the variable during TDZ throws a ReferenceError.',
    category: 'javascript',
    difficulty: 'hard',
    tags: ['javascript', 'tdz', 'hoisting', 'scope', 'es6', 'senior'],
  },
  {
    id: 'senior-js-3',
    question: 'What is the difference between WeakMap and Map?',
    options: [
      'WeakMap is faster than Map',
      'WeakMap keys are weakly referenced and can be garbage collected',
      'Map is deprecated, WeakMap is the modern way',
      'WeakMap only works with primitive keys',
    ],
    correctAnswer: 1,
    explanation:
      'WeakMap keys are weakly referenced, meaning if the key object has no other references, it can be garbage collected. Map keys are strongly referenced.',
    category: 'javascript',
    difficulty: 'hard',
    tags: [
      'javascript',
      'weakmap',
      'map',
      'garbage-collection',
      'es6',
      'senior',
    ],
  },
  {
    id: 'senior-js-4',
    question: 'What is the purpose of the Proxy object in JavaScript?',
    options: [
      'To create HTTP proxies',
      'To intercept and customize operations on objects',
      'To optimize performance',
      'To create secure connections',
    ],
    correctAnswer: 1,
    explanation:
      'Proxy allows you to intercept and customize fundamental operations on objects (like property lookup, assignment, enumeration, function invocation, etc.).',
    category: 'javascript',
    difficulty: 'hard',
    tags: ['javascript', 'proxy', 'metaprogramming', 'es6', 'senior'],
  },
  {
    id: 'senior-js-5',
    question: 'What is the difference between for...in and for...of loops?',
    options: [
      'for...in iterates over values, for...of iterates over keys',
      'for...in iterates over enumerable properties, for...of iterates over iterable values',
      'for...in is for objects, for...of is for arrays',
      'They are identical in functionality',
    ],
    correctAnswer: 1,
    explanation:
      'for...in iterates over enumerable property names (including inherited ones), while for...of iterates over the values of iterable objects (arrays, strings, etc.).',
    category: 'javascript',
    difficulty: 'hard',
    tags: ['javascript', 'loops', 'iteration', 'es6', 'senior'],
  },
  {
    id: 'senior-js-6',
    question: 'What is the purpose of the Reflect API?',
    options: [
      'To reflect light in the browser',
      'To provide methods for interceptable JavaScript operations',
      'To create mirror images of objects',
      'To optimize reflection in 3D graphics',
    ],
    correctAnswer: 1,
    explanation:
      "Reflect provides methods for interceptable JavaScript operations. It's designed to work with Proxy and provides a more convenient API for default behavior.",
    category: 'javascript',
    difficulty: 'hard',
    tags: [
      'javascript',
      'reflect',
      'proxy',
      'metaprogramming',
      'es6',
      'senior',
    ],
  },
  {
    id: 'senior-js-7',
    question: 'What is the difference between Set and WeakSet?',
    options: [
      'Set is faster than WeakSet',
      'WeakSet values are weakly referenced and can be garbage collected',
      'Set is deprecated, WeakSet is the modern way',
      'WeakSet only works with primitive values',
    ],
    correctAnswer: 1,
    explanation:
      'WeakSet values are weakly referenced, meaning if the value object has no other references, it can be garbage collected. Set values are strongly referenced.',
    category: 'javascript',
    difficulty: 'hard',
    tags: [
      'javascript',
      'weakset',
      'set',
      'garbage-collection',
      'es6',
      'senior',
    ],
  },
  {
    id: 'senior-js-8',
    question: 'What is the purpose of the Symbol.iterator?',
    options: [
      'To create unique identifiers',
      'To define how an object should be iterated',
      'To optimize string operations',
      'To create private properties',
    ],
    correctAnswer: 1,
    explanation:
      "Symbol.iterator is a well-known symbol that defines the default iterator for an object. It's what makes objects iterable with for...of loops.",
    category: 'javascript',
    difficulty: 'hard',
    tags: ['javascript', 'symbols', 'iteration', 'es6', 'senior'],
  },
  {
    id: 'senior-js-9',
    question:
      'What is the difference between Object.create() and new Object()?',
    options: [
      'Object.create() is faster',
      'Object.create() can set the prototype, new Object() cannot',
      'new Object() is deprecated',
      'They are identical in functionality',
    ],
    correctAnswer: 1,
    explanation:
      'Object.create() allows you to specify the prototype object, while new Object() always creates an object with Object.prototype as its prototype.',
    category: 'javascript',
    difficulty: 'hard',
    tags: ['javascript', 'objects', 'prototypes', 'inheritance', 'senior'],
  },
  {
    id: 'senior-js-10',
    question: 'What is the purpose of the Generator function in JavaScript?',
    options: [
      'To generate random numbers',
      'To create functions that can pause and resume execution',
      'To optimize performance',
      'To create infinite loops',
    ],
    correctAnswer: 1,
    explanation:
      "Generator functions can pause and resume execution using yield. They're useful for creating iterators and handling asynchronous operations in a synchronous-looking way.",
    category: 'javascript',
    difficulty: 'hard',
    tags: ['javascript', 'generators', 'yield', 'iteration', 'es6', 'senior'],
  },

  // New questions from interview materials (2025)
  {
    id: 'js-advanced-1',
    question:
      'What is the difference between Object.freeze() and Object.seal() in JavaScript?',
    options: [
      'Object.freeze() prevents adding/deleting properties, Object.seal() only prevents adding',
      'Object.freeze() prevents all modifications, Object.seal() allows value changes',
      'Object.freeze() is shallow, Object.seal() is deep',
      'Object.freeze() works on arrays, Object.seal() only works on objects',
    ],
    correctAnswer: 1,
    explanation:
      'Object.freeze() makes an object completely immutable (no adding, deleting, or modifying properties), while Object.seal() only prevents adding/deleting properties but allows modifying existing property values.',
    category: 'javascript',
    difficulty: 'hard',
    tags: ['objects', 'immutability', 'advanced-js', 'interview'],
  },
  {
    id: 'js-advanced-2',
    question: 'What is the Temporal Dead Zone (TDZ) in JavaScript?',
    options: [
      'A period when variables are hoisted but not accessible',
      'The time between variable declaration and initialization',
      'A zone where let/const variables exist but cannot be accessed before declaration',
      'A period when the JavaScript engine is processing async operations',
    ],
    correctAnswer: 2,
    explanation:
      'The Temporal Dead Zone is the period between entering a scope and the actual declaration of a let/const variable, during which the variable exists but cannot be accessed, resulting in a ReferenceError.',
    category: 'javascript',
    difficulty: 'hard',
    tags: ['hoisting', 'let-const', 'advanced-js', 'interview'],
  },
  {
    id: 'js-advanced-3',
    question: 'What is the difference between WeakMap and Map in JavaScript?',
    options: [
      'WeakMap only stores primitive values, Map stores any values',
      'WeakMap keys must be objects, Map keys can be any value',
      'WeakMap is faster but less memory efficient',
      'WeakMap automatically garbage collects keys, Map does not',
    ],
    correctAnswer: 3,
    explanation:
      'WeakMap keys must be objects and are weakly referenced, meaning they can be garbage collected if no other references exist. Map keys are strongly referenced and prevent garbage collection.',
    category: 'javascript',
    difficulty: 'hard',
    tags: ['collections', 'memory-management', 'advanced-js', 'interview'],
  },
  {
    id: 'js-advanced-4',
    question:
      'What is the difference between for...in and for...of loops in JavaScript?',
    options: [
      'for...in iterates over values, for...of iterates over keys',
      'for...in iterates over enumerable properties, for...of iterates over iterable values',
      'for...in is faster, for...of is more memory efficient',
      'for...in works with arrays, for...of works with objects',
    ],
    correctAnswer: 1,
    explanation:
      'for...in iterates over enumerable property names (including inherited ones), while for...of iterates over the actual values of iterable objects like arrays, strings, etc.',
    category: 'javascript',
    difficulty: 'medium',
    tags: ['loops', 'iteration', 'advanced-js', 'interview'],
  },
  {
    id: 'js-advanced-5',
    question:
      'What is the Reflect API in JavaScript and when would you use it?',
    options: [
      'A way to reflect light in web applications',
      'A built-in API for introspection and manipulation of objects',
      'A method to create reflective surfaces in CSS',
      'An API for handling HTTP reflections',
    ],
    correctAnswer: 1,
    explanation:
      'The Reflect API provides methods for interceptable JavaScript operations, making it easier to work with objects programmatically and providing a more consistent interface than direct property access.',
    category: 'javascript',
    difficulty: 'hard',
    tags: ['reflect-api', 'introspection', 'advanced-js', 'interview'],
  },
  {
    id: 'react-advanced-1',
    question: 'What is React Fiber and how does it improve performance?',
    options: [
      'A new rendering engine that uses Web Workers',
      'A reconciliation algorithm that enables incremental rendering',
      'A state management library for React',
      'A bundling tool for React applications',
    ],
    correctAnswer: 1,
    explanation:
      "React Fiber is a complete rewrite of React's reconciliation algorithm that enables incremental rendering, allowing React to split rendering work into chunks and prioritize updates.",
    category: 'react',
    difficulty: 'hard',
    tags: ['react-fiber', 'reconciliation', 'performance', 'interview'],
  },
  {
    id: 'react-advanced-2',
    question: 'How does React Reconciliation work and why is it important?',
    options: [
      'It compares virtual DOM trees to minimize real DOM updates',
      'It reconciles state between different components',
      'It handles API reconciliation for data fetching',
      'It manages component lifecycle reconciliation',
    ],
    correctAnswer: 0,
    explanation:
      'React Reconciliation is the process of comparing the new virtual DOM tree with the previous one to determine the minimal set of changes needed to update the real DOM, improving performance.',
    category: 'react',
    difficulty: 'hard',
    tags: ['reconciliation', 'virtual-dom', 'performance', 'interview'],
  },
  {
    id: 'react-advanced-3',
    question: 'What is the Virtual DOM and how does it work in React?',
    options: [
      'A lightweight copy of the real DOM in memory',
      'A virtual reality interface for React components',
      'A DOM manipulation library for React',
      'A virtual environment for testing React components',
    ],
    correctAnswer: 0,
    explanation:
      'The Virtual DOM is a lightweight JavaScript representation of the actual DOM that React uses to optimize updates by comparing it with the real DOM and applying only the necessary changes.',
    category: 'react',
    difficulty: 'medium',
    tags: ['virtual-dom', 'react-core', 'performance', 'interview'],
  },
  {
    id: 'react-advanced-4',
    question: 'What are React Hooks and what are the Rules of Hooks?',
    options: [
      'Functions that let you use state and other React features in functional components',
      'Custom functions that replace class components entirely',
      'Event handlers for React components',
      'Utility functions for React development',
    ],
    correctAnswer: 0,
    explanation:
      'React Hooks are functions that allow functional components to use state and other React features. The Rules of Hooks include: only call hooks at the top level and only call hooks from React functions.',
    category: 'react',
    difficulty: 'medium',
    tags: ['hooks', 'functional-components', 'react-core', 'interview'],
  },
  {
    id: 'react-advanced-5',
    question:
      'What is the difference between useMemo and useCallback in React?',
    options: [
      'useMemo memoizes values, useCallback memoizes functions',
      'useMemo is for arrays, useCallback is for objects',
      'useMemo is synchronous, useCallback is asynchronous',
      'useMemo is for state, useCallback is for effects',
    ],
    correctAnswer: 0,
    explanation:
      'useMemo memoizes the result of a computation (value), while useCallback memoizes a function reference. Both help prevent unnecessary re-renders and recalculations.',
    category: 'react',
    difficulty: 'medium',
    tags: ['hooks', 'performance', 'memoization', 'interview'],
  },
  {
    id: 'css-advanced-1',
    question: 'What is CSS Grid and how does it differ from Flexbox?',
    options: [
      'CSS Grid is 2D layout system, Flexbox is 1D',
      'CSS Grid is for images, Flexbox is for text',
      'CSS Grid is newer, Flexbox is older',
      'CSS Grid is for mobile, Flexbox is for desktop',
    ],
    correctAnswer: 0,
    explanation:
      'CSS Grid is a 2D layout system that can handle both rows and columns simultaneously, while Flexbox is primarily a 1D layout system for either rows or columns.',
    category: 'css',
    difficulty: 'medium',
    tags: ['css-grid', 'flexbox', 'layout', 'interview'],
  },
  {
    id: 'css-advanced-2',
    question: 'What is the CSS Box Model and how does box-sizing affect it?',
    options: [
      'The model that defines how elements are sized and spaced',
      'A way to create 3D effects in CSS',
      'A method for organizing CSS properties',
      'A tool for debugging CSS layouts',
    ],
    correctAnswer: 0,
    explanation:
      "The CSS Box Model defines how elements are sized and spaced, including content, padding, border, and margin. box-sizing: border-box includes padding and border in the element's total width/height.",
    category: 'css',
    difficulty: 'medium',
    tags: ['box-model', 'layout', 'css-core', 'interview'],
  },
  {
    id: 'css-advanced-3',
    question:
      'What are CSS Custom Properties (CSS Variables) and how do you use them?',
    options: [
      'Variables that can store and reuse values throughout CSS',
      'Custom CSS selectors for specific elements',
      'JavaScript variables that work in CSS',
      'Custom HTML attributes for styling',
    ],
    correctAnswer: 0,
    explanation:
      'CSS Custom Properties (CSS Variables) allow you to store and reuse values throughout your CSS. They are defined with --variable-name and used with var(--variable-name).',
    category: 'css',
    difficulty: 'medium',
    tags: ['css-variables', 'custom-properties', 'css-core', 'interview'],
  },
  {
    id: 'html-advanced-1',
    question: 'What is semantic HTML and why is it important?',
    options: [
      'HTML that uses meaningful tags to describe content structure',
      'HTML that follows strict syntax rules',
      'HTML that is optimized for search engines only',
      'HTML that uses the latest HTML5 features',
    ],
    correctAnswer: 0,
    explanation:
      'Semantic HTML uses meaningful tags like <header>, <nav>, <main>, <article>, <section>, and <footer> to describe the structure and meaning of content, improving accessibility and SEO.',
    category: 'html',
    difficulty: 'medium',
    tags: ['semantic-html', 'accessibility', 'seo', 'interview'],
  },
  {
    id: 'html-advanced-2',
    question: 'What is the difference between <div> and <section> in HTML5?',
    options: [
      '<div> is for grouping, <section> is for thematic content',
      '<div> is older, <section> is newer',
      '<div> is for styling, <section> is for structure',
      '<div> is block-level, <section> is inline',
    ],
    correctAnswer: 0,
    explanation:
      '<div> is a generic container for grouping content, while <section> represents a thematic grouping of content, typically with a heading, that forms a distinct part of a document.',
    category: 'html',
    difficulty: 'medium',
    tags: ['semantic-html', 'html5', 'structure', 'interview'],
  },
  {
    id: 'js-performance-1',
    question: 'What is event delegation and how does it improve performance?',
    options: [
      'Attaching event listeners to parent elements instead of multiple children',
      'Delegating events to different components',
      'Using event bubbling to handle multiple events',
      'Creating event proxies for better memory management',
    ],
    correctAnswer: 0,
    explanation:
      'Event delegation attaches event listeners to parent elements instead of multiple child elements, reducing memory usage and improving performance, especially with dynamic content.',
    category: 'javascript',
    difficulty: 'medium',
    tags: ['event-delegation', 'performance', 'dom-events', 'interview'],
  },
  {
    id: 'js-performance-2',
    question: 'What is debouncing and when would you use it?',
    options: [
      'A technique to limit how often a function can be called',
      'A method to remove duplicate function calls',
      'A way to batch multiple function calls together',
      'A technique to delay function execution',
    ],
    correctAnswer: 0,
    explanation:
      "Debouncing limits how often a function can be called by delaying its execution until after a certain period of inactivity. It's useful for search inputs, window resize handlers, and scroll events.",
    category: 'javascript',
    difficulty: 'medium',
    tags: ['debouncing', 'performance', 'optimization', 'interview'],
  },
  {
    id: 'js-async-1',
    question:
      'What is the difference between Promise.all() and Promise.race()?',
    options: [
      'Promise.all() waits for all promises, Promise.race() returns the first to resolve/reject',
      'Promise.all() is for arrays, Promise.race() is for single promises',
      'Promise.all() is synchronous, Promise.race() is asynchronous',
      'Promise.all() handles errors, Promise.race() ignores them',
    ],
    correctAnswer: 0,
    explanation:
      'Promise.all() waits for all promises in an array to resolve (or any to reject), while Promise.race() returns the first promise to either resolve or reject.',
    category: 'javascript',
    difficulty: 'medium',
    tags: ['promises', 'async-programming', 'es6', 'interview'],
  },
  {
    id: 'js-async-2',
    question:
      'What are async/await functions and how do they improve code readability?',
    options: [
      'A way to write asynchronous code that looks synchronous',
      'Functions that automatically handle all async operations',
      'A replacement for all Promise-based code',
      'Functions that run in parallel automatically',
    ],
    correctAnswer: 0,
    explanation:
      'async/await allows you to write asynchronous code using synchronous syntax, making it easier to read and understand compared to Promise chains or callback-based approaches.',
    category: 'javascript',
    difficulty: 'medium',
    tags: ['async-await', 'es8', 'readability', 'interview'],
  },
  {
    id: 'react-patterns-1',
    question:
      'What is the Render Props pattern in React and when would you use it?',
    options: [
      'A pattern where a component receives a function as a prop to render content',
      'A way to render multiple components at once',
      'A pattern for conditional rendering',
      'A method for rendering props as HTML',
    ],
    correctAnswer: 0,
    explanation:
      "The Render Props pattern involves passing a function as a prop to a component, allowing the parent to control what gets rendered. It's useful for sharing logic between components.",
    category: 'react',
    difficulty: 'hard',
    tags: ['render-props', 'patterns', 'component-design', 'interview'],
  },
  {
    id: 'react-patterns-2',
    question: 'What is the Compound Components pattern in React?',
    options: [
      'A pattern where related components work together to form a complete UI',
      'A way to combine multiple components into one',
      'A pattern for nested component rendering',
      'A method for creating component hierarchies',
    ],
    correctAnswer: 0,
    explanation:
      'Compound Components is a pattern where a set of components work together to form a complete UI. They share implicit state and communicate through context, like <Select> and <Option> components.',
    category: 'react',
    difficulty: 'hard',
    tags: ['compound-components', 'patterns', 'component-design', 'interview'],
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
