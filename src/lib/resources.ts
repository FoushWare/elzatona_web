import { LearningResource, ResourceCategoryInfo, LearningPath } from '@/types/resource';

export const resourceCategories: ResourceCategoryInfo[] = [
  {
    id: 'ai-tools',
    name: 'AI Tools',
    description: 'AI-powered tools for frontend development and UI generation',
    icon: '🤖',
    color: 'bg-purple-500',
    count: 0
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Web security best practices and common vulnerabilities',
    icon: '🔒',
    color: 'bg-red-500',
    count: 0
  },
  {
    id: 'performance',
    name: 'Performance',
    description: 'Performance optimization and Core Web Vitals',
    icon: '⚡',
    color: 'bg-green-500',
    count: 0
  },
  {
    id: 'css',
    name: 'CSS',
    description: 'CSS layouts, animations, and best practices',
    icon: '🎨',
    color: 'bg-blue-500',
    count: 0
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'JavaScript patterns, concepts, and advanced topics',
    icon: '📜',
    color: 'bg-yellow-500',
    count: 0
  },
  {
    id: 'react',
    name: 'React',
    description: 'React patterns, hooks, and best practices',
    icon: '⚛️',
    color: 'bg-cyan-500',
    count: 0
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'TypeScript concepts and utility types',
    icon: '📘',
    color: 'bg-indigo-500',
    count: 0
  },
  {
    id: 'testing',
    name: 'Testing',
    description: 'Testing strategies and best practices',
    icon: '🧪',
    color: 'bg-pink-500',
    count: 0
  },
  {
    id: 'git',
    name: 'Git',
    description: 'Git workflows and best practices',
    icon: '📚',
    color: 'bg-orange-500',
    count: 0
  },
  {
    id: 'html',
    name: 'HTML',
    description: 'HTML semantics and accessibility',
    icon: '🌐',
    color: 'bg-teal-500',
    count: 0
  },
  {
    id: 'tools',
    name: 'Tools',
    description: 'Development tools and utilities',
    icon: '⚙️',
    color: 'bg-gray-500',
    count: 0
  },
  {
    id: 'interview',
    name: 'Interview Prep',
    description: 'Frontend interview questions and preparation',
    icon: '💼',
    color: 'bg-emerald-500',
    count: 0
  },
  {
    id: 'system-design',
    name: 'System Design',
    description: 'Design systems and architecture patterns',
    icon: '🏗️',
    color: 'bg-violet-500',
    count: 0
  },
  {
    id: 'micro-frontend',
    name: 'Micro Frontend',
    description: 'Micro frontend architecture and patterns',
    icon: '🧩',
    color: 'bg-rose-500',
    count: 0
  },
  {
    id: 'api',
    name: 'API Design',
    description: 'API design patterns and best practices',
    icon: '🔌',
    color: 'bg-sky-500',
    count: 0
  },
  {
    id: 'build-tools',
    name: 'Build Tools',
    description: 'Modern build tools and bundlers',
    icon: '🔧',
    color: 'bg-slate-500',
    count: 0
  },
  {
    id: 'browser',
    name: 'Browser',
    description: 'Browser APIs and features',
    icon: '🌍',
    color: 'bg-amber-500',
    count: 0
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    description: 'Algorithms and problem-solving techniques',
    icon: '🧮',
    color: 'bg-lime-500',
    count: 0
  }
];

