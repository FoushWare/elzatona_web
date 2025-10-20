export interface Article {
  id: string;
  title: string;
  author: string;
  authorUrl?: string;
  source: string;
  sourceUrl: string;
  publishedDate: string;
  readTime: string;
  category: string;
  tags: string[];
  description: string;
  content?: string; // For embedded content
  isEmbedded: boolean;
  featured?: boolean;
}

export interface ArticleCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const articleCategories: ArticleCategory[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    description:
      'Deep dives into JavaScript concepts, patterns, and best practices',
    icon: '🟨',
    color:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  },
  {
    id: 'react',
    name: 'React',
    description:
      'React patterns, performance optimization, and advanced concepts',
    icon: '⚛️',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  },
  {
    id: 'css',
    name: 'CSS',
    description: 'Modern CSS techniques, layouts, and styling best practices',
    icon: '🎨',
    color:
      'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  },
  {
    id: 'performance',
    name: 'Performance',
    description: 'Web performance optimization and monitoring techniques',
    icon: '⚡',
    color:
      'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  },
  {
    id: 'architecture',
    name: 'Architecture',
    description: 'System design, scalability, and architectural patterns',
    icon: '🏗️',
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
  },
  {
    id: 'tools',
    name: 'Tools & Workflow',
    description:
      'Development tools, build processes, and workflow optimization',
    icon: '🛠️',
    color:
      'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
  },
];

export const articles: Article[] = [
  {
    id: 'javascript-event-loop',
    title: 'JavaScript Visualized: Event Loop',
    author: 'Lydia Hallie',
    authorUrl: 'https://dev.to/lydiahallie',
    source: 'DEV Community',
    sourceUrl:
      'https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif',
    publishedDate: '2024-01-15',
    readTime: '8 min read',
    category: 'javascript',
    tags: ['javascript', 'event-loop', 'asynchronous', 'visualization'],
    description:
      "A comprehensive visual guide to understanding the JavaScript Event Loop, Call Stack, and asynchronous execution. Perfect for developers who want to master JavaScript's concurrency model.",
    isEmbedded: false,
    featured: true,
  },
  {
    id: 'react-fiber-explained',
    title: "React Fiber: A Deep Dive into React's Reconciliation Algorithm",
    author: 'Dan Abramov',
    authorUrl: 'https://github.com/gaearon',
    source: 'React Blog',
    sourceUrl:
      'https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react',
    publishedDate: '2022-03-29',
    readTime: '12 min read',
    category: 'react',
    tags: ['react', 'fiber', 'reconciliation', 'concurrent'],
    description:
      'Understanding React Fiber and how it enables concurrent features like Suspense and automatic batching in React 18.',
    isEmbedded: false,
    featured: true,
  },
  {
    id: 'css-grid-complete-guide',
    title: 'A Complete Guide to CSS Grid',
    author: 'CSS-Tricks',
    source: 'CSS-Tricks',
    sourceUrl: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
    publishedDate: '2023-11-20',
    readTime: '15 min read',
    category: 'css',
    tags: ['css', 'grid', 'layout', 'responsive'],
    description:
      'The most comprehensive guide to CSS Grid, covering all properties, examples, and best practices for modern web layouts.',
    isEmbedded: false,
    featured: false,
  },
  {
    id: 'web-performance-metrics',
    title: 'Web Performance Metrics: Core Web Vitals Explained',
    author: 'Google Developers',
    source: 'Web.dev',
    sourceUrl: 'https://web.dev/vitals/',
    publishedDate: '2024-02-10',
    readTime: '10 min read',
    category: 'performance',
    tags: ['performance', 'core-web-vitals', 'lcp', 'fid', 'cls'],
    description:
      'Understanding Core Web Vitals and how they impact user experience and SEO rankings.',
    isEmbedded: false,
    featured: true,
  },
  {
    id: 'microservices-frontend',
    title: 'Frontend Architecture for Microservices',
    author: 'Martin Fowler',
    authorUrl: 'https://martinfowler.com/',
    source: "Martin Fowler's Blog",
    sourceUrl: 'https://martinfowler.com/articles/micro-frontends.html',
    publishedDate: '2019-06-12',
    readTime: '20 min read',
    category: 'architecture',
    tags: ['microservices', 'frontend', 'architecture', 'scalability'],
    description:
      'Exploring micro-frontend architecture patterns and how to scale frontend applications using microservices principles.',
    isEmbedded: false,
    featured: false,
  },
  {
    id: 'webpack-vs-vite',
    title: 'Webpack vs Vite: A Comprehensive Comparison',
    author: 'Vite Team',
    source: 'Vite Documentation',
    sourceUrl: 'https://vitejs.dev/guide/comparison.html',
    publishedDate: '2024-01-05',
    readTime: '6 min read',
    category: 'tools',
    tags: ['webpack', 'vite', 'bundling', 'build-tools'],
    description:
      'Comparing Webpack and Vite build tools, their strengths, weaknesses, and when to use each.',
    isEmbedded: false,
    featured: false,
  },
];
