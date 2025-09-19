#!/usr/bin/env node

/**
 * Script to populate Firestore with sample learning plan templates
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';

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

// Sample learning plan templates
const learningPlanTemplates = [
  {
    id: '1-day-plan',
    name: '1 Day Plan',
    duration: 1,
    description: "Intensive preparation for tomorrow's interview",
    difficulty: 'Beginner',
    totalQuestions: 100,
    dailyQuestions: 100,
    sections: [
      { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 40 },
      { id: 'javascript', name: 'JavaScript', questions: [], weight: 40 },
      { id: 'react', name: 'React', questions: [], weight: 20 },
    ],
    features: ['Quick review', 'Essential concepts', 'Common questions'],
    estimatedTime: '2-3 hours',
    isRecommended: false,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2-day-plan',
    name: '2 Day Plan',
    duration: 2,
    description: 'Perfect for weekend preparation',
    difficulty: 'Beginner',
    totalQuestions: 150,
    dailyQuestions: 75,
    sections: [
      { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 40 },
      { id: 'javascript', name: 'JavaScript', questions: [], weight: 40 },
      { id: 'react', name: 'React', questions: [], weight: 20 },
    ],
    features: ['Balanced coverage', 'Practice sessions', 'Progress tracking'],
    estimatedTime: '3-4 hours',
    isRecommended: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3-day-plan',
    name: '3 Day Plan',
    duration: 3,
    description: 'Comprehensive 3-day preparation',
    difficulty: 'Intermediate',
    totalQuestions: 200,
    dailyQuestions: 67,
    sections: [
      { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 20 },
      { id: 'javascript', name: 'JavaScript', questions: [], weight: 40 },
      { id: 'react', name: 'React', questions: [], weight: 20 },
      { id: 'typescript', name: 'TypeScript', questions: [], weight: 20 },
    ],
    features: ['Extended coverage', 'Daily milestones', 'TypeScript basics'],
    estimatedTime: '4-5 hours',
    isRecommended: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7-day-plan',
    name: '7 Day Plan',
    duration: 7,
    description: 'Complete week-long preparation',
    difficulty: 'Advanced',
    totalQuestions: 400,
    dailyQuestions: 57,
    sections: [
      { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 20 },
      { id: 'javascript', name: 'JavaScript', questions: [], weight: 40 },
      { id: 'react', name: 'React', questions: [], weight: 20 },
      { id: 'typescript', name: 'TypeScript', questions: [], weight: 20 },
    ],
    features: [
      'Complete coverage',
      'Daily milestones',
      'Master-level prep',
    ],
    estimatedTime: '8-10 hours',
    isRecommended: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function populateLearningPlans() {
  try {
    console.log('🚀 Starting to populate learning plan templates...');

    for (const template of learningPlanTemplates) {
      const docRef = doc(db, 'learningPlanTemplates', template.id);
      await setDoc(docRef, template);
      console.log(`✅ Created learning plan: ${template.name}`);
    }

    console.log('🎉 Successfully populated all learning plan templates!');
  } catch (error) {
    console.error('❌ Error populating learning plans:', error);
    process.exit(1);
  }
}

// Run the script
populateLearningPlans();