export const learningResources: LearningResource[] = [
  // AI Tools
  {
    id: 'v0-dev',
    title: 'v0 - AI-powered UI component generator',
    description: 'Vercel\'s AI-powered UI component generator for React and Tailwind',
    url: 'https://v0.dev/',
    category: 'ai-tools',
    type: 'tool',
    tags: ['react', 'tailwind', 'ui-generation'],
    difficulty: 'beginner',
    featured: true
  },
  {
    id: 'figma-ai',
    title: 'Figma AI',
    description: 'Figma\'s built-in AI features for design generation',
    url: 'https://www.figma.com/ai/',
    category: 'ai-tools',
    type: 'tool',
    tags: ['design', 'figma', 'ui-generation'],
    difficulty: 'beginner'
  },
  {
    id: 'mantine-ai',
    title: 'Mantine AI',
    description: 'AI-generated Mantine components',
    url: 'https://mantine.ai/',
    category: 'ai-tools',
    type: 'tool',
    tags: ['mantine', 'react', 'components'],
    difficulty: 'intermediate'
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
    featured: true
  },
  {
    id: 'cookies-security',
    title: 'Understanding Cookies for Security',
    description: 'Comprehensive guide to cookies and security best practices',
    url: 'https://vercel.com/guides/understanding-cookies',
    category: 'security',
    type: 'article',
    tags: ['security', 'cookies', 'authentication'],
    difficulty: 'intermediate'
  },
  {
    id: 'cors-visualized',
    title: 'CORS Visualized',
    description: 'Visual explanation of CORS by Lydia Hallie',
    url: 'https://dev.to/lydiahallie/cs-visualized-cors-5b8h',
    category: 'security',
    type: 'article',
    tags: ['security', 'cors', 'api'],
    difficulty: 'intermediate'
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
    featured: true
  },
  {
    id: 'performance-tools',
    title: 'Performance Measurement Tools',
    description: 'Tools to measure and analyze web performance',
    url: 'https://www.youtube.com/watch?v=AQqFZ5t8uNc',
    category: 'performance',
    type: 'video',
    tags: ['performance', 'tools', 'measurement'],
    difficulty: 'beginner'
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
    difficulty: 'intermediate'
  },
  {
    id: 'css-layouts',
    title: 'CSS Layouts Deep Dive',
    description: 'Comprehensive guide to CSS layout techniques',
    url: 'https://www.youtube.com/watch?v=i1FeOOhNnwU',
    category: 'css',
    type: 'video',
    tags: ['css', 'layout', 'flexbox', 'grid'],
    difficulty: 'intermediate'
  },
  {
    id: 'masonry-layout',
    title: 'Masonry Layout with CSS',
    description: 'How to build a masonry layout using CSS',
    url: 'https://hackernoon.com/how-to-build-a-masonry-layout-using-css?ref=dailydev',
    category: 'css',
    type: 'article',
    tags: ['css', 'masonry', 'layout'],
    difficulty: 'advanced'
  },

  // JavaScript
  {
    id: 'event-loop',
    title: 'JavaScript Event Loop Visualized',
    description: 'Visual explanation of the JavaScript event loop by Lydia Hallie',
    url: 'https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif',
    category: 'javascript',
    type: 'article',
    tags: ['javascript', 'event-loop', 'asynchronous'],
    difficulty: 'intermediate',
    featured: true
  },
  {
    id: 'generators-iterators',
    title: 'JavaScript Generators and Iterators',
    description: 'Visual guide to generators and iterators in JavaScript',
    url: 'https://dev.to/lydiahallie/javascript-visualized-generators-and-iterators-e36',
    category: 'javascript',
    type: 'article',
    tags: ['javascript', 'generators', 'iterators'],
    difficulty: 'advanced'
  },
  {
    id: 'object-properties',
    title: 'Accessing Object Properties in JavaScript',
    description: 'Different ways to access object properties',
    url: 'https://dmitripavlutin.com/access-object-properties-javascript/',
    category: 'javascript',
    type: 'article',
    tags: ['javascript', 'objects', 'properties'],
    difficulty: 'beginner'
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
    featured: true
  },
  {
    id: 'render-props-pattern',
    title: 'Render Props Pattern',
    description: 'Understanding the render props pattern in React',
    url: 'https://www.patterns.dev/posts/render-props-pattern',
    category: 'react',
    type: 'article',
    tags: ['react', 'render-props', 'patterns'],
    difficulty: 'intermediate'
  },
  {
    id: 'prop-getters',
    title: 'Prop Getters Pattern',
    description: 'How to give rendering control to users with prop getters',
    url: 'https://kentcdodds.com/blog/how-to-give-rendering-control-to-users-with-prop-getters',
    category: 'react',
    type: 'article',
    tags: ['react', 'prop-getters', 'patterns'],
    difficulty: 'advanced'
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
    difficulty: 'intermediate'
  },
  {
    id: 'solid-principles-typescript',
    title: 'SOLID Principles in TypeScript',
    description: 'Applying SOLID principles in TypeScript',
    url: 'https://www.jmalvarez.dev/posts/open-closed-principle',
    category: 'typescript',
    type: 'article',
    tags: ['typescript', 'solid-principles', 'architecture'],
    difficulty: 'advanced'
  },

  // Testing
  {
    id: 'testing-implementation-details',
    title: 'Testing Implementation Details',
    description: 'Why you shouldn\'t test implementation details',
    url: 'https://kentcdodds.com/blog/testing-implementation-details',
    category: 'testing',
    type: 'article',
    tags: ['testing', 'best-practices', 'react'],
    difficulty: 'intermediate'
  },
  {
    id: 'stop-mocking-fetch',
    title: 'Stop Mocking Fetch',
    description: 'Better approaches to testing API calls',
    url: 'https://kentcdodds.com/blog/stop-mocking-fetch',
    category: 'testing',
    type: 'article',
    tags: ['testing', 'api', 'fetch'],
    difficulty: 'intermediate'
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
    difficulty: 'beginner'
  },
  {
    id: 'undraw-illustrations',
    title: 'Undraw Illustrations',
    description: 'Free SVG illustrations for your projects',
    url: 'https://undraw.co/illustrations',
    category: 'tools',
    type: 'tool',
    tags: ['illustrations', 'svg', 'design'],
    difficulty: 'beginner'
  },
  {
    id: 'squoosh',
    title: 'Squoosh - Image Optimization',
    description: 'Google\'s image optimization tool',
    url: 'https://squoosh.app/',
    category: 'tools',
    type: 'tool',
    tags: ['images', 'optimization', 'performance'],
    difficulty: 'beginner'
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
    featured: true
  },
  {
    id: 'react-interview-questions',
    title: 'React Interview Questions',
    description: 'Complete React interview questions and answers',
    url: 'https://github.com/sudheerj/reactjs-interview-questions',
    category: 'interview',
    type: 'article',
    tags: ['interview', 'react', 'questions'],
    difficulty: 'intermediate'
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
    difficulty: 'intermediate'
  },
  {
    id: 'atomic-design',
    title: 'Atomic Design Methodology',
    description: 'Brad Frost\'s atomic design methodology',
    url: 'https://bradfrost.com/blog/post/atomic-web-design/',
    category: 'system-design',
    type: 'article',
    tags: ['atomic-design', 'design-systems', 'methodology'],
    difficulty: 'intermediate'
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
    difficulty: 'advanced'
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
    difficulty: 'intermediate'
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
    difficulty: 'intermediate'
  },
  {
    id: 'monorepo-vs-polyrepo',
    title: 'Monorepo vs Polyrepo',
    description: 'Case study on using monorepos',
    url: 'https://medhatdawoud.net/blog/using-monorepos-is-not-that-bad-case-study',
    category: 'build-tools',
    type: 'article',
    tags: ['monorepo', 'architecture', 'project-structure'],
    difficulty: 'advanced'
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
    difficulty: 'advanced'
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
    difficulty: 'advanced'
  }
];

