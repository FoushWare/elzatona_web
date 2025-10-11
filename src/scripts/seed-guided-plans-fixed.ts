import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface LearningPlanCard {
  id: string;
  title: string;
  description: string;
  type:
    | 'core-technologies'
    | 'frameworks'
    | 'problem-solving'
    | 'system-design';
  categories: {
    [categoryName: string]: {
      title: string;
      topics: {
        [topicName: string]: {
          title: string;
          questions: Array<{
            questionId: string;
            question: string;
            difficulty: 'beginner' | 'intermediate' | 'advanced';
            estimatedTime: number;
          }>;
          totalQuestions: number;
          estimatedTime: number;
        };
      };
      totalQuestions: number;
      estimatedTime: number;
    };
  };
  totalQuestions: number;
  estimatedTime: number;
}

interface GuidedLearningPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  cards: LearningPlanCard[];
  totalQuestions: number;
  totalEstimatedTime: number;
  metadata: {
    version: string;
    cumulative: boolean;
    previousPlanId: string;
    cumulativeQuestions: number;
  };
}

// Question distribution per day and card type
const questionDistribution = {
  1: {
    'core-technologies': { beginner: 8, intermediate: 4, advanced: 2 },
    frameworks: { beginner: 6, intermediate: 3, advanced: 1 },
    'problem-solving': { beginner: 4, intermediate: 2, advanced: 1 },
    'system-design': { beginner: 3, intermediate: 2, advanced: 1 },
  },
  2: {
    'core-technologies': { beginner: 12, intermediate: 8, advanced: 4 },
    frameworks: { beginner: 10, intermediate: 6, advanced: 3 },
    'problem-solving': { beginner: 8, intermediate: 4, advanced: 2 },
    'system-design': { beginner: 6, intermediate: 4, advanced: 2 },
  },
  3: {
    'core-technologies': { beginner: 15, intermediate: 12, advanced: 6 },
    frameworks: { beginner: 12, intermediate: 9, advanced: 5 },
    'problem-solving': { beginner: 10, intermediate: 6, advanced: 4 },
    'system-design': { beginner: 8, intermediate: 6, advanced: 3 },
  },
  4: {
    'core-technologies': { beginner: 18, intermediate: 15, advanced: 8 },
    frameworks: { beginner: 15, intermediate: 12, advanced: 7 },
    'problem-solving': { beginner: 12, intermediate: 8, advanced: 6 },
    'system-design': { beginner: 10, intermediate: 8, advanced: 4 },
  },
  5: {
    'core-technologies': { beginner: 20, intermediate: 18, advanced: 10 },
    frameworks: { beginner: 18, intermediate: 15, advanced: 9 },
    'problem-solving': { beginner: 15, intermediate: 10, advanced: 8 },
    'system-design': { beginner: 12, intermediate: 10, advanced: 5 },
  },
  6: {
    'core-technologies': { beginner: 22, intermediate: 20, advanced: 12 },
    frameworks: { beginner: 20, intermediate: 18, advanced: 11 },
    'problem-solving': { beginner: 18, intermediate: 12, advanced: 10 },
    'system-design': { beginner: 15, intermediate: 12, advanced: 6 },
  },
  7: {
    'core-technologies': { beginner: 25, intermediate: 22, advanced: 14 },
    frameworks: { beginner: 22, intermediate: 20, advanced: 13 },
    'problem-solving': { beginner: 20, intermediate: 14, advanced: 12 },
    'system-design': { beginner: 18, intermediate: 14, advanced: 7 },
  },
};

