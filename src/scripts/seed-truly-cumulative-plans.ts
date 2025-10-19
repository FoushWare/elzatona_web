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
            question_id: string;
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
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
    daySpecificQuestions: number; // Questions added specifically for this day
  };
}

// TRULY CUMULATIVE question distribution
// Each day adds to the previous day's questions
const cumulativeQuestionDistribution = {
  1: {
    'core-technologies': { beginner: 5, intermediate: 3, advanced: 1 },
    frameworks: { beginner: 4, intermediate: 2, advanced: 1 },
    'problem-solving': { beginner: 3, intermediate: 2, advanced: 1 },
    'system-design': { beginner: 2, intermediate: 1, advanced: 1 },
  },
  2: {
    'core-technologies': { beginner: 3, intermediate: 2, advanced: 1 }, // Additional to day 1
    frameworks: { beginner: 2, intermediate: 2, advanced: 1 }, // Additional to day 1
    'problem-solving': { beginner: 2, intermediate: 1, advanced: 1 }, // Additional to day 1
    'system-design': { beginner: 2, intermediate: 1, advanced: 1 }, // Additional to day 1
  },
  3: {
    'core-technologies': { beginner: 2, intermediate: 2, advanced: 1 }, // Additional to day 1+2
    frameworks: { beginner: 2, intermediate: 1, advanced: 1 }, // Additional to day 1+2
    'problem-solving': { beginner: 2, intermediate: 1, advanced: 1 }, // Additional to day 1+2
    'system-design': { beginner: 1, intermediate: 1, advanced: 1 }, // Additional to day 1+2
  },
  4: {
    'core-technologies': { beginner: 1, intermediate: 2, advanced: 1 }, // Additional to day 1+2+3
    frameworks: { beginner: 1, intermediate: 2, advanced: 1 }, // Additional to day 1+2+3
    'problem-solving': { beginner: 1, intermediate: 2, advanced: 1 }, // Additional to day 1+2+3
    'system-design': { beginner: 1, intermediate: 1, advanced: 1 }, // Additional to day 1+2+3
  },
  5: {
    'core-technologies': { beginner: 1, intermediate: 1, advanced: 2 }, // Additional to day 1+2+3+4
    frameworks: { beginner: 1, intermediate: 1, advanced: 2 }, // Additional to day 1+2+3+4
    'problem-solving': { beginner: 1, intermediate: 1, advanced: 2 }, // Additional to day 1+2+3+4
    'system-design': { beginner: 1, intermediate: 1, advanced: 1 }, // Additional to day 1+2+3+4
  },
  6: {
    'core-technologies': { beginner: 0, intermediate: 1, advanced: 2 }, // Additional to day 1+2+3+4+5
    frameworks: { beginner: 0, intermediate: 1, advanced: 2 }, // Additional to day 1+2+3+4+5
    'problem-solving': { beginner: 0, intermediate: 1, advanced: 2 }, // Additional to day 1+2+3+4+5
    'system-design': { beginner: 0, intermediate: 1, advanced: 1 }, // Additional to day 1+2+3+4+5
  },
  7: {
    'core-technologies': { beginner: 0, intermediate: 0, advanced: 2 }, // Additional to day 1+2+3+4+5+6
    frameworks: { beginner: 0, intermediate: 0, advanced: 2 }, // Additional to day 1+2+3+4+5+6
    'problem-solving': { beginner: 0, intermediate: 0, advanced: 2 }, // Additional to day 1+2+3+4+5+6
    'system-design': { beginner: 0, intermediate: 0, advanced: 1 }, // Additional to day 1+2+3+4+5+6
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
      supabase.from('unifiedQuestions'),
      where('category', category),
      where('difficulty', difficulty),
      where('isActive', true)
    );
    const querySnapshot = await getDocs(q);
    const questions = querySnapshot.map(doc => ({
      id: doc.id || doc.id,
      question: doc.question || 'Sample question',
      category: doc.category || category,
      topic: doc.topic || 'General',
      difficulty: doc.difficulty || difficulty,
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

// Calculate cumulative questions for a given day
function calculateCumulativeQuestions(day: number): number {
  let total = 0;
  for (let d = 1; d <= day; d++) {
    const distribution =
      cumulativeQuestionDistribution[
        d as keyof typeof cumulativeQuestionDistribution
      ];
    const dayTotal = Object.values(distribution).reduce(
      (sum, cardDist) =>
        sum +
        Object.values(cardDist).reduce((cardSum, diff) => cardSum + diff, 0),
      0
    );
    total += dayTotal;
  }
  return total;
}

// Calculate day-specific questions (only for the current day)
function calculateDaySpecificQuestions(day: number): number {
  const distribution =
    cumulativeQuestionDistribution[
      day as keyof typeof cumulativeQuestionDistribution
    ];
  return Object.values(distribution).reduce(
    (sum, cardDist) =>
      sum +
      Object.values(cardDist).reduce((cardSum, diff) => cardSum + diff, 0),
    0
  );
}

async function createLearningPlanCard(
  cardType: keyof typeof cardConfigs,
  day: number,
  plan_id: string
): Promise<LearningPlanCard> {
  const config = cardConfigs[cardType];

  // Calculate cumulative distribution for this day
  let cumulativeDistribution = {
    'core-technologies': { beginner: 0, intermediate: 0, advanced: 0 },
    frameworks: { beginner: 0, intermediate: 0, advanced: 0 },
    'problem-solving': { beginner: 0, intermediate: 0, advanced: 0 },
    'system-design': { beginner: 0, intermediate: 0, advanced: 0 },
  };

  // Add up all questions from day 1 to current day
  for (let d = 1; d <= day; d++) {
    const dayDistribution =
      cumulativeQuestionDistribution[
        d as keyof typeof cumulativeQuestionDistribution
      ];
    cumulativeDistribution[cardType].beginner +=
      dayDistribution[cardType].beginner;
    cumulativeDistribution[cardType].intermediate +=
      dayDistribution[cardType].intermediate;
    cumulativeDistribution[cardType].advanced +=
      dayDistribution[cardType].advanced;
  }

  const distribution = cumulativeDistribution[cardType];
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
          question_id: q.id,
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

  // Calculate cumulative questions (including all previous days)
  const cumulativeQuestions = calculateCumulativeQuestions(day);
  const daySpecificQuestions = calculateDaySpecificQuestions(day);

  const plan: GuidedLearningPlan = {
    id: planId,
    name: `${day}-Day Frontend Interview Prep`,
    description: `Comprehensive ${day}-day preparation plan covering core technologies, frameworks, problem solving, and system design. ${day === 1 ? 'Perfect for quick review.' : `Builds upon ${day - 1}-day foundation with additional advanced topics.`}`,
    duration: day,
    difficulty: day <= 2 ? 'beginner' : day <= 4 ? 'intermediate' : 'advanced',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
      daySpecificQuestions,
    },
  };

  return plan;
}

async function planExists(plan_id: string): Promise<boolean> {
  try {
    const q = query(supabase.from('guidedLearningPlans'), where('id', planId));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.length === 0;
  } catch (error) {
    console.error(`❌ Error checking if plan exists:`, error);
    return false;
  }
}

async function clearExistingPlans() {
  console.log('🗑️  Clearing existing guided learning plans...');

  try {
    const q = query(supabase.from('guidedLearningPlans'));
    const querySnapshot = await getDocs(q);

    let deletedCount = 0;
    for (const docSnapshot of querySnapshot.docs) {
      await deleteDoc(
        supabase.from('guidedLearningPlans').select().eq('id', docSnapshot.id)
      );
      deletedCount++;
    }

    console.log(`✅ Deleted ${deletedCount} existing plans`);
  } catch (error) {
    console.error('❌ Error clearing plans:', error);
  }
}

async function seedTrulyCumulativeGuidedLearningPlans() {
  console.log('🚀 Starting TRULY CUMULATIVE Guided Learning Plans seeding...');
  console.log(
    '📋 Creating cumulative 1-7 day learning plans where each day includes all previous days...\n'
  );

  // Clear existing plans first
  await clearExistingPlans();

  let totalProcessed = 0;
  let totalAdded = 0;
  let totalErrors = 0;

  for (let day = 1; day <= 7; day++) {
    try {
      const planId = `guided-plan-${day}-day`;

      // Create the plan
      const plan = await createGuidedLearningPlan(day);

      // Add to Firebase
      await addDoc(supabase.from('guidedLearningPlans'), plan);

      console.log(`✅ Added plan: ${plan.name}`);
      console.log(`   📊 Total Questions: ${plan.totalQuestions}`);
      console.log(
        `   📈 Cumulative Questions: ${plan.metadata.cumulativeQuestions}`
      );
      console.log(
        `   ➕ Day-Specific Questions: ${plan.metadata.daySpecificQuestions}`
      );
      console.log(
        `   ⏱️  Estimated Time: ${Math.round(plan.totalEstimatedTime / 60)} hours`
      );
      console.log(`   📋 Cards: ${plan.cards.length}`);

      // Show cumulative breakdown
      console.log(`   🔢 Cumulative Breakdown:`);
      for (let d = 1; d <= day; d++) {
        const daySpecific = calculateDaySpecificQuestions(d);
        const cumulative = calculateCumulativeQuestions(d);
        console.log(
          `      Day ${d}: +${daySpecific} questions (Total: ${cumulative})`
        );
      }

      totalAdded++;
      totalProcessed++;
    } catch (error) {
      console.error(`❌ Error creating ${day}-day plan:`, error);
      totalErrors++;
      totalProcessed++;
    }
  }

  console.log('\n🎉 TRULY CUMULATIVE Guided Learning Plans seeding completed!');
  console.log('📊 Summary:');
  console.log(`   - Successfully added: ${totalAdded}`);
  console.log(`   - Errors: ${totalErrors}`);
  console.log(`   - Total processed: ${totalProcessed}`);
  console.log(`   - Plans created: 1-day through 7-day TRULY CUMULATIVE plans`);
  console.log(
    `   - Structure: Each plan includes ALL questions from previous days + new questions`
  );
  console.log(
    `   - Organization: Questions organized by categories and topics within each card`
  );

  console.log('\n📈 CUMULATIVE PROGRESSION:');
  for (let day = 1; day <= 7; day++) {
    const daySpecific = calculateDaySpecificQuestions(day);
    const cumulative = calculateCumulativeQuestions(day);
    console.log(
      `   Day ${day}: +${daySpecific} new questions → ${cumulative} total questions`
    );
  }
}

// Run the seeding process
seedTrulyCumulativeGuidedLearningPlans()
  .then(() => {
    console.log(
      '✅ TRULY CUMULATIVE Guided Learning Plans seeding process completed successfully'
    );
    process.exit(0);
  })
  .catch(error => {
    console.error(
      '❌ TRULY CUMULATIVE Guided Learning Plans seeding process failed:',
      error
    );
    process.exit(1);
  });
