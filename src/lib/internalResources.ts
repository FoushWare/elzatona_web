export interface InternalQuestion {
  id: string;
  question: string;
  code?: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E?: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'javascript' | 'react' | 'css' | 'html' | 'dom' | 'async' | 'es6';
  tags: string[];
  relatedTopics: string[];
}

export interface InternalResource {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: InternalQuestion[];
  totalQuestions: number;
  estimatedTime: number; // in minutes
  prerequisites: string[];
  learningOutcomes: string[];
  videoUrl?: string; // YouTube video URL for learning
  videoTitle?: string; // Title of the video
  videoDescription?: string; // Description of what the video covers
}

// JavaScript Questions Resource (comprehensive set)
export const javascriptQuestions: InternalQuestion[] = [
  {
    id: "js-1",
    question: "What's the output?",
    code: `function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Lydia';
  let age = 21;
}

sayHi();`,
    options: {
      A: "Lydia and undefined",
      B: "Lydia and ReferenceError",
      C: "ReferenceError and 21",
      D: "undefined and ReferenceError"
    },
    correctAnswer: "D",
    explanation: "Within the function, we first declare the name variable with the var keyword. This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of undefined, until we actually get to the line where we define the variable. We haven't defined the variable yet on the line where we try to log the name variable, so it still holds the value of undefined. Variables with the let keyword (and const) are hoisted, but unlike var, don't get initialized. They are not accessible before the line we declare (initialize) them. This is called the 'temporal dead zone'. When we try to access the variables before they are declared, JavaScript throws a ReferenceError.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["hoisting", "var", "let", "temporal-dead-zone"],
    relatedTopics: ["Variable Declaration", "Scope", "Hoisting"]
  },
  {
    id: "js-2",
    question: "What's the output?",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}`,
    options: {
      A: "0 1 2 and 0 1 2",
      B: "0 1 2 and 3 3 3",
      C: "3 3 3 and 0 1 2",
      D: "3 3 3 and 3 3 3"
    },
    correctAnswer: "C",
    explanation: "Because of the event queue in JavaScript, the setTimeout callback function is called after the loop has been executed. Since the variable i in the first loop was declared using the var keyword, this value was global. During the loop, we incremented the value of i by 1 each time, using the unary operator ++. By the time the setTimeout callback function was invoked, i was equal to 3 in the first example. In the second loop, the variable i was declared using the let keyword: variables declared with the let (and const) keyword are block-scoped (a block is anything between { }). During each iteration, i will have a new value, and each value is scoped inside the loop.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["setTimeout", "event-loop", "var", "let", "scope"],
    relatedTopics: ["Asynchronous JavaScript", "Event Loop", "Block Scope"]
  },
  {
    id: "js-3",
    question: "What's the output?",
    code: `const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
console.log(shape.perimeter());`,
    options: {
      A: "20 and 62.83185307179586",
      B: "20 and NaN",
      C: "20 and 63",
      D: "NaN and 63"
    },
    correctAnswer: "B",
    explanation: "Note that the value of diameter is a regular function, whereas the value of perimeter is an arrow function. With arrow functions, the this keyword refers to its current surrounding scope, unlike regular functions! This means that when we call perimeter, it doesn't refer to the shape object, but to its surrounding scope (window for example). There is no value radius on that object, which returns NaN.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["this", "arrow-functions", "regular-functions"],
    relatedTopics: ["Object Methods", "Arrow Functions", "This Keyword"]
  },
  {
    id: "js-4",
    question: "What's the output?",
    code: `+true;
!'Lydia';`,
    options: {
      A: "1 and false",
      B: "false and NaN",
      C: "false and false",
      D: "1 and true"
    },
    correctAnswer: "A",
    explanation: "The unary plus tries to convert an operand to a number. true is 1, and false is 0. The string 'Lydia' is a truthy value. What we're actually asking, is 'is this truthy value falsy?'. This returns false.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["type-coercion", "unary-plus", "logical-not"],
    relatedTopics: ["Type Coercion", "Truthy/Falsy Values", "Unary Operators"]
  },
  {
    id: "js-5",
    question: "What's the output?",
    code: `const bird = {
  size: 'small',
};

const mouse = {
  name: 'Mickey',
  small: true,
};`,
    options: {
      A: "mouse.bird.size is not valid",
      B: "mouse[bird.size] is not valid",
      C: "mouse[bird['size']] is not valid",
      D: "All of them are valid"
    },
    correctAnswer: "A",
    explanation: "In JavaScript, all object keys are strings (unless it's a Symbol). Even though we might not type them as strings, they are always converted into strings under the hood. JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket [ and keeps going until it finds the closing bracket ]. Only then, it will evaluate the statement. mouse[bird.size]: First it evaluates bird.size, which is 'small'. mouse['small'] returns true. However, with dot notation, this doesn't happen. mouse does not have a key called bird, which means that mouse.bird is undefined. Then, we ask for the size using dot notation: mouse.bird.size. Since mouse.bird is undefined, we're actually asking undefined.size. This isn't valid, and will throw an error similar to Cannot read property 'size' of undefined.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["object-properties", "bracket-notation", "dot-notation"],
    relatedTopics: ["Object Properties", "Property Access", "JavaScript Objects"]
  }
];

// React Questions Resource
export const reactQuestions: InternalQuestion[] = [
  {
    id: "react-1",
    question: "What is the difference between useState and useReducer?",
    code: `// useState example
const [count, setCount] = useState(0);

// useReducer example
const [state, dispatch] = useReducer(reducer, { count: 0 });

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}`,
    options: {
      A: "useState is for simple state, useReducer for complex state logic",
      B: "useState is faster than useReducer",
      C: "useReducer is only for arrays",
      D: "There is no difference"
    },
    correctAnswer: "A",
    explanation: "useState is perfect for simple state management. useReducer is better when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.",
    difficulty: "intermediate",
    category: "react",
    tags: ["useState", "useReducer", "state-management"],
    relatedTopics: ["React Hooks", "State Management", "Component State"]
  }
];

// CSS Questions Resource
export const cssQuestions: InternalQuestion[] = [
  {
    id: "css-1",
    question: "What's the difference between flexbox and grid?",
    code: `/* Flexbox - 1D layout */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Grid - 2D layout */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
}`,
    options: {
      A: "Flexbox is for 1D layouts, Grid is for 2D layouts",
      B: "Grid is older than Flexbox",
      C: "Flexbox is only for navigation",
      D: "Grid is only for tables"
    },
    correctAnswer: "A",
    explanation: "Flexbox is designed for one-dimensional layouts (either rows or columns). Grid is designed for two-dimensional layouts (rows and columns at the same time).",
    difficulty: "intermediate",
    category: "css",
    tags: ["flexbox", "grid", "layout"],
    relatedTopics: ["CSS Layout", "Flexbox", "CSS Grid"]
  }
];

// General Frontend Questions Resource - Phase 1 (Fundamentals)
export const generalFrontendPhase1Questions: InternalQuestion[] = [
  // Webpack & Tooling
  {
    id: "tsd-01-1",
    question: "Can you tell me about your experience using Webpack? What is it used for?",
    options: {
      A: "Webpack is a module bundler that takes multiple JavaScript files and bundles them into a single file",
      B: "Webpack is a testing framework for JavaScript applications",
      C: "Webpack is a CSS preprocessor for styling",
      D: "Webpack is a database management system"
    },
    correctAnswer: "A",
    explanation: "Webpack is a module bundler. It takes multiple JavaScript files and bundles them into a single file, which is necessary because browsers used to require a <script> tag for each file. Webpack parses files based on imports/exports, bundles them together, and applies optimizations. It's used extensively for setting up projects and configuring builds.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["webpack", "bundling", "module-system"],
    relatedTopics: ["Build Tools", "Module Bundling", "Webpack"]
  },
  {
    id: "tsd-01-2",
    question: "What is tree shaking in Webpack?",
    options: {
      A: "A process that eliminates unused code from the final bundle",
      B: "A technique for optimizing CSS files",
      C: "A method for compressing images",
      D: "A way to organize file structure"
    },
    correctAnswer: "A",
    explanation: "Tree shaking eliminates unused code from the final bundle. It works with ES6 static imports but not with CommonJS require, since those are evaluated dynamically at runtime.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["tree-shaking", "webpack", "optimization"],
    relatedTopics: ["Code Optimization", "Bundle Size", "ES6 Modules"]
  },
  {
    id: "tsd-01-3",
    question: "Have you used tree shaking in production?",
    options: {
      A: "Yes, since Webpack v5, tree shaking is enabled by default with ES6 imports",
      B: "No, tree shaking only works in development mode",
      C: "Tree shaking is only available with CommonJS require",
      D: "Tree shaking requires manual configuration in all versions"
    },
    correctAnswer: "A",
    explanation: "Yes. Since Webpack v5, tree shaking is enabled by default. However, it only works with ES6 imports. If dependencies or code use require, Webpack can't tree shake them.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["tree-shaking", "webpack", "production"],
    relatedTopics: ["Production Optimization", "Webpack Configuration"]
  },
  {
    id: "tsd-01-4",
    question: "What is a dependency graph in Webpack?",
    options: {
      A: "A structure Webpack builds starting from an entry point, following all imports",
      B: "A visual representation of package.json dependencies",
      C: "A graph showing file sizes in the bundle",
      D: "A chart displaying build times"
    },
    correctAnswer: "A",
    explanation: "It's the structure Webpack builds starting from an entry point, following all imports, and mapping relationships between modules. It's used to determine what code should be bundled, optimized, or dropped.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["dependency-graph", "webpack", "bundling"],
    relatedTopics: ["Module Dependencies", "Build Process"]
  },
  {
    id: "tsd-01-5",
    question: "What is CSS-in-JS? Can you give examples of its use cases?",
    options: {
      A: "CSS-in-JS allows writing CSS directly in JavaScript files for dynamic styles",
      B: "CSS-in-JS is a way to convert CSS to JavaScript",
      C: "CSS-in-JS is a CSS preprocessor",
      D: "CSS-in-JS is a styling framework"
    },
    correctAnswer: "A",
    explanation: "CSS-in-JS allows writing CSS directly in JavaScript files. It makes it easy to apply dynamic styles that react to state changes, like toggling colors when clicking a button. Tools like styled-components handle generating classes and injecting them at runtime.",
    difficulty: "intermediate",
    category: "css",
    tags: ["css-in-js", "styled-components", "dynamic-styles"],
    relatedTopics: ["Styling", "Component Styling", "Dynamic CSS"]
  },
  {
    id: "tsd-01-6",
    question: "What are disadvantages of CSS-in-JS?",
    options: {
      A: "CSS is bundled inside JavaScript, making it harder to cache separately",
      B: "CSS-in-JS is slower than regular CSS",
      C: "CSS-in-JS doesn't support media queries",
      D: "CSS-in-JS requires additional build tools"
    },
    correctAnswer: "A",
    explanation: "Disadvantages include: CSS is bundled inside JavaScript, making it harder to cache separately; Larger JS bundles and potential performance issues; Debugging is harder since generated classes are hashed; Risk of cumulative layout shifts (CLS) since CSS loads after JS execution; Creates deeper component trees in React, which can slow re-renders.",
    difficulty: "intermediate",
    category: "css",
    tags: ["css-in-js", "performance", "caching"],
    relatedTopics: ["Performance", "Caching", "Bundle Size"]
  },
  {
    id: "tsd-01-7",
    question: "How does CSS-in-JS affect performance?",
    options: {
      A: "Reduced caching efficiency and CLS issues since CSS is applied later",
      B: "CSS-in-JS always improves performance",
      C: "CSS-in-JS has no impact on performance",
      D: "CSS-in-JS only affects development performance"
    },
    correctAnswer: "A",
    explanation: "CSS-in-JS affects performance through: Reduced caching efficiency; CLS issues since CSS is applied later; Extra React components for styled elements deepen the component tree, affecting render performance. A hybrid approach (static CSS for layout + CSS-in-JS for dynamic parts) is often best.",
    difficulty: "intermediate",
    category: "css",
    tags: ["css-in-js", "performance", "cls"],
    relatedTopics: ["Performance Optimization", "Layout Shifts"]
  },
  {
    id: "tsd-01-8",
    question: "What is a Pure Component in React?",
    options: {
      A: "A Pure Component skips re-renders by shallow comparing props",
      B: "A Pure Component is a component without state",
      C: "A Pure Component is a functional component",
      D: "A Pure Component is a component that only renders once"
    },
    correctAnswer: "A",
    explanation: "A Pure Component skips re-renders by shallow comparing props. This was useful with class components, but with hooks, React already optimizes re-renders.",
    difficulty: "intermediate",
    category: "react",
    tags: ["pure-component", "performance", "re-renders"],
    relatedTopics: ["React Performance", "Component Optimization"]
  },
  {
    id: "tsd-01-9",
    question: "What is an Error Boundary in React?",
    options: {
      A: "An Error Boundary catches errors in child components and prevents the entire app from breaking",
      B: "An Error Boundary is a try-catch block in React",
      C: "An Error Boundary is a debugging tool",
      D: "An Error Boundary is a testing utility"
    },
    correctAnswer: "A",
    explanation: "An Error Boundary catches errors in child components and prevents the entire app from breaking. It shows a fallback UI instead of a blank/broken screen.",
    difficulty: "intermediate",
    category: "react",
    tags: ["error-boundary", "error-handling", "fallback-ui"],
    relatedTopics: ["Error Handling", "React Components"]
  },
  {
    id: "tsd-01-10",
    question: "What is the useEffect hook used for?",
    options: {
      A: "It's used to trigger side effects (API calls, logging, localStorage updates) after rendering",
      B: "It's used to manage state in functional components",
      C: "It's used to create custom hooks",
      D: "It's used to optimize component performance"
    },
    correctAnswer: "A",
    explanation: "It's used to trigger side effects (API calls, logging, localStorage updates) after rendering. Overusing it can cause unnecessary re-renders and performance issues.",
    difficulty: "intermediate",
    category: "react",
    tags: ["useEffect", "side-effects", "hooks"],
    relatedTopics: ["React Hooks", "Side Effects"]
  },
  {
    id: "tsd-01-11",
    question: "Why can't we use an async function directly in useEffect?",
    options: {
      A: "Because useEffect expects a cleanup function, but async functions return a promise",
      B: "Because async functions are not supported in React",
      C: "Because useEffect only works with synchronous functions",
      D: "Because async functions cause infinite loops"
    },
    correctAnswer: "A",
    explanation: "Because useEffect expects a cleanup function, but async functions return a promise. React doesn't know how to handle that promise. Instead, you should define an inner async function and call it inside useEffect.",
    difficulty: "intermediate",
    category: "react",
    tags: ["useEffect", "async", "promises"],
    relatedTopics: ["Async Functions", "React Hooks"]
  },
  {
    id: "tsd-01-12",
    question: "How would you handle state if you had: backend data, authentication, and global user settings?",
    options: {
      A: "Backend data in local state, authentication in React Context, global settings with useReducer",
      B: "All state should be managed with Redux",
      C: "All state should be in local component state",
      D: "All state should be in React Context"
    },
    correctAnswer: "A",
    explanation: "Backend data → keep in local component state or lift state slightly if shared. Authentication → React Context (global availability). Global settings with complex transitions → use a reducer (e.g., useReducer or Redux).",
    difficulty: "intermediate",
    category: "react",
    tags: ["state-management", "context", "useReducer"],
    relatedTopics: ["State Management", "React Context", "Redux"]
  },
  {
    id: "tsd-01-13",
    question: "What's the difference between essential and derived state?",
    options: {
      A: "Essential state is minimal and independent, derived state can be computed from essential state",
      B: "Essential state is global, derived state is local",
      C: "Essential state is immutable, derived state is mutable",
      D: "Essential state is synchronous, derived state is asynchronous"
    },
    correctAnswer: "A",
    explanation: "Essential state is the minimal, independent state (e.g., cart items). Derived state can be computed from essential state (e.g., total price).",
    difficulty: "intermediate",
    category: "react",
    tags: ["state-management", "derived-state", "essential-state"],
    relatedTopics: ["State Design", "Data Flow"]
  },
  {
    id: "tsd-01-14",
    question: "What are disadvantages of putting state inside React Context?",
    options: {
      A: "State changes cause all subscribed components to re-render",
      B: "Context is slower than local state",
      C: "Context doesn't support complex state",
      D: "Context is not supported in all browsers"
    },
    correctAnswer: "A",
    explanation: "State changes cause all subscribed components to re-render. Solution: split into multiple contexts and keep state as close as possible to where it's used.",
    difficulty: "intermediate",
    category: "react",
    tags: ["react-context", "performance", "re-renders"],
    relatedTopics: ["Performance", "Context Optimization"]
  },
  {
    id: "tsd-01-15",
    question: "How would you approach testing a React app with no existing tests?",
    options: {
      A: "Add E2E tests for features, unit tests for reusable components, integration tests for critical flows",
      B: "Start with unit tests for all components",
      C: "Only add E2E tests for the entire application",
      D: "Focus on integration tests only"
    },
    correctAnswer: "A",
    explanation: "Add end-to-end (E2E) tests to cover features. Write unit tests for reusable components. Use integration tests for critical flows like login or payments. Avoid meaningless unit tests just for coverage.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["testing", "e2e", "unit-tests", "integration-tests"],
    relatedTopics: ["Testing Strategy", "Test Types"]
  },
  {
    id: "tsd-01-16",
    question: "How do you balance E2E, unit, and integration tests?",
    options: {
      A: "E2E tests catch feature issues, unit/integration tests help localize bugs faster",
      B: "Focus only on unit tests for maximum coverage",
      C: "Use only E2E tests for comprehensive testing",
      D: "Balance doesn't matter as long as you have tests"
    },
    correctAnswer: "A",
    explanation: "E2E tests catch feature issues but don't pinpoint root causes. Unit/integration tests help localize bugs faster. A balanced pyramid ensures both feature coverage and debuggability.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["testing", "test-balance", "debugging"],
    relatedTopics: ["Testing Strategy", "Debugging"]
  },
  {
    id: "tsd-01-17",
    question: "What is code coverage, and what % is good for frontend?",
    options: {
      A: "Code coverage measures executed code during tests; 60-70% is healthy for frontend",
      B: "Code coverage measures bundle size; 80-90% is optimal",
      C: "Code coverage measures performance; 50-60% is sufficient",
      D: "Code coverage measures accessibility; 90-100% is required"
    },
    correctAnswer: "A",
    explanation: "Code coverage measures how much code executes when tests run. For frontend, 60–70% is a healthy balance. 80–90%+ is often overkill. Backend can aim higher (80–95%).",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["code-coverage", "testing", "frontend"],
    relatedTopics: ["Testing Metrics", "Quality Assurance"]
  },
  {
    id: "tsd-01-23",
    question: "Have you experienced high code coverage requirements?",
    options: {
      A: "Yes, in finance projects they enforced ~95%, leading to useless tests written only for coverage",
      B: "High coverage requirements always improve code quality",
      C: "High coverage is never enforced in real projects",
      D: "Coverage requirements don't affect development"
    },
    correctAnswer: "A",
    explanation: "Yes, in finance projects they enforced ~95%. This led to useless tests written only for coverage, showing that strict numbers can hurt productivity.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["code-coverage", "testing", "productivity"],
    relatedTopics: ["Testing Culture", "Productivity"]
  },
  {
    id: "tsd-01-24",
    question: "What is FCP (First Contentful Paint)?",
    options: {
      A: "It's the time from navigation until the first content (text/image) is rendered on screen",
      B: "It's the time until the page is fully loaded",
      C: "It's the time until all images are loaded",
      D: "It's the time until JavaScript execution completes"
    },
    correctAnswer: "A",
    explanation: "It's the time from navigation until the first content (text/image) is rendered on screen.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["fcp", "performance", "web-vitals"],
    relatedTopics: ["Web Performance", "Core Web Vitals"]
  },
  {
    id: "tsd-01-25",
    question: "What causes poor FCP scores?",
    options: {
      A: "Large JS bundles delaying rendering, no CDN, poor caching, or no compression",
      B: "Small bundle sizes and fast servers",
      C: "Good caching and compression",
      D: "Fast internet connections"
    },
    correctAnswer: "A",
    explanation: "Causes include: Large JS bundles delaying rendering; No CDN, poor caching, or no compression; Large CSS blocking rendering.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["fcp", "performance", "optimization"],
    relatedTopics: ["Performance Optimization", "Bundle Size"]
  },
  {
    id: "tsd-01-26",
    question: "How would you fix a poor FCP score?",
    options: {
      A: "Ensure CDN, caching, compression, analyze bundles, apply code splitting, defer non-critical JS",
      B: "Only optimize images",
      C: "Only use a CDN",
      D: "Only compress files"
    },
    correctAnswer: "A",
    explanation: "Ensure CDN, caching, and compression. Analyze bundles to remove unused code. Apply code splitting (React.lazy, dynamic imports). Defer or async load non-critical JS.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["fcp", "optimization", "code-splitting"],
    relatedTopics: ["Performance Optimization", "Code Splitting"]
  },
  {
    id: "tsd-01-27",
    question: "When would you consider Server-Side Rendering (SSR)?",
    options: {
      A: "If app speed or SEO is critical (e.g., e-commerce, news sites)",
      B: "For all React applications",
      C: "Only for static websites",
      D: "Only for mobile applications"
    },
    correctAnswer: "A",
    explanation: "If app speed or SEO is critical (e.g., e-commerce, news sites). SSR instantly delivers HTML, improving FCP. Not worth it for SaaS apps where SEO isn't critical, since SSR adds complexity.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["ssr", "seo", "performance"],
    relatedTopics: ["Server-Side Rendering", "SEO", "Performance"]
  }
];

// General Frontend Questions Resource - Phase 2 (Intermediate + Advanced Concepts)
export const generalFrontendPhase2Questions: InternalQuestion[] = [
  // Browser Storage
  {
    id: "tsd-02-1",
    question: "What is the difference between cookies, localStorage, and sessionStorage in the browser?",
    code: `// Cookie example