// Card configurations
const cardConfigs = {
  'core-technologies': {
    title: 'Core Technologies',
    description: 'Master HTML, CSS, JavaScript, and TypeScript fundamentals',
    categories: {
      HTML: {
        title: 'HTML Fundamentals',
        topics: [
          'HTML5 Elements',
          'Semantic HTML',
          'Forms & Validation',
          'Accessibility',
        ],
      },
      CSS: {
        title: 'CSS Styling & Layout',
        topics: ['CSS Grid', 'Flexbox', 'CSS Animations', 'Responsive Design'],
      },
      JavaScript: {
        title: 'JavaScript Core',
        topics: [
          'ES6+ Features',
          'DOM Manipulation',
          'Async Programming',
          'Closures',
        ],
      },
      TypeScript: {
        title: 'TypeScript',
        topics: ['Type System', 'Interfaces', 'Generics', 'Advanced Types'],
      },
    },
  },
  frameworks: {
    title: 'Frameworks & Libraries',
    description:
      'Deep dive into React.js, Next.js, and modern frontend frameworks',
    categories: {
      React: {
        title: 'React.js',
        topics: [
          'React Hooks',
          'Component Lifecycle',
          'State Management',
          'Performance',
        ],
      },
      'Next.js': {
        title: 'Next.js',
        topics: [
          'Routing',
          'SSR/SSG',
          'API Routes',
          'Performance Optimization',
        ],
      },
      'Vue.js': {
        title: 'Vue.js',
        topics: ['Composition API', 'Reactivity', 'Components', 'Directives'],
      },
      Angular: {
        title: 'Angular',
        topics: ['Components', 'Services', 'Dependency Injection', 'RxJS'],
      },
    },
  },
  'problem-solving': {
    title: 'Problem Solving',
    description: 'Frontend-specific coding challenges and algorithmic thinking',
    categories: {
      Algorithms: {
        title: 'Algorithms',
        topics: [
          'Array Manipulation',
          'String Processing',
          'Search Algorithms',
          'Sorting',
        ],
      },
      'Data Structures': {
        title: 'Data Structures',
        topics: ['Arrays & Objects', 'Linked Lists', 'Trees', 'Graphs'],
      },
      'Frontend Challenges': {
        title: 'Frontend Challenges',
        topics: [
          'DOM Manipulation',
          'Event Handling',
          'Async Operations',
          'Performance',
        ],
      },
      'System Design': {
        title: 'System Design',
        topics: [
          'Component Architecture',
          'State Management',
          'Caching',
          'Scalability',
        ],
      },
    },
  },
  'system-design': {
    title: 'System Design',
    description: 'Design scalable frontend architectures and user interfaces',
    categories: {
      'Frontend Architecture': {
        title: 'Frontend Architecture',
        topics: [
          'Component Design',
          'State Management',
          'Data Flow',
          'Error Handling',
        ],
      },
      'UI/UX Design': {
        title: 'UI/UX Design',
        topics: [
          'Design Systems',
          'User Experience',
          'Accessibility',
          'Responsive Design',
        ],
      },
      Performance: {
        title: 'Performance',
        topics: [
          'Bundle Optimization',
          'Lazy Loading',
          'Caching Strategies',
          'Monitoring',
        ],
      },
      Scalability: {
        title: 'Scalability',
        topics: ['Micro-frontends', 'Code Splitting', 'CDN', 'Load Balancing'],
      },
    },
  },
};

async function getQuestionsByCategoryAndDifficulty(
  category: string,
  difficulty: string,
  limit: number
): Promise<any[]> {
  try {
    const q = query(
      collection(db, 'unifiedQuestions'),
      where('category', '==', category),
      where('difficulty', '==', difficulty),
      where('isActive', '==', true)
    );
    const querySnapshot = await getDocs(q);
    const questions = querySnapshot.docs.map(doc => ({
      id: doc.data().id || doc.id,
      question: doc.data().question || 'Sample question',
      category: doc.data().category || category,
      topic: doc.data().topic || 'General',
      difficulty: doc.data().difficulty || difficulty,
      estimatedTime: Math.floor(Math.random() * 10) + 5, // 5-15 minutes per question
    }));

    // Shuffle and limit
    return questions.sort(() => Math.random() - 0.5).slice(0, limit);
  } catch (error) {
    console.error(
      `❌ Error fetching questions for ${category}/${difficulty}:`,
      error
    );
    return [];
  }
}

