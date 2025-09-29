const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} = require('firebase/firestore');

// Firebase config - using the same config as the app
const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

// Comprehensive sample questions organized by category and learning path
const sampleQuestions = [
  // HTML & CSS Questions (frontend-basics)
  {
    title: 'What is the purpose of semantic HTML elements?',
    content: 'Explain the importance of semantic HTML elements like <header>, <nav>, <main>, <section>, <article>, and <footer> in web development.',
    category: 'HTML & CSS',
    difficulty: 'beginner',
    tags: ['html', 'semantic', 'accessibility', 'seo'],
    learningPath: 'frontend-basics',
    topic: 'HTML Semantics',
    type: 'conceptual',
    answer: 'Semantic HTML elements provide meaning to the content structure, making it more accessible to screen readers, improving SEO, and making the code more maintainable and understandable.',
    explanation: 'Semantic elements describe the meaning of content rather than just its appearance. They help assistive technologies understand the page structure and improve search engine optimization.',
    examples: [
      '<header> - Contains introductory content or navigation',
      '<nav> - Contains navigation links',
      '<main> - Contains the main content of the page',
      '<section> - Represents a standalone section of content',
      '<article> - Contains independent, self-contained content',
      '<footer> - Contains footer information'
    ]
  },
  {
    title: 'What is the CSS Box Model?',
    content: 'Explain the CSS Box Model and how it affects element sizing and spacing.',
    category: 'HTML & CSS',
    difficulty: 'beginner',
    tags: ['css', 'box-model', 'layout', 'spacing'],
    learningPath: 'frontend-basics',
    topic: 'CSS Fundamentals',
    type: 'conceptual',
    answer: 'The CSS Box Model consists of content, padding, border, and margin. It determines how elements are sized and spaced on a webpage.',
    explanation: 'Every HTML element is a rectangular box with four areas: content (the actual content), padding (space inside the element), border (the border around the element), and margin (space outside the element).',
    examples: [
      'Content: The actual text or image content',
      'Padding: Space between content and border',
      'Border: The border around the element',
      'Margin: Space outside the element'
    ]
  },
  {
    title: 'What is the difference between display: block, inline, and inline-block?',
    content: 'Explain the differences between CSS display properties: block, inline, and inline-block.',
    category: 'HTML & CSS',
    difficulty: 'intermediate',
    tags: ['css', 'display', 'layout', 'positioning'],
    learningPath: 'frontend-basics',
    topic: 'CSS Layout',
    type: 'conceptual',
    answer: 'Block elements take full width and start on a new line. Inline elements only take necessary width and stay on the same line. Inline-block combines both behaviors.',
    explanation: 'Block elements are like paragraphs - they take the full width available and start on a new line. Inline elements are like words in a sentence - they only take the space they need and stay on the same line. Inline-block elements can have width/height set like block elements but stay on the same line like inline elements.',
    examples: [
      'Block: <div>, <p>, <h1> - Full width, new line',
      'Inline: <span>, <a>, <strong> - Content width, same line',
      'Inline-block: <img>, <button> - Can set width/height, same line'
    ]
  },
  {
    title: 'What is CSS Flexbox and how does it work?',
    content: 'Explain CSS Flexbox and its main properties for creating flexible layouts.',
    category: 'HTML & CSS',
    difficulty: 'intermediate',
    tags: ['css', 'flexbox', 'layout', 'responsive'],
    learningPath: 'frontend-basics',
    topic: 'CSS Layout',
    type: 'conceptual',
    answer: 'Flexbox is a one-dimensional layout method that allows you to arrange items in rows or columns with flexible sizing and alignment.',
    explanation: 'Flexbox provides a more efficient way to lay out, align, and distribute space among items in a container, even when their size is unknown or dynamic.',
    examples: [
      'display: flex - Creates a flex container',
      'flex-direction: row/column - Main axis direction',
      'justify-content - Aligns items along main axis',
      'align-items - Aligns items along cross axis',
      'flex-grow - How much an item should grow',
      'flex-shrink - How much an item should shrink'
    ]
  },
  {
    title: 'What is CSS Grid and how does it differ from Flexbox?',
    content: 'Explain CSS Grid and its relationship to Flexbox for creating layouts.',
    category: 'HTML & CSS',
    difficulty: 'intermediate',
    tags: ['css', 'grid', 'layout', 'responsive'],
    learningPath: 'frontend-basics',
    topic: 'CSS Layout',
    type: 'conceptual',
    answer: 'CSS Grid is a two-dimensional layout system that works with rows and columns simultaneously, while Flexbox is one-dimensional.',
    explanation: 'Grid is perfect for complex layouts where you need to control both rows and columns. Flexbox is better for one-dimensional layouts or components within a grid.',
    examples: [
      'Grid: Two-dimensional (rows + columns)',
      'Flexbox: One-dimensional (row OR column)',
      'Grid: Better for page layouts',
      'Flexbox: Better for component layouts'
    ]
  },

  // JavaScript Questions (javascript-deep-dive)
  {
    title: 'What is a closure in JavaScript?',
    content: 'Explain JavaScript closures with examples and their practical uses.',
    category: 'JavaScript (Core)',
    difficulty: 'intermediate',
    tags: ['javascript', 'closures', 'scope', 'functions'],
    learningPath: 'javascript-deep-dive',
    topic: 'Advanced JavaScript',
    type: 'conceptual',
    answer: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.',
    explanation: 'Closures are created every time a function is created. They allow functions to access variables from their lexical scope even when the function is executed outside that scope.',
    examples: [
      'function outer() {',
      '  let count = 0;',
      '  return function inner() {',
      '    count++;',
      '    return count;',
      '  };',
      '}',
      'const counter = outer();',
      'console.log(counter()); // 1',
      'console.log(counter()); // 2'
    ]
  },
  {
    title: 'What is the difference between let, const, and var?',
    content: 'Explain the differences between JavaScript variable declarations: let, const, and var.',
    category: 'JavaScript (Core)',
    difficulty: 'beginner',
    tags: ['javascript', 'variables', 'scope', 'hoisting'],
    learningPath: 'javascript-deep-dive',
    topic: 'JavaScript Fundamentals',
    type: 'conceptual',
    answer: 'var is function-scoped and hoisted, let is block-scoped and not hoisted, const is block-scoped, not hoisted, and cannot be reassigned.',
    explanation: 'var declarations are hoisted and function-scoped, which can lead to unexpected behavior. let and const are block-scoped and not hoisted, providing better control over variable scope and preventing common bugs.',
    examples: [
      'var: Function-scoped, hoisted, can be redeclared',
      'let: Block-scoped, not hoisted, cannot be redeclared',
      'const: Block-scoped, not hoisted, cannot be reassigned'
    ]
  },
  {
    title: 'What are Promises in JavaScript?',
    content: 'Explain JavaScript Promises and how they handle asynchronous operations.',
    category: 'JavaScript (Core)',
    difficulty: 'intermediate',
    tags: ['javascript', 'promises', 'async', 'asynchronous'],
    learningPath: 'javascript-deep-dive',
    topic: 'Async JavaScript',
    type: 'conceptual',
    answer: 'Promises are objects representing the eventual completion or failure of an asynchronous operation, providing a cleaner alternative to callbacks.',
    explanation: 'Promises help avoid callback hell and provide better error handling for asynchronous operations. They can be in one of three states: pending, fulfilled, or rejected.',
    examples: [
      'const promise = new Promise((resolve, reject) => {',
      '  // async operation',
      '  if (success) resolve(result);',
      '  else reject(error);',
      '});',
      'promise.then(result => console.log(result))',
      '       .catch(error => console.error(error));'
    ]
  },
  {
    title: 'What is async/await in JavaScript?',
    content: 'Explain async/await syntax and how it simplifies Promise handling.',
    category: 'JavaScript (Core)',
    difficulty: 'intermediate',
    tags: ['javascript', 'async-await', 'promises', 'asynchronous'],
    learningPath: 'javascript-deep-dive',
    topic: 'Async JavaScript',
    type: 'conceptual',
    answer: 'async/await is syntactic sugar over Promises that makes asynchronous code look and behave more like synchronous code.',
    explanation: 'The async keyword declares a function as asynchronous, and await pauses execution until a Promise is resolved, making asynchronous code more readable and easier to debug.',
    examples: [
      'async function fetchData() {',
      '  try {',
      '    const response = await fetch("/api/data");',
      '    const data = await response.json();',
      '    return data;',
      '  } catch (error) {',
      '    console.error("Error:", error);',
      '  }',
      '}'
    ]
  },
  {
    title: 'What is the difference between == and === in JavaScript?',
    content: 'Explain the difference between loose equality (==) and strict equality (===) in JavaScript.',
    category: 'JavaScript (Core)',
    difficulty: 'beginner',
    tags: ['javascript', 'equality', 'comparison', 'type-coercion'],
    learningPath: 'javascript-deep-dive',
    topic: 'JavaScript Fundamentals',
    type: 'conceptual',
    answer: '== performs type coercion before comparison, while === compares both value and type without coercion.',
    explanation: 'The == operator converts operands to the same type before comparison, which can lead to unexpected results. The === operator performs strict comparison without type conversion.',
    examples: [
      '5 == "5" // true (type coercion)',
      '5 === "5" // false (different types)',
      'null == undefined // true',
      'null === undefined // false',
      '0 == false // true',
      '0 === false // false'
    ]
  },

  // React Questions (react-mastery)
  {
    title: 'What are React Hooks and why were they introduced?',
    content: 'Explain React Hooks and their benefits over class components.',
    category: 'React',
    difficulty: 'intermediate',
    tags: ['react', 'hooks', 'functional-components', 'state'],
    learningPath: 'react-mastery',
    topic: 'React Hooks',
    type: 'conceptual',
    answer: 'Hooks are functions that let you use state and other React features in functional components, introduced to solve problems with class components.',
    explanation: 'Hooks allow you to reuse stateful logic between components, avoid wrapper hell, and make components easier to understand and test.',
    examples: [
      'useState - Manage component state',
      'useEffect - Handle side effects',
      'useContext - Consume context',
      'useReducer - Complex state management',
      'Custom hooks - Reusable logic'
    ]
  },
  {
    title: 'What is the difference between state and props in React?',
    content: 'Explain the difference between React state and props and when to use each.',
    category: 'React',
    difficulty: 'beginner',
    tags: ['react', 'state', 'props', 'data-flow'],
    learningPath: 'react-mastery',
    topic: 'React Fundamentals',
    type: 'conceptual',
    answer: 'State is internal data that can change and triggers re-renders. Props are external data passed down from parent components and are read-only.',
    explanation: 'State belongs to the component and can be modified using setState. Props are passed from parent to child and cannot be modified by the child component.',
    examples: [
      'State: Internal, mutable, triggers re-render',
      'Props: External, immutable, passed down',
      'State: this.state or useState()',
      'Props: this.props or function parameters'
    ]
  },
  {
    title: 'What is the Virtual DOM in React?',
    content: 'Explain the Virtual DOM concept and how it improves performance in React.',
    category: 'React',
    difficulty: 'intermediate',
    tags: ['react', 'virtual-dom', 'performance', 'rendering'],
    learningPath: 'react-mastery',
    topic: 'React Performance',
    type: 'conceptual',
    answer: 'The Virtual DOM is a JavaScript representation of the real DOM that React uses to optimize updates and improve performance.',
    explanation: 'React creates a virtual representation of the DOM in memory. When state changes, React compares the virtual DOM with the previous version and only updates the real DOM where changes occurred.',
    examples: [
      'Virtual DOM: JavaScript object representation',
      'Diffing: Comparing old vs new virtual DOM',
      'Reconciliation: Updating only changed parts',
      'Performance: Minimizes expensive DOM operations'
    ]
  },
  {
    title: 'What is JSX in React?',
    content: 'Explain JSX syntax and how it works in React applications.',
    category: 'React',
    difficulty: 'beginner',
    tags: ['react', 'jsx', 'syntax', 'components'],
    learningPath: 'react-mastery',
    topic: 'React Fundamentals',
    type: 'conceptual',
    answer: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in React components.',
    explanation: 'JSX is transpiled to JavaScript function calls that create React elements. It makes component code more readable and provides compile-time error checking.',
    examples: [
      'const element = <h1>Hello, World!</h1>;',
      'const name = "John";',
      'const element = <h1>Hello, {name}</h1>;',
      'const element = <div className="container">Content</div>;'
    ]
  },
  {
    title: 'What is the useEffect hook used for?',
    content: 'Explain the useEffect hook and its common use cases in React components.',
    category: 'React',
    difficulty: 'intermediate',
    tags: ['react', 'useeffect', 'hooks', 'side-effects'],
    learningPath: 'react-mastery',
    topic: 'React Hooks',
    type: 'conceptual',
    answer: 'useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.',
    explanation: 'useEffect runs after every render by default and can be configured to run only when specific dependencies change or only once on mount.',
    examples: [
      'useEffect(() => {',
      '  // Side effect code',
      '  fetchData();',
      '}, [dependency]); // Dependency array',
      'useEffect(() => {',
      '  // Cleanup function',
      '  return () => cleanup();',
      '}, []); // Empty array = run once'
    ]
  },

  // TypeScript Questions (typescript-essentials)
  {
    title: 'What is TypeScript and why use it?',
    content: 'Explain TypeScript and its benefits over plain JavaScript.',
    category: 'TypeScript',
    difficulty: 'beginner',
    tags: ['typescript', 'types', 'javascript', 'development'],
    learningPath: 'typescript-essentials',
    topic: 'TypeScript Fundamentals',
    type: 'conceptual',
    answer: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript, providing static type checking and better development experience.',
    explanation: 'TypeScript adds optional static typing to JavaScript, which helps catch errors at compile time, improves code documentation, and enhances IDE support.',
    examples: [
      'Static typing: Catch errors before runtime',
      'Better IDE support: Autocomplete, refactoring',
      'Code documentation: Types serve as documentation',
      'Large codebases: Easier to maintain and scale'
    ]
  },
  {
    title: 'What are TypeScript interfaces?',
    content: 'Explain TypeScript interfaces and how they define object shapes.',
    category: 'TypeScript',
    difficulty: 'intermediate',
    tags: ['typescript', 'interfaces', 'types', 'objects'],
    learningPath: 'typescript-essentials',
    topic: 'TypeScript Types',
    type: 'conceptual',
    answer: 'Interfaces in TypeScript define the shape of an object, specifying what properties and methods an object must have.',
    explanation: 'Interfaces provide a way to define contracts for objects, ensuring they have the required structure and can be extended or implemented by classes.',
    examples: [
      'interface User {',
      '  id: number;',
      '  name: string;',
      '  email: string;',
      '  isActive?: boolean; // Optional property',
      '}',
      'const user: User = {',
      '  id: 1,',
      '  name: "John",',
      '  email: "john@example.com"',
      '};'
    ]
  },

  // CSS Advanced Questions (css-mastery)
  {
    title: 'What is CSS Grid and how do you create a basic grid layout?',
    content: 'Explain CSS Grid and demonstrate how to create a basic grid layout.',
    category: 'CSS & Styling',
    difficulty: 'intermediate',
    tags: ['css', 'grid', 'layout', 'responsive'],
    learningPath: 'css-mastery',
    topic: 'CSS Grid',
    type: 'practical',
    answer: 'CSS Grid is a two-dimensional layout system that allows you to create complex layouts with rows and columns.',
    explanation: 'Grid provides precise control over both rows and columns, making it perfect for complex layouts. It works by defining a grid container and placing items within it.',
    examples: [
      '.grid-container {',
      '  display: grid;',
      '  grid-template-columns: 1fr 2fr 1fr;',
      '  grid-template-rows: auto 1fr auto;',
      '  gap: 20px;',
      '}',
      '.grid-item {',
      '  grid-column: 1 / 3;',
      '  grid-row: 2;',
      '}'
    ]
  },
  {
    title: 'What are CSS custom properties (CSS variables)?',
    content: 'Explain CSS custom properties and their benefits for maintainable stylesheets.',
    category: 'CSS & Styling',
    difficulty: 'intermediate',
    tags: ['css', 'variables', 'custom-properties', 'maintainability'],
    learningPath: 'css-mastery',
    topic: 'CSS Variables',
    type: 'conceptual',
    answer: 'CSS custom properties (variables) allow you to store values that can be reused throughout your stylesheet and updated dynamically.',
    explanation: 'Custom properties provide a way to create reusable values, make themes easier to implement, and allow for dynamic styling with JavaScript.',
    examples: [
      ':root {',
      '  --primary-color: #007bff;',
      '  --font-size: 16px;',
      '  --spacing: 1rem;',
      '}',
      '.button {',
      '  background-color: var(--primary-color);',
      '  font-size: var(--font-size);',
      '  padding: var(--spacing);',
      '}'
    ]
  },

  // Performance Questions (performance-optimization)
  {
    title: 'What are Core Web Vitals and why are they important?',
    content: 'Explain Core Web Vitals and their impact on user experience and SEO.',
    category: 'Performance',
    difficulty: 'intermediate',
    tags: ['performance', 'core-web-vitals', 'seo', 'user-experience'],
    learningPath: 'performance-optimization',
    topic: 'Web Performance',
    type: 'conceptual',
    answer: 'Core Web Vitals are a set of metrics that measure user experience on web pages, including loading performance, interactivity, and visual stability.',
    explanation: 'These metrics are used by Google for search ranking and help developers understand how users perceive the performance of their web pages.',
    examples: [
      'LCP (Largest Contentful Paint): < 2.5s',
      'FID (First Input Delay): < 100ms',
      'CLS (Cumulative Layout Shift): < 0.1',
      'Tools: Lighthouse, PageSpeed Insights'
    ]
  },
  {
    title: 'What is code splitting in React and how do you implement it?',
    content: 'Explain code splitting in React and demonstrate how to implement it for better performance.',
    category: 'Performance',
    difficulty: 'advanced',
    tags: ['react', 'code-splitting', 'performance', 'bundling'],
    learningPath: 'performance-optimization',
    topic: 'React Performance',
    type: 'practical',
    answer: 'Code splitting is a technique that allows you to split your code into smaller chunks that are loaded on demand, reducing the initial bundle size.',
    explanation: 'Code splitting helps improve the initial loading performance by only loading the code that is needed for the current page or feature.',
    examples: [
      'import React, { lazy, Suspense } from "react";',
      'const LazyComponent = lazy(() => import("./LazyComponent"));',
      'function App() {',
      '  return (',
      '    <Suspense fallback={<div>Loading...</div>}>',
      '      <LazyComponent />',
      '    </Suspense>',
      '  );',
      '}'
    ]
  },

  // Security Questions (security-essentials)
  {
    title: 'What is XSS (Cross-Site Scripting) and how do you prevent it?',
    content: 'Explain XSS attacks and best practices for preventing them in web applications.',
    category: 'Security',
    difficulty: 'intermediate',
    tags: ['security', 'xss', 'vulnerabilities', 'prevention'],
    learningPath: 'security-essentials',
    topic: 'Web Security',
    type: 'conceptual',
    answer: 'XSS is a security vulnerability where attackers inject malicious scripts into web pages viewed by other users.',
    explanation: 'XSS attacks occur when user input is not properly sanitized and is executed as code in the browser, potentially stealing data or performing malicious actions.',
    examples: [
      'Input validation and sanitization',
      'Output encoding',
      'Content Security Policy (CSP)',
      'Avoid innerHTML with user input',
      'Use textContent instead of innerHTML'
    ]
  },
  {
    title: 'What is Content Security Policy (CSP) and how do you implement it?',
    content: 'Explain Content Security Policy and how to implement it to prevent XSS attacks.',
    category: 'Security',
    difficulty: 'intermediate',
    tags: ['security', 'csp', 'xss-prevention', 'headers'],
    learningPath: 'security-essentials',
    topic: 'Web Security',
    type: 'practical',
    answer: 'CSP is a security feature that helps prevent XSS attacks by controlling which resources can be loaded and executed on a web page.',
    explanation: 'CSP works by defining a whitelist of trusted sources for scripts, styles, images, and other resources, blocking any resources not on the list.',
    examples: [
      "Content-Security-Policy: default-src 'self'",
      "Content-Security-Policy: script-src 'self' 'unsafe-inline'",
      "Content-Security-Policy: style-src 'self' fonts.googleapis.com",
      "Content-Security-Policy: img-src 'self' data: https:"
    ]
  },

  // Testing Questions (testing-strategies)
  {
    title: 'What is the difference between unit testing and integration testing?',
    content: 'Explain the differences between unit testing and integration testing in frontend development.',
    category: 'Testing',
    difficulty: 'intermediate',
    tags: ['testing', 'unit-testing', 'integration-testing', 'quality-assurance'],
    learningPath: 'testing-strategies',
    topic: 'Testing Types',
    type: 'conceptual',
    answer: 'Unit testing tests individual components in isolation, while integration testing tests how multiple components work together.',
    explanation: 'Unit tests focus on testing individual functions or components in isolation with mocked dependencies. Integration tests verify that different parts of the application work correctly together.',
    examples: [
      'Unit test: Test a single function with mocked inputs',
      'Integration test: Test API calls with real endpoints',
      'Unit test: Fast, isolated, many tests',
      'Integration test: Slower, real dependencies, fewer tests'
    ]
  },
  {
    title: 'What is Jest and how do you write a basic test?',
    content: 'Explain Jest testing framework and demonstrate how to write a basic test for a React component.',
    category: 'Testing',
    difficulty: 'beginner',
    tags: ['testing', 'jest', 'react-testing', 'unit-tests'],
    learningPath: 'testing-strategies',
    topic: 'Testing Tools',
    type: 'practical',
    answer: 'Jest is a JavaScript testing framework that provides a complete testing solution with built-in mocking, assertions, and test runners.',
    explanation: 'Jest makes it easy to write and run tests with features like automatic test discovery, mocking, and snapshot testing.',
    examples: [
      "describe('Button Component', () => {",
      "  test('renders with correct text', () => {",
      "    render(<Button>Click me</Button>);",
      "    expect(screen.getByText('Click me')).toBeInTheDocument();",
      "  });",
      "});"
    ]
  }
];