document.cookie = "username=John; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";

// localStorage example
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');

// sessionStorage example
sessionStorage.setItem('formData', JSON.stringify({name: 'John', email: 'john@example.com'}));`,
    options: {
      A: "Cookies are the only ones that persist after browser restart",
      B: "localStorage has the largest storage limit and persists indefinitely",
      C: "sessionStorage is cleared when the tab/browser is closed",
      D: "All of the above are correct"
    },
    correctAnswer: "D",
    explanation: "Cookies: ~4KB limit, sent with every HTTP request (good for authentication). Can have expiry, work server + client side. localStorage: Larger limit (usually 5-10MB), persists indefinitely, great for persisting user settings (e.g., dark theme). sessionStorage: Cleared when tab/browser is closed. Useful for temporary state like form inputs.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["browser-storage", "cookies", "localStorage", "sessionStorage"],
    relatedTopics: ["Browser APIs", "Data Persistence", "Web Storage"]
  },
  // Performance Optimization
  {
    id: "tsd-02-2",
    question: "If you are setting up a new frontend application, what optimizations would you put in place to make it performant?",
    code: `// Example of code splitting with React.lazy
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Example of tree shaking (ES6 imports)
import { useState, useEffect } from 'react'; // Only imports what's used

// Example of image optimization
<img 
  src="image.webp" 
  srcset="image-300.webp 300w, image-600.webp 600w, image-900.webp 900w"
  sizes="(max-width: 600px) 300px, (max-width: 900px) 600px, 900px"
  loading="lazy"
  alt="Optimized image"
