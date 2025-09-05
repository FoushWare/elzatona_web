import {
  LearningResource,
  ResourceCategoryInfo,
  LearningPath,
} from '@/types/resource';

export const resourceCategories: ResourceCategoryInfo[] = [
  {
    id: 'ai-tools',
    name: 'AI Tools',
    description: 'AI-powered tools for frontend development and UI generation',
    icon: '🤖',
    color: 'bg-purple-500',
    count: 0,
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Web security best practices and common vulnerabilities',
    icon: '🔒',
    color: 'bg-red-500',
    count: 0,
  },
  {
    id: 'performance',
    name: 'Performance',
    description: 'Performance optimization and Core Web Vitals',
    icon: '⚡',
    color: 'bg-green-500',
    count: 0,
  },
  {
    id: 'css',
    name: 'CSS',
    description: 'CSS layouts, animations, and best practices',
    icon: '🎨',
    color: 'bg-blue-500',
    count: 0,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'JavaScript patterns, concepts, and advanced topics',
    icon: '📜',
    color: 'bg-yellow-500',
    count: 0,
  },
  {
    id: 'react',
    name: 'React',
    description: 'React patterns, hooks, and best practices',
    icon: '⚛️',
    color: 'bg-cyan-500',
    count: 0,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'TypeScript concepts and utility types',
    icon: '📘',
    color: 'bg-indigo-500',
    count: 0,
  },
  {
    id: 'testing',
    name: 'Testing',
    description: 'Testing strategies and best practices',
    icon: '🧪',
    color: 'bg-pink-500',
    count: 0,
  },
  {
    id: 'git',
    name: 'Git',
    description: 'Git workflows and best practices',
    icon: '📚',
    color: 'bg-orange-500',
    count: 0,
  },
  {
    id: 'html',
    name: 'HTML',
    description: 'HTML semantics and accessibility',
    icon: '🌐',
    color: 'bg-teal-500',
    count: 0,
  },
  {
    id: 'tools',
    name: 'Tools',
    description: 'Development tools and utilities',
    icon: '⚙️',
    color: 'bg-gray-500',
    count: 0,
  },
  {
    id: 'interview',
    name: 'Interview Prep',
    description: 'Frontend interview questions and preparation',
    icon: '💼',
    color: 'bg-emerald-500',
    count: 0,
  },
  {
    id: 'english',
    name: 'English Learning',
    description: 'Free resources to improve English language skills',
    icon: '🇬🇧',
    color: 'bg-blue-600',
    count: 0,
  },
  {
    id: 'system-design',
    name: 'System Design',
    description: 'Design systems and architecture patterns',
    icon: '🏗️',
    color: 'bg-violet-500',
    count: 0,
  },
  {
    id: 'micro-frontend',
    name: 'Micro Frontend',
    description: 'Micro frontend architecture and patterns',
    icon: '🧩',
    color: 'bg-rose-500',
    count: 0,
  },
  {
    id: 'api',
    name: 'API Design',
    description: 'API design patterns and best practices',
    icon: '🔌',
    color: 'bg-sky-500',
    count: 0,
  },
  {
    id: 'build-tools',
    name: 'Build Tools',
    description: 'Modern build tools and bundlers',
    icon: '🔧',
    color: 'bg-slate-500',
    count: 0,
  },
  {
    id: 'browser',
    name: 'Browser',
    description: 'Browser APIs and features',
    icon: '🌍',
    color: 'bg-amber-500',
    count: 0,
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    description: 'Algorithms and problem-solving techniques',
    icon: '🧮',
    color: 'bg-lime-500',
    count: 0,
  },
];