// Update category counts
resourceCategories.forEach(category => {
  category.count = learningResources.filter(resource => resource.category === category.id).length;
});

export const learningPaths: LearningPath[] = [
  {
    id: 'frontend-basics',
    title: 'Frontend Fundamentals',
    description: 'Master the basics of HTML, CSS, and JavaScript',
    difficulty: 'beginner',
    resources: ['css-layouts', 'object-properties', 'font-pairing'],
    estimatedTime: 8,
    targetSkills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design']
  },
  {
    id: 'react-mastery',
    title: 'React Mastery',
    description: 'Deep dive into React patterns and best practices',
    difficulty: 'intermediate',
    resources: ['react-rendering-patterns', 'render-props-pattern', 'prop-getters'],
    estimatedTime: 12,
    prerequisites: ['frontend-basics'],
    targetSkills: ['React', 'Component Patterns', 'Performance Optimization']
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    description: 'Learn to build fast, efficient web applications',
    difficulty: 'intermediate',
    resources: ['core-web-vitals', 'performance-tools', 'bfcache'],
    estimatedTime: 10,
    targetSkills: ['Performance', 'Core Web Vitals', 'Optimization']
  },
  {
    id: 'security-essentials',
    title: 'Security Essentials',
    description: 'Essential security practices for frontend developers',
    difficulty: 'intermediate',
    resources: ['csp-guide', 'cookies-security', 'cors-visualized'],
    estimatedTime: 6,
    targetSkills: ['Security', 'CSP', 'Authentication', 'CORS']
  }
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
    if (filter.difficulty && resource.difficulty !== filter.difficulty) return false;
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