/>`,
    options: {
      A: "Only use minification and compression",
      B: "Implement polyfills, bundling, compression, code splitting, and tree shaking",
      C: "Focus only on image optimization",
      D: "Use only CDN for all assets"
    },
    correctAnswer: "B",
    explanation: "Key optimizations include: Polyfills → Ensure modern JS features work in older browsers. Bundling & Compression → Use gzip/br compression to shrink payload size. Minification/Uglification → Remove whitespace, shorten variable names, reduce bundle size. Source Maps → Keep debugging possible in production. Code Splitting → Only load JavaScript needed for the initial page. Tree shaking: Eliminates unused code, works best with ES6 imports.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["performance", "optimization", "bundling", "code-splitting"],
    relatedTopics: ["Performance Optimization", "Build Tools", "Frontend Architecture"]
  },
  // Image Optimization
  {
    id: "tsd-02-3",
    question: "You are building a frontend app with very large images (e.g., eCommerce). How would you optimize them?",
    code: `// Responsive images with srcset
<img 
  src="product-small.webp"
  srcset="
    product-small.webp 300w,
    product-medium.webp 600w,
    product-large.webp 900w
  "
  sizes="(max-width: 600px) 300px, (max-width: 900px) 600px, 900px"
  loading="lazy"
  alt="Product image"