export const learningResources: LearningResource[] = [
  // AI Tools
  {
    id: 'v0-dev',
    title: 'v0 - AI-powered UI component generator',
    description:
      "Vercel's AI-powered UI component generator for React and Tailwind",
    url: 'https://v0.dev/',
    category: 'ai-tools',
    type: 'tool',
    tags: ['react', 'tailwind', 'ui-generation'],
    difficulty: 'beginner',
    featured: true,
  },
  {
    id: 'figma-ai',
    title: 'Figma AI',
    description: "Figma's built-in AI features for design generation",
    url: 'https://www.figma.com/ai/',
    category: 'ai-tools',
    type: 'tool',
    tags: ['design', 'figma', 'ui-generation'],
    difficulty: 'beginner',
  },
  {
    id: 'mantine-ai',
    title: 'Mantine AI',
    description: 'AI-generated Mantine components',
    url: 'https://mantine.ai/',
    category: 'ai-tools',
    type: 'tool',
    tags: ['mantine', 'react', 'components'],
    difficulty: 'intermediate',
  },

  // Security
  {
    id: 'csp-guide',
    title: 'Content Security Policy (CSP) Guide',
    description: 'Understanding XSS attacks and setting up CSP',
    url: 'https://vercel.com/guides/understanding-xss-attacks#set-a-content-security-policy-(csp)',
    category: 'security',
    type: 'article',
    tags: ['security', 'csp', 'xss'],
    difficulty: 'intermediate',
    featured: true,
  },
  {
    id: 'cookies-security',
    title: 'Understanding Cookies for Security',
    description: 'Comprehensive guide to cookies and security best practices',
    url: 'https://vercel.com/guides/understanding-cookies',
    category: 'security',
    type: 'article',
    tags: ['security', 'cookies', 'authentication'],
    difficulty: 'intermediate',
  },
  {
    id: 'cors-visualized',
    title: 'CORS Visualized',
    description: 'Visual explanation of CORS by Lydia Hallie',
    url: 'https://dev.to/lydiahallie/cs-visualized-cors-5b8h',
    category: 'security',
    type: 'article',
    tags: ['security', 'cors', 'api'],
    difficulty: 'intermediate',
  },

  // Performance
  {
    id: 'core-web-vitals',
    title: 'Core Web Vitals Explained',
    description: 'Fireship video explaining Core Web Vitals',
    url: 'https://www.youtube.com/watch?v=0fONene3OIA',
    category: 'performance',
    type: 'video',
    tags: ['performance', 'core-web-vitals', 'metrics'],
    difficulty: 'intermediate',
    featured: true,
  },
  {
    id: 'performance-tools',
    title: 'Performance Measurement Tools',
    description: 'Tools to measure and analyze web performance',
    url: 'https://www.youtube.com/watch?v=AQqFZ5t8uNc',
    category: 'performance',
    type: 'video',
    tags: ['performance', 'tools', 'measurement'],
    difficulty: 'beginner',
  },

  // CSS
  {
    id: 'css-stacking-context',
    title: 'CSS Stacking Context',
    description: 'Understanding CSS stacking context and z-index',
    url: 'https://www.youtube.com/watch?v=uS8l4YRXbaw',
    category: 'css',
    type: 'video',
    tags: ['css', 'stacking-context', 'z-index'],
    difficulty: 'intermediate',
  },
  {
    id: 'css-layouts',
    title: 'CSS Layouts Deep Dive',
    description: 'Comprehensive guide to CSS layout techniques',
    url: 'https://www.youtube.com/watch?v=i1FeOOhNnwU',
    category: 'css',
    type: 'video',
    tags: ['css', 'layout', 'flexbox', 'grid'],
    difficulty: 'intermediate',
  },
  {
    id: 'masonry-layout',
    title: 'Masonry Layout with CSS',
    description: 'How to build a masonry layout using CSS',
    url: 'https://hackernoon.com/how-to-build-a-masonry-layout-using-css?ref=dailydev',
    category: 'css',
    type: 'article',
    tags: ['css', 'masonry', 'layout'],
    difficulty: 'advanced',
  },

  // JavaScript
  {
    id: 'event-loop',
    title: 'JavaScript Event Loop Visualized',
    description:
      'Visual explanation of the JavaScript event loop by Lydia Hallie',
    url: 'https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif',
    category: 'javascript',
    type: 'article',
    tags: ['javascript', 'event-loop', 'asynchronous'],
    difficulty: 'intermediate',
    featured: true,
  },
  {
    id: 'generators-iterators',
    title: 'JavaScript Generators and Iterators',
    description: 'Visual guide to generators and iterators in JavaScript',
    url: 'https://dev.to/lydiahallie/javascript-visualized-generators-and-iterators-e36',
    category: 'javascript',
    type: 'article',
    tags: ['javascript', 'generators', 'iterators'],
    difficulty: 'advanced',
  },
  {
    id: 'object-properties',
    title: 'Accessing Object Properties in JavaScript',
    description: 'Different ways to access object properties',
    url: 'https://dmitripavlutin.com/access-object-properties-javascript/',
    category: 'javascript',
    type: 'article',
    tags: ['javascript', 'objects', 'properties'],
    difficulty: 'beginner',
  },

  // React
  {
    id: 'react-rendering-patterns',
    title: 'React Rendering Patterns',
    description: '10 rendering patterns in React',
    url: 'https://www.youtube.com/watch?v=Dkx5ydvtpCA&t=9s',
    category: 'react',
    type: 'video',
    tags: ['react', 'rendering', 'patterns'],
    difficulty: 'advanced',
    featured: true,
  },
  {
    id: 'render-props-pattern',
    title: 'Render Props Pattern',
    description: 'Understanding the render props pattern in React',
    url: 'https://www.patterns.dev/posts/render-props-pattern',
    category: 'react',
    type: 'article',
    tags: ['react', 'render-props', 'patterns'],
    difficulty: 'intermediate',
  },
  {
    id: 'prop-getters',
    title: 'Prop Getters Pattern',
    description: 'How to give rendering control to users with prop getters',
    url: 'https://kentcdodds.com/blog/how-to-give-rendering-control-to-users-with-prop-getters',
    category: 'react',
    type: 'article',
    tags: ['react', 'prop-getters', 'patterns'],
    difficulty: 'advanced',
  },

  // TypeScript
  {
    id: 'typescript-utility-types',
    title: 'TypeScript Utility Types',
    description: 'Comprehensive guide to TypeScript utility types',
    url: 'https://timmousk.com/blog/typescript-utility-types/#picktype-keys',
    category: 'typescript',
    type: 'article',
    tags: ['typescript', 'utility-types', 'type-system'],
    difficulty: 'intermediate',
  },
  {
    id: 'solid-principles-typescript',
    title: 'SOLID Principles in TypeScript',
    description: 'Applying SOLID principles in TypeScript',
    url: 'https://www.jmalvarez.dev/posts/open-closed-principle',
    category: 'typescript',
    type: 'article',
    tags: ['typescript', 'solid-principles', 'architecture'],
    difficulty: 'advanced',
  },

  // Testing
  {
    id: 'testing-implementation-details',
    title: 'Testing Implementation Details',
    description: "Why you shouldn't test implementation details",
    url: 'https://kentcdodds.com/blog/testing-implementation-details',
    category: 'testing',
    type: 'article',
    tags: ['testing', 'best-practices', 'react'],
    difficulty: 'intermediate',
  },
  {
    id: 'stop-mocking-fetch',
    title: 'Stop Mocking Fetch',
    description: 'Better approaches to testing API calls',
    url: 'https://kentcdodds.com/blog/stop-mocking-fetch',
    category: 'testing',
    type: 'article',
    tags: ['testing', 'api', 'fetch'],
    difficulty: 'intermediate',
  },

  // Tools
  {
    id: 'font-pairing',
    title: 'Font Pairing Tool',
    description: 'AI-powered font pairing for better typography',
    url: 'https://fontjoy.com/',
    category: 'tools',
    type: 'tool',
    tags: ['typography', 'design', 'fonts'],
    difficulty: 'beginner',
  },
  {
    id: 'undraw-illustrations',
    title: 'Undraw Illustrations',
    description: 'Free SVG illustrations for your projects',
    url: 'https://undraw.co/illustrations',
    category: 'tools',
    type: 'tool',
    tags: ['illustrations', 'svg', 'design'],
    difficulty: 'beginner',
  },
  {
    id: 'squoosh',
    title: 'Squoosh - Image Optimization',
    description: "Google's image optimization tool",
    url: 'https://squoosh.app/',
    category: 'tools',
    type: 'tool',
    tags: ['images', 'optimization', 'performance'],
    difficulty: 'beginner',
  },

  // English Learning
  {
    id: 'cbc-learning-english',
    title: 'CBC Learning English',
    description:
      'Free English learning resources from Canadian Broadcasting Corporation',
    url: 'https://www.cbc.ca/learning-english',
    category: 'english',
    type: 'website',
    tags: ['english', 'learning', 'free', 'canadian'],
    difficulty: 'beginner',
    featured: true,
  },
  {
    id: 'bbc-learning-english',
    title: 'BBC Learning English',
    description: 'Comprehensive English learning resources from BBC',
    url: 'https://www.bbc.co.uk/learningenglish',
    category: 'english',
    type: 'website',
    tags: ['english', 'learning', 'free', 'british'],
    difficulty: 'beginner',
    featured: true,
  },
  {
    id: 'voa-learning-english',
    title: 'VOA Learning English',
    description: 'Voice of America English learning resources',
    url: 'https://learningenglish.voanews.com/',
    category: 'english',
    type: 'website',
    tags: ['english', 'learning', 'free', 'american'],
    difficulty: 'beginner',
  },
  {
    id: 'eslpod',
    title: 'ESLPod',
    description: 'English as a Second Language Podcast for learners',
    url: 'https://www.eslpod.com/',
    category: 'english',
    type: 'podcast',
    tags: ['english', 'learning', 'podcast', 'esl'],
    difficulty: 'beginner',
  },
  {
    id: 'the-english-we-speak',
    title: 'The English We Speak (BBC)',
    description: 'BBC podcast series on everyday English expressions',
    url: 'https://www.bbc.co.uk/learningenglish/english/features/the-english-we-speak',
    category: 'english',
    type: 'podcast',
    tags: ['english', 'learning', 'podcast', 'expressions'],
    difficulty: 'intermediate',
  },
  {
    id: 'lukes-english-podcast',
    title: "Luke's English Podcast",
    description: 'Comprehensive English learning podcast by Luke Thompson',
    url: 'https://teacherluke.co.uk/',
    category: 'english',
    type: 'podcast',
    tags: ['english', 'learning', 'podcast', 'comprehensive'],
    difficulty: 'intermediate',
  },
  {
    id: 'all-ears-english',
    title: 'All Ears English',
    description: 'American English learning podcast and resources',
    url: 'https://www.allearsenglish.com/',
    category: 'english',
    type: 'podcast',
    tags: ['english', 'learning', 'podcast', 'american'],
    difficulty: 'beginner',
  },

  // Interview Prep
  {
    id: 'javascript-questions',
    title: 'JavaScript Interview Questions',
    description: 'Comprehensive JavaScript interview questions by Lydia Hallie',
    url: 'https://github.com/lydiahallie/javascript-questions/tree/master',
    category: 'interview',
    type: 'article',
    tags: ['interview', 'javascript', 'questions'],
    difficulty: 'intermediate',
    featured: true,
  },
  {
    id: 'react-interview-questions',
    title: 'React Interview Questions',
    description: 'Complete React interview questions and answers',
    url: 'https://github.com/sudheerj/reactjs-interview-questions',
    category: 'interview',
    type: 'article',
    tags: ['interview', 'react', 'questions'],
    difficulty: 'intermediate',
  },

  // System Design
  {
    id: 'design-systems-course',
    title: 'Design Systems Course',
    description: 'Frontend Masters course on design systems',
    url: 'https://frontendmasters.com/courses/design-systems/',
    category: 'system-design',
    type: 'course',
    tags: ['design-systems', 'course', 'architecture'],
    difficulty: 'intermediate',
  },
  {
    id: 'atomic-design',
    title: 'Atomic Design Methodology',
    description: "Brad Frost's atomic design methodology",
    url: 'https://bradfrost.com/blog/post/atomic-web-design/',
    category: 'system-design',
    type: 'article',
    tags: ['atomic-design', 'design-systems', 'methodology'],
    difficulty: 'intermediate',
  },

  // Micro Frontend
  {
    id: 'microfrontends-concept',
    title: 'Micro Frontends Concept',
    description: 'Understanding micro frontends architecture',
    url: 'https://single-spa.js.org/docs/microfrontends-concept/',
    category: 'micro-frontend',
    type: 'article',
    tags: ['micro-frontend', 'architecture', 'spa'],
    difficulty: 'advanced',
  },

  // API Design
  {
    id: 'http-long-polling-vs-sse-vs-websockets',
    title: 'HTTP Long Polling vs Server Sent Events vs WebSockets',
    description: 'Comparison of different real-time communication methods',
    url: 'https://www.youtube.com/watch?v=1cFyfT0m3bA',
    category: 'api',
    type: 'video',
    tags: ['api', 'websockets', 'real-time'],
    difficulty: 'intermediate',
  },

  // Build Tools
  {
    id: 'build-tools-2023',
    title: 'Build Tools for Web Development 2023',
    description: 'Comprehensive overview of modern build tools',
    url: 'https://stackdiary.com/build-tools-for-web-development/',
    category: 'build-tools',
    type: 'article',
    tags: ['build-tools', 'bundlers', 'webpack', 'vite'],
    difficulty: 'intermediate',
  },
  {
    id: 'monorepo-vs-polyrepo',
    title: 'Monorepo vs Polyrepo',
    description: 'Case study on using monorepos',
    url: 'https://medhatdawoud.net/blog/using-monorepos-is-not-that-bad-case-study',
    category: 'build-tools',
    type: 'article',
    tags: ['monorepo', 'architecture', 'project-structure'],
    difficulty: 'advanced',
  },

  // Browser
  {
    id: 'bfcache',
    title: 'Back/Forward Cache (bfcache)',
    description: 'Understanding browser back/forward cache',
    url: 'https://developer.chrome.com/docs/web-platform/deprecating-unload?ref=dailydev',
    category: 'browser',
    type: 'article',
    tags: ['browser', 'caching', 'performance'],
    difficulty: 'advanced',
  },

  // Problem Solving
  {
    id: 'logarithms-time-complexity',
    title: 'Deeply Understanding Logarithms In Time Complexities',
    description: 'Understanding logarithms in algorithm analysis',
    url: 'https://www.youtube.com/watch?v=M4ubFru2O80',
    category: 'problem-solving',
    type: 'video',
    tags: ['algorithms', 'time-complexity', 'logarithms'],
    difficulty: 'advanced',
  },
];

