import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { CARD_TYPES } from '../types/learning-cards';

// Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyBvQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'fir-demo-project-adffb.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'fir-demo-project-adffb',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789012',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:123456789012:web:abcdefghijklmnopqrstuv',
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XXXXXXXXXX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface LearningCardSeedData {
  title: string;
  type:
    | 'core-technologies'
    | 'framework-questions'
    | 'problem-solving'
    | 'system-design';
  description: string;
  color: string;
  icon: string;
  order: number;
  isActive: boolean;
  metadata: {
    questionCount: number;
    estimatedTime: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    topics: string[];
    sections: Array<{
      name: string;
      description: string;
      order: number;
      topics: Array<{
        name: string;
        description: string;
        order: number;
        questionIds: string[];
      }>;
    }>;
  };
}

const learningCardsData: LearningCardSeedData[] = [
  {
    title: 'Core Technologies',
    type: 'core-technologies',
    description:
      'Master the fundamentals of web development including HTML, CSS, JavaScript, and TypeScript',
    color: '#3B82F6',
    icon: '💻',
    order: 1,
    isActive: true,
    metadata: {
      questionCount: 0, // Will be updated based on actual questions
      estimatedTime: '2-3 hours',
      difficulty: 'beginner',
      topics: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'DOM', 'ES6+'],
      sections: [
        {
          name: 'HTML Fundamentals',
          description: 'HTML structure, semantics, and best practices',
          order: 1,
          topics: [
            {
              name: 'HTML Basics',
              description: 'Basic HTML elements and structure',
              order: 1,
              questionIds: [],
            },
            {
              name: 'HTML Semantics',
              description: 'Semantic HTML elements and accessibility',
              order: 2,
              questionIds: [],
            },
            {
              name: 'Forms and Input',
              description: 'HTML forms, validation, and user input',
              order: 3,
              questionIds: [],
            },
          ],
        },
        {
          name: 'CSS Styling',
          description: 'CSS fundamentals, layouts, and responsive design',
          order: 2,
          topics: [
            {
              name: 'CSS Basics',
              description: 'CSS selectors, properties, and values',
              order: 1,
              questionIds: [],
            },
            {
              name: 'Layout Systems',
              description: 'Flexbox, Grid, and positioning',
              order: 2,
              questionIds: [],
            },
            {
              name: 'Responsive Design',
              description: 'Media queries and mobile-first design',
              order: 3,
              questionIds: [],
            },
          ],
        },
        {
          name: 'JavaScript Fundamentals',
          description: 'JavaScript basics, ES6+, and DOM manipulation',
          order: 3,
          topics: [
            {
              name: 'JavaScript Basics',
              description: 'Variables, functions, and control flow',
              order: 1,
              questionIds: [],
            },
            {
              name: 'ES6+ Features',
              description: 'Modern JavaScript features and syntax',
              order: 2,
              questionIds: [],
            },
            {
              name: 'DOM Manipulation',
              description: 'Working with the Document Object Model',
              order: 3,
              questionIds: [],
            },
          ],
        },
      ],
    },
  },
  {
    title: 'Framework Questions',
    type: 'framework-questions',
    description:
      'Deep dive into modern JavaScript frameworks including React, Next.js, Vue, and Angular',
    color: '#10B981',
    icon: '⚛️',
    order: 2,
    isActive: true,
    metadata: {
      questionCount: 0,
      estimatedTime: '3-4 hours',
      difficulty: 'intermediate',
      topics: [
        'React',
        'Next.js',
        'Vue',
        'Angular',
        'Svelte',
        'State Management',
      ],
      sections: [
        {
          name: 'React Fundamentals',
          description: 'React components, hooks, and lifecycle',
          order: 1,
          topics: [
            {
              name: 'React Components',
              description: 'Functional and class components',
              order: 1,
              questionIds: [],
            },
            {
              name: 'React Hooks',
              description: 'useState, useEffect, and custom hooks',
              order: 2,
              questionIds: [],
            },
            {
              name: 'React Patterns',
              description: 'Higher-order components and render props',
              order: 3,
              questionIds: [],
            },
          ],
        },
        {
          name: 'Next.js Framework',
          description: 'Server-side rendering, routing, and optimization',
          order: 2,
          topics: [
            {
              name: 'Next.js Basics',
              description: 'Pages, routing, and file structure',
              order: 1,
              questionIds: [],
            },
            {
              name: 'SSR and SSG',
              description: 'Server-side rendering and static generation',
              order: 2,
              questionIds: [],
            },
            {
              name: 'Next.js Optimization',
              description: 'Performance optimization and best practices',
              order: 3,
              questionIds: [],
            },
          ],
        },
        {
          name: 'State Management',
          description: 'Redux, Context API, and state management patterns',
          order: 3,
          topics: [
            {
              name: 'Redux',
              description: 'Redux store, actions, and reducers',
              order: 1,
              questionIds: [],
            },
            {
              name: 'Context API',
              description: 'React Context and useContext hook',
              order: 2,
              questionIds: [],
            },
            {
              name: 'State Patterns',
              description: 'State management patterns and best practices',
              order: 3,
              questionIds: [],
            },
          ],
        },
      ],
    },
  },
  {
    title: 'Problem Solving',
    type: 'problem-solving',
    description:
      'Frontend-specific coding challenges, algorithms, and problem-solving techniques',
    color: '#8B5CF6',
    icon: '🧩',
    order: 3,
    isActive: true,
    metadata: {
      questionCount: 0,
      estimatedTime: '2-3 hours',
      difficulty: 'intermediate',
      topics: [
        'Algorithms',
        'Data Structures',
        'Problem Solving',
        'Coding Challenges',
      ],
      sections: [
        {
          name: 'Array Problems',
          description: 'Array manipulation and common algorithms',
          order: 1,
          topics: [
            {
              name: 'Array Basics',
              description: 'Basic array operations and methods',
              order: 1,
              questionIds: [],
            },
            {
              name: 'Array Algorithms',
              description: 'Sorting, searching, and manipulation',
              order: 2,
              questionIds: [],
            },
            {
              name: 'Two Pointers',
              description: 'Two-pointer technique and sliding window',
              order: 3,
              questionIds: [],
            },
          ],
        },
        {
          name: 'String Problems',
          description: 'String manipulation and pattern matching',
          order: 2,
          topics: [
            {
              name: 'String Basics',
              description: 'String methods and manipulation',
              order: 1,
              questionIds: [],
            },
            {
              name: 'Pattern Matching',
              description: 'Regular expressions and string patterns',
              order: 2,
              questionIds: [],
            },
            {
              name: 'String Algorithms',
              description: 'Advanced string algorithms',
              order: 3,
              questionIds: [],
            },
          ],
        },
        {
          name: 'Data Structures',
          description: 'Common data structures and their applications',
          order: 3,
          topics: [
            {
              name: 'Hash Maps',
              description: 'Hash tables and key-value pairs',
              order: 1,
              questionIds: [],
            },
            {
              name: 'Stacks and Queues',
              description: 'LIFO and FIFO data structures',
              order: 2,
              questionIds: [],
            },
            {
              name: 'Trees and Graphs',
              description: 'Tree and graph data structures',
              order: 3,
              questionIds: [],
            },
          ],
        },
      ],
    },
  },
  {
    title: 'System Design',
    type: 'system-design',
    description:
      'Frontend architecture patterns, scalability, and system design principles',
    color: '#F59E0B',
    icon: '🏗️',
    order: 4,
    isActive: true,
    metadata: {
      questionCount: 0,
      estimatedTime: '2-3 hours',
      difficulty: 'advanced',
      topics: ['Architecture', 'Scalability', 'Performance', 'Design Patterns'],
      sections: [
        {
          name: 'Frontend Architecture',
          description: 'Component architecture and design patterns',
          order: 1,
          topics: [
            {
              name: 'Component Design',
              description: 'Component composition and patterns',
              order: 1,
              questionIds: [],
            },
            {
              name: 'Architecture Patterns',
              description: 'MVC, MVP, and MVVM patterns',
              order: 2,
              questionIds: [],
            },
            {
              name: 'Micro Frontends',
              description: 'Micro frontend architecture',
              order: 3,
              questionIds: [],
            },
          ],
        },
        {
          name: 'Performance Optimization',
          description: 'Frontend performance and optimization techniques',
          order: 2,
          topics: [
            {
              name: 'Bundle Optimization',
              description: 'Code splitting and lazy loading',
              order: 1,
              questionIds: [],
            },
            {
              name: 'Rendering Optimization',
              description: 'Virtual DOM and rendering performance',
              order: 2,
              questionIds: [],
            },
            {
              name: 'Caching Strategies',
              description: 'Browser caching and CDN optimization',
              order: 3,
              questionIds: [],
            },
          ],
        },
        {
          name: 'Scalability Patterns',
          description: 'Scaling frontend applications',
          order: 3,
          topics: [
            {
              name: 'State Management',
              description: 'Global state management patterns',
              order: 1,
              questionIds: [],
            },
            {
              name: 'API Design',
              description: 'RESTful APIs and GraphQL',
              order: 2,
              questionIds: [],
            },
            {
              name: 'Error Handling',
              description: 'Error boundaries and error handling',
              order: 3,
              questionIds: [],
            },
          ],
        },
      ],
    },
  },
];

async function seedLearningCards() {
  try {
    console.log('🚀 Starting to seed learning cards...');

    const cardsRef = collection(db, 'learningCards');

    for (const cardData of learningCardsData) {
      console.log(`📝 Creating card: ${cardData.title}`);

      const docRef = await addDoc(cardsRef, {
        ...cardData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      console.log(`✅ Created card with ID: ${docRef.id}`);
    }

    console.log('🎉 Successfully seeded all learning cards!');
    console.log(`📊 Total cards created: ${learningCardsData.length}`);

    // Display summary
    console.log('\n📋 Cards Summary:');
    learningCardsData.forEach((card, index) => {
      console.log(`${index + 1}. ${card.icon} ${card.title} (${card.type})`);
      console.log(`   - Color: ${card.color}`);
      console.log(`   - Sections: ${card.metadata.sections.length}`);
      console.log(`   - Topics: ${card.metadata.topics.join(', ')}`);
      console.log('');
    });
  } catch (error) {
    console.error('❌ Error seeding learning cards:', error);
    throw error;
  }
}

// Run the seeding function
if (require.main === module) {
  seedLearningCards()
    .then(() => {
      console.log('✅ Seeding completed successfully!');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

export { seedLearningCards };