/>

// CSS for aspect ratio to prevent layout shifts
.image-container {
  aspect-ratio: 16/9;
  width: 100%;
}`,
    options: {
      A: "Use only PNG format for all images",
      B: "Serve images at the smallest needed dimensions, use WebP, CDN, lazy loading, and srcset",
      C: "Load all images at once for better performance",
      D: "Use only JPEG format for all images"
    },
    correctAnswer: "B",
    explanation: "Serve images at the smallest needed dimensions. Use compression and remove metadata. Prefer WebP over PNG/JPEG for better performance. Host via a CDN. Use lazy loading or load on scroll. Always set width/height to avoid layout shifts. Use srcset to deliver device-appropriate image sizes.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["image-optimization", "webp", "lazy-loading", "responsive-images"],
    relatedTopics: ["Image Optimization", "Performance", "Responsive Design"]
  },
  // Code Quality
  {
    id: "tsd-02-4",
    question: "How would you manage code quality in a large-scale frontend application?",
    code: `// ESLint configuration example
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'no-console': 'warn',
    'prefer-const': 'error'
  }
};

// Prettier configuration
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80
};`,
    options: {
      A: "Only use manual code reviews",
      B: "Implement linting, formatting, testing, dependency scanning, and accessibility checks",
      C: "Focus only on performance monitoring",
      D: "Use only TypeScript for type safety"
    },
    correctAnswer: "B",
    explanation: "Linting & Formatting → ESLint, Prettier, TS Lint. Testing → Unit tests + E2E tests. Dependency Scanning → Monitor vulnerabilities in node_modules. Accessibility (a11y) checks with linters. Performance monitoring → Lighthouse, Sentry for Core Web Vitals.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["code-quality", "linting", "testing", "accessibility"],
    relatedTopics: ["Code Quality", "Testing", "Accessibility", "Performance Monitoring"]
  },
  // Security
  {
    id: "tsd-02-5",
    question: "What is an XSS (Cross-Site Scripting) attack and how do you prevent it?",
    code: `// Vulnerable code (DON'T DO THIS)
