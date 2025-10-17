import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyC8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'fir-demo-project-adffb.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'fir-demo-project-adffb',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef',
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XXXXXXXXXX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface Question {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  category: string;
  tags?: string[];
}

interface LearningCardCategory {
  id: string;
  name: string;
  description: string;
  order: number;
  topics: LearningCardTopic[];
}

interface LearningCardTopic {
  id: string;
  name: string;
  description: string;
  order: number;
  questionIds: string[];
}

// Comprehensive hierarchy structure for each card type
const CARD_HIERARCHY = {
  'core-technologies': {
    categories: [
      {
        name: 'HTML Fundamentals',
        description: 'Core HTML concepts, semantic elements, and structure',
        topics: [
          {
            name: 'HTML Basics',
            description: 'Basic HTML elements, tags, and structure',
            keywords: ['html', 'elements', 'tags', 'structure', 'semantic'],
          },
          {
            name: 'Forms & Input',
            description: 'HTML forms, input types, and validation',
            keywords: ['forms', 'input', 'validation', 'submit', 'form'],
          },
          {
            name: 'Accessibility',
            description:
              'ARIA attributes, semantic HTML, and accessibility best practices',
            keywords: ['accessibility', 'aria', 'semantic', 'screen reader'],
          },
        ],
      },
      {
        name: 'CSS Styling',
        description: 'CSS fundamentals, layouts, and responsive design',
        topics: [
          {
            name: 'CSS Basics',
            description: 'Selectors, properties, and basic styling',
            keywords: ['css', 'selectors', 'properties', 'styling', 'cascade'],
          },
          {
            name: 'Layout & Positioning',
            description: 'Flexbox, Grid, and positioning techniques',
            keywords: ['flexbox', 'grid', 'position', 'layout', 'display'],
          },
          {
            name: 'Responsive Design',
            description:
              'Media queries, mobile-first design, and responsive techniques',
            keywords: ['responsive', 'media queries', 'mobile', 'breakpoints'],
          },
        ],
      },
      {
        name: 'JavaScript Fundamentals',
        description: 'Core JavaScript concepts, ES6+, and modern features',
        topics: [
          {
            name: 'Variables & Data Types',
            description: 'let, const, var, primitive types, and type coercion',
            keywords: [
              'variables',
              'let',
              'const',
              'var',
              'types',
              'primitive',
            ],
          },
          {
            name: 'Functions & Scope',
            description:
              'Function declarations, expressions, closures, and scope',
            keywords: [
              'functions',
              'scope',
              'closures',
              'hoisting',
              'arrow functions',
            ],
          },
          {
            name: 'Objects & Arrays',
            description:
              'Object manipulation, array methods, and destructuring',
            keywords: [
              'objects',
              'arrays',
              'methods',
              'destructuring',
              'spread',
            ],
          },
          {
            name: 'Async Programming',
            description: 'Promises, async/await, and asynchronous JavaScript',
            keywords: ['async', 'await', 'promises', 'callback', 'fetch'],
          },
        ],
      },
      {
        name: 'TypeScript',
        description: 'TypeScript fundamentals, types, and advanced features',
        topics: [
          {
            name: 'Type System',
            description: 'Basic types, interfaces, and type annotations',
            keywords: [
              'typescript',
              'types',
              'interfaces',
              'annotations',
              'generics',
            ],
          },
          {
            name: 'Advanced Types',
            description:
              'Union types, generics, and advanced TypeScript features',
            keywords: ['union', 'generics', 'utility types', 'mapped types'],
          },
        ],
      },
    ],
  },
  'framework-questions': {
    categories: [
      {
        name: 'React Fundamentals',
        description: 'Core React concepts, components, and hooks',
        topics: [
          {
            name: 'Components & JSX',
            description:
              'React components, JSX syntax, and component lifecycle',
            keywords: ['react', 'components', 'jsx', 'lifecycle', 'props'],
          },
          {
            name: 'State Management',
            description: 'useState, useEffect, and state management patterns',
            keywords: ['state', 'usestate', 'useeffect', 'hooks', 'context'],
          },
          {
            name: 'Advanced React',
            description:
              'Custom hooks, performance optimization, and advanced patterns',
            keywords: [
              'custom hooks',
              'performance',
              'memo',
              'callback',
              'refs',
            ],
          },
        ],
      },
      {
        name: 'Next.js',
        description: 'Next.js framework, SSR, and advanced features',
        topics: [
          {
            name: 'Next.js Basics',
            description: 'Pages, routing, and basic Next.js concepts',
            keywords: ['nextjs', 'pages', 'routing', 'ssr', 'ssg'],
          },
          {
            name: 'Advanced Next.js',
            description: 'API routes, middleware, and performance optimization',
            keywords: [
              'api routes',
              'middleware',
              'optimization',
              'image',
              'font',
            ],
          },
        ],
      },
      {
        name: 'State Management',
        description: 'Redux, Zustand, and other state management solutions',
        topics: [
          {
            name: 'Redux',
            description: 'Redux store, actions, reducers, and middleware',
            keywords: ['redux', 'store', 'actions', 'reducers', 'middleware'],
          },
          {
            name: 'Modern State Management',
            description:
              'Zustand, Jotai, and other modern state management libraries',
            keywords: ['zustand', 'jotai', 'state', 'management', 'modern'],
          },
        ],
      },
    ],
  },
  'problem-solving': {
    categories: [
      {
        name: 'Array & String Problems',
        description: 'Common array and string manipulation problems',
        topics: [
          {
            name: 'Array Manipulation',
            description: 'Array methods, iteration, and common array problems',
            keywords: [
              'array',
              'methods',
              'iteration',
              'map',
              'filter',
              'reduce',
            ],
          },
          {
            name: 'String Processing',
            description: 'String manipulation, parsing, and string algorithms',
            keywords: [
              'string',
              'manipulation',
              'parsing',
              'regex',
              'substring',
            ],
          },
        ],
      },
      {
        name: 'Data Structures',
        description: 'Common data structures and their implementations',
        topics: [
          {
            name: 'Linked Lists',
            description: 'Singly and doubly linked lists, common operations',
            keywords: [
              'linked list',
              'node',
              'pointer',
              'traversal',
              'insertion',
            ],
          },
          {
            name: 'Trees & Graphs',
            description: 'Binary trees, BST, and graph traversal algorithms',
            keywords: [
              'tree',
              'binary',
              'bst',
              'graph',
              'traversal',
              'dfs',
              'bfs',
            ],
          },
          {
            name: 'Hash Tables',
            description: 'Hash maps, collision handling, and common use cases',
            keywords: ['hash', 'map', 'collision', 'bucket', 'key-value'],
          },
        ],
      },
      {
        name: 'Algorithms',
        description: 'Common algorithms and problem-solving patterns',
        topics: [
          {
            name: 'Sorting & Searching',
            description:
              'Sorting algorithms, binary search, and search techniques',
            keywords: [
              'sorting',
              'searching',
              'binary search',
              'quicksort',
              'mergesort',
            ],
          },
          {
            name: 'Dynamic Programming',
            description: 'DP patterns, memoization, and optimization problems',
            keywords: [
              'dynamic programming',
              'memoization',
              'optimization',
              'dp',
            ],
          },
          {
            name: 'Two Pointers & Sliding Window',
            description: 'Two pointer technique and sliding window patterns',
            keywords: [
              'two pointers',
              'sliding window',
              'pattern',
              'technique',
            ],
          },
        ],
      },
    ],
  },
  'system-design': {
    categories: [
      {
        name: 'Frontend Architecture',
        description: 'Frontend system design patterns and architecture',
        topics: [
          {
            name: 'Component Architecture',
            description:
              'Component design patterns, composition, and architecture',
            keywords: [
              'component',
              'architecture',
              'composition',
              'pattern',
              'design',
            ],
          },
          {
            name: 'State Architecture',
            description: 'State management patterns and data flow design',
            keywords: [
              'state',
              'architecture',
              'data flow',
              'pattern',
              'management',
            ],
          },
        ],
      },
      {
        name: 'Performance & Scalability',
        description: 'Performance optimization and scalability patterns',
        topics: [
          {
            name: 'Performance Optimization',
            description:
              'Bundle optimization, lazy loading, and performance techniques',
            keywords: [
              'performance',
              'optimization',
              'bundle',
              'lazy loading',
              'caching',
            ],
          },
          {
            name: 'Scalability Patterns',
            description:
              'Micro-frontends, code splitting, and scalable architectures',
            keywords: [
              'scalability',
              'micro-frontends',
              'code splitting',
              'architecture',
            ],
          },
        ],
      },
      {
        name: 'Real-world Systems',
        description: 'Designing real-world frontend systems and applications',
        topics: [
          {
            name: 'Social Media Feed',
            description: 'Designing a social media feed system',
            keywords: [
              'social media',
              'feed',
              'infinite scroll',
              'real-time',
              'notification',
            ],
          },
          {
            name: 'E-commerce Platform',
            description: 'Designing an e-commerce frontend system',
            keywords: [
              'e-commerce',
              'shopping cart',
              'checkout',
              'inventory',
              'payment',
            ],
          },
          {
            name: 'Video Streaming',
            description: 'Designing a video streaming platform frontend',
            keywords: ['video', 'streaming', 'player', 'recommendation', 'cdn'],
          },
        ],
      },
    ],
  },
};

