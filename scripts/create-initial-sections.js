const admin = require('firebase-admin');

// Initialize Firebase Admin using the same config as the project
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

const db = admin.firestore();

// Initial sections data
const initialSections = [
  // HTML & CSS Fundamentals
  {
    name: 'HTML Fundamentals',
    description: 'Master the basics of HTML structure, elements, and semantic markup',
    category: 'html',
    difficulty: 'beginner',
    estimatedTime: '1-2 weeks',
    order: 1,
    isActive: true,
    questionCount: 0,
  },
  {
    name: 'CSS Styling & Layout',
    description: 'Learn CSS properties, selectors, and modern layout techniques',
    category: 'css',
    difficulty: 'beginner',
    estimatedTime: '2-3 weeks',
    order: 2,
    isActive: true,
    questionCount: 0,
  },
  {
    name: 'Responsive Design',
    description: 'Create mobile-first, responsive web designs',
    category: 'css',
    difficulty: 'intermediate',
    estimatedTime: '1-2 weeks',
    order: 3,
    isActive: true,
    questionCount: 0,
  },

  // JavaScript Fundamentals
  {
    name: 'JavaScript Basics',
    description: 'Variables, functions, control structures, and data types',
    category: 'javascript',
    difficulty: 'beginner',
    estimatedTime: '2-3 weeks',
    order: 4,
    isActive: true,
    questionCount: 0,
  },
  {
    name: 'DOM Manipulation',
    description: 'Interact with HTML elements using JavaScript',
    category: 'javascript',
    difficulty: 'intermediate',
    estimatedTime: '1-2 weeks',
    order: 5,
    isActive: true,
    questionCount: 0,
  },
  {
    name: 'ES6+ Features',
    description: 'Modern JavaScript features like arrow functions, destructuring, modules',
    category: 'javascript',
    difficulty: 'intermediate',
    estimatedTime: '2-3 weeks',
    order: 6,
    isActive: true,
    questionCount: 0,
  },
  {
    name: 'Async JavaScript',
    description: 'Promises, async/await, and asynchronous programming',
    category: 'javascript',
    difficulty: 'intermediate',
    estimatedTime: '2-3 weeks',
    order: 7,
    isActive: true,
    questionCount: 0,
  },

  // React & Frontend Frameworks
  {
    name: 'React Components',
    description: 'Building reusable components with React',
    category: 'react',
    difficulty: 'intermediate',
    estimatedTime: '2-3 weeks',
    order: 8,
    isActive: true,
    questionCount: 0,
  },
  {
    name: 'React Hooks',
    description: 'useState, useEffect, and custom hooks',
    category: 'react',
    difficulty: 'intermediate',
    estimatedTime: '2-3 weeks',
    order: 9,
    isActive: true,
    questionCount: 0,
  },
  {
    name: 'State Management',
    description: 'Redux, Context API, and state management patterns',
    category: 'react',
    difficulty: 'advanced',
    estimatedTime: '3-4 weeks',
    order: 10,
    isActive: true,
    questionCount: 0,
  },

  // Performance & Optimization
  {
    name: 'Web Performance',
    description: 'Optimizing loading times, Core Web Vitals, and performance metrics',
    category: 'performance',
    difficulty: 'intermediate',
    estimatedTime: '2-3 weeks',
    order: 11,
    isActive: true,
    questionCount: 0,
  },
  {
    name: 'Code Optimization',
    description: 'Bundle optimization, lazy loading, and code splitting',
    category: 'performance',
    difficulty: 'advanced',
    estimatedTime: '2-3 weeks',
    order: 12,
    isActive: true,
    questionCount: 0,
  },

  // Security & Best Practices
  {
    name: 'Web Security',
    description: 'XSS, CSRF, authentication, and security best practices',
    category: 'security',
    difficulty: 'intermediate',
    estimatedTime: '2-3 weeks',
    order: 13,
    isActive: true,
    questionCount: 0,
  },
  {
    name: 'Testing Strategies',
    description: 'Unit testing, integration testing, and testing frameworks',
    category: 'testing',
    difficulty: 'intermediate',
    estimatedTime: '2-3 weeks',
    order: 14,
    isActive: true,
    questionCount: 0,
  },

  // Advanced Topics
  {
    name: 'Design Patterns',
    description: 'Common design patterns in frontend development',
    category: 'patterns',
    difficulty: 'advanced',
    estimatedTime: '2-3 weeks',
    order: 15,
    isActive: true,
    questionCount: 0,
  },
  {
    name: 'Architecture & Scalability',
    description: 'Building scalable frontend applications and architecture decisions',
    category: 'architecture',
    difficulty: 'advanced',
    estimatedTime: '3-4 weeks',
    order: 16,
    isActive: true,
    questionCount: 0,
  },

  // Soft Skills & Career
  {
    name: 'Communication Skills',
    description: 'Technical communication, documentation, and collaboration',
    category: 'soft-skills',
    difficulty: 'beginner',
    estimatedTime: '1-2 weeks',
    order: 17,
    isActive: true,
    questionCount: 0,
  },
  {
    name: 'Interview Preparation',
    description: 'Technical interviews, coding challenges, and problem-solving',
    category: 'career',
    difficulty: 'intermediate',
    estimatedTime: '2-3 weeks',
    order: 18,
    isActive: true,
    questionCount: 0,
  },
  {
    name: 'Project Management',
    description: 'Agile methodologies, project planning, and team collaboration',
    category: 'soft-skills',
    difficulty: 'intermediate',
    estimatedTime: '1-2 weeks',
    order: 19,
    isActive: true,
    questionCount: 0,
  },
];