const userInput = '<script>alert("XSS")</script>';
element.innerHTML = userInput; // Dangerous!

// Safe code (DO THIS)
const userInput = '<script>alert("XSS")</script>';
element.textContent = userInput; // Safe

// React example - safe by default
function SafeComponent({ userInput }) {
  return <div>{userInput}</div>; // React escapes by default
}`,
    options: {
      A: "XSS only affects server-side code",
      B: "XSS is when attackers inject malicious JavaScript, prevented by sanitizing inputs and avoiding raw HTML rendering",
      C: "XSS can only be prevented with HTTPS",
      D: "XSS is not a concern in modern frameworks"
    },
    correctAnswer: "B",
    explanation: "Attack: Attacker injects malicious JavaScript into the app (e.g., via comments). When other users load it, it executes on their browser. Prevention: Sanitize inputs → Prevent script injection into the DB. Avoid rendering raw HTML/JS from user input (e.g., dangerouslySetInnerHTML in React).",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["security", "xss", "input-sanitization", "web-security"],
    relatedTopics: ["Web Security", "Input Validation", "Cross-Site Scripting"]
  },
  // CDN (from Phase 3)
  {
    id: "tsd-02-6",
    question: "Can you explain how a CDN works? What are pros and cons?",
    code: `// Example of CDN usage in HTML
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css">

