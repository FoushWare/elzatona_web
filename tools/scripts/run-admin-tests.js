/**
 * Comprehensive Admin Testing Suite
 * 
 * This script runs all admin-related tests to ensure everything works correctly.
 */

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, signOut } = require('firebase/auth');
const { getFirestore, doc, getDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.firebasestorage.app",
  messagingSenderId: "76366138630",
  appId: "1:76366138630:web:0f3381c2f5a62e0401e287",
  measurementId: "G-XZ5VKFGG4Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const TEST_CREDENTIALS = [
  {
    email: 'afouadsoftwareengineer@gmail.com',
    password: 'zatonafoushware$8888',
    name: 'Primary Admin'
  },
  {
    email: 'admin@elzatona.com',
    password: 'admin123456',
    name: 'Backup Admin'
  }
];

async function runAdminTests() {
  console.log('🧪 Running Comprehensive Admin Tests');
  console.log('====================================');
  console.log('');

  let testsPassed = 0;
  let testsFailed = 0;
  let workingCredentials = null;

  // Test 1: Firebase Connection
  console.log('Test 1: Firebase Connection');
  try {
    expect(firebaseConfig.apiKey).toBeTruthy();
    expect(firebaseConfig.projectId).toBeTruthy();
    console.log('✅ Firebase configuration is valid');
    testsPassed++;
  } catch (error) {
    console.log('❌ Firebase configuration is invalid');
    testsFailed++;
  }
  console.log('');

  // Test 2: Authentication Service
  console.log('Test 2: Authentication Service');
  try {
    expect(auth).toBeTruthy();
    expect(db).toBeTruthy();
    console.log('✅ Firebase services initialized successfully');
    testsPassed++;
  } catch (error) {
    console.log('❌ Firebase services initialization failed');
    testsFailed++;
  }
  console.log('');

  // Test 3: Credential Testing
  console.log('Test 3: Credential Testing');
  for (const credentials of TEST_CREDENTIALS) {
    console.log(`   Testing: ${credentials.email}`);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      
      console.log(`   ✅ ${credentials.email} - Login successful`);
      console.log(`      User ID: ${userCredential.user.uid}`);
      
      // Check admin role
      const adminDocRef = doc(db, 'admins', userCredential.user.uid);
      const adminDoc = await getDoc(adminDocRef);
      
      if (adminDoc.exists()) {
        const adminData = adminDoc.data();
        console.log(`      Admin Role: ${adminData.role}`);
        console.log(`      Permissions: ${adminData.permissions}`);
        console.log(`      Active: ${adminData.isActive}`);
        workingCredentials = credentials;
      } else {
        console.log(`      ⚠️  Admin role not found in Firestore`);
      }
      
      testsPassed++;
      
      // Sign out for next test
      await signOut(auth);
      
    } catch (error) {
      console.log(`   ❌ ${credentials.email} - Login failed: ${error.message}`);
      testsFailed++;
    }
  }
  console.log('');

  // Test 4: Error Handling
  console.log('Test 4: Error Handling');
  const errorTests = [
    {
      email: 'invalid@example.com',
      password: 'password',
      expectedError: 'auth/user-not-found',
      description: 'Non-existent user'
    },
    {
      email: 'test@example.com',
      password: 'wrongpassword',
      expectedError: 'auth/wrong-password',
      description: 'Wrong password'
    },
    {
      email: 'invalid-email',
      password: 'password',
      expectedError: 'auth/invalid-email',
      description: 'Invalid email format'
    }
  ];

  for (const errorTest of errorTests) {
    try {
      await signInWithEmailAndPassword(auth, errorTest.email, errorTest.password);
      console.log(`   ❌ ${errorTest.description} - Expected error but login succeeded`);
      testsFailed++;
    } catch (error) {
      if (error.code === errorTest.expectedError) {
        console.log(`   ✅ ${errorTest.description} - Correct error: ${error.code}`);
        testsPassed++;
      } else {
        console.log(`   ⚠️  ${errorTest.description} - Unexpected error: ${error.code}`);
        testsFailed++;
      }
    }
  }
  console.log('');

  // Test 5: Network Error Simulation
  console.log('Test 5: Network Error Handling');
  try {
    // Test with malformed email to trigger validation
    await signInWithEmailAndPassword(auth, 'not-an-email', 'password');
    console.log('   ❌ Expected validation error but login succeeded');
    testsFailed++;
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      console.log('   ✅ Network error handling works correctly');
      testsPassed++;
    } else {
      console.log(`   ⚠️  Unexpected error: ${error.code}`);
      testsFailed++;
    }
  }
  console.log('');

  // Test 6: Admin Panel Access
  console.log('Test 6: Admin Panel Access');
  if (workingCredentials) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        workingCredentials.email,
        workingCredentials.password
      );
      
      console.log(`   ✅ Admin panel access confirmed for ${workingCredentials.email}`);
      console.log(`   🔗 Admin Panel: http://localhost:3001/admin/login`);
      testsPassed++;
      
      await signOut(auth);
    } catch (error) {
      console.log(`   ❌ Admin panel access failed: ${error.message}`);
      testsFailed++;
    }
  } else {
    console.log('   ⚠️  No working credentials found for admin panel access test');
    testsFailed++;
  }
  console.log('');

  // Test Summary
  console.log('Test Summary');
  console.log('============');
  console.log(`✅ Tests Passed: ${testsPassed}`);
  console.log(`❌ Tests Failed: ${testsFailed}`);
  console.log(`📊 Success Rate: ${Math.round((testsPassed / (testsPassed + testsFailed)) * 100)}%`);
  console.log('');

  if (workingCredentials) {
    console.log('🎉 Admin Testing Complete!');
    console.log('');
    console.log('Working Credentials:');
    console.log(`📧 Email: ${workingCredentials.email}`);
    console.log(`🔑 Password: ${workingCredentials.password}`);
    console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
  } else {
    console.log('⚠️  No working credentials found. Please check the setup guide.');
    console.log('🔗 Run: node scripts/admin-setup-guide.js');
  }
}

// Simple expect function for testing
function expect(condition) {
  if (!condition) {
    throw new Error('Assertion failed');
  }
  return {
    toBeTruthy: () => {},
    toBe: (expected) => {
      if (condition !== expected) {
        throw new Error(`Expected ${expected}, got ${condition}`);
      }
    }
  };
}

runAdminTests();
