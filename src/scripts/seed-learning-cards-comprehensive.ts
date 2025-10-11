import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyBvOkBwJbBwJbBwJbBwJbBwJbBwJbBwJbBw',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'fir-demo-project-adffb.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'fir-demo-project-adffb',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'fir-demo-project-adffb.appspot.com',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:123456789:web:abcdef123456789',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface LearningCard {
  id?: string;
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
  sections: string[];
  topics: string[];
  questionCount: number;
  createdAt?: any;
  updatedAt?: any;
}

interface GuidedLearningPlan {
  id: string;
  name: string;
  duration: number;
  description: string;
  difficulty: string;
  totalQuestions: number;
  dailyQuestions: number;
  cards: {
    cardId: string;
    cardType: string;
    title: string;
    description: string;
    color: string;
    icon: string;
    order: number;
    questions: string[];
    sections: {
      id: string;
      name: string;
      topics: {
        id: string;
        name: string;
        questions: string[];
      }[];
    }[];
    totalQuestions: number;
  }[];
  previousPlanId: string;
  cumulativeQuestions: number;
  createdAt: any;
  updatedAt: any;
}

async function seedLearningCards() {
  console.log('🎯 Starting to seed learning cards...');

  const learningCards: Omit<LearningCard, 'id' | 'createdAt' | 'updatedAt'>[] =
    [
      {
        title: 'Core Technologies',
        type: 'core-technologies',
        description:
          'Fundamental web technologies including HTML, CSS, JavaScript, and TypeScript',
        color: '#3B82F6', // Blue
        icon: 'BookOpen',
        order: 1,
        sections: [],
        topics: [],
        questionCount: 0,
      },
      {
        title: 'Framework Questions',
        type: 'framework-questions',
        description:
          'Modern frontend frameworks like React, Next.js, Vue, and Angular',
        color: '#10B981', // Green
        icon: 'Code',
        order: 2,
        sections: [],
        topics: [],
        questionCount: 0,
      },
      {
        title: 'Problem Solving',
        type: 'problem-solving',
        description: 'Algorithmic thinking and coding challenges',
        color: '#8B5CF6', // Purple
        icon: 'Puzzle',
        order: 3,
        sections: [],
        topics: [],
        questionCount: 0,
      },
      {
        title: 'System Design',
        type: 'system-design',
        description: 'Large-scale system architecture and design patterns',
        color: '#F59E0B', // Orange
        icon: 'Layout',
        order: 4,
        sections: [],
        topics: [],
        questionCount: 0,
      },
    ];

  try {
    // Check if cards already exist
    const existingCardsSnapshot = await getDocs(
      collection(db, 'learningCards')
    );
    if (existingCardsSnapshot.size > 0) {
      console.log('✅ Learning cards already exist, skipping creation');
      return existingCardsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    }

    // Create learning cards
    const createdCards: LearningCard[] = [];
    for (const cardData of learningCards) {
      const docRef = await addDoc(collection(db, 'learningCards'), {
        ...cardData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      createdCards.push({ id: docRef.id, ...cardData });
      console.log(`✅ Created learning card: ${cardData.title}`);
    }

    console.log(
      `🎯 Successfully created ${createdCards.length} learning cards`
    );
    return createdCards;
  } catch (error) {
    console.error('❌ Error seeding learning cards:', error);
    throw error;
  }
}

async function updateGuidedLearningPlans() {
  console.log('🔄 Updating guided learning plans to use cards...');

  try {
    // Get all learning cards
    const cardsSnapshot = await getDocs(collection(db, 'learningCards'));
    const cards = cardsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (cards.length === 0) {
      console.log('❌ No learning cards found, cannot update plans');
      return;
    }

    // Get all guided learning plans
    const plansSnapshot = await getDocs(collection(db, 'guidedLearningPlans'));
    const plans = plansSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`📋 Found ${plans.length} guided learning plans to update`);

    for (const plan of plans) {
      console.log(`🔄 Updating plan: ${plan.name}`);

      // Create cards structure for this plan
      const planCards = cards.map(card => ({
        cardId: card.id,
        cardType: card.type,
        title: card.title,
        description: card.description,
        color: card.color,
        icon: card.icon,
        order: card.order,
        questions: [], // Will be populated based on plan sections
        sections: [], // Will be populated based on plan sections
        totalQuestions: 0,
      }));

      // Update the plan with cards structure
      await updateDoc(doc(db, 'guidedLearningPlans', plan.id), {
        cards: planCards,
        updatedAt: serverTimestamp(),
      });

      console.log(
        `✅ Updated plan: ${plan.name} with ${planCards.length} cards`
      );
    }

    console.log('🎯 Successfully updated all guided learning plans');
  } catch (error) {
    console.error('❌ Error updating guided learning plans:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Starting comprehensive learning cards and plans update...');

    // Step 1: Seed learning cards
    const cards = await seedLearningCards();

    // Step 2: Update guided learning plans
    await updateGuidedLearningPlans();

    console.log('🎉 All operations completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Learning Cards: ${cards.length}`);
    console.log(`   - Plans Updated: Check Firebase console`);
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
main();