// Example of CDN configuration in webpack
module.exports = {
  output: {
    publicPath: process.env.NODE_ENV === 'production' 
        ? 'https://cdn.example.com/' 
  : '\\/'
  }
};`,
    options: {
      A: "CDN only caches images and videos",
      B: "CDN is a network of distributed servers that cache static assets, improving load times and reducing server load",
      C: "CDN only works for large files",
      D: "CDN is only useful for international websites"
    },
    correctAnswer: "B",
    explanation: "CDN (Content Delivery Network) = network of distributed servers caching your static assets (JS, CSS, images). Users fetch assets from the closest geographical edge location → lower latency, faster performance. Pros: Faster load times, less server load, good caching. Cons: Added cost/complexity, reliance on 3rd-party infra. Popular providers: AWS CloudFront, Cloudflare, Azure CDN.",
    difficulty: "advanced",
    category: "javascript",
    tags: ["cdn", "performance", "caching", "infrastructure"],
    relatedTopics: ["Content Delivery Networks", "Performance Optimization", "Infrastructure"]
  },
  // Micro-frontends (from Phase 3)
  {
    id: "tsd-02-7",
    question: "What are micro-frontends and when would you use them?",
    code: `// Example of micro-frontend shell application
import React from 'react';

// Load micro-frontends dynamically
const ProductApp = React.lazy(() => import('product-app/ProductApp'));
const CartApp = React.lazy(() => import('cart-app/CartApp'));

