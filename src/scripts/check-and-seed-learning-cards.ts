import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyC4QzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQ',
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
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:123456789:web:abcdef123456789',
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-ABCDEF1234',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface LearningCard {
  id: string;
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
  createdAt: Date;
  updatedAt: Date;
}

const defaultCards: Omit<LearningCard, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Core Technologies',
    type: 'core-technologies',
    description: 'HTML, CSS, JavaScript, TypeScript fundamentals',
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
    description: 'React, Next.js, Vue.js, Angular, Svelte',
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
    description: 'Frontend-specific coding challenges and algorithms',
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
    description:
      'Frontend architecture patterns (Facebook feeds, Twitter timeline)',
    color: '#F59E0B', // Orange
    icon: 'Layout',
    order: 4,
    sections: [],
    topics: [],
    questionCount: 0,
  },
];

async function checkAndSeedLearningCards() {
  try {
    console.log('🔍 Checking for existing learning cards...');

    const cardsRef = collection(db, 'learningCards');
    const cardsSnapshot = await getDocs(cardsRef);

    console.log(`📊 Found ${cardsSnapshot.size} existing learning cards`);

    if (cardsSnapshot.size === 0) {
      console.log('🌱 No learning cards found. Seeding default cards...');

      for (const cardData of defaultCards) {
        const docRef = await addDoc(cardsRef, {
          ...cardData,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(`✅ Created card: ${cardData.title} (ID: ${docRef.id})`);
      }

      console.log('🎉 Successfully seeded all learning cards!');
    } else {
      console.log('📋 Existing learning cards:');
      cardsSnapshot.forEach(doc => {
        const data = doc.data();
        console.log(`  - ${data.title} (${data.type})`);
      });
    }

    // Also check if we need to create the learning-cards admin page
    console.log('\n🔍 Checking if learning-cards admin page exists...');
  } catch (error) {
    console.error('❌ Error checking/seeding learning cards:', error);
  }
}

checkAndSeedLearningCards();
