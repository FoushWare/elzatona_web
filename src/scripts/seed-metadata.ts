// v1.0 - Seed metadata (categories, topics, learning paths) to Firebase
// Run with: npx tsx src/scripts/seed-metadata.ts

import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'fir-demo-project-adffb.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'fir-demo-project-adffb',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '76366138630',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XZ5VKFGG4Y',
};

// Initialize Firebase

const db = getFirestore(app);

// ==========================================
// Categories Definition
// ==========================================

const categories = [
  {
    id: 'react',
    name: 'React',
    description:
      'React library fundamentals, hooks, components, and advanced patterns',
    icon: '⚛️',
    color: '#61DAFB',
    question_count: 0,
    is_active: true,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description:
      'Core JavaScript concepts, ES6+, async programming, and advanced features',
    icon: '🟨',
    color: '#F7DF1E',
    question_count: 0,
    is_active: true,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    description:
      'Next.js framework, SSR, SSG, App Router, and performance optimization',
    icon: '▲',
    color: '#000000',
    question_count: 0,
    is_active: true,
  },
  {
    id: 'css',
    name: 'CSS',
    description:
      'CSS fundamentals, layouts, animations, and modern CSS features',
    icon: '🎨',
    color: '#1572B6',
    question_count: 0,
    is_active: true,
  },
  {
    id: 'html',
    name: 'HTML',
    description:
      'HTML5 semantics, accessibility, forms, and modern web standards',
    icon: '🌐',
    color: '#E34F26',
    question_count: 0,
    is_active: true,
  },
  {
    id: 'system-design',
    name: 'System Design',
    description:
      'Frontend system design, architecture patterns, and scalability',
    icon: '🏗️',
    color: '#FF6B6B',
    question_count: 0,
    is_active: true,
  },
  {
    id: 'design-patterns',
    name: 'Design Patterns',
    description:
      'JavaScript design patterns, architectural patterns, and best practices',
    icon: '🔧',
    color: '#8B5CF6',
    question_count: 0,
    is_active: true,
  },
  {
    id: 'performance',
    name: 'Performance',
    description: 'Performance optimization, monitoring, and best practices',
    icon: '⚡',
    color: '#10B981',
    question_count: 0,
    is_active: true,
  },
  {
    id: 'rendering',
    name: 'Rendering Patterns',
    description:
      'SSR, SSG, CSR, hydration patterns, and rendering optimization',
    icon: '🔄',
    color: '#F59E0B',
    question_count: 0,
    is_active: true,
  },
];

// ==========================================
// Topics Definition
// ==========================================