async function getAllQuestions(): Promise<Question[]> {
  try {
    const questionsRef = collection(db, 'unifiedQuestions');
    const snapshot = await getDocs(questionsRef);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Question[];
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}

function findQuestionsForTopic(
  topicKeywords: string[],
  allQuestions: Question[]
): string[] {
  const matchingQuestions: string[] = [];

  for (const question of allQuestions) {
    const questionText = `${question.title} ${question.content}`.toLowerCase();
    const questionTags = question.tags?.join(' ').toLowerCase() || '';
    const combinedText = `${questionText} ${questionTags}`;

    // Check if any keyword matches
    for (const keyword of topicKeywords) {
      if (combinedText.includes(keyword.toLowerCase())) {
        matchingQuestions.push(question.id);
        break; // Only add once per question
      }
    }
  }

  return matchingQuestions;
}

async function updateLearningCard(
  cardId: string,
  sections: LearningCardCategory[]
) {
  try {
    const cardRef = doc(db, 'learningCards', cardId);
    await updateDoc(cardRef, {
      metadata: {
        categories: sections,
        questionCount: sections.reduce(
          (total, section) =>
            total +
            section.topics.reduce(
              (categoryTotal, topic) =>
                categoryTotal + topic.questionIds.length,
              0
            ),
          0
        ),
        estimatedTime: '2-4 hours',
        difficulty: 'intermediate',
        topics: sections.flatMap(category =>
          category.topics.map(topic => topic.name)
        ),
      },
      updatedAt: new Date(),
    });

    console.log(`✅ Updated card ${cardId} with ${sections.length} categories`);
  } catch (error) {
    console.error(`❌ Error updating card ${cardId}:`, error);
  }
}

async function seedLearningCardsHierarchy() {
  try {
    console.log('🚀 Starting learning cards hierarchy seeding...');

    // Get all questions
    console.log('📚 Fetching all questions...');
    const allQuestions = await getAllQuestions();
    console.log(`📚 Found ${allQuestions.length} questions`);

    // Get all learning cards
    console.log('🎯 Fetching learning cards...');
    const cardsRef = collection(db, 'learningCards');
    const cardsSnapshot = await getDocs(cardsRef);
    const cards = cardsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`🎯 Found ${cards.length} learning cards`);

    // Process each card type
    for (const card of cards) {
      const cardType = card.type as keyof typeof CARD_HIERARCHY;
      const hierarchy = CARD_HIERARCHY[cardType];

      if (!hierarchy) {
        console.log(`⚠️ No hierarchy defined for card type: ${cardType}`);
        continue;
      }

      console.log(`\n🔄 Processing ${card.title} (${cardType})...`);

      const categories: LearningCardCategory[] = [];

      for (
        let sectionIndex = 0;
        sectionIndex < hierarchy.categories.length;
        sectionIndex++
      ) {
        const categoryData = hierarchy.categories[sectionIndex];
        const topics: LearningCardTopic[] = [];

        for (
          let topicIndex = 0;
          topicIndex < categoryData.topics.length;
          topicIndex++
        ) {
          const topicData = categoryData.topics[topicIndex];

          // Find questions for this topic
          const questionIds = findQuestionsForTopic(
            topicData.keywords,
            allQuestions
          );

          const topic: LearningCardTopic = {
            id: `${cardType}-section-${sectionIndex}-topic-${topicIndex}`,
            name: topicData.name,
            description: topicData.description,
            order: topicIndex + 1,
            questionIds: questionIds.slice(0, 20), // Limit to 20 questions per topic
          };

          topics.push(topic);
          console.log(
            `  📝 Topic "${topic.name}": ${topic.questionIds.length} questions`
          );
        }

        const category: LearningCardCategory = {
          id: `${cardType}-category-${sectionIndex}`,
          name: categoryData.name,
          description: categoryData.description,
          order: sectionIndex + 1,
          topics: topics,
        };

        categories.push(category);
        console.log(
          `📂 Category "${category.name}": ${category.topics.length} topics`
        );
      }

      // Update the card with categories
      await updateLearningCard(card.id, categories);

      const totalQuestions = categories.reduce(
        (total, category) =>
          total +
          category.topics.reduce(
            (categoryTotal, topic) => categoryTotal + topic.questionIds.length,
            0
          ),
        0
      );

      console.log(
        `✅ Completed ${card.title}: ${categories.length} categories, ${totalQuestions} total questions`
      );
    }

    console.log('\n🎉 Learning cards hierarchy seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding learning cards hierarchy:', error);
  }
}

// Run the seeding
if (require.main === module) {
  seedLearningCardsHierarchy()
    .then(() => {
      console.log('✅ Seeding completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

export { seedLearningCardsHierarchy };
