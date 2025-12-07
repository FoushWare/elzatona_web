export interface GreatFrontendQuestion {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  difficulty: "easy" | "medium" | "hard";
  description: string;
  url: string;
  tags: string[];
  estimatedTime: number; // in minutes
  completionRate?: number;
  companies?: string[];
}

export const greatFrontendQuestions: GreatFrontendQuestion[] = [
  // JavaScript Functions Category
  {
    id: "js-hoisting",
    title: "Explain Hoisting",
    category: "JavaScript Functions",
    subcategory: "Core Concepts",
    difficulty: "medium",
    description:
      "Explain how hoisting works in JavaScript and how it affects variable and function declarations.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-hoisting",
    tags: ["hoisting", "variables", "functions", "scope"],
    estimatedTime: 15,
    completionRate: 85,
    companies: ["Google", "Meta", "Amazon"],
  },
  {
    id: "js-this-keyword",
    title: "Explain how 'this' works in JavaScript",
    category: "JavaScript Functions",
    subcategory: "Core Concepts",
    difficulty: "hard",
    description:
      "Explain the 'this' keyword in JavaScript and how its context changes in different scenarios.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-how-this-works-in-javascript",
    tags: ["this", "context", "functions", "objects"],
    estimatedTime: 20,
    completionRate: 75,
    companies: ["Google", "Meta", "Apple"],
  },
  {
    id: "js-closures",
    title: "Explain Closures",
    category: "JavaScript Functions",
    subcategory: "Advanced Concepts",
    difficulty: "hard",
    description:
      "Explain what closures are in JavaScript and provide practical examples of their use.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-closures",
    tags: ["closures", "scope", "functions", "lexical"],
    estimatedTime: 25,
    completionRate: 70,
    companies: ["Google", "Meta", "Netflix"],
  },
  {
    id: "js-prototypal-inheritance",
    title: "Explain how Prototypal Inheritance works",
    category: "JavaScript Functions",
    subcategory: "Object-Oriented Programming",
    difficulty: "hard",
    description:
      "Explain the prototypal inheritance model in JavaScript and how it differs from classical inheritance.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-how-prototypal-inheritance-works",
    tags: ["prototypes", "inheritance", "objects", "oop"],
    estimatedTime: 30,
    completionRate: 65,
    companies: ["Google", "Meta", "Amazon"],
  },
  {
    id: "js-event-delegation",
    title: "Explain Event Delegation",
    category: "JavaScript Functions",
    subcategory: "DOM Manipulation",
    difficulty: "medium",
    description:
      "Explain event delegation and how it can be used to handle events efficiently.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-event-delegation",
    tags: ["events", "delegation", "dom", "performance"],
    estimatedTime: 20,
    completionRate: 80,
    companies: ["Google", "Meta", "Airbnb"],
  },
  {
    id: "js-callbacks",
    title:
      "Explain the concept of a callback function in asynchronous operations",
    category: "JavaScript Functions",
    subcategory: "Asynchronous Programming",
    difficulty: "medium",
    description:
      "Explain callback functions and their role in handling asynchronous operations in JavaScript.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-the-concept-of-a-callback-function-in-asynchronous-operations",
    tags: ["callbacks", "async", "functions", "promises"],
    estimatedTime: 20,
    completionRate: 75,
    companies: ["Google", "Meta", "Uber"],
  },
  {
    id: "js-destructuring",
    title:
      "Explain the concept of destructuring assignment for objects and arrays",
    category: "JavaScript Functions",
    subcategory: "ES6+ Features",
    difficulty: "easy",
    description:
      "Explain destructuring assignment syntax and how it can be used with objects and arrays.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-the-concept-of-destructuring-assignment-for-objects-and-arrays",
    tags: ["destructuring", "es6", "objects", "arrays"],
    estimatedTime: 15,
    completionRate: 90,
    companies: ["Google", "Meta", "Apple"],
  },
  {
    id: "js-debouncing-throttling",
    title: "Explain the concept of debouncing and throttling",
    category: "JavaScript Functions",
    subcategory: "Performance",
    difficulty: "medium",
    description:
      "Explain debouncing and throttling techniques and when to use each one.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-the-concept-of-debouncing-and-throttling",
    tags: ["debouncing", "throttling", "performance", "events"],
    estimatedTime: 25,
    completionRate: 70,
    companies: ["Google", "Meta", "Netflix"],
  },

  // User Interface Coding Category
  {
    id: "ui-responsive-vs-mobile-first",
    title: "Responsive vs Mobile-First Strategy",
    category: "User Interface Coding",
    subcategory: "Responsive Design",
    difficulty: "medium",
    description:
      "Explain the difference between coding a website to be responsive versus using a mobile-first strategy.",
    url: "https://www.greatfrontend.com/questions/quiz/can-you-explain-the-difference-between-coding-a-website-to-be-responsive-versus-using-a-mobile-first-strategy",
    tags: ["responsive", "mobile-first", "css", "design"],
    estimatedTime: 20,
    completionRate: 80,
    companies: ["Google", "Meta", "Airbnb"],
  },
  {
    id: "ui-svg-styling",
    title: "Styling SVG",
    category: "User Interface Coding",
    subcategory: "Graphics",
    difficulty: "medium",
    description:
      "Are you familiar with styling SVG? Explain different approaches to styling SVG elements.",
    url: "https://www.greatfrontend.com/questions/quiz/are-you-familiar-with-styling-svg",
    tags: ["svg", "styling", "graphics", "css"],
    estimatedTime: 15,
    completionRate: 75,
    companies: ["Google", "Meta", "Apple"],
  },
  {
    id: "ui-css-sprites",
    title: "CSS Sprites Implementation",
    category: "User Interface Coding",
    subcategory: "Performance",
    difficulty: "medium",
    description:
      "Explain CSS sprites and how you would implement them on a page or site.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-css-sprites-and-how-you-would-implement-them-on-a-page-or-site",
    tags: ["css", "sprites", "performance", "images"],
    estimatedTime: 20,
    completionRate: 70,
    companies: ["Google", "Meta", "Amazon"],
  },
  {
    id: "ui-multilingual-sites",
    title: "Designing for Multilingual Sites",
    category: "User Interface Coding",
    subcategory: "Internationalization",
    difficulty: "hard",
    description:
      "What considerations are important when designing or developing for multilingual sites?",
    url: "https://www.greatfrontend.com/questions/quiz/designing-or-developing-for-multilingual-sites",
    tags: ["i18n", "multilingual", "design", "localization"],
    estimatedTime: 25,
    completionRate: 65,
    companies: ["Google", "Meta", "Netflix"],
  },

  // Algorithmic Coding Category
  {
    id: "algo-array-manipulation",
    title: "Array Manipulation",
    category: "Algorithmic Coding",
    subcategory: "Data Structures",
    difficulty: "medium",
    description:
      "Implement efficient array manipulation algorithms and explain their time complexity.",
    url: "https://www.greatfrontend.com/questions/formats/algo-coding",
    tags: ["arrays", "algorithms", "data-structures", "complexity"],
    estimatedTime: 30,
    completionRate: 75,
    companies: ["Google", "Meta", "Amazon"],
  },
  {
    id: "algo-string-manipulation",
    title: "String Manipulation",
    category: "Algorithmic Coding",
    subcategory: "Text Processing",
    difficulty: "medium",
    description:
      "Implement string manipulation algorithms and explain their applications.",
    url: "https://www.greatfrontend.com/questions/formats/algo-coding",
    tags: ["strings", "algorithms", "text-processing"],
    estimatedTime: 25,
    completionRate: 80,
    companies: ["Google", "Meta", "Apple"],
  },
  {
    id: "algo-sorting",
    title: "Sorting Algorithms",
    category: "Algorithmic Coding",
    subcategory: "Algorithms",
    difficulty: "medium",
    description:
      "Implement and compare different sorting algorithms and their time complexities.",
    url: "https://www.greatfrontend.com/questions/formats/algo-coding",
    tags: ["sorting", "algorithms", "complexity", "performance"],
    estimatedTime: 35,
    completionRate: 70,
    companies: ["Google", "Meta", "Amazon"],
  },

  // System Design Category
  {
    id: "system-caching",
    title: "Caching Strategies",
    category: "System Design",
    subcategory: "Performance",
    difficulty: "hard",
    description:
      "Explain the concept of caching and how it can be used to improve performance.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-the-concept-of-caching-and-how-it-can-be-used-to-improve-performance",
    tags: ["caching", "performance", "system-design", "optimization"],
    estimatedTime: 30,
    completionRate: 65,
    companies: ["Google", "Meta", "Netflix"],
  },
  {
    id: "system-security-csp",
    title: "Content Security Policy (CSP)",
    category: "System Design",
    subcategory: "Security",
    difficulty: "medium",
    description:
      "Explain the concept of Content Security Policy (CSP) and how it enhances security.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-the-concept-of-content-security-policy-csp-and-how-it-enhances-security",
    tags: ["security", "csp", "web-security", "headers"],
    estimatedTime: 20,
    completionRate: 70,
    companies: ["Google", "Meta", "Amazon"],
  },
  {
    id: "system-csrf",
    title: "Cross-Site Request Forgery (CSRF)",
    category: "System Design",
    subcategory: "Security",
    difficulty: "hard",
    description:
      "Explain the concept of Cross-Site Request Forgery (CSRF) and its mitigation techniques.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-the-concept-of-cross-site-request-forgery-csrf-and-its-mitigation-techniques",
    tags: ["security", "csrf", "web-security", "authentication"],
    estimatedTime: 25,
    completionRate: 60,
    companies: ["Google", "Meta", "Netflix"],
  },

  // React Category
  {
    id: "react-one-way-data-flow",
    title: "One-Way Data Flow in React",
    category: "React",
    subcategory: "Core Concepts",
    difficulty: "medium",
    description: "Explain one-way data flow of React and its benefits.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-one-way-data-flow-of-react-and-its-benefits",
    tags: ["react", "data-flow", "state", "props"],
    estimatedTime: 20,
    completionRate: 85,
    companies: ["Meta", "Google", "Netflix"],
  },
  {
    id: "react-ssr",
    title: "Server-Side Rendering in React",
    category: "React",
    subcategory: "Rendering",
    difficulty: "hard",
    description:
      "Explain server-side rendering of React applications and its benefits.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-server-side-rendering-of-react-applications-and-its-benefits",
    tags: ["react", "ssr", "rendering", "performance"],
    estimatedTime: 25,
    completionRate: 70,
    companies: ["Meta", "Google", "Netflix"],
  },
  {
    id: "react-static-generation",
    title: "Static Generation in React",
    category: "React",
    subcategory: "Rendering",
    difficulty: "medium",
    description:
      "Explain static generation of React applications and its benefits.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-static-generation-of-react-applications-and-its-benefits",
    tags: ["react", "static-generation", "rendering", "performance"],
    estimatedTime: 20,
    completionRate: 75,
    companies: ["Meta", "Google", "Vercel"],
  },
  {
    id: "react-composition",
    title: "Composition Pattern in React",
    category: "React",
    subcategory: "Patterns",
    difficulty: "medium",
    description: "Explain the composition pattern in React and when to use it.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-the-composition-pattern-in-react",
    tags: ["react", "composition", "patterns", "components"],
    estimatedTime: 20,
    completionRate: 80,
    companies: ["Meta", "Google", "Airbnb"],
  },
  {
    id: "react-hooks",
    title: "React Hooks Deep Dive",
    category: "React",
    subcategory: "Hooks",
    difficulty: "medium",
    description:
      "Explain React Hooks in detail. How do useState, useEffect, useContext, and custom hooks work? What are the rules of hooks?",
    url: "https://www.greatfrontend.com/questions/quiz/react-hooks-deep-dive",
    tags: [
      "react",
      "hooks",
      "usestate",
      "useeffect",
      "usecontext",
      "custom-hooks",
    ],
    estimatedTime: 25,
    completionRate: 70,
    companies: ["Meta", "Google", "Netflix", "Airbnb"],
  },
  {
    id: "react-context-api",
    title: "React Context API and State Management",
    category: "React",
    subcategory: "State Management",
    difficulty: "medium",
    description:
      "How does React Context API work? When should you use it vs other state management solutions? How do you implement it properly?",
    url: "https://www.greatfrontend.com/questions/quiz/react-context-api-state-management",
    tags: [
      "react",
      "context-api",
      "state-management",
      "providers",
      "consumers",
    ],
    estimatedTime: 20,
    completionRate: 65,
    companies: ["Meta", "Google", "Netflix", "Uber"],
  },
  {
    id: "react-performance-optimization",
    title: "React Performance Optimization",
    category: "React",
    subcategory: "Performance",
    difficulty: "hard",
    description:
      "What are the key performance optimization techniques in React? How do you use React.memo, useMemo, useCallback, and code splitting?",
    url: "https://www.greatfrontend.com/questions/quiz/react-performance-optimization",
    tags: [
      "react",
      "performance",
      "react-memo",
      "usememo",
      "usecallback",
      "code-splitting",
    ],
    estimatedTime: 30,
    completionRate: 55,
    companies: ["Meta", "Google", "Netflix", "Vercel"],
  },
  {
    id: "react-error-boundaries",
    title: "React Error Boundaries",
    category: "React",
    subcategory: "Error Handling",
    difficulty: "medium",
    description:
      "Explain React Error Boundaries. How do you implement them? What are the limitations and best practices?",
    url: "https://www.greatfrontend.com/questions/quiz/react-error-boundaries",
    tags: [
      "react",
      "error-boundaries",
      "error-handling",
      "component-lifecycle",
      "fallback-ui",
    ],
    estimatedTime: 20,
    completionRate: 60,
    companies: ["Meta", "Google", "Netflix", "Microsoft"],
  },
  {
    id: "react-testing-strategies",
    title: "React Testing Strategies",
    category: "React",
    subcategory: "Testing",
    difficulty: "medium",
    description:
      "What are the different testing approaches for React components? How do you test hooks, context, and complex component interactions?",
    url: "https://www.greatfrontend.com/questions/quiz/react-testing-strategies",
    tags: [
      "react",
      "testing",
      "jest",
      "react-testing-library",
      "hooks-testing",
      "component-testing",
    ],
    estimatedTime: 25,
    completionRate: 65,
    companies: ["Meta", "Google", "Netflix", "Airbnb"],
  },
  {
    id: "react-security-considerations",
    title: "React Security Considerations",
    category: "React",
    subcategory: "Security",
    difficulty: "medium",
    description:
      "What are the security considerations when building React applications? How do you prevent XSS, CSRF, and other vulnerabilities?",
    url: "https://www.greatfrontend.com/questions/quiz/react-security-considerations",
    tags: [
      "react",
      "security",
      "xss",
      "csrf",
      "input-validation",
      "sanitization",
    ],
    estimatedTime: 20,
    completionRate: 60,
    companies: ["Meta", "Google", "Netflix", "Stripe"],
  },

  // CSS Category
  {
    id: "css-bfc",
    title: "Block Formatting Context (BFC)",
    category: "CSS",
    subcategory: "Layout",
    difficulty: "hard",
    description: "Describe Block Formatting Context (BFC) and how it works.",
    url: "https://www.greatfrontend.com/questions/quiz/describe-block-formatting-context-bfc-and-how-it-works",
    tags: ["css", "bfc", "layout", "positioning"],
    estimatedTime: 25,
    completionRate: 60,
    companies: ["Google", "Meta", "Apple"],
  },
  {
    id: "css-floats",
    title: "CSS Floats",
    category: "CSS",
    subcategory: "Layout",
    difficulty: "medium",
    description: "Describe floats and how they work in CSS layout.",
    url: "https://www.greatfrontend.com/questions/quiz/describe-floats-and-how-they-work",
    tags: ["css", "floats", "layout", "positioning"],
    estimatedTime: 20,
    completionRate: 75,
    companies: ["Google", "Meta", "Apple"],
  },
  {
    id: "css-z-index",
    title: "Z-Index and Stacking Context",
    category: "CSS",
    subcategory: "Positioning",
    difficulty: "medium",
    description: "Describe z-index and how stacking context is formed.",
    url: "https://www.greatfrontend.com/questions/quiz/describe-z-index-and-how-stacking-context-is-formed",
    tags: ["css", "z-index", "stacking-context", "positioning"],
    estimatedTime: 20,
    completionRate: 70,
    companies: ["Google", "Meta", "Apple"],
  },
  {
    id: "css-pseudo-elements",
    title: "Pseudo Elements",
    category: "CSS",
    subcategory: "Selectors",
    difficulty: "easy",
    description: "Describe pseudo elements and discuss what they are used for.",
    url: "https://www.greatfrontend.com/questions/quiz/describe-pseudo-elements-and-discuss-what-they-are-used-for",
    tags: ["css", "pseudo-elements", "selectors", "styling"],
    estimatedTime: 15,
    completionRate: 85,
    companies: ["Google", "Meta", "Apple"],
  },

  // Web APIs Category
  {
    id: "api-localstorage-sessionstorage",
    title: "LocalStorage vs SessionStorage",
    category: "Web APIs",
    subcategory: "Storage",
    difficulty: "easy",
    description:
      "Describe the difference between localStorage and sessionStorage.",
    url: "https://www.greatfrontend.com/questions/quiz/describe-the-difference-between-a-cookie-sessionstorage-and-localstorage",
    tags: ["web-apis", "storage", "localstorage", "sessionstorage"],
    estimatedTime: 15,
    completionRate: 90,
    companies: ["Google", "Meta", "Amazon"],
  },
  {
    id: "api-ajax",
    title: "AJAX",
    category: "Web APIs",
    subcategory: "Networking",
    difficulty: "medium",
    description: "Explain AJAX in as much detail as possible.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-ajax-in-as-much-detail-as-possible",
    tags: ["ajax", "networking", "http", "javascript"],
    estimatedTime: 25,
    completionRate: 80,
    companies: ["Google", "Meta", "Amazon"],
  },
  {
    id: "api-jsonp",
    title: "JSONP",
    category: "Web APIs",
    subcategory: "Networking",
    difficulty: "hard",
    description: "Explain how JSONP works and how it's not really AJAX.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-how-jsonp-works-and-how-its-not-really-ajax",
    tags: ["jsonp", "networking", "cross-origin", "script-tags"],
    estimatedTime: 20,
    completionRate: 65,
    companies: ["Google", "Meta", "Netflix"],
  },
  {
    id: "api-microtask-queue",
    title: "Microtask Queue",
    category: "Web APIs",
    subcategory: "Event Loop",
    difficulty: "hard",
    description:
      "Explain the concept of a microtask queue and how it relates to the event loop.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-the-concept-of-a-microtask-queue",
    tags: ["event-loop", "microtasks", "promises", "async"],
    estimatedTime: 25,
    completionRate: 60,
    companies: ["Google", "Meta", "Netflix"],
  },

  // Testing Category
  {
    id: "testing-code-coverage",
    title: "Code Coverage",
    category: "Testing",
    subcategory: "Quality Assurance",
    difficulty: "medium",
    description:
      "Explain the concept of code coverage and how it can be used to assess test quality.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-the-concept-of-code-coverage-and-how-it-can-be-used-to-assess-test-quality",
    tags: ["testing", "code-coverage", "quality", "metrics"],
    estimatedTime: 20,
    completionRate: 75,
    companies: ["Google", "Meta", "Amazon"],
  },
  {
    id: "testing-error-propagation",
    title: "Error Propagation in JavaScript",
    category: "Testing",
    subcategory: "Error Handling",
    difficulty: "medium",
    description:
      "Explain the concept of error propagation in JavaScript and best practices.",
    url: "https://www.greatfrontend.com/questions/quiz/explain-the-concept-of-error-propagation-in-javascript",
    tags: ["error-handling", "javascript", "testing", "debugging"],
    estimatedTime: 20,
    completionRate: 70,
    companies: ["Google", "Meta", "Netflix"],
  },
];