function ShellApp() {
  return (
    <div>
      <header>E-commerce Shell</header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductApp />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <CartApp />
        </Suspense>
      </main>
    </div>
  );
}`,
    options: {
      A: "Micro-frontends are just smaller React components",
      B: "Micro-frontends split monolithic frontend into independent applications, useful for large teams and scaling deployments",
      C: "Micro-frontends only work with React",
      D: "Micro-frontends are always better than monolithic applications"
    },
    correctAnswer: "B",
    explanation: "Micro-frontends = splitting a monolithic frontend into smaller, independent applications combined in a 'shell'. Each sub-app can be owned/deployed by separate teams. Use cases: Large teams (30+ engineers), scaling deployments, avoiding blocking between teams. Trade-off: Adds significant complexity (shared state, tooling, infra). Only worth it at scale.",
    difficulty: "advanced",
    category: "javascript",
    tags: ["micro-frontends", "architecture", "scaling", "team-organization"],
    relatedTopics: ["Frontend Architecture", "Team Scaling", "Application Architecture"]
  }
];

// General Frontend Questions Resource - Phase 3 (Advanced Concepts)
export const generalFrontendPhase3Questions: InternalQuestion[] = [
  // CDN
  {
    id: "tsd-03-1",
    question: "Can you explain how a CDN works? What are pros and cons?",
    code: `// Example of CDN usage in HTML
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css">

// Example of CDN configuration in webpack
module.exports = {
  output: {
    publicPath: process.env.NODE_ENV === 'production' 
        ? 'https://cdn.example.com/' 
  : '\\/'
  }
};`,
    options: {
      A: "CDN only caches images and videos",
      B: "CDN is a network of distributed servers that cache static assets, improving load times and reducing server load",
      C: "CDN only works for large files",
      D: "CDN is only useful for international websites"
    },
    correctAnswer: "B",
    explanation: "CDN (Content Delivery Network) = network of distributed servers caching your static assets (JS, CSS, images). Users fetch assets from the closest geographical edge location → lower latency, faster performance. Pros: Faster load times, less server load, good caching. Cons: Added cost/complexity, reliance on 3rd-party infra. Popular providers: AWS CloudFront, Cloudflare, Azure CDN.",
    difficulty: "advanced",
    category: "javascript",
    tags: ["cdn", "performance", "caching", "infrastructure"],
    relatedTopics: ["Content Delivery Networks", "Performance Optimization", "Infrastructure"]
  },
  // Micro-frontends
  {
    id: "tsd-03-2",
    question: "What are micro-frontends and when would you use them?",
    code: `// Example of micro-frontend shell application
import React from 'react';

// Load micro-frontends dynamically
const ProductApp = React.lazy(() => import('product-app/ProductApp'));
const CartApp = React.lazy(() => import('cart-app/CartApp'));