// Update category counts
resourceCategories.forEach(category => {
  category.count = learningResources.filter(
    resource => resource.category === category.id
  ).length;
});

export const learningPaths: LearningPath[] = [
  {
    id: 'frontend-basics',
    title: 'Frontend Fundamentals',
    description:
      'Master the essential building blocks of web development: HTML semantics, CSS layouts, and JavaScript fundamentals. Perfect for beginners starting their frontend journey with 65 comprehensive practice questions covering core concepts.',
    difficulty: 'beginner',
    resources: [
      'css-layouts',
      'object-properties',
      'font-pairing',
      'css-stacking-context',
      'event-loop',
    ],
    estimatedTime: 15,
    prerequisites: [],
    targetSkills: [
      'HTML Semantics',
      'CSS Layouts',
      'JavaScript Basics',
      'Responsive Design',
      'DOM Manipulation',
      'Event Handling',
    ],
    questionCount: 100,
    questionCategories: ['html', 'css', 'javascript'],
  },
  {
    id: 'advanced-css',
    title: 'Advanced CSS Mastery',
    description:
      'Master advanced CSS techniques including Grid, Flexbox, animations, and modern layout patterns. Learn CSS architecture, performance optimization, and responsive design strategies with 20+ comprehensive practice questions.',
    difficulty: 'intermediate',
    resources: [
      'css-stacking-context',
      'css-layouts',
      'masonry-layout',
      'font-pairing',
    ],
    estimatedTime: 12,
    prerequisites: ['frontend-basics'],
    targetSkills: [
      'CSS Grid & Flexbox',
      'Advanced Layouts',
      'CSS Animations',
      'CSS Architecture',
      'Performance Optimization',
      'Responsive Design',
    ],
    questionCount: 20,
    questionCategories: ['css'],
  },
  {
    id: 'javascript-deep-dive',
    title: 'JavaScript Deep Dive',
    description:
      'Dive deep into advanced JavaScript concepts including closures, prototypes, async programming, and modern ES6+ features. Master complex patterns and performance optimization with 90 comprehensive practice questions covering everything from fundamentals to advanced topics.',
    difficulty: 'intermediate',
    resources: [
      'event-loop',
      'generators-iterators',
      'object-properties',
      'logarithms-time-complexity',
    ],
    estimatedTime: 18,
    prerequisites: ['frontend-basics'],
    targetSkills: [
      'Advanced JavaScript',
      'Closures & Prototypes',
      'Async Programming',
      'ES6+ Features',
      'Performance Optimization',
      'Memory Management',
    ],
    questionCount: 129,
    questionCategories: ['javascript'],
  },
  {
    id: 'react-mastery',
    title: 'React Mastery',
    description:
      'Master React from fundamentals to advanced patterns including hooks, context, performance optimization, and modern best practices. Learn component architecture, state management, and testing strategies with 24 comprehensive practice questions.',
    difficulty: 'intermediate',
    resources: [
      'react-rendering-patterns',
      'render-props-pattern',
      'prop-getters',
      'react-interview-questions',
    ],
    estimatedTime: 20,
    prerequisites: ['frontend-basics', 'javascript-deep-dive'],
    targetSkills: [
      'React Hooks',
      'Component Patterns',
      'Context & State',
      'Performance Optimization',
      'Testing Strategies',
      'Modern Best Practices',
    ],
    questionCount: 24,
    questionCategories: ['react'],
  },
  {
    id: 'typescript-essentials',
    title: 'TypeScript Essentials',
    description:
      'Master TypeScript for enhanced type safety, better developer experience, and robust code architecture. Learn advanced type system features, utility types, generics, and modern TypeScript patterns with 25+ comprehensive practice questions.',
    difficulty: 'intermediate',
    resources: ['typescript-utility-types', 'solid-principles-typescript'],
    estimatedTime: 12,
    prerequisites: ['javascript-deep-dive'],
    targetSkills: [
      'TypeScript Fundamentals',
      'Advanced Type System',
      'Utility Types & Generics',
      'Type Safety',
      'SOLID Principles',
      'Modern Patterns',
    ],
    questionCount: 25,
    questionCategories: ['typescript'],
  },
  {
    id: 'testing-strategies',
    title: 'Testing Strategies',
    description:
      'Master comprehensive frontend testing strategies including unit testing, integration testing, and end-to-end testing. Learn modern testing tools, best practices, and testing patterns with 20+ comprehensive practice questions.',
    difficulty: 'intermediate',
    resources: ['testing-implementation-details', 'stop-mocking-fetch'],
    estimatedTime: 14,
    prerequisites: ['react-mastery'],
    targetSkills: [
      'Unit Testing',
      'Integration Testing',
      'E2E Testing',
      'Jest & Testing Library',
      'Test Strategy',
      'Mocking & Stubbing',
    ],
    questionCount: 20,
    questionCategories: ['testing'],
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    description:
      'Master web performance optimization techniques including Core Web Vitals, bundle optimization, lazy loading, and performance monitoring. Learn to build lightning-fast applications with 20+ comprehensive practice questions.',
    difficulty: 'intermediate',
    resources: [
      'core-web-vitals',
      'performance-tools',
      'bfcache',
      'css-stacking-context',
    ],
    estimatedTime: 16,
    prerequisites: ['frontend-basics'],
    targetSkills: [
      'Core Web Vitals',
      'Bundle Optimization',
      'Lazy Loading',
      'Performance Monitoring',
      'Caching Strategies',
      'Image Optimization',
    ],
    questionCount: 20,
    questionCategories: ['performance'],
  },
  {
    id: 'security-essentials',
    title: 'Security Essentials',
    description:
      'Master essential frontend security practices including Content Security Policy (CSP), secure authentication, CORS, XSS prevention, and secure coding practices. Learn to build secure web applications with 15+ comprehensive practice questions.',
    difficulty: 'intermediate',
    resources: ['csp-guide', 'cookies-security', 'cors-visualized'],
    estimatedTime: 10,
    targetSkills: [
      'Content Security Policy',
      'Secure Authentication',
      'CORS & Security Headers',
      'XSS Prevention',
      'Secure Coding Practices',
      'Security Best Practices',
    ],
    questionCount: 15,
    questionCategories: ['security'],
  },
  {
    id: 'system-design',
    title: 'Frontend System Design',
    description:
      'Master the art of designing scalable, maintainable frontend architectures including design systems, component libraries, micro frontends, and architectural patterns. Learn to build enterprise-grade applications with 20+ comprehensive practice questions.',
    difficulty: 'advanced',
    resources: [
      'design-systems-course',
      'atomic-design',
      'microfrontends-concept',
    ],
    estimatedTime: 20,
    prerequisites: ['react-mastery', 'typescript-essentials'],
    targetSkills: [
      'System Architecture',
      'Design Systems',
      'Component Libraries',
      'Micro Frontends',
      'Scalable Patterns',
      'Team Collaboration',
    ],
    questionCount: 20,
    questionCategories: ['system-design'],
  },
  {
    id: 'build-tools-mastery',
    title: 'Build Tools & DevOps',
    description:
      'Master modern build tools, bundlers, and deployment strategies including Webpack, Vite, CI/CD pipelines, and monorepo management. Learn to optimize build processes and automate deployments with 25+ comprehensive practice questions.',
    difficulty: 'intermediate',
    resources: ['build-tools-2023', 'monorepo-vs-polyrepo', 'squoosh'],
    estimatedTime: 14,
    prerequisites: ['frontend-basics'],
    targetSkills: [
      'Build Tools & Bundlers',
      'CI/CD Pipelines',
      'Monorepo Management',
      'Deployment Strategies',
      'Performance Optimization',
      'Automation',
    ],
    questionCount: 25,
    questionCategories: ['devops', 'build-tools'],
  },
  {
    id: 'api-integration',
    title: 'API Integration & Communication',
    description:
      'Master frontend-backend communication patterns including REST APIs, GraphQL, WebSockets, real-time communication, and error handling strategies. Learn to build robust client-server applications with 20+ comprehensive practice questions.',
    difficulty: 'intermediate',
    resources: ['http-long-polling-vs-sse-vs-websockets', 'cors-visualized'],
    estimatedTime: 12,
    prerequisites: ['javascript-deep-dive'],
    targetSkills: [
      'REST APIs & GraphQL',
      'WebSockets & Real-time',
      'HTTP & Communication',
      'Error Handling',
      'Data Fetching Patterns',
      'API Optimization',
    ],
    questionCount: 20,
    questionCategories: ['api', 'communication'],
  },
  {
    id: 'ai-tools-integration',
    title: 'AI Tools for Frontend',
    description:
      'Master AI-powered development tools including code generation, UI design assistance, and productivity enhancement. Learn to leverage AI for faster development, better code quality, and innovative solutions with 15+ comprehensive practice questions.',
    difficulty: 'intermediate',
    resources: ['v0-dev', 'figma-ai', 'mantine-ai'],
    estimatedTime: 8,
    targetSkills: [
      'AI Code Generation',
      'UI Design Assistance',
      'Productivity Tools',
      'Modern Workflow',
      'AI Integration',
      'Innovation & Efficiency',
    ],
    questionCount: 15,
    questionCategories: ['ai-tools'],
  },
  {
    id: 'interview-preparation',
    title: 'Frontend Interview Prep',
    description:
      'Comprehensive preparation for frontend development interviews including technical questions, coding challenges, system design, and behavioral interviews. Master the skills needed to ace any frontend interview with 30+ comprehensive practice questions.',
    difficulty: 'intermediate',
    resources: ['javascript-questions', 'react-interview-questions'],
    estimatedTime: 25,
    prerequisites: ['react-mastery', 'javascript-deep-dive'],
    targetSkills: [
      'Technical Interview Skills',
      'Coding Challenges',
      'System Design',
      'Problem Solving',
      'Communication',
      'Interview Strategy',
    ],
    questionCount: 30,
    questionCategories: ['interview', 'problem-solving'],
  },
  {
    id: 'advanced-architectures',
    title: 'Advanced Frontend Architectures',
    description:
      'Explore cutting-edge frontend architectures including micro frontends, monorepos, distributed systems, and enterprise-scale patterns. Master advanced architectural concepts for large-scale applications with 20+ comprehensive practice questions.',
    difficulty: 'advanced',
    resources: [
      'microfrontends-concept',
      'monorepo-vs-polyrepo',
      'design-systems-course',
    ],
    estimatedTime: 22,
    prerequisites: ['system-design', 'build-tools-mastery'],
    targetSkills: [
      'Micro Frontends',
      'Monorepo Architecture',
      'Distributed Systems',
      'Scalable Patterns',
      'Enterprise Architecture',
      'Team Collaboration',
    ],
    questionCount: 20,
    questionCategories: ['architecture', 'advanced'],
  },
  {
    id: 'javascript-practice',
    title: 'JavaScript Practice & Interview Prep',
    description:
      'Master JavaScript through 34 comprehensive practice questions covering fundamentals, ES6+ features, advanced patterns, and interview scenarios. Perfect for reinforcing JavaScript knowledge and preparing for technical interviews.',
    difficulty: 'intermediate',
    resources: ['javascript-fundamentals', 'es6-features', 'advanced-patterns'],
    estimatedTime: 12,
    prerequisites: ['frontend-basics'],
    targetSkills: [
      'JavaScript Fundamentals',
      'ES6+ Features',
      'Advanced Patterns',
      'Interview Preparation',
      'Problem Solving',
      'Code Optimization',
    ],
    questionCount: 34,
    questionCategories: ['javascript'],
  },
  {
    id: 'css-practice',
    title: 'CSS Practice & Layout Mastery',
    description:
      'Master CSS through 11 comprehensive practice questions covering advanced layouts, animations, modern techniques, and responsive design patterns. Perfect for honing CSS skills and understanding complex styling concepts.',
    difficulty: 'intermediate',
    resources: ['css-layouts', 'css-animations', 'responsive-design'],
    estimatedTime: 8,
    prerequisites: ['frontend-basics'],
    targetSkills: [
      'Advanced CSS Layouts',
      'CSS Animations',
      'Modern CSS Techniques',
      'Responsive Design',
      'CSS Architecture',
      'Performance Optimization',
    ],
    questionCount: 11,
    questionCategories: ['css'],
  },
  {
    id: 'html-practice',
    title: 'HTML Practice & Semantic Mastery',
    description:
      'Master HTML fundamentals through 3 comprehensive practice questions focusing on semantic markup, accessibility best practices, and modern HTML standards. Perfect for understanding the foundation of web development.',
    difficulty: 'beginner',
    resources: ['html-semantics', 'accessibility', 'modern-html'],
    estimatedTime: 6,
    prerequisites: [],
    targetSkills: [
      'HTML Fundamentals',
      'Semantic Markup',
      'Accessibility',
      'Modern HTML Standards',
      'SEO Best Practices',
      'Web Standards',
    ],
    questionCount: 3,
    questionCategories: ['html'],
  },
  {
    id: 'react-practice',
    title: 'React Practice & Advanced Patterns',
    description:
      'Master React through 10 comprehensive practice questions covering hooks, advanced patterns, performance optimization, and modern React concepts. Perfect for reinforcing React knowledge and understanding complex patterns.',
    difficulty: 'intermediate',
    resources: ['react-hooks', 'component-patterns', 'performance'],
    estimatedTime: 10,
    prerequisites: ['javascript-practice'],
    targetSkills: [
      'React Hooks',
      'Advanced Patterns',
      'Performance Optimization',
      'Component Architecture',
      'State Management',
      'Modern React',
    ],
    questionCount: 10,
    questionCategories: ['react'],
  },
  {
    id: 'interview-questions',
    title: 'Comprehensive Interview Preparation',
    description:
      'Master frontend interviews with 48 comprehensive questions organized by category and difficulty. Covering HTML, CSS, JavaScript, and React fundamentals to advanced concepts. Perfect for comprehensive interview preparation and skill assessment.',
    difficulty: 'intermediate',
    resources: ['interview-prep', 'question-bank', 'practice-tests'],
    estimatedTime: 20,
    prerequisites: ['frontend-basics'],
    targetSkills: [
      'Comprehensive Interview Prep',
      'Technical Problem Solving',
      'Multi-domain Knowledge',
      'Communication Skills',
      'Interview Strategy',
      'Skill Assessment',
    ],
    questionCount: 48,
    questionCategories: ['html', 'css', 'javascript', 'react'],
  },
  {
    id: 'english-learning',
    title: 'Improve Your English',
    description:
      'Free, high-quality resources to improve your English language skills for better communication in tech',
    difficulty: 'beginner',
    resources: [
      'cbc-learning-english',
      'bbc-learning-english',
      'voa-learning-english',
      'eslpod',
      'the-english-we-speak',
      'lukes-english-podcast',
      'all-ears-english',
    ],
    estimatedTime: 12,
    prerequisites: [],
    targetSkills: [
      'English Language',
      'Communication',
      'Listening',
      'Speaking',
      'Reading',
      'Writing',
    ],
  },
];

export function getResourcesByCategory(category: string): LearningResource[] {
  return learningResources.filter(resource => resource.category === category);
}

export function getResourcesByFilter(filter: {
  category?: string;
  type?: string;
  difficulty?: string;
  searchTerm?: string;
}): LearningResource[] {
  return learningResources.filter(resource => {
    if (filter.category && resource.category !== filter.category) return false;
    if (filter.type && resource.type !== filter.type) return false;
    if (filter.difficulty && resource.difficulty !== filter.difficulty)
      return false;
    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      return (
        resource.title.toLowerCase().includes(searchLower) ||
        resource.description.toLowerCase().includes(searchLower) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });
}

export function getFeaturedResources(): LearningResource[] {
  return learningResources.filter(resource => resource.featured);
}

export function getResourceById(id: string): LearningResource | undefined {
  return learningResources.find(resource => resource.id === id);
}

export function getLearningPathById(id: string): LearningPath | undefined {
  return learningPaths.find(path => path.id === id);
}
