// Simple Firebase connection test
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Load environment variables
import { readFileSync } from 'fs';
import { join } from 'path';

try {
  const envPath = join(process.cwd(), '.env.local');
  const envContent = readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  
  envLines.forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        process.env[key.trim()] = value;
      }
    }
  });
} catch (error) {
  console.log('Could not load .env.local file');
}

console.log('Environment Variables:');
console.log('API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Set' : 'Missing');
console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Set' : 'Missing');
console.log('Auth Domain:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Missing');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.log('\n❌ Firebase configuration is incomplete!');
  console.log('Please add your Firebase config to .env.local file');
  process.exit(1);
}

try {
  console.log('\n🔗 Initializing Firebase...');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  console.log('✅ Firebase initialized successfully!');
  console.log('Project ID:', firebaseConfig.projectId);
  
  // Test Firestore connection
  console.log('\n🧪 Testing Firestore connection...');
  const testCollection = collection(db, 'test');
  console.log('✅ Firestore connection established!');
  
} catch (error) {
  console.error('❌ Firebase initialization failed:', error.message);
}