function ShellApp() {
  return (
    <div>
      <header>E-commerce Shell</header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductApp />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <CartApp />
        </Suspense>
      </main>
    </div>
  );
}`,
    options: {
      A: "Micro-frontends are just smaller React components",
      B: "Micro-frontends split monolithic frontend into independent applications, useful for large teams and scaling deployments",
      C: "Micro-frontends only work with React",
      D: "Micro-frontends are always better than monolithic applications"
    },
    correctAnswer: "B",
    explanation: "Micro-frontends = splitting a monolithic frontend into smaller, independent applications combined in a 'shell'. Each sub-app can be owned/deployed by separate teams. Use cases: Large teams (30+ engineers), scaling deployments, avoiding blocking between teams. Trade-off: Adds significant complexity (shared state, tooling, infra). Only worth it at scale.",
    difficulty: "advanced",
    category: "javascript",
    tags: ["micro-frontends", "architecture", "scaling", "team-organization"],
    relatedTopics: ["Frontend Architecture", "Team Scaling", "Application Architecture"]
  }
];

// Combine all phases for the general frontend questions
export const generalFrontendQuestions: InternalQuestion[] = [
  ...generalFrontendPhase1Questions,
  ...generalFrontendPhase2Questions,
  ...generalFrontendPhase3Questions
];

// Internal Resources Collection
export const internalResources: InternalResource[] = [
  // ===== FRONTEND FUNDAMENTALS SECTION =====
  {
    id: "javascript",
    title: "JavaScript Fundamentals",
    description: "Master JavaScript fundamentals with 155 comprehensive questions covering variables, functions, objects, closures, and advanced concepts. Perfect for interview preparation and skill assessment.",
    icon: "🟨",
    category: "javascript",
    difficulty: "intermediate",
    questions: javascriptQuestions,
    totalQuestions: 155,
    estimatedTime: 180,
    prerequisites: ["Basic JavaScript knowledge", "Understanding of programming concepts"],
    learningOutcomes: [
      "Deep understanding of JavaScript core concepts",
      "Ability to solve complex JavaScript problems",
      "Interview-ready JavaScript knowledge",
      "Understanding of common JavaScript pitfalls"
    ]
  },
  {
    id: "react",
    title: "React Fundamentals",
    description: "Comprehensive React questions covering hooks, state management, component lifecycle, and modern React patterns. Essential for React developer interviews.",
    icon: "⚛️",
    category: "react",
    difficulty: "intermediate",
    questions: reactQuestions,
    totalQuestions: 270,
    estimatedTime: 270,
    prerequisites: ["Basic React knowledge", "Understanding of JavaScript"],
    learningOutcomes: [
      "Mastery of React hooks and state management",
      "Understanding of React component lifecycle",
      "Knowledge of modern React patterns",
      "Interview-ready React skills"
    ]
  },
  {
    id: "css",
    title: "CSS Fundamentals",
    description: "Essential CSS questions covering layout, positioning, flexbox, grid, and responsive design. Perfect for frontend developers and designers.",
    icon: "🎨",
    category: "css",
    difficulty: "beginner",
    questions: cssQuestions,
    totalQuestions: cssQuestions.length,
    estimatedTime: 60,
    prerequisites: ["Basic HTML knowledge", "Understanding of web design"],
    learningOutcomes: [
      "Mastery of CSS layout techniques",
      "Understanding of responsive design principles",
      "Knowledge of modern CSS features",
      "Ability to create complex layouts"
    ]
  },
  
  // ===== THE SENIOR DEV SECTION =====
  {
    id: "webpack-tooling",
    title: "Webpack & Tooling",
    description: "Senior frontend interview questions covering Webpack & Tooling, CSS-in-JS, React Components & Hooks, State Management, Testing strategies, and Web Performance. Essential for senior developer interviews.",
    icon: "🌱",
    category: "senior-dev",
    difficulty: "intermediate",
    questions: generalFrontendPhase1Questions,
    totalQuestions: 22,
    estimatedTime: 22,
    prerequisites: ["Basic knowledge of HTML, CSS, and JavaScript"],
    learningOutcomes: [
      "Deep understanding of JavaScript fundamentals",
      "Knowledge of hoisting, scope, and closures",
      "Mastery of this keyword and arrow functions",
      "Understanding of type coercion and equality",
      "Object property access patterns and references",
      "Array methods and functional programming concepts",
      "Error handling and debugging techniques",
      "DOM manipulation and event handling",
      "Asynchronous JavaScript concepts"
    ],
    videoUrl: "https://www.youtube.com/watch?v=PeL25__th3s&t=2s",
    videoTitle: "JavaScript Fundamentals Tutorial",
    videoDescription: "Comprehensive video tutorial covering JavaScript fundamentals including hoisting, scope, closures, and core concepts needed for Phase 1 practice questions."
  },
  {
    id: "performance-optimization",
    title: "Performance Optimization",
    description: "Intermediate to advanced frontend concepts including browser storage, performance optimization, image optimization, code quality, security, CDN, and micro-frontends. Essential for mid-level to senior developers.",
    icon: "🚀",
    category: "senior-dev",
    difficulty: "intermediate",
    questions: generalFrontendPhase2Questions,
    totalQuestions: generalFrontendPhase2Questions.length,
    estimatedTime: 105,
    prerequisites: ["JavaScript fundamentals", "Basic understanding of web development", "Familiarity with browser APIs", "Experience with React"],
    learningOutcomes: [
      "Browser storage management",
      "Performance optimization techniques",
      "Image optimization strategies",
      "Code quality best practices",
      "Web security fundamentals",
      "CDN implementation and optimization",
      "Micro-frontend architecture understanding"
    ],
    videoUrl: "https://www.youtube.com/watch?v=ILaXhmTraQ4",
    videoTitle: "Advanced Frontend Concepts Tutorial",
    videoDescription: "In-depth tutorial covering intermediate to advanced frontend concepts including performance optimization, security, CDN, and micro-frontends for Phase 2 practice questions."
  },
  {
    id: "system-design",
    title: "System Design & Architecture",
    description: "Comprehensive collection of 32+ frontend interview questions covering all phases from fundamentals to advanced concepts. Perfect for comprehensive interview preparation.",
    icon: "🎯",
    category: "senior-dev",
    difficulty: "intermediate",
    questions: generalFrontendQuestions,
    totalQuestions: generalFrontendQuestions.length,
    estimatedTime: 330,
    prerequisites: ["Basic knowledge of HTML, CSS, and JavaScript", "Understanding of web development concepts", "Familiarity with React"],
    learningOutcomes: [
      "Comprehensive understanding of frontend development",
      "Ability to answer senior-level interview questions",
      "Knowledge of web technologies and best practices",
      "Interview-ready frontend skills",
      "Understanding of performance optimization and testing strategies"
    ]
  }
];

// Utility functions
export const getResourceById = (id: string): InternalResource | undefined => {
  return internalResources.find(resource => resource.id === id);
};

export const getQuestionsByCategory = (category: string): InternalQuestion[] => {
  const resource = internalResources.find(r => r.category === category);
  return resource ? resource.questions : [];
};

export const getQuestionsByDifficulty = (difficulty: string): InternalQuestion[] => {
  return internalResources.flatMap(resource => 
    resource.questions.filter(q => q.difficulty === difficulty)
  );
};

export const searchQuestions = (query: string): InternalQuestion[] => {
  const lowercaseQuery = query.toLowerCase();
  return internalResources.flatMap(resource =>
    resource.questions.filter(q => 
      q.question.toLowerCase().includes(lowercaseQuery) ||
      q.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      q.category.toLowerCase().includes(lowercaseQuery)
    )
  );
};
