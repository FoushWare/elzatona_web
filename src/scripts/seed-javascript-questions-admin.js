const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'fir-demo-project-adffb',
  });
}

const db = admin.firestore();

async function seedJavaScriptQuestions() {
  console.log(
    '🚀 Starting JavaScript questions seeding with Firebase Admin SDK...'
  );

  try {
    // Read the prepared questions
    const questionsData = fs.readFileSync(
      'src/scripts/javascript-questions-for-firebase.json',
      'utf-8'
    );
    const questions = JSON.parse(questionsData);

    console.log(`📊 Found ${questions.length} JavaScript questions to seed`);

    let added = 0;
    let skipped = 0;

    for (const question of questions) {
      try {
        // Check if question already exists
        const docRef = db
          .collection('unifiedQuestions')
          .where('id', '==', question.id);
        const snapshot = await docRef.get();

        if (!snapshot.empty) {
          console.log(`⏭️  Question already exists: ${question.title}`);
          skipped++;
          continue;
        }

        // Add question to Firebase
        await db.collection('unifiedQuestions').add(question);
        console.log(`✅ Added: ${question.title}`);
        added++;
      } catch (error) {
        console.error(`❌ Error adding question ${question.title}:`, error);
      }
    }

    console.log('\n🎉 JavaScript questions seeding completed!');
    console.log('📊 Summary:');
    console.log(`   - Successfully added: ${added}`);
    console.log(`   - Skipped (already exist): ${skipped}`);
    console.log(`   - Total processed: ${questions.length}`);
  } catch (error) {
    console.error('❌ Error seeding JavaScript questions:', error);
  }
}

// Run the seeding process
seedJavaScriptQuestions()
  .then(() => {
    console.log('✅ JavaScript questions seeding completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ JavaScript questions seeding failed:', error);
    process.exit(1);
  });
