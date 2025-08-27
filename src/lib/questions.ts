// Types for the questions page
export interface Question {
  id: string;
  title: string;
  description: string;
  category: "coding" | "system-design" | "quiz";
  subCategory: "javascript-functions" | "user-interface" | "algorithmic" | "react-hooks" | "css-layouts" | "html-semantics" | "dom-manipulation" | "async-programming" | "react-components" | "css-animations" | "web-apis" | "performance";
  difficulty: "easy" | "medium" | "hard";
  frameworks: string[];
  tags: string[];
  completionCount: number;
  estimatedTime: number;
  isPremium?: boolean;
  isWarmUp?: boolean;
  hasTestCases?: boolean;
  hasSolution?: boolean;
}

export interface Topic {
  id: string;
  name: string;
  count: number;
}

export interface Company {
  id: string;
  name: string;
  count: number;
}

// Enhanced sample data with real frontend questions
export const sampleQuestions: Question[] = [
  // JavaScript Functions
  {
    id: "1",
    title: "Implement Array.prototype.map()",
    description: "Implement the Array.prototype.map() method from scratch. The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.",
    category: "coding",
    subCategory: "javascript-functions",
    difficulty: "medium",
    frameworks: ["JavaScript", "TypeScript"],
    tags: ["Array methods", "Higher-order functions", "Functional programming"],
    completionCount: 28400,
    estimatedTime: 25,
    hasTestCases: true,
    hasSolution: true
  },
  {
    id: "2",
    title: "Create a Debounce Function",
    description: "Implement a debounce function that delays the execution of a function until after a specified delay has elapsed since the last time it was invoked.",
    category: "coding",
    subCategory: "javascript-functions",
    difficulty: "medium",
    frameworks: ["JavaScript", "TypeScript"],
    tags: ["Debouncing", "Performance", "Event handling"],
    completionCount: 19200,
    estimatedTime: 30,
    hasTestCases: true,
    hasSolution: true
  },
  {
    id: "3",
    title: "Implement Promise.all()",
    description: "Implement Promise.all() from scratch. Promise.all() takes an iterable of promises as an input and returns a single Promise that resolves to an array of the results of the input promises.",
    category: "coding",
    subCategory: "async-programming",
    difficulty: "hard",
    frameworks: ["JavaScript", "TypeScript"],
    tags: ["Promises", "Async programming", "Error handling"],
    completionCount: 15600,
    estimatedTime: 35,
    hasTestCases: true,
    hasSolution: true
  },
  {
    id: "4",
    title: "Build a Counter Component",
    description: "Create a counter component that increments, decrements, and resets. Include proper state management and event handling.",
    category: "coding",
    subCategory: "user-interface",
    difficulty: "easy",
    frameworks: ["React", "Vue", "Angular"],
    tags: ["State management", "Event handling", "Component design"],
    completionCount: 34400,
    estimatedTime: 20,
    isWarmUp: true,
    hasTestCases: true,
    hasSolution: true
  },
  {
    id: "5",
    title: "Create a Todo List",
    description: "Build a todo list application with add, delete, edit, and mark as complete functionality. Include proper form handling and state management.",
    category: "coding",
    subCategory: "user-interface",
    difficulty: "medium",
    frameworks: ["React", "Vue", "Angular"],
    tags: ["CRUD operations", "Form handling", "State management"],
    completionCount: 28900,
    estimatedTime: 45,
    hasTestCases: true,
    hasSolution: true
  },
  {
    id: "6",
    title: "Implement Infinite Scroll",
    description: "Create an infinite scroll component that loads more content as the user scrolls down. Include proper loading states and error handling.",
    category: "coding",
    subCategory: "user-interface",
    difficulty: "hard",
    frameworks: ["React", "Vue", "Angular"],
    tags: ["Performance", "Scroll handling", "Data fetching"],
    completionCount: 12300,
    estimatedTime: 60,
    hasTestCases: true,
    hasSolution: true
  },
  // React Hooks
  {
    id: "7",
    title: "Custom useLocalStorage Hook",
    description: "Implement a custom hook that syncs state with localStorage. The hook should persist data across page refreshes and provide a clean API.",
    category: "coding",
    subCategory: "react-hooks",
    difficulty: "medium",
    frameworks: ["React"],
    tags: ["Custom hooks", "localStorage", "State persistence"],
    completionCount: 18700,
    estimatedTime: 30,
    hasTestCases: true,
    hasSolution: true
  },
  {
    id: "8",
    title: "usePrevious Hook",
    description: "Create a custom hook that returns the previous value of a state or prop. This is useful for comparing current and previous values.",
    category: "coding",
    subCategory: "react-hooks",
    difficulty: "medium",
    frameworks: ["React"],
    tags: ["Custom hooks", "useRef", "Previous value tracking"],
    completionCount: 14200,
    estimatedTime: 25,
    hasTestCases: true,
    hasSolution: true
  },
  // CSS Layouts
  {
    id: "9",
    title: "CSS Grid Layout System",
    description: "Implement a responsive grid layout system using CSS Grid. Create a 12-column grid that adapts to different screen sizes.",
    category: "coding",
    subCategory: "css-layouts",
    difficulty: "medium",
    frameworks: ["CSS"],
    tags: ["CSS Grid", "Responsive design", "Layout systems"],
    completionCount: 22100,
    estimatedTime: 40,
    hasTestCases: true,
    hasSolution: true
  },
  {
    id: "10",
    title: "Flexbox Navigation Bar",
    description: "Create a responsive navigation bar using Flexbox. Include mobile menu toggle and proper responsive behavior.",
    category: "coding",
    subCategory: "css-layouts",
    difficulty: "easy",
    frameworks: ["CSS"],
    tags: ["Flexbox", "Navigation", "Responsive design"],
    completionCount: 31200,
    estimatedTime: 25,
    hasTestCases: true,
    hasSolution: true
  },
  // CSS Animations
  {
    id: "11",
    title: "Loading Spinner Animation",
    description: "Create a smooth loading spinner animation using CSS keyframes. Include different animation states and smooth transitions.",
    category: "coding",
    subCategory: "css-animations",
    difficulty: "easy",
    frameworks: ["CSS"],
    tags: ["CSS animations", "Keyframes", "Loading states"],
    completionCount: 26700,
    estimatedTime: 20,
    hasTestCases: true,
    hasSolution: true
  },
  {
    id: "12",
    title: "Hover Card Effects",
    description: "Implement smooth hover effects for cards including scale, shadow, and color transitions. Use CSS transforms and transitions.",
    category: "coding",
    subCategory: "css-animations",
    difficulty: "medium",
    frameworks: ["CSS"],
    tags: ["Hover effects", "CSS transforms", "Transitions"],
    completionCount: 19800,
    estimatedTime: 30,
    hasTestCases: true,
    hasSolution: true
  },
  // DOM Manipulation
  {
    id: "13",
    title: "Virtual Scrolling Implementation",
    description: "Implement virtual scrolling for large lists. Only render visible items to improve performance with thousands of items.",
    category: "coding",
    subCategory: "dom-manipulation",
    difficulty: "hard",
    frameworks: ["JavaScript", "React", "Vue"],
    tags: ["Performance", "Virtual scrolling", "DOM optimization"],
    completionCount: 8900,
    estimatedTime: 75,
    hasTestCases: true,
    hasSolution: true
  },
  {
    id: "14",
    title: "Drag and Drop Interface",
    description: "Create a drag and drop interface for reordering items. Include visual feedback and proper event handling.",
    category: "coding",
    subCategory: "dom-manipulation",
    difficulty: "hard",
    frameworks: ["JavaScript", "React", "Vue"],
    tags: ["Drag and drop", "Event handling", "User interaction"],
    completionCount: 15600,
    estimatedTime: 60,
    hasTestCases: true,
    hasSolution: true
  },
  // Web APIs
  {
    id: "15",
    title: "Intersection Observer API",
    description: "Implement lazy loading using the Intersection Observer API. Load images and content only when they come into view.",
    category: "coding",
    subCategory: "web-apis",
    difficulty: "medium",
    frameworks: ["JavaScript"],
    tags: ["Intersection Observer", "Lazy loading", "Performance"],
    completionCount: 13400,
    estimatedTime: 35,
    hasTestCases: true,
    hasSolution: true
  },
  {
    id: "16",
    title: "Service Worker Implementation",
    description: "Create a service worker for offline functionality and caching. Implement proper cache strategies and offline fallbacks.",
    category: "coding",
    subCategory: "web-apis",
    difficulty: "hard",
    frameworks: ["JavaScript"],
    tags: ["Service Workers", "PWA", "Offline functionality"],
    completionCount: 7200,
    estimatedTime: 90,
    hasTestCases: true,
    hasSolution: true
  },
  // Performance
  {
    id: "17",
    title: "React.memo Optimization",
    description: "Optimize React components using React.memo, useMemo, and useCallback. Identify and fix unnecessary re-renders.",
    category: "coding",
    subCategory: "performance",
    difficulty: "medium",
    frameworks: ["React"],
    tags: ["Performance optimization", "React.memo", "Re-renders"],
    completionCount: 16800,
    estimatedTime: 40,
    hasTestCases: true,
    hasSolution: true
  },
  {
    id: "18",
    title: "Bundle Size Optimization",
    description: "Analyze and optimize bundle size using webpack-bundle-analyzer. Implement code splitting and tree shaking.",
    category: "coding",
    subCategory: "performance",
    difficulty: "hard",
    frameworks: ["Webpack", "Vite", "Next.js"],
    tags: ["Bundle optimization", "Code splitting", "Tree shaking"],
    completionCount: 9800,
    estimatedTime: 80,
    hasTestCases: true,
    hasSolution: true
  },
  // System Design
  {
    id: "19",
    title: "Design a URL Shortener",
    description: "Design a URL shortening service like bit.ly. Consider scalability, database design, and API endpoints.",
    category: "system-design",
    subCategory: "algorithmic",
    difficulty: "medium",
    frameworks: ["System Design"],
    tags: ["URL shortening", "Database design", "API design"],
    completionCount: 11200,
    estimatedTime: 60,
    hasTestCases: false,
    hasSolution: true
  },
  {
    id: "20",
    title: "Design a Chat Application",
    description: "Design a real-time chat application. Consider WebSocket connections, message persistence, and user management.",
    category: "system-design",
    subCategory: "algorithmic",
    difficulty: "hard",
    frameworks: ["System Design"],
    tags: ["Real-time", "WebSockets", "Chat systems"],
    completionCount: 8900,
    estimatedTime: 90,
    hasTestCases: false,
    hasSolution: true
  },
  // Quiz Questions
  {
    id: "21",
    title: "JavaScript Event Loop",
    description: "Explain how the JavaScript event loop works. Describe the call stack, callback queue, and microtask queue.",
    category: "quiz",
    subCategory: "javascript-functions",
    difficulty: "medium",
    frameworks: ["JavaScript"],
    tags: ["Event loop", "Asynchronous programming", "JavaScript internals"],
    completionCount: 23400,
    estimatedTime: 20,
    hasTestCases: false,
    hasSolution: true
  },
  {
    id: "22",
    title: "React Reconciliation",
    description: "Explain React's reconciliation process and how the virtual DOM works. Describe key optimization strategies.",
    category: "quiz",
    subCategory: "react-hooks",
    difficulty: "hard",
    frameworks: ["React"],
    tags: ["Virtual DOM", "Reconciliation", "React internals"],
    completionCount: 15600,
    estimatedTime: 30,
    hasTestCases: false,
    hasSolution: true
  }
];