async function createLearningPlanCard(
  cardType: keyof typeof cardConfigs,
  day: number,
  planId: string
): Promise<LearningPlanCard> {
  const config = cardConfigs[cardType];
  const distribution =
    questionDistribution[day as keyof typeof questionDistribution][cardType];

  const categories: LearningPlanCard['categories'] = {};

  // Process each category
  for (const [categoryName, categoryConfig] of Object.entries(
    config.categories
  )) {
    const topics: { [topicName: string]: any } = {};
    let categoryTotalQuestions = 0;
    let categoryTotalTime = 0;

    // Process each topic within the category
    for (const topicName of categoryConfig.topics) {
      const topicQuestions: any[] = [];

      // Get questions for each difficulty level
      for (const [difficulty, count] of Object.entries(distribution)) {
        if (count > 0) {
          const questions = await getQuestionsByCategoryAndDifficulty(
            categoryName,
            difficulty,
            Math.ceil(count / categoryConfig.topics.length) // Distribute questions across topics
          );
          topicQuestions.push(...questions);
        }
      }

      // Shuffle and limit questions for this topic
      const shuffledQuestions = topicQuestions.sort(() => Math.random() - 0.5);
      const topicTime = shuffledQuestions.reduce(
        (sum, q) => sum + q.estimatedTime,
        0
      );

      topics[topicName] = {
        title: topicName,
        questions: shuffledQuestions.map(q => ({
          questionId: q.id,
          question: q.question,
          difficulty: q.difficulty,
          estimatedTime: q.estimatedTime,
        })),
        totalQuestions: shuffledQuestions.length,
        estimatedTime: topicTime,
      };

      categoryTotalQuestions += shuffledQuestions.length;
      categoryTotalTime += topicTime;
    }

    categories[categoryName] = {
      title: categoryConfig.title,
      topics,
      totalQuestions: categoryTotalQuestions,
      estimatedTime: categoryTotalTime,
    };
  }

  // Calculate card totals
  const totalQuestions = Object.values(categories).reduce(
    (sum, cat) => sum + cat.totalQuestions,
    0
  );
  const totalEstimatedTime = Object.values(categories).reduce(
    (sum, cat) => sum + cat.estimatedTime,
    0
  );

  return {
    id: `${planId}-${cardType}`,
    title: config.title,
    description: config.description,
    type: cardType,
    categories,
    totalQuestions,
    estimatedTime: totalEstimatedTime,
  };
}

async function createGuidedLearningPlan(
  day: number
): Promise<GuidedLearningPlan> {
  const planId = `guided-plan-${day}-day`;

  console.log(`\n📋 Creating ${day}-day guided learning plan...`);

  // Create cards for each type
  const cards: LearningPlanCard[] = [];

  for (const cardType of Object.keys(cardConfigs) as Array<
    keyof typeof cardConfigs
  >) {
    console.log(`  📄 Creating ${cardType} card...`);
    const card = await createLearningPlanCard(cardType, day, planId);
    cards.push(card);
    console.log(
      `    ✅ Added ${card.totalQuestions} questions (${card.estimatedTime} min)`
    );
  }

  // Calculate totals
  const totalQuestions = cards.reduce(
    (sum, card) => sum + card.totalQuestions,
    0
  );
  const totalEstimatedTime = cards.reduce(
    (sum, card) => sum + card.estimatedTime,
    0
  );

  // Calculate cumulative questions (including previous days)
  let cumulativeQuestions = totalQuestions;
  if (day > 1) {
    // Add questions from previous days
    for (let prevDay = 1; prevDay < day; prevDay++) {
      const prevDistribution =
        questionDistribution[prevDay as keyof typeof questionDistribution];
      const prevDayQuestions = Object.values(prevDistribution).reduce(
        (sum, cardDist) =>
          sum +
          Object.values(cardDist).reduce((cardSum, diff) => cardSum + diff, 0),
        0
      );
      cumulativeQuestions += prevDayQuestions;
    }
  }

  const plan: GuidedLearningPlan = {
    id: planId,
    name: `${day}-Day Frontend Interview Prep`,
    description: `Comprehensive ${day}-day preparation plan covering core technologies, frameworks, problem solving, and system design. ${day === 1 ? 'Perfect for quick review.' : `Builds upon ${day - 1}-day foundation with additional advanced topics.`}`,
    duration: day,
    difficulty: day <= 2 ? 'beginner' : day <= 4 ? 'intermediate' : 'advanced',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
    cards,
    totalQuestions,
    totalEstimatedTime,
    metadata: {
      version: '1.0.0',
      cumulative: true,
      previousPlanId: day > 1 ? `guided-plan-${day - 1}-day` : '',
      cumulativeQuestions,
    },
  };

  return plan;
}

