import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
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

interface CollectionStats {
  totalDocuments: number;
  categories: { [key: string]: number };
  topics: { [key: string]: number };
  difficulties: { [key: string]: number };
  subcategories?: { [key: string]: { [key: string]: number } };
}

async function analyzeCollection(
  collectionName: string
): Promise<CollectionStats> {
  try {
    console.log(`\n📊 Analyzing collection: ${collectionName}`);

    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);

    const stats: CollectionStats = {
      totalDocuments: querySnapshot.docs.length,
      categories: {},
      topics: {},
      difficulties: {},
    };

    // Special handling for different collection types
    if (collectionName === 'unifiedQuestions') {
      stats.subcategories = {};

      querySnapshot.docs.forEach(doc => {
        const data = doc.data();

        // Count by category
        const category = data.category || 'Unknown';
        stats.categories[category] = (stats.categories[category] || 0) + 1;

        // Count by topic
        const topic = data.topic || 'Unknown';
        stats.topics[topic] = (stats.topics[topic] || 0) + 1;

        // Count by difficulty
        const difficulty = data.difficulty || 'Unknown';
        stats.difficulties[difficulty] =
          (stats.difficulties[difficulty] || 0) + 1;

        // Count by category-topic combination
        if (!stats.subcategories![category]) {
          stats.subcategories![category] = {};
        }
        stats.subcategories![category][topic] =
          (stats.subcategories![category][topic] || 0) + 1;
      });
    } else if (collectionName === 'frontendTasks') {
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();

        // Count by category
        const category = data.category || 'Unknown';
        stats.categories[category] = (stats.categories[category] || 0) + 1;

        // Count by difficulty
        const difficulty = data.difficulty || 'Unknown';
        stats.difficulties[difficulty] =
          (stats.difficulties[difficulty] || 0) + 1;
      });
    } else if (collectionName === 'problemSolvingTasks') {
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();

        // Count by category
        const category = data.category || 'Unknown';
        stats.categories[category] = (stats.categories[category] || 0) + 1;

        // Count by difficulty
        const difficulty = data.difficulty || 'Unknown';
        stats.difficulties[difficulty] =
          (stats.difficulties[difficulty] || 0) + 1;

        // Count by topic
        const topic = data.topic || 'Unknown';
        stats.topics[topic] = (stats.topics[topic] || 0) + 1;
      });
    } else if (collectionName === 'guidedLearningPlans') {
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();

        // Count by duration
        const duration = `${data.duration || 'Unknown'}-Day Plan`;
        stats.categories[duration] = (stats.categories[duration] || 0) + 1;

        // Count by difficulty
        const difficulty = data.difficulty || 'Unknown';
        stats.difficulties[difficulty] =
          (stats.difficulties[difficulty] || 0) + 1;

        // Count total questions per plan
        const totalQuestions = data.totalQuestions || 0;
        stats.topics[`Total Questions: ${totalQuestions}`] =
          (stats.topics[`Total Questions: ${totalQuestions}`] || 0) + 1;
      });
    } else {
      // Generic handling for other collections
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();

        // Try to find common fields
        if (data.category) {
          const category = data.category;
          stats.categories[category] = (stats.categories[category] || 0) + 1;
        }

        if (data.topic) {
          const topic = data.topic;
          stats.topics[topic] = (stats.topics[topic] || 0) + 1;
        }

        if (data.difficulty) {
          const difficulty = data.difficulty;
          stats.difficulties[difficulty] =
            (stats.difficulties[difficulty] || 0) + 1;
        }
      });
    }

    return stats;
  } catch (error) {
    console.error(`❌ Error analyzing collection ${collectionName}:`, error);
    return {
      totalDocuments: 0,
      categories: {},
      topics: {},
      difficulties: {},
    };
  }
}