const topics = [
  // React Topics
  {
    name: 'React Basics',
    category: 'react',
    description: 'Fundamental React concepts and components',
  },
  {
    name: 'Hooks',
    category: 'react',
    description: 'useState, useEffect, and custom hooks',
  },
  {
    name: 'Props & State',
    category: 'react',
    description: 'Component props and state management',
  },
  {
    name: 'Context API',
    category: 'react',
    description: 'React Context for state sharing',
  },
  {
    name: 'Component Lifecycle',
    category: 'react',
    description: 'Component mounting, updating, and unmounting',
  },
  {
    name: 'Event Handling',
    category: 'react',
    description: 'Handling user interactions and events',
  },
  {
    name: 'Conditional Rendering',
    category: 'react',
    description: 'Conditional and dynamic rendering',
  },
  {
    name: 'Lists & Keys',
    category: 'react',
    description: 'Rendering lists and key optimization',
  },
  {
    name: 'Forms',
    category: 'react',
    description: 'Controlled and uncontrolled forms',
  },
  {
    name: 'Error Boundaries',
    category: 'react',
    description: 'Error handling and recovery',
  },
  {
    name: 'Performance',
    category: 'react',
    description: 'React performance optimization',
  },
  {
    name: 'Testing',
    category: 'react',
    description: 'Testing React components',
  },

  // JavaScript Topics
  {
    name: 'Variables & Scope',
    category: 'javascript',
    description: 'let, const, var and scope concepts',
  },
  {
    name: 'Hoisting',
    category: 'javascript',
    description: 'Variable and function hoisting',
  },
  {
    name: 'Closures',
    category: 'javascript',
    description: 'Lexical scope and closure patterns',
  },
  {
    name: 'this Keyword',
    category: 'javascript',
    description: 'Dynamic vs lexical this binding',
  },
  {
    name: 'Promises',
    category: 'javascript',
    description: 'Promise-based asynchronous programming',
  },
  {
    name: 'Async/Await',
    category: 'javascript',
    description: 'Modern async programming patterns',
  },
  {
    name: 'Event Loop',
    category: 'javascript',
    description: 'JavaScript execution model',
  },
  {
    name: 'Modules',
    category: 'javascript',
    description: 'ES6 modules and module systems',
  },
  {
    name: 'Destructuring',
    category: 'javascript',
    description: 'Object and array destructuring',
  },
  {
    name: 'Spread Operator',
    category: 'javascript',
    description: 'Spread and rest operators',
  },
  {
    name: 'Arrow Functions',
    category: 'javascript',
    description: 'Arrow function syntax and behavior',
  },
  {
    name: 'Classes',
    category: 'javascript',
    description: 'ES6 classes and inheritance',
  },

  // Next.js Topics
  {
    name: 'Next.js Basics',
    category: 'nextjs',
    description: 'Next.js fundamentals and setup',
  },
  {
    name: 'App Router',
    category: 'nextjs',
    description: 'Next.js 13+ App Router system',
  },
  {
    name: 'Pages Router',
    category: 'nextjs',
    description: 'Traditional Pages Router',
  },
  { name: 'SSR', category: 'nextjs', description: 'Server-Side Rendering' },
  { name: 'SSG', category: 'nextjs', description: 'Static Site Generation' },
  {
    name: 'ISR',
    category: 'nextjs',
    description: 'Incremental Static Regeneration',
  },
  {
    name: 'API Routes',
    category: 'nextjs',
    description: 'Next.js API endpoints',
  },
  {
    name: 'Image Optimization',
    category: 'nextjs',
    description: 'next/image optimization',
  },
  {
    name: 'Font Optimization',
    category: 'nextjs',
    description: 'next/font optimization',
  },
  { name: 'Middleware', category: 'nextjs', description: 'Next.js middleware' },

  // CSS Topics
  {
    name: 'CSS Basics',
    category: 'css',
    description: 'CSS fundamentals and syntax',
  },
  {
    name: 'Box Model',
    category: 'css',
    description: 'CSS box model and sizing',
  },
  { name: 'Flexbox', category: 'css', description: 'CSS Flexbox layout' },
  { name: 'CSS Grid', category: 'css', description: 'CSS Grid layout system' },
  {
    name: 'Responsive Design',
    category: 'css',
    description: 'Mobile-first responsive design',
  },
  {
    name: 'CSS Variables',
    category: 'css',
    description: 'CSS custom properties',
  },
  {
    name: 'Animations',
    category: 'css',
    description: 'CSS animations and transitions',
  },
  {
    name: 'Selectors',
    category: 'css',
    description: 'CSS selector specificity',
  },
  {
    name: 'Positioning',
    category: 'css',
    description: 'CSS positioning and layout',
  },
  {
    name: 'Typography',
    category: 'css',
    description: 'CSS typography and fonts',
  },

  // HTML Topics
  {
    name: 'HTML Basics',
    category: 'html',
    description: 'HTML fundamentals and structure',
  },
  {
    name: 'HTML5 Semantics',
    category: 'html',
    description: 'Semantic HTML elements',
  },
  {
    name: 'Forms',
    category: 'html',
    description: 'HTML form elements and validation',
  },
  {
    name: 'Accessibility',
    category: 'html',
    description: 'HTML accessibility features',
  },
  {
    name: 'Media Elements',
    category: 'html',
    description: 'Audio, video, and canvas elements',
  },
  {
    name: 'Data Attributes',
    category: 'html',
    description: 'HTML5 data attributes',
  },

  // System Design Topics
  {
    name: 'Frontend Architecture',
    category: 'system-design',
    description: 'Frontend system architecture patterns',
  },
  {
    name: 'State Management',
    category: 'system-design',
    description: 'Global state management solutions',
  },
  {
    name: 'Data Flow',
    category: 'system-design',
    description: 'Data flow patterns and optimization',
  },
  {
    name: 'Caching Strategies',
    category: 'system-design',
    description: 'Frontend caching mechanisms',
  },
  {
    name: 'Performance Patterns',
    category: 'system-design',
    description: 'Performance optimization patterns',
  },
  {
    name: 'Scalability',
    category: 'system-design',
    description: 'Frontend scalability considerations',
  },

  // Design Patterns Topics
  {
    name: 'Creational Patterns',
    category: 'design-patterns',
    description: 'Factory, Singleton, Builder patterns',
  },
  {
    name: 'Structural Patterns',
    category: 'design-patterns',
    description: 'Adapter, Decorator, Facade patterns',
  },
  {
    name: 'Behavioral Patterns',
    category: 'design-patterns',
    description: 'Observer, Strategy, Command patterns',
  },
  {
    name: 'Module Pattern',
    category: 'design-patterns',
    description: 'JavaScript module patterns',
  },
  {
    name: 'Mixin Pattern',
    category: 'design-patterns',
    description: 'Mixin and composition patterns',
  },
  {
    name: 'Observer Pattern',
    category: 'design-patterns',
    description: 'Event-driven programming patterns',
  },

  // Performance Topics
  {
    name: 'Bundle Optimization',
    category: 'performance',
    description: 'JavaScript bundle optimization',
  },
  {
    name: 'Lazy Loading',
    category: 'performance',
    description: 'Code splitting and lazy loading',
  },
  {
    name: 'Caching',
    category: 'performance',
    description: 'Browser caching strategies',
  },
  {
    name: 'Core Web Vitals',
    category: 'performance',
    description: 'Web performance metrics',
  },
  {
    name: 'Memory Management',
    category: 'performance',
    description: 'Memory optimization techniques',
  },
  {
    name: 'Network Optimization',
    category: 'performance',
    description: 'Network request optimization',
  },

  // Rendering Topics
  {
    name: 'SSR',
    category: 'rendering',
    description: 'Server-Side Rendering patterns',
  },
  { name: 'SSG', category: 'rendering', description: 'Static Site Generation' },
  { name: 'CSR', category: 'rendering', description: 'Client-Side Rendering' },
  {
    name: 'Hydration',
    category: 'rendering',
    description: 'Component hydration patterns',
  },
  {
    name: 'Streaming',
    category: 'rendering',
    description: 'Streaming and progressive rendering',
  },
  {
    name: 'Edge Rendering',
    category: 'rendering',
    description: 'Edge computing and rendering',
  },
];