async function createSampleQuestions() {
  try {
    console.log('🔥 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log('📚 Creating sample questions...');
    const questionsRef = collection(db, 'unifiedQuestions');

    let createdCount = 0;

    for (const question of sampleQuestions) {
      const questionData = {
        ...question,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        isActive: true,
        author: 'System',
        version: '1.0'
      };

      await addDoc(questionsRef, questionData);
      console.log(`✅ Created: ${question.title} (${question.category})`);
      createdCount++;
    }

    console.log('\n🎉 Sample questions created successfully!');
    console.log(`📊 Created: ${createdCount} questions`);
    console.log('\n📋 Questions by category:');
    
    const categoryCounts = sampleQuestions.reduce((acc, q) => {
      acc[q.category] = (acc[q.category] || 0) + 1;
      return acc;
    }, {});

    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} questions`);
    });

    console.log('\n📋 Questions by learning path:');
    const learningPathCounts = sampleQuestions.reduce((acc, q) => {
      acc[q.learningPath] = (acc[q.learningPath] || 0) + 1;
      return acc;
    }, {});

    Object.entries(learningPathCounts).forEach(([path, count]) => {
      console.log(`  ${path}: ${count} questions`);
    });

  } catch (error) {
    console.error('Error creating sample questions:', error);
  }
}

createSampleQuestions();