export const topics: Topic[] = [
  { id: "javascript", name: "JavaScript", count: 45 },
  { id: "react", name: "React", count: 38 },
  { id: "css", name: "CSS", count: 32 },
  { id: "html", name: "HTML", count: 28 },
  { id: "performance", name: "Performance", count: 25 },
  { id: "accessibility", name: "Accessibility", count: 22 },
  { id: "testing", name: "Testing", count: 20 },
  { id: "pwa", name: "PWA", count: 18 },
  { id: "typescript", name: "TypeScript", count: 35 },
  { id: "vue", name: "Vue", count: 15 },
  { id: "angular", name: "Angular", count: 12 },
  { id: "node", name: "Node.js", count: 30 },
  { id: "webpack", name: "Webpack", count: 16 },
  { id: "git", name: "Git", count: 25 },
  { id: "docker", name: "Docker", count: 14 },
  { id: "aws", name: "AWS", count: 18 },
  { id: "firebase", name: "Firebase", count: 20 },
  { id: "mongodb", name: "MongoDB", count: 16 },
  { id: "postgresql", name: "PostgreSQL", count: 12 },
  { id: "redis", name: "Redis", count: 10 },
  { id: "graphql", name: "GraphQL", count: 22 },
  { id: "rest", name: "REST API", count: 28 },
  { id: "security", name: "Security", count: 24 },
  { id: "seo", name: "SEO", count: 18 },
  { id: "ux", name: "UX Design", count: 26 }
];

