const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with the correct project
const serviceAccount = {
  type: 'service_account',
  project_id: 'fir-demo-project-adffb',
  private_key_id: 'mock-key-id',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMOCK_PRIVATE_KEY\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-mock@fir-demo-project-adffb.iam.gserviceaccount.com',
  client_id: 'mock-client-id',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mock%40fir-demo-project-adffb.iam.gserviceaccount.com',
};

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'fir-demo-project-adffb',
  });
}

const db = admin.firestore();

async function seedSampleQuestions() {
  console.log('🚀 Starting sample questions seeding...');

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
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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

  try {
    for (const question of sampleQuestions) {
      console.log(`Adding question: ${question.title}`);
      await db.collection('unifiedQuestions').doc(question.id).set(question);
      console.log(`✅ Added: ${question.title}`);
    }

    console.log('🎉 Sample questions seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
  }
}

seedSampleQuestions()
  .then(() => {
    console.log('✅ Seeding completed');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