async function generateFirebaseReport() {
  console.log('🚀 Starting Firebase Database Analysis...');
  console.log('📊 Generating comprehensive report of all collections...\n');

  // List of collections to analyze
  const collections = [
    'unifiedQuestions',
    'frontendTasks',
    'problemSolvingTasks',
    'guidedLearningPlans',
    'questionCategories',
    'topics',
    'learningPaths',
    'users',
    'questionAttempts',
    'userProgress',
  ];

  const allStats: { [collectionName: string]: CollectionStats } = {};
  let grandTotal = 0;

  // Analyze each collection
  for (const collectionName of collections) {
    const stats = await analyzeCollection(collectionName);
    allStats[collectionName] = stats;
    grandTotal += stats.totalDocuments;
  }

  // Generate comprehensive report
  console.log(
    '════════════════════════════════════════════════════════════════'
  );
  console.log('📊 FIREBASE DATABASE COMPREHENSIVE REPORT');
  console.log(
    '════════════════════════════════════════════════════════════════'
  );
  console.log(`📈 GRAND TOTAL DOCUMENTS: ${grandTotal.toLocaleString()}`);
  console.log(
    '════════════════════════════════════════════════════════════════\n'
  );

  // Report for each collection
  for (const [collectionName, stats] of Object.entries(allStats)) {
    if (stats.totalDocuments === 0) {
      console.log(
        `📁 ${collectionName.toUpperCase()}: 0 documents (Collection may not exist)`
      );
      continue;
    }

    console.log(
      `📁 ${collectionName.toUpperCase()}: ${stats.totalDocuments.toLocaleString()} documents`
    );
    console.log('─'.repeat(60));

    // Categories breakdown
    if (Object.keys(stats.categories).length > 0) {
      console.log('📂 Categories:');
      Object.entries(stats.categories)
        .sort(([, a], [, b]) => b - a)
        .forEach(([category, count]) => {
          console.log(`   • ${category}: ${count.toLocaleString()}`);
        });
    }

    // Topics breakdown
    if (Object.keys(stats.topics).length > 0) {
      console.log('📝 Topics:');
      Object.entries(stats.topics)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10) // Show top 10 topics
        .forEach(([topic, count]) => {
          console.log(`   • ${topic}: ${count.toLocaleString()}`);
        });
      if (Object.keys(stats.topics).length > 10) {
        console.log(
          `   ... and ${Object.keys(stats.topics).length - 10} more topics`
        );
      }
    }

    // Difficulties breakdown
    if (Object.keys(stats.difficulties).length > 0) {
      console.log('🎯 Difficulties:');
      Object.entries(stats.difficulties)
        .sort(([, a], [, b]) => b - a)
        .forEach(([difficulty, count]) => {
          console.log(`   • ${difficulty}: ${count.toLocaleString()}`);
        });
    }

    // Subcategories breakdown (for unifiedQuestions)
    if (stats.subcategories) {
      console.log('🔍 Category-Topic Breakdown:');
      Object.entries(stats.subcategories)
        .sort(
          ([, a], [, b]) =>
            Object.values(b).reduce((sum, val) => sum + val, 0) -
            Object.values(a).reduce((sum, val) => sum + val, 0)
        )
        .forEach(([category, topics]) => {
          const categoryTotal = Object.values(topics).reduce(
            (sum, val) => sum + val,
            0
          );
          console.log(`   📁 ${category} (${categoryTotal} total):`);
          Object.entries(topics)
            .sort(([, a], [, b]) => b - a)
            .forEach(([topic, count]) => {
              console.log(`      • ${topic}: ${count.toLocaleString()}`);
            });
        });
    }

    console.log('');
  }

  // Summary statistics
  console.log(
    '════════════════════════════════════════════════════════════════'
  );
  console.log('📊 SUMMARY STATISTICS');
  console.log(
    '════════════════════════════════════════════════════════════════'
  );

  const questionsStats = allStats['unifiedQuestions'];
  const frontendTasksStats = allStats['frontendTasks'];
  const problemSolvingStats = allStats['problemSolvingTasks'];
  const guidedPlansStats = allStats['guidedLearningPlans'];

  console.log(`📚 Total Questions: ${questionsStats?.totalDocuments || 0}`);
  console.log(
    `🎨 Total Frontend Tasks: ${frontendTasksStats?.totalDocuments || 0}`
  );
  console.log(
    `🧠 Total Problem-Solving Tasks: ${problemSolvingStats?.totalDocuments || 0}`
  );
  console.log(
    `📋 Total Guided Learning Plans: ${guidedPlansStats?.totalDocuments || 0}`
  );

  if (questionsStats?.categories) {
    console.log('\n📊 Question Categories:');
    Object.entries(questionsStats.categories)
      .sort(([, a], [, b]) => b - a)
      .forEach(([category, count]) => {
        console.log(`   • ${category}: ${count.toLocaleString()} questions`);
      });
  }

  if (questionsStats?.difficulties) {
    console.log('\n🎯 Question Difficulties:');
    Object.entries(questionsStats.difficulties)
      .sort(([, a], [, b]) => b - a)
      .forEach(([difficulty, count]) => {
        console.log(`   • ${difficulty}: ${count.toLocaleString()} questions`);
      });
  }

  console.log('\n🎉 Firebase Database Analysis Complete!');
}

// Run the analysis
generateFirebaseReport()
  .then(() => {
    console.log('✅ Firebase report generation completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Firebase report generation failed:', error);
    process.exit(1);
  });
