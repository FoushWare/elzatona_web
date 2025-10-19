import { initializeApp } from 'firebase/app';

// Removed unused imports: fs and path

// Firebase configuration - using the correct project
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
  questions: Array<{
    question_id: string;
    category: string;
    topic: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number; // in minutes
  }>;
  totalQuestions: number;
  estimatedTime: number; // total time in minutes
}

interface GuidedLearningPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // in days
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  createdBy: string;
  updatedBy: string;
  cards: LearningPlanCard[];
  totalQuestions: number;
  totalEstimatedTime: number; // in minutes
  metadata: {
    version: string;
    cumulative: boolean;
    previousPlanId?: string;
  };
}

// Question distribution per day and card type
const questionDistribution = {
  1: {
    'core-technologies': { beginner: 15, intermediate: 10, advanced: 5 },
    frameworks: { beginner: 10, intermediate: 8, advanced: 2 },
    'problem-solving': { beginner: 8, intermediate: 5, advanced: 2 },
    'system-design': { beginner: 5, intermediate: 3, advanced: 2 },
  },
  2: {
    'core-technologies': { beginner: 8, intermediate: 12, advanced: 8 },
    frameworks: { beginner: 5, intermediate: 10, advanced: 5 },
    'problem-solving': { beginner: 3, intermediate: 8, advanced: 4 },
    'system-design': { beginner: 2, intermediate: 5, advanced: 3 },
  },
  3: {
    'core-technologies': { beginner: 5, intermediate: 10, advanced: 10 },
    frameworks: { beginner: 3, intermediate: 8, advanced: 7 },
    'problem-solving': { beginner: 2, intermediate: 6, advanced: 6 },
    'system-design': { beginner: 1, intermediate: 4, advanced: 5 },
  },
  4: {
    'core-technologies': { beginner: 3, intermediate: 8, advanced: 12 },
    frameworks: { beginner: 2, intermediate: 6, advanced: 8 },
    'problem-solving': { beginner: 1, intermediate: 5, advanced: 8 },
    'system-design': { beginner: 1, intermediate: 3, advanced: 6 },
  },
  5: {
    'core-technologies': { beginner: 2, intermediate: 6, advanced: 14 },
    frameworks: { beginner: 1, intermediate: 5, advanced: 10 },
    'problem-solving': { beginner: 1, intermediate: 4, advanced: 10 },
    'system-design': { beginner: 0, intermediate: 2, advanced: 8 },
  },
  6: {
    'core-technologies': { beginner: 1, intermediate: 4, advanced: 16 },
    frameworks: { beginner: 1, intermediate: 3, advanced: 12 },
    'problem-solving': { beginner: 0, intermediate: 3, advanced: 12 },
    'system-design': { beginner: 0, intermediate: 1, advanced: 10 },
  },
  7: {
    'core-technologies': { beginner: 0, intermediate: 2, advanced: 18 },
    frameworks: { beginner: 0, intermediate: 2, advanced: 14 },
    'problem-solving': { beginner: 0, intermediate: 2, advanced: 14 },
    'system-design': { beginner: 0, intermediate: 0, advanced: 12 },
  },
};

// Card configurations
const cardConfigs = {
  'core-technologies': {
    title: 'Core Technologies',
    description: 'Master HTML, CSS, JavaScript, and TypeScript fundamentals',
    categories: ['HTML', 'CSS', 'JavaScript', 'TypeScript'],
    topics: [
      'DOM Manipulation',
      'CSS Layout',
      'ES6+ Features',
      'TypeScript Types',
    ],
  },
  frameworks: {
    title: 'Frameworks & Libraries',
    description:
      'Deep dive into React.js, Next.js, and modern frontend frameworks',
    categories: ['React', 'Next.js', 'Vue.js', 'Angular'],
    topics: [
      'React Hooks',
      'Next.js Routing',
      'State Management',
      'Component Lifecycle',
    ],
  },
  'problem-solving': {
    title: 'Problem Solving',
    description: 'Frontend-specific coding challenges and algorithmic thinking',
    categories: ['Algorithms', 'Data Structures', 'Frontend Challenges'],
    topics: [
      'Array Manipulation',
      'DOM Algorithms',
      'Performance Optimization',
      'Async Programming',
    ],
  },
  'system-design': {
    title: 'System Design',
    description: 'Design scalable frontend architectures and user interfaces',
    categories: ['Frontend Architecture', 'UI/UX Design', 'Performance'],
    topics: [
      'Component Architecture',
      'State Management',
      'Caching Strategies',
      'Load Balancing',
    ],
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
      id: doc.id,
      category: doc.category,
      topic: doc.topic,
      difficulty: doc.difficulty,
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
  plan_id: string
): Promise<LearningPlanCard> {
  const config = cardConfigs[cardType];
  const distribution =
    questionDistribution[day as keyof typeof questionDistribution][cardType];

  let allQuestions: any[] = [];

  // Collect questions from each category and difficulty
  for (const category of config.categories) {
    for (const [difficulty, count] of Object.entries(distribution)) {
      if (count > 0) {
        const questions = await getQuestionsByCategoryAndDifficulty(
          category,
          difficulty,
          count
        );
        allQuestions = allQuestions.concat(questions);
      }
    }
  }

  // Calculate total estimated time
  const totalEstimatedTime = allQuestions.reduce(
    (sum, q) => sum + q.estimatedTime,
    0
  );

  return {
    id: `${planId}-${cardType}`,
    title: config.title,
    description: config.description,
    type: cardType,
    questions: allQuestions,
    totalQuestions: allQuestions.length,
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
      previousPlanId: day > 1 ? `guided-plan-${day - 1}-day` : null,
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

async function seedGuidedLearningPlans() {
  console.log('🚀 Starting Guided Learning Plans seeding process...');
  console.log('📋 Creating cumulative 1-7 day learning plans...');

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
      await addDoc(supabase.from('guidedLearningPlans'), plan);

      console.log(`✅ Added plan: ${plan.name}`);
      console.log(`   📊 Total Questions: ${plan.totalQuestions}`);
      console.log(
        `   ⏱️  Estimated Time: ${Math.round(plan.totalEstimatedTime / 60)} hours`
      );
      console.log(`   📋 Cards: ${plan.cards.length}`);

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
