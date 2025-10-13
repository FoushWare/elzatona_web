#!/usr/bin/env node

/**
 * Add Frontend Tasks Learning Card
 */

const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
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

async function addFrontendTasksCard() {
  console.log('🎨 Adding Frontend Tasks Learning Card...\n');

  try {
    // Check if Frontend Tasks card already exists
    const cardsRef = collection(db, 'learningCards');
    const q = query(cardsRef, where('name', '==', 'Frontend Tasks'));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log('✅ Frontend Tasks card already exists!');
      querySnapshot.forEach(doc => {
        console.log(`   - ID: ${doc.id}`);
        console.log(`   - Name: ${doc.data().name}`);
        console.log(`   - Description: ${doc.data().description}`);
      });
      return;
    }

    // Add Frontend Tasks card
    const frontendTasksCard = {
      name: 'Frontend Tasks',
      slug: 'frontend-tasks',
      description:
        'Interactive coding challenges and real-world frontend projects',
      color: '#8B5CF6', // Purple color
      icon: 'Code2',
      order: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
      isActive: true,
      cardType: 'Frontend Tasks',
      categories: [
        {
          id: 'react-projects',
          name: 'React Projects',
          description: 'Build interactive React applications',
          topics: [
            {
              id: 'components',
              name: 'Components & Props',
              description: 'Building reusable components',
            },
            {
              id: 'state-management',
              name: 'State Management',
              description: 'Managing component state',
            },
            {
              id: 'hooks',
              name: 'React Hooks',
              description: 'Using hooks for state and effects',
            },
            {
              id: 'routing',
              name: 'Routing & Navigation',
              description: 'Client-side routing',
            },
            {
              id: 'forms',
              name: 'Forms & Validation',
              description: 'Handling user input',
            },
          ],
        },
        {
          id: 'javascript-projects',
          name: 'JavaScript Projects',
          description: 'Pure JavaScript coding challenges',
          topics: [
            {
              id: 'dom-manipulation',
              name: 'DOM Manipulation',
              description: 'Working with the DOM',
            },
            {
              id: 'async-js',
              name: 'Async JavaScript',
              description: 'Promises, async/await',
            },
            {
              id: 'api-integration',
              name: 'API Integration',
              description: 'Fetching and displaying data',
            },
            {
              id: 'events',
              name: 'Event Handling',
              description: 'User interaction handling',
            },
            {
              id: 'local-storage',
              name: 'Local Storage',
              description: 'Persisting data locally',
            },
          ],
        },
        {
          id: 'css-projects',
          name: 'CSS Projects',
          description: 'Styling and layout challenges',
          topics: [
            {
              id: 'responsive-design',
              name: 'Responsive Design',
              description: 'Mobile-first design',
            },
            {
              id: 'flexbox-grid',
              name: 'Flexbox & Grid',
              description: 'Modern layout techniques',
            },
            {
              id: 'animations',
              name: 'CSS Animations',
              description: 'Creating smooth animations',
            },
            {
              id: 'css-variables',
              name: 'CSS Variables',
              description: 'Dynamic styling',
            },
            {
              id: 'css-frameworks',
              name: 'CSS Frameworks',
              description: 'Using CSS frameworks',
            },
          ],
        },
        {
          id: 'html-projects',
          name: 'HTML Projects',
          description: 'Semantic HTML and accessibility',
          topics: [
            {
              id: 'semantic-html',
              name: 'Semantic HTML',
              description: 'Meaningful HTML structure',
            },
            {
              id: 'accessibility',
              name: 'Accessibility',
              description: 'Making content accessible',
            },
            {
              id: 'forms',
              name: 'HTML Forms',
              description: 'Building interactive forms',
            },
            {
              id: 'media',
              name: 'Media Elements',
              description: 'Images, video, audio',
            },
            {
              id: 'seo',
              name: 'SEO Basics',
              description: 'Search engine optimization',
            },
          ],
        },
        {
          id: 'typescript-projects',
          name: 'TypeScript Projects',
          description: 'Type-safe JavaScript development',
          topics: [
            {
              id: 'types',
              name: 'TypeScript Types',
              description: 'Working with types',
            },
            {
              id: 'interfaces',
              name: 'Interfaces',
              description: 'Defining object shapes',
            },
            {
              id: 'generics',
              name: 'Generics',
              description: 'Reusable type components',
            },
            {
              id: 'decorators',
              name: 'Decorators',
              description: 'Metadata and annotations',
            },
            {
              id: 'modules',
              name: 'Modules',
              description: 'Organizing TypeScript code',
            },
          ],
        },
      ],
      estimatedHours: 120,
      difficulty: 'Medium',
      prerequisites: ['Basic HTML', 'Basic CSS', 'Basic JavaScript'],
      learningObjectives: [
        'Build interactive web applications',
        'Implement responsive designs',
        'Handle user interactions',
        'Work with APIs and data',
        'Apply modern frontend patterns',
      ],
    };

    const docRef = await addDoc(
      collection(db, 'learningCards'),
      frontendTasksCard
    );
    console.log('✅ Frontend Tasks card added successfully!');
    console.log(`   - Document ID: ${docRef.id}`);
    console.log(`   - Name: ${frontendTasksCard.name}`);
    console.log(`   - Description: ${frontendTasksCard.description}`);
    console.log(`   - Color: ${frontendTasksCard.color}`);
    console.log(`   - Order: ${frontendTasksCard.order}`);
    console.log(`   - Categories: ${frontendTasksCard.categories.length}`);
    console.log(
      `   - Total Topics: ${frontendTasksCard.categories.reduce((total, cat) => total + cat.topics.length, 0)}`
    );

    console.log('\n📊 Updated Learning Cards:');
    console.log('1. Core Technologies (Blue)');
    console.log('2. Framework Questions (Green)');
    console.log('3. Problem Solving (Purple)');
    console.log('4. System Design (Orange)');
    console.log('5. Frontend Tasks (Purple) ✅ NEW');
  } catch (error) {
    console.error('❌ Error adding Frontend Tasks card:', error);
  }
}

addFrontendTasksCard();
