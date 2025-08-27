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
  // JavaScript Fundamentals
  {
    id: "gf-p1-1",
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
    difficulty: "beginner",
    category: "javascript",
    tags: ["hoisting", "var", "let", "temporal-dead-zone"],
    relatedTopics: ["Variable Declaration", "Scope", "Hoisting"]
  },
  {
    id: "gf-p1-2",
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
    difficulty: "beginner",
    category: "javascript",
    tags: ["setTimeout", "event-loop", "var", "let", "scope"],
    relatedTopics: ["Asynchronous JavaScript", "Event Loop", "Block Scope"]
  },
  {
    id: "gf-p1-3",
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
    difficulty: "beginner",
    category: "javascript",
    tags: ["this", "arrow-functions", "regular-functions"],
    relatedTopics: ["Object Methods", "Arrow Functions", "This Keyword"]
  },
  {
    id: "gf-p1-4",
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
    difficulty: "beginner",
    category: "javascript",
    tags: ["type-coercion", "unary-plus", "logical-not"],
    relatedTopics: ["Type Coercion", "Truthy/Falsy Values", "Unary Operators"]
  },
  {
    id: "gf-p1-5",
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
    difficulty: "beginner",
    category: "javascript",
    tags: ["object-properties", "bracket-notation", "dot-notation"],
    relatedTopics: ["Object Properties", "Property Access", "JavaScript Objects"]
  }
];

// General Frontend Questions Resource - Phase 2 (Intermediate + Advanced Concepts)
export const generalFrontendPhase2Questions: InternalQuestion[] = [
  // Browser Storage
  {
    id: "gf-p2-1",
    question: "What is the difference between cookies, localStorage, and sessionStorage in the browser?",
    code: `// Cookie example
document.cookie = "username=John; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=\\/";

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
    id: "gf-p2-2",
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
    id: "gf-p2-3",
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
  aspect-ratio: 16\\/9;
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
    id: "gf-p2-4",
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
    id: "gf-p2-5",
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
    id: "gf-p2-6",
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
    id: "gf-p2-7",
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
    id: "gf-p3-1",
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
    id: "gf-p3-2",
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
  {
    id: "js-questions",
    title: "JavaScript Interview Questions",
    description: "Master JavaScript fundamentals with 100+ carefully crafted questions covering variables, functions, objects, and more. Perfect for interview preparation and skill assessment.",
    icon: "🟨",
    category: "javascript",
    difficulty: "intermediate",
    questions: javascriptQuestions,
    totalQuestions: javascriptQuestions.length,
    estimatedTime: 120,
    prerequisites: ["Basic JavaScript knowledge", "Understanding of programming concepts"],
    learningOutcomes: [
      "Deep understanding of JavaScript core concepts",
      "Ability to solve complex JavaScript problems",
      "Interview-ready JavaScript knowledge",
      "Understanding of common JavaScript pitfalls"
    ]
  },
  {
    id: "react-questions",
    title: "React Interview Questions",
    description: "Comprehensive React questions covering hooks, state management, component lifecycle, and modern React patterns. Essential for React developer interviews.",
    icon: "⚛️",
    category: "react",
    difficulty: "intermediate",
    questions: reactQuestions,
    totalQuestions: reactQuestions.length,
    estimatedTime: 90,
    prerequisites: ["Basic React knowledge", "Understanding of JavaScript"],
    learningOutcomes: [
      "Mastery of React hooks and state management",
      "Understanding of React component lifecycle",
      "Knowledge of modern React patterns",
      "Interview-ready React skills"
    ]
  },
  {
    id: "css-questions",
    title: "CSS Interview Questions",
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
  {
    id: "general-frontend-phase-1",
    title: "General Frontend Q&A - Phase 1",
    description: "Fundamental JavaScript concepts including hoisting, scope, this keyword, type coercion, and object properties. Perfect for beginners and junior developers.",
    icon: "🌱",
    category: "general",
    difficulty: "beginner",
    questions: generalFrontendPhase1Questions,
    totalQuestions: generalFrontendPhase1Questions.length,
    estimatedTime: 45,
    prerequisites: ["Basic knowledge of HTML, CSS, and JavaScript"],
    learningOutcomes: [
      "Understanding of JavaScript fundamentals",
      "Knowledge of hoisting and scope",
      "Mastery of this keyword and arrow functions",
      "Understanding of type coercion",
      "Object property access patterns"
    ]
  },
  {
    id: "general-frontend-phase-2",
    title: "General Frontend Q&A - Phase 2",
    description: "Intermediate to advanced frontend concepts including browser storage, performance optimization, image optimization, code quality, security, CDN, and micro-frontends. Essential for mid-level to senior developers.",
    icon: "🚀",
    category: "general",
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
    ]
  },

  {
    id: "general-frontend-qa",
    title: "General Frontend Q&A - Complete",
    description: "Comprehensive collection of 12+ frontend interview questions covering all phases from fundamentals to advanced concepts. Perfect for comprehensive interview preparation.",
    icon: "🎯",
    category: "general",
    difficulty: "intermediate",
    questions: generalFrontendQuestions,
    totalQuestions: generalFrontendQuestions.length,
    estimatedTime: 150,
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
