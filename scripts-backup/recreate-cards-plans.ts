#!/usr/bin/env node

/**
 * Clear and Recreate Cards and Plans
 * Based on guided-freestyle-learner-system.md requirements
 */

const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearCollections() {
  console.log('🧹 Clearing existing cards and plans...');

  // Clear cards
  const cardsSnapshot = await getDocs(collection(db, 'learningCards'));
  for (const cardDoc of cardsSnapshot.docs) {
    await deleteDoc(doc(db, 'learningCards', cardDoc.id));
  }
  console.log(`✅ Cleared ${cardsSnapshot.docs.length} cards`);

  // Clear plans
  const plansSnapshot = await getDocs(collection(db, 'learningPlans'));
  for (const planDoc of plansSnapshot.docs) {
    await deleteDoc(doc(db, 'learningPlans', planDoc.id));
  }
  console.log(`✅ Cleared ${plansSnapshot.docs.length} plans`);
}

async function createCards() {
  console.log('📚 Creating learning cards...');

  const cards = [
    {
      name: 'Core Technologies',
      slug: 'core-technologies',
      description:
        'Fundamental web technologies including HTML, CSS, and JavaScript',
      color: '#3B82F6',
      icon: 'code',
      order: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
    },
    {
      name: 'Framework Questions',
      slug: 'framework-questions',
      description:
        'Modern JavaScript frameworks and libraries like React, Vue, Angular',
      color: '#10B981',
      icon: 'layers',
      order: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
    },
    {
      name: 'Problem Solving',
      slug: 'problem-solving',
      description: 'Algorithmic thinking and coding challenges',
      color: '#F59E0B',
      icon: 'puzzle',
      order: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
    },
    {
      name: 'System Design',
      slug: 'system-design',
      description: 'Large-scale system architecture and design patterns',
      color: '#EF4444',
      icon: 'network',
      order: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
    },
  ];

  for (const card of cards) {
    await addDoc(collection(db, 'learningCards'), card);
  }

  console.log(`✅ Created ${cards.length} unique cards`);
}

async function createPlans() {
  console.log('📋 Creating cumulative learning plans (1-7 days)...');

  const plans = [
    {
      name: '1-Day Intensive',
      slug: '1-day-intensive',
      description:
        'Complete frontend development fundamentals in one intensive day',
      duration: '1 day',
      difficulty: 'intensive',
      color: '#EF4444',
      icon: 'zap',
      order: 1,
      estimatedHours: 8,
      prerequisites: ['Basic programming knowledge'],
      learningObjectives: [
        'Master HTML fundamentals and semantic structure',
        'Understand CSS basics and responsive design',
        'Learn JavaScript essentials and DOM manipulation',
        'Complete hands-on projects',
      ],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
    },
    {
      name: '2-Day Foundation',
      slug: '2-day-foundation',
      description:
        'Build a solid foundation in frontend development over two days',
      duration: '2 days',
      difficulty: 'beginner',
      color: '#F59E0B',
      icon: 'book-open',
      order: 2,
      estimatedHours: 16,
      prerequisites: ['Basic programming knowledge'],
      learningObjectives: [
        'Complete 1-Day Intensive content',
        'Deep dive into CSS layouts and positioning',
        'Advanced JavaScript concepts and ES6+',
        'Introduction to responsive design principles',
        'Build interactive web applications',
      ],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
    },
    {
      name: '3-Day Comprehensive',
      slug: '3-day-comprehensive',
      description:
        'Comprehensive frontend development course covering all essential topics',
      duration: '3 days',
      difficulty: 'intermediate',
      color: '#8B5CF6',
      icon: 'graduation-cap',
      order: 3,
      estimatedHours: 24,
      prerequisites: ['Basic programming knowledge'],
      learningObjectives: [
        'Complete 2-Day Foundation content',
        'Master modern JavaScript frameworks (React basics)',
        'Advanced CSS techniques and animations',
        'Web performance optimization',
        'Build complete web applications',
        'Introduction to testing and debugging',
      ],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
    },
    {
      name: '4-Day Advanced',
      slug: '4-day-advanced',
      description:
        'Advanced frontend development with modern frameworks and tools',
      duration: '4 days',
      difficulty: 'intermediate',
      color: '#10B981',
      icon: 'rocket',
      order: 4,
      estimatedHours: 32,
      prerequisites: ['Basic programming knowledge'],
      learningObjectives: [
        'Complete 3-Day Comprehensive content',
        'Deep dive into React ecosystem',
        'State management and advanced patterns',
        'Modern build tools and bundlers',
        'API integration and data fetching',
        'Advanced CSS frameworks and methodologies',
      ],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
    },
    {
      name: '5-Day Professional',
      slug: '5-day-professional',
      description:
        'Professional-level frontend development with industry best practices',
      duration: '5 days',
      difficulty: 'advanced',
      color: '#3B82F6',
      icon: 'award',
      order: 5,
      estimatedHours: 40,
      prerequisites: ['Basic programming knowledge'],
      learningObjectives: [
        'Complete 4-Day Advanced content',
        'Advanced React patterns and optimization',
        'TypeScript integration and type safety',
        'Testing strategies and tools',
        'Performance optimization and monitoring',
        'Deployment and CI/CD pipelines',
      ],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
    },
    {
      name: '6-Day Expert',
      slug: '6-day-expert',
      description:
        'Expert-level frontend development with advanced architecture patterns',
      duration: '6 days',
      difficulty: 'expert',
      color: '#EC4899',
      icon: 'crown',
      order: 6,
      estimatedHours: 48,
      prerequisites: ['Basic programming knowledge'],
      learningObjectives: [
        'Complete 5-Day Professional content',
        'Advanced system design and architecture',
        'Micro-frontends and scalable applications',
        'Advanced performance optimization',
        'Security best practices',
        'Team collaboration and code review processes',
      ],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
    },
    {
      name: '7-Day Mastery',
      slug: '7-day-mastery',
      description:
        'Complete mastery of frontend development with all advanced topics',
      duration: '7 days',
      difficulty: 'master',
      color: '#6366F1',
      icon: 'star',
      order: 7,
      estimatedHours: 56,
      prerequisites: ['Basic programming knowledge'],
      learningObjectives: [
        'Complete 6-Day Expert content',
        'Advanced problem-solving and algorithms',
        'Complex system design patterns',
        'Advanced debugging and profiling',
        'Open source contribution and community',
        'Leadership and mentoring skills',
        'Portfolio development and career preparation',
      ],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
    },
  ];

  for (const plan of plans) {
    await addDoc(collection(db, 'learningPlans'), plan);
  }

  console.log(`✅ Created ${plans.length} cumulative learning plans`);
}

async function main() {
  try {
    console.log('🚀 Starting cards and plans recreation...\n');

    await clearCollections();
    console.log('');

    await createCards();
    console.log('');

    await createPlans();
    console.log('');

    console.log('🎉 Successfully recreated cards and plans!');
    console.log('\n📊 Summary:');
    console.log(
      '- 4 unique learning cards (Core Technologies, Framework Questions, Problem Solving, System Design)'
    );
    console.log('- 7 cumulative learning plans (1-7 days)');
    console.log('- All plans are cumulative and progressive');
    console.log('- Plans cover beginner to master difficulty levels');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main();