// Create initial categories if they don't exist
const initialCategories = [
  { name: 'HTML', description: 'HyperText Markup Language fundamentals' },
  { name: 'CSS', description: 'Cascading Style Sheets and styling' },
  { name: 'JavaScript', description: 'JavaScript programming language' },
  { name: 'React', description: 'React library and ecosystem' },
  { name: 'Performance', description: 'Web performance optimization' },
  { name: 'Security', description: 'Web security and best practices' },
  { name: 'Testing', description: 'Testing strategies and frameworks' },
  { name: 'Patterns', description: 'Design patterns and architecture' },
  { name: 'Architecture', description: 'System architecture and scalability' },
  { name: 'Soft Skills', description: 'Communication and collaboration' },
  { name: 'Career', description: 'Career development and growth' },
];

async function createInitialData() {
  try {
    console.log('🚀 Starting to create initial sections and categories...');

    // Create categories first
    console.log('📁 Creating categories...');
    const categoryMap = new Map();
    
    for (const categoryData of initialCategories) {
      const categoryRef = await db.collection('categories').add({
        ...categoryData,
        isActive: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      categoryMap.set(categoryData.name.toLowerCase(), categoryRef.id);
      console.log(`✅ Created category: ${categoryData.name} (${categoryRef.id})`);
    }

    // Create sections
    console.log('📚 Creating sections...');
    const sectionMap = new Map();
    
    for (const sectionData of initialSections) {
      const sectionRef = await db.collection('sections').add({
        ...sectionData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      sectionMap.set(sectionData.name, sectionRef.id);
      console.log(`✅ Created section: ${sectionData.name} (${sectionRef.id})`);
    }

    console.log('🎉 Successfully created initial data!');
    console.log(`📊 Created ${initialCategories.length} categories and ${initialSections.length} sections`);
    
    // Print summary
    console.log('\n📋 Summary:');
    console.log('Categories:', Array.from(categoryMap.keys()));
    console.log('Sections:', Array.from(sectionMap.keys()));

  } catch (error) {
    console.error('❌ Error creating initial data:', error);
    process.exit(1);
  }
}

// Run the script
createInitialData().then(() => {
  console.log('✨ Script completed successfully!');
  process.exit(0);
});
