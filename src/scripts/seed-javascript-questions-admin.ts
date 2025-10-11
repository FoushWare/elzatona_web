import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// Initialize Firebase Admin SDK
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
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    projectId: 'fir-demo-project-adffb',
  });
}

const db = admin.firestore();

interface UnifiedQuestion {
  id: string;
  title: string;
  content: string;
  type: 'multiple-choice' | 'coding' | 'system-design' | 'open-ended';
  category: string;
  topic: string;
  learningPath: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  tags: string[];
  explanation?: string;
  points?: number;
  options?: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }>;
  metadata?: {
    source?: string;
    version?: string;
  };
}

async function loadQuestionsFromFile(
  filePath: string
): Promise<UnifiedQuestion[]> {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const questions = JSON.parse(fileContent);
    return Array.isArray(questions) ? questions : [];
  } catch (error) {
    console.error(`❌ Error loading file ${filePath}:`, error);
    return [];
  }
}

async function questionExists(questionId: string): Promise<boolean> {
  try {
    const docRef = db
      .collection('unifiedQuestions')
      .where('id', '==', questionId);
    const snapshot = await docRef.get();
    return !snapshot.empty;
  } catch (error) {
    console.error(`❌ Error checking if question exists:`, error);
    return false;
  }
}

async function seedJavaScriptQuestions() {
  console.log('🚀 Starting JavaScript questions seeding process...');

  const javascriptDir = path.join(process.cwd(), 'data/json/javasciprt');
  const files = fs
    .readdirSync(javascriptDir)
    .filter(file => file.endsWith('.json'));

  console.log(`📁 Found ${files.length} JavaScript question files`);

  let totalProcessed = 0;
  let totalAdded = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const file of files) {
    const filePath = path.join(javascriptDir, file);
    console.log(`\n📄 Processing file: ${file}`);

    const questions = await loadQuestionsFromFile(filePath);

    if (questions.length === 0) {
      console.log(`⚠️  No questions found in ${file}`);
      continue;
    }

    console.log(`📊 Found ${questions.length} questions in ${file}`);

    for (const question of questions) {
      totalProcessed++;

      try {
        // Check if question already exists
        const exists = await questionExists(question.id);

        if (exists) {
          console.log(`⏭️  Question already exists: ${question.title}`);
          totalSkipped++;
          continue;
        }

        // Add question to Firebase
        await db.collection('unifiedQuestions').add({
          ...question,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'seeding-script',
          updatedBy: 'seeding-script',
        });

        console.log(`✅ Added question: ${question.title}`);
        totalAdded++;
      } catch (error) {
        console.error(`❌ Error adding question ${question.title}:`, error);
        totalErrors++;
      }
    }
  }

  console.log('\n🎉 JavaScript questions seeding completed!');
  console.log('📊 Summary:');
  console.log(`   - Successfully added: ${totalAdded}`);
  console.log(`   - Skipped (already exist): ${totalSkipped}`);
  console.log(`   - Errors: ${totalErrors}`);
  console.log(`   - Total processed: ${totalProcessed}`);
}

// Run the seeding process
seedJavaScriptQuestions()
  .then(() => {
    console.log(
      '✅ JavaScript questions seeding process completed successfully'
    );
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ JavaScript questions seeding process failed:', error);
    process.exit(1);
  });