// Utility functions
export const getQuestionsByCategory = (
  category: string,
): GreatFrontendQuestion[] => {
  return greatFrontendQuestions.filter((q) => q.category === category);
};

export const getQuestionsByDifficulty = (
  difficulty: "easy" | "medium" | "hard",
): GreatFrontendQuestion[] => {
  return greatFrontendQuestions.filter((q) => q.difficulty === difficulty);
};

export const getQuestionsByCompany = (
  company: string,
): GreatFrontendQuestion[] => {
  return greatFrontendQuestions.filter((q) => q.companies?.includes(company));
};

export const searchQuestions = (query: string): GreatFrontendQuestion[] => {
  const lowercaseQuery = query.toLowerCase();
  return greatFrontendQuestions.filter(
    (q) =>
      q.title.toLowerCase().includes(lowercaseQuery) ||
      q.description.toLowerCase().includes(lowercaseQuery) ||
      q.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  );
};

export const getCategories = (): string[] => {
  return [...new Set(greatFrontendQuestions.map((q) => q.category))];
};

export const getSubcategories = (): string[] => {
  return [...new Set(greatFrontendQuestions.map((q) => q.subcategory))];
};

export const getCompanies = (): string[] => {
  const allCompanies = greatFrontendQuestions.flatMap((q) => q.companies || []);
  return [...new Set(allCompanies)];
};

export const getTags = (): string[] => {
  const allTags = greatFrontendQuestions.flatMap((q) => q.tags);
  return [...new Set(allTags)];
};