// ==========================================
// Learning Paths Definition
// ==========================================

const learningPaths = [
  {
    id: 'react-developer-path',
    name: 'React Developer Path',
    description:
      'Complete React development journey from basics to advanced patterns',
    duration: 90, // days
    difficulty: 'intermediate',
    topics: [
      'React Basics',
      'Hooks',
      'Props & State',
      'Context API',
      'Performance',
      'Testing',
    ],
    categories: ['react'],
    is_active: true,
  },
  {
    id: 'javascript-mastery',
    name: 'JavaScript Mastery',
    description: 'Master JavaScript from fundamentals to advanced concepts',
    duration: 120,
    difficulty: 'intermediate',
    topics: [
      'Variables & Scope',
      'Hoisting',
      'Closures',
      'Promises',
      'Async/Await',
      'Event Loop',
    ],
    categories: ['javascript'],
    is_active: true,
  },
  {
    id: 'nextjs-framework',
    name: 'Next.js Framework',
    description: 'Learn Next.js for full-stack React applications',
    duration: 60,
    difficulty: 'intermediate',
    topics: [
      'Next.js Basics',
      'App Router',
      'SSR',
      'SSG',
      'API Routes',
      'Image Optimization',
    ],
    categories: ['nextjs'],
    is_active: true,
  },
  {
    id: 'frontend-fundamentals',
    name: 'Frontend Fundamentals',
    description: 'Essential frontend development skills',
    duration: 150,
    difficulty: 'beginner',
    topics: ['HTML Basics', 'CSS Basics', 'JavaScript Basics', 'React Basics'],
    categories: ['html', 'css', 'javascript', 'react'],
    is_active: true,
  },
  {
    id: 'performance-specialist',
    name: 'Performance Optimization Specialist',
    description: 'Advanced performance optimization techniques',
    duration: 75,
    difficulty: 'advanced',
    topics: [
      'Bundle Optimization',
      'Lazy Loading',
      'Caching',
      'Core Web Vitals',
      'Memory Management',
    ],
    categories: ['performance', 'rendering'],
    is_active: true,
  },
  {
    id: 'system-design-frontend',
    name: 'Frontend System Design',
    description: 'Design scalable frontend architectures',
    duration: 90,
    difficulty: 'advanced',
    topics: [
      'Frontend Architecture',
      'State Management',
      'Data Flow',
      'Caching Strategies',
      'Scalability',
    ],
    categories: ['system-design', 'design-patterns'],
    is_active: true,
  },
];

