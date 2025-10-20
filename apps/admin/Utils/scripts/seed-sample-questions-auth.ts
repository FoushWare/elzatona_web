import { initializeApp } from 'firebase/app';

import { getAuth, signInAnonymously } from 'firebase/auth';

// Firebase configuration - using the correct project
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

const db = getFirestore(app);
const auth = getAuth(app);

async function seedSampleQuestions() {
  console.log('🚀 Starting sample questions seeding with authentication...');

  try {
    // Sign in anonymously to get authentication
    console.log('🔐 Signing in anonymously...');
    const userCredential = await signInAnonymously(auth);
    console.log('✅ Signed in anonymously:', userCredential.user.uid);

    const sampleQuestions = [
      {
        id: 'js-q-001',
        title: "What's the output of hoisting with var and let?",
        content:
          "What's the output?\n\n```javascript\nfunction sayHi() {\n  console.log(name);\n  console.log(age);\n  var name = 'Lydia';\n  let age = 21;\n}\nsayHi();\n```",
        type: 'multiple-choice',
        category: 'JavaScript Core',
        topic: 'Hoisting',
        learningPath: 'Advanced JavaScript Concepts',
        difficulty: 'intermediate',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        createdBy: 'seeding-script',
        updatedBy: 'seeding-script',
        tags: ['javascript', 'hoisting', 'var', 'let', 'temporal-dead-zone'],
        explanation:
          'Within the function, the `name` variable declared with `var` is hoisted and initialized with `undefined`. The `age` variable declared with `let` is hoisted but not initialized, so accessing it before declaration throws a `ReferenceError` due to the temporal dead zone.',
        points: 8,
        options: [
          {
            id: 'a',
            text: '`Lydia` and `undefined`',
            isCorrect: false,
            explanation:
              "`name` is hoisted but not yet assigned, so it's `undefined`, not `'Lydia'`.",
          },
          {
            id: 'b',
            text: '`Lydia` and `ReferenceError`',
            isCorrect: false,
            explanation: "`name` is `undefined`, not `'Lydia'`.",
          },
          {
            id: 'c',
            text: '`ReferenceError` and `21`',
            isCorrect: false,
            explanation:
              '`name` is accessible (as `undefined`), but `age` throws `ReferenceError` before assignment.',
          },
          {
            id: 'd',
            text: '`undefined` and `ReferenceError`',
            isCorrect: true,
            explanation:
              'Correct: `var` is hoisted and initialized to `undefined`; `let` is in TDZ and throws `ReferenceError`.',
          },
        ],
        metadata: {
          source: 'javascript-questions-repo',
          version: '1.0.0',
        },
      },
    ];

    // Check if questions already exist
    const q = query(supabase.from('unifiedQuestions'), where('id', 'js-q-001'));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.length === 0) {
      console.log('⏭️  Question js-q-001 already exists, skipping...');
      return;
    }

    // Add questions to Firebase
    for (const question of sampleQuestions) {
      console.log(`Adding question: ${question.title}`);
      await addDoc(supabase.from('unifiedQuestions'), question);
      console.log(`✅ Added: ${question.title}`);
    }

    console.log('🎉 Sample questions seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
  }
}

// Run the seeding process
seedSampleQuestions()
  .then(() => {
    console.log('✅ Seeding completed');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
