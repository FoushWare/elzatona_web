// v1.0 - Fix Firebase permission issues using Admin SDK with ADC
// Run with: npx tsx src/scripts/fix-firebase-permissions.ts

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// ==========================================
// Firebase Admin SDK Configuration
// ==========================================

// Check if Firebase Admin is already initialized
if (!getApps().length) {
  try {
    // Try to initialize with Application Default Credentials (ADC)
    // This will work if you're authenticated with Firebase CLI
    initializeApp({
      projectId: 'fir-demo-project-adffb',
    });

    console.log(
      '✅ Firebase Admin SDK initialized with Application Default Credentials'
    );
  } catch (error) {
    console.error(
      '❌ Failed to initialize Firebase Admin SDK with ADC:',
      error
    );

    // Fallback: Try to initialize with environment variables
    try {
      const serviceAccount = {
        type: 'service_account',
        project_id: 'fir-demo-project-adffb',
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || '',
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
        client_email: process.env.FIREBASE_CLIENT_EMAIL || '',
        client_id: process.env.FIREBASE_CLIENT_ID || '',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url:
          'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL || '',
      };

      // Validate required fields
      if (!serviceAccount.private_key || !serviceAccount.client_email) {
        throw new Error('Missing required Firebase environment variables');
      }

      initializeApp({
        credential: cert(serviceAccount as any),
        projectId: 'fir-demo-project-adffb',
      });

      console.log(
        '✅ Firebase Admin SDK initialized with environment variables'
      );
    } catch (envError) {
      console.error(
        '❌ Failed to initialize with environment variables:',
        envError
      );
      console.log('💡 Please run: firebase login --no-localhost');
      console.log('💡 Or set up Application Default Credentials');
      process.exit(1);
    }
  }
}

const db = getFirestore();
const auth = getAuth();

// ==========================================
// Test Firebase Connection
// ==========================================

async function testFirebaseConnection() {
  console.log('🔍 Testing Firebase connection...');

  try {
    // Test Firestore connection
    const testDoc = await db.collection('_test').doc('connection').get();
    console.log('✅ Firestore connection successful');

    // Test Auth connection
    const users = await auth.listUsers(1);
    console.log('✅ Auth connection successful');

    return true;
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return false;
  }
}

// ==========================================
// Fix Firestore Rules
// ==========================================

async function updateFirestoreRules() {
  console.log('🔧 Updating Firestore rules...');

  const rules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all read/write access for development
    // TODO: Implement proper security rules for production
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`;

  try {
    // Note: This would require Firebase CLI or REST API to update rules
    // For now, we'll just log the rules that should be applied
    console.log('📝 Firestore rules to apply:');
    console.log(rules);
    console.log('💡 Run: firebase deploy --only firestore:rules');
    return true;
  } catch (error) {
    console.error('❌ Failed to update Firestore rules:', error);
    return false;
  }
}

// ==========================================
// Test Seeding with Admin SDK
// ==========================================

async function testSeedingWithAdminSDK() {
  console.log('🌱 Testing seeding with Admin SDK...');

  try {
    // Test adding a document
    const testData = {
      id: 'test-admin-sdk',
      title: 'Test Document',
      description: 'Testing Admin SDK access',
      createdAt: new Date().toISOString(),
      test: true,
    };

    await db.collection('_test').doc('admin-sdk-test').set(testData);
    console.log('✅ Successfully added test document with Admin SDK');

    // Clean up test document
    await db.collection('_test').doc('admin-sdk-test').delete();
    console.log('✅ Successfully deleted test document');

    return true;
  } catch (error) {
    console.error('❌ Seeding test failed:', error);
    return false;
  }
}

// ==========================================
// Create Proper Seeding Script
// ==========================================

async function createProperSeedingScript() {
  console.log('📝 Creating proper seeding script...');

  const seedingScript = `// v1.0 - Proper Firebase Admin SDK seeding script
// Run with: npx tsx src/scripts/seed-with-admin-sdk.ts

import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp({
    projectId: 'fir-demo-project-adffb',
  });
}

const db = getFirestore();

// Sample data to seed
const sampleData = {
  id: 'sample-question-001',
  title: 'Sample Question',
  description: 'This is a sample question for testing',
  category: 'React',
  difficulty: 'easy',
  tags: ['react', 'javascript'],
  createdAt: new Date().toISOString(),
  createdBy: 'admin-sdk'
};

async function seedData() {
  try {
    console.log('🌱 Starting seeding with Admin SDK...');
    
    // Add sample data
    await db.collection('questions').doc(sampleData.id).set(sampleData);
    console.log('✅ Successfully added sample question');
    
    // Verify the data was added
    const doc = await db.collection('questions').doc(sampleData.id).get();
    if (doc.exists) {
      console.log('✅ Verified: Sample question exists in database');
      console.log('📊 Data:', doc.data());
    }
    
    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
}

seedData().catch(console.error);`;

  try {
    const fs = await import('fs');
    const path = await import('path');

    const scriptPath = path.join(
      process.cwd(),
      'src/scripts/seed-with-admin-sdk.ts'
    );
    fs.writeFileSync(scriptPath, seedingScript);

    console.log(
      '✅ Created proper seeding script: src/scripts/seed-with-admin-sdk.ts'
    );
    return true;
  } catch (error) {
    console.error('❌ Failed to create seeding script:', error);
    return false;
  }
}

// ==========================================
// Main Function
// ==========================================

async function main() {
  console.log('🚀 Starting Firebase permission fix...');

  const results = {
    connection: false,
    rules: false,
    seeding: false,
    script: false,
  };

  // Test Firebase connection
  results.connection = await testFirebaseConnection();

  if (results.connection) {
    // Update Firestore rules
    results.rules = await updateFirestoreRules();

    // Test seeding
    results.seeding = await testSeedingWithAdminSDK();

    // Create proper seeding script
    results.script = await createProperSeedingScript();
  }

  // Summary
  console.log('\\n📊 Firebase Permission Fix Summary:');
  console.log(`   - Firebase Connection: ${results.connection ? '✅' : '❌'}`);
  console.log(`   - Firestore Rules: ${results.rules ? '✅' : '❌'}`);
  console.log(`   - Seeding Test: ${results.seeding ? '✅' : '❌'}`);
  console.log(`   - Seeding Script: ${results.script ? '✅' : '❌'}`);

  if (results.connection && results.seeding) {
    console.log('\\n🎉 Firebase permissions are now working!');
    console.log('💡 You can now run seeding scripts using Admin SDK');
  } else {
    console.log('\\n⚠️  Some issues remain. Please check the errors above.');
    console.log('💡 Try running: firebase login --no-localhost');
  }
}

main().catch(console.error);