// ==========================================
// Seeding Functions
// ==========================================

async function seedCategories() {
  console.log('🌱 Seeding categories...');

  for (const category of categories) {
    try {
      // Check if category already exists
      const existingQuery = query(
        supabase.from('categories'),
        where('id', category.id)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.length === 0) {
        const docRef = await addDoc(supabase.from('categories'), {
          ...category,
          created_at: new Date(),
          updated_at: new Date(),
        });
        console.log(`✅ Added category: ${category.name} (ID: ${docRef.id})`);
      } else {
        console.log(`⏭️  Category already exists: ${category.name}`);
      }
    } catch (error) {
      console.error(`❌ Error adding category ${category.name}:`, error);
    }
  }
}

async function seedTopics() {
  console.log('🌱 Seeding topics...');

  for (const topic of topics) {
    try {
      // Check if topic already exists
      const existingQuery = query(
        supabase.from('topics'),
        where('name', topic.name)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.length === 0) {
        const docRef = await addDoc(supabase.from('topics'), {
          ...topic,
          question_count: 0,
          created_at: new Date(),
          updated_at: new Date(),
        });
        console.log(`✅ Added topic: ${topic.name} (ID: ${docRef.id})`);
      } else {
        console.log(`⏭️  Topic already exists: ${topic.name}`);
      }
    } catch (error) {
      console.error(`❌ Error adding topic ${topic.name}:`, error);
    }
  }
}

async function seedLearningPaths() {
  console.log('🌱 Seeding learning paths...');

  for (const path of learningPaths) {
    try {
      // Check if learning path already exists
      const existingQuery = query(
        supabase.from('learningPaths'),
        where('id', path.id)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.length === 0) {
        const docRef = await addDoc(supabase.from('learningPaths'), {
          ...path,
          created_at: new Date(),
          updated_at: new Date(),
        });
        console.log(`✅ Added learning path: ${path.name} (ID: ${docRef.id})`);
      } else {
        console.log(`⏭️  Learning path already exists: ${path.name}`);
      }
    } catch (error) {
      console.error(`❌ Error adding learning path ${path.name}:`, error);
    }
  }
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  console.log('🚀 Starting metadata seeding process...');

  try {
    await seedCategories();
    await seedTopics();
    await seedLearningPaths();

    console.log('🎉 Metadata seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Categories: ${categories.length}`);
    console.log(`   - Topics: ${topics.length}`);
    console.log(`   - Learning Paths: ${learningPaths.length}`);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

main().catch(console.error);
