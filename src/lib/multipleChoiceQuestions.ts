export interface MultipleChoiceQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer (0-based)
  explanation: string;
  category: 'css' | 'javascript' | 'html' | 'websockets' | 'general';
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
    correctAnswer: 0, // Multiple correct answers, but we'll use the first one
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
      "Only charAt(0) returns a single character 'a'. Other methods return the entire string from index 0 onward.",
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

  // WebSocket Questions
  {
    id: 'websocket-1',
    question:
      "You're implementing a WebSocket event counter. Which event listener should you increment to count incoming messages from the server?",
    options: [
      'socket.onopen',
      'socket.onmessage',
      'socket.onerror',
      'socket.onclose',
    ],
    correctAnswer: 1,
    explanation:
      'onmessage fires each time data is received from the server—perfect for counting messages. onopen fires once when the connection opens.',
    category: 'websockets',
    difficulty: 'medium',
    tags: ['websockets', 'events', 'javascript'],
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
