import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDetailedCounts() {
  console.log('📊 Detailed Question Counts by Category and Topic');
  console.log('==================================================');

  try {
    // Get all questions
    const questionsSnapshot = await getDocs(collection(db, 'questions'));
    const questions = questionsSnapshot.docs.map(doc => doc.data());

    // Group by category
    const categoryGroups = {};
    questions.forEach(question => {
      const category = question.category || 'Unknown';
      if (!categoryGroups[category]) {
        categoryGroups[category] = [];
      }
      categoryGroups[category].push(question);
    });

    // Display counts by category and topic
    Object.keys(categoryGroups)
      .sort()
      .forEach(category => {
        const categoryQuestions = categoryGroups[category];
        console.log(`\n📚 ${category}: ${categoryQuestions.length} questions`);

        // Group by topic within category
        const topicGroups = {};
        categoryQuestions.forEach(question => {
          const topic = question.topic || 'Unknown Topic';
          if (!topicGroups[topic]) {
            topicGroups[topic] = 0;
          }
          topicGroups[topic]++;
        });

        // Display topics for this category
        Object.keys(topicGroups)
          .sort()
          .forEach(topic => {
            console.log(`   📝 ${topic}: ${topicGroups[topic]} questions`);
          });
      });

    // Summary
    console.log('\n📈 SUMMARY:');
    console.log('============');
    console.log(`Total Questions: ${questions.length}`);
    console.log(`Total Categories: ${Object.keys(categoryGroups).length}`);

    const totalTopics = Object.values(categoryGroups).reduce(
      (acc, categoryQuestions) => {
        const topics = new Set(
          categoryQuestions.map(q => q.topic || 'Unknown Topic')
        );
        return acc + topics.size;
      },
      0
    );
    console.log(`Total Topics: ${totalTopics}`);

    // Learning Card distribution
    console.log('\n🎯 Learning Card Distribution:');
    console.log('===============================');
    const cardGroups = {};
    questions.forEach(question => {
      const card = question.learningCardId || 'Unknown Card';
      if (!cardGroups[card]) {
        cardGroups[card] = 0;
      }
      cardGroups[card]++;
    });

    Object.keys(cardGroups)
      .sort()
      .forEach(card => {
        console.log(`   🃏 ${card}: ${cardGroups[card]} questions`);
      });
  } catch (error) {
    console.error('❌ Error fetching detailed counts:', error);
  }
}

getDetailedCounts().catch(console.error);