export const companies: Company[] = [
  { id: "google", name: "Google", count: 45 },
  { id: "amazon", name: "Amazon", count: 38 },
  { id: "apple", name: "Apple", count: 32 },
  { id: "microsoft", name: "Microsoft", count: 40 },
  { id: "meta", name: "Meta", count: 35 },
  { id: "netflix", name: "Netflix", count: 28 },
  { id: "uber", name: "Uber", count: 25 },
  { id: "airbnb", name: "Airbnb", count: 22 },
  { id: "stripe", name: "Stripe", count: 20 },
  { id: "shopify", name: "Shopify", count: 18 },
  { id: "linkedin", name: "LinkedIn", count: 30 },
  { id: "twitter", name: "Twitter", count: 26 },
  { id: "github", name: "GitHub", count: 24 },
  { id: "discord", name: "Discord", count: 16 },
  { id: "slack", name: "Slack", count: 22 },
  { id: "zoom", name: "Zoom", count: 14 },
  { id: "dropbox", name: "Dropbox", count: 18 },
  { id: "spotify", name: "Spotify", count: 20 },
  { id: "twitch", name: "Twitch", count: 12 },
  { id: "reddit", name: "Reddit", count: 16 }
];

// Utility functions
export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy": return "text-green-400";
    case "medium": return "text-yellow-400";
    case "hard": return "text-red-400";
    default: return "text-gray-400";
  }
};

export const getDifficultyBgColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy": return "bg-green-100 text-green-800";
    case "medium": return "bg-yellow-100 text-yellow-800";
    case "hard": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export const formatCompletionCount = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

export const getSubCategoryIcon = (subCategory: string) => {
  const icons: { [key: string]: string } = {
    "javascript-functions": "⚡",
    "user-interface": "🎨",
    "algorithmic": "🧮",
    "react-hooks": "⚛️",
    "css-layouts": "🎯",
    "html-semantics": "📝",
    "dom-manipulation": "🔧",
    "async-programming": "⏱️",
    "react-components": "🧩",
    "css-animations": "✨",
    "web-apis": "🌐",
    "performance": "🚀"
  };
  return icons[subCategory] || "📋";
};