async function planExists(planId: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'guidedLearningPlans'),
      where('id', '==', planId)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error(`❌ Error checking if plan exists:`, error);
    return false;
  }
}

async function seedGuidedLearningPlans() {
  console.log('🚀 Starting Guided Learning Plans seeding process...');
  console.log(
    '📋 Creating cumulative 1-7 day learning plans with detailed structure...'
  );

  let totalProcessed = 0;
  let totalAdded = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (let day = 1; day <= 7; day++) {
    try {
      const planId = `guided-plan-${day}-day`;

      // Check if plan already exists
      const exists = await planExists(planId);

      if (exists) {
        console.log(
          `⏭️  Plan already exists: ${day}-Day Frontend Interview Prep`
        );
        totalSkipped++;
        continue;
      }

      // Create the plan
      const plan = await createGuidedLearningPlan(day);

      // Add to Firebase
      await addDoc(collection(db, 'guidedLearningPlans'), plan);

      console.log(`✅ Added plan: ${plan.name}`);
      console.log(`   📊 Total Questions: ${plan.totalQuestions}`);
      console.log(
        `   📈 Cumulative Questions: ${plan.metadata.cumulativeQuestions}`
      );
      console.log(
        `   ⏱️  Estimated Time: ${Math.round(plan.totalEstimatedTime / 60)} hours`
      );
      console.log(`   📋 Cards: ${plan.cards.length}`);

      // Log detailed structure
      plan.cards.forEach(card => {
        console.log(`     📄 ${card.title}: ${card.totalQuestions} questions`);
        Object.entries(card.categories).forEach(([catName, cat]) => {
          console.log(
            `       📁 ${cat.title}: ${cat.totalQuestions} questions`
          );
          Object.entries(cat.topics).forEach(([topicName, topic]) => {
            console.log(
              `         📝 ${topic.title}: ${topic.totalQuestions} questions`
            );
          });
        });
      });

      totalAdded++;
      totalProcessed++;
    } catch (error) {
      console.error(`❌ Error creating ${day}-day plan:`, error);
      totalErrors++;
      totalProcessed++;
    }
  }

  console.log('\n🎉 Guided Learning Plans seeding completed!');
  console.log('📊 Summary:');
  console.log(`   - Successfully added: ${totalAdded}`);
  console.log(`   - Skipped (already exist): ${totalSkipped}`);
  console.log(`   - Errors: ${totalErrors}`);
  console.log(`   - Total processed: ${totalProcessed}`);
  console.log(`   - Plans created: 1-day through 7-day cumulative plans`);
  console.log(
    `   - Structure: Each plan has 4 cards (Core Technologies, Frameworks, Problem Solving, System Design)`
  );
  console.log(
    `   - Organization: Questions organized by categories and topics within each card`
  );
}

// Run the seeding process
seedGuidedLearningPlans()
  .then(() => {
    console.log(
      '✅ Guided Learning Plans seeding process completed successfully'
    );
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Guided Learning Plans seeding process failed:', error);
    process.exit(1);
  });
